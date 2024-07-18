<script>
   import { onMount } from "svelte";
   import Article from "../../libs/Article.svelte";
   import Icon from "../../libs/Icon.svelte";
   import {
      penelitian,
      pengmas,
      jurnal,
      copyright,
      edit,
   } from "../../store/icons";
   import { apiURL } from "../../store";

   const accessToken = localStorage.getItem("token");
   const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
   };

   let penelitianCounter, pengmasCounter;
   let cardCounter = [];
   let pendaftaranHibahInternal, pendaftaranHibahEksternal, pendaftaranMandiri;
   let tanggalMulai_HibahInternal, tanggalSelesai_HibahInternal;
   let tanggalMulai_PPMMandiri, tanggalSelesai_PPMMandiri;

   onMount(async () => {
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
         } else {
            console.log(responseWP);
         }
      }

      // ===================== Counter Penelitian =====================
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

      // ===================== Counter Pengabdian Masyarakat =====================
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

      // ===================== Update cardCounter =====================
      cardCounter = [
         {
            heading: "Penelitian",
            title: penelitianCounter,
            icon: penelitian,
         },
         {
            heading: "Pengmas",
            title: pengmasCounter,
            icon: pengmas,
         },
         {
            heading: "Ongoing",
            title: "...",
            icon: jurnal,
         },
         {
            heading: "Completed",
            title: "...",
            icon: copyright,
         },
      ];
   });

   async function checkPendaftaranInternal(event) {
      pendaftaranHibahInternal = event.target.checked ? 1 : 0;

      payload = {
         pendaftaranHibahInternal,
      };

      const response = await fetch($apiURL + "/waktuPendaftaranPPMInternal", {
         method: "PATCH",
         headers: headers,
         body: JSON.stringify(payload),
      });

      if (response.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (!response.ok) {
            console.log(response);
         }
      }
   }

   async function checkPendaftaranEksternal(event) {
      pendaftaranHibahEksternal = event.target.checked ? 1 : 0;

      payload = {
         pendaftaranHibahEksternal,
      };

      const response = await fetch($apiURL + "/waktuPendaftaranPPMEksternal", {
         method: "PATCH",
         headers: headers,
         body: JSON.stringify(payload),
      });

      if (response.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (!response.ok) {
            console.log(response);
         }
      }
   }

   async function checkPendaftaranMandiri(event) {
      pendaftaranMandiri = event.target.checked ? 1 : 0;

      payload = {
         pendaftaranMandiri,
      };

      const response = await fetch($apiURL + "/waktuPendaftaranPPMMandiri", {
         method: "PATCH",
         headers: headers,
         body: JSON.stringify(payload),
      });

      if (response.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (!response.ok) {
            console.log(response);
         }
      }
   }

   async function onChange_waktuPendaftaran_HibahInternal() {
      payload = {
         tanggalMulai_HibahInternal,
         tanggalSelesai_HibahInternal,
         tanggalMulai_PPMMandiri,
         tanggalSelesai_PPMMandiri,
      };

      const response = await fetch(
         $apiURL + "/waktuPendaftaranPPMInternal/time",
         {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(payload),
         }
      );

      if (response.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (!response.ok) {
            console.log(response);
         }
      }
   }
</script>

<Article>
   <h2 class="title is-2">Dashboard</h2>

   <hr />

   <div class="columns cardCounter-container is-desktop">
      {#each cardCounter as cardCounter}
         <div class="column">
            <div class="box cardCounter">
               <div class="flex-item-left">
                  <Icon id="logo" src={cardCounter.icon} size="2" />
               </div>
               <div class="flex-item-right has-text-centered">
                  <p class="heading">{cardCounter.heading}</p>
                  {#if cardCounter.title}
                     <p class="title">{cardCounter.title}</p>
                  {:else}
                     <p class="title">...</p>
                  {/if}
               </div>
            </div>
         </div>
      {/each}
   </div>

   <div class="columns is-desktop">
      <div class="column">
         <div class="box">
            <h5 class="title is-5">Waktu Pendaftaran Proposal PPM</h5>
            <table
               class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
            >
               <thead>
                  <tr>
                     <th>Jenis Skema</th>
                     <th class="is-narrow" style="text-align: center;"
                        >Tanggal Mulai</th
                     >
                     <th class="is-narrow" style="text-align: center;"
                        >Tanggal Selesai</th
                     >
                     <th class="is-narrow" style="text-align: center;"
                        >Buka Pendaftaran</th
                     >
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td>Pendanaan Hibah Internal UISI</td>
                     <td class="centerText"
                        ><input
                           type="date"
                           class="input is-small"
                           bind:value={tanggalMulai_HibahInternal}
                           on:change={onChange_waktuPendaftaran_HibahInternal}
                        /></td
                     >
                     <td class="centerText"
                        ><input
                           type="date"
                           class="input is-small"
                           bind:value={tanggalSelesai_HibahInternal}
                           on:change={onChange_waktuPendaftaran_HibahInternal}
                        /></td
                     >
                     <td class="centerText">
                        <input
                           type="checkbox"
                           bind:checked={pendaftaranHibahInternal}
                           on:change={checkPendaftaranInternal}
                        />
                     </td>
                  </tr>

                  <tr>
                     <td>Pendanaan Hibah Eksternal</td>
                     <td></td>
                     <td></td>
                     <td class="centerText">
                        <input
                           type="checkbox"
                           bind:checked={pendaftaranHibahEksternal}
                           on:change={checkPendaftaranEksternal}
                        />
                     </td>
                  </tr>

                  <tr>
                     <td>Pendanaan Mandiri</td>
                     <td class="centerText"
                        ><input
                           type="date"
                           class="input is-small"
                           bind:value={tanggalMulai_PPMMandiri}
                           on:change={onChange_waktuPendaftaran_HibahInternal}
                        /></td
                     >
                     <td class="centerText"
                        ><input
                           type="date"
                           class="input is-small"
                           bind:value={tanggalSelesai_PPMMandiri}
                           on:change={onChange_waktuPendaftaran_HibahInternal}
                        /></td
                     >
                     <td class="centerText">
                        <input
                           type="checkbox"
                           bind:checked={pendaftaranMandiri}
                           on:change={checkPendaftaranMandiri}
                        />
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>

      <div class="column">
         <div class="box">
            <h5 class="title is-5">Pengumuman</h5>
         </div>
      </div>
   </div>
</Article>

<style>
   .centerText {
      text-align: center;
   }
   .box.cardCounter {
      display: flex;
   }

   .flex-item-left {
      flex: 50%;
   }
   .flex-item-right {
      flex: 50%;
   }
</style>
