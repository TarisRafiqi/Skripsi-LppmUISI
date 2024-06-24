<script>
   import { route, apiURL, penilaianFile } from "../../store";
   import Modalerror from "../../libs/Modalerror.svelte";
   import Fieldview from "../../libs/Fieldview.svelte";
   import { downloadIcon } from "../../store/icons";
   import Article from "../../libs/Article.svelte";
   import Icon from "../../libs/Icon.svelte";
   import { onMount } from "svelte";
   export let params;

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

   const namaLengkapEvl = localStorage.getItem("nama_lengkap");
   const role = localStorage.getItem("role");
   const id = params["1"];

   let showModalErrorPassReviewer = false;
   let showModalErrorRevisi = false;
   let isLoading = false;

   let randomPenilaianFileName = "";
   let biodataAnggota = [];
   let error = {};
   let filePenilaian;
   let data;
   let itemsRCR;
   let jenisProposal,
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
      status;

   const accessToken = localStorage.getItem("token");
   const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
   };

   // Memakai akses token, hanya uid yang bersangkutan, dan role admin yang boleh mengakses halaman ini
   onMount(async () => {
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
            rab = data.rab;
            judul = data.judul;
            abstrak = data.abstrak;
            comment = data.comment;
            status = data.status;

            randomRabFileName = data.random_rab_file_name;
            randomPpmFileName = data.random_ppm_file_name;
            randomPenilaianFileNamedb = data.random_penilaian_file_name;
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

   function ShowRPButton() {
      const StatusForInternal = [12];
      const StatusForEksternal = [10];
      const StatusForMandiri = [10];

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

   function ShowReviewerButton() {
      const StatusReviewReviewer = [6];

      if (
         skemaInternal.includes(data.jenis_skema) &&
         StatusReviewReviewer.includes(data.status)
      ) {
         return true;
      }
   }

   function ShowRDPButton() {
      const ReviewKpkKlppmSkemaInternal = [8];
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

      <!-- Tab Detail PPM -->
      {#if tab1 === true}
         <div class="box">
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
               <Fieldview title="Biaya Penelitian" content={biayaPenelitian} />
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
                              on:click={handleDownloadRab}>Download RAB</button
                           >
                        </p>
                     </div>
                  </div>
               {/if}
            </div>

            {#if (jenisSkema === "Riset Kelompok Keahlian" || jenisSkema === "Riset Terapan" || jenisSkema === "Riset Kerjasama" || jenisSkema === "Pengabdian Masyarakat Desa Binaan" || jenisSkema === "Pengabdian Masyarakat UMKM Binaan") && status === 6}
               <div class="field">
                  <p class="title is-6"><b>Penilaian Proposal</b></p>
               </div>
               <span class="inputf__wrapper mb-1">
                  <input
                     id="filePenilaian"
                     class="inputf custom-file-input"
                     accept=".xlsx"
                     type="file"
                     on:change={filePenilaianChange}
                  />
                  <div class="file has-name is-success is-small">
                     <label class="file-label" for="filePenilaian">
                        <input class="file-input" type="file" name="resume" />
                        <span class="file-cta">
                           <span class="file-icon">
                              <Icon id="download" src={downloadIcon} />
                           </span>
                           <span class="file-label"> Choose a file</span>
                        </span>
                        {#if $penilaianFile?.name}
                           <span class="file-name"> {$penilaianFile.name}</span>
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
            {:else if (jenisSkema === "Riset Kelompok Keahlian" || jenisSkema === "Riset Terapan" || jenisSkema === "Riset Kerjasama" || jenisSkema === "Pengabdian Masyarakat Desa Binaan" || jenisSkema === "Pengabdian Masyarakat UMKM Binaan") && status >= 6}
               <div class="field">
                  <p class="title is-6"><b>File Penilaian Proposal</b></p>
                  <p class="subtitle is-6">
                     <button
                        class="button is-link button is-small"
                        on:click={handleDownloadPenilaian}
                        >Download Penilaian</button
                     >
                  </p>
               </div>
            {/if}

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
         </div>

         <!-- ========================================== -->
         <!--              Catatan Revisi                -->
         <!-- ========================================== -->
         {#if role !== "K.Departemen" && role !== "reviewer"}
            <div class="box">
               <h5 class="title is-5">Informasi Revisi Proposal</h5>
               <div class="notification is-warning is-light">
                  <p>Berikan catatan revisi jika ingin revisi proposal</p>
               </div>

               <div class="field">
                  <p class="title is-6"><b>Catatan Revisi</b></p>
                  <textarea
                     class="textarea mb-1"
                     bind:value={comment}
                     name="komentar"
                     id="komentar"
                  ></textarea>
                  {#if error.comment}
                     <p class="help error is-danger">{error.comment}</p>
                  {/if}
               </div>

               <hr />
               <!-- {/if} -->

               <table
                  class="table is-fullwidth is-striped is-hoverable is-bordered"
               >
                  <thead>
                     <tr>
                        <th style="width: 70%;">Catatan Revisi</th>
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

         <!-- ========================================== -->
         <!--              Action Button                 -->
         <!-- ========================================== -->
         {#if role === "K.Departemen"}
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

         {#if role === "reviewer"}
            {#if ShowReviewerButton()}
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

         {#if role === "K.PusatKajian" || role === "K.LPPM"}
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
                     class:is-loading={isLoading}>Proses</button
                  >
               </p>
            {/if}
         {/if}

         {#if role === "K.PusatKajian" || role === "K.LPPM"}
            {#if ShowRDPButton()}
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

<Modalerror bind:show={showModalErrorRevisi}>
   <p>Berikan catatan revisi jika ingin revisi proposal.</p>
</Modalerror>

<Modalerror bind:show={showModalErrorPassReviewer}>
   <p>Anda belum mengupload file penilaian proposal</p>
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
