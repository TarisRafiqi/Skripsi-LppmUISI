<script>
   import { onMount } from "svelte";
   import { route, apiURL, ppmFile, rabFile, penilaianFile } from "../../store";
   import Article from "../../libs/Article.svelte";
   import Field from "../../libs/Field.svelte";
   import Modal from "../../libs/Modal.svelte";
   import Modalerror from "../../libs/Modalerror.svelte";
   import Icon from "../../libs/Icon.svelte";
   import Select from "../../libs/Select.svelte";
   import {
      deleteIcon,
      edit,
      cancelIcon,
      downloadIcon,
   } from "../../store/icons";
   // import Status from "../../modules/Status.svelte";
   // import Wysiwyg from "../../libs/Wysiwyg.svelte";

   export let params;
   const id = params["1"];
   let error = {};

   const idEvaluator = localStorage.getItem("id");
   let dataRPS1, dataRPS2, dataRPS3;
   let data, dataGP, dataPP, dataPM, dataPD, dataPPub, dataPPB, dataPHKI;
   let showModalError = false;
   let showModalErrorRevisi = false;
   let showModalErrorPassReviewer = false;
   let showModalErrorInputEvaluator = false;
   let isLoading = false;
   let randomPenilaianFileName = "";

   let jenisProposal;
   let jenisKegiatan;
   let jenisSkema;
   let kelompokKeahlian;
   let topik;
   let tanggalMulai;
   let tanggalSelesai;
   let biayaPenelitian;
   let anggotaTim = [];
   let judul;
   let abstrak;
   let comment;
   let status;
   let itemsRCR;

   let ka_departemen;
   let ka_lppm;
   let reviewer;
   let ka_pusat_kajian;
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

   let uidProposal;

   let fileRab;
   let filePpm;
   let items = [];
   let view;
   let editModeProposal = false;
   let editModeRAB = false;

   const accessToken = localStorage.getItem("token");
   const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
   };

   // pakai akses token, hanya uid yang bersangkutan, dan role admin yang boleh mengakses halaman ini
   onMount(async () => {
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

      if (result.statusCode != 200) {
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

      if (resultEvl.statusCode != 200) {
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

      if (dataRCR.statusCode != 200) {
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

      if (resultGP.statusCode != 200) {
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

      if (resultPP.statusCode != 200) {
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

      if (resultPM.statusCode != 200) {
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

      if (resultPD.statusCode != 200) {
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

      if (resultPPub.statusCode != 200) {
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

      if (resultPPB.statusCode != 200) {
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

      if (resultPHKI.statusCode != 200) {
         location.pathname = "/tokenexpired";
      } else {
         if (responsePHKI.ok) {
            dataPHKI = resultPHKI.dbData;
         } else {
            console.log(responsePHKI);
         }
      }

      // -----------------------------------------------------------------------------//
      // Mengisi list Select Anggota Tim
      // -----------------------------------------------------------------------------//
      const responsee = await fetch($apiURL + "/pilihUser", {
         method: "GET",
         headers: headers,
      });

      const results = await responsee.json();

      if (results.statusCode != 200) {
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

   async function getDetailProposal() {
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

      if (result.statusCode != 200) {
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
            randomPenilaianFileNamedb = data.random_penilaian_file_name;
         }
      }
   }

   function isEdit(code) {
      const edit = [0, 1, 3, 5, 7, 9];
      return edit.some((x) => x === code);
   }

   function isObjectEmpty(objectName) {
      return (
         objectName &&
         Object.keys(objectName).length === 0 &&
         objectName.constructor === Object
      );
   }

   async function handleSubmitEvaluator() {
      error = {};
      isLoading = true;

      const payload = {
         id,
         kdeptSelected,
         klppmSelected,
         kpkSelected,
         reviewerSelected,
      };

      for (const [key, value] of Object.entries(payload)) {
         if (!payload[key]) {
            error[key] = `This field is required`;
         }
      }

      if (Object.keys(error).length > 0) {
         showModalErrorInputEvaluator = true;
      } else {
         const response = await fetch($apiURL + "/submitEvaluator", {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(payload),
         });

         const result = await response.json();

         if (response.status === 401) {
            location.pathname = "/tokenexpired";
         } else {
            if (response.ok) {
               getDetailProposal();
            } else {
               console.log(response);
            }
         }
      }
      isLoading = false;
   }

   async function remediasi() {
      error = {};
      isLoading = true;
      const readerRab = new FileReader();
      const readerPpm = new FileReader();

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
            }
         };

         if (fileRab) readerRab.readAsDataURL(fileRab);

         // ================================================//
         // Patch Data Proposal PPM
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
               $route("/admin/ppmmanagement");
            } else {
               console.log(response);
            }
         }
      }
      isLoading = false;
   }

   async function handleRevisi() {
      error = {};
      isLoading = true;

      let payload = {
         comment,
         status: Number(data.status) - 1,
         id,
      };

      const payloadCttnRevisi = {
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

         if (resultRev.statusCode != 200) {
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
               $route("/admin/ppmmanagement");
            } else {
               console.log(response);
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
            $route("/admin/ppmmanagement");
         } else {
            console.log(response);
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
      // -------------------------------------------------------------------//
      // Upload File Penilaian
      // -------------------------------------------------------------------//
      if (isObjectEmpty($penilaianFile)) {
         error["filePenilaian"] = `*`;
      }

      if (Object.keys(error).length > 0) {
         showModalErrorPassReviewer = true;
      } else {
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
               }
            };
            readerPenilaian.readAsDataURL(filePenilaian);
         }
         // -------------------------------------------------------------------//
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
               $route("/admin/ppmmanagement");
            } else {
               console.log(response);
            }
         }
      }
      isLoading = false;
   }

   async function handlePass() {
      let db_Kdept = data.uid_kdept;
      let db_Klppm = data.uid_klppm;
      let db_Kpk = data.uid_kpk;
      let db_Reviewer = data.uid_reviewer;
      error = {};
      isLoading = true;

      let payload = {
         comment: "",
         status: Number(data.status) + 2,
         id,
      };

      let dbEvaluator = {
         db_Kdept,
         db_Klppm,
         db_Kpk,
         db_Reviewer,
      };

      for (const [key, value] of Object.entries(dbEvaluator)) {
         if (!dbEvaluator[key]) {
            error[key] = `This field is required`;
         }
      }

      if (Object.keys(error).length > 0) {
         showModalErrorInputEvaluator = true;
      } else {
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
               $route("/admin/ppmmanagement");
            } else {
               console.log(response);
               // Buat Handle Error
               // ...
            }
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

   let options;

   async function findRole(role) {
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

   function toggleEditModeProposal() {
      editModeProposal = !editModeProposal;
   }

   function toggleEditModeRAB() {
      editModeRAB = !editModeRAB;
   }

   function filePpmChange(e) {
      filePpm = e.target.files[0];
      $ppmFile = e.target.files[0];
   }

   function fileRabChange(e) {
      fileRab = e.target.files[0];
      $rabFile = e.target.files[0];
   }

   function filePenilaianChange(e) {
      filePenilaian = e.target.files[0];
      $penilaianFile = e.target.files[0];
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

   $: isFormFilled =
      kdeptSelected && klppmSelected && reviewerSelected && kpkSelected;
</script>

{#if data}
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
                        <option value="Proposal Awal">Proposal Awal</option>
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
                  <div class="field">
                     <input
                        class="input"
                        type="date"
                        bind:value={tanggalMulai}
                     />
                  </div>
                  {#if error.tanggalMulai}
                     <p class="help error is-danger">{error.tanggalMulai}</p>
                  {/if}
               </Field>

               <Field name="Tanggal Selesai">
                  <div class="field">
                     <input
                        class="input"
                        type="date"
                        bind:value={tanggalSelesai}
                     />
                  </div>
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
                                       class="button is-danger is-rounded is-small"
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

               <Field name="Proposal">
                  {#if !editModeProposal}
                     <button
                        class="button is-link button"
                        on:click={handleDownloadPpm}>Download Proposal</button
                     >
                     <button
                        class="button is-link is-light"
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
                        <div class="file has-name is-success">
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
                           class="button is-danger is-light"
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
                           class="button is-link button"
                           on:click={handleDownloadRab}>Download RAB</button
                        >
                        <button
                           class="button is-link is-light"
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
                           <div class="file has-name is-success">
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
                              class="button is-danger is-light"
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

                  {#if status > 8}
                     <Field name="Penilaian Proposal">
                        <button
                           class="button is-link button"
                           on:click={handleDownloadPenilaian}
                           >Download Form Penilaian</button
                        >
                     </Field>
                  {/if}
               {/if}
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

               <!-- <Field name="Tahun Pelaksanaan">
               {tahunPelaksanaan}
               </Field> -->

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
                     class="button is-link button"
                     on:click={handleDownloadPpm}>Download Proposal</button
                  >
               </Field>

               {#if jenisSkema === "Riset Kelompok Keahlian" || jenisSkema === "Riset Terapan" || jenisSkema === "Riset Kerjasama" || jenisSkema === "Pengabdian Masyarakat Desa Binaan" || jenisSkema === "Pengabdian Masyarakat UMKM Binaan"}
                  <Field name="RAB">
                     <button
                        class="button is-link button"
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
                           <div class="file has-name is-success">
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
                                    <span class="file-label">
                                       Choose a file</span
                                    >
                                 </span>
                                 {#if $penilaianFile?.name}
                                    <span class="file-name">
                                       {$penilaianFile.name}</span
                                    >
                                 {:else}
                                    <span class="file-name">No file chosen</span
                                    >
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
                           class="button is-link button"
                           on:click={handleDownloadPenilaian}
                           >Download Form Penilaian</button
                        >
                     </Field>
                  {/if}
               {/if}
            {/if}
         </div>

         <!-- ========================================== -->
         <!--              Catatan Revisi                -->
         <!-- ========================================== -->
         {#if status != 0}
            <div class="box">
               <h4 class="title is-4">Informasi Revisi</h4>
               <hr />
               {#if !view}
                  <Field name="Catatan Revisi">
                     {comment}
                  </Field>
               {:else if status != 8}
                  <div class="notification is-warning is-light">
                     <p>Berikan catatan revisi jika ingin revisi proposal.</p>
                  </div>

                  <Field name="Catatan Revisi">
                     <textarea
                        class="textarea"
                        bind:value={comment}
                        name="komentar"
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
                        <th style="width: 70%;">Riwayat Catatan Revisi</th>
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

         <!-- ========================================== -->
         <!--              Input Evaluator               -->
         <!-- ========================================== -->
         {#if status != 0}
            <div class="box">
               <h4 class="title is-4">Input Evaluator</h4>
               <hr />
               <Field
                  id={"evaluatorKdept"}
                  name="Ka. Departemen"
                  bind:value={ka_departemen}
                  bind:selected={kdeptSelected}
                  select
                  view
                  userId={kdeptSelected}
               />
               <br />
               <Field
                  id={"evaluatorKlppm"}
                  name="Ka. LPPM"
                  bind:value={ka_lppm}
                  bind:selected={klppmSelected}
                  select
                  view
                  userId={klppmSelected}
               />
               <br />
               <Field
                  id={"evaluatorReviewer"}
                  name="Reviewer"
                  bind:value={reviewer}
                  bind:selected={reviewerSelected}
                  select
                  view
                  userId={reviewerSelected}
               />
               <br />
               <Field
                  id={"evaluatorKpk"}
                  name="Ka. Pusat Kajian"
                  bind:value={ka_pusat_kajian}
                  bind:selected={kpkSelected}
                  select
                  view
                  userId={kpkSelected}
               />

               <div class="field is-grouped is-grouped-right">
                  <p class="control">
                     {#if isFormFilled}
                        <button
                           class="button is-success"
                           class:is-loading={isLoading}
                           on:click={handleSubmitEvaluator}
                           >Submit Evaluator</button
                        >
                     {:else}
                        <button class="button is-success" disabled>
                           Submit Evaluator
                        </button>
                     {/if}
                  </p>
               </div>
            </div>
         {/if}

         <!-- ========================================== -->
         <!--              Action Button                 -->
         <!-- ========================================== -->
         <div class="field is-grouped is-grouped-right">
            {#if status === 2 || status === 6}
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

            {#if status === 4}
               <p class="control">
                  <button
                     class="button is-info"
                     on:click={handlePass}
                     class:is-loading={isLoading}>Proses</button
                  >
               </p>
            {/if}

            {#if status === 8}
               <p class="control">
                  <button
                     class="button is-info"
                     on:click={handlePassReviewer}
                     class:is-loading={isLoading}>Proses</button
                  >
               </p>
            {/if}

            {#if status === 10}
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
            {/if}

            {#if status === 1 || status === 3 || status === 5 || status === 7 || status === 9}
               <p class="control">
                  <button
                     class="button is-info"
                     on:click={remediasi}
                     class:is-loading={isLoading}>Remediasi</button
                  >
               </p>
            {/if}
         </div>
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
   </Article>
{/if}

<Modalerror bind:show={showModalError}>
   <p>Lengkapi semua form</p>
</Modalerror>

<Modalerror bind:show={showModalErrorRevisi}>
   <p>Berikan catatan revisi jika ingin revisi proposal.</p>
</Modalerror>

<Modalerror bind:show={showModalErrorPassReviewer}>
   <p>Anda belum mengupload file penilaian proposal</p>
</Modalerror>

<Modalerror bind:show={showModalErrorInputEvaluator}>
   <p>Lengkapi form input evaluator</p>
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
</style>
