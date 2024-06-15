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
   let userData = [];

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
   // Get Biodata Anggota
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
      <div class="notification is-warning is-light">
         <p>Pastikan data yang digunakan merupakan data terbaru!</p>
      </div>
      {#if userData.length > 0}
         {#each userData as user, index}
            <div class="box">
               <!-- <h5 class="title is-5">Identitas</h5> -->
               <!-- svelte-ignore a11y-no-static-element-interactions -->
               <!-- svelte-ignore a11y-click-events-have-key-events -->
               <h6 class="title is-6">
                  Biodata: {user.profile.nama_lengkap}
                  <span
                     class="toggle-button"
                     on:click={() =>
                        (userData[index].profileVisible =
                           !userData[index].profileVisible)}
                  >
                     {userData[index].profileVisible ? "(tutup)" : "(buka)"}
                  </span>
               </h6>

               {#if userData[index].profileVisible}
                  <hr />
                  <h5 class="title is-5">Identitas Diri</h5>

                  <Field name="Nama Lengkap">
                     {#if user.profile.nama_lengkap}
                        {user.profile.nama_lengkap}
                     {:else}
                        <span></span>
                     {/if}
                  </Field>

                  <Field name="Jabatan Fungsional">
                     {#if user.profile.jabatan_fungsional}
                        {user.profile.jabatan_fungsional}
                     {:else}
                        <span></span>
                     {/if}
                  </Field>

                  <Field name="NIP">
                     {#if user.profile.nip}
                        {user.profile.nip}
                     {:else}
                        <span></span>
                     {/if}
                  </Field>

                  <Field name="NIDN">
                     {#if user.profile.nidn}
                        {user.profile.nidn}
                     {:else}
                        <span></span>
                     {/if}
                  </Field>

                  <Field name="Tempat Lahir">
                     {#if user.profile.tempat_lahir}
                        {user.profile.tempat_lahir}
                     {:else}
                        <span></span>
                     {/if}
                  </Field>

                  <Field name="Tanggal Lahir">
                     {#if user.profile.tanggal_lahir}
                        {user.profile.tanggal_lahir}
                     {:else}
                        <span></span>
                     {/if}
                  </Field>

                  <Field name="Alamat Rumah">
                     {#if user.profile.alamat_rumah}
                        {user.profile.alamat_rumah}
                     {:else}
                        <span></span>
                     {/if}
                  </Field>

                  <Field name="Telp/Fax Rumah">
                     {#if user.profile.telp_fax_rumah}
                        {user.profile.telp_fax_rumah}
                     {:else}
                        <span></span>
                     {/if}
                  </Field>

                  <Field name="Nomor Handphone">
                     {#if user.profile.nomor_handphone}
                        {user.profile.nomor_handphone}
                     {:else}
                        <span></span>
                     {/if}
                  </Field>

                  <Field name="Alamat Kantor">
                     {#if user.profile.alamat_kantor}
                        {user.profile.alamat_kantor}
                     {:else}
                        <span></span>
                     {/if}
                  </Field>

                  <Field name="Telp/Fax Kantor">
                     {#if user.profile.telp_fax_kantor}
                        {user.profile.telp_fax_kantor}
                     {:else}
                        <span></span>
                     {/if}
                  </Field>

                  <Field name="Email">
                     {#if user.profile.email}
                        {user.profile.email}
                     {:else}
                        <span></span>
                     {/if}
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

   .toggle-button {
      cursor: pointer;
      color: #fc6c78;
      font-size: small;
   }
</style>
