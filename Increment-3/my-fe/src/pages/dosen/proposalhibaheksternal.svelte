<script>
   import { route, apiURL, ppmFile, kontrakFile } from "../../store";
   import { onMount, afterUpdate, beforeUpdate } from "svelte";
   import ArticleError from "../../libs/ArticleError.svelte";
   import Modalerror from "../../libs/Modalerror.svelte";
   import Fieldview from "../../libs/Fieldview.svelte";
   import Article from "../../libs/Article.svelte";
   import Select from "../../libs/Select.svelte";
   import Field from "../../libs/Field.svelte";
   import Icon from "../../libs/Icon.svelte";
   import {
      deleteIcon,
      penelitian,
      accountEdit,
      downloadIcon,
   } from "../../store/icons";

   const localStorage_namaLengkap = localStorage.getItem("nama_lengkap");
   const localStorage_id = localStorage.getItem("id");
   const accessToken = localStorage.getItem("token");
   const id = Number(localStorage.getItem("id"));
   const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
   };

   let showModalErrorIdentitas = false;
   let showModalErrorProposal = false;
   let warningFormText = false;
   let isLoading = false;
   let myAbstract;
   let filePpm;
   let ppmFileName;
   let rabFileName;
   let kontrakFileName;
   let pendaftaranHibahEksternal;

   let kelompokKeahlian = "";
   let biayaPenelitian = "";
   let tanggalSelesai = "";
   let jenisKegiatan = "";
   let jenisProposal = "";
   let tanggalMulai = "";
   let jenisSkema = "";
   let judul = "";
   let topik = "";

   let anggotaTim = [
      {
         value: localStorage_id,
         label: localStorage_namaLengkap,
         role: "Ketua",
      },
   ];

   let biodataAnggota = [];
   let items = [];
   let error = {};

   onMount(async () => {
      isLoading = false;

      // ========================== Generate Random Character ========================== //
      let randomChar = "";
      let resultGenerateRandomChar = "";
      const characters =
         "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (let i = 0; i < 10; i++) {
         const randomIndex = Math.floor(Math.random() * characters.length);
         resultGenerateRandomChar += characters.charAt(randomIndex);
      }

      randomChar = resultGenerateRandomChar;

      ppmFileName = id + "_Proposal PPM_" + randomChar;
      rabFileName = id + "_RAB PPM_" + randomChar;
      kontrakFileName = id + "_Kontrak PPM Eksternal_" + randomChar;

      //============================================================
      // Get Users for Form Select Anggota Tim
      //============================================================
      const response = await fetch($apiURL + "/pilihUser", {
         method: "GET",
         headers: headers,
      });
      const result = await response.json();

      if (response.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (response.ok) {
            listUser = result;
            items = [];
            for (const [key, value] of Object.entries(listUser)) {
               items.push({
                  value: value.uid,
                  label: value.nama_lengkap,
               });
            }
         } else {
            console.log(response);
         }
      }

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
            pendaftaranHibahEksternal =
               resultWP.buka_pendaftaran_hibah_eksternal;
         } else {
            console.log(responseWP);
         }
      }
   });

   //============================================================
   // Get Biodata Anggota
   //============================================================
   async function getBiodataAnggota() {
      let ids = anggotaTim.map((anggota) => anggota.value);
      let promises = ids.map(async (idAnggota) => {
         try {
            // ==============================================
            // Get profile
            // ==============================================
            const profileResponse = await fetch(
               $apiURL + "/user/" + idAnggota,
               {
                  method: "GET",
                  headers: headers,
               }
            );

            if (profileResponse.status === 401) {
               location.pathname = "/tokenexpired";
               return;
            }
            if (!profileResponse.ok) {
               throw new Error(`Failed to fetch profile for ID ${idAnggota}`);
            }
            const profileResult = await profileResponse.json();

            // ==============================================
            // Get RPS1
            // ==============================================
            const RPS1Response = await fetch(
               $apiURL + "/riwayatPendidikanS1/" + idAnggota,
               {
                  method: "GET",
                  headers: headers,
               }
            );

            if (RPS1Response.status === 401) {
               location.pathname = "/tokenexpired";
               return;
            }
            if (!RPS1Response.ok) {
               throw new Error(
                  `Failed to fetch Riwayat Pendidikan S1 for ID ${idAnggota}`
               );
            }
            const RPS1Result = await RPS1Response.json();

            // ==============================================
            // Get RPS2
            // ==============================================
            const RPS2Response = await fetch(
               $apiURL + "/riwayatPendidikanS2/" + idAnggota,
               {
                  method: "GET",
                  headers: headers,
               }
            );

            if (RPS2Response.status === 401) {
               location.pathname = "/tokenexpired";
               return;
            }
            if (!RPS2Response.ok) {
               throw new Error(
                  `Failed to fetch Riwayat Pendidikan S2 for ID ${idAnggota}`
               );
            }
            const RPS2Result = await RPS2Response.json();

            // ==============================================
            // Get RPS3
            // ==============================================
            const RPS3Response = await fetch(
               $apiURL + "/riwayatPendidikanS3/" + idAnggota,
               {
                  method: "GET",
                  headers: headers,
               }
            );

            if (RPS3Response.status === 401) {
               location.pathname = "/tokenexpired";
               return;
            }
            if (!RPS3Response.ok) {
               throw new Error(
                  `Failed to fetch Riwayat Pendidikan S3 for ID ${idAnggota}`
               );
            }
            const RPS3Result = await RPS3Response.json();

            // ==============================================
            // Get Pengalaman Penelitian
            // ==============================================
            const responsePP = await fetch(
               $apiURL + "/pengalamanPenelitian/" + idAnggota,
               {
                  method: "GET",
                  headers: headers,
               }
            );

            if (responsePP.status === 401) {
               location.pathname = "/tokenexpired";
               return;
            }
            if (!responsePP.ok) {
               throw new Error(
                  `Failed to fetch Riwayat Pendidikan S3 for ID ${idAnggota}`
               );
            }
            const resultPP = await responsePP.json();

            // ==============================================
            // Get Pengalaman Pengmas
            // ==============================================
            const responsePM = await fetch(
               $apiURL + "/pengalamanPengmas/" + idAnggota,
               {
                  method: "GET",
                  headers: headers,
               }
            );

            if (responsePM.status === 401) {
               location.pathname = "/tokenexpired";
               return;
            }
            if (!responsePM.ok) {
               throw new Error(
                  `Failed to fetch Riwayat Pendidikan S3 for ID ${idAnggota}`
               );
            }
            const resultPM = await responsePM.json();

            // ==============================================
            // Get Pengalaman Diseminasi
            // ==============================================
            const responsePD = await fetch(
               $apiURL + "/pengalamanDiseminasi/" + idAnggota,
               {
                  method: "GET",
                  headers: headers,
               }
            );

            if (responsePD.status === 401) {
               location.pathname = "/tokenexpired";
               return;
            }
            if (!responsePD.ok) {
               throw new Error(
                  `Failed to fetch Riwayat Pendidikan S3 for ID ${idAnggota}`
               );
            }
            const resultPD = await responsePD.json();

            // ==============================================
            // Get Pengalaman Publikasi
            // ==============================================
            const responsePPub = await fetch(
               $apiURL + "/pengalamanPublikasi/" + idAnggota,
               {
                  method: "GET",
                  headers: headers,
               }
            );

            if (responsePPub.status === 401) {
               location.pathname = "/tokenexpired";
               return;
            }
            if (!responsePPub.ok) {
               throw new Error(
                  `Failed to fetch Riwayat Pendidikan S3 for ID ${idAnggota}`
               );
            }
            const resultPPub = await responsePPub.json();

            // ==============================================
            // Get Pengalaman Penulisan Buku
            // ==============================================
            const responsePPB = await fetch(
               $apiURL + "/pengalamanPenulisanBuku/" + idAnggota,
               {
                  method: "GET",
                  headers: headers,
               }
            );

            if (responsePPB.status === 401) {
               location.pathname = "/tokenexpired";
               return;
            }
            if (!responsePPB.ok) {
               throw new Error(
                  `Failed to fetch Riwayat Pendidikan S3 for ID ${idAnggota}`
               );
            }
            const resultPPB = await responsePPB.json();

            // ==============================================
            // Get Pengalaman Hak Kekayaan Intelektual
            // ==============================================
            const responsePHKI = await fetch(
               $apiURL + "/pengalamanHKI/" + idAnggota,
               {
                  method: "GET",
                  headers: headers,
               }
            );

            if (responsePHKI.status === 401) {
               location.pathname = "/tokenexpired";
               return;
            }
            if (!responsePHKI.ok) {
               throw new Error(
                  `Failed to fetch Riwayat Pendidikan S3 for ID ${idAnggota}`
               );
            }
            const resultPHKI = await responsePHKI.json();

            return {
               profile: profileResult,
               RPS1: RPS1Result.dbData,
               RPS2: RPS2Result.dbData,
               RPS3: RPS3Result.dbData,
               Ppenelitian: resultPP.dbData,
               Ppengmas: resultPM.dbData,
               Pdiseminasi: resultPD.dbData,
               Ppublikasi: resultPPub.dbData,
               PpenulisanBuku: resultPPB.dbData,
               Phki: resultPHKI.dbData,
            };
         } catch (error) {
            console.error(`Error fetching data for ID ${idAnggota}:`, error);
            return {
               profile: null,
               RPS1: [],
               RPS2: [],
               RPS3: [],
               Ppenelitian: [],
               Ppengmas: [],
               Pdiseminasi: [],
               Ppublikasi: [],
               PpenulisanBuku: [],
               Phki: [],
               error: error.message,
            };
         }
      });

      // biodataAnggota = await Promise.all(promises);
      biodataAnggota = await Promise.all(promises.filter(Boolean));
      // console.log(biodataAnggota);
   }

   //============================================================
   // Button Simpan Proposal
   //============================================================
   async function simpanProposal() {
      error = {};
      isLoading = true;

      const readerPpm = new FileReader();
      const readerKontrakPpm = new FileReader();

      if (jenisKegiatan === "Penelitian") {
         jenisSkema = "Riset Eksternal";
      } else if (jenisKegiatan === "Pengabdian Masyarakat") {
         jenisSkema = "Pengabdian Masyarakat Hibah Eksternal";
      }

      let payloadProposal = {
         id,
         jenisProposal,
         jenisKegiatan,
         jenisSkema,
         kelompokKeahlian,
         topik,
         tanggalMulai,
         tanggalSelesai,
         biayaPenelitian,
         anggotaTim,
         biodataAnggota,
         judul,
         myAbstract,
         status: 0,
         rabFileName,
         ppmFileName,
         kontrakFileName,
      };

      // Validasi biodataAnggota profiles
      for (const user of biodataAnggota) {
         if (user.profile) {
            for (const value of Object.values(user.profile)) {
               if (!value) {
                  showModalErrorIdentitas = true;
                  break;
               }
            }
         }
         if (showModalErrorIdentitas) break;
      }
      if (showModalErrorIdentitas) {
         console.error("Biodata validation failed. Some fields are empty.");
         isLoading = false;
         return;
      }

      // ========================== Upload File Proposal ========================== //
      const cekFileProposal = new Promise((resolve, reject) => {
         if (!filePpm) {
            resolve("No fileProposal selected");
            return;
         }

         readerPpm.onloadend = async () => {
            const base64Data = readerPpm.result.split(",")[1];
            const payloadPpmFile = {
               filePpm: {
                  name: filePpm.name,
                  type: filePpm.type,
                  data: base64Data,
               },
               ppmFileName,
            };

            try {
               const response = await fetch($apiURL + "/uploadPpm", {
                  method: "POST",
                  headers: headers,
                  body: JSON.stringify(payloadPpmFile),
               });

               const result = await response.json();

               if (response.status === 401) {
                  location.pathname = "/tokenexpired";
                  reject("Token expired");
               } else if (response.ok) {
                  resolve(result);
               } else {
                  reject(result);
               }
            } catch (error) {
               console.error("Error uploading file:", error);
               reject(error);
            }
         };
         if (filePpm) readerPpm.readAsDataURL(filePpm);
      });

      // ========================== Upload File Kontrak PPM Eksternal ========================== //
      const cekFileKontrakPPM = new Promise((resolve, reject) => {
         if (!fileKontrak) {
            resolve("No fileKontrak selected");
            return;
         }

         readerKontrakPpm.onloadend = async () => {
            const base64Data = readerKontrakPpm.result.split(",")[1];
            const payloadKontrakPpmFile = {
               fileKontrak: {
                  name: fileKontrak.name,
                  type: fileKontrak.type,
                  data: base64Data,
               },
               kontrakFileName,
            };

            try {
               const response = await fetch(
                  $apiURL + "/uploadKontrakPPMEksternal",
                  {
                     method: "POST",
                     headers: headers,
                     body: JSON.stringify(payloadKontrakPpmFile),
                  }
               );

               const result = await response.json();

               if (response.status === 401) {
                  location.pathname = "/tokenexpired";
                  reject("Token expired");
               } else if (response.ok) {
                  resolve(result);
               } else {
                  reject(result);
               }
            } catch (error) {
               console.error("Error uploading file:", error);
               reject(error);
            }
         };
         readerKontrakPpm.readAsDataURL(fileKontrak);
      });

      // ========================== Post Data Proposal PPM ========================== //
      const cekDataProposalPPM = new Promise(async (resolve, reject) => {
         const responseProposal = await fetch(
            $apiURL + "/pendaftaranPPMEksternal",
            {
               method: "POST",
               headers: headers,
               body: JSON.stringify(payloadProposal),
            }
         );

         const resultProposal = await responseProposal.json();

         if (responseProposal.status === 401) {
            location.pathname = "/tokenexpired";
            reject("Token expired");
         } else {
            if (responseProposal.ok) {
               resolve(resultProposal);
            } else {
               console.log(responseProposal.msg, error);
               reject("Error Submitting Data Proposal PPM");
            }
         }
      });

      try {
         await Promise.all([
            cekFileProposal,
            cekFileKontrakPPM,
            cekDataProposalPPM,
         ]);
      } finally {
         isLoading = false;
         $route("/dosen/pendaftaran");
      }
   }

   //============================================================
   // Button Submit Proposal
   //============================================================
   async function submitProposal() {
      error = {};
      isLoading = true;

      const readerPpm = new FileReader();
      const readerKontrakPpm = new FileReader();

      if (jenisKegiatan === "Penelitian") {
         jenisSkema = "Riset Eksternal";
      } else if (jenisKegiatan === "Pengabdian Masyarakat") {
         jenisSkema = "Pengabdian Masyarakat Hibah Eksternal";
      }

      let payloadProposal = {
         id,
         jenisProposal,
         jenisKegiatan,
         jenisSkema,
         kelompokKeahlian,
         topik,
         tanggalMulai,
         tanggalSelesai,
         biayaPenelitian,
         anggotaTim,
         biodataAnggota,
         judul,
         myAbstract,
         status: 2,
         ppmFileName,
         rabFileName,
         kontrakFileName,
      };

      // Validasi  profiles biodata anggota
      for (const user of biodataAnggota) {
         if (user.profile) {
            for (const value of Object.values(user.profile)) {
               if (!value) {
                  showModalErrorIdentitas = true;
                  break;
               }
            }
         }
         if (showModalErrorIdentitas) break;
      }
      if (showModalErrorIdentitas) {
         console.error("Biodata validation failed. Some fields are empty.");
         isLoading = false;
         return;
      }

      // ========================== Upload File Proposal ========================== //
      const cekFileProposal = new Promise((resolve, reject) => {
         if (!filePpm) {
            resolve("No fileProposal selected");
            return;
         }

         readerPpm.onloadend = async () => {
            const base64Data = readerPpm.result.split(",")[1];
            const payloadPpmFile = {
               filePpm: {
                  name: filePpm.name,
                  type: filePpm.type,
                  data: base64Data,
               },
               ppmFileName,
            };

            try {
               const response = await fetch($apiURL + "/uploadPpm", {
                  method: "POST",
                  headers: headers,
                  body: JSON.stringify(payloadPpmFile),
               });

               const result = await response.json();

               if (response.status === 401) {
                  location.pathname = "/tokenexpired";
                  reject("Token expired");
               } else if (response.ok) {
                  resolve(result);
               } else {
                  reject(result);
               }
            } catch (error) {
               console.error("Error uploading file:", error);
               reject(error);
            }
         };
         if (filePpm) readerPpm.readAsDataURL(filePpm);
      });

      // ========================== Upload File Kontrak PPM Eksternal ========================== //
      const cekFileKontrakPPM = new Promise((resolve, reject) => {
         if (!fileKontrak) {
            resolve("No fileKontrak selected");
            return;
         }

         readerKontrakPpm.onloadend = async () => {
            const base64Data = readerKontrakPpm.result.split(",")[1];
            const payloadKontrakPpmFile = {
               fileKontrak: {
                  name: fileKontrak.name,
                  type: fileKontrak.type,
                  data: base64Data,
               },
               kontrakFileName,
            };

            try {
               const response = await fetch(
                  $apiURL + "/uploadKontrakPPMEksternal",
                  {
                     method: "POST",
                     headers: headers,
                     body: JSON.stringify(payloadKontrakPpmFile),
                  }
               );

               const result = await response.json();

               if (response.status === 401) {
                  location.pathname = "/tokenexpired";
                  reject("Token expired");
               } else if (response.ok) {
                  resolve(result);
               } else {
                  reject(result);
               }
            } catch (error) {
               console.error("Error uploading file:", error);
               reject(error);
            }
         };
         readerKontrakPpm.readAsDataURL(fileKontrak);
      });

      // ========================== Post Data Proposal PPM ========================== //
      const cekDataProposalPPM = new Promise(async (resolve, reject) => {
         const responseProposal = await fetch(
            $apiURL + "/pendaftaranPPMEksternal",
            {
               method: "POST",
               headers: headers,
               body: JSON.stringify(payloadProposal),
            }
         );

         const resultProposal = await responseProposal.json();

         if (responseProposal.status === 401) {
            location.pathname = "/tokenexpired";
            reject("Token expired");
         } else {
            if (responseProposal.ok) {
               resolve(resultProposal);
            } else {
               console.log(responseProposal.msg, error);
               reject("Error Submitting Data Proposal PPM");
            }
         }
      });

      try {
         await Promise.all([
            cekFileProposal,
            cekFileKontrakPPM,
            cekDataProposalPPM,
         ]);
      } finally {
         isLoading = false;
         $route("/dosen/pendaftaran");
      }
   }

   let tab1 = true;
   let tab2 = false;

   async function clicktab1() {
      if (!tab1) {
         tab1 = true;
         tab2 = false;
      }
   }

   // async function clicktab2() {
   //    if (!tab2) {
   //       await getBiodataAnggota();
   //       tab1 = false;
   //       tab2 = true;
   //    }
   // }

   async function clicktab2() {
      error = {};
      let payloadProposal = {
         id,
         jenisProposal,
         jenisKegiatan,
         kelompokKeahlian,
         topik,
         tanggalMulai,
         tanggalSelesai,
         biayaPenelitian,
         anggotaTim,
         judul,
         myAbstract,
         ppmFileName,
         kontrakFileName,
      };

      for (const [key, value] of Object.entries(payloadProposal)) {
         if (
            !value ||
            (key === "anggotaTim" && Array.isArray(value) && value.length <= 1)
         ) {
            error[key] = `This field is required`;
         }
      }

      if (isObjectEmpty($kontrakFile)) {
         error["fileKontrak"] = `*`;
      }

      if (Object.keys(error).length > 0) {
         showModalErrorProposal = true;
      } else {
         if (!tab2) {
            await getBiodataAnggota();
            tab1 = false;
            tab2 = true;
         }
      }
   }

   function filePpmChange(e) {
      filePpm = e.target.files[0];
      $ppmFile = e.target.files[0];
   }

   function fileKontrakChange(e) {
      fileKontrak = e.target.files[0];
      $kontrakFile = e.target.files[0];
   }

   // Delete Member Anggota Tim
   function deleteMember(e) {
      let uid = e.target.getAttribute("data-value");
      anggotaTim = anggotaTim.filter((member) => {
         return member.value !== uid;
      });
   }

   // Validate Object Empty
   function isObjectEmpty(objectName) {
      return (
         objectName &&
         Object.keys(objectName).length === 0 &&
         objectName.constructor === Object
      );
   }

   // Format Rupiah
   function formatRupiah(angka, prefix) {
      var number_string = angka.replace(/[^,\d]/g, "").toString(),
         split = number_string.split(","),
         sisa = split[0].length % 3,
         rupiah = split[0].substr(0, sisa),
         ribuan = split[0].substr(sisa).match(/\d{3}/gi);

      if (ribuan) {
         separator = sisa ? "." : "";
         rupiah += separator + ribuan.join(".");
      }

      rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
      return prefix === undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
   }
