<script>
   import { onMount } from "svelte";
   import { route, apiURL } from "../../store";
   import Article from "../../libs/Article.svelte";
   import Field from "../../libs/Field.svelte";
   import Wysiwyg from "../../libs/Wysiwyg.svelte";
   import Modalerror from "../../libs/Modalerror.svelte";
   import Modalchecked from "../../libs/Modalchecked.svelte";

   let judulPengumuman, isiPengumuman;
   let activePengumuman = 0;
   let showModalChecked = false;
   export let params;
   const idP = params["1"];
   let items;

   const accessToken = localStorage.getItem("token");
   const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
   };

   onMount(async () => {
      const response = await fetch(
         $apiURL + "/pengumuman/admin/detail/" + idP,
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
            judulPengumuman = items.judul;
            isiPengumuman = items.isi;
            activePengumuman = items.active;
            idPengumuman = items.id;
         }
      }
   });

   function kembali() {
      location.href = "/admin/pengumumanmanagement";
   }

   async function simpanPengumuman() {
      isiPengumuman = tinymce.get("isi").getContent();

      let payload = {
         judulPengumuman,
         isiPengumuman,
         activePengumuman,
         idPengumuman,
      };

      const response = await fetch($apiURL + "/pengumuman", {
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
</script>

<Article>
   <h2 class="title is-2">Edit Pengumuman</h2>
   <hr />

   {#if items}
      <div class="box">
         <Field name="Judul">
            <input
               class="input"
               type="text"
               placeholder="Masukkan Judul Pengumuman"
               bind:value={judulPengumuman}
            />
         </Field>

         <Field name="Isi Pengumuman">
            <Wysiwyg id="isi" content={isiPengumuman} />
         </Field>

         <Field name="Aktif">
            <div class="control">
               <label class="radio">
                  <input
                     id="activePengumuman"
                     type="radio"
                     name="active"
                     value={1}
                     bind:group={activePengumuman}
                  />
                  Yes
               </label>
               <label class="radio">
                  <input
                     id="activePengumuman"
                     type="radio"
                     name="active"
                     value={0}
                     bind:group={activePengumuman}
                  />
                  No
               </label>
            </div>
         </Field>
      </div>
   {/if}

   <div class="field is-grouped is-grouped-right">
      <p class="control">
         <button class="button is-info is-light" on:click={kembali}
            >Kembali</button
         >
         <button class="button is-info" on:click={simpanPengumuman}
            >Simpan</button
         >
      </p>
   </div>
</Article>

<Modalchecked bind:show={showModalChecked}>
   <p>Berhasil menyimpan data</p>
</Modalchecked>
