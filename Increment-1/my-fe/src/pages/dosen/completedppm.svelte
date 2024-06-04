<script>
   import { onMount } from "svelte";
   import { route, apiURL } from "../../store";
   import Article from "../../libs/Article.svelte";
   import Icon from "../../libs/Icon.svelte";
   import Status from "../../modules/Status.svelte";
   import { infoOutline, searchIcon } from "../../store/icons";
</script>

<Article>
   <h2 class="title is-2">Completed Penelitian / Pengabdian Masyarakat</h2>
   <hr />

   <div class="field">
      <div class="control has-icons-left">
         <input class="input" type="text" placeholder="Search judul" />
         <span class="icon is-left">
            <Icon id="searchIcon" src={searchIcon} />
         </span>
      </div>
   </div>

   <div class="box parent">
      <div class="child">
         <table class="table is-fullwidth is-striped is-hoverable">
            <thead>
               <tr>
                  <th style="width: 50%;">Judul</th>
                  <th style="width: 10%; text-align: center" class="is-narrow"
                     >Jenis Kegiatan</th
                  >
                  <th style="width: auto; text-align: center" class="is-narrow"
                     >Jenis Skema</th
                  >
                  <th style="width: 15%; text-align: center">Status</th>
                  <th style="width: 5%;" colspan="2">Action</th>
               </tr>
            </thead>

            <tbody>
               <tr>
                  <td class="judul"></td>
                  <td class="kegiatan"></td>
                  <td class="skema"></td>
                  <td class="status"> </td>
                  <td class="review"
                     ><button class="button is-info is-small"
                        ><span class="icon">
                           <Icon id="info" src={infoOutline} />
                        </span></button
                     ></td
                  >
               </tr>
            </tbody>
         </table>
      </div>
   </div>
</Article>

<style>
   .judul {
      text-align: justify;
   }

   .kegiatan,
   .skema,
   .status,
   .review {
      text-align: center;
   }

   .review {
      cursor: pointer;
   }

   .parent {
      height: 600px;
      overflow: hidden;
   }

   .child {
      height: 100%;
      margin-right: -20px;
      padding-right: 20px;
      scrollbar-width: thin;
      overflow-y: scroll;
   }
</style>
