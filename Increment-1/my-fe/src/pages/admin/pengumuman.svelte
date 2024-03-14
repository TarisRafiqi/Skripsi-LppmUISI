<script>
   import Article from "../../libs/Article.svelte";
   import Icon from "../../libs/Icon.svelte";
   import { add } from "../../store/icons";
   import { edit, deleteIcon } from "../../store/icons";

   function addPengumuman() {
      location.href = "/admin/buatpengumuman";
   }
</script>

<Article>
   <h1 class="title is-1">Pengumuman</h1>
   <hr />

   <button class="button is-info" on:click={addPengumuman}>
      <span class="icon">
         <Icon id="add" src={add} />
      </span>
      <!-- svelte-ignore a11y-missing-attribute -->
      <span><a>Buat Pengumuman</a></span>
   </button>

   <div class="box">
      <table class="table is-fullwidth is-striped is-hoverable">
         <thead>
            <tr>
               <th>Judul</th>
               <th class="is-narrow"></th>
            </tr>
         </thead>

         <tbody>
            <tr>
               <td>Contoh Nama Pengumuman 1</td>
               <td>
                  <div class="field is-grouped">
                     <p class="control">
                        <button
                           class="button is-danger is-rounded is-outlined is-small"
                           ><span class="icon">
                              <Icon id="delete" src={deleteIcon} />
                           </span></button
                        >
                     </p>
                     <p class="control">
                        <button
                           class="button is-link is-rounded is-outlined is-small"
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
