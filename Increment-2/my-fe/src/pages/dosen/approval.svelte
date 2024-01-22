<script>
   import { onMount } from "svelte";
   import { route, apiURL } from "../../store";
   import Article from "../../libs/Article.svelte";
   import Icon from "../../libs/Icon.svelte";
   import Status from "../../modules/Status.svelte";
   import { infoOutline } from "../../store/icons";

   const id = localStorage.id;
   let role = localStorage.role;
   let items;

   onMount(async () => {
      const response = await fetch($apiURL + "/approval/" + id);
      const result = await response.json();
      if (response.ok) {
         items = result.dbData;
      } else {
         console.log(response);
      }
   });

   function detail(ev) {
      let propId = ev.target.getAttribute("pid");
      $route("/dosen/detailproposal/" + propId);
   }
</script>

{#if items}
   <Article>
      <h1 class="title is-1">Approval Management</h1>

      <hr />

      <div class="notification is-info is-light">
         <p>
            Berikut adalah list <strong
               >Penelitian / Pengabdian Masyarakat</strong
            >
            yang diberikan kepada anda untuk mendapatkan persetujuan. Cek PPM dengan
            teliti sebelum memberikan persetujuan!
         </p>
      </div>

      <table class="table is-fullwidth is-striped is-hoverable">
         <thead>
            <tr>
               <th>Judul</th>
               <th class="is-narrow">Jenis Kegiatan</th>
               <th class="is-narrow">Jenis Skema</th>
               <th>Status</th>
               <th colspan="2">Action</th>
            </tr>
         </thead>

         <tbody>
            {#if role === "Ka.PusatKajian"}
               {#each items as item}
                  {#if item.status === 10}
                     <tr>
                        <td>{item.judul}</td>
                        <td><p>{item.jenis_kegiatan}</p></td>
                        <td><p>{item.jenis_skema}</p></td>
                        <td class="status" pid={item.id}>
                           <Status code={item.status} />
                        </td>
                        <td class="review"
                           ><button
                              class="button is-info is-rounded is-small"
                              pid={item.id}
                              on:click={detail}
                              ><span class="icon">
                                 <Icon id="orang" src={infoOutline} />
                              </span></button
                           ></td
                        >
                     </tr>
                  {/if}
               {/each}
            {/if}

            {#if role === "reviewer"}
               {#each items as item}
                  {#if item.status === 8}
                     <tr>
                        <td>{item.judul}</td>
                        <td><p>{item.jenis_kegiatan}</p></td>
                        <td><p>{item.jenis_skema}</p></td>
                        <td class="status" pid={item.id}>
                           <Status code={item.status} />
                        </td>
                        <td class="review"
                           ><button
                              class="button is-info is-rounded is-small"
                              pid={item.id}
                              on:click={detail}
                              ><span class="icon">
                                 <Icon id="orang" src={infoOutline} />
                              </span></button
                           ></td
                        >
                     </tr>
                  {/if}
               {/each}
            {/if}

            {#if role === "Ka.LPPM"}
               {#each items as item}
                  {#if item.status === 6}
                     <tr>
                        <td>{item.judul}</td>
                        <td><p>{item.jenis_kegiatan}</p></td>
                        <td><p>{item.jenis_skema}</p></td>
                        <td class="status" pid={item.id}>
                           <Status code={item.status} />
                        </td>
                        <td class="review"
                           ><button
                              class="button is-info is-rounded is-small"
                              pid={item.id}
                              on:click={detail}
                              ><span class="icon">
                                 <Icon id="orang" src={infoOutline} />
                              </span></button
                           ></td
                        >
                     </tr>
                  {/if}
               {/each}
            {/if}

            {#if role === "Ka.Departemen"}
               {#each items as item}
                  {#if item.status === 4}
                     <tr>
                        <td>{item.judul}</td>
                        <td><p>{item.jenis_kegiatan}</p></td>
                        <td><p>{item.jenis_skema}</p></td>
                        <td class="status" pid={item.id}>
                           <Status code={item.status} />
                        </td>
                        <td class="review"
                           ><button
                              class="button is-info is-rounded is-small"
                              pid={item.id}
                              on:click={detail}
                              ><span class="icon">
                                 <Icon id="orang" src={infoOutline} />
                              </span></button
                           ></td
                        >
                     </tr>
                  {/if}
               {/each}
            {/if}
         </tbody>
      </table>
   </Article>
{/if}

<style>
   .review {
      cursor: pointer;
   }

   .status {
      text-align: center;
   }
</style>
