<script>
   import { onMount } from "svelte";
   import { route, apiURL } from "../../store";
   import Article from "../../libs/Article.svelte";
   import Icon from "../../libs/Icon.svelte";
   import Status from "../../modules/Status.svelte";
   import { infoOutline, searchIcon } from "../../store/icons";

   const id = localStorage.id;
   let role = localStorage.role;
   let items;

   onMount(async () => {
      const accessToken = localStorage.getItem("token");

      const headers = {
         Authorization: `Bearer ${accessToken}`,
         "Content-Type": "application/json",
      };

      const response = await fetch($apiURL + "/approval/" + id, {
         method: "GET",
         headers: headers,
      });

      const result = await response.json();
      // console.log(result);

      if (result.statusCode != 200) {
         // localStorage.clear();
         location.pathname = "/tokenexpired";
      } else {
         if (response.ok) {
            items = result.dbData;
         } else {
            console.log(response);
         }
      }
   });

   function detail(ev) {
      let propId = ev.target.getAttribute("pid");
      $route("/dosen/detailapproval/" + propId);
   }
</script>

<Article>
   <h1 class="title is-1">Approval Management</h1>

   <hr />

   {#if items}
      <div class="box parent">
         <div class="field">
            <div class="control has-icons-left">
               <input
                  class="input is-rounded"
                  type="text"
                  placeholder="Search judul"
               />
               <span class="icon is-left">
                  <Icon id="searchIcon" src={searchIcon} />
               </span>
            </div>
         </div>

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
                  {#if role === "Ka.PusatKajian"}
                     {#each items as item}
                        {#if item.status === 10}
                           <tr>
                              <td class="judul">{item.judul}</td>
                              <td class="kegiatan"
                                 ><p>{item.jenis_kegiatan}</p></td
                              >
                              <td class="skema"><p>{item.jenis_skema}</p></td>
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
                              <td class="judul">{item.judul}</td>
                              <td class="kegiatan"
                                 ><p>{item.jenis_kegiatan}</p></td
                              >
                              <td class="skema"><p>{item.jenis_skema}</p></td>
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
                              <td class="judul">{item.judul}</td>
                              <td class="kegiatan"
                                 ><p>{item.jenis_kegiatan}</p></td
                              >
                              <td class="skema"><p>{item.jenis_skema}</p></td>
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
                              <td class="judul">{item.judul}</td>
                              <td class="kegiatan"
                                 ><p>{item.jenis_kegiatan}</p></td
                              >
                              <td class="skema"><p>{item.jenis_skema}</p></td>
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
         </div>
      </div>
   {/if}
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
