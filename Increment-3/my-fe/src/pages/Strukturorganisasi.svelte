<script>
   import { onMount } from "svelte";
   import { route, apiURL } from "../store";

   let items;

   const headers = {
      "Content-Type": "application/json",
   };

   onMount(async () => {
      const response = await fetch(
         $apiURL + "/UISI_StrukturOrganisasi/public",
         {
            method: "GET",
            headers: headers,
         }
      );

      const result = await response.json();

      if (response.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (response.ok) {
            items = result.dbData;
         }
      }
   });
</script>

<article class="container">
   <p class="title is-2" style="text-align: center;">Struktur Organisasi</p>
   <hr />
   <div class="strukturOrganisasi-cotent">
      {#if items}
         {@html items.struktur_organisasi}
      {/if}
   </div>
</article>

<style>
   article {
      margin-top: 3.5rem;
      word-spacing: 0.1em;
   }

   .strukturOrganisasi-cotent {
      padding-left: 1.2rem;
   }
</style>
