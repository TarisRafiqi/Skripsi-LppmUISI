<script>
   import { onMount } from "svelte";
   import { route, apiURL } from "../store";
   import Article from "../libs/Article.svelte";
   import Icon from "../libs/Icon.svelte";
   import { add, searchIcon, edit, deleteIcon } from "../store/icons";

   let items;
   export let params;
   const idP = params["0"];

   const accessToken = localStorage.getItem("token");
   const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
   };

   onMount(async () => {
      const response = await fetch($apiURL + "/pengumuman/detail/" + idP, {
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

   function formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getUTCFullYear();
      const monthNames = [
         "Januari",
         "Februari",
         "Maret",
         "April",
         "Mei",
         "Juni",
         "Juli",
         "Augustus",
         "September",
         "Oktober",
         "November",
         "Desember",
      ];
      const month = monthNames[date.getUTCMonth()];
      const day = String(date.getUTCDate()).padStart(2, "0");
      const hours = String(date.getUTCHours()).padStart(2, "0");
      const minutes = String(date.getUTCMinutes()).padStart(2, "0");
      const seconds = String(date.getUTCSeconds()).padStart(2, "0");

      // Format date "YYYY-Month-DD HH:MM:SS"
      // return `${month} ${day}, ${year} / ${hours}:${minutes}:${seconds}`;
      return `${month} ${day}, ${year}`;
   }
</script>

<article class="container">
   {#if items}
      <!-- <div class="box"> -->
      <p class="title is-2">{items.judul}</p>
      <p class="subtitle is-6 timestamp">
         {formatDate(items.create_timestamp)}
      </p>
      <hr />

      {@html items.isi}
   {/if}
</article>

<style>
   article {
      margin-top: 3.5rem;
      /* text-align: center; */
   }

   .timestamp {
      color: grey;
   }
</style>
