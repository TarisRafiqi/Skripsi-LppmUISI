<script>
   import { onMount } from "svelte";
   import { route, apiURL, ppmFile, rabFile } from "../../store";
   import Modalerror from "../../libs/Modalerror.svelte";
   import Article from "../../libs/Article.svelte";
   import Icon from "../../libs/Icon.svelte";
   import Field from "../../libs/Field.svelte";
   import Fieldview from "../../libs/Fieldview.svelte";
   import Select from "../../libs/Select.svelte";
   import Status from "../../modules/Status.svelte";
   import {
      deleteIcon,
      edit,
      downloadIcon,
      cancelIcon,
   } from "../../store/icons";

   export let params;
   const own_id = Number(localStorage.getItem("id"));

   let error = {};
   let items = [];
   let view;
   let dataRPS1, dataRPS2, dataRPS3;
   let data, dataGP, dataPP, dataPM, dataPD, dataPPub, dataPPB, dataPHKI;
   let itemsRCR;

   let uidProposal,
      jenisProposal,
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

   let idProfile,
      namaLengkap,
      jabatanFungsional,
      nip,
      nidn,
      tempatLahir,
      tanggalLahir,
      alamatRumah,
      telpFaxRumah,
      nomorHandphone,
      alamatKantor,
      telpFaxKantor,
      email,
      mataKuliah = [];

   const id = params["1"];
   let file;
   let fileRab;
   let filePpm;
   let isLoading = false;
   let editModeProposal = false;
   let editModeRAB = false;
   let showModalError = false;
   let skpVisible = false;
   let danaPenelitianVisible = false;
   let suratTugasVisible = false;
   let hasilPenelitianVisible = false;
   let presentasiVisible = false;
   let skPenelitianVisible = false;

   const accessToken = localStorage.getItem("token");

   const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
   };

   onMount(async () => {
      isLoading = false;

      // Get detail proposal
      const response = await fetch($apiURL + "/ppm/" + id, {
         method: "GET",
         headers: headers,
      });
      const result = await response.json();
      view = !isEdit(result.status);

      if (response.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (response.ok) {
            data = result;

            // console.log(data);
            // return;

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
            anggotaTim =
               typeof data.anggota_tim === "string"
                  ? JSON.parse(data.anggota_tim)
                  : data.anggota_tim;

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
            itemsRCR = dataRCR.dbData;
         }
      }
      // ================================================//
      // Get Profile
      // ================================================//
      const responseGP = await fetch($apiURL + "/user/" + uidProposal, {
         method: "GET",
         headers: headers,
      });

      const resultGP = await responseGP.json();

      if (responseGP.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (responseGP.ok) {
            dataGP = resultGP;

            idProfile = dataGP.id;
            idUser = dataGP.uid;
            namaLengkap = dataGP.nama_lengkap;
            jabatanFungsional = dataGP.jabatan_fungsional;
            nip = dataGP.nip;
            nidn = dataGP.nidn;
            tempatLahir = dataGP.tempat_lahir;
            tanggalLahir = dataGP.tanggal_lahir;
            alamatRumah = dataGP.alamat_rumah;
            telpFaxRumah = dataGP.telp_fax_rumah;
            nomorHandphone = dataGP.nomor_handphone;
            alamatKantor = dataGP.alamat_kantor;
            telpFaxKantor = dataGP.telp_fax_kantor;
            email = dataGP.email;
            mataKuliah =
               typeof dataGP.mata_kuliah === "string"
                  ? JSON.parse(dataGP.mata_kuliah)
                  : dataGP.mata_kuliah || [];
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

   function isEdit(code) {
      const edit = [0, 1, 3, 5, 7, 9];
      return edit.some((x) => x === code);
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

   async function remediasi() {
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

   // $: dataGP.telpFaxKantor !== null ? dataGP.telpFaxKantor : "";
</script>

{#if data && items.length > 0}
   <Article>
      <h2 class="title is-2">Detail Proposal</h2>

      <div class="tabs is-boxed">
         <ul>
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <li on:click={clicktab1} class:is-active={tab1}>
               <!-- svelte-ignore a11y-missing-attribute -->
               <a>
                  <span>Identitas PPM</span>
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

               <hr />

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

               <!-- <Field name="Isi">
               <Wysiwyg id="isi" content={isi} />
               </Field> -->

               <Field name="Proposal">
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
                  <Field name="Rencana Anggaran Biaya">
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
            {:else}
               <div class="columns is-desktop">
                  <Fieldview title="Judul" content={data.judul} />
               </div>

               <div class="columns is-desktop">
                  <Fieldview title="Abstrak" content={data.abstrak} />
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

               <div class="columns is-desktop">
                  <Fieldview title="Status" content={status} type="status" />
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

               <!-- <Field name="Proposal">
                  <button
                     class="button is-link button is-small"
                     on:click={handleDownloadPpm}>Download Proposal</button
                  >
               </Field>

               {#if jenisSkema === "Riset Kelompok Keahlian" || jenisSkema === "Riset Terapan" || jenisSkema === "Riset Kerjasama" || jenisSkema === "Pengabdian Masyarakat Desa Binaan" || jenisSkema === "Pengabdian Masyarakat UMKM Binaan"}
                  <Field name="Rencana Anggaran Biaya">
                     <button
                        class="button is-link button is-small"
                        on:click={handleDownloadRab}>Download RAB</button
                     >
                  </Field>
               {/if} -->
            {/if}
         </div>

         <!-- ========================================== -->
         <!--              Catatan Revisi                -->
         <!-- ========================================== -->
         {#if !view}
            <div class="box">
               <h5 class="title is-5">Informasi Revisi</h5>
               <div class="notification is-warning is-light">
                  <p>
                     Perhatikan catatan revisi dari evaluator untuk detail yang
                     akan direvisi!
                  </p>
               </div>

               <Field name="Catatan Revisi">
                  {comment}
               </Field>

               <br />

               <table
                  class="table is-fullwidth is-striped is-hoverable is-bordered"
               >
                  <thead>
                     <tr>
                        <th style="width: 70%;">Catatan Revisi</th>
                        <th style="width: 15%;">Evaluator</th>
                        <th style="width: 15%;">Waktu</th>
                     </tr>
                  </thead>
                  {#if itemsRCR}
                     <tbody>
                        {#each itemsRCR as item}
                           <tr>
                              <td>{item.comment}</td>
                              <td>{item.evaluator}</td>
                              <td>{item.time}</td>
                           </tr>
                        {/each}
                     </tbody>
                  {/if}
               </table>
            </div>
         {/if}

         {#if status >= 12}
            <!-- ========================================== -->
            <!--        Surat Kontrak Penelitian (SKP)      -->
            <!-- ========================================== -->
            <div class="box">
               <!-- svelte-ignore a11y-no-static-element-interactions -->
               <!-- svelte-ignore a11y-click-events-have-key-events -->
               <h5 class="title is-6">
                  Download Surat Kontrak Penelitian
                  <span
                     class="toggle-button"
                     on:click={() => (skpVisible = !skpVisible)}
                  >
                     {skpVisible ? "(tutup)" : "(buka)"}
                  </span>
               </h5>

               {#if skpVisible}
                  <hr />
                  <Field name="Surat Kontrak Penelitian">
                     <button class="button is-link button is-small"
                        >Download</button
                     >
                  </Field>

                  <Field name="Tanda tangan">
                     <input type="checkbox" />
                     Saya sudah menandatangani <b>Surat Kontrak Penelitian</b>
                  </Field>
               {/if}
            </div>

            <!-- ========================================== -->
            <!--               Dana Penelitian              -->
            <!-- ========================================== -->
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
                  <div class="notification is-warning is-light">
                     <p>
                        Untuk pengambilan dana atau penjelasan lebih lanjut
                        terkait pendanaan, hubungi LPPM UISI.
                     </p>
                  </div>
                  <Field name="Status Dana Penelitian">
                     <span class="tag is-info">30% dana dicairkan</span></Field
                  >
               {/if}
            </div>

            <!-- ========================================== -->
            <!--                 Surat Tugas                -->
            <!-- ========================================== -->
            <div class="box">
               <!-- svelte-ignore a11y-no-static-element-interactions -->
               <!-- svelte-ignore a11y-click-events-have-key-events -->
               <h5 class="title is-6">
                  Download Surat Tugas
                  <span
                     class="toggle-button"
                     on:click={() => (suratTugasVisible = !suratTugasVisible)}
                  >
                     {suratTugasVisible ? "(tutup)" : "(buka)"}
                  </span>
               </h5>

               {#if suratTugasVisible}
                  <hr />
                  <Field name="Surat Tugas">
                     <button class="button is-link button is-small"
                        >Download</button
                     >
                  </Field>
               {/if}
            </div>

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
                  <Field name="Upload Hasil Penelitian">
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
                  </Field>

                  <Field name="Tanggungan Revisi"><span></span></Field>
                  <table
                     class="table is-fullwidth is-striped is-hoverable is-bordered"
                  >
                     <thead>
                        <tr>
                           <th style="width: 65%;">Catatan</th>
                           <th style="width: 15%;">Evaluator</th>
                           <th>Status</th>
                           <th style="width: 15%;">Tanggal</th>
                        </tr>
                     </thead>

                     <tbody>
                        <tr>
                           <td></td>
                           <td>Taris Rafiqi</td>
                           <td><span class="tag is-success">Done</span></td>
                           <td></td>
                        </tr>
                     </tbody>
                  </table>

                  <Field name="Approval Hasil Penelitian"><span></span></Field>
                  <table
                     class="table is-fullwidth is-striped is-hoverable is-bordered"
                  >
                     <thead>
                        <tr>
                           <th style="width: 65%;">Catatan</th>
                           <th style="width: 15%;">Evaluator</th>
                           <th>Approval</th>
                           <th style="width: 15%;">Tanggal</th>
                        </tr>
                     </thead>

                     <tbody>
                        <tr>
                           <td>Tidak ada catatan</td>
                           <td>Taris Rafiqi</td>
                           <td><span class="tag is-success">Disetujui</span></td
                           >
                           <td></td>
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
                  <input type="checkbox" />
                  Saya sudah presentasi <b>Hasil Penelitian</b>
               {/if}
            </div>

            <!-- ========================================== -->
            <!--                 Surat Tugas                -->
            <!-- ========================================== -->
            <div class="box">
               <!-- svelte-ignore a11y-no-static-element-interactions -->
               <!-- svelte-ignore a11y-click-events-have-key-events -->
               <h5 class="title is-6">
                  Download SK Penelitian
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
                  <Field name="SK Penelitian">
                     <button class="button is-link button is-small"
                        >Download</button
                     >
                  </Field>
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
               {:else}
                  <p class="control">
                     <button class="button is-info" on:click={remediasi}
                        >Remediasi</button
                     >
                  </p>
               {/if}
            {/if}
         </div>
      {/if}

      <!-- Tab Biodata Peneliti -->
      {#if tab2 === true}
         <!-- {#if uidProposal === own_id}
            <div class="notification is-danger is-light">
               <p style="text-align: justify;">
                  <strong>Biodata</strong> sebagai salah satu syarat dalam
                  pengajuan hibah Penelitian dan Pengabdian Masyarakat dan
                  apabila dikemudian hari ternyata dijumpai ketidak sesuaian,
                  peneliti sanggup menerima sanksinya. Jika ada perubahan, klik
                  <a href={"/dosen/profile"}>
                     <strong>Disini!</strong>
                  </a>
               </p>
            </div>
         {/if} -->

         <div class="box">Tab 2</div>
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
</style>
