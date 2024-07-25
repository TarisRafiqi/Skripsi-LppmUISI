<script>
   import { onMount } from "svelte";
   import Article from "../../libs/Article.svelte";
   import Field from "../../libs/Field.svelte";
   import Wysiwyg from "../../libs/Wysiwyg.svelte";
   import { route, apiURL } from "../../store";
   import Modalchecked from "../../libs/Modalchecked.svelte";

   let profilUISI, visi, misi, strukturOrganisasi;
   let showModalChecked = false;

   const accountRole = localStorage.getItem("role");
   const accessToken = localStorage.getItem("token");
   const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
   };

   onMount(async () => {
      await getProfilUISI();
      await getVisiMisi();
      await getStrukturOrganisasi();
   });

   async function getProfilUISI() {
      const response = await fetch($apiURL + "/UISI_Profil", {
         method: "GET",
         headers: headers,
      });

      const result = await response.json();

      if (response.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (response.ok) {
            items = result.dbData;
            profilUISI = items.profil;
         }
      }
   }

   async function getVisiMisi() {
      const response = await fetch($apiURL + "/UISI_visiMisi", {
         method: "GET",
         headers: headers,
      });

      const result = await response.json();

      if (response.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (response.ok) {
            items = result.dbData;
            visi = items.visi;
            misi = items.misi;
         }
      }
   }

   async function getStrukturOrganisasi() {
      const response = await fetch($apiURL + "/UISI_StrukturOrganisasi", {
         method: "GET",
         headers: headers,
      });

      const result = await response.json();

      if (response.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (response.ok) {
            items = result.dbData;
            strukturOrganisasi = items.struktur_organisasi;
         }
      }
   }

   async function simpanProfilUISI() {
      profilUISI = tinymce.get("profilUISI").getContent();

      let payload = {
         profilUISI,
      };

      const response = await fetch($apiURL + "/UISI_Profil", {
         method: "PATCH",
         headers: headers,
         body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (response.ok) {
            showModalChecked = true;
            setTimeout(() => {
               window.location.reload();
            }, 500);
         } else {
            console.log(response.msg, error);
         }
      }
   }

   async function simpanVisidanMisi() {
      misi = tinymce.get("misi").getContent();

      let payload = {
         visi,
         misi,
      };

      const response = await fetch($apiURL + "/UISI_visiMisi", {
         method: "PATCH",
         headers: headers,
         body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (response.ok) {
            showModalChecked = true;
            setTimeout(() => {
               window.location.reload();
            }, 500);
         } else {
            console.log(response.msg, error);
         }
      }
   }

   async function simpanStrukturOrganisasi() {
      strukturOrganisasi = tinymce.get("strukturOrganisasi").getContent();

      let payload = {
         strukturOrganisasi,
      };

      const response = await fetch($apiURL + "/UISI_StrukturOrganisasi", {
         method: "PATCH",
         headers: headers,
         body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (response.ok) {
            showModalChecked = true;
            setTimeout(() => {
               window.location.reload();
            }, 500);
         } else {
            console.log(response.msg, error);
         }
      }
   }

   let tab1 = true;
   let tab2;
   let tab3;

   function clicktab1() {
      tab1 = true;
      tab2 = false;
      tab3 = false;
   }

   function clicktab2() {
      tab1 = false;
      tab2 = true;
      tab3 = false;
   }

   function clicktab3() {
      tab1 = false;
      tab2 = false;
      tab3 = true;
   }
</script>

<Article>
   {#if accountRole === "admin"}
      <h2 class="title is-2">About UISI</h2>

      <div class="tabs is-boxed">
         <ul>
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <li on:click={clicktab1} class:is-active={tab1}>
               <!-- svelte-ignore a11y-missing-attribute -->
               <a>
                  <span>Profil</span>
               </a>
            </li>
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <li on:click={clicktab2} class:is-active={tab2}>
               <!-- svelte-ignore a11y-missing-attribute -->
               <a>
                  <span>Visi dan Misi</span>
               </a>
            </li>
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <li on:click={clicktab3} class:is-active={tab3}>
               <!-- svelte-ignore a11y-missing-attribute -->
               <a>
                  <span>Struktur Organisasi</span>
               </a>
            </li>
         </ul>
      </div>

      <div class="box">
         {#if tab1 === true}
            <Field name="Profil">
               <Wysiwyg id="profilUISI" content={profilUISI} fewFeatures />
            </Field>

            <br />

            <div class="field is-grouped is-grouped-right">
               <p class="control">
                  <button class="button is-info" on:click={simpanProfilUISI}
                     >Simpan</button
                  >
               </p>
            </div>
         {/if}

         {#if tab2 === true}
            <Field name="Visi">
               <textarea
                  class="textarea"
                  id="visi"
                  placeholder="Masukkan Visi"
                  bind:value={visi}
               ></textarea>
            </Field>

            <Field name="Misi">
               <Wysiwyg id="misi" content={misi} fewFeatures />
            </Field>

            <br />

            <div class="field is-grouped is-grouped-right">
               <p class="control">
                  <button class="button is-info" on:click={simpanVisidanMisi}
                     >Simpan</button
                  >
               </p>
            </div>
         {/if}

         {#if tab3 === true}
            <Field name="Struktur Organisasi">
               <Wysiwyg
                  id="strukturOrganisasi"
                  content={strukturOrganisasi}
                  fewFeatures
               />
            </Field>

            <br />

            <div class="field is-grouped is-grouped-right">
               <p class="control">
                  <button
                     class="button is-info"
                     on:click={simpanStrukturOrganisasi}>Simpan</button
                  >
               </p>
            </div>
         {/if}
      </div>
   {:else}
      <p class="title is-4">Anda tidak memiliki hak akses halaman ini!</p>
   {/if}
</Article>

<Modalchecked bind:show={showModalChecked}>
   <p>Berhasil menyimpan data</p>
</Modalchecked>
