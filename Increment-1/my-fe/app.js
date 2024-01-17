const fs = require("fs");
const path = require("path");
const http = require("http");
const { WebSocketServer } = require("ws");
const chokidar = require("chokidar");

const esbuild = require("esbuild");
const { sassPlugin } = require("esbuild-sass-plugin");
const sveltePlugin = require("esbuild-svelte");
const sveltePreprocess = require("svelte-preprocess");

const {
   reloadScript,
   redColor,
   whiteColor,
   greenColor,
   getTime,
   contentType,
   indexOfHome,
   indexOfPage,
   unregisterSW,
   registerSW,
} = require("./libs.js");

const dev = process.argv.includes("-w");
const cwd = process.cwd();
const port = 3000;
const outdir = "public";

// index.html
const indexContent = fs.readFileSync(path.join(cwd, outdir, "index.html"), "utf8");
const index = indexContent.replace("</head>", dev ? reloadScript(port) : "" + "</head>");
const pageFiles = fs.readdirSync("src/pages");

let ready = false,
   routes = [];

compile();

const server = http.createServer(function (req, res) {
   const url = req.url.replace(/\?.*/, "");
   const ext = path.extname(url) || ".html";
   const filePath = path.join(outdir, url.endsWith("/") ? "index.html" : url);

   let content = "",
      code = 200;

   if (fs.existsSync(filePath)) {
      content = ext === ".html" ? index : fs.readFileSync(filePath);
   } else {
      if (ext !== ".html") code = 404;
      content = index;
   }

   res.writeHead(code, { "Content-Type": contentType(ext) });
   res.end(content);

   console.log(greenColor + getTime(), code, url, code === 200 ? greenColor + "✔" : redColor + "✘", whiteColor);
});

if (dev) {
   pageFiles.forEach((pageFile) => {
      if (pageFile.endsWith(".svelte") && !pageFile.endsWith("ndex.svelte") && !routes.includes(pageFile)) {
         routes.push(path.join("src/pages", pageFile));
      }
   });
   server.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
      new WebSocketServer({ server }).on("connection", watch);
   });
}

async function compile() {
   if (dev) {
      fs.writeFileSync("public/sw.js", unregisterSW());
   } else fs.writeFileSync("public/sw.js", registerSW());
   const ctx = await esbuild.context({
      // entryPoints: dev ? ["src/dev.js"] : ["src/prod.js"],
      entryPoints: ["src/main.js"],
      bundle: true,
      minify: !dev,
      outdir,
      plugins: [
         sveltePlugin({
            preprocess: sveltePreprocess(),
         }),
         sassPlugin(),
      ],
   });

   await ctx.watch();
   if (!dev) await ctx.dispose();
   console.log("Compiling done!");
}

function watch(ws) {
   const publicChange = () => {
      ws.send("reload");
   };

   // Monitor src folder
   chokidar
      .watch("src/pages", { ignored: /(^|[\/\\])\../, persistent: true })
      .on("change", (fpath) => {
         //
      })
      .on("add", (fpath) => {
         fpath = fpath.replaceAll("\\", "/");
         if (!ready || !fpath.endsWith(".svelte") || fpath.endsWith("ndex.svelte")) return;
         if (fpath.split("/").length > 2) {
            const title = fpath.replace(/^.*[\\/]/, "");
            const isEmpty = fs.readFileSync(fpath, "utf8");
            if (isEmpty === "") {
               fs.writeFileSync(fpath, indexOfHome(title.replace(".svelte", "")));
            }
            if (fpath.split("/").length === 3) {
               fpath = fpath.replaceAll("/", "\\");
               if (!routes.includes(fpath)) {
                  routes.unshift(fpath);
               }
               return createRoute();
            }
            fpath = fpath.replace(title, "");
            let files = fs.readdirSync(fpath);
            files = files.filter((file) => {
               return file.endsWith(".svelte") && !file.includes("ndex");
            });
            let content = "";
            files.map((file) => {
               content += `export { default as ${file.replace(".svelte", "")}} from "./${file}";\n`;
            });
            fs.writeFileSync(path.join(fpath, "index.js"), content);
         }
      })
      .on("unlink", (fpath) => {
         fpath = fpath.replaceAll("\\", "/");
         if (!ready || !fpath.endsWith(".svelte")) return;
         if (fpath.split("/").length > 3) {
            const title = fpath.replace(/^.*[\\/]/, "");
            fpath = fpath.replace(title, "");
            if (fs.existsSync(fpath)) {
               try {
                  let files = fs.readdirSync(fpath);
                  files = files.filter((file) => {
                     return file.endsWith(".svelte") && !file.includes("ndex");
                  });
                  let content = "";
                  files.map((file) => {
                     content += `export { default as ${file.replace(".svelte", "")}} from "./${file}";\n`;
                  });
                  fs.writeFileSync(path.join(fpath, "index.js"), content);
                  createRoute();
               } catch (error) {
                  console.log(error);
               }
            }
         }
      })
      .on("addDir", (fpath) => {
         fpath = fpath.replaceAll("\\", "/");
         if (!ready) return;
         if (fpath.split("/").length > 2) {
            let indexSvelte = path.join(fpath, "Index.svelte");
            let indexJs = path.join(fpath, "index.js");
            if (!fs.existsSync(indexJs)) {
               fs.writeFileSync(indexJs, "");
            }
            if (!fs.existsSync(indexSvelte)) {
               fs.writeFileSync(indexSvelte, indexOfPage);
            }
            if (!routes.includes(indexSvelte)) {
               routes.push(indexSvelte);
            }
            createRoute();
         }
      })
      .on("unlinkDir", (fpath) => {
         if (!ready) return;
         const indexSvelte = path.join(fpath, "Index.svelte");
         routes = routes.filter((route) => {
            return route !== indexSvelte;
         });
         createRoute();
      })
      .on("ready", () => {
         setTimeout(() => {
            ready = true;
         }, 300);
      });

   // Monitor public folder
   chokidar.watch(outdir, { ignored: /(^|[\/\\])\../, persistent: true }).on("change", publicChange);
}

function createRoute() {
   let routesPage = 'import Home from "./pages/Index.svelte";\n';
   let routesExport = `\nexport default [\n\t{ path: "/", page: Home },\n`;
   routes.forEach((route) => {
      route = route.replace(/\\/g, "/").replace("src/", "");
      let cmp,
         cmpRoute = route.split("/");
      if (cmpRoute.length === 2 && !route.includes("ndex.svelte")) {
         cmp = route.replace("pages/", "").replace(".svelte", "");
         cmp = cmp[0].toUpperCase() + cmp.slice(1);
         routesPage += `import ${cmp} from "./${route}";\n`;
         routesExport += `\t{ path: "/${cmp.toLowerCase()}", page: ${cmp} },\n`;
      }
      cmpRoute.pop();
      if (cmpRoute.length > 1) {
         // cmp = cmpRoute[1][0].toUpperCase() + cmpRoute[1].slice(1);
         cmp = cmpRoute[1].toLowerCase() + "Index";
         routesPage += `import ${cmp} from "./${route}";\n`;
         routesExport += `\t{ path: "/${cmpRoute[1]}/:0", page: ${cmp} },\n`;
      }
   });
   const content = routesPage + routesExport + "]";
   try {
      fs.writeFileSync(path.join(cwd, "src/routes.js"), content);
   } catch (error) {
      console.log(error);
   }
}
