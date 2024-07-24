<script>
   import { onMount } from "svelte";
   import { route, apiURL } from "../store";
   import Icon from "../libs/Icon.svelte";
   import { infoOutline, searchIcon } from "../store/icons";

   let items;

   const headers = {
      "Content-Type": "application/json",
   };
</script>

<article class="container">
   <p class="title is-2">Penelitian Hibah Internal UISI</p>

   <hr />

   <div class="columns">
      <div class="column"></div>
      <div class="column">
         <div class="field">
            <div class="control has-icons-left">
               <input class="input" type="text" />
               <span class="icon is-left">
                  <Icon id="searchIcon" src={searchIcon} />
               </span>
            </div>
         </div>
      </div>
   </div>

   <table class="table is-striped is-narrow is-hoverable is-fullwidth">
      <thead>
         <tr>
            <th>Judul Penelitian</th>
            <th>Jenis Skema</th>
            <th>Sumber Dana</th>
            <th style="text-align: center;">Detil</th>
         </tr>
      </thead>

      <tbody>
         <tr>
            <td
               >Penggunaan Material Kaca Dalam Upaya Penurunan Suhu Udara Dalam
               Ruang</td
            >
            <td>Riset Kelompok Keahlian</td>
            <td>Hibah Internal</td>
            <td style="text-align: center;"
               ><button class="button is-info is-small">
                  <span class="icon">
                     <Icon id="detil" src={infoOutline} />
                  </span></button
               ></td
            >
         </tr>
      </tbody>
   </table>
</article>

<style>
   article {
      margin-top: 3.5rem;
      word-spacing: 0.1em;
   }
</style>
