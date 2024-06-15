<script>
   import { onMount, afterUpdate, beforeUpdate } from "svelte";
   import { route, apiURL, ppmFile, rabFile } from "../../store";
   import Icon from "../../libs/Icon.svelte";
   import {
      deleteIcon,
      penelitian,
      accountEdit,
      add,
      downloadIcon,
   } from "../../store/icons";
   import Article from "../../libs/Article.svelte";
   import Field from "../../libs/Field.svelte";
   import Select from "../../libs/Select.svelte";
   import Modal from "../../libs/Modal.svelte";
   import Modalerror from "../../libs/Modalerror.svelte";

   const id = Number(localStorage.getItem("id"));
   const localStorage_id = localStorage.getItem("id");
   const localStorage_namaLengkap = localStorage.getItem("nama_lengkap");
   let error = {};
   let showModalErrorProposal = false;
   let showModalErrorBiodata = false;
   let warningFormText = false;
   let value;
   let label;
   let myAbstract;
   let vmataKuliah;
   let items = [];
   let fileRab;
   let filePpm;

   let jenisKegiatan = "";
   let jenisProposal = "";
   let jenisSkema = "";
   let kelompokKeahlian = "";
   let judul = "";
   let tanggalMulai = "";
   let tanggalSelesai = "";
   let topik = "";
   let biayaPenelitian = "";
   let anggotaTim = [
      {
         value: localStorage_id,
         label: localStorage_namaLengkap,
         role: "Ketua",
      },
   ];
   let randomRabFileName = "";
   let randomPpmFileName = "";

   let mataKuliah = [];
   let profilesAnggota = [];
   let RPS1Anggota = [];

   let dataRPS1, dataRPS2, dataRPS3;
   let nama_pertiS1, bidang_ilmuS1, tahunMasukS1, tahunLulusS1, judulSkripsi;
   let nama_pertiS2, bidang_ilmuS2, tahunMasukS2, tahunLulusS2, judulTesis;
   let nama_pertiS3, bidang_ilmuS3, tahunMasukS3, tahunLulusS3, judulDisertasi;

   let data, dataPP, dataPM, dataPD, dataPPub, dataPPB, dataPHKI;

   let biayaPP,
      tahunPenelitian,
      judulPenelitian,
      rolePenelitian,
      sumberDanaPenelitian;

   let biayaPengmas, tahunPengmas, judulPengmas, rolePengmas, sumberDanaPengmas;

   let tahunDiseminasi,
      judulDiseminasi,
      namaPemakalahDiseminasi,
      namaPertemuanDiseminasi;

   let tahunPublikasi, judulPublikasi, namaPenulis, namaJurnal, impactFactor;

   let tahunBuku, JudulBuku, namaPenulisBuku, PenerbitBuku, Isbn;

   let tahunHKI, JudulHKI, namaPenulisHKI, jenisHKI, noHKI;

   let showModalRiwayatPendidikanS1 = false;
   let showModalRiwayatPendidikanS2 = false;
   let showModalRiwayatPendidikanS3 = false;

   let showModalPenelitian = false;
   let showModalPengmas = false;
   let showModalDiseminasi = false;
   let showModalPublikasi = false;
   let showModalPenulisanBuku = false;
   let showModalHKI = false;
   let showModalErrorForm = false;
   let isLoading = false;

   const accessToken = localStorage.getItem("token");

   const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
   };

   async function modalInputRiwayatPendidikanS1() {
      showModalRiwayatPendidikanS1 = true;
   }

   async function modalInputRiwayatPendidikanS2() {
      showModalRiwayatPendidikanS2 = true;
   }

   async function modalInputRiwayatPendidikanS3() {
      showModalRiwayatPendidikanS3 = true;
   }

   async function clickModalPenelitian() {
      showModalPenelitian = true;
   }

   async function clickModalPengmas() {
      showModalPengmas = true;
   }

   async function clickModalDiseminasi() {
      showModalDiseminasi = true;
   }

   async function clickModalPublikasi() {
      showModalPublikasi = true;
   }

   async function clickModalPenulisanBuku() {
      showModalPenulisanBuku = true;
   }

   async function clickModalHKI() {
      showModalHKI = true;
   }

   onMount(async () => {
      isLoading = false;
      // --------------------------------------------------
      // Get Users for Form Select Anggota Tim
      // --------------------------------------------------
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

      //------------------------------------------------------------
      // Generate RAB Random Character
      //------------------------------------------------------------
      const characters =
         "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let resultRabChar = "";

      for (let i = 0; i < 30; i++) {
         const randomIndex = Math.floor(Math.random() * characters.length);
         resultRabChar += characters.charAt(randomIndex);
      }

      randomRabFileName = resultRabChar;

      //------------------------------------------------------------
      // Generate PPM Random Character
      //------------------------------------------------------------
      let resultPpmChar = "";

      for (let i = 0; i < 30; i++) {
         const randomIndex = Math.floor(Math.random() * characters.length);
         resultPpmChar += characters.charAt(randomIndex);
      }

      randomPpmFileName = resultPpmChar;

      getRiwayatPendidikanS1();
      getRiwayatPendidikanS2();
      getRiwayatPendidikanS3();
      getPengalamanPenelitian();
      getPengalamanPengmas();
      getPengalamanDiseminasi();
      getPengalamanPublikasi();
      getPengalamanPenulisanBuku();
      getPengalamanHKI();
   });

   // -----------------------------------------------
   // Get Riwayat Pendidikan S1
   // -----------------------------------------------
   async function getRiwayatPendidikanS1() {
      const responseRPS1 = await fetch($apiURL + "/riwayatPendidikanS1/" + id, {
         method: "GET",
         headers: headers,
      });

      const resultRPS1 = await responseRPS1.json();

      if (responseRPS1.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (responseRPS1.ok) {
            dataRPS1 = resultRPS1.dbData;
         } else {
            console.log(responseRPS1);
         }
      }
   }

   // -----------------------------------------------
   // Get Riwayat Pendidikan S2
   // -----------------------------------------------
   async function getRiwayatPendidikanS2() {
      const responseRPS2 = await fetch($apiURL + "/riwayatPendidikanS2/" + id, {
         method: "GET",
         headers: headers,
      });

      const resultRPS2 = await responseRPS2.json();

      if (responseRPS2.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (responseRPS2.ok) {
            dataRPS2 = resultRPS2.dbData;
         } else {
            console.log(responseRPS2);
         }
      }
   }

   // -----------------------------------------------
   // Get Riwayat Pendidikan S3
   // -----------------------------------------------
   async function getRiwayatPendidikanS3() {
      const responseRPS3 = await fetch($apiURL + "/riwayatPendidikanS3/" + id, {
         method: "GET",
         headers: headers,
      });

      const resultRPS3 = await responseRPS3.json();

      if (responseRPS3.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (responseRPS3.ok) {
            dataRPS3 = resultRPS3.dbData;
         } else {
            console.log(responseRPS3);
         }
      }
   }

   // -----------------------------------------------
   // Get Pengalaman Penelitian
   // -----------------------------------------------
   async function getPengalamanPenelitian() {
      const responsePP = await fetch($apiURL + "/pengalamanPenelitian/" + id, {
         method: "GET",
         headers: headers,
      });

      const resultPP = await responsePP.json();

      if (responsePP.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (responsePP.ok) {
            dataPP = resultPP.dbData;
         } else {
            console.log(responsePP);
         }
      }
   }

   // -----------------------------------------------
   // Get Pengalaman Pengmas
   // -----------------------------------------------
   async function getPengalamanPengmas() {
      const responsePM = await fetch($apiURL + "/pengalamanPengmas/" + id, {
         method: "GET",
         headers: headers,
      });

      const resultPM = await responsePM.json();

      if (responsePM.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (responsePM.ok) {
            dataPM = resultPM.dbData;
         } else {
            console.log(responsePM);
         }
      }
   }

   // -----------------------------------------------
   // Get Pengalaman Diseminasi
   // -----------------------------------------------
   async function getPengalamanDiseminasi() {
      const responsePD = await fetch($apiURL + "/pengalamanDiseminasi/" + id, {
         method: "GET",
         headers: headers,
      });

      const resultPD = await responsePD.json();

      if (responsePD.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (responsePD.ok) {
            dataPD = resultPD.dbData;
         } else {
            console.log(responsePD);
         }
      }
   }

   // -----------------------------------------------
   // Get Pengalaman Publikasi
   // -----------------------------------------------
   async function getPengalamanPublikasi() {
      const responsePPub = await fetch($apiURL + "/pengalamanPublikasi/" + id, {
         method: "GET",
         headers: headers,
      });

      const resultPPub = await responsePPub.json();

      if (responsePPub.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (responsePPub.ok) {
            dataPPub = resultPPub.dbData;
         } else {
            console.log(responsePPub);
         }
      }
   }

   // -----------------------------------------------
   // Get Pengalaman Penulisan Buku
   // -----------------------------------------------
   async function getPengalamanPenulisanBuku() {
      const responsePPB = await fetch(
         $apiURL + "/pengalamanPenulisanBuku/" + id,
         {
            method: "GET",
            headers: headers,
         }
      );

      const resultPPB = await responsePPB.json();

      if (responsePPB.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (responsePPB.ok) {
            dataPPB = resultPPB.dbData;
         } else {
            console.log(responsePPB);
         }
      }
   }

   // -----------------------------------------------
   // Get Pengalaman Hak Kekayaan Intelektual
   // -----------------------------------------------
   async function getPengalamanHKI() {
      const responsePHKI = await fetch($apiURL + "/pengalamanHKI/" + id, {
         method: "GET",
         headers: headers,
      });

      const resultPHKI = await responsePHKI.json();

      if (responsePHKI.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (responsePHKI.ok) {
            dataPHKI = resultPHKI.dbData;
         } else {
            console.log(responsePHKI);
         }
      }
   }

   //------------------------------------------------------------
   // Add Mata Kuliah
   //------------------------------------------------------------
   function addMatkul() {
      let addVmatkul = {
         label: vmataKuliah,
      };
      mataKuliah = [...mataKuliah, addVmatkul];
      vmataKuliah = "";
   }

   //------------------------------------------------------------
   // Delete Mata Kuliah
   //------------------------------------------------------------
   function deleteMatkul(e) {
      let delMatkul = e.target.getAttribute("data-value");
      mataKuliah = mataKuliah.filter((matkul) => {
         return matkul.label !== delMatkul;
      });
   }

   //------------------------------------------------------------
   // Format Rupiah
   //------------------------------------------------------------
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

   //----------------------------//
   // Button Simpan Proposal
   //----------------------------//
   async function simpanProposal() {
      error = {};
      isLoading = true;
      const readerPpm = new FileReader();
      const readerRab = new FileReader();

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
         judul,
         myAbstract,
         status: 0,
         randomRabFileName,
         randomPpmFileName,
      };

      // ------------------------------//
      // Upload File Proposal
      // ------------------------------//
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
         } catch (error) {
            console.error("Error uploading file:", error);
            // Buat Handle Error
            // ...
         }
      };

      readerPpm.readAsDataURL(filePpm);
      // -------------------------------//
      // Upload File RAB
      // -------------------------------//
      if (
         jenisSkema === "Riset Kelompok Keahlian" ||
         jenisSkema === "Riset Terapan" ||
         jenisSkema === "Riset Kerjasama" ||
         jenisSkema === "Pengabdian Masyarakat Desa Binaan" ||
         jenisSkema === "Pengabdian Masyarakat UMKM Binaan"
      ) {
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
            } catch (error) {
               console.error("Error uploading file:", error);
               // Buat Handle Error
               // ...
            }
         };
         readerRab.readAsDataURL(fileRab);
      }

      // --------------------------------------//
      //  Post Proposal
      // --------------------------------------//
      const responseProposal = await fetch($apiURL + "/ppm", {
         method: "POST",
         headers: headers,
         body: JSON.stringify(payloadProposal),
      });

      const resultProposal = await responseProposal.json();

      if (responseProposal.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (responseProposal.ok) {
            $route("/dosen/ppmmanagement");
         } else {
            console.log(responseProposal.msg, error);
            // Buat Handle Error
            // ...
         }
      }
      isLoading = false;
   }

   //------------------------------
   // Button Submit Proposal
   //------------------------------
   async function submitProposal() {
      error = {};
      isLoading = true;
      const readerRab = new FileReader();
      const readerPpm = new FileReader();

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
         judul,
         myAbstract,
         status: 2,
         randomRabFileName,
         randomPpmFileName,
      };

      // ------------------------------//
      // Upload File Proposal
      // ------------------------------//
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
         } catch (error) {
            console.error("Error uploading file:", error);
            // Buat Handle Error
            // ...
         }
      };

      readerPpm.readAsDataURL(filePpm);
      // --------------------------------------//
      // Upload File RAB
      // --------------------------------------//
      if (
         jenisSkema === "Riset Kelompok Keahlian" ||
         jenisSkema === "Riset Terapan" ||
         jenisSkema === "Riset Kerjasama" ||
         jenisSkema === "Pengabdian Masyarakat Desa Binaan" ||
         jenisSkema === "Pengabdian Masyarakat UMKM Binaan"
      ) {
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
            } catch (error) {
               console.error("Error uploading file:", error);
               // Buat Handle Error
               // ...
            }
         };
         readerRab.readAsDataURL(fileRab);
      }

      // --------------------------------------------------//
      // Post Proposal                                     //
      // --------------------------------------------------//
      const responseProposal = await fetch($apiURL + "/ppm", {
         method: "POST",
         headers: headers,
         body: JSON.stringify(payloadProposal),
      });

      const resultProposal = await responseProposal.json();

      if (responseProposal.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (responseProposal.ok) {
            $route("/dosen/ppmmanagement");
         } else {
            console.log(responseProposal.msg, error);
            // Buat Handle Error
            // ...
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

   function isObjectEmpty(objectName) {
      return (
         objectName &&
         Object.keys(objectName).length === 0 &&
         objectName.constructor === Object
      );
   }

   //------------------------------------------------------------
   // Get Profile Anggota Tim
   //------------------------------------------------------------
   async function getProfileAnggota() {
      let ids = anggotaTim.map((anggota) => anggota.value);

      for (idAnggota of ids) {
         const response = await fetch($apiURL + "/user/" + idAnggota, {
            method: "GET",
            headers: headers,
         });

         const result = await response.json();
         profilesAnggota.push(result);
      }
      console.log(profilesAnggota);
      return profilesAnggota;
   }

   //------------------------------------------------------------
   // Get Riwayat Pendidikan S1 Anggota Tim
   //------------------------------------------------------------
   async function getRPS1Anggota() {
      let ids = anggotaTim.map((anggota) => anggota.value);
      let allData = [];

      for (idAnggota of ids) {
         const response = await fetch(
            $apiURL + "/riwayatPendidikanS1/" + idAnggota,
            {
               method: "GET",
               headers: headers,
            }
         );
         const result = await response.json();
         console.log(result);
         if (result.dbData && Array.isArray(result.dbData)) {
            allData.push(result.dbData);
         }
      }
      RPS1Anggota = allData;
      console.log(RPS1Anggota);
      return RPS1Anggota;
   }

   //------------------------------------------------------------
   //------------------------------------------------------------
   async function getBiodataAnggota() {
      let ids = anggotaTim.map((anggota) => anggota.value);
      let promises = ids.map(async (idAnggota) => {
         // ==============
         // get profile
         // ==============
         const profileResponse = await fetch($apiURL + "/user/" + idAnggota, {
            method: "GET",
            headers: headers,
         });
         const profileResult = await profileResponse.json();

         // ==============
         // get RPS1
         // ==============
         const RPS1Response = await fetch(
            $apiURL + "/riwayatPendidikanS1/" + idAnggota,
            {
               method: "GET",
               headers: headers,
            }
         );
         const RPS1Result = await RPS1Response.json();

         return {
            profile: profileResult,
            RPS1: RPS1Result.dbData,
         };
      });

      userData = await Promise.all(promises);
      console.log(userData);
   }

   let userData = [];
   let tab1 = true;
   let tab2 = false;

   async function clicktab1() {
      if (!tab1) {
         tab1 = true;
         tab2 = false;
      }
   }

   async function clicktab2() {
      if (!tab2) {
         showModalErrorProposal = false;
         // profilesAnggota = [];
         // RPS1Anggota = [];
         // await getProfileAnggota();
         // await getRPS1Anggota();
         await getBiodataAnggota();
         tab1 = false;
         tab2 = true;
      }
   }

   // $: dataLoaded, console.log("dataLoaded = " + dataLoaded);
   // $: anggotaTim, console.log(anggotaTim);
   // $: tab2, console.log("Tab2 (Biodata Peneliti) = " + tab2);

   // async function clicktab2() {
   //    getProfileAnggota();

   //    error = {};

   //    let payloadProposal = {
   //       id,
   //       jenisProposal,
   //       jenisKegiatan,
   //       jenisSkema,
   //       kelompokKeahlian,
   //       topik,
   //       tanggalMulai,
   //       tanggalSelesai,
   //       biayaPenelitian,
   //       anggotaTim,
   //       judul,
   //       myAbstract,
   //       randomRabFileName,
   //       randomPpmFileName,
   //    };

   // for (const [key, value] of Object.entries(payloadProposal)) {
   //    if (
   //       !value ||
   //       (key === "anggotaTim" && Array.isArray(value) && value.length <= 1)
   //    ) {
   //       error[key] = `This field is required`;
   //    }
   // }

   //    if (isObjectEmpty($ppmFile)) {
   //       error["fileProposal"] = `*`;
   //    }

   //    if (
   //       jenisSkema === "Riset Kelompok Keahlian" ||
   //       jenisSkema === "Riset Terapan" ||
   //       jenisSkema === "Riset Kerjasama" ||
   //       jenisSkema === "Pengabdian Masyarakat Desa Binaan" ||
   //       jenisSkema === "Pengabdian Masyarakat UMKM Binaan"
   //    ) {
   //       if (isObjectEmpty($rabFile)) {
   //          error["fileRAB"] = `*`;
   //       }
   //    }

   //    if (Object.keys(error).length > 0) {
   //       showModalErrorProposal = true;
   //    } else {
   //    tab1 = false;
   //    tab2 = true;
   //    }
   // }

   // ------------------------------------------------------------
   // Button Simpan Riwayat Pendidikan S1
   // ------------------------------------------------------------
   async function simpanRP_S1() {
      error = {};

      let payload = {
         nama_pertiS1,
         bidang_ilmuS1,
         tahunMasukS1,
         tahunLulusS1,
         judulSkripsi,
         id,
      };

      for (const [key, value] of Object.entries(payload)) {
         if (!payload[key]) {
            error[key] = `This field is required`;
         }
      }

      if (Object.keys(error).length > 0) {
         showModalErrorForm = true;
      } else {
         const response = await fetch($apiURL + "/riwayatPendidikanS1", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload),
         });

         const result = await response.json();

         if (response.status === 401) {
            location.pathname = "/tokenexpired";
         } else {
            if (response.ok) {
               showModalRiwayatPendidikanS1 = false;
               nama_pertiS1 = "";
               bidang_ilmuS1 = "";
               tahunMasukS1 = "";
               tahunLulusS1 = "";
               judulSkripsi = "";
               getRiwayatPendidikanS1();
            } else {
               console.log(response);
            }
         }
      }
   }

   // ------------------------------------------------------------
   // Button Simpan Riwayat Pendidikan S2
   // ------------------------------------------------------------
   async function simpanRP_S2() {
      error = {};

      let payload = {
         nama_pertiS2,
         bidang_ilmuS2,
         tahunMasukS2,
         tahunLulusS2,
         judulTesis,
         id,
      };

      for (const [key, value] of Object.entries(payload)) {
         if (!payload[key]) {
            error[key] = `This field is required`;
         }
      }

      if (Object.keys(error).length > 0) {
         showModalErrorForm = true;
      } else {
         const response = await fetch($apiURL + "/riwayatPendidikanS2", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload),
         });

         const result = await response.json();

         if (response.status === 401) {
            location.pathname = "/tokenexpired";
         } else {
            if (response.ok) {
               showModalRiwayatPendidikanS2 = false;
               nama_pertiS2 = "";
               bidang_ilmuS2 = "";
               tahunMasukS2 = "";
               tahunLulusS2 = "";
               judulTesis = "";
               getRiwayatPendidikanS2();
            } else {
               console.log(response);
            }
         }
      }
   }

   // ------------------------------------------------------------
   // Button Simpan Riwayat Pendidikan S3
   // ------------------------------------------------------------
   async function simpanRP_S3() {
      error = {};

      let payload = {
         nama_pertiS3,
         bidang_ilmuS3,
         tahunMasukS3,
         tahunLulusS3,
         judulDisertasi,
         id,
      };

      for (const [key, value] of Object.entries(payload)) {
         if (!payload[key]) {
            error[key] = `This field is required`;
         }
      }

      if (Object.keys(error).length > 0) {
         showModalErrorForm = true;
      } else {
         const response = await fetch($apiURL + "/riwayatPendidikanS3", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload),
         });

         const result = await response.json();

         if (response.status === 401) {
            location.pathname = "/tokenexpired";
         } else {
            if (response.ok) {
               showModalRiwayatPendidikanS3 = false;
               nama_pertiS3 = "";
               bidang_ilmuS3 = "";
               tahunMasukS3 = "";
               tahunLulusS3 = "";
               judulDisertasi = "";
               getRiwayatPendidikanS3();
            } else {
               console.log(response);
            }
         }
      }
   }

   // -----------------------------------------------
   // Button Simpan Pengalaman Penelitian
   // -----------------------------------------------
   async function simpanPP() {
      error = {};

      let payload = {
         tahunPenelitian,
         judulPenelitian,
         rolePenelitian,
         sumberDanaPenelitian,
         biayaPP,
         id,
      };

      for (const [key, value] of Object.entries(payload)) {
         if (!payload[key]) {
            error[key] = `This field is required`;
         }
      }

      if (Object.keys(error).length > 0) {
         showModalErrorForm = true;
      } else {
         const response = await fetch($apiURL + "/pengalamanPenelitian", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload),
         });

         const result = await response.json();

         if (response.status === 401) {
            location.pathname = "/tokenexpired";
         } else {
            if (response.ok) {
               showModalPenelitian = false;
               tahunPenelitian = "";
               judulPenelitian = "";
               rolePenelitian = "";
               sumberDanaPenelitian = "";
               biayaPP = "";
               getPengalamanPenelitian();
            } else {
               console.log(response);
            }
         }
      }
   }

   // -----------------------------------------------
   // Button Simpan Pengalaman Pengmas
   // -----------------------------------------------
   async function simpanPM() {
      error = {};

      let payload = {
         tahunPengmas,
         judulPengmas,
         rolePengmas,
         sumberDanaPengmas,
         biayaPengmas,
         id,
      };

      for (const [key, value] of Object.entries(payload)) {
         if (!payload[key]) {
            error[key] = `This field is required`;
         }
      }

      if (Object.keys(error).length > 0) {
         showModalErrorForm = true;
      } else {
         const response = await fetch($apiURL + "/pengalamanPengmas", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload),
         });

         const result = await response.json();

         if (response.status === 401) {
            location.pathname = "/tokenexpired";
         } else {
            if (response.ok) {
               showModalPengmas = false;
               tahunPengmas = "";
               judulPengmas = "";
               rolePengmas = "";
               sumberDanaPengmas = "";
               biayaPengmas = "";
               getPengalamanPengmas();
            } else {
               console.log(response);
            }
         }
      }
   }

   // -----------------------------------------------
   // Button Simpan Pengalaman Diseminasi
   // -----------------------------------------------
   async function simpanPD() {
      error = {};

      let payload = {
         tahunDiseminasi,
         judulDiseminasi,
         namaPemakalahDiseminasi,
         namaPertemuanDiseminasi,
         id,
      };

      for (const [key, value] of Object.entries(payload)) {
         if (!payload[key]) {
            error[key] = `This field is required`;
         }
      }

      if (Object.keys(error).length > 0) {
         showModalErrorForm = true;
      } else {
         const response = await fetch($apiURL + "/pengalamanDiseminasi", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload),
         });

         const result = await response.json();

         if (response.status === 401) {
            location.pathname = "/tokenexpired";
         } else {
            if (response.ok) {
               showModalDiseminasi = false;
               tahunDiseminasi = "";
               judulDiseminasi = "";
               namaPemakalahDiseminasi = "";
               namaPertemuanDiseminasi = "";
               getPengalamanDiseminasi();
            } else {
               console.log(response);
            }
         }
      }
   }

   // -----------------------------------------------
   // Button Simpan Pengalaman Publikasi
   // -----------------------------------------------
   async function simpanPPublikasi() {
      error = {};

      let payload = {
         tahunPublikasi,
         judulPublikasi,
         namaPenulis,
         namaJurnal,
         impactFactor,
         id,
      };

      for (const [key, value] of Object.entries(payload)) {
         if (!payload[key]) {
            error[key] = `This field is required`;
         }
      }

      if (Object.keys(error).length > 0) {
         showModalErrorForm = true;
      } else {
         const response = await fetch($apiURL + "/pengalamanPublikasi", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload),
         });

         const result = await response.json();

         if (response.status === 401) {
            location.pathname = "/tokenexpired";
         } else {
            if (response.ok) {
               showModalPublikasi = false;
               tahunPublikasi = "";
               judulPublikasi = "";
               namaPenulis = "";
               namaJurnal = "";
               impactFactor = "";
               getPengalamanPublikasi();
            } else {
               console.log(response);
            }
         }
      }
   }

   // -----------------------------------------------
   // Button Simpan Pengalaman Penulisan Buku
   // -----------------------------------------------
   async function simpanPPB() {
      error = {};

      let payload = {
         tahunBuku,
         JudulBuku,
         namaPenulisBuku,
         PenerbitBuku,
         Isbn,
         id,
      };

      for (const [key, value] of Object.entries(payload)) {
         if (!payload[key]) {
            error[key] = `This field is required`;
         }
      }

      if (Object.keys(error).length > 0) {
         showModalErrorForm = true;
      } else {
         const response = await fetch($apiURL + "/pengalamanPenulisanBuku", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload),
         });

         const result = await response.json();

         if (response.status === 401) {
            location.pathname = "/tokenexpired";
         } else {
            if (response.ok) {
               showModalPenulisanBuku = false;
               tahunBuku = "";
               JudulBuku = "";
               namaPenulisBuku = "";
               PenerbitBuku = "";
               Isbn = "";
               getPengalamanPenulisanBuku();
            } else {
               console.log(response);
            }
         }
      }
   }

   // -----------------------------------------------
   // Button Simpan Pengalaman HKI
   // -----------------------------------------------
   async function simpanPHKI() {
      error = {};

      let payload = {
         tahunHKI,
         JudulHKI,
         namaPenulisHKI,
         jenisHKI,
         noHKI,
         id,
      };

      for (const [key, value] of Object.entries(payload)) {
         if (!payload[key]) {
            error[key] = `This field is required`;
         }
      }

      if (Object.keys(error).length > 0) {
         showModalErrorForm = true;
      } else {
         const response = await fetch($apiURL + "/pengalamanHKI", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload),
         });

         const result = await response.json();

         if (response.status === 401) {
            location.pathname = "/tokenexpired";
         } else {
            if (response.ok) {
               showModalHKI = false;
               tahunHKI = "";
               JudulHKI = "";
               namaPenulisHKI = "";
               jenisHKI = "";
               noHKI = "";
               getPengalamanHKI();
            } else {
               console.log(response);
            }
         }
      }
   }

   // -----------------------------------------------
   // Button Delete Riwayat Pendidikan S1
   // -----------------------------------------------
   async function delrowRPS1(ev) {
      let idRPS1 = ev.target.getAttribute("pid");

      const response = await fetch($apiURL + "/riwayatPendidikanS1/" + idRPS1, {
         method: "DELETE",
         headers: headers,
      });

      const result = await response.json();

      if (response.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (response.ok) {
            getRiwayatPendidikanS1();
         } else {
            console.log(response);
         }
      }
   }

   // -----------------------------------------------
   // Button Delete Riwayat Pendidikan S2
   // -----------------------------------------------
   async function delrowRPS2(ev) {
      let idRPS2 = ev.target.getAttribute("pid");

      const response = await fetch($apiURL + "/riwayatPendidikanS2/" + idRPS2, {
         method: "DELETE",
         headers: headers,
      });

      const result = await response.json();

      if (response.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (response.ok) {
            getRiwayatPendidikanS2();
         } else {
            console.log(response);
         }
      }
   }

   // -----------------------------------------------
   // Button Delete Riwayat Pendidikan S3
   // -----------------------------------------------
   async function delrowRPS3(ev) {
      let idRPS3 = ev.target.getAttribute("pid");

      const response = await fetch($apiURL + "/riwayatPendidikanS3/" + idRPS3, {
         method: "DELETE",
         headers: headers,
      });

      const result = await response.json();

      if (response.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (response.ok) {
            getRiwayatPendidikanS3();
         } else {
            console.log(response);
         }
      }
   }

   // -----------------------------------------------
   // Button Delete Pengalaman Penelitian
   // -----------------------------------------------
   async function delrowPP(ev) {
      let idPP = ev.target.getAttribute("pid");

      const response = await fetch($apiURL + "/pengalamanPenelitian/" + idPP, {
         method: "DELETE",
         headers: headers,
      });

      const result = await response.json();

      if (response.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (response.ok) {
            getPengalamanPenelitian();
         } else {
            console.log(response);
         }
      }
   }

   // -----------------------------------------------
   // Button Delete Pengalaman Pengmas
   // -----------------------------------------------
   async function delrowPM(ev) {
      let idPM = ev.target.getAttribute("pid");

      const response = await fetch($apiURL + "/pengalamanPengmas/" + idPM, {
         method: "DELETE",
         headers: headers,
      });

      const result = await response.json();

      if (response.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (response.ok) {
            getPengalamanPengmas();
         } else {
            console.log(response);
         }
      }
   }

   // -----------------------------------------------
   // Button Delete Pengalaman Diseminasi
   // -----------------------------------------------
   async function delrowPD(ev) {
      let idPD = ev.target.getAttribute("pid");

      const response = await fetch($apiURL + "/pengalamanDiseminasi/" + idPD, {
         method: "DELETE",
         headers: headers,
      });

      const result = await response.json();

      if (response.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (response.ok) {
            getPengalamanDiseminasi();
         } else {
            console.log(response);
         }
      }
   }

   // -----------------------------------------------
   // Button Delete Pengalaman Publikasi
   // -----------------------------------------------
   async function delrowPPub(ev) {
      let idPPub = ev.target.getAttribute("pid");

      const response = await fetch($apiURL + "/pengalamanPublikasi/" + idPPub, {
         method: "DELETE",
         headers: headers,
      });

      const result = await response.json();

      if (response.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (response.ok) {
            getPengalamanPublikasi();
         } else {
            console.log(response);
         }
      }
   }

   // -----------------------------------------------
   // Button Delete Pengalaman Penulisan Buku
   // -----------------------------------------------
   async function delrowPPB(ev) {
      let idPPB = ev.target.getAttribute("pid");

      const response = await fetch(
         $apiURL + "/pengalamanPenulisanBuku/" + idPPB,
         {
            method: "DELETE",
            headers: headers,
         }
      );

      const result = await response.json();

      if (response.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (response.ok) {
            getPengalamanPenulisanBuku();
         } else {
            console.log(response);
         }
      }
   }

   // -----------------------------------------------
   // Button Delete Pengalaman HKI
   // -----------------------------------------------
   async function delrowPHKI(ev) {
      let idPHKI = ev.target.getAttribute("pid");

      const response = await fetch($apiURL + "/pengalamanHKI/" + idPHKI, {
         method: "DELETE",
         headers: headers,
      });

      const result = await response.json();

      if (response.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (response.ok) {
            getPengalamanHKI();
         } else {
            console.log(response);
         }
      }
   }

   function filePpmChange(e) {
      filePpm = e.target.files[0];
      $ppmFile = e.target.files[0];
   }

   function fileRabChange(e) {
      fileRab = e.target.files[0];
      $rabFile = e.target.files[0];
   }
