<script>
   import { onMount } from "svelte";
   import { route, apiURL } from "../../store";
   import Article from "../../libs/Article.svelte";
   import Icon from "../../libs/Icon.svelte";
   import Field from "../../libs/Field.svelte";
   import {
      deleteIcon,
      penelitian,
      accountEdit,
      check,
   } from "../../store/icons";
   import Select from "../../libs/Select.svelte";

   let value;
   let label;
   let warningFormText = false;

   let jenisKegiatan = "";
   let jenisProposal = "";
   let jenisSkema = "";
   let kelompokKeahlian = "";
   let judul = "";
   let tanggalMulai = "";
   let tanggalSelesai = "";
   let topik = "";
   let biayaPenelitian = "";
   let anggotaTim = [];
   let rab = "";
   let randomRabFileName = "";
   let randomPpmFileName = "";

   let myAbstract;
   let myIsi;

   const id = Number(localStorage.getItem("id"));
   let items = [];
   let fileRab;
   let filePpm;

   // function getDataStep() {
   //    const currentStep = 1 + "";
   //    let dataSteps = document.querySelectorAll("[data-step]");

   //    if (dataSteps) {
   //       // loop sebanyak data-step yg diperoleh.
   //       dataSteps.forEach((dataStep) => {
   //          const step = dataStep.dataset.step;
   //          if (step === currentStep) {
   //             dataStep.classList.add("is-active");
   //          } else {
   //             dataStep.classList.remove("is-active");
   //          }
   //       });
   //    }
   // }

   onMount(async () => {
      const accessToken = localStorage.getItem("token");

      const headers = {
         Authorization: `${accessToken}`,
         "Content-Type": "application/json",
      };

      const response = await fetch($apiURL + "/pilihUser", {
         method: "GET",
         headers: headers,
      });

      const result = await response.json();

      if (response.ok) {
         listUser = result;
         items = [];
         for (const [key, value] of Object.entries(listUser)) {
            items.push({
               value: value.uid,
               label: value.nama_lengkap,
               // role: "Anggota",
            });
         }
      } else {
         console.log(response);
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
   });

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

   async function simpanProposal() {
      // myAbstract = tinymce.get("abstract").getContent();
      // myIsi = tinymce.get("isi").getContent();

      const accessToken = localStorage.getItem("token");
      const readerRab = new FileReader();
      const readerPpm = new FileReader();
      // -------------------------------------------------------------------//
      // Upload File RAB
      // -------------------------------------------------------------------//
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
               headers: {
                  Authorization: `${accessToken}`,
                  "Content-Type": "application/json",
               },
               body: JSON.stringify(payloadRabFile),
            });

            const result = await response.json();
         } catch (error) {
            console.error("Error uploading file:", error);
         }
      };
      readerRab.readAsDataURL(fileRab);

      // -------------------------------------------------------------------//
      // Upload File PPM
      // -------------------------------------------------------------------//
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
               headers: {
                  Authorization: `${accessToken}`,
                  "Content-Type": "application/json",
               },
               body: JSON.stringify(payloadPpmFile),
            });

            const result = await response.json();
         } catch (error) {
            console.error("Error uploading file:", error);
         }
      };

      readerPpm.readAsDataURL(filePpm);
      // -----------------------------------------------------------------------------//
      let payload = {
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
         myIsi,
         status: 0,
         randomRabFileName,
         randomPpmFileName,
      };

      const response = await fetch($apiURL + "/ppm", {
         method: "POST",
         headers: {
            Authorization: `${accessToken}`,
            "Content-Type": "application/json",
         },
         body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
         $route("/dosen");
      } else {
         console.log(result.msg);
      }
   }

   async function submitProposal() {
      // myAbstract = tinymce.get("abstract").getContent();
      // myIsi = tinymce.get("isi").getContent();

      const accessToken = localStorage.getItem("token");
      const readerRab = new FileReader();
      const readerPpm = new FileReader();
      // -------------------------------------------------------------------//
      // Upload File RAB
      // -------------------------------------------------------------------//
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
               headers: {
                  Authorization: `${accessToken}`,
                  "Content-Type": "application/json",
               },
               body: JSON.stringify(payloadRabFile),
            });

            const result = await response.json();
         } catch (error) {
            console.error("Error uploading file:", error);
         }
      };
      readerRab.readAsDataURL(fileRab);

      // -------------------------------------------------------------------//
      // Upload File PPM
      // -------------------------------------------------------------------//
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
               headers: {
                  Authorization: `${accessToken}`,
                  "Content-Type": "application/json",
               },
               body: JSON.stringify(payloadPpmFile),
            });

            const result = await response.json();
         } catch (error) {
            console.error("Error uploading file:", error);
         }
      };

      readerPpm.readAsDataURL(filePpm);
      // -----------------------------------------------------------------------------//
      let payload = {
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
         myIsi,
         status: 2,
         randomRabFileName,
         randomPpmFileName,
      };

      const response = await fetch($apiURL + "/ppm", {
         method: "POST",
         headers: {
            Authorization: `${accessToken}`,
            "Content-Type": "application/json",
         },
         body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
         $route("/dosen");
      } else {
         console.log(result.msg);
      }
   }

   function goSelect(el) {
      let valueId = el.value;
   }

   function deleteMember(e) {
      let uid = e.target.getAttribute("data-value");
      anggotaTim = anggotaTim.filter((member) => {
         return member.value !== uid;
      });
   }

   let tab1 = true;
   let tab2;
   let tab3;

   function clicktab1() {
      tab1 = true;
      tab2 = false;
      tab3 = false;
   }

   function clicktab2() {
      const jpValue = document.getElementById("jenisProposal");
      const jkValue = document.getElementById("jenisKegiatan");
      const jsValue = document.getElementById("jenisSkema");
      const kkValue = document.getElementById("kelompokKeahlian");
      const topikValue = document.getElementById("topik");
      const tmValue = document.getElementById("tanggalMulai");
      const tsValue = document.getElementById("tanggalSelesai");
      const bpValue = document.getElementById("biayaPenelitian");
      const fileRabValue = document.getElementById("fileRab");
      // const anggotaTimValue = document.getElementById("anggotaTim");
      const judulValue = document.getElementById("judul");
      const maValue = document.getElementById("myAbstract");
      const filePpmValue = document.getElementById("filePpm");

      // if (
      //    jpValue.value === "" ||
      //    jpValue.value == null ||
      //    jkValue.value === "" ||
      //    jkValue.value == null ||
      //    jsValue.value === "" ||
      //    jsValue.value == null ||
      //    kkValue.value === "" ||
      //    kkValue.value == null ||
      //    topikValue.value === "" ||
      //    topikValue.value == null ||
      //    tmValue.value === "" ||
      //    tmValue.value == null ||
      //    tsValue.value === "" ||
      //    tsValue.value == null ||
      //    bpValue.value === "" ||
      //    bpValue.value == null ||
      //    fileRabValue.value === "" ||
      //    fileRabValue.value == null ||
      //    judulValue.value === "" ||
      //    judulValue.value == null ||
      //    maValue.value === "" ||
      //    maValue.value == null ||
      //    filePpmValue.value === "" ||
      //    filePpmValue.value == null
      // ) {
      //    warningFormText = true;
      // } else {
      //    tab1 = false;
      //    tab2 = true;
      //    tab3 = false;
      // }

      tab1 = false;
      tab2 = true;
      tab3 = false;
   }

   function clicktab3() {
      tab1 = false;
      tab2 = false;
      tab3 = true;
   }
