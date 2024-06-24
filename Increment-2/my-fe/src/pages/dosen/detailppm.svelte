<script>
   import { onMount } from "svelte";
   import { route, apiURL, ppmFile, rabFile } from "../../store";
   import Modalerror from "../../libs/Modalerror.svelte";
   import Fieldview from "../../libs/Fieldview.svelte";
   import Status from "../../modules/Status.svelte";
   import Article from "../../libs/Article.svelte";
   import Select from "../../libs/Select.svelte";
   import Field from "../../libs/Field.svelte";
   import Icon from "../../libs/Icon.svelte";
   import {
      deleteIcon,
      edit,
      downloadIcon,
      cancelIcon,
   } from "../../store/icons";
   export let params;

   const id = params["1"];
   const accessToken = localStorage.getItem("token");
   const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
   };

   let newBiodataAnggota = [];
   let biodataAnggota = [];
   let items = [];
   let error = {};
   let view;
   let data;
   let itemsRCR;
   let fileRab;
   let filePpm;
   let jenisProposal,
      jenisKegiatan,
      jenisSkema,
      kelompokKeahlian,
      topik,
      tanggalMulai,
      tanggalSelesai,
      biayaPenelitian,
      anggotaTim = [],
      judul,
      abstrak,
      comment,
      status;

   let hasilPenelitianVisible = false;
   let danaPenelitianVisible = false;
   let skPenelitianVisible = false;
   let presentasiVisible = false;
   let skpVisible = false;

   let editModeProposal = false;
   let showModalError = false;
   let editModeRAB = false;
   let isLoading = false;

   onMount(async () => {
      isLoading = false;
      // ================================================//
      // Get detail proposal
      // ================================================//
      const response = await fetch($apiURL + "/ppm/" + id, {
         method: "GET",
         headers: headers,
      });
      const result = await response.json();

      if (response.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (response.ok) {
            data = result;
            // view = !isEdit(data.status);
            view = !isEdit(data.status, data.jenis_skema);
            ppmId = data.id;
            jenisProposal = data.jenis_proposal;
            jenisKegiatan = data.jenis_kegiatan;
            jenisSkema = data.jenis_skema;
            kelompokKeahlian = data.kelompok_keahlian;
            topik = data.topik;
            tanggalMulai = data.tanggal_mulai;
            tanggalSelesai = data.tanggal_selesai;
            biayaPenelitian = data.biaya_penelitian;
            anggotaTim = data.anggota_tim;
            biodataAnggota = data.biodata_anggota;
            judul = data.judul;
            abstrak = data.abstrak;
            comment = data.comment;
            status = data.status;
            kdeptSelected = data.uid_kdept;
            klppmSelected = data.uid_klppm;
            kpkSelected = data.uid_kpk;
            reviewerSelected = data.uid_reviewer;
            randomRabFileName = data.random_rab_file_name;
            randomPpmFileName = data.random_ppm_file_name;
         } else {
            console.log(response);
         }
      }

      // ================================================//
      // Get Riwayat Catatan Revisi
      // ================================================//
      const responseRCR = await fetch(
         $apiURL + "/riwayatCatatanRevisi/" + ppmId,
         {
            method: "GET",
            headers: headers,
         }
      );

      const dataRCR = await responseRCR.json();

      if (responseRCR.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (responseRCR.ok) {
            itemsRCR = dataRCR.dbData.map((item) => ({
               ...item,
               time: formatDate(item.time),
            }));
         }
      }

      // ================================================//
      // Get Users for Form Select Anggota Tim
      // ================================================//
      const responsee = await fetch($apiURL + "/pilihUser", {
         method: "GET",
         headers: headers,
      });

      const results = await responsee.json();

      if (responsee.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (responsee.ok) {
            listUser = results;
            for (const [key, value] of Object.entries(listUser)) {
               items = [
                  ...items,
                  {
                     value: value.uid,
                     label: value.nama_lengkap,
                  },
               ];
            }
         } else {
            console.log(responsee);
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
      newBiodataAnggota = await Promise.all(promises.filter(Boolean));
   }

   function formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, "0");
      const day = String(date.getUTCDate()).padStart(2, "0");
      const hours = String(date.getUTCHours()).padStart(2, "0");
      const minutes = String(date.getUTCMinutes()).padStart(2, "0");
      const seconds = String(date.getUTCSeconds()).padStart(2, "0");

      // Format date "YYYY-MM-DD HH:MM:SS"
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
   }

   function isObjectEmpty(objectName) {
      return (
         objectName &&
         Object.keys(objectName).length === 0 &&
         objectName.constructor === Object
      );
   }

   function filePpmChange(e) {
      filePpm = e.target.files[0];
      $ppmFile = e.target.files[0];
   }

   function fileRabChange(e) {
      fileRab = e.target.files[0];
      $rabFile = e.target.files[0];
   }

   function toggleEditModeProposal() {
      editModeProposal = !editModeProposal;
   }

   function toggleEditModeRAB() {
      editModeRAB = !editModeRAB;
   }

   // function isEdit(code) {
   //    const edit = [0, 1, 3, 5, 7];
   //    return edit.some((x) => x === code);
   // }

   function isEdit(code, jenisSkema) {
      let editStatus;
      switch (jenisSkema) {
         case "Riset Kelompok Keahlian":
         case "Riset Terapan":
         case "Riset Kerjasama":
         case "Pengabdian Masyarakat Desa Binaan":
         case "Pengabdian Masyarakat UMKM Binaan":
            editStatus = [0, 1, 3, 5, 7, 11];
            break;
         case "Riset Eksternal":
         case "Pengabdian Masyarakat Hibah Eksternal":
            editStatus = [0, 1, 3, 5];
            break;
         case "Riset Mandiri":
         case "Pengabdian Masyarakat Mandiri":
            editStatus = [0, 1, 3, 5, 9];
            break;
         default:
            editStatus = [];
      }
      return editStatus.includes(code);
   }

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

   async function handleDownloadRab(e) {
      let filename = "RAB_" + judul + ".xlsx";
      try {
         const response = await fetch(
            $apiURL + `/uploadRab/${randomRabFileName}`,
            {
               method: "GET",
               headers: headers,
            }
         );

         if (response.status === 401) {
            location.pathname = "/tokenexpired";
         } else {
            const blob = await response.blob();
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = filename;
            link.click();
         }
      } catch (error) {
         console.error("Error downloading file:", error);
      }
   }

   async function handleDownloadPpm(e) {
      let filename = "Proposal_" + judul + ".pdf";
      try {
         const response = await fetch(
            $apiURL + `/uploadPpm/${randomPpmFileName}`,
            {
               method: "GET",
               headers: headers,
            }
         );

         if (response.status === 401) {
            location.pathname = "/tokenexpired";
         } else {
            const blob = await response.blob();
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = filename;
            link.click();
         }
      } catch (error) {
         console.error("Error downloading file:", error);
      }
   }

   async function handlePerbaikan() {
      await getBiodataAnggota();
      error = {};
      isLoading = true;
      const readerPpm = new FileReader();
      const readerRab = new FileReader();

      let payload = {
         jenisProposal,
         jenisKegiatan,
         jenisSkema,
         kelompokKeahlian,
         topik,
         tanggalMulai,
         tanggalSelesai,
         biayaPenelitian,
         anggotaTim,
         newBiodataAnggota,
         id,
         judul,
         abstrak,
         comment: "",
         status: Number(data.status) + 1,
         kdeptSelected,
         klppmSelected,
         kpkSelected,
         reviewerSelected,
         randomRabFileName,
         randomPpmFileName,
      };

      if (editModeProposal) {
         if (isObjectEmpty($ppmFile)) {
            error["fileProposal"] = `*`;
         }
      }

      if (editModeRAB) {
         if (isObjectEmpty($rabFile)) {
            error["fileRAB"] = `*`;
         }
      }

      for (const [key, value] of Object.entries(payload)) {
         if (
            (!["comment"].includes(key) && !value) ||
            (key === "anggotaTim" && Array.isArray(value) && value.length <= 1)
         ) {
            error[key] = `This field is required`;
         }
      }

      if (Object.keys(error).length > 0) {
         showModalError = true;
         console.log(error);
      } else {
         // ================================================//
         // Upload File PPM
         // ================================================//
         readerPpm.onloadend = async () => {
            const base64Data = readerPpm.result.split(",")[1];
            const payloadPpmFile = {
               filePpm: {
                  name: filePpm.name,
                  type: filePpm.type,
                  data: base64Data,
               },
               randomPpmFileName,
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
               }
            } catch (error) {
               console.error("Error uploading file:", error);
               // Buat Handle Error
               // ...
            }
         };

         if (filePpm) readerPpm.readAsDataURL(filePpm);
         // ================================================//
         // Upload File RAB
         // ================================================//
         readerRab.onloadend = async () => {
            const base64Data = readerRab.result.split(",")[1];
            const payloadRabFile = {
               fileRab: {
                  name: fileRab.name,
                  type: fileRab.type,
                  data: base64Data,
               },
               randomRabFileName,
            };

            try {
               const response = await fetch($apiURL + "/uploadRab", {
                  method: "POST",
                  headers: headers,
                  body: JSON.stringify(payloadRabFile),
               });

               const result = await response.json();

               if (response.status === 401) {
                  location.pathname = "/tokenexpired";
               }
            } catch (error) {
               console.error("Error uploading file:", error);
               // Buat Handle Error
               // ...
            }
         };

         if (fileRab) readerRab.readAsDataURL(fileRab);
         // ================================================//
         // Patch data proposal
         // ================================================//
         const response = await fetch($apiURL + "/ppm", {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(payload),
         });

         const result = await response.json();

         if (response.status === 401) {
            location.pathname = "/tokenexpired";
         } else {
            if (response.ok) {
               $route("/dosen/ppmmanagement");
            } else {
               console.log(response);
               // Buat Handle Error
               // ...
            }
         }
      }
      isLoading = false;
   }

   async function submitProposal() {
      error = {};
      isLoading = true;
      const readerPpm = new FileReader();
      const readerRab = new FileReader();

      let payload = {
         jenisProposal,
         jenisKegiatan,
         jenisSkema,
         kelompokKeahlian,
         topik,
         tanggalMulai,
         tanggalSelesai,
         biayaPenelitian,
         anggotaTim,
         id,
         judul,
         abstrak,
         comment: "",
         status: Number(data.status) + 2,
         kdeptSelected,
         klppmSelected,
         kpkSelected,
         reviewerSelected,
         randomRabFileName,
         randomPpmFileName,
      };

      for (const [key, value] of Object.entries(payload)) {
         if (
            (!["comment"].includes(key) && !value) ||
            (key === "anggotaTim" && Array.isArray(value) && value.length <= 1)
         ) {
            error[key] = `This field is required`;
         }
      }

      if (Object.keys(error).length > 0) {
         showModalError = true;
      } else {
         // ================================================//
         // Upload File PPM
         // ================================================//
         readerPpm.onloadend = async () => {
            const base64Data = readerPpm.result.split(",")[1];
            const payloadPpmFile = {
               filePpm: {
                  name: filePpm.name,
                  type: filePpm.type,
                  data: base64Data,
               },
               randomPpmFileName,
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
               }
            } catch (error) {
               console.error("Error uploading file:", error);
               // Buat Handle Error
               // ...
            }
         };
         if (filePpm) readerPpm.readAsDataURL(filePpm);
         // ================================================//
         // Upload File RAB
         // ================================================//
         readerRab.onloadend = async () => {
            const base64Data = readerRab.result.split(",")[1];
            const payloadRabFile = {
               fileRab: {
                  name: fileRab.name,
                  type: fileRab.type,
                  data: base64Data,
               },
               randomRabFileName,
            };

            try {
               const response = await fetch($apiURL + "/uploadRab", {
                  method: "POST",
                  headers: headers,
                  body: JSON.stringify(payloadRabFile),
               });

               const result = await response.json();

               if (response.status === 401) {
                  location.pathname = "/tokenexpired";
               }
            } catch (error) {
               console.error("Error uploading file:", error);
               // Buat Handle Error
               // ...
            }
         };

         if (fileRab) readerRab.readAsDataURL(fileRab);
         // -----------------------------------------------------------------------------//
         const response = await fetch($apiURL + "/ppm", {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(payload),
         });

         const result = await response.json();

         if (response.status === 401) {
            location.pathname = "/tokenexpired";
         } else {
            if (response.ok) {
               $route("/dosen/ppmmanagement");
            } else {
               console.log(response);
               // Buat Handle Error
               // ...
            }
         }
      }
      isLoading = false;
   }

   async function simpanProposal() {
      error = {};
      isLoading = true;
      const readerPpm = new FileReader();
      const readerRab = new FileReader();

      let payload = {
         jenisProposal,
         jenisKegiatan,
         jenisSkema,
         kelompokKeahlian,
         topik,
         tanggalMulai,
         tanggalSelesai,
         biayaPenelitian,
         anggotaTim,
         id,
         judul,
         abstrak,
         comment: "",
         status: Number(data.status),
         kdeptSelected,
         klppmSelected,
         kpkSelected,
         reviewerSelected,
         randomRabFileName,
         randomPpmFileName,
      };

      for (const [key, value] of Object.entries(payload)) {
         if (
            (!["comment", "status"].includes(key) && !value) ||
            (key === "anggotaTim" && Array.isArray(value) && value.length <= 1)
         ) {
            error[key] = `This field is required`;
         }
      }

      if (Object.keys(error).length > 0) {
         showModalError = true;
      } else {
         // ================================================//
         // Upload File PPM
         // ================================================//
         readerPpm.onloadend = async () => {
            const base64Data = readerPpm.result.split(",")[1];
            const payloadPpmFile = {
               filePpm: {
                  name: filePpm.name,
                  type: filePpm.type,
                  data: base64Data,
               },
               randomPpmFileName,
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
               }
            } catch (error) {
               console.error("Error uploading file:", error);
               // Buat Handle Error
               // ...
            }
         };

         if (filePpm) readerPpm.readAsDataURL(filePpm);
         // ================================================//
         // Upload File RAB
         // ================================================//
         readerRab.onloadend = async () => {
            const base64Data = readerRab.result.split(",")[1];
            const payloadRabFile = {
               fileRab: {
                  name: fileRab.name,
                  type: fileRab.type,
                  data: base64Data,
               },
               randomRabFileName,
            };

            try {
               const response = await fetch($apiURL + "/uploadRab", {
                  method: "POST",
                  headers: headers,
                  body: JSON.stringify(payloadRabFile),
               });

               const result = await response.json();

               if (response.status === 401) {
                  location.pathname = "/tokenexpired";
               }
            } catch (error) {
               console.error("Error uploading file:", error);
               // Buat Handle Error
               // ...
            }
         };

         if (fileRab) readerRab.readAsDataURL(fileRab);
         // -----------------------------------------------------------------------------//
         const response = await fetch($apiURL + "/ppm", {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(payload),
         });

         const result = await response.json();

         if (response.status === 401) {
            location.pathname = "/tokenexpired";
         } else {
            if (response.ok) {
               $route("/dosen/ppmmanagement");
            } else {
               console.log(response);
               // Buat Handle Error
               // ...
            }
         }
      }
      isLoading = false;
   }

   let tab1 = true;
   let tab2;

   function clicktab1() {
      tab1 = true;
      tab2 = false;
   }

   function clicktab2() {
      tab1 = false;
      tab2 = true;
   }

   function deleteMember(e) {
      let uid = e.target.getAttribute("data-value");
      anggotaTim = anggotaTim.filter((member) => {
         return member.value !== uid;
      });
   }
