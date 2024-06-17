<script>
   import { onMount } from "svelte";
   import { route, apiURL, penilaianFile } from "../../store";
   import Article from "../../libs/Article.svelte";
   import Field from "../../libs/Field.svelte";
   import Modalerror from "../../libs/Modalerror.svelte";
   import Icon from "../../libs/Icon.svelte";
   import { downloadIcon } from "../../store/icons";

   export let params;

   let randomPenilaianFileName = "";
   let showModalErrorRevisi = false;
   let showModalErrorPassReviewer = false;
   let isLoading = false;
   const id = params["1"];
   const role = localStorage.getItem("role");
   const idEvaluator = localStorage.getItem("id");
   let error = {};
   let filePenilaian;

   let data, dataGP, dataPP, dataPM, dataPD, dataPPub, dataPPB, dataPHKI;
   let itemsRCR;
   let dataRPS1, dataRPS2, dataRPS3;
   let pertiS1,
      pertiS2,
      pertiS3,
      bidangIlmuS1,
      bidangIlmuS2,
      bidangIlmuS3,
      tahunMasukS1,
      tahunMasukS2,
      tahunMasukS3,
      tahunLulusS1,
      tahunLulusS2,
      tahunLulusS3,
      judulTugasAkhirS1,
      judulTugasAkhirS2,
      judulTugasAkhirS3;

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

   let ka_departemen, ka_lppm, reviewer, ka_pusat_kajian;

   let uidProposal,
      jenisProposal,
      jenisKegiatan,
      jenisSkema,
      kelompokKeahlian,
      topik,
      tanggalMulai,
      tanggalSelesai,
      biayaPenelitian,
      anggotaTim,
      rab,
      judul,
      abstrak,
      comment,
      status,
      kdeptSelected,
      klppmSelected,
      kpkSelected,
      reviewerSelected;

   const accessToken = localStorage.getItem("token");
   const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
   };

   // Memakai akses token, hanya uid yang bersangkutan, dan role admin yang boleh mengakses halaman ini
   onMount(async () => {
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
            rab = data.rab;
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
            randomPenilaianFileNamedb = data.random_penilaian_file_name;
         }
      }

      //------------------------------------------------------------
      // Generate Penilaian Random Character
      //------------------------------------------------------------
      const characters =
         "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let resultPenilaianChar = "";

      for (let i = 0; i < 30; i++) {
         const randomIndex = Math.floor(Math.random() * characters.length);
         resultPenilaianChar += characters.charAt(randomIndex);
      }

      randomPenilaianFileName = resultPenilaianChar;

      // -----------------------------------------------------------------------------//
      // Get Nama Lengkap Evaluator
      // -----------------------------------------------------------------------------//
      const responseEvl = await fetch($apiURL + "/user/" + idEvaluator, {
         method: "GET",
         headers: headers,
      });

      const resultEvl = await responseEvl.json();

      if (responseEvl.status === 401) {
         // localStorage.clear();
         location.pathname = "/tokenexpired";
      } else {
         if (responseEvl.ok) {
            dataEvl = resultEvl;
            namaLengkapEvl = dataEvl.nama_lengkap;
         }
      }

      // -----------------------------------------------------------------------------//
      // Get Riwayat Catatan Revisi
      // -----------------------------------------------------------------------------//
      const responseRCR = await fetch(
         $apiURL + "/riwayatCatatanRevisi/" + ppmId,
         {
            method: "GET",
            headers: headers,
         }
      );

      const dataRCR = await responseRCR.json();

      if (responseRCR.status === 401) {
         // localStorage.clear();
         location.pathname = "/tokenexpired";
      } else {
         if (responseRCR.ok) {
            itemsRCR = dataRCR.dbData;
         }
      }

      // -----------------------------------------------------------------------------//
      // Get Profile
      // -----------------------------------------------------------------------------//
      const responseGP = await fetch($apiURL + "/user/" + uidProposal, {
         method: "GET",
         headers: headers,
      });

      const resultGP = await responseGP.json();

      if (responseGP.status === 401) {
         // localStorage.clear();
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
      // Get Riwayat Pendidikan S1
      // ================================================//
      const responseRPS1 = await fetch(
         $apiURL + "/riwayatPendidikanS1/" + uidProposal,
         {
            method: "GET",
            headers: headers,
         }
      );

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

      // ================================================//
      // Get Riwayat Pendidikan S2
      // ================================================//
      const responseRPS2 = await fetch(
         $apiURL + "/riwayatPendidikanS2/" + uidProposal,
         {
            method: "GET",
            headers: headers,
         }
      );

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

      // ================================================//
      // Get Riwayat Pendidikan S3
      // ================================================//
      const responseRPS3 = await fetch(
         $apiURL + "/riwayatPendidikanS3/" + uidProposal,
         {
            method: "GET",
            headers: headers,
         }
      );

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

      // -----------------------------------------------------------------------------//
      // Get Pengalaman Penelitian
      // -----------------------------------------------------------------------------//
      const responsePP = await fetch(
         $apiURL + "/pengalamanPenelitian/" + uidProposal,
         {
            method: "GET",
            headers: headers,
         }
      );

      const resultPP = await responsePP.json();

      if (responsePP.status === 401) {
         // localStorage.clear();
         location.pathname = "/tokenexpired";
      } else {
         if (responsePP.ok) {
            dataPP = resultPP.dbData;
         } else {
            console.log(responsePP);
         }
      }

      // -----------------------------------------------------------------------------//
      // Get Pengalaman Pengmas
      // -----------------------------------------------------------------------------//
      const responsePM = await fetch(
         $apiURL + "/pengalamanPengmas/" + uidProposal,
         {
            method: "GET",
            headers: headers,
         }
      );

      const resultPM = await responsePM.json();

      if (responsePM.status === 401) {
         // localStorage.clear();
         location.pathname = "/tokenexpired";
      } else {
         if (responsePM.ok) {
            dataPM = resultPM.dbData;
         } else {
            console.log(responsePM);
         }
      }

      // -----------------------------------------------------------------------------//
      // Get Pengalaman Diseminasi
      // -----------------------------------------------------------------------------//
      const responsePD = await fetch(
         $apiURL + "/pengalamanDiseminasi/" + uidProposal,
         {
            method: "GET",
            headers: headers,
         }
      );

      const resultPD = await responsePD.json();

      if (responsePD.status === 401) {
         // localStorage.clear();
         location.pathname = "/tokenexpired";
      } else {
         if (responsePD.ok) {
            dataPD = resultPD.dbData;
         } else {
            console.log(responsePD);
         }
      }

      // -----------------------------------------------------------------------------//
      // Get Pengalaman Publikasi
      // -----------------------------------------------------------------------------//
      const responsePPub = await fetch(
         $apiURL + "/pengalamanPublikasi/" + uidProposal,
         {
            method: "GET",
            headers: headers,
         }
      );

      const resultPPub = await responsePPub.json();

      if (responsePPub.status === 401) {
         // localStorage.clear();
         location.pathname = "/tokenexpired";
      } else {
         if (responsePPub.ok) {
            dataPPub = resultPPub.dbData;
         } else {
            console.log(responsePPub);
         }
      }

      // -----------------------------------------------------------------------------//
      // Get Pengalaman Penulisan Buku
      // -----------------------------------------------------------------------------//
      const responsePPB = await fetch(
         $apiURL + "/pengalamanPenulisanBuku/" + uidProposal,
         {
            method: "GET",
            headers: headers,
         }
      );

      const resultPPB = await responsePPB.json();

      if (responsePPB.status === 401) {
         // localStorage.clear();
         location.pathname = "/tokenexpired";
      } else {
         if (responsePPB.ok) {
            dataPPB = resultPPB.dbData;
         } else {
            console.log(responsePPB);
         }
      }

      // -----------------------------------------------------------------------------//
      // Get Pengalaman Hak Kekayaan Intelektual
      // -----------------------------------------------------------------------------//
      const responsePHKI = await fetch(
         $apiURL + "/pengalamanHKI/" + uidProposal,
         {
            method: "GET",
            headers: headers,
         }
      );

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
   });

   async function handleRevisi() {
      error = {};
      isLoading = true;

      let payload = {
         comment,
         status: Number(data.status) - 1,
         id,
      };

      let payloadCttnRevisi = {
         ppmId,
         comment,
         namaLengkapEvl,
      };

      if (!payload.comment) {
         error.comment = `This field is required`;
      }

      if (Object.keys(error).length > 0) {
         showModalErrorRevisi = true;
      } else {
         // ==========================//
         //    API RiwayatCttnRevisi
         // ==========================//
         const responseRev = await fetch($apiURL + "/riwayatCatatanRevisi", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payloadCttnRevisi),
         });

         const resultRev = await responseRev.json();

         if (responseRev.status === 401) {
            location.pathname = "/tokenexpired";
         } else {
            if (!responseRev.ok) {
               console.log(responseRev);
               // Buat Handle Error
               // ...
            }
         }
         // ==========================//
         //          API PPM
         // ==========================//
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
               $route("/dosen/approvalmanagement");
            } else {
               console.log(response);
               // Buat Handle Error
               // ...
            }
         }
      }
      isLoading = false;
   }

   async function handleDitolak() {
      isLoading = true;

      const payload = {
         comment: "",
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
            $route("/dosen/approvalmanagement");
         } else {
            console.log(response);
            // Buat Handle Error
            // ...
         }
      }
      isLoading = false;
   }

   async function handlePass() {
      isLoading = true;

      const payload = {
         comment: "",
         status: Number(data.status) + 2,
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
            $route("/dosen/approvalmanagement");
         } else {
            console.log(response);
            // Buat Handle Error
            // ...
         }
      }
      isLoading = false;
   }

   async function handlePassReviewer() {
      error = {};
      isLoading = true;
      const readerPenilaian = new FileReader();

      const payload = {
         comment: "",
         status: Number(data.status) + 2,
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
                  // Buat Handle Error
                  // ...
               }
            };
            readerPenilaian.readAsDataURL(filePenilaian);
         }
         // =================================================================//
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
               $route("/dosen/approvalmanagement");
            } else {
               console.log(response);
               // Buat Handle Error
               // ...
            }
         }
      }
      isLoading = false;
   }

   async function searchUser(ev) {
      const response = await fetch($apiURL + "/user");
      const result = await response.json();

      if (response.ok) {
         showModal = true;
      }
   }

   let options;

   async function findRole(role) {
      // const response = await fetch($apiURL + "/role/" + role);
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

   function filePenilaianChange(e) {
      filePenilaian = e.target.files[0];
      $penilaianFile = e.target.files[0];
   }

   function isObjectEmpty(objectName) {
      return (
         objectName &&
         Object.keys(objectName).length === 0 &&
         objectName.constructor === Object
      );
   }
   // $: console.log(data);
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

      {#if tab1 === true}
         <div class="box">
            <Field name="Jenis Proposal">
               {jenisProposal}
            </Field>

            <Field name="Jenis Kegiatan">
               {jenisKegiatan}
            </Field>

            <Field name="Jenis Skema">
               {jenisSkema}
            </Field>

            <Field name="Kelompok Keahlian">
               {kelompokKeahlian}
            </Field>

            <Field name="Topik">
               {topik}
            </Field>

            <Field name="Tanggal Mulai">
               {tanggalMulai}
            </Field>

            <Field name="Tanggal Selesai">
               {tanggalSelesai}
            </Field>

            <Field name="Biaya Penelitian">
               {biayaPenelitian}
            </Field>

            <Field name="Anggota Tim">
               <span></span>
            </Field>
            <br />
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

            <hr />

            <Field name="Judul">
               {data.judul}
            </Field>

            <Field name="abstrak">
               {@html data.abstrak}
            </Field>

            <!-- <Field name="isi">
            <div class="box box-padding">
               {@html data.isi}
            </div>
         </Field> -->
            <Field name="Proposal">
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
            {/if}

            {#if jenisSkema === "Riset Kelompok Keahlian" || jenisSkema === "Riset Terapan" || jenisSkema === "Riset Kerjasama" || jenisSkema === "Pengabdian Masyarakat Desa Binaan" || jenisSkema === "Pengabdian Masyarakat UMKM Binaan"}
               {#if status === 8}
                  <Field name="Penilaian Proposal">
                     <span class="inputf__wrapper">
                        <input
                           id="filePenilaian"
                           class="inputf custom-file-input"
                           accept=".xlsx"
                           type="file"
                           on:change={filePenilaianChange}
                        />
                        <div class="file has-name is-success is-small">
                           <label class="file-label" for="filePenilaian">
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
                              {#if $penilaianFile?.name}
                                 <span class="file-name">
                                    {$penilaianFile.name}</span
                                 >
                              {:else}
                                 <span class="file-name">No file chosen</span>
                              {/if}
                           </label>
                        </div>
                        {#if error.filePenilaian}
                           <p class="error has-text-danger">
                              {error.filePenilaian}
                           </p>
                        {/if}
                     </span>
                     <p class="help">File Type: xlsx</p>
                  </Field>
               {/if}

               {#if status > 8}
                  <Field name="Penilaian Proposal">
                     <button
                        class="button is-link button is-small"
                        on:click={handleDownloadPenilaian}
                        >Download Penilaian</button
                     >
                  </Field>
               {/if}
            {/if}
         </div>

         <!-- ========================================== -->
         <!--              Catatan Revisi                -->
         <!-- ========================================== -->
         <div class="box">
            <h4 class="title is-4">Informasi Revisi</h4>
            <hr />

            {#if status != 8}
               <div class="notification is-warning is-light">
                  <p>Berikan catatan revisi jika ingin revisi proposal.</p>
               </div>

               <Field name="Catatan Revisi">
                  <textarea
                     class="textarea"
                     bind:value={comment}
                     name="komentar"
                     id="komentar"
                  ></textarea>
                  {#if error.comment}
                     <p class="help error is-danger">{error.comment}</p>
                  {/if}
               </Field>
               <br />
            {/if}

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

         <!-- ========================================== -->
         <!--              Action Button                 -->
         <!-- ========================================== -->
         {#if role === "Ka.Departemen"}
            {#if status === 4}
               <div class="field is-grouped is-grouped-right">
                  <p class="control">
                     <button
                        class="button is-info"
                        on:click={handlePass}
                        class:is-loading={isLoading}>Proses</button
                     >
                  </p>
               </div>
            {/if}
         {/if}

         {#if role === "Ka.LPPM"}
            {#if status === 6}
               <div class="field is-grouped is-grouped-right">
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
                        class:is-loading={isLoading}>Proses</button
                     >
                  </p>
               </div>
            {/if}
         {/if}

         {#if role === "reviewer"}
            {#if status === 8}
               <div class="field is-grouped is-grouped-right">
                  <p class="control">
                     <button
                        class="button is-info"
                        on:click={handlePassReviewer}
                        class:is-loading={isLoading}>Proses</button
                     >
                  </p>
               </div>
            {/if}
         {/if}

         {#if role === "Ka.PusatKajian"}
            {#if status === 10}
               <div class="field is-grouped is-grouped-right">
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
                        class:is-loading={isLoading}>Proses</button
                     >
                  </p>
               </div>
            {/if}
         {/if}
      {/if}

      {#if tab2 === true}
         <div class="box">
            <Field name="Nama Lengkap">{namaLengkap}</Field>
            <Field name="Jabatan Fungsional">{jabatanFungsional}</Field>
            <Field name="NIP">{nip}</Field>
            <Field name="NIDN">{nidn}</Field>
            <Field name="Tempat / Tanggal Lahir"
               >{tempatLahir} / {tanggalLahir}</Field
            >
            <Field name="Alamat Rumah">{alamatRumah}</Field>
            <Field name="Telp/Fax Rumah">{telpFaxRumah}</Field>
            <Field name="Nomoh Handphone">{nomorHandphone}</Field>
            <Field name="Alamat Kantor">{alamatKantor}</Field>
            <Field name="Telp/Fax Kantor">{telpFaxKantor}</Field>
            <Field name="Email">{email}</Field>

            <table
               class="table mt-5 is-fullwidth is-striped is-hoverable is-bordered"
            >
               <thead>
                  <tr>
                     <th>Mata Kuliah yang diampu</th>
                  </tr>
               </thead>
               <tbody>
                  {#if mataKuliah && mataKuliah.length > 0}
                     {#each mataKuliah as matkul}
                        <tr>
                           <td>{matkul.label}</td>
                        </tr>
                     {/each}
                  {/if}
               </tbody>
            </table>
         </div>

         <!-- =========================================== -->
         <!--              Riwayat Pendidikan             -->
         <!-- =========================================== -->
         <div class="box">
            <div class="mb-6">
               <h6 class="title is-6">Riwayat Pendidikan S1</h6>
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
                     {#if dataRPS1}
                        {#each dataRPS1 as RPS1}
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

            <div class="mb-6">
               <h6 class="title is-6">Riwayat Pendidikan S2</h6>
               <table
                  class="table is-fullwidth is-striped is-hoverable is-bordered"
               >
                  <thead>
                     <tr>
                        <th style="width: 25%;">Nama Perguruan Tinggi</th>
                        <th style="width: 20%;">Bidang Ilmu</th>
                        <th style="width: 10%;">Tahun Masuk</th>
                        <th style="width: 10%;">Tahun Lulus</th>
                        <th style="width: 35%;">Judul Tesis</th>
                     </tr>
                  </thead>
                  <tbody>
                     {#if dataRPS2}
                        {#each dataRPS2 as RPS2}
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
            </div>

            <div>
               <h6 class="title is-6">Riwayat Pendidikan S3</h6>
               <table
                  class="table is-fullwidth is-striped is-hoverable is-bordered"
               >
                  <thead>
                     <tr>
                        <th style="width: 25%;">Nama Perguruan Tinggi</th>
                        <th style="width: 20%;">Bidang Ilmu</th>
                        <th style="width: 10%;">Tahun Masuk</th>
                        <th style="width: 10%;">Tahun Lulus</th>
                        <th style="width: 35%;">Judul Disertasi</th>
                     </tr>
                  </thead>
                  <tbody>
                     {#if dataRPS3}
                        {#each dataRPS3 as RPS3}
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
            </div>
         </div>

         <!-- =========================================== -->
         <!--                  Pengalaman                 -->
         <!-- =========================================== -->
         <div class="box">
            <h6 class="title is-6">Pengalaman Penelitian</h6>

            <table
               class="table is-fullwidth is-striped is-hoverable is-bordered"
            >
               <thead>
                  <tr>
                     <th class="is-narrow">Tahun</th>
                     <th>Judul Penelitian</th>
                     <th class="is-narrow">Ketua / Anggota</th>
                     <th class="is-narrow">Sumber Dana</th>
                     <th class="is-narrow">Jumlah Rp.</th>
                  </tr>
               </thead>
               <tbody>
                  {#if dataPP}
                     {#each dataPP as PP}
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
         </div>

         <div class="box">
            <h6 class="title is-6">Pengalaman Pengabdian Masyarakat</h6>

            <table
               class="table is-fullwidth is-striped is-hoverable is-bordered"
            >
               <thead>
                  <tr>
                     <th class="is-narrow">Tahun</th>
                     <th>Judul Pengabdian Masyarakat</th>
                     <th class="is-narrow">Ketua / Anggota</th>
                     <th class="is-narrow">Sumber Dana</th>
                     <th class="is-narrow">Jumlah Rp.</th>
                  </tr>
               </thead>
               <tbody>
                  {#if dataPM}
                     {#each dataPM as PM}
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
         </div>

         <div class="box">
            <h6 class="title is-6">
               Pengalaman Diseminasi Ilmiah dalam Pertemuan / Pameran
            </h6>

            <table
               class="table is-fullwidth is-striped is-hoverable is-bordered"
            >
               <thead>
                  <tr>
                     <th class="is-narrow">Tahun</th>
                     <th>Judul Artikel</th>
                     <th>Nama Pemakalah</th>
                     <th class="is-narrow">Nama Pertemuan Ilmiah / Pameran</th>
                  </tr>
               </thead>
               <tbody>
                  {#if dataPD}
                     {#each dataPD as PD}
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
         </div>

         <div class="box">
            <h6 class="title is-6">
               Pengalaman Publikasi Ilmiah dalam Jurnal (bukan Proceeding)
            </h6>

            <table
               class="table is-fullwidth is-striped is-hoverable is-bordered"
            >
               <thead>
                  <tr>
                     <th class="is-narrow">Tahun</th>
                     <th>Judul Artikel</th>
                     <th>Nama Penulis</th>
                     <th>Nama Jurnal, Vol., No Issue/No Artikel, Halaman</th>
                     <th>Impact Factor/Scopus Quarter/Akreditasi</th>
                  </tr>
               </thead>
               <tbody>
                  {#if dataPPub}
                     {#each dataPPub as PPub}
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
         </div>

         <div class="box">
            <h6 class="title is-6">Pengalaman Penulisan Buku</h6>

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
                  {#if dataPPB}
                     {#each dataPPB as PPB}
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
         </div>

         <div class="box">
            <h6 class="title is-6">Pengalaman Hak Kekayaan Intelektual</h6>

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
                  {#if dataPHKI}
                     {#each dataPHKI as PHKI}
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
         </div>
      {/if}
   </Article>
{/if}

<Modalerror bind:show={showModalErrorRevisi}>
   <p>Berikan catatan revisi jika ingin revisi proposal.</p>
</Modalerror>

<Modalerror bind:show={showModalErrorPassReviewer}>
   <p>Anda belum mengupload file penilaian proposal</p>
</Modalerror>

<style>
   /*
   .box-padding {
      padding: 4.724rem;
   }
   */
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
</style>
