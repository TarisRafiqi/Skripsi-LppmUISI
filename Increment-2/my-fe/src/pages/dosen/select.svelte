<script>
   import { cancelIcon, edit, downloadIcon } from "../../store/icons";
   import { route, apiURL, ppmFile } from "../../store";
   import Article from "../../libs/Article.svelte";
   import Fieldview from "../../libs/Fieldview.svelte";
   import { onMount } from "svelte";
   import Select from "../../libs/Select.svelte";
   import Field from "../../libs/Field.svelte";
   import Icon from "../../libs/Icon.svelte";
   import { deleteIcon } from "../../store/icons";

   const accessToken = localStorage.getItem("token");
   const id = Number(localStorage.getItem("id"));
   const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
   };

   let errorMark = true;
</script>

<Article>
   <div class="box">
      <div class="columns is-desktop">
         <div class="column">
            <label class="label" for="jenisProposal"
               >Jenis Proposal {#if errorMark}
                  <span class="errorMark">*</span>
               {/if}</label
            >
            <div class="control">
               {#if errorMark}
                  <input class="input is-danger" type="text" id="judul" />
               {:else}
                  <input class="input" type="text" id="jenisProposal" />
               {/if}
            </div>
            <!-- <p class="help error is-danger">This field is required</p> -->
         </div>

         <div class="column">
            <div class="field">
               <label class="label" for="jenisKegiatan">Jenis Kegiatan</label>

               <div class="control">
                  <div class="select is-fullwidth">
                     <select id="jenisKegiatan">
                        <option value="" selected disabled hidden
                           >Pilih Jenis Proposal</option
                        >
                        <option selected value="Proposal Awal"
                           >Proposal Awal</option
                        >
                        <option value="Proposal Lanjutan"
                           >Proposal Lanjutan</option
                        >
                     </select>
                  </div>
               </div>
            </div>
         </div>

         <div class="column">
            <div class="field">
               <label class="label" for="jenisSkema">Jenis Skema</label>
               <div class="control">
                  <input class="input" type="text" id="jenisSkema" />
               </div>
            </div>
         </div>
      </div>

      <div class="columns is-desktop">
         <div class="column">
            <div class="field">
               <label class="label" for="judul">Kelompok Keahlian</label>
               <div class="control">
                  <input class="input" type="text" id="judul" />
               </div>
            </div>
         </div>

         <div class="column">
            <div class="field">
               <label class="label" for="topik">Topik</label>
               <div class="control">
                  <input class="input" type="text" id="topik" />
               </div>
            </div>
         </div>

         <div class="column">
            <div class="field">
               <label class="label" for="topik">Biaya Penelitian</label>
               <div class="control">
                  <input class="input" type="text" id="topik" />
               </div>
            </div>
         </div>
      </div>

      <div class="columns is-desktop">
         <div class="column">
            <div class="field">
               <label class="label" for="judul">Tanggal Mulai</label>
               <div class="control">
                  <input class="input" type="text" id="judul" />
               </div>
            </div>
         </div>

         <div class="column">
            <div class="field">
               <label class="label" for="topik">Tanggal Selesai</label>
               <div class="control">
                  <input class="input" type="text" id="topik" />
               </div>
            </div>
         </div>
      </div>

      <div class="field">
         <label class="label" for="topik">Anggota Tim</label>
         <div class="control">
            <input class="input" type="text" id="topik" />
         </div>
      </div>
   </div>
</Article>

<style>
   .errorMark {
      color: hsl(348, 100%, 61%);
      font-size: small;
   }
   /*
   .toggle-button {
      cursor: pointer;
      color: #fc6c78;
      font-size: small;
   }
   */

   /* ul {
      margin-left: 1.2em;
      margin-top: -1em;
   }

   ul li {
      margin-bottom: 4px;
   } */
</style>
