<script>
   import { onMount } from "svelte";
   import Article from "../../libs/Article.svelte";
   import Icon from "../../libs/Icon.svelte";
   import { route, apiURL } from "../../store";
   import { penelitian, pengmas, jurnal, copyright } from "../../store/icons";

   let items, penelitianCounter, pengmasCounter;
   let reminder;
   const id = Number(localStorage.getItem("id"));
   const accessToken = localStorage.getItem("token");

   const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
   };

   onMount(async () => {
      const response = await fetch($apiURL + "/ppm/all/" + id, {
         method: "GET",
         headers: headers,
      });

      const result = await response.json();

      if (response.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (response.ok) {
            items = result.dbData;
         } else {
            console.log(response);
         }
      }

      // ---------------------------------------
      // Counter Penelitian
      // ---------------------------------------
      const responseCP = await fetch($apiURL + "/counterPenelitian/" + id, {
         method: "GET",
         headers: headers,
      });

      const resultCP = await responseCP.json();

      if (responseCP.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (responseCP.ok) {
            penelitianCounter = resultCP.penelitianCounter;
         } else {
            console.log(responseCP);
         }
      }

      // ---------------------------------------
      // Counter Pengabdian Masyarakat
      // ---------------------------------------
      const responseCPM = await fetch($apiURL + "/counterPengmas/" + id, {
         method: "GET",
         headers: headers,
      });

      const resultCPM = await responseCPM.json();

      if (responseCPM.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (responseCPM.ok) {
            pengmasCounter = resultCPM.pengmasCounter;
         } else {
            console.log(responseCPM);
         }
      }

      //------------------------------------------------------------
      // Get Profile
      //------------------------------------------------------------
      const responseGP = await fetch($apiURL + "/user/" + id, {
         method: "GET",
         headers: headers,
      });

      const resultGP = await responseGP.json();

      if (responseGP.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (responseGP.ok) {
            nama_lengkap = resultGP.nama_lengkap;
            localStorage.setItem("nama_lengkap", nama_lengkap);
         }
      }
   });
</script>

<Article>
   <h2 class="title is-2">Dashboard</h2>

   <hr />

   <div class="columns is-desktop">
      <div class="column">
         <div class="box">
            <div class="flex-item-left">
               <Icon id="logo" src={penelitian} size="2" />
            </div>
            <div class="flex-item-right has-text-centered">
               <p class="heading">Penelitian</p>
               <p class="title">{penelitianCounter}</p>
            </div>
         </div>
      </div>

      <div class="column">
         <div class="box">
            <div class="flex-item-left">
               <Icon id="logo" src={pengmas} size="2" />
            </div>
            <div class="flex-item-right has-text-centered">
               <p class="heading">Pengmas</p>
               <p class="title">{pengmasCounter}</p>
            </div>
         </div>
      </div>

      <div class="column">
         <div class="box">
            <div class="flex-item-left">
               <Icon id="logo" src={jurnal} size="2" />
            </div>
            <div class="flex-item-right has-text-centered">
               <p class="heading">Ongoing</p>
               <p class="title">...</p>
            </div>
         </div>
      </div>

      <div class="column">
         <div class="box">
            <div class="flex-item-left">
               <Icon id="logo" src={copyright} size="2" />
            </div>
            <div class="flex-item-right has-text-centered">
               <p class="heading">Completed</p>
               <p class="title">...</p>
            </div>
         </div>
      </div>
   </div>

   <div class="box parent">
      <div class="column">
         <div>
            <h4 class="title is-4">Reminder</h4>
         </div>

         <br />

         <div class="child">
            {#if items}
               <table
                  class="table is-fullwidth is-striped is-hoverable is-bordered"
               >
                  <thead>
                     <tr>
                        <th style="width: 70%;">Judul</th>
                        <th style="width: 15%; text-align: center">Deadline</th>
                     </tr>
                  </thead>
                  <tbody>
                     {#each items as item}
                        <tr>
                           <td>{item.judul}</td>
                           <td class="isi">{item.tanggal_selesai}</td>
                        </tr>
                     {/each}
                  </tbody>
               </table>
            {/if}
         </div>
      </div>
   </div>
</Article>

<style>
   .isi {
      text-align: center;
   }

   .parent {
      max-height: 400px;
      overflow: hidden;
   }

   .child {
      height: 100%;
      margin-right: -35px; /* Maximum width of scrollbar */
      padding-right: 25px; /* Maximum width of scrollbar */
      padding-bottom: 25px;
      scrollbar-width: thin;
      overflow-y: scroll;
   }

   .box {
      display: flex;
   }

   .flex-item-left {
      flex: 50%;
   }
   .flex-item-right {
      flex: 50%;
   }
</style>
