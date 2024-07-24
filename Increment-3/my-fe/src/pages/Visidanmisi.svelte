<script>
   import { onMount } from "svelte";
   import { route, apiURL } from "../store";

   let items;

   const headers = {
      "Content-Type": "application/json",
   };

   onMount(async () => {
      const response = await fetch($apiURL + "/UISI_visiMisi/public", {
         method: "GET",
         headers: headers,
      });

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
   <p class="title is-2" style="text-align: center;">Visi dan Misi</p>
   <hr />

   <div class="visi-container">
      <div class="visi-header">
         <p class="title is-3"><b>VISI</b></p>
      </div>
      <div class="visi-content">
         {#if items}
            <p class="subtitle is-6">
               {items.visi}
            </p>
         {/if}
      </div>
   </div>

   <div class="misi-container">
      <div class="misi-header">
         <p class="title is-3"><b>MISI</b></p>
      </div>
      <div class="misi-content">
         {#if items}
            {@html items.misi}
         {/if}
      </div>
   </div>
</article>

<style>
   article {
      margin-top: 3.5rem;
      word-spacing: 0.1em;
   }

   .visi-container {
      margin-bottom: 2rem;
   }
   .visi-content {
      margin-top: 1rem;
      margin-bottom: 1rem;
      padding-left: 1rem;
      text-align: justify;
   }
   .visi-content p {
      line-height: 2;
   }

   .misi-content {
      margin-top: 1rem;
      margin-bottom: 1rem;
      padding-left: 1.2rem;
   }
</style>
