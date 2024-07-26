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

<article class="container" id="pengumuman">
   <div class="pengumuman-container">
      <div class="header-pengumuman">
         <p class="title is-3">PENGUMUMAN</p>
      </div>
      <hr />
      <div class="columns">
         <div class="column is-6">
            <div class="box parent">
               <div class="child list-pengumuman">
                  {#if items}
                     <table class="table is-fullwidth is-striped is-hoverable">
                        <tbody>
                           {#each items as item}
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
                           {/each}
                        </tbody>
                     </table>
                  {/if}
               </div>
            </div>
         </div>

         <div class="column"></div>

         <div class="column is-5">
            <figure class="image">
               <img
                  alt="announcement-icon"
                  src="http://localhost:3000/img/icon-announcement.png"
               />
            </figure>
         </div>
      </div>
   </div>
</article>

<style>
   /* @media (min-width: 1440px) {
      .pengumuman-container {
         padding-right: 128px;
         padding-left: 128px;
      }
   } */

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
      margin-bottom: 1.5rem;
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

   /* Define the keyframes for the up and down movement */
   @keyframes moveUpDown {
      0%,
      100% {
         transform: translateY(0);
      }
      50% {
         transform: translateY(-15px);
      }
   }

   /* Apply the animation to the image */
   .image {
      animation: moveUpDown 3s infinite;
   }
</style>
