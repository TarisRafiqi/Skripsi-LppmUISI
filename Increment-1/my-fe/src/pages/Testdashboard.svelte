<script>
   import Article from "../libs/Article.svelte";
   import { route, apiURL } from "../store";
   import { onMount } from "svelte";

   let pesan;
   let token;

   onMount(async () => {
      let token = localStorage.getItem("Ttoken");

      const payload = {
         method: "GET",
         headers: {
            Authorization: `Bearer ${token}`,
            // Authorization: `${token}`,
            "Content-Type": "application/json",
         },
      };

      const response = await fetch($apiURL + "/testDashboard", payload);
      const result = await response.json();
      console.log(result);
      // return;

      if (result.statusCode != 200) {
         location.pathname = "/testlogin";
         console.log(result);
      }
   });

   async function handleLogout() {
      // $route("/testlogin");
      location.pathname = "/testlogin";
   }
</script>

<Article>
   <h1 class="title is-1">Dashboard</h1>

   <p>Pesan : {pesan}</p>
   <p>Token : {token}</p>
   <button class="button is-danger" on:click={handleLogout}>Back</button>
</Article>
