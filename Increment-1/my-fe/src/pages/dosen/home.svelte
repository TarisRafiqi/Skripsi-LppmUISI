<script>
   import { onMount } from "svelte";
   import Article from "../../libs/Article.svelte";
   import Icon from "../../libs/Icon.svelte";
   import { route, apiURL } from "../../store";
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
         Authorization: `Bearer ${accessToken}`,
         "Content-Type": "application/json",
      };

      const response = await fetch($apiURL + "/ppm/all/" + id, {
         method: "GET",
         headers: headers,
      });

      const result = await response.json();

      if (result.statusCode != 200) {
         // localStorage.clear();
         location.pathname = "/tokenexpired";
      } else {
         if (response.ok) {
            items = result.dbData;
            reminder = [];
            for (const item of items) {
               reminder.push({
                  judul: item.judul,
                  selesai: item.tanggal_selesai,
                  tersisa: `${daysUntil(item.tanggal_selesai).months} bulan, ${daysUntil(item.tanggal_selesai).remainingWeeks} minggu dan ${daysUntil(item.tanggal_selesai).remainingDays} hari`,
               });
            }
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

      if (resultCP.statusCode != 200) {
         // localStorage.clear();
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

      if (resultCPM.statusCode != 200) {
         // localStorage.clear();
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

      if (resultGP.statusCode != 200) {
         // localStorage.clear();
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
               <p class="heading">Ongoing PPM</p>
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
               <p class="heading">Completed PPM</p>
               <p class="title">...</p>
            </div>
         </div>
      </div>
   </div>

   <div class="box parent">
      <div class="column">
         <div>
            <h3 class="title is-3">Notification</h3>
         </div>

         <br />

         <div class="child">
            {#if reminder}
               <table class="table is-fullwidth is-striped is-hoverable">
                  <thead>
                     <tr>
                        <th style="width: 70%;">Judul</th>
                        <th style="width: 15%; text-align: center">Deadline</th>
                        <th style="width: 15%; text-align: center">Countdown</th
                        >
                     </tr>
                  </thead>
                  <tbody>
                     {#each reminder as reminder}
                        <tr>
                           <td>{reminder.judul}</td>
                           <td class="isi">{reminder.selesai}</td>
                           <td class="isi">{reminder.tersisa}</td>
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
      height: 500px;
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
