<script>
   import { onDestroy } from "svelte";
   import Router from "../router";
   import routes from "./routes";
   import { route } from "./store";

   import E404 from "./modules/E404.svelte";
   import Sidebar from "./modules/Sidebar.svelte";
   import Navbarmenu from "./modules/Navbarmenu.svelte";
   import Footer from "./modules/Footer.svelte";

   let cmp, params;
   let token, inBeranda, role;

   const router = Router(routes, E404, (route) => {
      cmp = route.page;
      params = route.params;

      auth = localStorage.getItem("auth");
      token = localStorage.getItem("token");
      role = localStorage.getItem("role");

      const paths = [
         "/",
         // "/detailpengumuman",
         "/profil",
         "/visidanmisi",
         "/strukturorganisasi",
         "/penelitian",
         "/pengabdianmasyarakat",
      ];
      inBeranda = paths.some(
         (path) =>
            path === location.pathname ||
            location.pathname.includes("detailpengumuman")
      );
      // console.log("loc:", location.pathname);
      // console.log("test:", inBeranda);
   });

   $route = router.route;
   $route(location.pathname + location.search);

   router.listen();

   onDestroy(router.unlisten);

   // $: auth = localStorage.getItem("auth");

   if (location.pathname === "/") {
      if (!token) {
         $route("/");
      } else {
         if (role === "admin") $route("/admin");
         else $route("/dosen");
      }
   }
</script>

<Navbarmenu />
{#if token && !inBeranda}
   <Sidebar />
{/if}

{#if cmp}
   <main>
      <svelte:component this={cmp} {params} />
   </main>
{/if}

<!-- <Footer /> -->

<style>
   :global(aside ~ main) {
      margin-left: var(--wide);
   }

   @media (max-width: 768px) {
      :global(aside ~ main) {
         margin-left: 5rem;
      }
   }
</style>