</script>

<Article>
   <h1 class="title is-1">Pendaftaran Proposal</h1>
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
         <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
         <!-- svelte-ignore a11y-click-events-have-key-events -->
         <li
            on:click={clicktab3}
            class:is-active={tab3}
            data-step="3"
            class="steps-segment"
         >
            <span class="steps-marker">
               <span class="icon">
                  <Icon id="check" src={check} />
               </span>
            </span>
            <div class="steps-content">
               <p class="is-size-5"><b>Step 3</b></p>
               <p class="is-size-6">Next Step</p>
            </div>
         </li>
      </ul>

      <br />

      {#if tab1 === true}
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
         </Field>

         <Field name="Kelompok Keahlian">
            <input
               id="kelompokKeahlian"
               class="input"
               type="text"
               placeholder="Masukkan kelompok keahlian"
               bind:value={kelompokKeahlian}
            />
         </Field>

         <Field name="Topik">
            <input
               id="topik"
               class="input"
               type="text"
               placeholder="Masukkan topik"
               bind:value={topik}
            />
         </Field>

         <Field name="Tanggal Mulai">
            <div class="field">
               <input
                  id="tanggalMulai"
                  class="input"
                  type="date"
                  bind:value={tanggalMulai}
               />
            </div>
         </Field>

         <Field name="Tanggal Selesai">
            <div class="field">
               <input
                  id="tanggalSelesai"
                  class="input"
                  type="date"
                  bind:value={tanggalSelesai}
               />
            </div>
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
         </Field>

         {#if jenisSkema === "Riset Kelompok Keahlian" || jenisSkema === "Riset Terapan" || jenisSkema === "Riset Kerjasama" || jenisSkema === "Pengabdian Masyarakat Desa Binaan" || jenisSkema === "Pengabdian Masyarakat UMKM Binaan"}
            <Field name="Rencana Anggaran Biaya">
               <input
                  id="fileRab"
                  class="input"
                  accept=".xlsx"
                  type="file"
                  on:change={(e) => (fileRab = e.target.files[0])}
               />
               <p class="help is-info">File Type: xlsx</p>
            </Field>
         {/if}

         <Field name="Anggota Tim">
            <Select
               id="anggotaTim"
               start="2"
               {items}
               bind:result={anggotaTim}
            />
         </Field>

         <br />

         <table class="table is-fullwidth is-striped is-hoverable is-bordered">
            <thead>
               <tr>
                  <th class="is-narrow" style="width:55px"></th>
                  <th class="is-narrow" style="width:86px">Role</th>
                  <th> </th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <td></td>
                  <td>Ketua</td>
                  <td>...</td>
               </tr>
               {#if anggotaTim.length > 0}
                  {#each anggotaTim as member}
                     <tr>
                        <td
                           ><button
                              class="button is-danger is-small"
                              data-value={member.value}
                              on:click={deleteMember}
                              ><span class="icon">
                                 <Icon id="delete" src={deleteIcon} />
                              </span></button
                           ></td
                        >
                        <td>Anggota</td>
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
         </Field>

         <Field name="Abstrak">
            <textarea
               id="myAbstract"
               class="textarea"
               bind:value={myAbstract}
               placeholder="Masukkan abstrak"
            ></textarea>
         </Field>

         <Field name="Proposal">
            <input
               id="filePpm"
               class="input"
               accept="application/pdf"
               type="file"
               on:change={(e) => (filePpm = e.target.files[0])}
            />
            <p class="help is-info">File Type: pdf</p>
         </Field>

         {#if warningFormText === true}
            <div class="field is-grouped is-grouped-right">
               <p class="has-text-danger">
                  Lengkapi semua form untuk ke step selanjutnya.
               </p>
            </div>
         {/if}
      {/if}

      {#if tab2 === true}
         <h3>Tab 2</h3>
      {/if}

      {#if tab3 === true}
         <h3>Tab 3</h3>
      {/if}
   </div>

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
            <button class="button is-info" on:click={clicktab3}>Next</button>
         </p>
      </div>
   {/if}

   {#if tab3 === true}
      <div class="field is-grouped is-grouped-right">
         <p class="control">
            <button class="button" on:click={clicktab2}>Back</button>
         </p>
         <p class="control">
            <button class="button is-info is-light" on:click={simpanProposal}
               >Simpan</button
            >
         </p>
         <p class="control">
            <button class="button is-info" on:click={submitProposal}
               >Submit</button
            >
         </p>
      </div>
   {/if}
</Article>
