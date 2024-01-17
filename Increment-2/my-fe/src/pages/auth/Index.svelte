<script>
   import * as pages from "./";
   import E404 from "../../modules/E404.svelte";
   import { route, isLogin } from "../../store";

   export let params = {};

   const token = params.token || null;

   if (token) {
      $isLogin = true;
      // save to local storage
      localStorage.setItem("id", params.id);
      localStorage.setItem("username", params.username);
      localStorage.setItem("role", params.role);
      localStorage.setItem("token", params.token);

      let role = params.role;

      if (role === "admin") $route("/admin");
      else $route("/dosen");
   } else {
      // jika tidak punya akun, arahkan ke halaman login
      $route("/login");
   }

   let cmp;

   $: params, (cmp = pages[params["0"]] || null);
</script>

{#if Object.keys(params).length === 0}
   <article>
      <h1>Auth Google</h1>
   </article>
{:else if cmp}
   <svelte:component this={cmp} {params} />
{:else}
   <E404 />
{/if}
