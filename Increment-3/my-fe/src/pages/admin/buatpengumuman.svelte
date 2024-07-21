<script>
   import { route, apiURL } from "../../store";
   import Article from "../../libs/Article.svelte";
   import Field from "../../libs/Field.svelte";
   import Wysiwyg from "../../libs/Wysiwyg.svelte";
   import Modalerror from "../../libs/Modalerror.svelte";
   import Modalchecked from "../../libs/Modalchecked.svelte";

   let judulPengumuman, isiPengumuman;
   let activePengumuman = "";
   let showModalChecked = false;

   const accessToken = localStorage.getItem("token");
   const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
   };

   function kembali() {
      location.href = "/admin/pengumumanmanagement";
   }

   async function submitPengumuman() {
      isiPengumuman = tinymce.get("isi").getContent();

      let payload = {
         judulPengumuman,
         isiPengumuman,
         activePengumuman,
      };
      // console.log(payload);

      const response = await fetch($apiURL + "/pengumuman", {
         method: "POST",
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
   <h2 class="title is-2">Buat Pengumuman</h2>
   <hr />

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
         <!-- <Wysiwyg id="isi" content={isiPengumuman} /> -->
         <Wysiwyg id="isi" content={isiPengumuman} />
      </Field>

      <Field name="Aktif">
         <div class="control">
            <label class="radio">
               <input
                  id="activePengumuman"
                  type="radio"
                  name="active"
                  value="1"
                  bind:group={activePengumuman}
               />
               Yes
            </label>
            <label class="radio">
               <input
                  id="activePengumuman"
                  type="radio"
                  name="active"
                  value="0"
                  bind:group={activePengumuman}
               />
               No
            </label>
         </div>
      </Field>
   </div>

   <div class="field is-grouped is-grouped-right">
      <p class="control">
         <button class="button is-info is-light" on:click={kembali}
            >Kembali</button
         >
         <button class="button is-info" on:click={submitPengumuman}
            >Submit</button
         >
      </p>
   </div>
</Article>

<Modalchecked bind:show={showModalChecked}>
   <p>Berhasil menyimpan data</p>
</Modalchecked>
