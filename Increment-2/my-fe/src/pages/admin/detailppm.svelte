<script>
   import { onMount } from "svelte";
   import {
      route,
      apiURL,
      ppmFile,
      rabFile,
      penilaianFile,
      skPendanaanFile,
      suratKontrakFile,
      suratTugasFile,
      skPPMFile,
      hasilPPMFile,
   } from "../../store";
   import Article from "../../libs/Article.svelte";
   import Field from "../../libs/Field.svelte";
   import Fieldview from "../../libs/Fieldview.svelte";
   import Modal from "../../libs/Modal.svelte";
   import Modalerror from "../../libs/Modalerror.svelte";
   import Modalchecked from "../../libs/Modalchecked.svelte";
   import Icon from "../../libs/Icon.svelte";
   import Select from "../../libs/Select.svelte";
   import Status from "../../modules/Status.svelte";
   import {
      deleteIcon,
      edit,
      cancelIcon,
      downloadIcon,
   } from "../../store/icons";

   export let params;
   const id = params["1"];

   const skemaInternal = [
      "Riset Kelompok Keahlian",
      "Riset Terapan",
      "Riset Kerjasama",
      "Pengabdian Masyarakat Desa Binaan",
      "Pengabdian Masyarakat UMKM Binaan",
   ];
   const skemaEksternal = [
      "Riset Eksternal",
      "Pengabdian Masyarakat Hibah Eksternal",
   ];
   const skemaMandiri = ["Riset Mandiri", "Pengabdian Masyarakat Mandiri"];

   let error = {};
   let newBiodataAnggota = [];
   let biodataAnggota = [];
   const idEvaluator = localStorage.getItem("id");

   let showModalError = false;
   let ModalFileNotFound = false;
   let showModalErrorRevisi = false;
   let showModalErrorPassReviewer = false;
   let showModalErrorHasilPPM = false;
   let showModalErrorInputEvaluator = false;
   let isLoading = false;
   let hasilPPMVisible = false;
   let danaPPMVisible = false;
   let skPPMVisible = false;
   let presentasiVisible = false;
   let skpVisible = false;
   let CRPVisible = false;
   let iPPVisible = false;
   let inputEvlVisible = false;
   let showModalChecked = false;
   let editModeProposal = false;
   let editModeRAB = false;

   let randomPenilaianFileName;
   let statusPencairanDana = "";

   let anggotaTim = [];
   let data;
   let ppmid,
      jenisProposal,
      jenisKegiatan,
      jenisSkema,
      kelompokKeahlian,
      topik,
      tanggalMulai,
      tanggalSelesai,
      biayaPenelitian,
      judul,
      abstrak,
      status,
      ttdSuratKontrak,
      ka_departemen,
      ka_lppm,
      reviewer,
      ka_pusat_kajian,
      kdeptSelected,
      klppmSelected,
      kpkSelected,
      reviewerSelected,
      presentasiHasilPPM;

   let options;
   let itemsRCR, itemsCHP;
   let fileRab,
      filePpm,
      fileSkPendanaan,
      fileSuratKontrak,
      fileSuratTugas,
      fileSkPPM,
      fileHasilPPM;
   let catatanRevisiProposal, catatanRevisiHasilPPM;

   let items = [];
   let view;

   const accessToken = localStorage.getItem("token");
   const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
   };

   // pakai akses token, hanya uid yang bersangkutan, dan role admin yang boleh mengakses halaman ini
   onMount(async () => {
      await getDetailPPM();

      // ========== Generate Penilaian Random Character ========== //
      let randomChar = "";
      let resultGenerateRandomChar = "";
      const characters =
         "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (let i = 0; i < 10; i++) {
         const randomIndex = Math.floor(Math.random() * characters.length);
         resultGenerateRandomChar += characters.charAt(randomIndex);
      }

      randomChar = resultGenerateRandomChar;

      randomPenilaianFileName = id + "_Penilaian Proposal PPM_" + randomChar;

      // ========== Get Nama Lengkap Evaluator ========== //
      const responseEvl = await fetch($apiURL + "/user/" + idEvaluator, {
         method: "GET",
         headers: headers,
      });

      const resultEvl = await responseEvl.json();

      if (responseEvl.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (responseEvl.ok) {
            dataEvl = resultEvl;
            namaLengkapEvl = dataEvl.nama_lengkap;
         }
      }

      // ========== Get Riwayat Catatan Revisi Proposal ========== //
      const responseRCR = await fetch(
         $apiURL + "/riwayatCatatanRevisiProposal/" + ppmId,
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

      // ========== Get Riwayat Catatan Revisi Hasil PPM ========== //
      const responseCHP = await fetch(
         $apiURL + "/riwayatCatatanRevisiHasilPPM/" + ppmId,
         {
            method: "GET",
            headers: headers,
         }
      );

      const dataCHP = await responseCHP.json();

      if (responseCHP.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (responseCHP.ok) {
            itemsCHP = dataCHP.dbData.map((item) => ({
               ...item,
               time: formatDate(item.time),
            }));
         }
      }
   });

   async function getDetailPPM() {
      ka_departemen = await findRole(11);
      ka_lppm = await findRole(12);
      ka_pusat_kajian = await findRole(13);
      reviewer = await findRole(10);

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

            // view = !isEdit(result.status);
            view = !isEdit(data.status, data.jenis_skema);
            ppmId = data.id;
            uidProposal = data.uid;
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
            isi = data.isi;
            status = data.status;
            kdeptSelected = data.uid_kdept;
            klppmSelected = data.uid_klppm;
            kpkSelected = data.uid_kpk;
            reviewerSelected = data.uid_reviewer;
            randomRabFileName = data.rab_file_name;
            randomPpmFileName = data.ppm_file_name;
            randomPenilaianFileNamedb = data.penilaian_file_name;
            ttdSuratKontrak = data.ttd_surat_kontrak;
            presentasiHasilPPM = data.presentasi_hasil_ppm;

            fileSkPendanaanNameDB = data.file_sk_pendanaan;
            fileSuratKontrakNameDB = data.file_surat_kontrak;
            fileSuratTugasNameDB = data.file_surat_tugas;
            fileSkPPMNameDB = data.file_sk_ppm;
            fileHasilPPMNameDB = data.file_hasil_ppm;
            statusPencairanDana = data.status_pencairan_dana || "";
         }
      }
   }

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

   // function isEdit(code) {
   //    const edit = [0, 1, 3, 5, 7, 9];
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
            editStatus = [0, 1, 3, 5];
            break;
         case "Riset Eksternal":
         case "Pengabdian Masyarakat Hibah Eksternal":
            editStatus = [0, 1, 3, 5];
            break;
         case "Riset Mandiri":
         case "Pengabdian Masyarakat Mandiri":
            editStatus = [0, 1, 3, 5];
            break;
         default:
            editStatus = [];
      }
      return editStatus.includes(code);
   }

   function isObjectEmpty(objectName) {
      return (
         objectName &&
         Object.keys(objectName).length === 0 &&
         objectName.constructor === Object
      );
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

   async function handleSubmitStatusPendanaan() {
      isLoading = true;

      payload = {
         statusPencairanDana,
         id,
      };

      const response = await fetch($apiURL + "/submitStatusPencairanDana", {
         method: "PATCH",
         headers: headers,
         body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (response.ok) {
            getDetailPPM();
         } else {
            console.log(response);
         }
      }
      showModalChecked = true;
      isLoading = false;
   }

   async function handleSubmitEvaluator() {
      error = {};
      isLoading = true;

      const payload = {
         id,
         kdeptSelected,
         klppmSelected,
         kpkSelected,
         reviewerSelected,
      };

      for (const [key, value] of Object.entries(payload)) {
         if (!payload[key]) {
            error[key] = `This field is required`;
         }
      }

      if (Object.keys(error).length > 0) {
         showModalErrorInputEvaluator = true;
      } else {
         const response = await fetch($apiURL + "/submitEvaluator", {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(payload),
         });

         const result = await response.json();

         if (response.status === 401) {
            location.pathname = "/tokenexpired";
         } else {
            if (response.ok) {
               getDetailPPM();
               showModalChecked = true;
            } else {
               console.log(response);
            }
         }
      }
      isLoading = false;
   }

   async function handleSubmitFile() {
      isLoading = true;
      const readerSkPendanaan = new FileReader();
      const readerSuratKontrak = new FileReader();
      const readerSuratTugas = new FileReader();
      const readerSkPPM = new FileReader();

      let fileSkPendanaanName = id + "_SK Pendanaan";
      let fileSuratKontrakName = id + "_Surat Kontrak PPM";
      let fileSuratTugasName = id + "_Surat Tugas";
      let fileSkPPMName = id + "_SK PPM";

      let payloadFileName = {
         fileSkPendanaanName,
         fileSuratKontrakName,
         fileSuratTugasName,
         fileSkPPMName,
         id,
      };

      const submitFileName = new Promise(async (resolve, reject) => {
         try {
            const response = await fetch($apiURL + "/submitFilePPM", {
               method: "PATCH",
               headers: headers,
               body: JSON.stringify(payloadFileName),
            });

            const result = await response.json();

            if (response.status === 401) {
               location.pathname = "/tokenexpired";
               reject("Token expired");
            } else if (response.ok) {
               resolve(result);
            } else {
               console.log(result.msg, error);
               reject("Error submitting file");
            }
         } catch (error) {
            reject(error);
         }
      });

      // ================================ Upload SK Pendanaan ================================ //
      const uploadSkPendanaan = new Promise((resolve, reject) => {
         if (!fileSkPendanaan) {
            resolve("No file SkPendanaan selected");
            return;
         }

         readerSkPendanaan.onloadend = async () => {
            const base64Data = readerSkPendanaan.result.split(",")[1];
            const payloadSkPendanaanFile = {
               fileSkPendanaan: {
                  name: fileSkPendanaan.name,
                  type: fileSkPendanaan.type,
                  data: base64Data,
               },
               fileSkPendanaanName,
            };

            try {
               const response = await fetch(
                  $apiURL + "/uploadDownloadSKPendanaan",
                  {
                     method: "POST",
                     headers: headers,
                     body: JSON.stringify(payloadSkPendanaanFile),
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

         if (fileSkPendanaan) readerSkPendanaan.readAsDataURL(fileSkPendanaan);
      });

      // ================================ Upload Surat Kontrak ================================ //
      const uploadSuratKontrak = new Promise((resolve, reject) => {
         if (!fileSuratKontrak) {
            resolve("No file SuratKontrak selected");
            return;
         }

         readerSuratKontrak.onloadend = async () => {
            const base64Data = readerSuratKontrak.result.split(",")[1];
            const payloadSuratKontrakFile = {
               fileSuratKontrak: {
                  name: fileSuratKontrak.name,
                  type: fileSuratKontrak.type,
                  data: base64Data,
               },
               fileSuratKontrakName,
            };

            try {
               const response = await fetch(
                  $apiURL + "/uploadDownloadSuratKontrak",
                  {
                     method: "POST",
                     headers: headers,
                     body: JSON.stringify(payloadSuratKontrakFile),
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

         if (fileSuratKontrak)
            readerSuratKontrak.readAsDataURL(fileSuratKontrak);
      });

      // ================================ Upload Surat Tugas ================================ //
      const uploadSuratTugas = new Promise((resolve, reject) => {
         if (!fileSuratTugas) {
            resolve("No file SuratTugas selected");
            return;
         }

         readerSuratTugas.onloadend = async () => {
            const base64Data = readerSuratTugas.result.split(",")[1];
            const payloadSuratTugasFile = {
               fileSuratTugas: {
                  name: fileSuratTugas.name,
                  type: fileSuratTugas.type,
                  data: base64Data,
               },
               fileSuratTugasName,
            };

            try {
               const response = await fetch(
                  $apiURL + "/uploadDownloadSuratTugas",
                  {
                     method: "POST",
                     headers: headers,
                     body: JSON.stringify(payloadSuratTugasFile),
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

         if (fileSuratTugas) readerSuratTugas.readAsDataURL(fileSuratTugas);
      });

      // ================================ Upload SK PPM ================================ //
      const uploadSkPPM = new Promise((resolve, reject) => {
         if (!fileSkPPM) {
            resolve("No file SkPPM selected");
            return;
         }

         readerSkPPM.onloadend = async () => {
            const base64Data = readerSkPPM.result.split(",")[1];
            const payloadSkPPMFile = {
               fileSkPPM: {
                  name: fileSkPPM.name,
                  type: fileSkPPM.type,
                  data: base64Data,
               },
               fileSkPPMName,
            };

            try {
               const response = await fetch($apiURL + "/uploadDownloadSKPPM", {
                  method: "POST",
                  headers: headers,
                  body: JSON.stringify(payloadSkPPMFile),
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

         if (fileSkPPM) readerSkPPM.readAsDataURL(fileSkPPM);
      });

      try {
         await Promise.all([
            submitFileName,
            uploadSkPendanaan,
            uploadSuratKontrak,
            uploadSuratTugas,
            uploadSkPPM,
         ]);
      } finally {
         showModalChecked = true;
         isLoading = false;
      }
   }

   async function handleSubmitHasilPPM() {
      isLoading = true;
      const readerHasilPPM = new FileReader();
      let fileHasilPPMName = id + "_Laporan Hasil PPM";

      let payloadFileName = {
         status: Number(data.status) + 2,
         fileHasilPPMName,
         id,
      };

      if (hasilPPMisRequired && !fileHasilPPM) {
         showModalErrorHasilPPM = true;
         isLoading = false;
         return;
      } else {
         // ================================ Upload Hasil PPM ================================ //
         const uploadHasilPPM = new Promise((resolve, reject) => {
            if (!fileHasilPPM) {
               resolve("No file Hasil PPM selected");
               return;
            }

            readerHasilPPM.onloadend = async () => {
               const base64Data = readerHasilPPM.result.split(",")[1];
               const payloadHasilPPMFile = {
                  fileHasilPPM: {
                     name: fileHasilPPM.name,
                     type: fileHasilPPM.type,
                     data: base64Data,
                  },
                  fileHasilPPMName,
               };

               try {
                  const response = await fetch(
                     $apiURL + "/uploadDownloadHasilPPM",
                     {
                        method: "POST",
                        headers: headers,
                        body: JSON.stringify(payloadHasilPPMFile),
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

            if (fileHasilPPM) readerHasilPPM.readAsDataURL(fileHasilPPM);
            // readerHasilPPM.readAsDataURL(fileHasilPPM);
         });

         // ================================ Update Data PPM ================================ //
         const submitFileName = new Promise(async (resolve, reject) => {
            try {
               const response = await fetch($apiURL + "/submitFilePPM/pass", {
                  method: "PATCH",
                  headers: headers,
                  body: JSON.stringify(payloadFileName),
               });

               const result = await response.json();

               if (response.status === 401) {
                  location.pathname = "/tokenexpired";
                  reject("Token expired");
               } else if (response.ok) {
                  resolve(result);
               } else {
                  console.log(result.msg, error);
                  reject("Error submitting file");
               }
            } catch (error) {
               reject(error);
            }
         });

         try {
            await Promise.all([uploadHasilPPM, submitFileName]);
         } finally {
            isLoading = false;
         }
      }
   }

   async function handlePerbaikan() {
      await getBiodataAnggota();
      error = {};
      isLoading = true;

      const readerRab = new FileReader();
      const readerPpm = new FileReader();
      const readerHasilPPM = new FileReader();

      let fileHasilPPMName = id + "_Laporan Hasil PPM";

      const payload = {
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
            (!["catatanRevisiProposal"].includes(key) && !value) ||
            (key === "anggotaTim" && Array.isArray(value) && value.length <= 1)
         ) {
            error[key] = `This field is required`;
         }
      }

      if (Object.keys(error).length > 0) {
         showModalError = true;
         isLoading = false;
      } else {
         // ================================ Upload File Proposal ================================ //
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

         // ================================ Upload File RAB ================================ //
         const cekFileRAB = new Promise((resolve, reject) => {
            if (!fileRab) {
               resolve("No fileRab selected");
               return;
            }

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

            if (fileRab) readerRab.readAsDataURL(fileRab);
         });

         // ================================ Upload File Hasil PPM ================================ //
         const cekFileHasilPPM = new Promise((resolve, reject) => {
            if (!fileHasilPPM) {
               resolve("No fileHasilPPM selected");
               return;
            }

            readerHasilPPM.onloadend = async () => {
               const base64Data = readerHasilPPM.result.split(",")[1];
               const payloadHasilPPMFile = {
                  fileHasilPPM: {
                     name: fileHasilPPM.name,
                     type: fileHasilPPM.type,
                     data: base64Data,
                  },
                  fileHasilPPMName,
               };

               try {
                  const response = await fetch(
                     $apiURL + "/uploadDownloadHasilPPM",
                     {
                        method: "POST",
                        headers: headers,
                        body: JSON.stringify(payloadHasilPPMFile),
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

            if (fileHasilPPM) readerHasilPPM.readAsDataURL(fileHasilPPM);
         });

         // ================================ Patch Data PPM ================================ //
         const cekPatchDataPPM = new Promise(async (resolve, reject) => {
            const response = await fetch($apiURL + "/ppm", {
               method: "PATCH",
               headers: headers,
               body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (response.status === 401) {
               location.pathname = "/tokenexpired";
               reject("Token expired");
            } else {
               if (response.ok) {
                  // $route("/admin/ppmmanagement");
                  resolve(result);
               } else {
                  console.log(response);
                  reject("Error submitting file");
               }
            }
         });

         try {
            await Promise.all([
               cekFileProposal,
               cekFileRAB,
               cekFileHasilPPM,
               cekPatchDataPPM,
            ]);
         } finally {
            isLoading = false;
            $route("/admin/ppmmanagement");
         }
      }
   }

   async function handleRevisi() {
      error = {};
      isLoading = true;

      let payload = {
         status: Number(data.status) - 1,
         id,
      };

      const payloadCttnRevisiProposal = {
         ppmId,
         catatanRevisiProposal,
         namaLengkapEvl,
      };
      const payloadCttnRevisiHasilPPM = {
         ppmId,
         catatanRevisiHasilPPM,
         namaLengkapEvl,
      };

      if (cttnRevisiProposalisRequired()) {
         if (!payloadCttnRevisiProposal.catatanRevisiProposal) {
            error.catatanRevisiProposal = `This field is required`;
         }
      }

      if (cttnRevisiHasilPPMisRequired()) {
         if (!payloadCttnRevisiHasilPPM.catatanRevisiHasilPPM) {
            error.catatanRevisiHasilPPM = `This field is required`;
         }
      }

      if (Object.keys(error).length > 0) {
         showModalErrorRevisi = true;
      } else {
         // ===========  Post Catatan Revisi Proposal  =========== //
         if (cttnRevisiProposalisRequired()) {
            const responseRevisiProposal = await fetch(
               $apiURL + "/riwayatCatatanRevisiProposal",
               {
                  method: "POST",
                  headers: headers,
                  body: JSON.stringify(payloadCttnRevisiProposal),
               }
            );

            const resultRevisiProposal = await responseRevisiProposal.json();

            if (responseRevisiProposal.status === 401) {
               location.pathname = "/tokenexpired";
            } else {
               if (!responseRevisiProposal.ok) {
                  console.log(responseRevisiProposal);
                  // Buat Handle Error
               }
            }
         }

         // ===========  Post Catatan Revisi Hasil PPM  =========== //
         if (cttnRevisiHasilPPMisRequired()) {
            const responseRevisiHasilPPM = await fetch(
               $apiURL + "/riwayatCatatanRevisiHasilPPM",
               {
                  method: "POST",
                  headers: headers,
                  body: JSON.stringify(payloadCttnRevisiHasilPPM),
               }
            );

            const resultRevisiHasilPPM = await responseRevisiHasilPPM.json();

            if (responseRevisiHasilPPM.status === 401) {
               location.pathname = "/tokenexpired";
            } else {
               if (!responseRevisiHasilPPM.ok) {
                  console.log(responseRevisiHasilPPM);
                  // Buat Handle Error
               }
            }
         }

         // ================  Update Data PPM  ================ //
         const response = await fetch($apiURL + "/handleEvaluatorAction/pass", {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(payload),
         });

         const result = await response.json();

         if (response.status === 401) {
            location.pathname = "/tokenexpired";
         } else {
            if (response.ok) {
               $route("/admin/ppmmanagement");
            } else {
               console.log(response);
            }
         }
      }
      isLoading = false;
   }

   async function handleDitolak() {
      isLoading = true;

      const payload = {
         status: Number(data.status) + 1,
         id,
      };

      const response = await fetch($apiURL + "/handleEvaluatorAction/pass", {
         method: "PATCH",
         headers: headers,
         body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (response.ok) {
            $route("/admin/ppmmanagement");
         } else {
            console.log(response);
         }
      }
      isLoading = false;
   }

   async function handleSimpanPenilaian() {
      error = {};
      isLoading = true;
      const readerPenilaian = new FileReader();

      const payload = {
         status: Number(data.status),
         randomPenilaianFileName,
         id,
      };

      if (isObjectEmpty($penilaianFile)) {
         error["filePenilaian"] = `*`;
      }

      if (Object.keys(error).length > 0) {
         showModalErrorPassReviewer = true;
      } else {
         // ==================================================//
         // Upload File Penilaian
         // ==================================================//
         if (
            jenisSkema === "Riset Kelompok Keahlian" ||
            jenisSkema === "Riset Terapan" ||
            jenisSkema === "Riset Kerjasama" ||
            jenisSkema === "Pengabdian Masyarakat Desa Binaan" ||
            jenisSkema === "Pengabdian Masyarakat UMKM Binaan"
         ) {
            readerPenilaian.onloadend = async () => {
               const base64Data = readerPenilaian.result.split(",")[1];
               const payloadPenilaianFile = {
                  filePenilaian: {
                     name: filePenilaian.name,
                     type: filePenilaian.type,
                     data: base64Data,
                  },
                  randomPenilaianFileName,
               };

               try {
                  const responseUpload = await fetch(
                     $apiURL + "/uploadPenilaian",
                     {
                        method: "POST",
                        headers: headers,
                        body: JSON.stringify(payloadPenilaianFile),
                     }
                  );

                  const resultUpload = await responseUpload.json();

                  if (responseUpload.status === 401) {
                     location.pathname = "/tokenexpired";
                  }
               } catch (error) {
                  console.error("Error uploading file:", error);
               }
            };
            readerPenilaian.readAsDataURL(filePenilaian);
         }
         // -------------------------------------------------------------------//
         const response = await fetch($apiURL + "/handleEvaluatorAction", {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(payload),
         });

         const result = await response.json();

         if (response.status === 401) {
            location.pathname = "/tokenexpired";
         } else {
            if (response.ok) {
               getDetailPPM();
               showModalChecked = true;
            } else {
               console.log(response);
            }
         }
      }
      isLoading = false;
   }

   async function handlePass() {
      let db_Kdept = data.uid_kdept;
      let db_Klppm = data.uid_klppm;
      let db_Kpk = data.uid_kpk;
      let db_Reviewer = data.uid_reviewer;
      let payload = {
         status: Number(data.status) + 2,
         id,
      };
      let dbEvaluator = {
         db_Kdept,
         db_Klppm,
         db_Kpk,
         db_Reviewer,
      };
      error = {};
      isLoading = true;

      for (const [key, value] of Object.entries(dbEvaluator)) {
         if (!dbEvaluator[key]) {
            error[key] = `This field is required`;
         }
      }

      if (Object.keys(error).length > 0) {
         showModalErrorInputEvaluator = true;
      } else {
         const response = await fetch($apiURL + "/handleEvaluatorAction/pass", {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(payload),
         });

         const result = await response.json();

         if (response.status === 401) {
            location.pathname = "/tokenexpired";
         } else {
            if (response.ok) {
               $route("/admin/ppmmanagement");
            } else {
               console.log(response);
               // Buat Handle Error
               // ...
            }
         }
      }
      isLoading = false;
   }

   function deleteMember(e) {
      let uid = e.target.getAttribute("data-value");
      anggotaTim = anggotaTim.filter((member) => {
         return member.value !== uid;
      });
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

   async function handleDownloadPenilaian(e) {
      let filename = "Penilaian Proposal_" + judul + ".xlsx";

      try {
         const response = await fetch(
            $apiURL + `/uploadPenilaian/${randomPenilaianFileNamedb}`,
            {
               method: "GET",
               headers: headers,
            }
         );

         if (response.status === 401) {
            location.pathname = "/tokenexpired";
         } else if (response.ok) {
            const blob = await response.blob();
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = filename;
            link.click();
         } else {
            ModalFileNotFound = true;
         }
      } catch (error) {
         console.error("Error downloading file:", error);
      }
   }

   async function handleDownloadSkPendanaan(e) {
      let filename = "SK Pendanaan" + ".pdf";

      try {
         const response = await fetch(
            $apiURL + `/uploadDownloadSKPendanaan/${fileSkPendanaanNameDB}`,
            {
               method: "GET",
               headers: headers,
            }
         );

         if (response.status === 401) {
            location.pathname = "/tokenexpired";
         } else if (response.ok) {
            const blob = await response.blob();
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = filename;
            link.click();
         } else {
            ModalFileNotFound = true;
         }
      } catch (error) {
         console.error("Error downloading file:", error);
      }
   }

   async function handleDownloadSuratKontrak() {
      let filename = "Surat Kontrak Penelitian" + ".pdf";

      try {
         const response = await fetch(
            $apiURL + `/uploadDownloadSuratKontrak/${fileSuratKontrakNameDB}`,
            {
               method: "GET",
               headers: headers,
            }
         );

         if (response.status === 401) {
            location.pathname = "/tokenexpired";
         } else if (response.ok) {
            const blob = await response.blob();
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = filename;
            link.click();
         } else {
            ModalFileNotFound = true;
         }
      } catch (error) {
         console.error("Error downloading file:", error);
      }
   }

   async function handleDownloadSuratTugas() {
      let filename = "Surat Tugas" + ".pdf";

      try {
         const response = await fetch(
            $apiURL + `/uploadDownloadSuratTugas/${fileSuratTugasNameDB}`,
            {
               method: "GET",
               headers: headers,
            }
         );

         if (response.status === 401) {
            location.pathname = "/tokenexpired";
         } else if (response.ok) {
            const blob = await response.blob();
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = filename;
            link.click();
         } else {
            ModalFileNotFound = true;
         }
      } catch (error) {
         console.error("Error downloading file:", error);
      }
   }

   async function handleDownloadSkPPM() {
      let filename = "SK PPM" + ".pdf";

      try {
         const response = await fetch(
            $apiURL + `/uploadDownloadSKPPM/${fileSkPPMNameDB}`,
            {
               method: "GET",
               headers: headers,
            }
         );

         if (response.status === 401) {
            location.pathname = "/tokenexpired";
         } else if (response.ok) {
            const blob = await response.blob();
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = filename;
            link.click();
         } else {
            ModalFileNotFound = true;
         }
      } catch (error) {
         console.error("Error downloading file:", error);
      }
   }

   async function handleDownloadHasilPPM() {
      let filename = "Laporan Hasil PPM" + ".pdf";

      try {
         const response = await fetch(
            $apiURL + `/uploadDownloadHasilPPM/${fileHasilPPMNameDB}`,
            {
               method: "GET",
               headers: headers,
            }
         );

         if (response.status === 401) {
            location.pathname = "/tokenexpired";
         } else if (response.ok) {
            const blob = await response.blob();
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = filename;
            link.click();
         } else {
            ModalFileNotFound = true;
         }
      } catch (error) {
         console.error("Error downloading file:", error);
      }
   }

   async function checkboxPresentasiHasilPPM(event) {
      presentasiHasilPPM = event.target.checked ? 1 : 0;
      payload = {
         ppmId,
         presentasiHasilPPM,
      };

      const response = await fetch($apiURL + "/checkBoxPPM/id/presentasiPPM", {
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

   async function findRole(role) {
      const response = await fetch($apiURL + "/role/" + role, {
         method: "GET",
         headers: headers,
      });
      const result = await response.json();

      if (response.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (response.ok) {
            options = result;
            return options;
         } else {
            console.log(response);
         }
      }
   }

   function ShowRPButton() {
      const StatusForInternal = [2, 10];
      const StatusForEksternal = [2, 10];
      const StatusForMandiri = [2, 10];

      if (
         skemaInternal.includes(data.jenis_skema) &&
         StatusForInternal.includes(data.status)
      ) {
         return true;
      }
      if (
         skemaEksternal.includes(data.jenis_skema) &&
         StatusForEksternal.includes(data.status)
      ) {
         return true;
      }
      if (
         skemaMandiri.includes(data.jenis_skema) &&
         StatusForMandiri.includes(data.status)
      ) {
         return true;
      }
   }

   // function ShowReviewerButton() {
   //    const StatusReviewReviewer = [6];

   //    if (
   //       skemaInternal.includes(data.jenis_skema) &&
   //       StatusReviewReviewer.includes(data.status)
   //    ) {
   //       return true;
   //    }
   // }

   function hasilPPMisRequired() {
      const ReviewKpkKlppmSkemaInternal = [8];
      const ReviewKpkKlppmSkemaEksternal = [8];
      const ReviewKpkKlppmSkemaMandiri = [8];

      if (
         skemaInternal.includes(data.jenis_skema) &&
         ReviewKpkKlppmSkemaInternal.includes(data.status)
      ) {
         return true;
      }
      if (
         skemaEksternal.includes(data.jenis_skema) &&
         ReviewKpkKlppmSkemaEksternal.includes(data.status)
      ) {
         return true;
      }
      if (
         skemaMandiri.includes(data.jenis_skema) &&
         ReviewKpkKlppmSkemaMandiri.includes(data.status)
      ) {
         return true;
      }
   }

   function ShowRDPButton() {
      const ReviewKpkKlppmSkemaInternal = [6];
      const ReviewKpkKlppmSkemaEksternal = [6];
      const ReviewKpkKlppmSkemaMandiri = [6];

      if (
         skemaInternal.includes(data.jenis_skema) &&
         ReviewKpkKlppmSkemaInternal.includes(data.status)
      ) {
         return true;
      }
      if (
         skemaEksternal.includes(data.jenis_skema) &&
         ReviewKpkKlppmSkemaEksternal.includes(data.status)
      ) {
         return true;
      }
      if (
         skemaMandiri.includes(data.jenis_skema) &&
         ReviewKpkKlppmSkemaMandiri.includes(data.status)
      ) {
         return true;
      }
   }

   function cttnRevisiProposalisRequired() {
      const RevisiSkemaInternal = [2, 6];
      const RevisiSkemaEksternal = [2, 6];
      const RevisiSkemaMandiri = [2, 6];

      if (
         skemaInternal.includes(data.jenis_skema) &&
         RevisiSkemaInternal.includes(data.status)
      ) {
         return true;
      }
      if (
         skemaEksternal.includes(data.jenis_skema) &&
         RevisiSkemaEksternal.includes(data.status)
      ) {
         return true;
      }
      if (
         skemaMandiri.includes(data.jenis_skema) &&
         RevisiSkemaMandiri.includes(data.status)
      ) {
         return true;
      }

      return false;
   }

   function cttnRevisiHasilPPMisRequired() {
      const RevisiSkemaInternal = [10];
      const RevisiSkemaEksternal = [10];
      const RevisiSkemaMandiri = [10];

      if (
         skemaInternal.includes(data.jenis_skema) &&
         RevisiSkemaInternal.includes(data.status)
      ) {
         return true;
      }
      if (
         skemaEksternal.includes(data.jenis_skema) &&
         RevisiSkemaEksternal.includes(data.status)
      ) {
         return true;
      }
      if (
         skemaMandiri.includes(data.jenis_skema) &&
         RevisiSkemaMandiri.includes(data.status)
      ) {
         return true;
      }

      return false;
   }

   function ShowButtonPerbaikan() {
      const RevisiSkemaInternal = [1, 3, 5, 9];
      const RevisiSkemaEksternal = [1, 3, 5, 9];
      const RevisiSkemaMandiri = [1, 3, 5, 9];

      if (
         skemaInternal.includes(data.jenis_skema) &&
         RevisiSkemaInternal.includes(data.status)
      ) {
         return true;
      }
      if (
         skemaEksternal.includes(data.jenis_skema) &&
         RevisiSkemaEksternal.includes(data.status)
      ) {
         return true;
      }
      if (
         skemaMandiri.includes(data.jenis_skema) &&
         RevisiSkemaMandiri.includes(data.status)
      ) {
         return true;
      }

      return false;
   }

   function toggleEditModeProposal() {
      editModeProposal = !editModeProposal;
   }

   function toggleEditModeRAB() {
      editModeRAB = !editModeRAB;
   }

   function filePpmChange(e) {
      filePpm = e.target.files[0];
      $ppmFile = e.target.files[0];
   }

   function fileRabChange(e) {
      fileRab = e.target.files[0];
      $rabFile = e.target.files[0];
   }

   function filePenilaianChange(e) {
      filePenilaian = e.target.files[0];
      $penilaianFile = e.target.files[0];
   }

   function fileSkPendanaanChange(e) {
      fileSkPendanaan = e.target.files[0];
      $skPendanaanFile = e.target.files[0];
   }

   function fileSuratKontrakChange(e) {
      fileSuratKontrak = e.target.files[0];
      $suratKontrakFile = e.target.files[0];
   }

   function fileSuratTugasChange(e) {
      fileSuratTugas = e.target.files[0];
      $suratTugasFile = e.target.files[0];
   }

   function fileSkPPMChange(e) {
      fileSkPPM = e.target.files[0];
      $skPPMFile = e.target.files[0];
   }

   function fileHasilPPMChange(e) {
      fileHasilPPM = e.target.files[0];
      $hasilPPMFile = e.target.files[0];
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

   $: isFormFilled =
      kdeptSelected && klppmSelected && reviewerSelected && kpkSelected;
</script>

{#if data}
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
      <!-- Tab Identitas PPM -->
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
                        <option value="Proposal Awal">Proposal Awal</option>
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
                  <div class="field">
                     <input
                        class="input"
                        type="date"
                        bind:value={tanggalMulai}
                     />
                  </div>
                  {#if error.tanggalMulai}
                     <p class="help error is-danger">{error.tanggalMulai}</p>
                  {/if}
               </Field>

               <Field name="Tanggal Selesai">
                  <div class="field">
                     <input
                        class="input"
                        type="date"
                        bind:value={tanggalSelesai}
                     />
                  </div>
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
         <!--           Input Penilaian Proposal         -->
         <!-- ========================================== -->
         {#if skemaInternal.includes(jenisSkema)}
            <div class="box">
               <!-- svelte-ignore a11y-no-static-element-interactions -->
               <!-- svelte-ignore a11y-click-events-have-key-events -->
               <h5 class="title is-6">
                  Penilaian Proposal
                  <span
                     class="toggle-button"
                     on:click={() => (iPPVisible = !iPPVisible)}
                  >
                     {iPPVisible ? "(tutup)" : "(buka)"}
                  </span>
               </h5>

               {#if iPPVisible}
                  <hr />

                  <table
                     class="table is-fullwidth is-striped is-hoverable is-bordered"
                  >
                     <thead>
                        <tr>
                           <th style="width: 70%;">Nama</th>
                           <th class="is-narrow" style="text-align: center"
                              >Upload File (.xlsx)</th
                           >
                           <th class="is-narrow" style="text-align: center"
                              >Download File</th
                           >
                        </tr>
                     </thead>

                     <tbody>
                        <td>Penilaian Proposal PPM</td>
                        <td>
                           <span class="inputf__wrapper mb-1">
                              <input
                                 id="filePenilaian"
                                 class="inputf custom-file-input"
                                 accept=".xlsx"
                                 type="file"
                                 on:change={filePenilaianChange}
                              />
                              <div class="file has-name is-small">
                                 <label class="file-label" for="filePenilaian">
                                    <input
                                       class="file-input"
                                       type="file"
                                       name="resume"
                                    />
                                    <span class="file-cta">
                                       <span class="file-icon">
                                          <Icon
                                             id="download"
                                             src={downloadIcon}
                                          />
                                       </span>
                                       <span class="file-label">
                                          Choose a file</span
                                       >
                                    </span>
                                    {#if $penilaianFile?.name}
                                       <span class="file-name">
                                          {$penilaianFile.name}</span
                                       >
                                    {:else}
                                       <span class="file-name"
                                          >No file chosen</span
                                       >
                                    {/if}
                                 </label>
                              </div>
                           </span>
                        </td>
                        <td style="text-align: center"
                           ><button
                              class="button is-link button is-small"
                              on:click={handleDownloadPenilaian}
                              >Download</button
                           ></td
                        >
                     </tbody>
                  </table>

                  <div class="field is-grouped is-grouped-right">
                     <p class="control">
                        <button
                           class="button is-info"
                           on:click={handleSimpanPenilaian}
                           class:is-loading={isLoading}>Simpan Penilaian</button
                        >
                     </p>
                  </div>
               {/if}
            </div>
         {/if}

         <!-- ========================================== -->
         <!--           Catatan Revisi Proposal          -->
         <!-- ========================================== -->
         {#if status != 0}
            <div class="box">
               <!-- svelte-ignore a11y-no-static-element-interactions -->
               <!-- svelte-ignore a11y-click-events-have-key-events -->
               <h5 class="title is-6">
                  Informasi Revisi Proposal <span
                     class="toggle-button"
                     on:click={() => (CRPVisible = !CRPVisible)}
                  >
                     {CRPVisible ? "(tutup)" : "(buka)"}
                  </span>
               </h5>

               {#if CRPVisible}
                  <hr />
                  {#if cttnRevisiProposalisRequired()}
                     <div class="notification is-warning is-light">
                        <p>Berikan catatan revisi jika ingin revisi proposal</p>
                     </div>

                     <div class="field">
                        <p class="title is-6"><b>Catatan Revisi</b></p>
                        <textarea
                           class="textarea mb-1"
                           bind:value={catatanRevisiProposal}
                           name="catatanRevisiProposal"
                           id="catatanRevisiProposal"
                        ></textarea>
                        {#if error.catatanRevisiProposal}
                           <p class="help error is-danger">
                              {error.catatanRevisiProposal}
                           </p>
                        {/if}
                     </div>
                  {:else}
                     <div class="notification is-warning is-light">
                        <p>
                           Perhatikan catatan revisi dari evaluator untuk detail
                           yang akan direvisi!
                        </p>
                     </div>
                  {/if}

                  <hr />

                  <table
                     class="table is-fullwidth is-striped is-hoverable is-bordered"
                  >
                     <thead>
                        <tr>
                           <th style="width: 70%;">Riwayat Catatan Revisi</th>
                           <th style="width: 15%; text-align: center"
                              >Evaluator</th
                           >
                           <th style="width: 15%; text-align: center"
                              >Tanggal</th
                           >
                        </tr>
                     </thead>

                     {#if itemsRCR}
                        <tbody>
                           {#each itemsRCR as item}
                              <tr>
                                 <td>{item.catatan_revisi_proposal}</td>
                                 <td style="text-align: center"
                                    >{item.evaluator}</td
                                 >
                                 <td style="text-align: center">{item.time}</td>
                              </tr>
                           {/each}
                        </tbody>
                     {/if}
                  </table>
               {/if}
            </div>
         {/if}

         <!-- ========================================== -->
         <!--              Input Evaluator               -->
         <!-- ========================================== -->
         {#if status != 0}
            <div class="box">
               <!-- svelte-ignore a11y-no-static-element-interactions -->
               <!-- svelte-ignore a11y-click-events-have-key-events -->
               <h5 class="title is-6">
                  Input Evaluator <span
                     class="toggle-button"
                     on:click={() => (inputEvlVisible = !inputEvlVisible)}
                  >
                     {inputEvlVisible ? "(tutup)" : "(buka)"}
                  </span>
               </h5>

               {#if inputEvlVisible}
                  <hr />
                  <Field
                     id={"evaluatorKdept"}
                     name="K.Departemen"
                     bind:value={ka_departemen}
                     bind:selected={kdeptSelected}
                     select
                     view
                     userId={kdeptSelected}
                  />

                  <br />
                  <Field
                     id={"evaluatorReviewer"}
                     name="Reviewer"
                     bind:value={reviewer}
                     bind:selected={reviewerSelected}
                     select
                     view
                     userId={reviewerSelected}
                  />
                  <br />
                  <Field
                     id={"evaluatorKlppm"}
                     name="K.LPPM"
                     bind:value={ka_lppm}
                     bind:selected={klppmSelected}
                     select
                     view
                     userId={klppmSelected}
                  />
                  <br />
                  <Field
                     id={"evaluatorKpk"}
                     name="K.Pusat Kajian"
                     bind:value={ka_pusat_kajian}
                     bind:selected={kpkSelected}
                     select
                     view
                     userId={kpkSelected}
                  />

                  <div class="field is-grouped is-grouped-right">
                     <p class="control">
                        {#if isFormFilled}
                           <button
                              class="button is-info"
                              class:is-loading={isLoading}
                              on:click={handleSubmitEvaluator}
                              >Submit Evaluator</button
                           >
                        {:else}
                           <button class="button is-info" disabled>
                              Submit Evaluator
                           </button>
                        {/if}
                     </p>
                  </div>
               {/if}
            </div>
         {/if}

         <!-- {#if ((jenisSkema === "Riset Eksternal" || jenisSkema === "Pengabdian Masyarakat Hibah Eksternal") && status >= 8) || ((jenisSkema === "Riset Mandiri" || jenisSkema === "Pengabdian Masyarakat Mandiri") && status >= 8) || ((jenisSkema === "Riset Kelompok Keahlian" || jenisSkema === "Riset Terapan" || jenisSkema === "Riset Kerjasama" || jenisSkema === "Pengabdian Masyarakat Desa Binaan" || jenisSkema === "Pengabdian Masyarakat UMKM Binaan") && status >= 10)} -->
         {#if (skemaInternal.includes(jenisSkema) && status >= 8) || (skemaEksternal.includes(jenisSkema) && status >= 8) || (skemaMandiri.includes(jenisSkema) && status >= 8)}
            <!-- ============================================================ -->
            <!-- Download SK Pendanaan, Surat Kontrak PPM, Surat Tugas        -->
            <!-- ============================================================ -->
            {#if skemaInternal.includes(jenisSkema)}
               <div class="box">
                  <!-- svelte-ignore a11y-no-static-element-interactions -->
                  <!-- svelte-ignore a11y-click-events-have-key-events -->
                  <h5 class="title is-6">
                     <!-- File SK Pendanaan / Surat Kontrak PPM / Surat Tugas -->
                     Dokumen Pendukung
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
                                 >Upload File (.pdf)</th
                              >
                              <th class="is-narrow" style="text-align: center"
                                 >Download File</th
                              >
                           </tr>
                        </thead>
                        <tbody>
                           <tr>
                              <td>SK Pendanaan</td>
                              <td>
                                 <span class="inputf__wrapper">
                                    <input
                                       id="fileSkPendanaan"
                                       class="inputf custom-file-input"
                                       accept="application/pdf"
                                       type="file"
                                       on:change={fileSkPendanaanChange}
                                    />
                                    <div class="file has-name is-small">
                                       <label
                                          class="file-label"
                                          for="fileSkPendanaan"
                                       >
                                          <input
                                             class="file-input"
                                             type="file"
                                             name="resume"
                                          />
                                          <span class="file-cta">
                                             <span class="file-icon">
                                                <Icon
                                                   id="download"
                                                   src={downloadIcon}
                                                />
                                             </span>
                                             <span class="file-label">
                                                Choose a file</span
                                             >
                                          </span>
                                          {#if $skPendanaanFile?.name}
                                             <span class="file-name">
                                                {$skPendanaanFile.name}</span
                                             >
                                          {:else}
                                             <span class="file-name"
                                                >No file chosen</span
                                             >
                                          {/if}
                                       </label>
                                    </div>
                                 </span></td
                              >
                              <td style="text-align: center"
                                 ><button
                                    class="button is-link button is-small"
                                    on:click={handleDownloadSkPendanaan}
                                    >Download</button
                                 ></td
                              >
                           </tr>
                           <!-- ====================================================== -->
                           <tr>
                              <td>Surat Kontrak PPM</td>
                              <td>
                                 <span class="inputf__wrapper">
                                    <input
                                       id="fileSuratKontrak"
                                       class="inputf custom-file-input"
                                       accept="application/pdf"
                                       type="file"
                                       on:change={fileSuratKontrakChange}
                                    />
                                    <div class="file has-name is-small">
                                       <label
                                          class="file-label"
                                          for="fileSuratKontrak"
                                       >
                                          <input
                                             class="file-input"
                                             type="file"
                                             name="resume"
                                          />
                                          <span class="file-cta">
                                             <span class="file-icon">
                                                <Icon
                                                   id="download"
                                                   src={downloadIcon}
                                                />
                                             </span>
                                             <span class="file-label">
                                                Choose a file</span
                                             >
                                          </span>
                                          {#if $suratKontrakFile?.name}
                                             <span class="file-name">
                                                {$suratKontrakFile.name}</span
                                             >
                                          {:else}
                                             <span class="file-name"
                                                >No file chosen</span
                                             >
                                          {/if}
                                       </label>
                                    </div>
                                 </span>
                              </td>
                              <td style="text-align: center"
                                 ><button
                                    class="button is-link button is-small"
                                    on:click={handleDownloadSuratKontrak}
                                    >Download</button
                                 ></td
                              >
                           </tr>
                           <!-- ====================================================== -->
                           <tr>
                              <td>Surat Tugas</td>
                              <td>
                                 <span class="inputf__wrapper">
                                    <input
                                       id="fileSuratTugas"
                                       class="inputf custom-file-input"
                                       accept="application/pdf"
                                       type="file"
                                       on:change={fileSuratTugasChange}
                                    />
                                    <div class="file has-name is-small">
                                       <label
                                          class="file-label"
                                          for="fileSuratTugas"
                                       >
                                          <input
                                             class="file-input"
                                             type="file"
                                             name="resume"
                                          />
                                          <span class="file-cta">
                                             <span class="file-icon">
                                                <Icon
                                                   id="download"
                                                   src={downloadIcon}
                                                />
                                             </span>
                                             <span class="file-label">
                                                Choose a file</span
                                             >
                                          </span>
                                          {#if $suratTugasFile?.name}
                                             <span class="file-name">
                                                {$suratTugasFile.name}</span
                                             >
                                          {:else}
                                             <span class="file-name"
                                                >No file chosen</span
                                             >
                                          {/if}
                                       </label>
                                    </div>
                                 </span>
                              </td>
                              <td style="text-align: center"
                                 ><button
                                    class="button is-link button is-small"
                                    on:click={handleDownloadSuratTugas}
                                    >Download</button
                                 ></td
                              >
                           </tr>
                        </tbody>
                     </table>

                     <div class="field is-grouped is-grouped-right">
                        <p class="control">
                           <button
                              class="button is-info"
                              class:is-loading={isLoading}
                              on:click={handleSubmitFile}>Submit File</button
                           >
                        </p>
                     </div>
                  {/if}
               </div>
            {:else}
               <div class="box">
                  <!-- svelte-ignore a11y-no-static-element-interactions -->
                  <!-- svelte-ignore a11y-click-events-have-key-events -->
                  <h5 class="title is-6">
                     Dokumen Pendukung
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
                                 >Upload File</th
                              >
                              <th class="is-narrow" style="text-align: center"
                                 >Download File</th
                              >
                           </tr>
                        </thead>
                        <tbody>
                           <tr>
                              <td>Surat Tugas</td>
                              <td>
                                 <span class="inputf__wrapper">
                                    <input
                                       id="fileSuratTugas"
                                       class="inputf custom-file-input"
                                       accept="application/pdf"
                                       type="file"
                                       on:change={fileSuratTugasChange}
                                    />
                                    <div class="file has-name is-small">
                                       <label
                                          class="file-label"
                                          for="fileSuratTugas"
                                       >
                                          <input
                                             class="file-input"
                                             type="file"
                                             name="resume"
                                          />
                                          <span class="file-cta">
                                             <span class="file-icon">
                                                <Icon
                                                   id="download"
                                                   src={downloadIcon}
                                                />
                                             </span>
                                             <span class="file-label">
                                                Choose a file</span
                                             >
                                          </span>
                                          {#if $suratTugasFile?.name}
                                             <span class="file-name">
                                                {$suratTugasFile.name}</span
                                             >
                                          {:else}
                                             <span class="file-name"
                                                >No file chosen</span
                                             >
                                          {/if}
                                       </label>
                                    </div>
                                 </span>
                              </td>
                              <td style="text-align: center"
                                 ><button
                                    class="button is-link button is-small"
                                    on:click={handleDownloadSuratTugas}
                                    >Download</button
                                 ></td
                              >
                           </tr>
                        </tbody>
                     </table>

                     <div class="field is-grouped is-grouped-right">
                        <p class="control">
                           <button
                              class="button is-info"
                              class:is-loading={isLoading}
                              on:click={handleSubmitFile}>Submit File</button
                           >
                        </p>
                     </div>
                  {/if}
               </div>
            {/if}

            <!-- ========================================== -->
            <!--                  Dana PPM                  -->
            <!-- ========================================== -->
            {#if skemaInternal.includes(jenisSkema)}
               <div class="box">
                  <!-- svelte-ignore a11y-no-static-element-interactions -->
                  <!-- svelte-ignore a11y-click-events-have-key-events -->
                  <h5 class="title is-6">
                     Pendanaan PPM
                     <span
                        class="toggle-button"
                        on:click={() => (danaPPMVisible = !danaPPMVisible)}
                     >
                        {danaPPMVisible ? "(tutup)" : "(buka)"}
                     </span>
                  </h5>

                  {#if danaPPMVisible}
                     <hr />
                     <table
                        class="table is-fullwidth is-striped is-hoverable is-bordered"
                     >
                        <thead>
                           <tr>
                              <th style="width: 70%;">Status Pencairan Dana</th>
                              <th class="is-narrow">
                                 <div class="select">
                                    <select bind:value={statusPencairanDana}>
                                       <option value="" selected disabled hidden
                                          >Pilih status pendanaan</option
                                       >
                                       <option value="30% Dana telah dicairkan"
                                          >30% Dana telah dicairkan</option
                                       >
                                       <option value="100% Dana telah dicairkan"
                                          >100% Dana telah dicairkan</option
                                       >
                                    </select>
                                 </div>
                              </th>
                           </tr>
                        </thead>
                        <tbody>
                           <tr>
                              <td colspan="2"
                                 ><div class="notification is-warning is-light">
                                    <p class="subtitle is-6">
                                       Untuk pengambilan dana dan penjelasan
                                       lebih lanjut terkait Pendanaan, hubungi
                                       LPPM UISI.
                                    </p>
                                 </div></td
                              >
                           </tr>
                        </tbody>
                     </table>

                     <div class="field is-grouped is-grouped-right">
                        <p class="control">
                           <button
                              class="button is-info"
                              on:click={handleSubmitStatusPendanaan}
                              class:is-loading={isLoading}
                              >Submit Status Pendanaan</button
                           >
                        </p>
                     </div>
                  {/if}
               </div>
            {/if}

            <!-- ========================================== -->
            <!--               Hasil PPM                    -->
            <!-- ========================================== -->
            <div class="box">
               <!-- svelte-ignore a11y-no-static-element-interactions -->
               <!-- svelte-ignore a11y-click-events-have-key-events -->
               <h5 class="title is-6">
                  Laporan Hasil PPM
                  <span
                     class="toggle-button"
                     on:click={() => (hasilPPMVisible = !hasilPPMVisible)}
                  >
                     {hasilPPMVisible ? "(tutup)" : "(buka)"}
                  </span>
               </h5>

               {#if hasilPPMVisible}
                  <hr />
                  <table
                     class="table is-fullwidth is-striped is-hoverable is-bordered"
                  >
                     <thead>
                        <tr>
                           <th style="width: 70%;">Nama</th>
                           <th class="is-narrow" style="text-align: center"
                              >Upload File (.pdf)</th
                           >
                           <th class="is-narrow" style="text-align: center"
                              >Download File</th
                           >
                        </tr>
                     </thead>

                     <tbody>
                        <tr>
                           <td>Laporan Hasil PPM</td>
                           <td
                              ><span class="inputf__wrapper">
                                 <input
                                    id="fileHasilPPM"
                                    class="inputf custom-file-input"
                                    accept="application/pdf"
                                    type="file"
                                    on:change={fileHasilPPMChange}
                                 />
                                 <div class="file has-name is-small">
                                    <label
                                       class="file-label"
                                       for="fileHasilPPM"
                                    >
                                       <input
                                          class="file-input"
                                          type="file"
                                          name="resume"
                                       />
                                       <span class="file-cta">
                                          <span class="file-icon">
                                             <Icon
                                                id="download"
                                                src={downloadIcon}
                                             />
                                          </span>
                                          <span class="file-label">
                                             Choose a file</span
                                          >
                                       </span>
                                       {#if $hasilPPMFile?.name}
                                          <span class="file-name">
                                             {$hasilPPMFile.name}</span
                                          >
                                       {:else}
                                          <span class="file-name"
                                             >No file chosen</span
                                          >
                                       {/if}
                                    </label>
                                 </div>
                              </span></td
                           >
                           <td style="text-align: center"
                              ><button
                                 class="button is-link button is-small"
                                 on:click={handleDownloadHasilPPM}
                                 >Download</button
                              ></td
                           >
                        </tr>
                     </tbody>
                  </table>

                  <!-- {#if hasilPPMisRequired()} -->
                  <div class="field is-grouped is-grouped-right">
                     <p class="control">
                        <button
                           class="button is-info"
                           class:is-loading={isLoading}
                           on:click={handleSubmitHasilPPM}
                           >Submit Hasil PPM</button
                        >
                     </p>
                  </div>
                  <!-- {/if} -->

                  <hr />

                  <div class="notification is-warning is-light">
                     <p>Berikan catatan revisi jika ingin revisi Hasil PPM</p>
                  </div>

                  <div class="field">
                     <p class="title is-6"><b>Catatan Revisi</b></p>
                     <textarea
                        class="textarea mb-1"
                        name="catatanRevisiHasilPPM"
                        id="catatanRevisiHasilPPM"
                        bind:value={catatanRevisiHasilPPM}
                     ></textarea>
                     {#if error.catatanRevisiHasilPPM}
                        <p class="help error is-danger">
                           {error.catatanRevisiHasilPPM}
                        </p>
                     {/if}
                  </div>

                  <hr />

                  <table
                     class="table is-fullwidth is-striped is-hoverable is-bordered"
                  >
                     <thead>
                        <tr>
                           <th style="width: 70%;">Riwayat Catatan Revisi</th>
                           <th style="width: 15%; text-align: center"
                              >Evaluator</th
                           >
                           <th style="width: 15%; text-align: center"
                              >Tanggal</th
                           >
                        </tr>
                     </thead>

                     {#if itemsCHP}
                        <tbody>
                           {#each itemsCHP as item}
                              <tr>
                                 <td>{item.catatan_revisi_hasil_ppm}</td>
                                 <td style="text-align: center"
                                    >{item.evaluator}</td
                                 >
                                 <td style="text-align: center">{item.time}</td>
                              </tr>
                           {/each}
                        </tbody>
                     {/if}
                  </table>
               {/if}
            </div>

            <!-- ========================================== -->
            <!--             Presentasi Hasil PPM           -->
            <!-- ========================================== -->
            {#if !skemaEksternal.includes(jenisSkema)}
               <div class="box">
                  <!-- svelte-ignore a11y-no-static-element-interactions -->
                  <!-- svelte-ignore a11y-click-events-have-key-events -->
                  <h5 class="title is-6">
                     Presentasi Hasil PPM
                     <span
                        class="toggle-button"
                        on:click={() =>
                           (presentasiVisible = !presentasiVisible)}
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
                              <th style="width: 70%;">Kegiatan</th>
                              <th class="is-narrow" style="text-align: center"
                                 >Checkbox</th
                              >
                           </tr>
                        </thead>
                        <tbody>
                           <tr>
                              <td
                                 >Mempresentasikan hasil PPM di seminar
                                 Penelitian / Pengmas bersama UISI di bulan
                                 Desember</td
                              >
                              <td style="text-align: center">
                                 <input
                                    type="checkbox"
                                    bind:checked={presentasiHasilPPM}
                                    on:change={checkboxPresentasiHasilPPM}
                                 />
                              </td>
                           </tr>
                        </tbody>
                     </table>
                  {/if}
               </div>
            {/if}

            <!-- ========================================== -->
            <!--                 File SK PPM                -->
            <!-- ========================================== -->
            <div class="box">
               <!-- svelte-ignore a11y-no-static-element-interactions -->
               <!-- svelte-ignore a11y-click-events-have-key-events -->
               <h5 class="title is-6">
                  File SK PPM
                  <span
                     class="toggle-button"
                     on:click={() => (skPPMVisible = !skPPMVisible)}
                  >
                     {skPPMVisible ? "(tutup)" : "(buka)"}
                  </span>
               </h5>

               {#if skPPMVisible}
                  <hr />

                  <table
                     class="table is-fullwidth is-striped is-hoverable is-bordered"
                  >
                     <thead>
                        <tr>
                           <th style="width: 70%;">Nama</th>
                           <th class="is-narrow" style="text-align: center"
                              >Upload File</th
                           >
                           <th class="is-narrow" style="text-align: center"
                              >Download File</th
                           >
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <td>SK PPM</td>
                           <td
                              ><span class="inputf__wrapper">
                                 <input
                                    id="fileSkPPM"
                                    class="inputf custom-file-input"
                                    accept="application/pdf"
                                    type="file"
                                    on:change={fileSkPPMChange}
                                 />
                                 <div class="file has-name is-small">
                                    <label class="file-label" for="fileSkPPM">
                                       <input
                                          class="file-input"
                                          type="file"
                                          name="resume"
                                       />
                                       <span class="file-cta">
                                          <span class="file-icon">
                                             <Icon
                                                id="download"
                                                src={downloadIcon}
                                             />
                                          </span>
                                          <span class="file-label">
                                             Choose a file</span
                                          >
                                       </span>
                                       {#if $skPPMFile?.name}
                                          <span class="file-name">
                                             {$skPPMFile.name}</span
                                          >
                                       {:else}
                                          <span class="file-name"
                                             >No file chosen</span
                                          >
                                       {/if}
                                    </label>
                                 </div>
                              </span></td
                           >
                           <td style="text-align: center"
                              ><button
                                 class="button is-link button is-small"
                                 on:click={handleDownloadSkPPM}>Download</button
                              ></td
                           >
                        </tr>
                     </tbody>
                  </table>

                  <div class="field is-grouped is-grouped-right">
                     <p class="control">
                        <button
                           class="button is-info"
                           class:is-loading={isLoading}
                           on:click={handleSubmitFile}>Submit File</button
                        >
                     </p>
                  </div>
               {/if}
            </div>
         {/if}

         <!-- ========================================== -->
         <!--              Action Button                 -->
         <!-- ========================================== -->
         <div class="field is-grouped is-grouped-right">
            {#if ShowRPButton()}
               <p class="control">
                  <button
                     class="button is-info is-light is-outlined"
                     on:click={handleRevisi}
                     class:is-loading={isLoading}>Revisi</button
                  >
               </p>
               <p class="control">
                  <button
                     class="button is-info"
                     on:click={handlePass}
                     class:is-loading={isLoading}>Setujui</button
                  >
               </p>
            {/if}

            {#if status === 4}
               <p class="control">
                  <button
                     class="button is-info"
                     on:click={handlePass}
                     class:is-loading={isLoading}>Setujui</button
                  >
               </p>
            {/if}

            {#if ShowRDPButton()}
               <p class="control">
                  <button
                     class="button is-info is-light is-outlined"
                     on:click={handleRevisi}
                     class:is-loading={isLoading}>Revisi</button
                  >
               </p>
               <p class="control">
                  <button
                     class="button is-danger is-light is-outlined"
                     on:click={handleDitolak}
                     class:is-loading={isLoading}>Ditolak</button
                  >
               </p>
               <p class="control">
                  <button
                     class="button is-info"
                     on:click={handlePass}
                     class:is-loading={isLoading}>Setujui</button
                  >
               </p>
            {/if}

            {#if ShowButtonPerbaikan()}
               <p class="control">
                  <button
                     class="button is-info"
                     on:click={handlePerbaikan}
                     class:is-loading={isLoading}>Perbaikan</button
                  >
               </p>
            {/if}
         </div>
      {/if}

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

<Modalerror bind:show={ModalFileNotFound}>
   <p>
      Gagal mengunduh file. Pastikan file telah di upload atau coba unduh
      beberapa saat lagi.
   </p>
</Modalerror>

<Modalerror bind:show={showModalErrorRevisi}>
   <p>Anda belum memasukkan catatan revisi</p>
</Modalerror>

<Modalerror bind:show={showModalErrorPassReviewer}>
   <p>Anda belum mengupload file penilaian proposal</p>
</Modalerror>

<Modalerror bind:show={showModalErrorHasilPPM}>
   <p>Anda belum mengupload file Laporan Hasil PPM</p>
</Modalerror>

<Modalerror bind:show={showModalErrorInputEvaluator}>
   <p>Lengkapi form input evaluator</p>
</Modalerror>

<Modalchecked bind:show={showModalChecked}>
   <p>Berhasil menyimpan data</p>
</Modalchecked>

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
      margin: -6px 0px 0px 0px;
   }

   .toggle-button {
      cursor: pointer;
      color: #fc6c78;
      font-size: small;
   }
</style>
