const fs = require("fs");
const path = require("path");

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
   serviceWorker,
} = require("./libs.js");

const cwd = process.cwd();
const dev = process.argv.includes("-w");
const serv = process.argv.includes("-s");
const cfgfile = path.join(cwd, "config.js");
const config = (fs.existsSync(cfgfile) && require(cfgfile)) || [];

const port = dev ? config.port || 3000 : 80;
const outdir = config.outdir || "public";
const sw = config.sw || false;
const cssVersion = config.cssver || 1;
const esbuildconfig = config.esbuild || [];
const env = config.env || [];

// index.html
let indexContent = fs.readFileSync(path.join(cwd, outdir, "index.html"), "utf8");
let index = indexContent.replace("</head>", dev ? reloadScript(port) : "" + "</head>");

let routes = [],
   reroute;

compile();

if (dev || serv) {
   const server = require("http").createServer(function (req, res) {
      let url = req.url.replace(/\?.*/, "");
      let ext = path.extname(url) || ".html";
      let filePath = path.join(outdir, url.endsWith("/") ? "index.html" : url);

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

   server.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);

      if (serv) return;

      createRoute();

      const { WebSocketServer } = require("ws");
      new WebSocketServer({ server }).on("connection", watch);
   });
}

async function compile() {
   if (serv) return;

   if (!dev && sw) fs.writeFileSync(sw, serviceWorker(cssVersion));
   else if (fs.existsSync(sw)) fs.unlinkSync(sw);

   const ctx = await esbuild.context({
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
      define: {
         process: JSON.stringify({
            ENV: { sw: serv && sw },
            ...env,
         }),
      },
      ...esbuildconfig,
   });

   console.log("Compiling done!");

   await ctx.watch();
   if (!dev) await ctx.dispose();
}

function createReIndex(filename) {
   let otherfiles = fs.readdirSync(filename);
   let reIndex = "";
   otherfiles.map((ofile) => {
      let ofilename = `${filename}/${ofile}`;
      if (ofile.endsWith("Index.svelte")) {
         routes.push(ofilename);
      } else if (ofile.endsWith(".svelte") && /^[a-z]/.test(ofile)) {
         reIndex += `export { default as ${ofile.replace(".svelte", "")} } from "./${ofile}";\n`;
      }
   });
   fs.writeFileSync(filename + "/index.js", reIndex);
}

function createRoute() {
   reroute = true;
   routes = [];
   let files = fs.readdirSync("src/pages");
   files.sort();
   files.map((file) => {
      let filename = "src/pages/" + file;
      if (file.endsWith(".svelte")) {
         routes.push(filename);
      }
      if (fs.lstatSync(filename).isDirectory()) {
         createReIndex(filename);
      }
   });
   let conImp = "";
   let conExp = "\nexport default [\n";
   routes.map((filepath) => {
      let cmp = filepath.split("/").pop().replace(".svelte", "");
      if (cmp === "Index") {
         cmp = filepath.split("/")[2] + "Index";
      }
      cmp = cmp.replace(".svelte", "").replace("src", ".").replace("IndexIndex", "Home");
      conImp += `import ${cmp} from "${filepath.replace("src", ".")}";\n`;
      conExp += `\t{ path: "/${cmp.toLowerCase().replace("index", "/:0").replace("home", "")}", page: ${cmp} },\n`;
   });
   conExp += "]";
   fs.writeFileSync(path.join("src/routes.js"), conImp + conExp);
   reroute = false;
}

function watch(ws) {
   let ready;

   // Monitor src folder

   const pages = chokidar.watch("src/pages", { ignored: /(^|[\/\\])\../, persistent: true });

   pages
      .on("add", (fpath) => {
         if (!ready) return;
         if (!fpath.endsWith(".svelte")) return;
         if (reroute) return;
         fpath = fpath.replace(/\\/g, "/");
         let title = fpath.replace(/^.*[\\/]/, "");
         let dirname = fpath.substring(0, fpath.lastIndexOf("/"));
         if (fs.readFileSync(fpath, "utf8") === "") {
            fs.writeFileSync(fpath, indexOfHome(title.replace(".svelte", "")));
         }
         createReIndex(dirname);
      })
      .on("unlink", (fpath) => {
         if (!ready) return;
         if (!fpath.endsWith(".svelte")) return;
         if (reroute) return;
         fpath = fpath.replace(/\\/g, "/");
         let dirname = fpath.substring(0, fpath.lastIndexOf("/"));
         if (dirname.split("/").length > 2 && fs.existsSync(dirname)) createReIndex(dirname);
      })
      .on("addDir", (fpath) => {
         if (!ready) return;
         if (reroute) return;
         fpath = fpath.replace(/\\/g, "/");
         fs.writeFileSync(path.join(fpath, "index.js"), "");
         fs.writeFileSync(path.join(fpath, "Index.svelte"), indexOfPage);
         createRoute();
      })
      .on("unlinkDir", () => {
         if (!ready) return;
         if (reroute) return;
         createRoute();
      })
      .on("ready", () => {
         ready = true;
      });

   // Monitor public folder

   const public = chokidar.watch(outdir, { ignored: /(^|[\/\\])\../, persistent: true });

   public.on("change", (fpath) => {
      if (!ready) return;
      ws.send("reload");
   });
}
