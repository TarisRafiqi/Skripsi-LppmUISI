<script>
   import { onMount } from "svelte";
   import { route, apiURL } from "../../store";
   import Article from "../../libs/Article.svelte";
   import Field from "../../libs/Field.svelte";
   import Status from "../../modules/Status.svelte";
   import Modalerror from "../../libs/Modalerror.svelte";

   export let params;

   let showModalError = false;
   const id = params["1"];
   const role = localStorage.getItem("role");
   const idEvaluator = localStorage.getItem("id");
   let showModal = false;

   let data, dataGP, dataPP, dataPM, dataPD, dataPPub, dataPPB, dataPHKI;
   let itemsRCR;
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
      isi,
      comment,
      status,
      kdeptSelected,
      klppmSelected,
      kpkSelected,
      reviewerSelected;

   // Memakai akses token, hanya uid yang bersangkutan, dan role admin yang boleh mengakses halaman ini
   onMount(async () => {
      const accessToken = localStorage.getItem("token");

      const headers = {
         Authorization: `${accessToken}`,
         "Content-Type": "application/json",
      };

      ka_departemen = await findRole(11);
      ka_lppm = await findRole(12);
      ka_pusat_kajian = await findRole(13);
      reviewer = await findRole(10);

      const response = await fetch($apiURL + "/ppm/" + id, {
         method: "GET",
         headers: headers,
      });
      const result = await response.json();

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
         isi = data.isi;
         comment = data.comment;
         status = data.status;
         kdeptSelected = data.uid_kdept;
         klppmSelected = data.uid_klppm;
         kpkSelected = data.uid_kpk;
         reviewerSelected = data.uid_reviewer;
         randomRabFileName = data.random_rab_file_name;
         randomPpmFileName = data.random_ppm_file_name;
      }
      // -----------------------------------------------------------------------------//
      // Get Nama Lengkap Evaluator
      // -----------------------------------------------------------------------------//
      const responseEvl = await fetch($apiURL + "/user/" + idEvaluator, {
         method: "GET",
         headers: headers,
      });

      const resultEvl = await responseEvl.json();

      if (responseEvl.ok) {
         dataEvl = resultEvl;
         namaLengkapEvl = dataEvl.nama_lengkap;
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

      if (responseRCR.ok) {
         itemsRCR = dataRCR.dbData;
      }

      // -----------------------------------------------------------------------------//
      // Get Profile
      // -----------------------------------------------------------------------------//
      const responseGP = await fetch($apiURL + "/user/" + uidProposal, {
         method: "GET",
         headers: headers,
      });

      const resultGP = await responseGP.json();

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

      // -----------------------------------------------------------------------------//
      // Get Riwayat Pendidikan
      // -----------------------------------------------------------------------------//
      const responseRP = await fetch(
         $apiURL + "/riwayatpendidikan/" + uidProposal,
         {
            method: "GET",
            headers: headers,
         }
      );

      const dataRP = await responseRP.json();

      if (responseRP.ok) {
         pertiS1 = dataRP.nama_perti_s1;
         pertiS2 = dataRP.nama_perti_s2;
         pertiS3 = dataRP.nama_perti_s3;

         bidangIlmuS1 = dataRP.bidang_ilmu_s1;
         bidangIlmuS2 = dataRP.bidang_ilmu_s2;
         bidangIlmuS3 = dataRP.bidang_ilmu_s3;

         tahunMasukS1 = dataRP.tahun_masuk_s1;
         tahunMasukS2 = dataRP.tahun_masuk_s2;
         tahunMasukS3 = dataRP.tahun_masuk_s3;

         tahunLulusS1 = dataRP.tahun_lulus_s1;
         tahunLulusS2 = dataRP.tahun_lulus_s2;
         tahunLulusS3 = dataRP.tahun_lulus_s3;

         judulTugasAkhirS1 = dataRP.judul_tugasakhir_s1;
         judulTugasAkhirS2 = dataRP.judul_tugasakhir_s2;
         judulTugasAkhirS3 = dataRP.judul_tugasakhir_s3;
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

      if (responsePP.ok) {
         dataPP = resultPP.dbData;
      } else {
         console.log(responsePP);
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

      if (responsePM.ok) {
         dataPM = resultPM.dbData;
      } else {
         console.log(responsePM);
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

      if (responsePD.ok) {
         dataPD = resultPD.dbData;
      } else {
         console.log(responsePD);
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

      if (responsePPub.ok) {
         dataPPub = resultPPub.dbData;
      } else {
         console.log(responsePPub);
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

      if (responsePPB.ok) {
         dataPPB = resultPPB.dbData;
      } else {
         console.log(responsePPB);
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

      if (responsePHKI.ok) {
         dataPHKI = resultPHKI.dbData;
      } else {
         console.log(responsePHKI);
      }
   });

   async function handleRevisi() {
      const komentar = document.getElementById("komentar");
      // -------------------------
      //    API RiwayatCttnRevisi
      // -------------------------
      const payloadCttnRevisi = {
         ppmId,
         comment,
         namaLengkapEvl,
      };

      if (komentar.value === "" || komentar.value == null) {
         showModalError = true;
      } else {
         const responseRev = await fetch($apiURL + "/riwayatCatatanRevisi", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(payloadCttnRevisi),
         });

         const resultRev = await responseRev.json();

         // -----------------------------
         //          API PPM
         // -----------------------------
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
            id,
            judul,
            abstrak,
            isi,
            comment,
            status: Number(data.status) - 1,
            kdeptSelected,
            klppmSelected,
            kpkSelected,
            reviewerSelected,
            randomRabFileName,
            randomPpmFileName,
         };

         const response = await fetch($apiURL + "/ppm", {
            method: "PATCH",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
         });

         const result = await response.json();

         if (response.ok) {
            $route("/dosen/approval");
         } else {
            console.log(response);
         }
      }
   }

   async function handleDitolak() {
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
         id,
         judul,
         abstrak,
         isi,
         comment,
         status: Number(data.status) + 1,
         kdeptSelected,
         klppmSelected,
         kpkSelected,
         reviewerSelected,
         randomRabFileName,
         randomPpmFileName,
      };

      const response = await fetch($apiURL + "/ppm", {
         method: "PATCH",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
         $route("/dosen/approval");
      } else {
         console.log(response);
      }
   }

   async function handlePass() {
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
         id,
         judul,
         abstrak,
         isi,
         comment: "",
         status: Number(data.status) + 2,
         kdeptSelected,
         klppmSelected,
         kpkSelected,
         reviewerSelected,
         randomRabFileName,
         randomPpmFileName,
      };

      const response = await fetch($apiURL + "/ppm", {
         method: "PATCH",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
         $route("/dosen/approval");
      } else {
         console.log(response);
      }
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
      const response = await fetch($apiURL + "/role/" + role);
      const result = await response.json();

      if (response.ok) {
         options = result;
         return options;
      } else {
         console.log(response);
      }
   }

   async function handleDownloadRab(e) {
      const accessToken = localStorage.getItem("token");
      const headers = {
         Authorization: `${accessToken}`,
         "Content-Type": "application/json",
      };
      let filename = "rab.xlsx";
      try {
         const response = await fetch(
            $apiURL + `/uploadRab/${randomRabFileName}`,
            {
               method: "GET",
               headers: headers,
            }
         );
         const blob = await response.blob();
         const link = document.createElement("a");
         link.href = window.URL.createObjectURL(blob);
         link.download = filename;
         link.click();
      } catch (error) {
         console.error("Error downloading file:", error);
      }
   }

   async function handleDownloadPpm(e) {
      const accessToken = localStorage.getItem("token");
      const headers = {
         Authorization: `${accessToken}`,
         "Content-Type": "application/json",
      };
      let filename = "proposal.pdf";
      try {
         const response = await fetch(
            $apiURL + `/uploadPpm/${randomPpmFileName}`,
            {
               method: "GET",
               headers: headers,
            }
         );
         const blob = await response.blob();
         const link = document.createElement("a");
         link.href = window.URL.createObjectURL(blob);
         link.download = filename;
         link.click();
      } catch (error) {
         console.error("Error downloading file:", error);
      }
   }

   let tab1 = true;
   let tab2;
   let tab3;
   let tab4;
   let tab5;
   let tab6;

   function clicktab1() {
      tab1 = true;
      tab2 = false;
      tab3 = false;
      tab4 = false;
      tab5 = false;
      tab6 = false;
   }

   function clicktab2() {
      tab1 = false;
      tab2 = true;
      tab3 = false;
      tab4 = false;
      tab5 = false;
      tab6 = false;
   }

   function clicktab3() {
      tab1 = false;
      tab2 = false;
      tab3 = true;
      tab4 = false;
      tab5 = false;
      tab6 = false;
   }

   function clicktab4() {
      tab1 = false;
      tab2 = false;
      tab3 = false;
      tab4 = true;
      tab5 = false;
      tab6 = false;
   }

   function clicktab5() {
      tab1 = false;
      tab2 = false;
      tab3 = false;
      tab4 = false;
      tab5 = true;
      tab6 = false;
   }

   function clicktab6() {
      tab1 = false;
      tab2 = false;
      tab3 = false;
      tab4 = false;
      tab5 = false;
      tab6 = true;
   }
</script>

{#if data}
   <Article>
      <Modalerror bind:show={showModalError}>
         <p>
            <b>Catatan Revisi</b> masih kosong! <br /> Isi catatan revisi sebagai
            acuan peneliti untuk memperbaiki kesalahan!
         </p>
      </Modalerror>

      <h1 class="title is-1">Detail PPM</h1>

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
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <li on:click={clicktab3} class:is-active={tab3}>
               <!-- svelte-ignore a11y-missing-attribute -->
               <a>
                  <span>Status</span>
               </a>
            </li>
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <li on:click={clicktab4} class:is-active={tab4}>
               <!-- svelte-ignore a11y-missing-attribute -->
               <a>
                  <span>Logbook</span>
               </a>
            </li>
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <li on:click={clicktab5} class:is-active={tab5}>
               <!-- svelte-ignore a11y-missing-attribute -->
               <a>
                  <span>Monev</span>
               </a>
            </li>
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <li on:click={clicktab6} class:is-active={tab6}>
               <!-- svelte-ignore a11y-missing-attribute -->
               <a>
                  <span>Laporan</span>
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

            <Field name="Rencana Anggaran Biaya">
               <button
                  class="button is-link is-rounded button is-small"
                  on:click={handleDownloadRab}>Download RAB</button
               >
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
                  <tr>
                     <td>Ketua</td>
                     <td>...</td>
                  </tr>
                  {#if anggotaTim.length > 0}
                     {#each anggotaTim as member}
                        <tr>
                           <td>Anggota</td>
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
                  class="button is-link is-rounded button is-small"
                  on:click={handleDownloadPpm}>Download Proposal</button
               >
            </Field>

            <hr />

            <Field name="Catatan Revisi">
               <textarea
                  class="textarea"
                  bind:value={comment}
                  name="komentar"
                  id="komentar"
               ></textarea>
            </Field>

            <Field name="Riwayat Revisi">
               <table
                  class="table is-fullwidth is-striped is-hoverable is-bordered"
               >
                  <thead>
                     <tr>
                        <th>Catatan Revisi</th>
                        <th>Evalutor</th>
                        <th class="is-narrow">Waktu</th>
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
            </Field>
         </div>

         {#if role === "Ka.Departemen"}
            {#if status === 4}
               <div class="field is-grouped is-grouped-right">
                  <p class="control">
                     <button
                        class="button is-info is-light is-outlined"
                        on:click={handleRevisi}>Revisi</button
                     >
                  </p>
                  <p class="control">
                     <button class="button is-info" on:click={handlePass}
                        >Proses</button
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
                        on:click={handleRevisi}>Revisi</button
                     >
                  </p>
                  <p class="control">
                     <button class="button is-info" on:click={handlePass}
                        >Proses</button
                     >
                  </p>
               </div>
            {/if}
         {/if}

         {#if role === "reviewer"}
            {#if status === 8}
               <div class="field is-grouped is-grouped-right">
                  <p class="control">
                     <button class="button is-info" on:click={handlePass}
                        >Proses</button
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
                        on:click={handleRevisi}>Revisi</button
                     >
                  </p>

                  <p class="control">
                     <button
                        class="button is-danger is-light is-outlined"
                        on:click={handleDitolak}>Ditolak</button
                     >
                  </p>

                  <p class="control">
                     <button class="button is-info" on:click={handlePass}
                        >Proses</button
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
            <Field name="Mata Kuliah">
               <table
                  class="table is-fullwidth is-striped is-hoverable is-bordered"
               >
                  <thead>
                     <tr>
                        <th>Mata Kuliah</th>
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
            </Field>
         </div>

         <div class="box">
            <h6 class="title is-6">Riwayat Pendidikan</h6>

            <table
               class="table is-fullwidth is-striped is-hoverable is-bordered"
            >
               <thead>
                  <tr>
                     <th class="is-narrow">Program</th>
                     <th class="is-narrow">S1</th>
                     <th class="is-narrow">S2</th>
                     <th class="is-narrow">S3</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <th>Nama Perguruan Tinggi</th>
                     <td>{pertiS1}</td>
                     <td>{pertiS2}</td>
                     <td>{pertiS3}</td>
                  </tr>
                  <tr>
                     <th>Bidang Ilmu</th>
                     <td>{bidangIlmuS1}</td>
                     <td>{bidangIlmuS2}</td>
                     <td>{bidangIlmuS3}</td>
                  </tr>
                  <tr>
                     <th>Tahun Masuk</th>
                     <td>{tahunMasukS1}</td>
                     <td>{tahunMasukS2}</td>
                     <td>{tahunMasukS3}</td>
                  </tr>
                  <tr>
                     <th>Tahun Lulus</th>
                     <td>{tahunLulusS1}</td>
                     <td>{tahunLulusS2}</td>
                     <td>{tahunLulusS3}</td>
                  </tr>
                  <tr>
                     <th>Judul Skripsi/Tesis/Disertasi</th>
                     <td>{judulTugasAkhirS1}</td>
                     <td>{judulTugasAkhirS2}</td>
                     <td>{judulTugasAkhirS3}</td>
                  </tr>
               </tbody>
            </table>
         </div>

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

      {#if tab3 === true}
         <div class="box">
            <Field name="Status PPM">
               <Status code={data.status} />
            </Field>

            <Field name="Status Pendanaan">. . .</Field>
         </div>
      {/if}

      {#if tab4 === true}
         <div class="columns notification is-info is-light">
            <div class="column">
               <p>
                  Lorem ipsum <strong>LogBook</strong> sit amet consectetur adipisicing
                  elit. Totam suscipit placeat amet.
               </p>
            </div>
         </div>
      {/if}

      {#if tab5 === true}
         <div class="columns notification is-success is-light">
            <div class="column">
               <p>
                  Lorem ipsum <strong>Monev</strong> sit amet consectetur adipisicing
                  elit. Totam suscipit placeat amet.
               </p>
            </div>
         </div>
      {/if}

      {#if tab6 === true}
         <div class="columns notification is-link is-light">
            <div class="column">
               <p>
                  Lorem ipsum <strong>Laporan</strong> sit amet consectetur adipisicing
                  elit. Totam suscipit placeat amet.
               </p>
            </div>
         </div>
      {/if}
   </Article>
{/if}

<style>
   /*
   .box-padding {
      padding: 4.724rem;
   }
   */
</style>
