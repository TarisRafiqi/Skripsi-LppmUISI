<script>
   import Article from "../../libs/Article.svelte";
   import Icon from "../../libs/Icon.svelte";
   import { add, searchIcon } from "../../store/icons";
   import { edit, deleteIcon } from "../../store/icons";
   import Modal from "../../libs/Modal.svelte";
   import Field from "../../libs/Field.svelte";

   let namaTemplate;
   let file;
   let showModalTambahTemplate = false;

   function clickModalTambahTemplate() {
      showModalTambahTemplate = true;
   }

   function addTemplate() {}
   function simpanTemplate() {}
   function handleDownloadTemplate() {}
</script>

<Article>
   <h1 class="title is-1">Template</h1>
   <hr />

   <div class="columns">
      <div class="column">
         <button class="button is-info" on:click={simpanTemplate}>
            <span class="icon">
               <Icon id="accountAdd" src={add} />
            </span>
            <!-- svelte-ignore a11y-missing-attribute -->
            <span><a>Tambah Template</a></span>
         </button>
      </div>

      <div class="column">
         <div class="field">
            <div class="control has-icons-left">
               <input class="input" type="text" placeholder="Search judul" />
               <span class="icon is-left">
                  <Icon id="searchIcon" src={searchIcon} />
               </span>
            </div>
         </div>
      </div>
   </div>

   <div class="box">
      <table class="table is-fullwidth is-striped is-hoverable">
         <thead>
            <tr>
               <th>Nama Template</th>
               <th class="is-narrow"></th>
               <th class="is-narrow"></th>
            </tr>
         </thead>

         <tbody>
            <tr>
               <td>Contoh Template Penelitian Internal</td>
               <td
                  ><button
                     class="button is-link button is-small"
                     on:click={handleDownloadTemplate}>Download</button
                  ></td
               >
               <td>
                  <div class="field is-grouped">
                     <p class="control">
                        <button class="button is-danger is-outlined is-small"
                           ><span class="icon">
                              <Icon id="delete" src={deleteIcon} />
                           </span></button
                        >
                     </p>
                     <p class="control">
                        <button class="button is-link is-outlined is-small"
                           ><span class="icon">
                              <Icon id="edit" src={edit} />
                           </span></button
                        >
                     </p>
                  </div>
               </td>
            </tr>
         </tbody>
      </table>
   </div>
</Article>

<Modal bind:show={showModalTambahTemplate}>
   <h4 class="title is-4" slot="header">Tambah Template</h4>

   <Field name="Nama Template">
      <input class="input" type="text" bind:value={namaTemplate} />
   </Field>

   <Field name="File Template">
      <input
         class="input"
         accept=".xlsx"
         type="file"
         on:change={(e) => (file = e.target.files[0])}
      />
   </Field>

   <hr />

   <div class="field is-grouped is-grouped-right">
      <p class="control">
         <button class="button is-info" on:click={simpanTemplate}>Simpan</button
         >
      </p>
   </div>
</Modal>
