<script>
   import { onMount } from "svelte";
   import Article from "../../libs/Article.svelte";
   import Icon from "../../libs/Icon.svelte";
   import { apiURL } from "../../store";
   import { penelitian, pengmas, jurnal, copyright } from "../../store/icons";

   let items, penelitianCounter, pengmasCounter;
   let reminder;
   const id = Number(localStorage.getItem("id"));

   function daysUntil(targetDate) {
      const today = new Date();
      const target = new Date(targetDate);
      const difference = target.getTime() - today.getTime();
      const positiveDifference = Math.abs(difference);
      // const days = Math.ceil(difference / (1000 * 3600 * 24));
      const days = Math.floor(positiveDifference / (1000 * 3600 * 24));

      // Convert the difference from milliseconds to days, weeks, and months
      const weeks = Math.floor(days / 7);
      const months = Math.floor(days / 30);
      const remainingWeeks = weeks % 4;
      const remainingDays = days % 30;
      return {
         months,
         remainingWeeks,
         remainingDays,
      };
   }

   onMount(async () => {
      const accessToken = localStorage.getItem("token");

      const headers = {
         Authorization: `${accessToken}`,
         "Content-Type": "application/json",
      };

      const response = await fetch($apiURL + "/ppm/all/" + id, {
         method: "GET",
         headers: headers,
      });

      const result = await response.json();

      if (response.ok) {
         items = result.dbData;
         // console.log(items);
         reminder = [];
         for (const item of items) {
            // console.log(item);
            reminder.push({
               judul: item.judul,
               selesai: item.tanggal_selesai,
               tersisa: `${daysUntil(item.tanggal_selesai).months} bulan, ${daysUntil(item.tanggal_selesai).remainingWeeks} minggu dan ${daysUntil(item.tanggal_selesai).remainingDays} hari`,
               // tersisa:
               //    daysUntil(item.tanggal_selesai).months +
               //    " bulan, " +
               //    daysUntil(item.tanggal_selesai).remainingWeeks +
               //    " minggu. " +
               //    daysUntil(item.tanggal_selesai).remainingDays +
               //    " hari.",
            });
         }
      } else {
         console.log(response);
      }

      // ---------------------------------------
      // Counter Penelitian
      // ---------------------------------------
      const responseCP = await fetch($apiURL + "/counterPenelitian/" + id, {
         method: "GET",
         headers: headers,
      });

      const resultCP = await responseCP.json();

      if (responseCP.ok) {
         penelitianCounter = resultCP.penelitianCounter;
      } else {
         console.log(responseCP);
      }

      // ---------------------------------------
      // Counter Pengabdian Masyarakat
      // ---------------------------------------
      const responseCPM = await fetch($apiURL + "/counterPengmas/" + id, {
         method: "GET",
         headers: headers,
      });

      const resultCPM = await responseCPM.json();

      if (responseCPM.ok) {
         pengmasCounter = resultCPM.pengmasCounter;
      } else {
         console.log(responseCPM);
      }

      //------------------------------------------------------------
      // Get Profile
      //------------------------------------------------------------
      const responseGP = await fetch($apiURL + "/user/" + id, {
         method: "GET",
         headers: headers,
      });

      const resultGP = await responseGP.json();

      if (responseGP.ok) {
         // dataGP = resultGP;
         nama_lengkap = resultGP.nama_lengkap;
         localStorage.setItem("nama_lengkap", nama_lengkap);
      }
   });
</script>

<Article>
   <h1 class="title is-1">Dashboard</h1>

   <hr />

   <div class="columns">
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
               <p class="heading">Jurnal</p>
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
               <p class="heading">HKI</p>
               <p class="title">...</p>
            </div>
         </div>
      </div>
   </div>

   <div class="box parent">
      <div class="column">
         <div>
            <h4 class="title is-4">Notification</h4>
         </div>

         <br />

         <div class="child">
            {#if reminder}
               <ul>
                  {#each reminder as reminder}
                     <li align="justify">
                        PPM dengan judul <em
                           ><strong>{reminder.judul}</strong></em
                        >
                        tersisa
                        <em><strong>{reminder.tersisa}</strong></em>. Berakhir
                        pada {reminder.selesai}.
                        <hr />
                     </li>
                  {/each}
               </ul>
            {/if}
         </div>
      </div>
   </div>
</Article>

<style>
   /* .vl {
      border-left: 1px solid rgb(200, 200, 200);
      height: auto;
   } */

   /* .hoverable:hover {
      background-color: rgba(0, 0, 0, 0.04);
   } */
   /* .notification-title {
    position: sticky; 
    top: 0; 
    background-color: white; 
    z-index: 1; 
    padding: 10px; 
} */

   /* .overflow {
      max-height: 500px;
      overflow-y: auto;
   } */
   .parent {
      height: 500px;
      overflow: hidden;
   }

   .child {
      height: 100%;
      margin-right: -35px; /* Maximum width of scrollbar */
      padding-right: 25px; /* Maximum width of scrollbar */
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
