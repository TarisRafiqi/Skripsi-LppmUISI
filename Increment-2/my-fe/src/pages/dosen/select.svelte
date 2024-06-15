<script>
   import { cancelIcon, edit, downloadIcon } from "../../store/icons";
   import { route, apiURL, ppmFile } from "../../store";
   import Article from "../../libs/Article.svelte";
   import Field from "../../libs/Field.svelte";
   import Icon from "../../libs/Icon.svelte";
   import { onMount } from "svelte";

   let isFormVisible1 = false;
   let biodataVisible = true;
</script>

<Article>
   <div class="box">
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <h6 class="title is-6">
         Biodata: Taris Rafiqi Izatri, S.Kom. <span
            class="toggle-button"
            on:click={() => (biodataVisible = !biodataVisible)}
         >
            {biodataVisible ? "(tutup)" : "(buka)"}
         </span>
      </h6>

      {#if biodataVisible}
         <hr />
         <p class="title is-5"><b>Identitas Diri</b></p>
         <div class="notification is-info is-light">
            <p>Pastikan untuk melengkapi Identitas Diri.</p>
         </div>

         <div class="columns is-desktop">
            <div class="column">
               <div class="field">
                  <p class="title is-6"><b>Nama Lengkap</b></p>
                  <p class="subtitle is-6">Taris Rafiqi Izatri, S.Kom.</p>
               </div>
            </div>
            <div class="column">
               <div class="field">
                  <p class="title is-6"><b>Jabatan Fungsional</b></p>
                  <p class="subtitle is-6">Lektor</p>
               </div>
            </div>
         </div>

         <div class="columns is-desktop">
            <div class="column">
               <div class="field">
                  <p class="title is-6"><b>NIP</b></p>
                  <p class="subtitle is-6">3011810050</p>
               </div>
            </div>
            <div class="column">
               <div class="field">
                  <p class="title is-6"><b>NIDN</b></p>
                  <p class="subtitle is-6">101202000304082</p>
               </div>
            </div>
         </div>

         <div class="columns is-desktop">
            <div class="column">
               <div class="field">
                  <p class="title is-6"><b>Email</b></p>
                  <p class="subtitle is-6">Tarisrafiqi@gmail.com</p>
               </div>
            </div>
            <div class="column">
               <div class="field">
                  <p class="title is-6"><b>Nomor Handphone</b></p>
                  <p class="subtitle is-6">081110743103</p>
               </div>
            </div>
         </div>

         <div class="columns is-desktop">
            <div class="column">
               <div class="field">
                  <p class="title is-6"><b>Tempat Lahir</b></p>
                  <p class="subtitle is-6">Padang</p>
               </div>
            </div>
            <div class="column">
               <div class="field">
                  <p class="title is-6"><b>Tanggal Lahir</b></p>
                  <p class="subtitle is-6">06-05-2000</p>
               </div>
            </div>
         </div>

         <div class="columns is-desktop">
            <div class="column">
               <div class="field">
                  <p class="title is-6"><b>Alamat Rumah</b></p>
                  <p class="subtitle is-6">Perumahan Semen Indonesia, Blok G</p>
               </div>
            </div>
            <div class="column">
               <div class="field">
                  <p class="title is-6"><b>Telp/Fax Rumah</b></p>
                  <p class="subtitle is-6">0751496808</p>
               </div>
            </div>
         </div>

         <div class="columns is-desktop">
            <div class="column">
               <div class="field">
                  <p class="title is-6"><b>Alamat Kantor</b></p>
                  <p class="subtitle is-6">Jl. Veteran, Kb. Dalem, Sidomoro</p>
               </div>
            </div>
            <div class="column">
               <div class="field">
                  <p class="title is-6"><b>Telp/Fax Kantor</b></p>
                  <p class="subtitle is-6">021918274</p>
               </div>
            </div>
         </div>

         <div class="columns is-desktop">
            <div class="column">
               <div class="field">
                  <p class="title is-6"><b>Mata Kuliah yang diampu</b></p>
                  <ul style="list-style-type:disc">
                     <li>Pemograman 2</li>
                     <li>Sistem Basis Data</li>
                     <li>Machine Learning</li>
                  </ul>
               </div>
            </div>
            <div class="column"></div>
         </div>
      {/if}
   </div>

   <div class="box">
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <h4 class="title is-5">
         Test Extend Box
         <span
            class="toggle-button"
            on:click={() => (isFormVisible1 = !isFormVisible1)}
         >
            {isFormVisible1 ? "(tutup)" : "(buka)"}
         </span>
      </h4>

      {#if isFormVisible1}
         <div class="field">
            <label for="Username">Username</label>
            <input class="input" type="text" />
         </div>

         <div class="field">
            <label for="Passowrd">Password</label>
            <input class="input" type="password" />
         </div>
      {/if}
   </div>
</Article>

<style>
   .toggle-button {
      cursor: pointer;
      color: #fc6c78;
      font-size: small;
   }
   ul {
      margin-left: 1.2em;
      margin-top: -1em;
   }
   ul li {
      margin-bottom: 4px;
   }
</style>
