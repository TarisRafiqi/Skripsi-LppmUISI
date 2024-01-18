<script>
   import Article from "../../libs/Article.svelte";
   import Icon from "../../libs/Icon.svelte";
   import { add } from "../../store/icons";
   import { infoOutline, deleteIcon } from "../../store/icons";

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

   <table class="table is-fullwidth is-striped is-hoverable">
      <thead>
         <tr>
            <th class="is-narrow"></th>
            <th>Judul</th>
            <th class="is-narrow"></th>
         </tr>
      </thead>

      <tbody>
         <tr>
            <td
               ><button class="button is-danger is-rounded is-small"
                  ><span class="icon">
                     <Icon id="delete" src={deleteIcon} />
                  </span></button
               ></td
            >
            <td>...</td>
            <td
               ><button class="button is-info is-rounded is-small"
                  ><span class="icon">
                     <Icon id="orang" src={infoOutline} />
                  </span></button
               ></td
            >
         </tr>
      </tbody>
   </table>
</Article>