</script>

{#if data && items.length > 0}
   <Article>
      <h2 class="title is-2">Detail PPM</h2>

      <div class="tabs is-boxed">
         <ul>
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <li on:click={clicktab1} class:is-active={tab1}>
               <!-- svelte-ignore a11y-missing-attribute -->
               <a>
                  <span>Detail PPM</span>
               </a>
            </li>
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <li on:click={clicktab2} class:is-active={tab2}>
               <!-- svelte-ignore a11y-missing-attribute -->
               <a>
                  <span>Biodata Peneliti</span>
               </a>
            </li>
         </ul>
      </div>

      <!-- Tab Detail PPM -->
      {#if tab1 === true}
         <div class="box">
            {#if !view}
               <Field name="Judul">
                  <input
                     class="input"
                     type="text"
                     placeholder="Masukkan Judul"
                     bind:value={judul}
                  />
                  {#if error.judul}
                     <p class="help error is-danger">{error.judul}</p>
                  {/if}
               </Field>

               <Field name="Abstrak">
                  <textarea class="textarea" bind:value={abstrak}></textarea>
                  {#if error.abstrak}
                     <p class="help error is-danger">{error.abstrak}</p>
                  {/if}
               </Field>

               <Field name="Status">
                  <Status code={status} jenisSkema={data.jenis_skema} />
               </Field>

               <hr />

               <Field name="Jenis Proposal">
                  <div class="select is-fullwidth">
                     <select bind:value={jenisProposal}>
                        <option value="" selected disabled hidden
                           >Pilih Jenis Proposal</option
                        >
                        <option selected value="Proposal Awal"
                           >Proposal Awal</option
                        >
                        <option value="Proposal Lanjutan"
                           >Proposal Lanjutan</option
                        >
                     </select>
                  </div>
                  {#if error.jenisProposal}
                     <p class="help error is-danger">{error.jenisProposal}</p>
                  {/if}
               </Field>

               <Field name="Jenis Kegiatan">
                  <div class="select is-fullwidth">
                     <select bind:value={jenisKegiatan}>
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
                  <div class="select is-fullwidth">
                     <select bind:value={jenisSkema}>
                        <option value="" selected disabled hidden
                           >Pilih Jenis Skema
                        </option>
                        {#if jenisKegiatan === "Penelitian"}
                           <!-- <optgroup label="Skema Penelitian"> -->
                           <option value="Riset Kelompok Keahlian"
                              >Riset Kelompok Keahlian</option
                           >
                           <option value="Riset Terapan">Riset Terapan</option>
                           <option value="Riset Kerjasama"
                              >Riset Kerjasama</option
                           >
                           <option value="Riset Mandiri">Riset Mandiri</option>
                           <option value="Riset Eksternal"
                              >Riset Eksternal</option
                           >
                           <!-- </optgroup> -->
                        {:else}
                           <!-- <optgroup label="Skema Pengabdian Masyarakat"> -->
                           <option value="Pengabdian Masyarakat Desa Binaan"
                              >Pengabdian Masyarakat Desa Binaan</option
                           >
                           <option value="Pengabdian Masyarakat UMKM Binaan"
                              >Pengabdian Masyarakat UMKM Binaan</option
                           >
                           <option value="Pengabdian Masyarakat Mandiri"
                              >Pengabdian Masyarakat Mandiri</option
                           >
                           <option value="Pengabdian Masyarakat Hibah Eksternal"
                              >Pengabdian Masyarakat Hibah Eksternal</option
                           >
                           <!-- </optgroup> -->
                        {/if}
                     </select>
                  </div>
                  {#if error.jenisSkema}
                     <p class="help error is-danger">{error.jenisSkema}</p>
                  {/if}
               </Field>

               <Field name="Kelompok Keahlian">
                  <input
                     class="input"
                     type="text"
                     placeholder="Masukkan Kelompok Keahlian"
                     bind:value={kelompokKeahlian}
                  />
                  {#if error.kelompokKeahlian}
                     <p class="help error is-danger">
                        {error.kelompokKeahlian}
                     </p>
                  {/if}
               </Field>

               <Field name="Topik">
                  <input
                     class="input"
                     type="text"
                     placeholder="Masukkan Topik"
                     bind:value={topik}
                  />
                  {#if error.topik}
                     <p class="help error is-danger">{error.topik}</p>
                  {/if}
               </Field>

               <Field name="Tanggal Mulai">
                  <input class="input" type="date" bind:value={tanggalMulai} />
                  {#if error.tanggalMulai}
                     <p class="help error is-danger">{error.tanggalMulai}</p>
                  {/if}
               </Field>

               <Field name="Tanggal Selesai">
                  <input
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
                     class="input"
                     type="text"
                     placeholder="Masukkan Biaya Penelitian"
                     bind:value={biayaPenelitian}
                     on:keyup={() =>
                        (biayaPenelitian = formatRupiah(
                           biayaPenelitian,
                           "Rp. "
                        ))}
                  />
                  {#if error.biayaPenelitian}
                     <p class="help error is-danger">{error.biayaPenelitian}</p>
                  {/if}
               </Field>

               <hr />

               <Field name="File Proposal">
                  {#if !editModeProposal}
                     <button
                        class="button is-link button is-small"
                        on:click={handleDownloadPpm}>Download Proposal</button
                     >
                     <button
                        class="button is-link is-light is-small"
                        on:click={toggleEditModeProposal}
                        title="Change files"
                        ><span class="icon">
                           <Icon id="edit" src={edit} />
                        </span></button
                     >
                  {:else}
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
                              <input
                                 class="file-input"
                                 type="file"
                                 name="resume"
                              />
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
                        <button
                           class="button is-danger is-light is-small"
                           on:click={toggleEditModeProposal}
                           title="Cancel"
                           ><span class="icon">
                              <Icon id="cancel" src={cancelIcon} />
                           </span></button
                        >
                        {#if error.fileProposal}
                           <p class="error has-text-danger">
                              {error.fileProposal}
                           </p>
                        {/if}
                     </span>
                     <p class="help">File Type: pdf</p>
                  {/if}
               </Field>

               {#if jenisSkema === "Riset Kelompok Keahlian" || jenisSkema === "Riset Terapan" || jenisSkema === "Riset Kerjasama" || jenisSkema === "Pengabdian Masyarakat Desa Binaan" || jenisSkema === "Pengabdian Masyarakat UMKM Binaan"}
                  <Field name="File RAB">
                     {#if !editModeRAB}
                        <button
                           class="button is-link button is-small"
                           on:click={handleDownloadRab}>Download RAB</button
                        >
                        <button
                           class="button is-link is-light is-small"
                           on:click={toggleEditModeRAB}
                           title="Change files"
                           ><span class="icon">
                              <Icon id="edit" src={edit} />
                           </span></button
                        >
                     {:else}
                        <span class="inputf__wrapper">
                           <input
                              id="fileRab"
                              class="inputf custom-file-input"
                              accept=".xlsx"
                              type="file"
                              on:change={fileRabChange}
                           />
                           <div class="file has-name is-success is-small">
                              <label class="file-label" for="fileRab">
                                 <input
                                    class="file-input"
                                    type="file"
                                    name="resume"
                                 />
                                 <span class="file-cta">
                                    <span class="file-icon">
                                       <Icon id="download" src={downloadIcon} />
                                    </span>
                                    <span class="file-label">
                                       Choose a file</span
                                    >
                                 </span>
                                 {#if $rabFile?.name}
                                    <span class="file-name">
                                       {$rabFile?.name}</span
                                    >
                                 {:else}
                                    <span class="file-name">No file chosen</span
                                    >
                                 {/if}
                              </label>
                           </div>
                           <button
                              class="button is-danger is-light is-small"
                              on:click={toggleEditModeRAB}
                              title="Cancel"
                              ><span class="icon">
                                 <Icon id="cancel" src={cancelIcon} />
                              </span></button
                           >
                           {#if error.fileRAB}
                              <p class="error has-text-danger">
                                 {error.fileRAB}
                              </p>
                           {/if}
                        </span>
                        <p class="help">File Type: xlsx</p>
                     {/if}
                  </Field>
               {/if}

               <hr />

               <Field name="Anggota Tim">
                  <Select start="2" {items} bind:result={anggotaTim} />
                  {#if error.anggotaTim}
                     <p class="help error is-danger">{error.anggotaTim}</p>
                  {/if}
               </Field>

               <br />

               <table
                  class="table is-fullwidth is-striped is-hoverable is-bordered"
               >
                  <thead>
                     <tr>
                        <th class="is-narrow" style="width:65px"></th>
                        <th class="is-narrow">Role</th>
                        <th>Nama</th>
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
            {:else}
               <div class="columns is-desktop">
                  <Fieldview title="Judul" content={data.judul} />
               </div>

               <div class="columns is-desktop">
                  <Fieldview title="Abstrak" content={data.abstrak} />
               </div>

               <div class="columns is-desktop">
                  <Fieldview
                     title="Status"
                     content={status}
                     skema={data.jenis_skema}
                     type="status"
                  />
               </div>

               <hr />

               <div class="columns is-desktop">
                  <Fieldview title="Jenis Proposal" content={jenisProposal} />
                  <Fieldview title="Jenis Kegiatan" content={jenisKegiatan} />
               </div>

               <div class="columns is-desktop">
                  <Fieldview title="Jenis Skema" content={jenisSkema} />
                  <Fieldview
                     title="Kelompok Keahlian"
                     content={kelompokKeahlian}
                  />
               </div>

               <div class="columns is-desktop">
                  <Fieldview title="Topik" content={topik} />
                  <Fieldview
                     title="Biaya Penelitian"
                     content={biayaPenelitian}
                  />
               </div>

               <div class="columns is-desktop">
                  <Fieldview title="Tanggal Mulai" content={tanggalMulai} />
                  <Fieldview title="Tanggal Selesai" content={tanggalSelesai} />
               </div>

               <div class="columns is-desktop">
                  <div class="column">
                     <div class="field">
                        <p class="title is-6"><b>File Proposal</b></p>
                        <p class="subtitle is-6">
                           <button
                              class="button is-link button is-small"
                              on:click={handleDownloadPpm}
                              >Download Proposal</button
                           >
                        </p>
                     </div>
                  </div>

                  {#if jenisSkema === "Riset Kelompok Keahlian" || jenisSkema === "Riset Terapan" || jenisSkema === "Riset Kerjasama" || jenisSkema === "Pengabdian Masyarakat Desa Binaan" || jenisSkema === "Pengabdian Masyarakat UMKM Binaan"}
                     <div class="column">
                        <div class="field">
                           <p class="title is-6">
                              <b>File RAB (Rencana Anggaran Biaya)</b>
                           </p>
                           <p class="subtitle is-6">
                              <button
                                 class="button is-link button is-small"
                                 on:click={handleDownloadRab}
                                 >Download RAB</button
                              >
                           </p>
                        </div>
                     </div>
                  {/if}
               </div>

               <div class="field">
                  <p class="title is-6"><b>Anggota Tim</b></p>
                  <table
                     class="table is-fullwidth is-striped is-hoverable is-bordered"
                  >
                     <thead>
                        <tr>
                           <th class="is-narrow">Role</th>
                           <th>Nama</th>
                        </tr>
                     </thead>
                     <tbody>
                        {#if anggotaTim.length > 0}
                           {#each anggotaTim as member}
                              <tr>
                                 <td>{member.role}</td>
                                 <td>{member.label}</td>
                              </tr>
                           {/each}
                        {/if}
                     </tbody>
                  </table>
               </div>
            {/if}
         </div>

         <!-- ========================================== -->
         <!--              Catatan Revisi                -->
         <!-- ========================================== -->
         {#if !view}
            <div class="box">
               <h5 class="title is-5">Informasi Revisi Proposal</h5>
               <div class="notification is-warning is-light">
                  <p>
                     Perhatikan catatan revisi dari evaluator untuk detail yang
                     akan direvisi!
                  </p>
               </div>

               <div class="field">
                  <p class="title is-6"><b>Catatan Revisi</b></p>
                  <div class="isi-border">
                     <p class="subtitle is-6">{comment}</p>
                  </div>
               </div>

               <hr />

               <table
                  class="table is-fullwidth is-striped is-hoverable is-bordered"
               >
                  <thead>
                     <tr>
                        <th style="width: 70%;">Riwayat Catatan Revisi</th>
                        <th style="width: 15%; text-align: center">Evaluator</th
                        >
                        <th style="width: 15%; text-align: center">Tanggal</th>
                     </tr>
                  </thead>
                  {#if itemsRCR}
                     <tbody>
                        {#each itemsRCR as item}
                           <tr>
                              <td>{item.comment}</td>
                              <td style="text-align: center"
                                 >{item.evaluator}</td
                              >
                              <td style="text-align: center">{item.time}</td>
                           </tr>
                        {/each}
                     </tbody>
                  {/if}
               </table>
            </div>
         {/if}

         {#if ((jenisSkema === "Riset Eksternal" || jenisSkema === "Pengabdian Masyarakat Hibah Eksternal") && status >= 8) || ((jenisSkema === "Riset Mandiri" || jenisSkema === "Pengabdian Masyarakat Mandiri") && status >= 8) || ((jenisSkema === "Riset Kelompok Keahlian" || jenisSkema === "Riset Terapan" || jenisSkema === "Riset Kerjasama" || jenisSkema === "Pengabdian Masyarakat Desa Binaan" || jenisSkema === "Pengabdian Masyarakat UMKM Binaan") && status >= 10)}
            <!-- ============================================================ -->
            <!--       Download SK Pendanaan, SK Penelitian, Surat Tugas      -->
            <!-- ============================================================ -->
            {#if jenisSkema === "Riset Kelompok Keahlian" || jenisSkema === "Riset Terapan" || jenisSkema === "Riset Kerjasama" || jenisSkema === "Pengabdian Masyarakat Desa Binaan" || jenisSkema === "Pengabdian Masyarakat UMKM Binaan"}
               <div class="box">
                  <!-- svelte-ignore a11y-no-static-element-interactions -->
                  <!-- svelte-ignore a11y-click-events-have-key-events -->
                  <h5 class="title is-6">
                     File SK Pendanaan / Surat Kontrak Penelitian / Surat Tugas
                     <span
                        class="toggle-button"
                        on:click={() => (skpVisible = !skpVisible)}
                     >
                        {skpVisible ? "(tutup)" : "(buka)"}
                     </span>
                  </h5>

                  {#if skpVisible}
                     <hr />

                     <table
                        class="table is-fullwidth is-striped is-hoverable is-bordered"
                     >
                        <thead>
                           <tr>
                              <th style="width: 70%;">Nama </th>
                              <th class="is-narrow" style="text-align: center"
                                 >Download File</th
                              >
                              <th class="is-narrow">Tanda tangan</th>
                           </tr>
                        </thead>
                        <tbody>
                           <tr>
                              <td>SK Pendanaan</td>
                              <td
                                 ><button class="button is-link button is-small"
                                    >Download</button
                                 ></td
                              >
                              <td></td>
                           </tr>
                           <!-- ====================================================== -->
                           <tr>
                              <td>Surat Kontrak Penelitian</td>
                              <td
                                 ><button class="button is-link button is-small"
                                    >Download</button
                                 ></td
                              >
                              <td style="text-align: center"
                                 ><input type="checkbox" /></td
                              >
                           </tr>
                           <!-- ====================================================== -->
                           <tr>
                              <td>Surat Tugas</td>
                              <td
                                 ><button class="button is-link button is-small"
                                    >Download</button
                                 ></td
                              >
                              <td></td>
                           </tr>
                        </tbody>
                     </table>
                  {/if}
               </div>
            {:else}
               <div class="box">
                  <!-- svelte-ignore a11y-no-static-element-interactions -->
                  <!-- svelte-ignore a11y-click-events-have-key-events -->
                  <h5 class="title is-6">
                     File Surat Tugas
                     <span
                        class="toggle-button"
                        on:click={() => (skpVisible = !skpVisible)}
                     >
                        {skpVisible ? "(tutup)" : "(buka)"}
                     </span>
                  </h5>

                  {#if skpVisible}
                     <hr />

                     <table
                        class="table is-fullwidth is-striped is-hoverable is-bordered"
                     >
                        <thead>
                           <tr>
                              <th style="width: 70%;">Nama </th>
                              <th class="is-narrow" style="text-align: center"
                                 >Download File</th
                              >
                           </tr>
                        </thead>
                        <tbody>
                           <tr>
                              <td>Surat Tugas</td>
                              <td style="text-align: center"
                                 ><button class="button is-link button is-small"
                                    >Download</button
                                 ></td
                              >
                           </tr>
                        </tbody>
                     </table>
                  {/if}
               </div>
            {/if}

            <!-- ========================================== -->
            <!--               Dana Penelitian              -->
            <!-- ========================================== -->
            {#if jenisSkema === "Riset Kelompok Keahlian" || jenisSkema === "Riset Terapan" || jenisSkema === "Riset Kerjasama" || jenisSkema === "Pengabdian Masyarakat Desa Binaan" || jenisSkema === "Pengabdian Masyarakat UMKM Binaan"}
               <div class="box">
                  <!-- svelte-ignore a11y-no-static-element-interactions -->
                  <!-- svelte-ignore a11y-click-events-have-key-events -->
                  <h5 class="title is-6">
                     Dana Penelitian
                     <span
                        class="toggle-button"
                        on:click={() =>
                           (danaPenelitianVisible = !danaPenelitianVisible)}
                     >
                        {danaPenelitianVisible ? "(tutup)" : "(buka)"}
                     </span>
                  </h5>

                  {#if danaPenelitianVisible}
                     <hr />
                     <table
                        class="table is-fullwidth is-striped is-hoverable is-bordered"
                     >
                        <thead>
                           <tr>
                              <th style="width: 70%;">Status Dana Penelitian</th
                              >
                              <th class="is-narrow" style="text-align: center"
                                 ><span class="tag is-info"
                                    >30% dana dicairkan</span
                                 ></th
                              >
                           </tr>
                        </thead>
                        <tbody>
                           <tr>
                              <td colspan="2"
                                 ><div class="notification is-warning is-light">
                                    <p class="subtitle is-6">
                                       Untuk pengambilan dana dan penjelasan
                                       lebih lanjut terkait dana penelitian,
                                       hubungi LPPM UISI.
                                    </p>
                                 </div></td
                              >
                           </tr>
                        </tbody>
                     </table>
                  {/if}
               </div>
            {/if}

            <!-- ========================================== -->
            <!--             Hasil Penelitian               -->
            <!-- ========================================== -->
            <div class="box">
               <!-- svelte-ignore a11y-no-static-element-interactions -->
               <!-- svelte-ignore a11y-click-events-have-key-events -->
               <h5 class="title is-6">
                  Hasil Penelitian
                  <span
                     class="toggle-button"
                     on:click={() =>
                        (hasilPenelitianVisible = !hasilPenelitianVisible)}
                  >
                     {hasilPenelitianVisible ? "(tutup)" : "(buka)"}
                  </span>
               </h5>

               {#if hasilPenelitianVisible}
                  <hr />
                  <div class="field">
                     <p class="title is-6"><b>Upload Hasil Penelitian</b></p>
                     <div class="file has-name is-success is-small">
                        <label class="file-label" for="filePpm">
                           <input
                              class="file-input"
                              type="file"
                              name="resume"
                           />
                           <span class="file-cta">
                              <span class="file-icon">
                                 <Icon id="download" src={downloadIcon} />
                              </span>
                              <span class="file-label"> Choose a file</span>
                           </span>
                           <span class="file-name">No file chosen</span>
                        </label>
                     </div>
                  </div>

                  <hr />

                  <div class="field">
                     <p class="title is-6"><b>Catatan Revisi</b></p>
                     <div class="isi-border">
                        <p class="subtitle is-6">...</p>
                     </div>
                  </div>

                  <hr />

                  <table
                     class="table is-fullwidth is-striped is-hoverable is-bordered"
                  >
                     <thead>
                        <tr>
                           <th style="width: 65%;">Riwayat Catatan Revisi</th>
                           <th
                              class="is-narrow"
                              style="width: 15%; text-align: center"
                              >Evaluator</th
                           >
                           <th class="is-narrow" style="text-align: center"
                              >Tanggal</th
                           >
                        </tr>
                     </thead>

                     <tbody>
                        <tr>
                           <td>...</td>
                           <td style="text-align: center"
                              >Taris Rafiqi Izatri, S.Kom.</td
                           >
                           <td style="text-align: center">...</td>
                        </tr>
                     </tbody>
                  </table>
               {/if}
            </div>

            <!-- ========================================== -->
            <!--         Presentasi Hasil Penelitian        -->
            <!-- ========================================== -->
            <div class="box">
               <!-- svelte-ignore a11y-no-static-element-interactions -->
               <!-- svelte-ignore a11y-click-events-have-key-events -->
               <h5 class="title is-6">
                  Presentasi Hasil Penelitian
                  <span
                     class="toggle-button"
                     on:click={() => (presentasiVisible = !presentasiVisible)}
                  >
                     {presentasiVisible ? "(tutup)" : "(buka)"}
                  </span>
               </h5>

               {#if presentasiVisible}
                  <hr />
                  <table
                     class="table is-fullwidth is-striped is-hoverable is-bordered"
                  >
                     <thead>
                        <tr>
                           <th style="width: 70%;">Nama Kegiatan</th>
                           <th class="is-narrow" style="text-align: center"
                              >Checkbox</th
                           >
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <td
                              >Mempresentasikan hasil penelitian di seminar
                              penelitian bersama UISI di bulan Desember</td
                           >
                           <td style="text-align: center"
                              ><input type="checkbox" /></td
                           >
                        </tr>
                     </tbody>
                  </table>
               {/if}
            </div>

            <!-- ========================================== -->
            <!--             Download SK Penelitian         -->
            <!-- ========================================== -->
            <div class="box">
               <!-- svelte-ignore a11y-no-static-element-interactions -->
               <!-- svelte-ignore a11y-click-events-have-key-events -->
               <h5 class="title is-6">
                  File SK Penelitian
                  <span
                     class="toggle-button"
                     on:click={() =>
                        (skPenelitianVisible = !skPenelitianVisible)}
                  >
                     {skPenelitianVisible ? "(tutup)" : "(buka)"}
                  </span>
               </h5>

               {#if skPenelitianVisible}
                  <hr />

                  <table
                     class="table is-fullwidth is-striped is-hoverable is-bordered"
                  >
                     <thead>
                        <tr>
                           <th style="width: 70%;">Nama</th>
                           <th class="is-narrow" style="text-align: center"
                              >Download File</th
                           >
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <td>SK Penelitian</td>
                           <td style="text-align: center"
                              ><button class="button is-link button is-small"
                                 >Download</button
                              ></td
                           >
                        </tr>
                     </tbody>
                  </table>
               {/if}
            </div>
         {/if}

         <!-- ========================================== -->
         <!--               Action Button                -->
         <!-- ========================================== -->
         <div class="field is-grouped is-grouped-right">
            {#if !view}
               {#if status === 0}
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
               {:else}
                  <p class="control">
                     <button
                        class="button is-info"
                        class:is-loading={isLoading}
                        on:click={handlePerbaikan}>Perbaikan</button
                     >
                  </p>
               {/if}
            {/if}
         </div>
      {/if}

      <!-- Tab Biodata Peneliti -->
      {#if tab2 === true}
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
                        <Fieldview title="" content="" />
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
   </Article>
{/if}

<Modalerror bind:show={showModalError}>
   <p>Lengkapi semua form</p>
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

   .toggle-button {
      cursor: pointer;
      color: #fc6c78;
      font-size: small;
   }

   .isi-border {
      border: 1px solid lightgrey;
      padding: 15px;
      border-radius: 3.5px;
   }
</style>
