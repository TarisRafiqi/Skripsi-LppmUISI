<script>
   import { onMount } from "svelte";
   import { route, apiURL } from "../store";
   import Icon from "../libs/Icon.svelte";
   import { add, searchIcon, edit, deleteIcon } from "../store/icons";

   let items;

   const accessToken = localStorage.getItem("token");
   const headers = {
      "Content-Type": "application/json",
   };

   onMount(async () => {
      const response = await fetch($apiURL + "/pengumuman/public", {
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
   });

   async function handleClickPengumuman(event) {
      let idP = Number(event.currentTarget.getAttribute("pid"));
      $route("/detailpengumuman/" + idP);
   }
</script>

<section>
   <div class="pengumuman-container">
      <div class="header-pengumuman">
         <p class="title is-3">PENGUMUMAN</p>
      </div>
      <hr />

      <div class="list-pengumuman">
         <div class="box parent">
            <div class="child">
               {#if items}
                  <!-- {#if items.length === 0}
                     <p class="subtitle is-5" style="text-align: center;">
                        Tidak ada pengumuman
                     </p>
                  {/if} -->

                  <table class="table is-fullwidth is-striped is-hoverable">
                     <tbody>
                        {#each items as item}
                           <tr on:click={handleClickPengumuman} pid={item.id}>
                              <td
                                 ><p class="subtitle is-6 p-pengumuman">
                                    {item.judul}
                                 </p>
                              </td>
                           </tr>
                        {/each}
                     </tbody>
                  </table>
               {/if}
            </div>
         </div>

         <!-- {#if items}
                  <ul id="accordion">
                     {#each items as item}
                        <li on:click={handleClickPengumuman}>
                           <p class="subtitle is-6">{item.judul}</p>
                        </li>
                     {/each}
                  </ul>
               {/if} -->
      </div>
   </div>
</section>

<style>
   @media (min-width: 320px) {
      .pengumuman-container {
         padding-right: 1.5rem;
         padding-left: 1.5rem;
      }
   }
   @media (min-width: 768px) {
      .pengumuman-container {
         padding-right: 5rem;
         padding-left: 5rem;
      }
   }
   @media (min-width: 1024px) {
      .pengumuman-container {
         padding-right: 15rem;
         padding-left: 15rem;
      }
   }
   @media (min-width: 1440px) {
      .pengumuman-container {
         padding-right: 25rem;
         padding-left: 25rem;
      }
   }

   .p-pengumuman {
      color: rgb(0, 119, 255);
      cursor: pointer;
   }

   .header-pengumuman {
      text-align: center;
      margin-bottom: 1rem;
   }

   section {
      padding: 60px 0;
      background-color: #ffffff;
   }

   .parent {
      height: 300px;
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

   /* #accordion {
      list-style-type: none;
      margin: 0;
      padding: 0;
   }

   #accordion li {
      width: 100%;
      margin-bottom: 10px;
      background: #ffffff;
      padding: 10px;
      border-radius: 5px;
      cursor: pointer;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      transition:
         box-shadow 0.3s ease,
         border-color 0.3s ease;
   }

   #accordion li:hover {
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
      border-color: #ccc;
   }

   #accordion li p {
      padding-left: 2rem;
   } */
</style>