</script>

<Article>
   <h2 class="title is-2">Pendaftaran Proposal</h2>
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
         <Field name="Jenis Proposal">
            <div class="select is-fullwidth">
               <select id="jenisProposal" bind:value={jenisProposal}>
                  <option value="" selected disabled hidden
                     >Pilih Jenis Proposal</option
                  >
                  <option value="Proposal Awal">Proposal Awal</option>
                  <option value="Proposal Lanjutan">Proposal Lanjutan</option>
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
            <div class="select is-fullwidth">
               <select id="jenisSkema" bind:value={jenisSkema}>
                  <option value="" selected disabled hidden
                     >Pilih Jenis Skema
                  </option>
                  {#if jenisKegiatan === "Penelitian"}
                     <!-- <optgroup label="Skema Penelitian"> -->
                     <option value="Riset Kelompok Keahlian"
                        >Riset Kelompok Keahlian</option
                     >
                     <option value="Riset Terapan">Riset Terapan</option>
                     <option value="Riset Kerjasama">Riset Kerjasama</option>
                     <option value="Riset Mandiri">Riset Mandiri</option>
                     <option value="Riset Eksternal">Riset Eksternal</option>
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

         <table class="table is-fullwidth is-striped is-hoverable is-bordered">
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

         <hr />

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

         {#if jenisSkema === "Riset Kelompok Keahlian" || jenisSkema === "Riset Terapan" || jenisSkema === "Riset Kerjasama" || jenisSkema === "Pengabdian Masyarakat Desa Binaan" || jenisSkema === "Pengabdian Masyarakat UMKM Binaan"}
            <Field name="Rencana Anggaran Biaya">
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
                        <input class="file-input" type="file" name="resume" />
                        <span class="file-cta">
                           <span class="file-icon">
                              <Icon id="download" src={downloadIcon} />
                           </span>
                           <span class="file-label"> Choose a file</span>
                        </span>
                        {#if $rabFile?.name}
                           <span class="file-name"> {$rabFile?.name}</span>
                        {:else}
                           <span class="file-name">No file chosen</span>
                        {/if}
                     </label>
                  </div>
                  {#if error.fileRAB}
                     <p class="error has-text-danger">{error.fileRAB}</p>
                  {/if}
               </span>
               <p class="help">File Type: xlsx</p>
            </Field>
         {/if}

         {#if warningFormText === true}
            <div class="field is-grouped is-grouped-right">
               <p class="has-text-danger">
                  Lengkapi semua form untuk ke step selanjutnya.
               </p>
            </div>
         {/if}
      </div>
   {/if}

   <!-- ---------------------------------------------------- -->
   <!-- Tabs Step 2 -->
   <!-- ---------------------------------------------------- -->
   {#if tab2 === true}
      {#if userData.length > 0}
         {#each userData as user}
            <div class="box">
               <h5 class="title is-5">Identitas</h5>
               <Field name="Nama Lengkap">
                  {#if user.profile.nama_lengkap}
                     {user.profile.nama_lengkap}
                  {:else}
                     <span></span>
                  {/if}
               </Field>
               <Field name="Jabatan Fungsional">
                  {user.profile.jabatan_fungsional}
               </Field>

               <hr />

               <h5 class="title is-5">Riwayat Pendidikan S1</h5>
               <table
                  class="table is-fullwidth is-striped is-hoverable is-bordered"
               >
                  <thead>
                     <tr>
                        <th style="width: 25%;">Nama Perguruan Tinggi</th>
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
               on:click={simpanProposal}
               class:is-loading={isLoading}>Simpan</button
            >
         </p>
         <p class="control">
            <button
               class="button is-info"
               on:click={submitProposal}
               class:is-loading={isLoading}>Submit</button
            >
         </p>
      </div>
   {/if}
</Article>

<!-- ------------------------------------------------------------------------>
<!-- Modal Input Riwayat Pendidikan S1 -->
<!-- ------------------------------------------------------------------------>
<Modal bind:show={showModalRiwayatPendidikanS1}>
   <h4 class="title is-4" slot="header">Riwayat Pendidikan S1</h4>

   <Field name="Nama Perguruan Tinggi"
      ><input class="input" type="text" bind:value={nama_pertiS1} />
      {#if error.nama_pertiS1}
         <p class="help error is-danger">{error.nama_pertiS1}</p>
      {/if}
   </Field>

   <Field name="Bidang Ilmu"
      ><input class="input" type="text" bind:value={bidang_ilmuS1} />
      {#if error.bidang_ilmuS1}
         <p class="help error is-danger">{error.bidang_ilmuS1}</p>
      {/if}
   </Field>

   <Field name="Tahun Masuk"
      ><input class="input" type="number" bind:value={tahunMasukS1} />
      {#if error.tahunMasukS1}
         <p class="help error is-danger">{error.tahunMasukS1}</p>
      {/if}
   </Field>

   <Field name="Tahun Lulus"
      ><input class="input" type="number" bind:value={tahunLulusS1} />
      {#if error.tahunLulusS1}
         <p class="help error is-danger">{error.tahunLulusS1}</p>
      {/if}
   </Field>

   <Field name="Judul Skripsi"
      ><input class="input" type="text" bind:value={judulSkripsi} />
      {#if error.judulSkripsi}
         <p class="help error is-danger">{error.judulSkripsi}</p>
      {/if}
   </Field>

   <hr />
   <div class="field is-grouped is-grouped-right">
      <p class="control">
         <button class="button is-info" on:click={simpanRP_S1}>Simpan</button>
      </p>
   </div>
</Modal>

<!-- ------------------------------------------------------------------------>
<!-- Modal Input Riwayat Pendidikan S2 -->
<!-- ------------------------------------------------------------------------>
<Modal bind:show={showModalRiwayatPendidikanS2}>
   <h4 class="title is-4" slot="header">Riwayat Pendidikan S2</h4>

   <Field name="Nama Perguruan Tinggi"
      ><input class="input" type="text" bind:value={nama_pertiS2} />
      {#if error.nama_pertiS2}
         <p class="help error is-danger">{error.nama_pertiS2}</p>
      {/if}
   </Field>

   <Field name="Bidang Ilmu"
      ><input class="input" type="text" bind:value={bidang_ilmuS2} />
      {#if error.bidang_ilmuS2}
         <p class="help error is-danger">{error.bidang_ilmuS2}</p>
      {/if}
   </Field>

   <Field name="Tahun Masuk"
      ><input class="input" type="number" bind:value={tahunMasukS2} />
      {#if error.tahunMasukS2}
         <p class="help error is-danger">{error.tahunMasukS2}</p>
      {/if}
   </Field>

   <Field name="Tahun Lulus"
      ><input class="input" type="number" bind:value={tahunLulusS2} />
      {#if error.tahunLulusS2}
         <p class="help error is-danger">{error.tahunLulusS2}</p>
      {/if}
   </Field>

   <Field name="Judul Tesis"
      ><input class="input" type="text" bind:value={judulTesis} />
      {#if error.judulTesis}
         <p class="help error is-danger">{error.judulTesis}</p>
      {/if}
   </Field>

   <hr />
   <div class="field is-grouped is-grouped-right">
      <p class="control">
         <button class="button is-info" on:click={simpanRP_S2}>Simpan</button>
      </p>
   </div>
</Modal>

<!-- ------------------------------------------------------------------------>
<!-- Modal Input Riwayat Pendidikan S3 -->
<!-- ------------------------------------------------------------------------>
<Modal bind:show={showModalRiwayatPendidikanS3}>
   <h4 class="title is-4" slot="header">Riwayat Pendidikan S3</h4>

   <Field name="Nama Perguruan Tinggi"
      ><input class="input" type="text" bind:value={nama_pertiS3} />
      {#if error.nama_pertiS3}
         <p class="help error is-danger">{error.nama_pertiS3}</p>
      {/if}
   </Field>
   <Field name="Bidang Ilmu"
      ><input class="input" type="text" bind:value={bidang_ilmuS3} />
      {#if error.bidang_ilmuS3}
         <p class="help error is-danger">{error.bidang_ilmuS3}</p>
      {/if}
   </Field>
   <Field name="Tahun Masuk"
      ><input class="input" type="number" bind:value={tahunMasukS3} />
      {#if error.tahunMasukS3}
         <p class="help error is-danger">{error.tahunMasukS3}</p>
      {/if}
   </Field>
   <Field name="Tahun Lulus"
      ><input class="input" type="number" bind:value={tahunLulusS3} />
      {#if error.tahunLulusS3}
         <p class="help error is-danger">{error.tahunLulusS3}</p>
      {/if}
   </Field>
   <Field name="Judul Disertasi"
      ><input class="input" type="text" bind:value={judulDisertasi} />
      {#if error.judulDisertasi}
         <p class="help error is-danger">{error.judulDisertasi}</p>
      {/if}
   </Field>

   <hr />
   <div class="field is-grouped is-grouped-right">
      <p class="control">
         <button class="button is-info" on:click={simpanRP_S3}>Simpan</button>
      </p>
   </div>
</Modal>

<!-- ------------------------------------------------------------------------>
<!-- Modal Pengalaman Penelitian -->
<!-- ------------------------------------------------------------------------>
<Modal bind:show={showModalPenelitian}>
   <h4 class="title is-4" slot="header">Pengalaman Penelitian</h4>

   <Field name="Tahun">
      <input class="input" type="number" bind:value={tahunPenelitian} />
      {#if error.tahunPenelitian}
         <p class="help error is-danger">{error.tahunPenelitian}</p>
      {/if}
   </Field>

   <Field name="Judul Penelitian">
      <input class="input" type="text" bind:value={judulPenelitian} />
      {#if error.judulPenelitian}
         <p class="help error is-danger">{error.judulPenelitian}</p>
      {/if}
   </Field>

   <Field name="Role">
      <div class="select is-fullwidth">
         <select bind:value={rolePenelitian}>
            <option value="" disabled selected hidden
               >Pilih peran dalam kegiatan</option
            >
            <option value="Ketua">Ketua</option>
            <option value="Anggota">Anggota</option>
         </select>
      </div>
      {#if error.rolePenelitian}
         <p class="help error is-danger">{error.rolePenelitian}</p>
      {/if}
   </Field>

   <Field name="Sumber Dana">
      <input class="input" type="text" bind:value={sumberDanaPenelitian} />
      {#if error.sumberDanaPenelitian}
         <p class="help error is-danger">
            {error.sumberDanaPenelitian}
         </p>
      {/if}
   </Field>

   <Field name="Jumlah Rp.">
      <input
         class="input"
         type="text"
         placeholder="Masukkan Biaya Penelitian"
         bind:value={biayaPP}
         on:keyup={() => (biayaPP = formatRupiah(biayaPP, "Rp. "))}
      />
      {#if error.biayaPP}
         <p class="help error is-danger">{error.biayaPP}</p>
      {/if}
   </Field>

   <hr />

   <div class="field is-grouped is-grouped-right">
      <p class="control">
         <button class="button is-info" on:click={simpanPP}>Simpan</button>
      </p>
   </div>
</Modal>

<!-- ------------------------------------------------------------------------>
<!-- Modal Pengalaman Pengmas -->
<!-- ------------------------------------------------------------------------>
<Modal bind:show={showModalPengmas}>
   <h4 class="title is-4" slot="header">Pengalaman Pengabdian Masyarakat</h4>

   <Field name="Tahun">
      <input class="input" type="number" bind:value={tahunPengmas} />
      {#if error.tahunPengmas}
         <p class="help error is-danger">{error.tahunPengmas}</p>
      {/if}
   </Field>

   <Field name="Judul Pengmas">
      <input class="input" type="text" bind:value={judulPengmas} />
      {#if error.judulPengmas}
         <p class="help error is-danger">{error.judulPengmas}</p>
      {/if}
   </Field>

   <Field name="Role">
      <div class="select is-fullwidth">
         <select bind:value={rolePengmas}>
            <option value="" disabled selected hidden
               >Pilih peran dalam kegiatan</option
            >
            <option value="Ketua">Ketua</option>
            <option value="Anggota">Anggota</option>
         </select>
      </div>
      {#if error.rolePengmas}
         <p class="help error is-danger">{error.rolePengmas}</p>
      {/if}
   </Field>

   <Field name="Sumber Dana">
      <input class="input" type="text" bind:value={sumberDanaPengmas} />
      {#if error.sumberDanaPengmas}
         <p class="help error is-danger">{error.sumberDanaPengmas}</p>
      {/if}
   </Field>

   <Field name="Jumlah Rp.">
      <input
         class="input"
         type="text"
         placeholder="Masukkan Biaya Pengmas"
         bind:value={biayaPengmas}
         on:keyup={() => (biayaPengmas = formatRupiah(biayaPengmas, "Rp. "))}
      />
      {#if error.biayaPengmas}
         <p class="help error is-danger">{error.biayaPengmas}</p>
      {/if}
   </Field>

   <hr />

   <div class="field is-grouped is-grouped-right">
      <p class="control">
         <button class="button is-info" on:click={simpanPM}>Simpan</button>
      </p>
   </div>
</Modal>

<!-- ------------------------------------------------------------------------>
<!-- Modal Pengalaman Diseminasi Ilmiah -->
<!-- ------------------------------------------------------------------------>
<Modal bind:show={showModalDiseminasi}>
   <h4 class="title is-4" slot="header">
      Pengalaman Diseminasi Ilmiah dalam<br />Pertemuan / Pameran
   </h4>

   <Field name="Tahun">
      <input class="input" type="number" bind:value={tahunDiseminasi} />
      {#if error.tahunDiseminasi}
         <p class="help error is-danger">{error.tahunDiseminasi}</p>
      {/if}
   </Field>

   <Field name="Judul Artikel">
      <input class="input" type="text" bind:value={judulDiseminasi} />
      {#if error.judulDiseminasi}
         <p class="help error is-danger">{error.judulDiseminasi}</p>
      {/if}
   </Field>

   <Field name="Nama Pemakalah">
      <input class="input" type="text" bind:value={namaPemakalahDiseminasi} />
      {#if error.namaPemakalahDiseminasi}
         <p class="help error is-danger">{error.namaPemakalahDiseminasi}</p>
      {/if}
   </Field>

   <Field name="Nama Pertemuan Ilmiah/Pameran">
      <input class="input" type="text" bind:value={namaPertemuanDiseminasi} />
      {#if error.namaPertemuanDiseminasi}
         <p class="help error is-danger">{error.namaPertemuanDiseminasi}</p>
      {/if}
   </Field>

   <hr />

   <div class="field is-grouped is-grouped-right">
      <p class="control">
         <button class="button is-info" on:click={simpanPD}>Simpan</button>
      </p>
   </div>
</Modal>

<!-- ------------------------------------------------------------------------>
<!-- Modal Pengalaman Publikasi Ilmiah dalam Jurnal -->
<!-- ------------------------------------------------------------------------>
<Modal bind:show={showModalPublikasi}>
   <h4 class="title is-4" slot="header">
      Pengalaman Publikasi Ilmiah <br /> dalam Jurnal (bukan Proceeding)
   </h4>

   <Field name="Tahun">
      <input class="input" type="number" bind:value={tahunPublikasi} />
      {#if error.tahunPublikasi}
         <p class="help error is-danger">{error.tahunPublikasi}</p>
      {/if}
   </Field>

   <Field name="Judul Artikel">
      <input class="input" type="text" bind:value={judulPublikasi} />
      {#if error.judulPublikasi}
         <p class="help error is-danger">{error.judulPublikasi}</p>
      {/if}
   </Field>

   <Field name="Nama Penulis">
      <input class="input" type="text" bind:value={namaPenulis} />
      {#if error.namaPenulis}
         <p class="help error is-danger">{error.namaPenulis}</p>
      {/if}
   </Field>

   <Field name="Nama Jurnal, Vol., No Issue/No Artikel, Halaman">
      <input class="input" type="text" bind:value={namaJurnal} />
      {#if error.namaJurnal}
         <p class="help error is-danger">{error.namaJurnal}</p>
      {/if}
   </Field>

   <Field name="Nama Pertemuan Ilmiah/Pameran">
      <input class="input" type="text" bind:value={impactFactor} />
      {#if error.impactFactor}
         <p class="help error is-danger">{error.impactFactor}</p>
      {/if}
   </Field>

   <hr />

   <div class="field is-grouped is-grouped-right">
      <p class="control">
         <button class="button is-info" on:click={simpanPPublikasi}
            >Simpan</button
         >
      </p>
   </div>
</Modal>

<!-- ------------------------------------------------------------------------>
<!-- Modal Pengalaman Penulisan Buku -->
<!-- ------------------------------------------------------------------------>
<Modal bind:show={showModalPenulisanBuku}>
   <h4 class="title is-4" slot="header">Pengalaman Penulisan Buku</h4>

   <Field name="Tahun">
      <input class="input" type="number" bind:value={tahunBuku} />
      {#if error.tahunBuku}
         <p class="help error is-danger">{error.tahunBuku}</p>
      {/if}
   </Field>

   <Field name="Judul Buku">
      <input class="input" type="text" bind:value={JudulBuku} />
      {#if error.JudulBuku}
         <p class="help error is-danger">{error.JudulBuku}</p>
      {/if}
   </Field>

   <Field name="Nama Penulis">
      <input class="input" type="text" bind:value={namaPenulisBuku} />
      {#if error.namaPenulisBuku}
         <p class="help error is-danger">{error.namaPenulisBuku}</p>
      {/if}
   </Field>

   <Field name="Penerbit">
      <input class="input" type="text" bind:value={PenerbitBuku} />
      {#if error.PenerbitBuku}
         <p class="help error is-danger">{error.PenerbitBuku}</p>
      {/if}
   </Field>

   <Field name="ISBN">
      <input class="input" type="text" bind:value={Isbn} />
      {#if error.Isbn}
         <p class="help error is-danger">{error.Isbn}</p>
      {/if}
   </Field>

   <hr />

   <div class="field is-grouped is-grouped-right">
      <p class="control">
         <button class="button is-info" on:click={simpanPPB}>Simpan</button>
      </p>
   </div>
</Modal>

<!-- ------------------------------------------------------------------------>
<!-- Modal Pengalaman Hak Kekayaan Intelektual -->
<!-- ------------------------------------------------------------------------>
<Modal bind:show={showModalHKI}>
   <h4 class="title is-4" slot="header">Pengalaman Hak Kekayaan Intelektual</h4>

   <Field name="Tahun">
      <input class="input" type="number" bind:value={tahunHKI} />
      {#if error.tahunHKI}
         <p class="help error is-danger">{error.tahunHKI}</p>
      {/if}
   </Field>

   <Field name="Judul HKI">
      <input class="input" type="text" bind:value={JudulHKI} />
      {#if error.JudulHKI}
         <p class="help error is-danger">{error.JudulHKI}</p>
      {/if}
   </Field>

   <Field name="Nama Penulis">
      <input class="input" type="text" bind:value={namaPenulisHKI} />
      {#if error.namaPenulisHKI}
         <p class="help error is-danger">{error.namaPenulisHKI}</p>
      {/if}
   </Field>

   <Field name="Jenis HKI">
      <input class="input" type="text" bind:value={jenisHKI} />
      {#if error.jenisHKI}
         <span class="help error is-danger">{error.jenisHKI}</span>
      {/if}
   </Field>

   <Field name="No HKI">
      <input class="input" type="text" bind:value={noHKI} />
      {#if error.noHKI}
         <p class="help error is-danger">{error.noHKI}</p>
      {/if}
   </Field>

   <hr />

   <div class="field is-grouped is-grouped-right">
      <p class="control">
         <button class="button is-info" on:click={simpanPHKI}>Simpan</button>
      </p>
   </div>
</Modal>

<Modalerror bind:show={showModalErrorForm}>
   <p>Lengkapi semua form sebelum disimpan</p>
</Modalerror>

<Modalerror bind:show={showModalErrorProposal}>
   <p>Lengkapi semua form proposal untuk ke step selanjutnya!</p>
</Modalerror>

<Modalerror bind:show={showModalErrorBiodata}>
   <p>Lengkapi semua form biodata untuk submit proposal!</p>
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
</style>
