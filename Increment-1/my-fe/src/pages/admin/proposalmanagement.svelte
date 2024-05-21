<script>
   import { onMount } from "svelte";
   import { route, apiURL } from "../../store";
   import Article from "../../libs/Article.svelte";
   import Icon from "../../libs/Icon.svelte";
   import Status from "../../modules/Status.svelte";
   import { infoOutline } from "../../store/icons";

   let items;

   // Pakai akses token, Hanya role admin yang bisa mengakses halaman ini
   onMount(async () => {
      const accessToken = localStorage.getItem("token");

      const headers = {
         Authorization: `Bearer ${accessToken}`,
         "Content-Type": "application/json",
      };

      const response = await fetch($apiURL + "/ppm", {
         method: "GET",
         headers: headers,
      });

      const result = await response.json();

      if (response.status === 401) {
         // localStorage.clear();
         location.pathname = "/tokenexpired";
      } else {
         if (response.ok) {
            items = result.dbData;
         }
      }
   });

   async function handleReview(ev) {
      const id = ev.target.getAttribute("uid");
      $route("/admin/proposal/" + id);
   }

   async function handleApproval(ev) {
      const id = ev.target.getAttribute("uid");
   }
</script>

{#if items}
   <Article>
      <h1 class="title is-1">Proposal Management</h1>
      <hr />

      <div class="box parent">
         <div class="child">
            <table class="table is-fullwidth is-striped is-hoverable">
               <thead>
                  <tr>
                     <th style="width: 50%;">Judul</th>
                     <th
                        style="width: 10%; text-align: center"
                        class="is-narrow">Jenis Kegiatan</th
                     >
                     <th
                        style="width: auto; text-align: center"
                        class="is-narrow">Jenis Skema</th
                     >
                     <th style="width: 15%; text-align: center">Status</th>
                     <th style="width: 5%;" colspan="2">Action</th>
                  </tr>
               </thead>

               <tbody>
                  {#each items as item}
                     <tr>
                        <td class="judul"><p>{item.judul}</p> </td>
                        <td class="kegiatan"><p>{item.jenis_kegiatan}</p></td>
                        <td class="skema"><p>{item.jenis_skema}</p></td>
                        <td class="status"><Status code={item.status} /></td>
                        <td class="review"
                           ><button
                              class="button is-info is-rounded is-small"
                              uid={item.id}
                              on:click={handleReview}
                           >
                              <span class="icon">
                                 <Icon id="review" src={infoOutline} />
                              </span></button
                           ></td
                        >
                     </tr>
                  {/each}
               </tbody>
            </table>
         </div>
      </div>
   </Article>
{/if}

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
      height: 700px;
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
