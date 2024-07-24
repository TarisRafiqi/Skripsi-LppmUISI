<script>
   import { onMount } from "svelte";
   import { route, apiURL } from "../store";
   import Icon from "../libs/Icon.svelte";
   import { penelitian, pengmas } from "../store/icons";

   let penelitianSelesai, pengmasSelesai;

   const headers = {
      "Content-Type": "application/json",
   };

   onMount(async () => {
      // ===================== Counter Penelitian =====================
      const responseCPS = await fetch($apiURL + "/counterPenelitianSelesai", {
         method: "GET",
         headers: headers,
      });

      const resultCPS = await responseCPS.json();

      if (responseCPS.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (responseCPS.ok) {
            penelitianSelesai = resultCPS.counterPenelitianSelesai;
         } else {
            console.log(responseCPS);
         }
      }

      // ===================== Counter Pengabdian Masyarakat =====================
      const responsePMS = await fetch($apiURL + "/counterPengmasSelesai", {
         method: "GET",
         headers: headers,
      });

      const resultPMS = await responsePMS.json();

      if (responsePMS.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (responsePMS.ok) {
            pengmasSelesai = resultPMS.counterPengmasSelesai;
         } else {
            console.log(responsePMS);
         }
      }
   });
</script>

<section>
   <article class="container">
      <div class="columns">
         <div class="column is-flex is-align-items-center has-text-centered">
            <p class="title is-4" style="color:white">
               Total PPM yang telah diselesaikan
            </p>
         </div>

         <div class="column">
            <div class="box">
               <div class="columns is-mobile">
                  <div class="column">
                     <Icon id="logo" src={penelitian} size="2.5" />
                  </div>
                  <div class="column">
                     <p class="subtitle is-6" style="text-align: center;">
                        Penelitian
                     </p>
                     <p class="title" style="text-align: center;">
                        {penelitianSelesai}
                     </p>
                  </div>
               </div>
            </div>
         </div>
         <div class="column">
            <div class="box">
               <div class="columns is-mobile">
                  <div class="column">
                     <Icon id="logo" src={pengmas} size="2.5" />
                  </div>
                  <div class="column">
                     <p class="subtitle is-6" style="text-align: center;">
                        Pengmas
                     </p>
                     <p class="title" style="text-align: center;">
                        {pengmasSelesai}
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </article>
</section>

<style>
   section {
      background-image: linear-gradient(to bottom left, #d3413f, #993838);
      padding-top: 1.5rem;
      padding-bottom: 1.5rem;
   }
</style>
