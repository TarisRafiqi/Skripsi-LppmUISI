<script>
   import { onMount } from "svelte";
   import { route, apiURL } from "../store";

   let items;

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

<article class="container">
   <div class="pengumuman-container">
      <div class="header-pengumuman">
         <p class="title is-3">PENGUMUMAN</p>
      </div>
      <hr />

      <div class="list-pengumuman">
         <div class="box parent">
            <div class="child">
               {#if items}
                  <table class="table is-fullwidth is-striped is-hoverable">
                     <tbody>
                        {#each items as item}
                           {#if item.active === 1}
                              <tr
                                 on:click={handleClickPengumuman}
                                 pid={item.id}
                              >
                                 <td
                                    ><p class="subtitle is-6 p-pengumuman">
                                       {item.judul}
                                    </p>
                                 </td>
                              </tr>
                           {/if}
                        {/each}
                     </tbody>
                  </table>
               {/if}
            </div>
         </div>
      </div>
   </div>
</article>

<style>
   @media (min-width: 1440px) {
      .pengumuman-container {
         /* padding-right: 8rem; */
         /* padding-left: 8rem; */
         padding-right: 128px;
         padding-left: 128px;
      }
   }

   .pengumuman-container {
      padding-top: 50px;
      padding-bottom: 50px;
   }
   .p-pengumuman {
      color: rgb(0, 119, 255);
      cursor: pointer;
      transition: padding-left 0.2s;
   }
   .p-pengumuman:hover {
      padding-left: 10px;
   }

   .header-pengumuman {
      text-align: center;
      margin-bottom: 1rem;
   }

   /* section {
      padding: 60px 0;
      background-color: #ffffff;
   } */

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
</style>
