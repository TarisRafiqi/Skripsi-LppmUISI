<script>
   import { onMount } from "svelte";
   import { route, apiURL } from "../../store";
   import Article from "../../libs/Article.svelte";
   import Icon from "../../libs/Icon.svelte";
   import { add, searchIcon, edit, deleteIcon } from "../../store/icons";

   let items, aktifPengumuman;
   let filterJudul = "";

   const accountRole = localStorage.getItem("role");
   const accessToken = localStorage.getItem("token");
   const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
   };

   onMount(async () => {
      await getAllPengumuman();
   });

   function addPengumuman() {
      location.href = "/admin/buatpengumuman";
   }

   async function checkboxAktifPengumuman(idPengumuman, active) {
      const pengumumanAktif = active ? 1 : 0;
      payload = {
         pengumumanAktif,
         idPengumuman,
      };

      const response = await fetch($apiURL + "/pengumuman/tableEdit", {
         method: "PATCH",
         headers: headers,
         body: JSON.stringify(payload),
      });

      if (response.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (!response.ok) {
            console.log(response);
         }
      }
   }

   async function getAllPengumuman() {
      const response = await fetch($apiURL + "/pengumuman", {
         method: "GET",
         headers: headers,
      });

      const result = await response.json();

      if (response.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (response.ok) {
            items = result.dbData;
         }
      }
   }

   function editPengumuman(ev) {
      let idPengumuman = ev.target.getAttribute("pid");
      $route("/admin/editpengumuman/" + idPengumuman);
   }

   async function deletePengumuman(ev) {
      let idPengumuman = ev.target.getAttribute("pid");

      const response = await fetch($apiURL + "/pengumuman/" + idPengumuman, {
         method: "DELETE",
         headers: headers,
      });

      const result = await response.json();

      if (response.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (response.ok) {
            await getAllPengumuman();
         } else {
            console.log(response);
         }
      }
   }
</script>

<Article>
   {#if accountRole === "admin"}
      <h2 class="title is-2">Pengumuman</h2>
      <hr />

      <div class="columns">
         <div class="column">
            <button class="button is-info" on:click={addPengumuman}>
               <span class="icon">
                  <Icon id="accountAdd" src={add} />
               </span>
               <!-- svelte-ignore a11y-missing-attribute -->
               <span><a>Buat Pengumuman</a></span>
            </button>
         </div>

         <div class="column">
            <div class="field">
               <div class="control has-icons-left">
                  <input class="input" type="text" bind:value={filterJudul} />
                  <span class="icon is-left">
                     <Icon id="searchIcon" src={searchIcon} />
                  </span>
               </div>
            </div>
         </div>
      </div>

      {#if items}
         <div class="box parent">
            <div class="child">
               <table class="table is-fullwidth is-striped is-hoverable">
                  <thead>
                     <tr>
                        <th>Judul</th>
                        <th style="text-align: center;">Aktif</th>
                        <th style="text-align: center;" class="is-narrow"
                           >Delete/Edit</th
                        >
                     </tr>
                  </thead>

                  <tbody>
                     <!-- {#each items as item} -->
                     {#each items.filter((item) => item.judul
                           .toLowerCase()
                           .includes(filterJudul.toLowerCase())) as item}
                        <tr>
                           <td>{item.judul}</td>
                           <td style="text-align: center;">
                              <input
                                 type="checkbox"
                                 bind:checked={item.active}
                                 on:change={() =>
                                    checkboxAktifPengumuman(
                                       item.id,
                                       item.active
                                    )}
                              /></td
                           >
                           <td>
                              <div class="field is-grouped">
                                 <p class="control">
                                    <button
                                       class="button is-danger is-outlined is-small"
                                       pid={item.id}
                                       on:click={deletePengumuman}
                                       ><span class="icon">
                                          <Icon id="delete" src={deleteIcon} />
                                       </span></button
                                    >
                                 </p>
                                 <p class="control">
                                    <button
                                       class="button is-link is-outlined is-small"
                                       pid={item.id}
                                       on:click={editPengumuman}
                                       ><span class="icon">
                                          <Icon id="edit" src={edit} />
                                       </span></button
                                    >
                                 </p>
                              </div>
                           </td>
                        </tr>
                     {/each}
                  </tbody>
               </table>
            </div>
         </div>
      {/if}
   {:else}
      <p class="title is-4">Anda tidak memiliki hak akses halaman ini!</p>
   {/if}
</Article>

<style>
   .parent {
      max-height: 60vh;
      overflow: hidden;
   }

   .child {
      max-height: 100%;
      overflow-y: auto;
      scrollbar-width: thin;
   }

   .box {
      display: flex;
      flex-direction: column;
   }
</style>
