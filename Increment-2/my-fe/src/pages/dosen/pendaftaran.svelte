<script>
   import { onMount } from "svelte";
   import Article from "../../libs/Article.svelte";
   import Icon from "../../libs/Icon.svelte";
   import { add } from "../../store/icons";
   import { route, apiURL } from "../../store";

   const id = Number(localStorage.getItem("id"));
   const accessToken = localStorage.getItem("token");

   const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
   };

   const countDownDate = new Date("July 31, 2024 00:00:00").getTime();

   const countdownFunction = setInterval(function () {
      // Get today's date and time
      const now = new Date().getTime();

      // Calculate the distance between now and the countdown date
      const distance = countDownDate - now;

      // Calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
         (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the countdown in the corresponding elements
      document.getElementById("days").innerHTML = days;
      document.getElementById("hours").innerHTML = hours;
      document.getElementById("minutes").innerHTML = minutes;
      document.getElementById("seconds").innerHTML = seconds;

      // If the countdown is finished, clear the interval
      if (distance < 0) {
         clearInterval(countdownFunction);
         document.getElementById("countdown").innerHTML = "EXPIRED";
      }
   }, 1000);

   const cardPendaftaran = [
      {
         title: "Pendanaan Hibah Internal",
         description:
            "LPPM UISI membuka Hibah Internal untuk kegiatan Penelitian dan Pengabdian Masyarakat. Tujuan hibah ini, adalah untuk meningkatkan kualitas PPM dan Publikasi UISI.",
         buttonText: "Buat Proposal",
         buttonLink: "/dosen/proposalhibahinternal",
      },
      {
         title: "Pendanaan Hibah Eksternal",
         description:
            "Penelitian dan Pengabdian Masyarakat dapat didanai oleh pihak eksternal, yang meliputi; Kementerian, Pemerintah Daerah, Industri, Lembaga Penelitian Luar dan Dalam Negeri, Perguruan Tinggi Luar dan Dalam Negeri, Yayasan, dan instansi lain.",
         buttonText: "Buat Proposal",
         buttonLink: "/dosen/proposalhibaheksternal",
      },
      {
         title: "Pendanaan Mandiri",
         description:
            "PPM Mandiri adalah kegiatan Penelitian dan Pengabdian Masyarakat dengan skema mandiri, yang berarti sumber pendanaan kegiatan berasal dari pribadi ataupun tim pelaksana.",
         buttonText: "Buat Proposal",
         buttonLink: "/dosen/proposalmandiri",
      },
   ];

   const countdownElements = [
      { id: "days", label: "Hari" },
      { id: "hours", label: "Jam" },
      { id: "minutes", label: "Menit" },
      { id: "seconds", label: "Detik" },
   ];
</script>

<Article>
   <h2 class="title is-2">Pendaftaran Proposal</h2>
   <hr />

   <div id="countdown" class="countdown-container">
      <h5 class="title is-4">Pendaftaran akan ditutup dalam:</h5>
      <div class="columns is-centered is-mobile">
         {#each countdownElements as cardCountdown}
            <div class="column is-narrow">
               <div class="box">
                  <p class="title is-2"><span id={cardCountdown.id}></span></p>
                  <p class="subtitle is-6">{cardCountdown.label}</p>
               </div>
            </div>
         {/each}
      </div>
   </div>

   <br />

   <div class="columns pendaftaran-container">
      {#each cardPendaftaran as cardPendaftaran}
         <div class="column">
            <div class="box">
               <header class="header">
                  <h4 class="title is-4">
                     {cardPendaftaran.title}
                  </h4>
               </header>

               <div class="card-body">
                  <p>
                     {cardPendaftaran.description}
                  </p>
               </div>

               <div class="card-button">
                  <button
                     class="button is-success"
                     href={cardPendaftaran.buttonLink}
                     >{cardPendaftaran.buttonText}</button
                  >
               </div>
            </div>
         </div>
      {/each}
   </div>
</Article>

<style>
   .countdown-container {
      text-align: center;
      margin-bottom: 20px;
   }
   .box {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
   }
   .header {
      margin-bottom: 20px;
   }
   .card-body {
      text-align: justify;
      color: rgb(118, 118, 118);
      margin-bottom: 10px;
   }
   .card-button {
      margin-top: auto;
      text-align: right;
   }
</style>
