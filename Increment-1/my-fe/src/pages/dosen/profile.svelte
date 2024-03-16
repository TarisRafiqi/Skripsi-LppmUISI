<script>
   import { onMount } from "svelte";
   import { route, apiURL } from "../../store";
   import Article from "../../libs/Article.svelte";
   import Modal from "../../libs/Modal.svelte";
   import Field from "../../libs/Field.svelte";
   import Icon from "../../libs/Icon.svelte";
   import { deleteIcon, add } from "../../store/icons";

   const id = localStorage.getItem("id");
   let data, dataPP, dataPM, dataPD, dataPPub, dataPPB, dataPHKI;

   let vmataKuliah;

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

   let tahunPublikasi, judulPublikasi, namaJurnal, impactFactor;

   let tahunBuku, JudulBuku, namaPenulisBuku, PenerbitBuku, Isbn;

   let tahunHKI, JudulHKI, namaPenulisHKI, jenisHKI, noHKI;

   let idProfile,
      // idUser,
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
         mataKuliah =
            typeof data.mata_kuliah === "string"
               ? JSON.parse(data.mata_kuliah)
               : data.mata_kuliah || [];
      }

      // --------------------------------------------
      // Get Data Riwayat Pendidikan
      // --------------------------------------------
      const responseRP = await fetch($apiURL + "/riwayatpendidikan/" + id, {
         method: "GET",
         headers: headers,
      });

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

      getPengalamanPenelitian();
      getPengalamanPengmas();
      getPengalamanDiseminasi();
      getPengalamanPublikasi();
      getPengalamanPenulisanBuku();
      getPengalamanHKI();
   });

   // -----------------------------------------------
   // Get Pengalaman Penelitian
   // -----------------------------------------------
   async function getPengalamanPenelitian() {
      const responsePP = await fetch($apiURL + "/pengalamanPenelitian/" + id, {
         method: "GET",
         headers: headers,
      });

      const resultPP = await responsePP.json();

      if (responsePP.ok) {
         dataPP = resultPP.dbData;
      } else {
         console.log(responsePP);
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

      if (responsePM.ok) {
         dataPM = resultPM.dbData;
      } else {
         console.log(responsePM);
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

      if (responsePD.ok) {
         dataPD = resultPD.dbData;
      } else {
         console.log(responsePD);
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

      if (responsePPub.ok) {
         dataPPub = resultPPub.dbData;
      } else {
         console.log(responsePPub);
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

      if (responsePPB.ok) {
         dataPPB = resultPPB.dbData;
      } else {
         console.log(responsePPB);
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

      if (responsePHKI.ok) {
         dataPHKI = resultPHKI.dbData;
      } else {
         console.log(responsePHKI);
      }
   }

   // -----------------------------------------------
   // Tombol Simpan
   // -----------------------------------------------
   async function simpanPHKI() {
      const payload = {
         tahunHKI,
         JudulHKI,
         namaPenulisHKI,
         jenisHKI,
         noHKI,
         id,
      };

      const response = await fetch($apiURL + "/pengalamanHKI", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(payload),
      });

      const result = await response.json();

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

   async function simpanPPB() {
      const payload = {
         tahunBuku,
         JudulBuku,
         namaPenulisBuku,
         PenerbitBuku,
         Isbn,
         id,
      };

      const response = await fetch($apiURL + "/pengalamanPenulisanBuku", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(payload),
      });

      const result = await response.json();

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

   async function simpanPPublikasi() {
      const payload = {
         tahunPublikasi,
         judulPublikasi,
         namaJurnal,
         impactFactor,
         id,
      };

      const response = await fetch($apiURL + "/pengalamanPublikasi", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
         showModalPublikasi = false;

         tahunPublikasi = "";
         judulPublikasi = "";
         namaJurnal = "";
         impactFactor = "";

         getPengalamanPublikasi();
      } else {
         console.log(response);
      }
   }

   async function simpanPP() {
      const payload = {
         tahunPenelitian,
         judulPenelitian,
         rolePenelitian,
         sumberDanaPenelitian,
         biayaPP,
         id,
      };

      const response = await fetch($apiURL + "/pengalamanPenelitian", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(payload),
      });

      const result = await response.json();

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

   async function simpanPM() {
      const payload = {
         tahunPengmas,
         judulPengmas,
         rolePengmas,
         sumberDanaPengmas,
         biayaPengmas,
         id,
      };

      const response = await fetch($apiURL + "/pengalamanPengmas", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(payload),
      });

      const result = await response.json();

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

   async function simpanPD() {
      const payload = {
         tahunDiseminasi,
         judulDiseminasi,
         namaPemakalahDiseminasi,
         namaPertemuanDiseminasi,
         id,
      };

      const response = await fetch($apiURL + "/pengalamanDiseminasi", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(payload),
      });

      const result = await response.json();

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

      if (response.ok) {
         $route("/dosen");
      } else {
         console.log(response);
      }
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
      tab1 = false;
      tab2 = true;
      tab3 = false;
   }

   function clicktab3() {
      tab1 = false;
      tab2 = false;
      tab3 = true;
   }

   function addMatkul() {
      let addVmatkul = {
         label: vmataKuliah,
      };
      mataKuliah = [...mataKuliah, addVmatkul];
      vmataKuliah = "";
   }

   // -----------------------------------------------
   // Tombol Delete
   // -----------------------------------------------
   async function delrowPP(ev) {
      let idPP = ev.target.getAttribute("pid");

      const response = await fetch($apiURL + "/pengalamanPenelitian/" + idPP, {
         method: "DELETE",
         headers: {
            "Content-Type": "application/json",
         },
      });

      const result = await response.json();

      if (response.ok) {
         getPengalamanPenelitian();
      } else {
         console.log(response);
      }
   }

   async function delrowPM(ev) {
      let idPM = ev.target.getAttribute("pid");

      const response = await fetch($apiURL + "/pengalamanPengmas/" + idPM, {
         method: "DELETE",
         headers: {
            "Content-Type": "application/json",
         },
      });

      const result = await response.json();

      if (response.ok) {
         getPengalamanPengmas();
      } else {
         console.log(response);
      }
   }

   async function delrowPD(ev) {
      let idPD = ev.target.getAttribute("pid");

      const response = await fetch($apiURL + "/pengalamanDiseminasi/" + idPD, {
         method: "DELETE",
         headers: {
            "Content-Type": "application/json",
         },
      });

      const result = await response.json();

      if (response.ok) {
         getPengalamanDiseminasi();
      } else {
         console.log(response);
      }
   }

   async function delrowPPub(ev) {
      let idPPub = ev.target.getAttribute("pid");

      const response = await fetch($apiURL + "/pengalamanPublikasi/" + idPPub, {
         method: "DELETE",
         headers: {
            "Content-Type": "application/json",
         },
      });

      const result = await response.json();

      if (response.ok) {
         getPengalamanPublikasi();
      } else {
         console.log(response);
      }
   }

   async function delrowPPB(ev) {
      let idPPB = ev.target.getAttribute("pid");

      const response = await fetch(
         $apiURL + "/pengalamanPenulisanBuku/" + idPPB,
         {
            method: "DELETE",
            headers: {
               "Content-Type": "application/json",
            },
         }
      );

      const result = await response.json();

      if (response.ok) {
         getPengalamanPenulisanBuku();
      } else {
         console.log(response);
      }
   }

   async function delrowPHKI(ev) {
      let idPHKI = ev.target.getAttribute("pid");

      const response = await fetch($apiURL + "/pengalamanHKI/" + idPHKI, {
         method: "DELETE",
         headers: {
            "Content-Type": "application/json",
         },
      });

      const result = await response.json();

      if (response.ok) {
         getPengalamanHKI();
      } else {
         console.log(response);
      }
   }

   function deleteMatkul(e) {
      let delMatkul = e.target.getAttribute("data-value");
      mataKuliah = mataKuliah.filter((matkul) => {
         return matkul.label !== delMatkul;
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

      <div class="box">
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

         <Field name="Tempat / Tanggal Lahir">
            <div class="field-body">
               <div class="field">
                  <input class="input" type="text" bind:value={tempatLahir} />
               </div>
               <div class="field">
                  <input class="input" type="date" bind:value={tanggalLahir} />
               </div>
            </div>
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
            <input
               class="input"
               type="number"
               bind:value={telpFaxKantor}
            /></Field
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
                  <button
                     on:click={addMatkul}
                     class="button is-info"
                     disabled={vmataKuliah ? false : true}
                  >
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
               {#if mataKuliah && mataKuliah.length > 0}
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
      </div>

      <div class="field is-grouped is-grouped-right">
         <p class="control">
            <button class="button is-info" on:click={simpanIdentitas}
               >Simpan</button
            >
         </p>
      </div>
   {/if}

   {#if tab2 === true}
      <div class="box">
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
                  <td
                     ><input
                        class="input"
                        type="text"
                        bind:value={pertiS1}
                     /></td
                  >
                  <td
                     ><input
                        class="input"
                        type="text"
                        bind:value={pertiS2}
                     /></td
                  >
                  <td
                     ><input
                        class="input"
                        type="text"
                        bind:value={pertiS3}
                     /></td
                  >
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
      </div>

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
               bind:value={biayaPP}
               on:keyup={() => (biayaPP = formatRupiah(biayaPP, "Rp. "))}
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

      <div class="box">
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
                  <button
                     class="button is-info"
                     on:click={clickModalPenelitian}
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

         <table class="table is-fullwidth is-striped is-hoverable">
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
               {#if dataPP}
                  {#each dataPP as PP}
                     <tr>
                        <td
                           ><button
                              class="button is-danger is-rounded is-small"
                              pid={PP.id}
                              on:click={delrowPP}
                              ><span class="icon">
                                 <Icon id="delete" src={deleteIcon} />
                              </span></button
                           ></td
                        >
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
      <br />

      <!-- ------------------------------------------------------------------------>
      <!-- Table Pengabdian Masyarakat -->
      <!-- ------------------------------------------------------------------------>

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

      <div class="box">
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

         <table class="table is-fullwidth is-striped is-hoverable">
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
               {#if dataPM}
                  {#each dataPM as PM}
                     <tr>
                        <td
                           ><button
                              class="button is-danger is-rounded is-small"
                              pid={PM.id}
                              on:click={delrowPM}
                              ><span class="icon">
                                 <Icon id="delete" src={deleteIcon} />
                              </span></button
                           ></td
                        >
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
      <br />

      <!-- ------------------------------------------------------------------------>
      <!--  Pengalaman Diseminasi Ilmiah dalam Pertemuan / Pameran -->
      <!-- ------------------------------------------------------------------------>

      <Modal bind:show={showModalDiseminasi}>
         <h4 class="title is-4" slot="header">
            Pengalaman Diseminasi Ilmiah dalam<br />Pertemuan / Pameran
         </h4>

         <Field name="Tahun">
            <input class="input" type="number" bind:value={tahunDiseminasi} />
         </Field>

         <Field name="Judul Artikel">
            <input class="input" type="text" bind:value={judulDiseminasi} />
         </Field>

         <Field name="Nama Pemakalah">
            <input
               class="input"
               type="text"
               bind:value={namaPemakalahDiseminasi}
            />
         </Field>

         <Field name="Nama Pertemuan Ilmiah/Pameran">
            <input
               class="input"
               type="text"
               bind:value={namaPertemuanDiseminasi}
            />
         </Field>

         <hr />

         <div class="field is-grouped is-grouped-right">
            <p class="control">
               <button class="button is-info" on:click={simpanPD}>Simpan</button
               >
            </p>
         </div>
      </Modal>

      <div class="box">
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
                  <button
                     class="button is-info"
                     on:click={clickModalDiseminasi}
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

         <table class="table is-fullwidth is-striped is-hoverable">
            <thead>
               <tr>
                  <th class="is-narrow"></th>
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
                        <td
                           ><button
                              class="button is-danger is-rounded is-small"
                              pid={PD.id}
                              on:click={delrowPD}
                              ><span class="icon">
                                 <Icon id="delete" src={deleteIcon} />
                              </span></button
                           ></td
                        >
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
      <br />

      <!-- ------------------------------------------------------------------------>
      <!-- Pengalaman Publikasi Ilmiah dalam Jurnal "Bukan Proceeding" -->
      <!-- ------------------------------------------------------------------------>

      <Modal bind:show={showModalPublikasi}>
         <h4 class="title is-4" slot="header">
            Pengalaman Publikasi Ilmiah <br /> dalam Jurnal (bukan Proceeding)
         </h4>

         <Field name="Tahun">
            <input class="input" type="number" bind:value={tahunPublikasi} />
         </Field>

         <Field name="Judul Artikel">
            <input class="input" type="text" bind:value={judulPublikasi} />
         </Field>

         <Field name="Nama Jurnal, Vol., No Issue/No Artikel, Halaman">
            <input class="input" type="text" bind:value={namaJurnal} />
         </Field>

         <Field name="Nama Pertemuan Ilmiah/Pameran">
            <input class="input" type="text" bind:value={impactFactor} />
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

      <div class="box">
         <nav class="level">
            <!-- Left side -->
            <div class="level-left">
               <div class="level-item">
                  <h6 class="title is-6">
                     Pengalaman Publikasi Ilmiah dalam Jurnal (bukan Proceeding)
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

         <table class="table is-fullwidth is-striped is-hoverable">
            <thead>
               <tr>
                  <th class="is-narrow"></th>
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
                        <td
                           ><button
                              class="button is-danger is-rounded is-small"
                              pid={PPub.id}
                              on:click={delrowPPub}
                              ><span class="icon">
                                 <Icon id="delete" src={deleteIcon} />
                              </span></button
                           ></td
                        >
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
      <br />

      <!-- ------------------------------------------------------------------------>
      <!-- Pengalaman Penulisan Buku -->
      <!-- ------------------------------------------------------------------------>

      <Modal bind:show={showModalPenulisanBuku}>
         <h4 class="title is-4" slot="header">Pengalaman Penulisan Buku</h4>

         <Field name="Tahun">
            <input class="input" type="number" bind:value={tahunBuku} />
         </Field>

         <Field name="Judul Buku">
            <input class="input" type="text" bind:value={JudulBuku} />
         </Field>

         <Field name="Nama Penulis">
            <input class="input" type="text" bind:value={namaPenulisBuku} />
         </Field>

         <Field name="Penerbit">
            <input class="input" type="text" bind:value={PenerbitBuku} />
         </Field>

         <Field name="ISBN">
            <input class="input" type="text" bind:value={Isbn} />
         </Field>

         <hr />

         <div class="field is-grouped is-grouped-right">
            <p class="control">
               <button class="button is-info" on:click={simpanPPB}
                  >Simpan</button
               >
            </p>
         </div>
      </Modal>

      <div class="box">
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

         <table class="table is-fullwidth is-striped is-hoverable">
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
            <tbody>
               {#if dataPPB}
                  {#each dataPPB as PPB}
                     <tr>
                        <td
                           ><button
                              class="button is-danger is-rounded is-small"
                              pid={PPB.id}
                              on:click={delrowPPB}
                              ><span class="icon">
                                 <Icon id="delete" src={deleteIcon} />
                              </span></button
                           ></td
                        >
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
      <br />

      <!-- ------------------------------------------------------------------------>
      <!-- Pengalaman Hak Kekayaan Intelektual -->
      <!-- ------------------------------------------------------------------------>

      <Modal bind:show={showModalHKI}>
         <h4 class="title is-4" slot="header">
            Pengalaman Hak Kekayaan Intelektual
         </h4>

         <Field name="Tahun">
            <input class="input" type="number" bind:value={tahunHKI} />
         </Field>

         <Field name="Judul HKI">
            <input class="input" type="text" bind:value={JudulHKI} />
         </Field>

         <Field name="Nama Penulis">
            <input class="input" type="text" bind:value={namaPenulisHKI} />
         </Field>

         <Field name="Penerbit">
            <input class="input" type="text" bind:value={jenisHKI} />
         </Field>

         <Field name="ISBN">
            <input class="input" type="text" bind:value={noHKI} />
         </Field>

         <hr />

         <div class="field is-grouped is-grouped-right">
            <p class="control">
               <button class="button is-info" on:click={simpanPHKI}
                  >Simpan</button
               >
            </p>
         </div>
      </Modal>

      <div class="box">
         <nav class="level">
            <!-- Left side -->
            <div class="level-left">
               <div class="level-item">
                  <h6 class="title is-6">
                     Pengalaman Hak Kekayaan Intelektual
                  </h6>
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

         <table class="table is-fullwidth is-striped is-hoverable">
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
            <tbody>
               {#if dataPHKI}
                  {#each dataPHKI as PHKI}
                     <tr>
                        <td
                           ><button
                              class="button is-danger is-rounded is-small"
                              pid={PHKI.id}
                              on:click={delrowPHKI}
                              ><span class="icon">
                                 <Icon id="delete" src={deleteIcon} />
                              </span></button
                           ></td
                        >
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
      <br />
   {/if}
</Article>
