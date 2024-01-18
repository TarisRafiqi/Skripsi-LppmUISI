<script>
   import { onMount } from "svelte";
   import { route, apiURL } from "../../store";
   import Article from "../../libs/Article.svelte";
   import Modal from "../../libs/Modal.svelte";
   import Field from "../../libs/Field.svelte";
   import Icon from "../../libs/Icon.svelte";
   import { deleteIcon, add } from "../../store/icons";

   const id = localStorage.getItem("id");
   let items;
   let data;
   let vmataKuliah;

   let biayaPenelitian,
      tahunPenelitian,
      judulPenelitian,
      rolePenelitian,
      sumberDanaPenelitian;

   let tblPP = [],
      aPP,
      bPP,
      cPP,
      dPP,
      ePP;

   let tblPM = [],
      aPM,
      bPM,
      cPM,
      dPM,
      ePM;

   let biayaPengmas, tahunPengmas, judulPengmas, rolePengmas, sumberDanaPengmas;

   let idProfile,
      idUser,
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

   let showModalPenelitian = false;
   let showModalPengmas = false;
   let showModalDiseminasi = false;
   let showModalPublikasi = false;
   let showModalPenulisanBuku = false;
   let showModalHKI = false;

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

   // Memakai akses Token, hanya uid pemilik dan role Admin yang bisa mengakses halaman ini
   const accessToken = localStorage.getItem("token");
   const headers = {
      Authorization: `${accessToken}`,
      "Content-Type": "application/json",
   };

   onMount(async () => {
      const response = await fetch($apiURL + "/user/" + id, {
         method: "GET",
         headers: headers,
      });

      const result = await response.json();

      if (response.ok) {
         data = result;

         idProfile = data.id;
         idUser = data.uid;
         namaLengkap = data.nama_lengkap;
         jabatanFungsional = data.jabatan_fungsional;
         nip = data.nip;
         nidn = data.nidn;
         tempatLahir = data.tempat_lahir;
         tanggalLahir = data.tanggal_lahir;
         alamatRumah = data.alamat_rumah;
         telpFaxRumah = data.telp_fax_rumah;
         nomorHandphone = data.nomor_handphone;
         alamatKantor = data.alamat_kantor;
         telpFaxKantor = data.telp_fax_kantor;
         email = data.email;
         mataKuliah = data.mata_kuliah;
      }

      // --------------------------------------------
      // Get Data Riwayat Pendidikan
      // --------------------------------------------
      const responseRP = await fetch($apiURL + "/riwayatpendidikan/" + id, {
         method: "GET",
         headers: headers,
      });

      const dataRP = await responseRP.json();
      // console.log(dataRP);

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

      getPengalamanPenelitian();
      getPengalamanPengmas();
   });

   async function getPengalamanPengmas() {
      // -----------------------
      // Get Pengalaman Pengmas
      // -----------------------
      const responsePM = await fetch($apiURL + "/pengalamanpengmas/" + id, {
         method: "GET",
         headers: headers,
      });

      const dataPM = await responsePM.json();

      if (responsePM.ok) {
         aPM = dataPM.tahun_pengmas;
         bPM = dataPM.judul_pengmas;
         cPM = dataPM.role_pengmas;
         dPM = dataPM.sumber_dana;
         ePM = dataPM.jumlah;

         if (!aPM) return;

         tblPM = [];
         for (let i = 0; i < aPM.length; i++) {
            tblPM = [
               ...tblPM,
               [
                  aPM[i].label,
                  bPM[i].label,
                  cPM[i].label,
                  dPM[i].label,
                  ePM[i].label,
               ],
            ];
         }
      }
   }

   async function getPengalamanPenelitian() {
      // --------------------------
      // Get Pengalaman Penelitian
      // --------------------------
      const responsePP = await fetch($apiURL + "/pengalamanpenelitian/" + id, {
         method: "GET",
         headers: headers,
      });

      const dataPP = await responsePP.json();

      if (responsePP.ok) {
         aPP = dataPP.tahun_penelitian;
         bPP = dataPP.judul_penelitian;
         cPP = dataPP.role_penelitian;
         dPP = dataPP.sumber_dana;
         ePP = dataPP.jumlah;

         if (!aPP) return;

         tblPP = [];
         for (let i = 0; i < aPP.length; i++) {
            tblPP = [
               ...tblPP,
               [
                  aPP[i].label,
                  bPP[i].label,
                  cPP[i].label,
                  dPP[i].label,
                  ePP[i].label,
               ],
            ];
         }
      }
   }

   async function simpanPM() {
      // ------------------------------------------------
      // Memasukkan tahun pengmas kedalam object
      // ------------------------------------------------
      tahunPengmas = String(tahunPengmas);
      let addVtahunPengmas = {
         label: tahunPengmas,
      };
      aPM = [...aPM, addVtahunPengmas];

      // ------------------------------------------------
      // Memasukkan judul pengmas kedalam object
      // ------------------------------------------------
      let addVjudulPengmas = {
         label: judulPengmas,
      };
      bPM = [...bPM, addVjudulPengmas];

      // ------------------------------------------------
      // Memasukkan role pengmas kedalam object
      // ------------------------------------------------
      let addVrolePengmas = {
         label: rolePengmas,
      };
      cPM = [...cPM, addVrolePengmas];

      // ------------------------------------------------
      // Memasukkan sumber dana pengmas kedalam object
      // ------------------------------------------------
      let addVsumberDanaPengmas = {
         label: sumberDanaPengmas,
      };
      dPM = [...dPM, addVsumberDanaPengmas];

      // ------------------------------------------------
      // Memasukkan biaya pengmas kedalam object
      // ------------------------------------------------
      let addVbiayaPengmas = {
         label: biayaPengmas,
      };
      ePM = [...ePM, addVbiayaPengmas];

      const payload = {
         aPM,
         bPM,
         cPM,
         dPM,
         ePM,
         id,
      };

      const response = await fetch($apiURL + "/pengalamanpengmas", {
         method: "PATCH",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
         showModalPengmas = false;

         getPengalamanPengmas();
      } else {
         console.log(response);
      }
   }

   async function simpanPP() {
      // ------------------------------------------------
      // Memasukkan tahun penelitian kedalam object
      // ------------------------------------------------
      tahunPenelitian = String(tahunPenelitian);
      let addVtahunPenelitian = {
         label: tahunPenelitian,
      };
      aPP = [...aPP, addVtahunPenelitian];

      // ------------------------------------------------
      // Memasukkan judul penelitian kedalam object
      // ------------------------------------------------
      let addVjudulPenelitian = {
         label: judulPenelitian,
      };
      bPP = [...bPP, addVjudulPenelitian];

      // ------------------------------------------------
      // Memasukkan role penelitian kedalam object
      // ------------------------------------------------
      let addVrolePenelitian = {
         label: rolePenelitian,
      };
      cPP = [...cPP, addVrolePenelitian];

      // ------------------------------------------------
      // Memasukkan sumber dana penelitian kedalam object
      // ------------------------------------------------
      let addVsumberDanaPenelitian = {
         label: sumberDanaPenelitian,
      };
      dPP = [...dPP, addVsumberDanaPenelitian];

      // ------------------------------------------------
      // Memasukkan biaya penelitian kedalam object
      // ------------------------------------------------
      let addVbiayaPenelitian = {
         label: biayaPenelitian,
      };
      ePP = [...ePP, addVbiayaPenelitian];

      const payload = {
         aPP,
         bPP,
         cPP,
         dPP,
         ePP,
         id,
      };

      // console.log(payload);
      // return;

      const response = await fetch($apiURL + "/pengalamanpenelitian", {
         method: "PATCH",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
         showModalPenelitian = false;

         getPengalamanPenelitian();
      } else {
         console.log(response);
      }
   }

   async function simpanRiwayatPendidikan() {
      const payload = {
         pertiS1,
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
         judulTugasAkhirS3,
         id,
      };

      const response = await fetch($apiURL + "/riwayatpendidikan", {
         method: "PATCH",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(payload),
      });

      const result = await response.json();
      // console.log(result);
      // return;

      if (response.ok) {
         $route("/dosen");
      } else {
         console.log(response);
      }
   }

   async function simpanIdentitas() {
      const payload = {
         idProfile,
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
         mataKuliah,
      };

      const response = await fetch($apiURL + "/userprofile", {
         method: "PATCH",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(payload),
      });

      const result = await response.json();
      // console.log(result);

      if (response.ok) {
         $route("/dosen");
      } else {
         console.log(response);
      }
   }

   let tab1 = true;
   let tab2;
   let tab3;
   let tab4;

   function clicktab1() {
      tab1 = true;
      tab2 = false;
      tab3 = false;
      tab4 = false;
   }

   function clicktab2() {
      tab1 = false;
      tab2 = true;
      tab3 = false;
      tab4 = false;
   }

   function clicktab3() {
      tab1 = false;
      tab2 = false;
      tab3 = true;
      tab4 = false;
   }

   function addMatkul() {
      // console.log(vmataKuliah);
      let addVmatkul = {
         label: vmataKuliah,
      };
      // console.log(mataKuliah);
      mataKuliah = [...mataKuliah, addVmatkul];
      vmataKuliah = "";
   }

   async function delrowPM(ev, num) {
      let suspect = document.querySelector("#row" + num);
      if (suspect) {
         suspect.remove();
         aPM.splice(num, 1);
         bPM.splice(num, 1);
         cPM.splice(num, 1);
         dPM.splice(num, 1);
         ePM.splice(num, 1);
      }

      const payload = {
         aPM,
         bPM,
         cPM,
         dPM,
         ePM,
         id,
      };

      // console.log(payload);
      // return;

      const response = await fetch($apiURL + "/pengalamanpengmas", {
         method: "PATCH",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
         // $route("/dosen");
      } else {
         console.log(response);
      }
   }

   async function delrowPP(ev, num) {
      let suspect = document.querySelector("#row" + num);
      if (suspect) {
         suspect.remove();
         aPP.splice(num, 1);
         bPP.splice(num, 1);
         cPP.splice(num, 1);
         dPP.splice(num, 1);
         ePP.splice(num, 1);
      }

      const payload = {
         aPP,
         bPP,
         cPP,
         dPP,
         ePP,
         id,
      };

      // console.log(payload);
      // return;

      const response = await fetch($apiURL + "/pengalamanpenelitian", {
         method: "PATCH",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
         // $route("/dosen");
      } else {
         console.log(response);
      }
   }

   function deleteMatkul(e) {
      let delMatkul = e.target.getAttribute("data-value");
      console.log(delMatkul);
      mataKuliah = mataKuliah.filter((matkul) => {
         return matkul.label !== delMatkul;
      });
      console.log(mataKuliah);
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
</script>

<Article>
   <h1 class="title is-1">Profile</h1>

   <div class="tabs is-boxed">
      <ul>
         <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
         <!-- svelte-ignore a11y-click-events-have-key-events -->
         <li on:click={clicktab1} class:is-active={tab1}>
            <!-- svelte-ignore a11y-missing-attribute -->
            <a>
               <span>Identitas</span>
            </a>
         </li>
         <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
         <!-- svelte-ignore a11y-click-events-have-key-events -->
         <li on:click={clicktab2} class:is-active={tab2}>
            <!-- svelte-ignore a11y-missing-attribute -->
            <a>
               <span>Riwayat Pendidikan</span>
            </a>
         </li>
         <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
         <!-- svelte-ignore a11y-click-events-have-key-events -->
         <li on:click={clicktab3} class:is-active={tab3}>
            <!-- svelte-ignore a11y-missing-attribute -->
            <a>
               <span>Pengalaman</span>
            </a>
         </li>
      </ul>
   </div>

   {#if tab1 === true}
      <!-- <Field name="Id Profile">{idProfile}</Field> -->
      <!-- <Field name="Id User">{idUser}</Field> -->

      <Field name="Nama Lengkap">
         <input class="input" type="text" bind:value={namaLengkap} />
         <p class="help is-info">Masukkan nama lengkap dengan gelar</p>
      </Field>

      <Field name="Jabatan Fungsional">
         <input
            class="input"
            type="text"
            bind:value={jabatanFungsional}
         /></Field
      >

      <Field name="NIP">
         <input class="input" type="number" bind:value={nip} /></Field
      >
      <Field name="NIDN">
         <input class="input" type="number" bind:value={nidn} /></Field
      >

      <Field name="Tempat Lahir">
         <input class="input" type="text" bind:value={tempatLahir} />
      </Field>

      <Field name="Alamat Rumah">
         <input class="input" type="text" bind:value={alamatRumah} />
      </Field>

      <Field name="Telp/Fax Rumah">
         <input class="input" type="number" bind:value={telpFaxRumah} />
      </Field>

      <Field name="Nomor Handphone">
         <input
            class="input"
            type="number"
            bind:value={nomorHandphone}
         /></Field
      >
      <Field name="Alamat Kantor">
         <input class="input" type="text" bind:value={alamatKantor} /></Field
      >

      <Field name="Telp/Fax Kantor">
         <input class="input" type="number" bind:value={telpFaxKantor} /></Field
      >
      <Field class="input" name="Email">
         <input class="input" type="text" bind:value={email} />
      </Field>

      <Field name="Mata Kuliah">
         <div class="field is-grouped">
            <p class="control is-expanded">
               <input
                  class="input"
                  type="text"
                  placeholder="Tambahkan mata kuliah yang diampu"
                  bind:value={vmataKuliah}
               />
            </p>
            <p class="control">
               <button on:click={addMatkul} class="button is-info">
                  <span class="icon">
                     <Icon id="orang" src={add} />
                  </span>
                  <!-- svelte-ignore a11y-missing-attribute -->
                  <span><a>Tambah</a></span>
               </button>
            </p>
         </div>
      </Field>
      <br />

      <table class="table is-fullwidth is-striped is-hoverable is-bordered">
         <thead>
            <tr>
               <th class="is-narrow"></th>
               <th>Mata Kuliah</th>
            </tr>
         </thead>
         <tbody>
            {#if mataKuliah.length > 0}
               {#each mataKuliah as matkul}
                  <tr>
                     <td
                        ><button
                           class="button is-danger is-rounded is-small"
                           data-value={matkul.label}
                           on:click={deleteMatkul}
                           ><span class="icon">
                              <Icon id="delete" src={deleteIcon} />
                           </span></button
                        ></td
                     >
                     <td>{matkul.label}</td>
                  </tr>
               {/each}
            {/if}
         </tbody>
      </table>

      <hr />

      <div class="field is-grouped is-grouped-right">
         <p class="control">
            <button class="button is-info" on:click={simpanIdentitas}
               >Simpan</button
            >
         </p>
      </div>
   {/if}

   {#if tab2 === true}
      <table class="table is-fullwidth is-striped is-hoverable is-bordered">
         <thead>
            <tr>
               <th class="is-narrow">Program</th>
               <th>S1</th>
               <th>S2</th>
               <th>S3</th>
            </tr>
         </thead>
         <tbody>
            <tr>
               <th>Nama Perguruan Tinggi</th>
               <td><input class="input" type="text" bind:value={pertiS1} /></td>
               <td><input class="input" type="text" bind:value={pertiS2} /></td>
               <td><input class="input" type="text" bind:value={pertiS3} /></td>
            </tr>
            <tr>
               <th>Bidang Ilmu</th>
               <td
                  ><input
                     class="input"
                     type="text"
                     bind:value={bidangIlmuS1}
                  /></td
               >
               <td
                  ><input
                     class="input"
                     type="text"
                     bind:value={bidangIlmuS2}
                  /></td
               >
               <td
                  ><input
                     class="input"
                     type="text"
                     bind:value={bidangIlmuS3}
                  /></td
               >
            </tr>
            <tr>
               <th>Tahun Masuk</th>
               <td
                  ><input
                     class="input"
                     type="number"
                     bind:value={tahunMasukS1}
                  /></td
               >
               <td
                  ><input
                     class="input"
                     type="number"
                     bind:value={tahunMasukS2}
                  /></td
               >
               <td
                  ><input
                     class="input"
                     type="number"
                     bind:value={tahunMasukS3}
                  /></td
               >
            </tr>
            <tr>
               <th>Tahun Lulus</th>
               <td
                  ><input
                     class="input"
                     type="number"
                     bind:value={tahunLulusS1}
                  /></td
               >
               <td
                  ><input
                     class="input"
                     type="number"
                     bind:value={tahunLulusS2}
                  /></td
               >
               <td
                  ><input
                     class="input"
                     type="number"
                     bind:value={tahunLulusS3}
                  /></td
               >
            </tr>
            <tr>
               <th>Judul Skripsi/Tesis/Disertasi</th>
               <td
                  ><textarea class="textarea" bind:value={judulTugasAkhirS1}
                  ></textarea></td
               >
               <td
                  ><textarea class="textarea" bind:value={judulTugasAkhirS2}
                  ></textarea></td
               >
               <td
                  ><textarea class="textarea" bind:value={judulTugasAkhirS3}
                  ></textarea></td
               >
            </tr>
         </tbody>
      </table>

      <div class="field is-grouped is-grouped-right">
         <p class="control">
            <button class="button is-info" on:click={simpanRiwayatPendidikan}
               >Simpan</button
            >
         </p>
      </div>
   {/if}

   {#if tab3 === true}
      <!-- ------------------------------------------------------------------------>
      <!-- Table Pengalaman Penelitian -->
      <!-- ------------------------------------------------------------------------>
      <nav class="level">
         <!-- Left side -->
         <div class="level-left">
            <div class="level-item">
               <h6 class="title is-6">Pengalaman Penelitian</h6>
            </div>
         </div>

         <!-- Right side -->
         <div class="level-right">
            <div class="level-item">
               <button class="button is-info" on:click={clickModalPenelitian}>
                  <span class="icon">
                     <Icon id="orang" src={add} />
                  </span>
                  <!-- svelte-ignore a11y-missing-attribute -->
                  <span><a>Tambah</a></span>
               </button>
            </div>
         </div>
      </nav>

      <Modal bind:show={showModalPenelitian}>
         <h4 class="title is-4" slot="header">Pengalaman Penelitian</h4>

         <Field name="Tahun">
            <input class="input" type="number" bind:value={tahunPenelitian} />
         </Field>

         <Field name="Judul Penelitian">
            <input class="input" type="text" bind:value={judulPenelitian} />
         </Field>

         <Field name="Ketua/Anggota">
            <div class="select is-fullwidth">
               <select bind:value={rolePenelitian}>
                  <option value="" disabled selected hidden
                     >Pilih peran dalam kegiatan</option
                  >
                  <option value="Ketua">Ketua</option>
                  <option value="Anggota">Anggota</option>
               </select>
            </div>
         </Field>

         <Field name="Sumber Dana">
            <input
               class="input"
               type="text"
               bind:value={sumberDanaPenelitian}
            />
         </Field>

         <Field name="Jumlah Rp.">
            <input
               class="input"
               type="text"
               placeholder="Masukkan Biaya Penelitian"
               bind:value={biayaPenelitian}
               on:keyup={() =>
                  (biayaPenelitian = formatRupiah(biayaPenelitian, "Rp. "))}
            />
         </Field>

         <hr />

         <div class="field is-grouped is-grouped-right">
            <p class="control">
               <button class="button is-info" on:click={simpanPP}>Simpan</button
               >
            </p>
         </div>
      </Modal>

      <table class="table is-fullwidth is-striped is-hoverable is-bordered">
         <thead>
            <tr>
               <th class="is-narrow"></th>
               <th class="is-narrow">Tahun</th>
               <th>Judul Penelitian</th>
               <th class="is-narrow">Ketua / Anggota</th>
               <th class="is-narrow">Sumber Dana</th>
               <th>Jumlah Rp.</th>
            </tr>
         </thead>
         <tbody>
            {#if tblPP.length > 0}
               {#each tblPP as row, idx}
                  <tr id={"row" + idx}>
                     <td
                        ><button
                           on:click={(e) => delrowPP(e, idx)}
                           class="button is-danger is-rounded is-small"
                           ><span class="icon">
                              <Icon id="delete" src={deleteIcon} />
                           </span></button
                        ></td
                     >
                     {#each row as td}
                        <td>{td}</td>
                     {/each}
                  </tr>
               {/each}
            {/if}
         </tbody>
         <br />
      </table>
      <br />

      <!-- ------------------------------------------------------------------------>
      <!-- Table Pengabdian Masyarakat -->
      <!-- ------------------------------------------------------------------------>
      <nav class="level">
         <!-- Left side -->
         <div class="level-left">
            <div class="level-item">
               <h6 class="title is-6">Pengalaman Pengabdian Masyarakat</h6>
            </div>
         </div>

         <!-- Right side -->
         <div class="level-right">
            <div class="level-item">
               <button class="button is-info" on:click={clickModalPengmas}>
                  <span class="icon">
                     <Icon id="orang" src={add} />
                  </span>
                  <!-- svelte-ignore a11y-missing-attribute -->
                  <span><a>Tambah</a></span>
               </button>
            </div>
         </div>
      </nav>

      <Modal bind:show={showModalPengmas}>
         <h4 class="title is-4" slot="header">
            Pengalaman Pengabdian Masyarakat
         </h4>

         <Field name="Tahun">
            <input class="input" type="number" bind:value={tahunPengmas} />
         </Field>

         <Field name="Judul Pengmas">
            <input class="input" type="text" bind:value={judulPengmas} />
         </Field>

         <Field name="Ketua/Anggota">
            <div class="select is-fullwidth">
               <select bind:value={rolePengmas}>
                  <option value="" disabled selected hidden
                     >Pilih peran dalam kegiatan</option
                  >
                  <option value="Ketua">Ketua</option>
                  <option value="Anggota">Anggota</option>
               </select>
            </div>
         </Field>

         <Field name="Sumber Dana">
            <input class="input" type="text" bind:value={sumberDanaPengmas} />
         </Field>

         <Field name="Jumlah Rp.">
            <input
               class="input"
               type="text"
               placeholder="Masukkan Biaya Pengmas"
               bind:value={biayaPengmas}
               on:keyup={() =>
                  (biayaPengmas = formatRupiah(biayaPengmas, "Rp. "))}
            />
         </Field>

         <hr />

         <div class="field is-grouped is-grouped-right">
            <p class="control">
               <button class="button is-info" on:click={simpanPM}>Simpan</button
               >
            </p>
         </div>
      </Modal>

      <table class="table is-fullwidth is-striped is-hoverable is-bordered">
         <thead>
            <tr>
               <th class="is-narrow"></th>
               <th class="is-narrow">Tahun</th>
               <th>Judul Pengabdian Masyarakat</th>
               <th class="is-narrow">Ketua / Anggota</th>
               <th class="is-narrow">Sumber Dana</th>
               <th>Jumlah Rp.</th>
            </tr>
         </thead>
         <tbody>
            {#if tblPM.length > 0}
               {#each tblPM as row, idx}
                  <tr id={"row" + idx}>
                     <td
                        ><button
                           on:click={(e) => delrowPM(e, idx)}
                           class="button is-danger is-rounded is-small"
                           ><span class="icon">
                              <Icon id="delete" src={deleteIcon} />
                           </span></button
                        ></td
                     >
                     {#each row as td}
                        <td>{td}</td>
                     {/each}
                  </tr>
               {/each}
            {/if}
         </tbody>
         <br />
      </table>
      <br />

      <!-- ------------------------------------------------------------------------>
      <!--  Pengalaman Diseminasi Ilmiah dalam Pertemuan / Pameran -->
      <!-- ------------------------------------------------------------------------>
      <nav class="level">
         <!-- Left side -->
         <div class="level-left">
            <div class="level-item">
               <h6 class="title is-6">
                  Pengalaman Diseminasi Ilmiah dalam Pertemuan / Pameran
               </h6>
            </div>
         </div>

         <!-- Right side -->
         <div class="level-right">
            <div class="level-item">
               <button class="button is-info" on:click={clickModalDiseminasi}>
                  <span class="icon">
                     <Icon id="orang" src={add} />
                  </span>
                  <!-- svelte-ignore a11y-missing-attribute -->
                  <span><a>Tambah</a></span>
               </button>
            </div>
         </div>
      </nav>

      <Modal bind:show={showModalDiseminasi}>
         <h4 class="title is-4" slot="header">
            Pengalaman Diseminasi Ilmiah <br />dalam Pertemuan/Pameran
         </h4>
      </Modal>

      <table class="table is-fullwidth is-striped is-hoverable is-bordered">
         <thead>
            <tr>
               <th class="is-narrow"></th>
               <th class="is-narrow">Tahun</th>
               <th>Judul Artikel</th>
               <th>Nama Pemakalah</th>
               <th class="is-narrow">Nama Pertemuan Ilmiah / Pameran</th>
            </tr>
         </thead>
         <tbody> </tbody>
      </table>
      <br />

      <!-- ------------------------------------------------------------------------>
      <!-- Pengalaman Publikasi Ilmiah dalam Jurnal "Bukan Proceeding" -->
      <!-- ------------------------------------------------------------------------>
      <nav class="level">
         <!-- Left side -->
         <div class="level-left">
            <div class="level-item">
               <h6 class="title is-6">
                  Pengalaman Publikasi Ilmiah dalam Jurnal (Bukan Proceeding)
               </h6>
            </div>
         </div>

         <!-- Right side -->
         <div class="level-right">
            <div class="level-item">
               <button class="button is-info" on:click={clickModalPublikasi}>
                  <span class="icon">
                     <Icon id="orang" src={add} />
                  </span>
                  <!-- svelte-ignore a11y-missing-attribute -->
                  <span><a>Tambah</a></span>
               </button>
            </div>
         </div>
      </nav>

      <Modal bind:show={showModalPublikasi}>
         <h4 class="title is-4" slot="header">
            Pengalaman Publikasi Ilmiah <br /> dalam Jurnal (bukan Proceeding)
         </h4>
      </Modal>

      <table class="table is-fullwidth is-striped is-hoverable is-bordered">
         <thead>
            <tr>
               <th class="is-narrow"></th>
               <th class="is-narrow">Tahun</th>
               <th>Judul Artikel</th>
               <th>Nama Jurnal, Vol., No Issue/No Artikel, Halaman</th>
               <th>Impact Factor/Scopus Quarter/Akreditasi</th>
            </tr>
         </thead>
         <tbody> </tbody>
      </table>
      <br />

      <!-- ------------------------------------------------------------------------>
      <!-- Pengalaman Penulisan Buku -->
      <!-- ------------------------------------------------------------------------>
      <nav class="level">
         <!-- Left side -->
         <div class="level-left">
            <div class="level-item">
               <h6 class="title is-6">Pengalaman Penulisan Buku</h6>
            </div>
         </div>

         <!-- Right side -->
         <div class="level-right">
            <div class="level-item">
               <button
                  class="button is-info"
                  on:click={clickModalPenulisanBuku}
               >
                  <span class="icon">
                     <Icon id="orang" src={add} />
                  </span>
                  <!-- svelte-ignore a11y-missing-attribute -->
                  <span><a>Tambah</a></span>
               </button>
            </div>
         </div>
      </nav>

      <Modal bind:show={showModalPenulisanBuku}>
         <h4 class="title is-4" slot="header">Pengalaman Penulisan Buku</h4>
      </Modal>

      <table class="table is-fullwidth is-striped is-hoverable is-bordered">
         <thead>
            <tr>
               <th class="is-narrow"></th>
               <th class="is-narrow">Tahun</th>
               <th>Judul Buku</th>
               <th>Nama Penulis</th>
               <th>Penerbit</th>
               <th>ISBN</th>
            </tr>
         </thead>
         <tbody> </tbody>
      </table>
      <br />

      <!-- ------------------------------------------------------------------------>
      <!-- Pengalaman Hak Kekayaan Intelektual" -->
      <!-- ------------------------------------------------------------------------>
      <nav class="level">
         <!-- Left side -->
         <div class="level-left">
            <div class="level-item">
               <h6 class="title is-6">Pengalaman Hak Kekayaan Intelektual"</h6>
            </div>
         </div>

         <!-- Right side -->
         <div class="level-right">
            <div class="level-item">
               <button class="button is-info" on:click={clickModalHKI}>
                  <span class="icon">
                     <Icon id="orang" src={add} />
                  </span>
                  <!-- svelte-ignore a11y-missing-attribute -->
                  <span><a>Tambah</a></span>
               </button>
            </div>
         </div>
      </nav>

      <Modal bind:show={showModalHKI}>
         <h4 class="title is-4" slot="header">
            Pengalaman Hak Kekayaan Intelektual
         </h4>
      </Modal>

      <table class="table is-fullwidth is-striped is-hoverable is-bordered">
         <thead>
            <tr>
               <th class="is-narrow"></th>
               <th class="is-narrow">Tahun</th>
               <th>Judul HKI</th>
               <th>Nama Penulis</th>
               <th>Jenis HKI</th>
               <th>No HKI</th>
            </tr>
         </thead>
         <tbody> </tbody>
      </table>
      <br />
   {/if}
</Article>