</script>

{#if pendaftaranHibahEksternal === 1}
   <Article>
      <h2 class="title is-2">Proposal PPM Hibah Eksternal</h2>
      <hr />

      <div class="box">
         <ul class="steps is-medium has-content-centered">
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <li
               on:click={clicktab1}
               class:is-active={tab1}
               data-step="1"
               class="steps-segment"
            >
               <span class="steps-marker">
                  <span class="icon">
                     <Icon id="orang" src={penelitian} />
                  </span>
               </span>
               <div class="steps-content">
                  <p class="is-size-5"><b>Step 1</b></p>
                  <p class="is-size-6">Proposal</p>
               </div>
            </li>
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <li
               on:click={clicktab2}
               class:is-active={tab2}
               data-step="2"
               class="steps-segment"
            >
               <span class="steps-marker">
                  <span class="icon">
                     <Icon id="accountEdit" src={accountEdit} />
                  </span>
               </span>
               <div class="steps-content">
                  <p class="is-size-5"><b>Step 2</b></p>
                  <p class="is-size-6">Biodata Peneliti</p>
               </div>
            </li>
         </ul>
      </div>

      <!-- ---------------------------------------------------- -->
      <!-- Step 1 - Proposal -->
      <!-- ---------------------------------------------------- -->
      {#if tab1 === true}
         <div class="box">
            <Field name="Judul">
               <input
                  id="judul"
                  class="input"
                  type="text"
                  placeholder="Masukkan judul"
                  bind:value={judul}
               />
               {#if error.judul}
                  <p class="help error is-danger">{error.judul}</p>
               {/if}
            </Field>

            <Field name="Abstrak">
               <textarea
                  id="myAbstract"
                  class="textarea"
                  bind:value={myAbstract}
                  placeholder="Masukkan abstrak"
               ></textarea>
               {#if error.myAbstract}
                  <p class="help error is-danger">{error.myAbstract}</p>
               {/if}
            </Field>

            <hr />

            <Field name="Jenis Proposal">
               <div class="select is-fullwidth">
                  <select id="jenisProposal" bind:value={jenisProposal}>
                     <option value="" selected disabled hidden
                        >Pilih Jenis Proposal</option
                     >
                     <option value="Proposal Awal">Proposal Awal</option>
                     <option value="Proposal Lanjutan">Proposal Lanjutan</option
                     >
                  </select>
               </div>
               {#if error.jenisProposal}
                  <p class="help error is-danger">{error.jenisProposal}</p>
               {/if}
            </Field>

            <Field name="Jenis Kegiatan">
               <div class="select is-fullwidth">
                  <select id="jenisKegiatan" bind:value={jenisKegiatan}>
                     <option value="" selected disabled hidden
                        >Pilih Jenis Kegiatan</option
                     >
                     <option value="Penelitian">Penelitian</option>
                     <option value="Pengabdian Masyarakat"
                        >Pengabdian Masyarakat</option
                     >
                  </select>
               </div>
               {#if error.jenisKegiatan}
                  <p class="help error is-danger">{error.jenisKegiatan}</p>
               {/if}
            </Field>

            <Field name="Jenis Skema">
               {#if jenisKegiatan === "Penelitian"}
                  <input
                     class="input"
                     type="text"
                     placeholder="Riset Eksternal"
                     disabled
                  />
               {:else if jenisKegiatan === "Pengabdian Masyarakat"}
                  <input
                     class="input"
                     type="text"
                     placeholder="Pengabdian Masyarakat Hibah Eksternal"
                     disabled
                  />
               {:else}
                  <input class="input" type="text" disabled />
               {/if}
            </Field>

            <Field name="Kelompok Keahlian">
               <input
                  id="kelompokKeahlian"
                  class="input"
                  type="text"
                  placeholder="Masukkan kelompok keahlian"
                  bind:value={kelompokKeahlian}
               />
               {#if error.kelompokKeahlian}
                  <p class="help error is-danger">{error.kelompokKeahlian}</p>
               {/if}
            </Field>

            <Field name="Topik">
               <input
                  id="topik"
                  class="input"
                  type="text"
                  placeholder="Masukkan topik"
                  bind:value={topik}
               />
               {#if error.topik}
                  <p class="help error is-danger">{error.topik}</p>
               {/if}
            </Field>

            <Field name="Tanggal Mulai">
               <input
                  id="tanggalMulai"
                  class="input"
                  type="date"
                  bind:value={tanggalMulai}
               />
               {#if error.tanggalMulai}
                  <p class="help error is-danger">{error.tanggalMulai}</p>
               {/if}
            </Field>

            <Field name="Tanggal Selesai">
               <input
                  id="tanggalSelesai"
                  class="input"
                  type="date"
                  bind:value={tanggalSelesai}
               />
               {#if error.tanggalSelesai}
                  <p class="help error is-danger">{error.tanggalSelesai}</p>
               {/if}
            </Field>

            <Field name="Biaya Penelitian">
               <input
                  id="biayaPenelitian"
                  class="input"
                  type="text"
                  placeholder="Masukkan biaya penelitian"
                  bind:value={biayaPenelitian}
                  on:keyup={() =>
                     (biayaPenelitian = formatRupiah(biayaPenelitian, "Rp. "))}
               />
               {#if error.biayaPenelitian}
                  <p class="help error is-danger">{error.biayaPenelitian}</p>
               {/if}
            </Field>

            <Field name="Proposal">
               <span class="inputf__wrapper">
                  <input
                     id="filePpm"
                     class="inputf custom-file-input"
                     accept="application/pdf"
                     type="file"
                     on:change={filePpmChange}
                  />
                  <div class="file has-name is-success is-small">
                     <label class="file-label" for="filePpm">
                        <input class="file-input" type="file" name="resume" />
                        <span class="file-cta">
                           <span class="file-icon">
                              <Icon id="download" src={downloadIcon} />
                           </span>
                           <span class="file-label"> Choose a file</span>
                        </span>
                        {#if $ppmFile?.name}
                           <span class="file-name"> {$ppmFile.name}</span>
                        {:else}
                           <span class="file-name">No file chosen</span>
                        {/if}
                     </label>
                  </div>
                  {#if error.fileProposal}
                     <p class="error has-text-danger">{error.fileProposal}</p>
                  {/if}
               </span>
               <p class="help">File Type: pdf</p>
            </Field>

            <Field name="File Kontrak">
               <span class="inputf__wrapper">
                  <input
                     id="fileKontrak"
                     class="inputf custom-file-input"
                     accept="application/pdf"
                     type="file"
                     on:change={fileKontrakChange}
                  />
                  <div class="file has-name is-success is-small">
                     <label class="file-label" for="fileKontrak">
                        <input class="file-input" type="file" name="resume" />
                        <span class="file-cta">
                           <span class="file-icon">
                              <Icon id="download" src={downloadIcon} />
                           </span>
                           <span class="file-label"> Choose a file</span>
                        </span>
                        {#if $kontrakFile?.name}
                           <span class="file-name"> {$kontrakFile.name}</span>
                        {:else}
                           <span class="file-name">No file chosen</span>
                        {/if}
                     </label>
                  </div>
                  {#if error.fileKontrak}
                     <p class="error has-text-danger">{error.fileKontrak}</p>
                  {/if}
               </span>
               <p class="help">File Type: pdf</p>
            </Field>

            {#if items.length}
               <Field name="Anggota Tim">
                  <Select
                     id="anggotaTim"
                     start="2"
                     {items}
                     bind:result={anggotaTim}
                  />
                  {#if error.anggotaTim}
                     <p class="help error is-danger">{error.anggotaTim}</p>
                  {/if}
               </Field>
            {/if}

            <br />

            <table
               class="table is-fullwidth is-striped is-hoverable is-bordered"
            >
               <thead>
                  <tr>
                     <th class="is-narrow" style="width:55px"></th>
                     <th class="is-narrow" style="width:86px">Role</th>
                     <th>Nama Anggota </th>
                  </tr>
               </thead>
               <tbody>
                  {#if anggotaTim.length > 0}
                     {#each anggotaTim as member, idx}
                        <tr>
                           <td>
                              {#if idx > 0}
                                 <button
                                    class="button is-danger is-small"
                                    data-value={member.value}
                                    on:click={deleteMember}
                                    ><span class="icon">
                                       <Icon id="delete" src={deleteIcon} />
                                    </span>
                                 </button>
                              {/if}
                           </td>
                           <td>{member.role}</td>
                           <td>{member.label}</td>
                        </tr>
                     {/each}
                  {/if}
               </tbody>
            </table>

            <!-- {#if warningFormText === true}
         <div class="field is-grouped is-grouped-right">
            <p class="has-text-grey">
               Lengkapi semua form untuk ke step selanjutnya.
            </p>
         </div>
         {/if} -->
         </div>
      {/if}

      <!-- ---------------------------------------------------- -->
      <!-- Tabs Step 2 -->
      <!-- ---------------------------------------------------- -->
      {#if tab2 === true}
         <div class="notification is-warning is-light">
            <p>Pastikan data yang digunakan merupakan data terbaru.</p>
         </div>
         {#if biodataAnggota.length > 0}
            {#each biodataAnggota as user, index}
               <div class="box">
                  <!-- svelte-ignore a11y-no-static-element-interactions -->
                  <!-- svelte-ignore a11y-click-events-have-key-events -->
                  <h6 class="title is-6">
                     Biodata - {user.profile.nama_lengkap}
                     <span
                        class="toggle-button"
                        on:click={() =>
                           (biodataAnggota[index].profileVisible =
                              !biodataAnggota[index].profileVisible)}
                     >
                        {biodataAnggota[index].profileVisible
                           ? "(tutup)"
                           : "(buka)"}
                     </span>
                  </h6>

                  {#if biodataAnggota[index].profileVisible}
                     <!-- =================== -->
                     <!-- Identitas -->
                     <!-- =================== -->
                     <hr class="has-background-grey-light" />

                     <h5 class="title is-5">Identitas Diri</h5>
                     <div class="notification is-info is-light">
                        <p>Pastikan untuk melengkapi Identitas Diri.</p>
                     </div>

                     <div class="columns is-desktop">
                        <Fieldview
                           title="Nama Lengkap"
                           content={user.profile.nama_lengkap}
                        />
                        <Fieldview
                           title="Jabatan Fungsional"
                           content={user.profile.jabatan_fungsional}
                        />
                     </div>

                     <div class="columns is-desktop">
                        <Fieldview title="NIP" content={user.profile.nip} />
                        <Fieldview title="NIDN" content={user.profile.nidn} />
                     </div>

                     <div class="columns is-desktop">
                        <Fieldview title="Email" content={user.profile.email} />
                        <Fieldview
                           title="Nomor Handphone"
                           content={user.profile.nomor_handphone}
                        />
                     </div>

                     <div class="columns is-desktop">
                        <Fieldview
                           title="Tempat Lahir"
                           content={user.profile.tempat_lahir}
                        />
                        <Fieldview
                           title="Tanggal Lahir"
                           content={user.profile.tanggal_lahir}
                        />
                     </div>

                     <div class="columns is-desktop">
                        <Fieldview
                           title="Alamat Rumah"
                           content={user.profile.alamat_rumah}
                        />
                        <Fieldview
                           title="Telp/Fax Rumah"
                           content={user.profile.telp_fax_rumah}
                        />
                     </div>

                     <div class="columns is-desktop">
                        <Fieldview
                           title="Alamat Kantor"
                           content={user.profile.alamat_kantor}
                        />
                        <Fieldview
                           title="Telp/Fax Kantor"
                           content={user.profile.telp_fax_kantor}
                        />
                     </div>

                     <div class="columns is-desktop">
                        <Fieldview
                           title="Mata Kuliah yang diampu"
                           content={user.profile.mata_kuliah}
                           type="list"
                        />
                     </div>

                     <hr class="has-background-grey-light" />

                     <!-- ===================== -->
                     <!-- Riwayat Pendidikan S1 -->
                     <!-- ===================== -->
                     <h5 class="title is-5">Riwayat Pendidikan</h5>
                     <table
                        class="table is-fullwidth is-striped is-hoverable is-bordered"
                     >
                        <thead>
                           <tr>
                              <th style="width: 25%;"
                                 >Nama Perguruan Tinggi (S1)</th
                              >
                              <th style="width: 20%;">Bidang Ilmu</th>
                              <th style="width: 10%;">Tahun Masuk</th>
                              <th style="width: 10%;">Tahun Lulus</th>
                              <th style="width: 35%;">Judul Skripsi</th>
                           </tr>
                        </thead>
                        <tbody>
                           {#if user.RPS1.length > 0}
                              {#each user.RPS1 as RPS1}
                                 <tr>
                                    <td>{RPS1.nama_perguruan_tinggi}</td>
                                    <td>{RPS1.bidang_ilmu}</td>
                                    <td>{RPS1.tahun_masuk}</td>
                                    <td>{RPS1.tahun_lulus}</td>
                                    <td>{RPS1.judul_skripsi}</td>
                                 </tr>
                              {/each}
                           {/if}
                        </tbody>
                     </table>

                     <!-- ===================== -->
                     <!-- Riwayat Pendidikan S2 -->
                     <!-- ===================== -->
                     <table
                        class="table is-fullwidth is-striped is-hoverable is-bordered"
                     >
                        <thead>
                           <tr>
                              <th style="width: 25%;"
                                 >Nama Perguruan Tinggi (S2)</th
                              >
                              <th style="width: 20%;">Bidang Ilmu</th>
                              <th style="width: 10%;">Tahun Masuk</th>
                              <th style="width: 10%;">Tahun Lulus</th>
                              <th style="width: 35%;">Judul Tesis</th>
                           </tr>
                        </thead>
                        <tbody>
                           {#if user.RPS2.length > 0}
                              {#each user.RPS2 as RPS2}
                                 <tr>
                                    <td>{RPS2.nama_perguruan_tinggi}</td>
                                    <td>{RPS2.bidang_ilmu}</td>
                                    <td>{RPS2.tahun_masuk}</td>
                                    <td>{RPS2.tahun_lulus}</td>
                                    <td>{RPS2.judul_tesis}</td>
                                 </tr>
                              {/each}
                           {/if}
                        </tbody>
                     </table>

                     <!-- ===================== -->
                     <!-- Riwayat Pendidikan S3 -->
                     <!-- ===================== -->
                     <table
                        class="table is-fullwidth is-striped is-hoverable is-bordered"
                     >
                        <thead>
                           <tr>
                              <th style="width: 25%;"
                                 >Nama Perguruan Tinggi (S3)</th
                              >
                              <th style="width: 20%;">Bidang Ilmu</th>
                              <th style="width: 10%;">Tahun Masuk</th>
                              <th style="width: 10%;">Tahun Lulus</th>
                              <th style="width: 35%;">Judul Disertasi</th>
                           </tr>
                        </thead>
                        <tbody>
                           {#if user.RPS3.length > 0}
                              {#each user.RPS3 as RPS3}
                                 <tr>
                                    <td>{RPS3.nama_perguruan_tinggi}</td>
                                    <td>{RPS3.bidang_ilmu}</td>
                                    <td>{RPS3.tahun_masuk}</td>
                                    <td>{RPS3.tahun_lulus}</td>
                                    <td>{RPS3.judul_disertasi}</td>
                                 </tr>
                              {/each}
                           {/if}
                        </tbody>
                     </table>

                     <hr />

                     <!-- ===================== -->
                     <!-- Pengalaman Penelitian -->
                     <!-- ===================== -->
                     <h5 class="title is-5">Pengalaman Penelitian</h5>
                     <table
                        class="table is-fullwidth is-striped is-hoverable is-bordered"
                     >
                        <thead>
                           <tr>
                              <th class="is-narrow">Tahun</th>
                              <th>Judul Penelitian</th>
                              <th class="is-narrow">Role</th>
                              <th class="is-narrow">Sumber Dana</th>
                              <th>Jumlah Rp.</th>
                           </tr>
                        </thead>
                        <tbody>
                           {#if user.Ppenelitian.length > 0}
                              {#each user.Ppenelitian as PP}
                                 <tr>
                                    <td>{PP.tahun_penelitian}</td>
                                    <td>{PP.judul_penelitian}</td>
                                    <td>{PP.role_penelitian}</td>
                                    <td>{PP.sumber_dana}</td>
                                    <td>{PP.jumlah}</td>
                                 </tr>
                              {/each}
                           {/if}
                        </tbody>
                     </table>

                     <hr />

                     <!-- ===================== -->
                     <!-- Pengalaman Pengmas    -->
                     <!-- ===================== -->
                     <h5 class="title is-5">
                        Pengalaman Pengabdian Masyarakat
                     </h5>
                     <table
                        class="table is-fullwidth is-striped is-hoverable is-bordered"
                     >
                        <thead>
                           <tr>
                              <th class="is-narrow">Tahun</th>
                              <th>Judul Pengabdian Masyarakat</th>
                              <th class="is-narrow">Role</th>
                              <th class="is-narrow">Sumber Dana</th>
                              <th>Jumlah Rp.</th>
                           </tr>
                        </thead>
                        <tbody>
                           {#if user.Ppengmas.length > 0}
                              {#each user.Ppengmas as PM}
                                 <tr>
                                    <td>{PM.tahun_pengmas}</td>
                                    <td>{PM.judul_pengmas}</td>
                                    <td>{PM.role_pengmas}</td>
                                    <td>{PM.sumber_dana}</td>
                                    <td>{PM.jumlah}</td>
                                 </tr>
                              {/each}
                           {/if}
                        </tbody>
                     </table>

                     <hr />

                     <!-- =============================== -->
                     <!-- Pengalaman Diseminasi Ilmiah    -->
                     <!-- =============================== -->
                     <h5 class="title is-5">
                        Pengalaman Diseminasi Ilmiah dalam Pertemuan / Pameran
                     </h5>
                     <table
                        class="table is-fullwidth is-striped is-hoverable is-bordered"
                     >
                        <thead>
                           <tr>
                              <th class="is-narrow">Tahun</th>
                              <th>Judul Artikel</th>
                              <th>Nama Pemakalah</th>
                              <th class="is-narrow"
                                 >Nama Pertemuan Ilmiah / Pameran</th
                              >
                           </tr>
                        </thead>
                        <tbody>
                           {#if user.Pdiseminasi.length > 0}
                              {#each user.Pdiseminasi as PD}
                                 <tr>
                                    <td>{PD.tahun_diseminasi}</td>
                                    <td>{PD.judul_artikel}</td>
                                    <td>{PD.nama_pemakalah}</td>
                                    <td>{PD.nama_pertemuan}</td>
                                 </tr>
                              {/each}
                           {/if}
                        </tbody>
                     </table>

                     <hr />

                     <!-- =============================== -->
                     <!-- Pengalaman Publikasi Ilmiah     -->
                     <!-- =============================== -->
                     <h5 class="title is-5">
                        Pengalaman Publikasi Ilmiah dalam Jurnal (bukan
                        Proceeding)
                     </h5>
                     <table
                        class="table is-fullwidth is-striped is-hoverable is-bordered"
                     >
                        <thead>
                           <tr>
                              <th class="is-narrow">Tahun</th>
                              <th>Judul Artikel</th>
                              <th>Nama Penulis</th>
                              <th
                                 >Nama Jurnal, Vol., No Issue/No Artikel,
                                 Halaman</th
                              >
                              <th>Impact Factor/Scopus Quarter/Akreditasi</th>
                           </tr>
                        </thead>
                        <tbody>
                           {#if user.Ppublikasi.length > 0}
                              {#each user.Ppublikasi as PPub}
                                 <tr>
                                    <td>{PPub.tahun_publikasi}</td>
                                    <td>{PPub.judul_artikel}</td>
                                    <td>{PPub.nama_penulis}</td>
                                    <td>{PPub.nama_jurnal}</td>
                                    <td>{PPub.impact}</td>
                                 </tr>
                              {/each}
                           {/if}
                        </tbody>
                     </table>

                     <hr />

                     <!-- ============================= -->
                     <!-- Pengalaman Penulisan Buku     -->
                     <!-- ============================= -->
                     <h5 class="title is-5">Pengalaman Penulisan Buku</h5>
                     <table
                        class="table is-fullwidth is-striped is-hoverable is-bordered"
                     >
                        <thead>
                           <tr>
                              <th class="is-narrow">Tahun</th>
                              <th>Judul Buku</th>
                              <th>Nama Penulis</th>
                              <th>Penerbit</th>
                              <th>ISBN</th>
                           </tr>
                        </thead>
                        <tbody>
                           {#if user.PpenulisanBuku.length > 0}
                              {#each user.PpenulisanBuku as PPB}
                                 <tr>
                                    <td>{PPB.tahun_buku}</td>
                                    <td>{PPB.judul_buku}</td>
                                    <td>{PPB.nama_penulis}</td>
                                    <td>{PPB.penerbit}</td>
                                    <td>{PPB.isbn}</td>
                                 </tr>
                              {/each}
                           {/if}
                        </tbody>
                     </table>

                     <hr />

                     <!-- ======================================= -->
                     <!-- Pengalaman Hak Kekayaan Intelektual     -->
                     <!-- ======================================= -->
                     <h5 class="title is-5">
                        Pengalaman Hak Kekayaan Intelektual
                     </h5>
                     <table
                        class="table is-fullwidth is-striped is-hoverable is-bordered"
                     >
                        <thead>
                           <tr>
                              <th class="is-narrow">Tahun</th>
                              <th>Judul HKI</th>
                              <th>Nama Penulis</th>
                              <th>Jenis HKI</th>
                              <th>No HKI</th>
                           </tr>
                        </thead>
                        <tbody>
                           {#if user.Phki.length > 0}
                              {#each user.Phki as PHKI}
                                 <tr>
                                    <td>{PHKI.tahun_hki}</td>
                                    <td>{PHKI.judul_hki}</td>
                                    <td>{PHKI.nama_penulis}</td>
                                    <td>{PHKI.jenis_hki}</td>
                                    <td>{PHKI.no_hki}</td>
                                 </tr>
                              {/each}
                           {/if}
                        </tbody>
                     </table>
                  {/if}
               </div>
            {/each}
         {/if}
      {/if}

      <!-- ============================================== -->
      <!--                 Action Button                  -->
      <!-- ============================================== -->
      {#if tab1 === true}
         <div class="field is-grouped is-grouped-right">
            <p class="control">
               <button class="button is-info" on:click={clicktab2}>Next</button>
            </p>
         </div>
      {/if}

      {#if tab2 === true}
         <div class="field is-grouped is-grouped-right">
            <p class="control">
               <button class="button" on:click={clicktab1}>Back</button>
            </p>
            <p class="control">
               <button
                  class="button is-info is-light"
                  class:is-loading={isLoading}
                  on:click={simpanProposal}>Simpan</button
               >
            </p>
            <p class="control">
               <button
                  class="button is-info"
                  class:is-loading={isLoading}
                  on:click={submitProposal}>Submit</button
               >
            </p>
         </div>
      {/if}
   </Article>
{:else if pendaftaranHibahEksternal === 0}
   <ArticleError>
      <p class="title is-3">Pendaftaran Sedang Ditutup</p>
      <p class="subtitle is-6">
         Pendaftaran Proposal Hibah Eksternal sedang ditutup tunggu periode
         selanjutnya dibuka atau hubungi LPPM UISI untuk informasi lebih lanjut.
      </p>
   </ArticleError>
{/if}

<Modalerror bind:show={showModalErrorProposal}>
   <p>Lengkapi semua form proposal untuk ke step selanjutnya!</p>
</Modalerror>

<Modalerror bind:show={showModalErrorIdentitas}>
   <p>Pastikan untuk melengkapi Identitas Diri semua anggota</p>
</Modalerror>

<style>
   .inputf__wrapper {
      position: relative;
      display: flex;
   }
   .inputf__wrapper input {
      width: 0;
      height: 0;
      opacity: 0;
   }

   .help {
      /* top, right, bottom, left */
      margin: -6px 0px 0px 0px;
   }

   ul {
      margin-left: 1em;
   }

   .toggle-button {
      cursor: pointer;
      color: #fc6c78;
      font-size: small;
   }

   /* hr {
      border-top: 1px solid #dddddd;
   } */
</style>
