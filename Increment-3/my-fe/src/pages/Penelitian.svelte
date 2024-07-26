<script>
   import { onMount } from "svelte";
   import { route, apiURL } from "../store";
   import Icon from "../libs/Icon.svelte";
   import { infoOutline, searchIcon } from "../store/icons";
   import Modal from "../libs/Modal.svelte";
   import Field from "../libs/Field.svelte";
   import Fieldview from "../libs/Fieldview.svelte";

   let items;
   let showDetilPenelitian = false;
   let selectedItem = null;
   let filterJudul = "";
   let filterJenisSkema = "";

   const headers = {
      "Content-Type": "application/json",
   };

   onMount(async () => {
      await getAllPenelitian();
   });

   async function detilPenelitian(ev) {
      let idPenelitian = Number(ev.target.getAttribute("pid"));
      selectedItem = items.find((item) => item.id === idPenelitian);
      console.log(selectedItem);

      showDetilPenelitian = true;
   }

   async function getAllPenelitian() {
      const response = await fetch($apiURL + "/showPenelitianPublic", {
         method: "GET",
         headers: headers,
      });

      const result = await response.json();
      console.log(result);

      if (response.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (response.ok) {
            items = result.dbData;
         }
      }
   }

   function getKetua(anggotaTim) {
      return anggotaTim.find((a) => a.role === "Ketua");
   }

   function getAnggota(anggotaTim) {
      return anggotaTim.filter((a) => a.role !== "Ketua");
   }
</script>

<article class="container">
   <p class="title is-2">Penelitian UISI</p>

   <hr />

   <div class="columns">
      <div class="column">
         <div class="field">
            <div class="select is-fullwidth">
               <select bind:value={filterJenisSkema}>
                  <option value="" selected disabled hidden>Jenis Skema</option>

                  <option value="Riset Kelompok Keahlian"
                     >Riset Kelompok Keahlian</option
                  >
                  <option value="Riset Terapan">Riset Terapan</option>
                  <option value="Riset Kerjasama">Riset Kerjasama</option>
                  <option value="Riset Eksternal">Riset Eksternal</option>
                  <option value="Riset Mandiri">Riset Mandiri</option>
               </select>
            </div>
         </div>
      </div>
      <div class="column">
         <div class="field">
            <div class="control has-icons-left">
               <input class="input" type="text" bind:value={filterJudul} />
               <span class="icon is-left">
                  <Icon id="searchIcon" src={searchIcon} />
               </span>
            </div>
         </div>
      </div>
   </div>

   {#if items}
      <div class="box parent">
         <div class="child">
            <table class="table is-striped is-narrow is-hoverable is-fullwidth">
               <thead>
                  <tr>
                     <th>Judul</th>
                     <th>Jenis Skema</th>
                     <th>Topik</th>
                     <th style="text-align: center;">Detil</th>
                  </tr>
               </thead>

               <tbody>
                  {#each items.filter((item) => item.judul
                           .toLowerCase()
                           .includes(filterJudul.toLowerCase()) && (filterJenisSkema === "" || item.jenis_skema === filterJenisSkema)) as item}
                     <tr> </tr><tr>
                        <td>{item.judul}</td>
                        <td>{item.jenis_skema}</td>
                        <td>{item.topik}</td>
                        <td style="text-align: center;"
                           ><button
                              class="button is-info is-small"
                              pid={item.id}
                              on:click={detilPenelitian}
                           >
                              <span class="icon">
                                 <Icon id="detil" src={infoOutline} />
                              </span></button
                           ></td
                        >
                     </tr>
                  {/each}
               </tbody>
            </table>
         </div>
      </div>
   {/if}
</article>

{#if selectedItem}
   <Modal bind:show={showDetilPenelitian}>
      <h4 class="title is-4" slot="header">Detil Kegiatan</h4>

      <div class="border-bottom columns is-desktop">
         <Fieldview title="Judul" content={selectedItem.judul} />
      </div>

      <div class="border-bottom columns is-desktop">
         <Fieldview title="Jenis Skema" content={selectedItem.jenis_skema} />
         <Fieldview
            title="Biaya Penelitian"
            content={selectedItem.biaya_penelitian}
         />
      </div>

      <div class="border-bottom columns is-desktop">
         <Fieldview
            title="Kelompok Keahlian"
            content={selectedItem.kelompok_keahlian}
         />
         <Fieldview title="Topik" content={selectedItem.topik} />
      </div>

      {#if selectedItem.anggota_tim.length}
         {#if getKetua(selectedItem.anggota_tim)}
            <div class="border-bottom columns is-desktop">
               <Fieldview
                  title="Ketua"
                  content={getKetua(selectedItem.anggota_tim).label}
               />
            </div>
         {/if}
         <div class="border-bottom columns is-desktop">
            <Fieldview
               title="Anggota"
               content={getAnggota(selectedItem.anggota_tim)}
               type="listAnggotaTim"
            />
         </div>
      {/if}

      <div class="columns is-desktop">
         <Fieldview title="Abstrak" content={selectedItem.abstrak} />
      </div>
   </Modal>
{/if}

<style>
   article {
      margin-top: 3.5rem;
      word-spacing: 0.1em;
   }

   .border-bottom {
      border-bottom: 1px solid #cccccc;
   }
</style>
