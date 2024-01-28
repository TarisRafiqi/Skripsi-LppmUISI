<script>
   import { onMount } from "svelte";
   import { route, apiURL } from "../../store";
   import Article from "../../libs/Article.svelte";
   import Field from "../../libs/Field.svelte";
   import Modal from "../../libs/Modal.svelte";
   import Icon from "../../libs/Icon.svelte";
   import Status from "../../modules/Status.svelte";
   import Wysiwyg from "../../libs/Wysiwyg.svelte";
   import Select from "../../libs/Select.svelte";
   import { deleteIcon } from "../../store/icons";

   export let params;
   const id = params["1"];
   let data, dataGP, dataPP, dataPM, dataPD, dataPPub, dataPPB, dataPHKI;

   let jenisProposal;
   let jenisKegiatan;
   let jenisSkema;
   let kelompokKeahlian;
   let topik;
   let tahunPelaksanaan;
   let biayaPenelitian;
   let anggotaTim = [];
   let judul;
   let abstrak;
   let isi;
   let comment;
   let status;

   let ka_departemen;
   let ka_lppm;
   let reviewer;
   let ka_pusat_kajian;
   let showModal = false;
   let kdeptSelected;
   let klppmSelected;
   let kpkSelected;
   let reviewerSelected;

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

   let uidProposal;

   let items = [];
   let file;
   let view;

   // pakai akses token, hanya uid yang bersangkutan, dan role admin yang boleh mengakses halaman ini
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
      view = !isEdit(result.status);

      if (response.ok) {
         data = result;

         uidProposal = data.uid;
         jenisProposal = data.jenis_proposal;
         jenisKegiatan = data.jenis_kegiatan;
         jenisSkema = data.jenis_skema;
         kelompokKeahlian = data.kelompok_keahlian;
         topik = data.topik;
         tahunPelaksanaan = data.tahun_pelaksanaan;
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
         randomFileName = data.random_file_name;
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

      // -----------------------------------------------------------------------------//
      // Mengisi list Select Anggota Tim
      // -----------------------------------------------------------------------------//
      const responsee = await fetch($apiURL + "/pilihUser", {
         method: "GET",
         headers: headers,
      });

      const results = await responsee.json();

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
   });

   function isEdit(code) {
      const edit = [0, 1, 3, 5, 7, 9];
      return edit.some((x) => x === code);
   }

   async function remediasi() {
      const accessToken = localStorage.getItem("token");
      // abstrak = tinymce.get("abstract").getContent();
      isi = tinymce.get("isi").getContent();

      // -----------------------------------------------------------------------------//
      const reader = new FileReader();
      reader.onloadend = async () => {
         const base64Data = reader.result.split(",")[1];
         const payloadfile = {
            file: {
               name: file.name,
               type: file.type,
               data: base64Data,
            },
            randomFileName,
         };

         try {
            const response = await fetch($apiURL + "/upload", {
               method: "POST",
               headers: {
                  Authorization: `${accessToken}`,
                  "Content-Type": "application/json",
               },
               body: JSON.stringify(payloadfile),
            });
            const result = await response.json();
         } catch (error) {
            console.error("Error uploading file:", error);
         }
      };
      //
      if (file) reader.readAsDataURL(file);
      // -----------------------------------------------------------------------------//

      const payload = {
         jenisProposal,
         jenisKegiatan,
         jenisSkema,
         kelompokKeahlian,
         topik,
         tahunPelaksanaan,
         biayaPenelitian,
         anggotaTim,
         id,
         judul,
         abstrak,
         isi,
         comment: "",
         status: Number(data.status) + 1,
         kdeptSelected,
         klppmSelected,
         kpkSelected,
         reviewerSelected,
         randomFileName,
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
         $route("/admin/proposals");
      } else {
         console.log(response);
      }
   }

   async function handleRevisi() {
      const payload = {
         jenisProposal,
         jenisKegiatan,
         jenisSkema,
         kelompokKeahlian,
         topik,
         tahunPelaksanaan,
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
         randomFileName,
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
         $route("/admin/proposals");
      } else {
         console.log(response);
      }
   }

   async function handleDitolak() {
      const payload = {
         jenisProposal,
         jenisKegiatan,
         jenisSkema,
         kelompokKeahlian,
         topik,
         tahunPelaksanaan,
         biayaPenelitian,
         anggotaTim,
         id,
         judul,
         abstrak,
         isi,
         comment: "",
         status: Number(data.status) + 1,
         kdeptSelected,
         klppmSelected,
         kpkSelected,
         reviewerSelected,
         randomFileName,
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
         $route("/admin/proposals");
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
         tahunPelaksanaan,
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
         randomFileName,
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
         $route("/admin/proposals");
      } else {
         console.log(response);
      }
   }

   async function handleSubmitReviewer() {
      // Mengirimkan data reviewer terpilih

      const payload = {
         id: id,
         kdeptSelected,
         klppmSelected,
         kpkSelected,
         reviewerSelected,
      };
      const response = await fetch($apiURL + "/submitreviewer", {
         method: "PATCH",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
      } else {
         console.log(response);
      }
   }

   async function handleSubmitDana() {
      // Mengirimkan data update status pendanaan
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

   async function handleDownload(e) {
      const accessToken = localStorage.getItem("token");
      const headers = {
         Authorization: `${accessToken}`,
         "Content-Type": "application/json",
      };
      let filename = "rab.xlsx";
      try {
         const response = await fetch(`${$apiURL}+"/upload/${randomFileName}`, {
            method: "GET",
            headers: headers,
         });
         const blob = await response.blob();
         const link = document.createElement("a");
         link.href = window.URL.createObjectURL(blob);
         link.download = filename;
         link.click();
      } catch (error) {
         console.error("Error downloading file:", error);
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

   let tab1 = true;
   let tab2;
   let tab3;
   let tab4;
   let tab5;
   let tab6;
   let tab7;

   function clicktab1() {
      tab1 = true;
      tab2 = false;
      tab3 = false;
      tab4 = false;
      tab5 = false;
      tab6 = false;
      tab7 = false;
   }

   function clicktab2() {
      tab1 = false;
      tab2 = true;
      tab3 = false;
      tab4 = false;
      tab5 = false;
      tab6 = false;
      tab7 = false;
   }

   function clicktab3() {
      tab1 = false;
      tab2 = false;
      tab3 = true;
      tab4 = false;
      tab5 = false;
      tab6 = false;
      tab7 = false;
   }

   function clicktab4() {
      tab1 = false;
      tab2 = false;
      tab3 = false;
      tab4 = true;
      tab5 = false;
   }
   function clicktab5() {
      tab1 = false;
      tab2 = false;
      tab3 = false;
      tab4 = false;
      tab5 = true;
      tab6 = false;
      tab7 = false;
   }
   function clicktab6() {
      tab1 = false;
      tab2 = false;
      tab3 = false;
      tab4 = false;
      tab5 = false;
      tab6 = true;
      tab7 = false;
   }
   function clicktab7() {
      tab1 = false;
      tab2 = false;
      tab3 = false;
      tab4 = false;
      tab5 = false;
      tab6 = false;
      tab7 = true;
   }
</script>

{#if data}
   <Article>
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
                  <span>Reviewer</span>
               </a>
            </li>
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <li on:click={clicktab5} class:is-active={tab5}>
               <!-- svelte-ignore a11y-missing-attribute -->
               <a>
                  <span>Logbook</span>
               </a>
            </li>
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <li on:click={clicktab6} class:is-active={tab6}>
               <!-- svelte-ignore a11y-missing-attribute -->
               <a>
                  <span>Monev</span>
               </a>
            </li>
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <li on:click={clicktab7} class:is-active={tab7}>
               <!-- svelte-ignore a11y-missing-attribute -->
               <a>
                  <span>Laporan</span>
               </a>
            </li>
         </ul>
      </div>

      <!-- Tab Identitas PPM -->
      {#if tab1 === true}
         {#if !view}
            <Field name="Jenis Proposal">
               <div class="select is-fullwidth">
                  <select bind:value={jenisProposal}>
                     <option value="" selected disabled hidden
                        >Pilih Jenis Proposal</option
                     >
                     <option value="Proposal Awal">Proposal Awal</option>
                     <option value="Proposal Lanjutan">Proposal Lanjutan</option
                     >
                  </select>
               </div>
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
                  class="input"
                  type="text"
                  placeholder="Masukkan Kelompok Keahlian"
                  bind:value={kelompokKeahlian}
               />
            </Field>

            <Field name="Topik">
               <input
                  class="input"
                  type="text"
                  placeholder="Masukkan Topik"
                  bind:value={topik}
               />
            </Field>

            <Field
               datepicker
               name="Tahun Pelaksanaan"
               bind:value={tahunPelaksanaan}
            />

            <Field name="Biaya Penelitian">
               <input
                  class="input"
                  type="text"
                  placeholder="Masukkan Biaya Penelitian"
                  bind:value={biayaPenelitian}
                  on:keyup={() =>
                     (biayaPenelitian = formatRupiah(biayaPenelitian, "Rp. "))}
               />
            </Field>

            <Field name="Rencana Anggaran Biaya">
               <input
                  class="input"
                  accept=".xlsx"
                  type="file"
                  on:change={(e) => (file = e.target.files[0])}
               />
            </Field>

            <Field name="Anggota Tim">
               <Select start="2" {items} bind:result={anggotaTim} />
            </Field>

            <br />

            <table
               class="table is-fullwidth is-striped is-hoverable is-bordered"
            >
               <thead>
                  <tr>
                     <th class="is-narrow">Action</th>
                     <th class="is-narrow">Status</th>
                     <th>Nama</th>
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
                                 class="button is-danger is-rounded is-small"
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
                  class="input"
                  type="text"
                  placeholder="Masukkan Judul"
                  bind:value={judul}
               />
            </Field>

            <Field name="Abstrak">
               <textarea class="textarea" bind:value={abstrak}></textarea>
            </Field>

            <Field name="Isi Proposal">
               <Wysiwyg id="isi" content={isi} />
            </Field>

            <hr />

            <Field name="Catatan Revisi">
               {comment}
            </Field>
         {:else}
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

            <Field name="Tahun Pelaksanaan">
               {tahunPelaksanaan}
            </Field>

            <Field name="Biaya Penelitian">
               {biayaPenelitian}
            </Field>

            <Field name="Rencana Anggaran Biaya">
               <button
                  class="button is-link is-rounded button is-small"
                  on:click={handleDownload}>Download RAB</button
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
                     <th class="is-narrow">Status</th>
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

            <Field name="isi">
               <div class="box box-padding">
                  {@html data.isi}
               </div>
            </Field>

            <hr />

            <Field name="Catatan Revisi">
               <textarea class="textarea" bind:value={comment}></textarea>
            </Field>
         {/if}

         <hr />

         <div class="field is-grouped is-grouped-right">
            <!-- {#if view}
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
            {:else}
               <p class="control">
                  <button class="button is-info" on:click={remediasi}
                     >Remediasi</button
                  >
               </p>
            {/if} -->
            {#if status === 2 || status === 4 || status === 6 || status === 8}
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
            {/if}

            {#if status === 10}
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
            {/if}

            {#if status === 1 || status === 3 || status === 5 || status === 7 || status === 9}
               <p class="control">
                  <button class="button is-info" on:click={remediasi}
                     >Remediasi</button
                  >
               </p>
            {/if}
         </div>
      {/if}

      {#if tab2 === true}
         {#if status > 10}
            <div class="columns notification is-danger is-light">
               <div class="column">
                  <p style="text-align: justify;">
                     <strong>Biodata</strong> sebagai salah satu syarat dalam pengajuan
                     hibah Penelitian dan Pengabdian Masyarakat dan apabila dikemudian
                     hari ternyata dijumpai ketidak sesuaian, peneliti sanggup menerima
                     sanksinya.
                  </p>
               </div>
            </div>
         {:else}
            <div class="columns notification is-danger is-light">
               <div class="column">
                  <p style="text-align: justify;">
                     <strong>Biodata</strong> sebagai salah satu syarat dalam
                     pengajuan hibah Penelitian dan Pengabdian Masyarakat dan
                     apabila dikemudian hari ternyata dijumpai ketidak sesuaian,
                     peneliti sanggup menerima sanksinya. Jika ada perubahan,
                     klik
                     <a href={"/admin/profile/" + uidProposal}>
                        <strong>Disini!</strong>
                     </a>
                  </p>
               </div>
            </div>
         {/if}

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

         <br />

         <div>
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

         <br />

         <div>
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

         <br />

         <div>
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

         <br />

         <div>
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

         <br />

         <div>
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

         <br />

         <div>
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

         <br />

         <div>
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

      <!-- Tab Status -->
      {#if tab3 === true}
         <Field name="Status PPM">
            <Status code={data.status} />
         </Field>

         <Field name="Status Pendanaan">
            <div class="field has-addons">
               <div class="control">
                  <div class="select">
                     <select name="country">
                        <option value="Dana belum dicairkan"
                           >Dana belum dicairkan</option
                        >
                        <option value="50% dana sudah dicairkan"
                           >50% dana sudah dicairkan</option
                        >
                        <option value="100% dana sudah dicairkan"
                           >100% dana sudah dicairkan</option
                        >
                     </select>
                  </div>
               </div>
               <div class="control">
                  <button type="submit" class="button is-info">Simpan</button>
               </div>
            </div></Field
         >
      {/if}

      <!-- Tab Reviewer -->
      {#if tab4 === true}
         <Field
            name="Ka. Departemen"
            bind:value={ka_departemen}
            bind:selected={kdeptSelected}
            select
            view
            userId={kdeptSelected}
         />
         <br />
         <Field
            name="Ka. LPPM"
            bind:value={ka_lppm}
            bind:selected={klppmSelected}
            select
            view
            userId={klppmSelected}
         />
         <br />
         <Field
            name="Reviewer"
            bind:value={reviewer}
            bind:selected={reviewerSelected}
            select
            view
            userId={reviewerSelected}
         />
         <br />
         <Field
            name="Ka. Pusat Kajian"
            bind:value={ka_pusat_kajian}
            bind:selected={kpkSelected}
            select
            view
            userId={kpkSelected}
         />
         <br />

         <Field>
            <button class="button is-info" on:click={handleSubmitReviewer}
               >Submit</button
            >
         </Field>
      {/if}

      <!-- Tab Logbook -->
      {#if tab5 === true}
         <div class="columns notification is-info is-light">
            <div class="column">
               <p>
                  Lorem ipsum <strong>LogBook</strong> sit amet consectetur adipisicing
                  elit. Totam suscipit placeat amet.
               </p>
            </div>
         </div>
      {/if}

      <!-- Tab Monev -->
      {#if tab6 === true}
         <div class="columns notification is-success is-light">
            <div class="column">
               <p>
                  Lorem ipsum <strong>Monev</strong> sit amet consectetur adipisicing
                  elit. Totam suscipit placeat amet.
               </p>
            </div>
         </div>
      {/if}

      <!-- Tab Laporan -->
      {#if tab7 === true}
         <div class="columns notification is-info is-light">
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

<Modal bind:show={showModal}>
   <h2 slot="header">Find Approval</h2>
   <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores fuga
      odit accusamus, neque nulla vitae! Fugiat, accusamus amet? Cum est
      delectus soluta iusto odio architecto impedit maxime non asperiores
      eligendi?
   </p>
</Modal>

<style>
   .box-padding {
      padding: 4.724rem;
   }
</style>
