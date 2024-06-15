<script>
   import { onMount } from "svelte";
   import { route, apiURL } from "../../store";
   import { deleteIcon, add } from "../../store/icons";
   import Article from "../../libs/Article.svelte";
   import Modal from "../../libs/Modal.svelte";
   import Field from "../../libs/Field.svelte";
   import Icon from "../../libs/Icon.svelte";
   import Modalerror from "../../libs/Modalerror.svelte";

   const id = localStorage.getItem("id");
   let vmataKuliah;
   let error = {};

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

   // Memakai akses Token, hanya uid pemilik dan role Admin yang bisa mengakses halaman ini
   const accessToken = localStorage.getItem("token");
   const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
   };

   onMount(async () => {
      const response = await fetch($apiURL + "/user/" + id, {
         method: "GET",
         headers: headers,
      });

      const result = await response.json();
      // console.log(result);

      if (response.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
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
      }

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

   // ------------------------------------------------------------
   // Simpan Identitas
   // ------------------------------------------------------------
   async function simpanIdentitas() {
      error = {};

      let payload = {
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

      for (const [key, value] of Object.entries(payload)) {
         if (!payload[key]) {
            error[key] = `This field is required`;
         }
      }

      if (Object.keys(error).length > 0) {
         showModalErrorForm = true;
      } else {
         const response = await fetch($apiURL + "/userprofile", {
            method: "PATCH",
            headers: {
               Authorization: `Bearer ${accessToken}`,
               "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
         });

         const result = await response.json();

         if (response.status === 401) {
            location.pathname = "/tokenexpired";
         } else {
            if (response.ok) {
               $route("/dosen");
            } else {
               console.log(response);
            }
         }
      }
   }

   // ------------------------------------------------------------
   // Simpan Riwayat Pendidikan S1
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
   // Simpan Riwayat Pendidikan S2
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
   // Simpan Riwayat Pendidikan S3
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

   // ------------------------------------------------------------
   // Simpan Pengalaman Penelitian
   // ------------------------------------------------------------
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

   // ------------------------------------------------------------
   // Simpan Pengalaman Pengabdian Masyarakat
   // ------------------------------------------------------------
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
            headers: {
               Authorization: `Bearer ${accessToken}`,
               "Content-Type": "application/json",
            },
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

   // ------------------------------------------------------------
   // Simpan Pengalaman Diseminasi
   // ------------------------------------------------------------
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
            headers: {
               Authorization: `Bearer ${accessToken}`,
               "Content-Type": "application/json",
            },
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

   // ------------------------------------------------------------
   // Simpan Pengalaman Publikasi
   // ------------------------------------------------------------
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
            headers: {
               Authorization: `Bearer ${accessToken}`,
               "Content-Type": "application/json",
            },
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

   // ------------------------------------------------------------
   // Simpan Pengalaman Penulisan Buku
   // ------------------------------------------------------------
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
            headers: {
               Authorization: `Bearer ${accessToken}`,
               "Content-Type": "application/json",
            },
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

   // ------------------------------------------------------------
   // Simpan Pengalaman Hak Kekayaan Intelektual
   // ------------------------------------------------------------
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
            headers: {
               Authorization: `Bearer ${accessToken}`,
               "Content-Type": "application/json",
            },
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

   async function delrowPM(ev) {
      let idPM = ev.target.getAttribute("pid");

      const response = await fetch($apiURL + "/pengalamanPengmas/" + idPM, {
         method: "DELETE",
         headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
         },
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

   async function delrowPD(ev) {
      let idPD = ev.target.getAttribute("pid");

      const response = await fetch($apiURL + "/pengalamanDiseminasi/" + idPD, {
         method: "DELETE",
         headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
         },
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

   async function delrowPPub(ev) {
      let idPPub = ev.target.getAttribute("pid");

      const response = await fetch($apiURL + "/pengalamanPublikasi/" + idPPub, {
         method: "DELETE",
         headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
         },
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

   async function delrowPPB(ev) {
      let idPPB = ev.target.getAttribute("pid");

      const response = await fetch(
         $apiURL + "/pengalamanPenulisanBuku/" + idPPB,
         {
            method: "DELETE",
            headers: {
               Authorization: `Bearer ${accessToken}`,
               "Content-Type": "application/json",
            },
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

   async function delrowPHKI(ev) {
      let idPHKI = ev.target.getAttribute("pid");

      const response = await fetch($apiURL + "/pengalamanHKI/" + idPHKI, {
         method: "DELETE",
         headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
         },
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
   <h2 class="title is-2">Profile</h2>

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
      <div class="box">
         <Field name="Nama Lengkap">
            <input
               class="input"
               type="text"
               placeholder="Masukkan nama lengkap dengan gelar"
               bind:value={namaLengkap}
            />
            {#if error.namaLengkap}
               <p class="help error is-danger">{error.namaLengkap}</p>
            {/if}
         </Field>

         <Field name="Jabatan Fungsional">
            <div class="select is-fullwidth">
               <select bind:value={jabatanFungsional}>
                  <option value="" selected disabled hidden
                     >Pilih Jabatan Fungsional</option
                  >
                  <option value="Asisten Ahli">Asisten Ahli</option>
                  <option value="Lektor">Lektor</option>
                  <option value="Lektor Kepala">Lektor Kepala</option>
                  <option value="Profesor">Profesor</option>
               </select>
            </div>
            {#if error.jabatanFungsional}
               <p class="help error is-danger">{error.jabatanFungsional}</p>
            {/if}
         </Field>

         <Field name="NIP">
            <input class="input" type="number" bind:value={nip} />
            {#if error.nip}
               <p class="help error is-danger">{error.nip}</p>
            {/if}
         </Field>
         <Field name="NIDN">
            <input class="input" type="number" bind:value={nidn} />
            {#if error.nidn}
               <p class="help error is-danger">{error.nidn}</p>
            {/if}</Field
         >

         <Field name="Tempat Lahir">
            <input class="input" type="text" bind:value={tempatLahir} />
            {#if error.tempatLahir}
               <p class="help error is-danger">{error.tempatLahir}</p>
            {/if}
         </Field>

         <Field name="Tanggal Lahir">
            <input class="input" type="date" bind:value={tanggalLahir} />
            {#if error.tanggalLahir}
               <p class="help error is-danger">{error.tanggalLahir}</p>
            {/if}
         </Field>

         <Field name="Alamat Rumah">
            <input class="input" type="text" bind:value={alamatRumah} />
            {#if error.alamatRumah}
               <p class="help error is-danger">{error.alamatRumah}</p>
            {/if}
         </Field>

         <Field name="Telp/Fax Rumah">
            <input class="input" type="number" bind:value={telpFaxRumah} />
            {#if error.telpFaxRumah}
               <p class="help error is-danger">{error.telpFaxRumah}</p>
            {/if}
         </Field>

         <Field name="Nomor Handphone">
            <input class="input" type="number" bind:value={nomorHandphone} />
            {#if error.nomorHandphone}
               <p class="help error is-danger">{error.nomorHandphone}</p>
            {/if}</Field
         >
         <Field name="Alamat Kantor">
            <input class="input" type="text" bind:value={alamatKantor} />
            {#if error.alamatKantor}
               <p class="help error is-danger">{error.alamatKantor}</p>
            {/if}</Field
         >

         <Field name="Telp/Fax Kantor">
            <input class="input" type="number" bind:value={telpFaxKantor} />
            {#if error.telpFaxKantor}
               <p class="help error is-danger">{error.telpFaxKantor}</p>
            {/if}</Field
         >
         <Field class="input" name="Email">
            <input class="input" type="text" bind:value={email} />
            {#if error.email}
               <p class="help error is-danger">{error.email}</p>
            {/if}
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
                  {#if error.mataKuliah}
                     <p class="help error is-danger">{error.mataKuliah}</p>
                  {/if}
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

         <table
            class="table mt-4 is-fullwidth is-striped is-hoverable is-bordered"
         >
            <thead>
               <tr>
                  <th class="is-narrow"></th>
                  <th>Mata Kuliah yang diampu</th>
               </tr>
            </thead>
            <tbody>
               {#if mataKuliah && mataKuliah.length > 0}
                  {#each mataKuliah as matkul}
                     <tr>
                        <td
                           ><button
                              class="button is-danger is-small"
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
      <!-- =========================================== -->
      <!--             Riwayat Pendidikan S1           -->
      <!-- =========================================== -->
      <div class="box">
         <nav class="level">
            <div class="level-left">
               <div class="level-item">
                  <h6 class="title is-6">Riwayat Pendidikan S1</h6>
               </div>
            </div>

            <div class="level-right">
               <div class="level-item">
                  <button
                     class="button is-info"
                     on:click={modalInputRiwayatPendidikanS1}
                  >
                     <span class="icon">
                        <Icon id="add" src={add} />
                     </span>
                     <!-- svelte-ignore a11y-missing-attribute -->
                     <span><a>Tambah</a></span>
                  </button>
               </div>
            </div>
         </nav>

         <table class="table is-fullwidth is-striped is-hoverable is-bordered">
            <thead>
               <tr>
                  <th></th>
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
                        <td
                           ><button
                              class="button is-danger is-small"
                              pid={RPS1.id}
                              on:click={delrowRPS1}
                              ><span class="icon">
                                 <Icon id="delete" src={deleteIcon} />
                              </span></button
                           ></td
                        >
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

      <!-- =========================================== -->
      <!--             Riwayat Pendidikan S2           -->
      <!-- =========================================== -->
      <div class="box">
         <nav class="level">
            <div class="level-left">
               <div class="level-item">
                  <h6 class="title is-6">Riwayat Pendidikan S2</h6>
               </div>
            </div>

            <div class="level-right">
               <div class="level-item">
                  <button
                     class="button is-info"
                     on:click={modalInputRiwayatPendidikanS2}
                  >
                     <span class="icon">
                        <Icon id="add" src={add} />
                     </span>
                     <!-- svelte-ignore a11y-missing-attribute -->
                     <span><a>Tambah</a></span>
                  </button>
               </div>
            </div>
         </nav>

         <table class="table is-fullwidth is-striped is-hoverable is-bordered">
            <thead>
               <tr>
                  <th></th>
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
                        <td
                           ><button
                              class="button is-danger is-small"
                              pid={RPS2.id}
                              on:click={delrowRPS2}
                              ><span class="icon">
                                 <Icon id="delete" src={deleteIcon} />
                              </span></button
                           ></td
                        >
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

      <!-- =========================================== -->
      <!--             Riwayat Pendidikan S3           -->
      <!-- =========================================== -->
      <div class="box">
         <nav class="level">
            <div class="level-left">
               <div class="level-item">
                  <h6 class="title is-6">Riwayat Pendidikan S3</h6>
               </div>
            </div>

            <div class="level-right">
               <div class="level-item">
                  <button
                     class="button is-info"
                     on:click={modalInputRiwayatPendidikanS3}
                  >
                     <span class="icon">
                        <Icon id="add" src={add} />
                     </span>
                     <!-- svelte-ignore a11y-missing-attribute -->
                     <span><a>Tambah</a></span>
                  </button>
               </div>
            </div>
         </nav>

         <table class="table is-fullwidth is-striped is-hoverable is-bordered">
            <thead>
               <tr>
                  <th></th>
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
                        <td
                           ><button
                              class="button is-danger is-small"
                              pid={RPS3.id}
                              on:click={delrowRPS3}
                              ><span class="icon">
                                 <Icon id="delete" src={deleteIcon} />
                              </span></button
                           ></td
                        >
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
   {/if}

   {#if tab3 === true}
      <!-- ------------------------------------------------------------------------>
      <!-- Pengalaman Pengalaman Penelitian -->
      <!-- ------------------------------------------------------------------------>
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

         <table class="table is-fullwidth is-striped is-hoverable is-bordered">
            <thead>
               <tr>
                  <th class="is-narrow"></th>
                  <th class="is-narrow">Tahun</th>
                  <th>Judul Penelitian</th>
                  <th class="is-narrow">Role</th>
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
                              class="button is-danger is-small"
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

      <!-- ------------------------------------------------------------------------>
      <!-- Pengalaman Pengabdian Masyarakat -->
      <!-- ------------------------------------------------------------------------>
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

         <table class="table is-fullwidth is-striped is-hoverable is-bordered">
            <thead>
               <tr>
                  <th class="is-narrow"></th>
                  <th class="is-narrow">Tahun</th>
                  <th>Judul Pengabdian Masyarakat</th>
                  <th class="is-narrow">Role</th>
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
                              class="button is-danger is-small"
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

      <!-- ------------------------------------------------------------------------>
      <!-- Pengalaman Diseminasi Ilmiah dalam Pertemuan / Pameran -->
      <!-- ------------------------------------------------------------------------>
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
            <tbody>
               {#if dataPD}
                  {#each dataPD as PD}
                     <tr>
                        <td
                           ><button
                              class="button is-danger is-small"
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

      <!-- ------------------------------------------------------------------------>
      <!-- Pengalaman Publikasi Ilmiah dalam Jurnal "Bukan Proceeding" -->
      <!-- ------------------------------------------------------------------------>
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

         <table class="table is-fullwidth is-striped is-hoverable is-bordered">
            <thead>
               <tr>
                  <th class="is-narrow"></th>
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
                        <td
                           ><button
                              class="button is-danger is-small"
                              pid={PPub.id}
                              on:click={delrowPPub}
                              ><span class="icon">
                                 <Icon id="delete" src={deleteIcon} />
                              </span></button
                           ></td
                        >
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

      <!-- ------------------------------------------------------------------------>
      <!-- Pengalaman Penulisan Buku -->
      <!-- ------------------------------------------------------------------------>
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
            <tbody>
               {#if dataPPB}
                  {#each dataPPB as PPB}
                     <tr>
                        <td
                           ><button
                              class="button is-danger is-small"
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

      <!-- ------------------------------------------------------------------------>
      <!-- Pengalaman Hak Kekayaan Intelektual -->
      <!-- ------------------------------------------------------------------------>
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
            <tbody>
               {#if dataPHKI}
                  {#each dataPHKI as PHKI}
                     <tr>
                        <td
                           ><button
                              class="button is-danger is-small"
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
         <p class="help error is-danger">{error.sumberDanaPenelitian}</p>
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

   <Field name="Impact Factor/Scopus Quarter/Akreditasi">
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

<!-- ------------------------------------------------------------------------>
<!-- Modal Error -->
<!-- ------------------------------------------------------------------------>
<Modalerror bind:show={showModalErrorForm}>
   <p>Lengkapi semua form sebelum disimpan</p>
</Modalerror>

<style>
   .help {
      /* top, right, bottom, left */
      margin: -6px 0px 0px 0px;
   }
</style>
