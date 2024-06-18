<script>
   import { onMount } from "svelte";
   import Article from "../../libs/Article.svelte";
   import Icon from "../../libs/Icon.svelte";
   import { penelitian, pengmas, jurnal, copyright } from "../../store/icons";
   import { apiURL } from "../../store";

   let penelitianCounter, pengmasCounter;
   onMount(async () => {
      const accessToken = localStorage.getItem("token");

      const headers = {
         Authorization: `Bearer ${accessToken}`,
         "Content-Type": "application/json",
      };

      // ---------------------------------------
      // Counter Penelitian
      // ---------------------------------------
      const responseCP = await fetch($apiURL + "/counterPenelitian", {
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
      const responseCPM = await fetch($apiURL + "/counterPengmas", {
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
</Article>

<style>
   /* .vl {
      border-left: 1px solid rgb(200, 200, 200);
      height: auto;
   } */

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
