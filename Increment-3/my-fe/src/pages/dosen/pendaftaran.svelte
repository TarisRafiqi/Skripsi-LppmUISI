<script>
   import Modalerror from "../../libs/Modalerror.svelte";
   import Article from "../../libs/Article.svelte";
   import { infoOutline } from "../../store/icons";
   import { route, apiURL } from "../../store";
   import Icon from "../../libs/Icon.svelte";
   import { onMount } from "svelte";

   const id = Number(localStorage.getItem("id"));
   const accessToken = localStorage.getItem("token");
   let cardPendaftaran = [];
   let Interval;
   let distance;
   let periodePendaftaran_PPMInternal, periodePendaftaran_PPMMandiri;
   let outOfPeriodModal = false;

   const countDownDate = new Date("July 7, 2024 18:00:00").getTime();
   const countdownElements = [
      { id: "days", label: "Hari" },
      { id: "hours", label: "Jam" },
      { id: "minutes", label: "Menit" },
      { id: "seconds", label: "Detik" },
   ];

   const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
   };

   // function startCountdown() {
   //    Interval = setInterval(function () {
   //       // Get today's date and time
   //       const now = new Date().getTime();

   //       // Calculate the distance between now and the countdown date
   //       distance = countDownDate - now;

   //       // Calculations for days, hours, minutes and seconds
   //       const days = Math.floor(distance / (1000 * 60 * 60 * 24));
   //       const hours = Math.floor(
   //          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
   //       );
   //       const minutes = Math.floor(
   //          (distance % (1000 * 60 * 60)) / (1000 * 60)
   //       );
   //       const seconds = Math.floor((distance % (1000 * 60)) / 1000);

   //       // Display the countdown in the corresponding elements
   //       const daysElement = document.getElementById("days");
   //       const hoursElement = document.getElementById("hours");
   //       const minutesElement = document.getElementById("minutes");
   //       const secondsElement = document.getElementById("seconds");

   //       if (daysElement && hoursElement && minutesElement && secondsElement) {
   //          daysElement.innerHTML = days;
   //          hoursElement.innerHTML = hours;
   //          minutesElement.innerHTML = minutes;
   //          secondsElement.innerHTML = seconds;
   //       }

   //       // If the countdown is finished, clear the interval
   //       if (distance < 0) {
   //          clearInterval(Interval);
   //          document.getElementById("countdown").innerHTML = "";
   //       }
   //    });
   // }

   onMount(async () => {
      // startCountdown();

      // ===================== Waktu Pendaftaran Proposal PPM =====================
      const responseWP = await fetch($apiURL + "/waktuPendaftaranPPMInternal", {
         method: "GET",
         headers: headers,
      });

      const resultWP = await responseWP.json();

      if (responseWP.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (responseWP.ok) {
            tanggalMulai_HibahInternal = resultWP.tanggal_mulai_hibah_internal;
            tanggalSelesai_HibahInternal =
               resultWP.tanggal_selesai_hibah_internal;
            tanggalMulai_PPMMandiri = resultWP.tanggal_mulai_ppm_mandiri;
            tanggalSelesai_PPMMandiri = resultWP.tanggal_selesai_ppm_mandiri;

            pendaftaranHibahInternal = resultWP.buka_pendaftaran_hibah_internal;
            pendaftaranHibahEksternal =
               resultWP.buka_pendaftaran_hibah_eksternal;
            pendaftaranMandiri = resultWP.buka_pendaftaran_mandiri;

            if (tanggalMulai_HibahInternal && tanggalSelesai_HibahInternal) {
               periodePendaftaran_PPMInternal =
                  tanggalMulai_HibahInternal +
                  " s/d " +
                  tanggalSelesai_HibahInternal;
            } else {
               periodePendaftaran_PPMInternal = "";
            }

            if (tanggalMulai_PPMMandiri && tanggalSelesai_PPMMandiri) {
               periodePendaftaran_PPMMandiri =
                  tanggalMulai_PPMMandiri + " s/d " + tanggalSelesai_PPMMandiri;
            } else {
               periodePendaftaran_PPMMandiri = "";
            }
         } else {
            console.log(responseWP);
         }
      }

      // ===================== Data Card Pendaftaran =====================
      cardPendaftaran = [
         {
            title: "Proposal PPM Pendanaan Hibah Internal",
            isOpen: pendaftaranHibahInternal,
            periode: periodePendaftaran_PPMInternal,
            description:
               "LPPM UISI membuka Hibah Internal untuk kegiatan Penelitian dan Pengabdian Masyarakat. Tujuan hibah ini, adalah untuk meningkatkan kualitas PPM dan Publikasi UISI.",
            buttonText: "Buat Proposal",
            buttonLink: "/dosen/proposalhibahinternal",
         },
         {
            title: "Proposal PPM Pendanaan Hibah Eksternal",
            isOpen: pendaftaranHibahEksternal,
            periode: "",
            description:
               "Penelitian dan Pengabdian Masyarakat dapat didanai oleh pihak eksternal, yang meliputi; Kementerian, Pemerintah Daerah, Industri, Lembaga Penelitian Luar dan Dalam Negeri, Perguruan Tinggi Luar dan Dalam Negeri, Yayasan, dan instansi lain.",
            buttonText: "Buat Proposal",
            buttonLink: "/dosen/proposalhibaheksternal",
         },
         {
            title: "Proposal PPM Pendanaan Mandiri",
            isOpen: pendaftaranMandiri,
            periode: periodePendaftaran_PPMMandiri,
            description:
               "PPM Mandiri adalah kegiatan Penelitian dan Pengabdian Masyarakat dengan skema mandiri, yang berarti sumber pendanaan kegiatan berasal dari pribadi ataupun tim pelaksana.",
            buttonText: "Buat Proposal",
            buttonLink: "/dosen/proposalmandiri",
         },
      ];
   });

   function outOfPeriod() {
      outOfPeriodModal = true;
   }
</script>

<Article>
   <h2 class="title is-2">Pendaftaran Proposal</h2>
   <hr />

   <!-- <div id="countdown" class="countdown-container">
      {#if distance < 0}
         <div class="box">
            <h5 class="title is-4">Pendaftaran Sedang ditutup</h5>
         </div>
      {:else}
         <h5 class="title is-4">Pendaftaran akan ditutup dalam:</h5>
         <div class="columns is-centered is-mobile">
            {#each countdownElements as cardCountdown}
               <div class="column is-narrow">
                  <div class="box">
                     <p class="title is-2">
                        <span id={cardCountdown.id}></span>
                     </p>
                     <p class="subtitle is-6">{cardCountdown.label}</p>
                  </div>
               </div>
            {/each}
         </div>
      {/if}
   </div> -->

   <div class="notification is-info is-light">
      <div class="media">
         <div class="media-left">
            <span class="icon">
               <Icon id="info" src={infoOutline} />
            </span>
         </div>
         <div class="media-content">
            <p style="text-align: justify;">
               Peneliti hanya dapat mendaftarkan penelitian ataupun pengabdian
               masyarakat didalam periode pendaftaran proposal.
            </p>
         </div>
      </div>
   </div>

   <div class="columns pendaftaran-container">
      {#each cardPendaftaran as cardPendaftaran}
         <div class="column">
            <div class="box">
               <header class="header">
                  <h4 class="title is-4">
                     {cardPendaftaran.title}
                  </h4>
               </header>

               <div class="card-info">
                  {#if cardPendaftaran.isOpen === 0}
                     <span class="tag is-danger is-light"
                        >Pendaftaran ditutup</span
                     >
                  {:else if cardPendaftaran.isOpen === 1}
                     <span class="tag is-success">Pendaftaran dibuka</span>
                  {/if}

                  {#if cardPendaftaran.periode !== ""}
                     <span class="tag is-light"
                        >{cardPendaftaran.periode}
                     </span>
                  {/if}
               </div>

               <div class="card-body">
                  <p>
                     {cardPendaftaran.description}
                  </p>
               </div>

               <div class="card-button">
                  {#if cardPendaftaran.isOpen === 1}
                     <button
                        class="button is-dark is-small"
                        href={cardPendaftaran.buttonLink}
                        >{cardPendaftaran.buttonText}</button
                     >
                  {:else if cardPendaftaran.isOpen === 0}
                     <button
                        class="button is-dark is-small"
                        on:click={outOfPeriod}
                        >{cardPendaftaran.buttonText}</button
                     >
                  {/if}
               </div>
            </div>
         </div>
      {/each}
   </div>
</Article>

<Modalerror bind:show={outOfPeriodModal}>
   <p>Pendaftaran sedang ditutup</p>
</Modalerror>

<style>
   /* .countdown-container {
      text-align: center;
      margin-bottom: 20px;
   } */

   /* .notification {
      display: flex;
      flex-direction: row;
   } */
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
