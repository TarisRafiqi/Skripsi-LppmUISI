<script>
   import { onMount, afterUpdate, beforeUpdate } from "svelte";
   import { route, apiURL, ppmFile, rabFile } from "../../store";
   import { deleteIcon, penelitian, accountEdit, add } from "../../store/icons";
   import Article from "../../libs/Article.svelte";
   import Icon from "../../libs/Icon.svelte";
   import Field from "../../libs/Field.svelte";
   import Select from "../../libs/Select.svelte";
   import Modal from "../../libs/Modal.svelte";
   import Modalerror from "../../libs/Modalerror.svelte";

   const id = Number(localStorage.getItem("id"));
   const localStorage_namaLengkap = localStorage.getItem("nama_lengkap");
   let showModalErrorProposal = false;
   let showModalErrorBiodata = false;
   let warningFormText = false;
   let value;
   let label;
   let myAbstract;
   let vmataKuliah;
   let items = [];
   let fileRab;
   let filePpm;

   let jenisKegiatan = "";
   let jenisProposal = "";
   let jenisSkema = "";
   let kelompokKeahlian = "";
   let judul = "";
   let tanggalMulai = "";
   let tanggalSelesai = "";
   let topik = "";
   let biayaPenelitian = "";
   // let anggotaTim = [];
   let anggotaTim = [
      { value: id, label: localStorage_namaLengkap, role: "Ketua" },
   ];
   let randomRabFileName = "";
   let randomPpmFileName = "";

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

   let tahunPublikasi, judulPublikasi, namaJurnal, impactFactor;

   let tahunBuku, JudulBuku, namaPenulisBuku, PenerbitBuku, Isbn;

   let tahunHKI, JudulHKI, namaPenulisHKI, jenisHKI, noHKI;

   let showModalPenelitian = false;
   let showModalPengmas = false;
   let showModalDiseminasi = false;
   let showModalPublikasi = false;
   let showModalPenulisanBuku = false;
   let showModalHKI = false;

   const accessToken = localStorage.getItem("token");
   const headers = {
      Authorization: `${accessToken}`,
      "Content-Type": "application/json",
   };

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

   let inputFilePPM;

   onMount(async () => {
      // --------------------------------------------------
      // Get Users for Form Select Anggota Tim
      // --------------------------------------------------

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
            });
         }
      } else {
         console.log(response);
      }

      //------------------------------------------------------------
      // Get Profile
      //------------------------------------------------------------
      const responseGP = await fetch($apiURL + "/user/" + id, {
         method: "GET",
         headers: headers,
      });

      const resultGP = await responseGP.json();

      if (responseGP.ok) {
         data = resultGP;

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

   //------------------------------------------------------------
   // Add Mata Kuliah
   //------------------------------------------------------------
   function addMatkul() {
      let addVmatkul = {
         label: vmataKuliah,
      };
      mataKuliah = [...mataKuliah, addVmatkul];
      vmataKuliah = "";
   }

   //------------------------------------------------------------
   // Delete Mata Kuliah
   //------------------------------------------------------------
   function deleteMatkul(e) {
      let delMatkul = e.target.getAttribute("data-value");
      mataKuliah = mataKuliah.filter((matkul) => {
         return matkul.label !== delMatkul;
      });
   }

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

   //------------------------------------------------------------
   // Button Simpan Proposal
   //------------------------------------------------------------
   async function simpanProposal() {
      // myAbstract = tinymce.get("abstract").getContent();

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

   //------------------------------------------------------------
   // Button Submit Proposal
   //------------------------------------------------------------
   async function submitProposal() {
      const accessToken = localStorage.getItem("token");
      const readerPpm = new FileReader();

      // -------------------------------------------------------------------//
      // Upload File RAB
      // -------------------------------------------------------------------//
      const readerRab = new FileReader();
      if (
         jenisSkema === "Riset Kelompok Keahlian" ||
         jenisSkema === "Riset Terapan" ||
         jenisSkema === "Riset Kerjasama" ||
         jenisSkema === "Pengabdian Masyarakat Desa Binaan" ||
         jenisSkema === "Pengabdian Masyarakat UMKM Binaan"
      ) {
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
      }
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
      const idnamaLengkap = document.getElementById("namaLengkap");
      const idjabatanFungsional = document.getElementById("jabatanFungsional");
      const idnip = document.getElementById("nip");
      const idnidn = document.getElementById("nidn");
      const idtempatLahir = document.getElementById("tempatLahir");
      const idtanggalLahir = document.getElementById("tanggalLahir");
      const idalamatRumah = document.getElementById("alamatRumah");
      const idtelpFaxRumah = document.getElementById("telpFaxRumah");
      const idnomorHandphone = document.getElementById("nomorHandphone");
      const idalamatKantor = document.getElementById("alamatKantor");
      const idtelpFaxKantor = document.getElementById("telpFaxKantor");
      const idemail = document.getElementById("email");

      if (
         idnamaLengkap.value === "" ||
         idnamaLengkap.value == null ||
         idjabatanFungsional.value === "" ||
         idjabatanFungsional.value == null ||
         idnip.value === "" ||
         idnip.value == null ||
         idnidn.value === "" ||
         idnidn.value == null ||
         idtempatLahir.value === "" ||
         idtempatLahir.value == null ||
         idtanggalLahir.value === "" ||
         idtanggalLahir.value == null ||
         idalamatRumah.value === "" ||
         idalamatRumah.value == null ||
         idtelpFaxRumah.value === "" ||
         idtelpFaxRumah.value == null ||
         idnomorHandphone.value === "" ||
         idnomorHandphone.value == null ||
         idalamatKantor.value === "" ||
         idalamatKantor.value == null ||
         idtelpFaxKantor.value === "" ||
         idtelpFaxKantor.value == null ||
         idemail.value === "" ||
         idemail.value == null ||
         mataKuliah.length === 0
      ) {
         showModalErrorBiodata = true;
      } else {
         // ----------------------------------------------------//
         // Post Proposal                                       //
         // ----------------------------------------------------//
         let payloadProposal = {
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
            status: 2,
            randomRabFileName,
            randomPpmFileName,
         };

         const responseProposal = await fetch($apiURL + "/ppm", {
            method: "POST",
            headers: {
               Authorization: `${accessToken}`,
               "Content-Type": "application/json",
            },
            body: JSON.stringify(payloadProposal),
         });

         // ----------------------------------------------------//
         // Post Identitas                                      //
         // ----------------------------------------------------//
         let payloadIdentitas = {
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

         const responseIdentitas = await fetch($apiURL + "/userprofile", {
            method: "PATCH",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(payloadIdentitas),
         });

         // ----------------------------------------------------
         // Response
         // ----------------------------------------------------
         const resultProposal = await responseProposal.json();
         const resultIdentitas = await responseIdentitas.json();
         console.log(resultProposal);

         if (responseProposal.ok && responseIdentitas.ok) {
            $route("/dosen/ppmmanagement");
         } else {
            console.log(result.msg);
         }
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

   // -----------------------------------------------
   // Stepper Function
   // -----------------------------------------------
   // afterUpdate(() => {
   //    const ppmInput = $ppmFile;
   //    if (ppmInput.name) {
   //       console.log($ppmFile);
   //    }
   // });

   let tab1 = true;
   let tab2;

   function clicktab1() {
      tab1 = true;
      tab2 = false;
   }

   function clicktab2() {
      const idjenisProposal = document.getElementById("jenisProposal");
      const idjenisKegiatan = document.getElementById("jenisKegiatan");
      const idjenisSkema = document.getElementById("jenisSkema");
      const idkelompokKeahlian = document.getElementById("kelompokKeahlian");
      const idtopik = document.getElementById("topik");
      const idtanggalMulai = document.getElementById("tanggalMulai");
      const idtanggalSelesai = document.getElementById("tanggalSelesai");
      const idbiayaPenelitian = document.getElementById("biayaPenelitian");
      const idjudul = document.getElementById("judul");
      const idmyAbstract = document.getElementById("myAbstract");
      // const idanggotaTim = document.getElementById("anggotaTim");
      // const idfilePpm = document.getElementById("filePpm");
      // const idfileRab = document.getElementById("fileRab");

      if (
         idjenisProposal.value === "" ||
         idjenisProposal.value == null ||
         idjenisKegiatan.value === "" ||
         idjenisKegiatan.value == null ||
         idjenisSkema.value === "" ||
         idjenisSkema.value == null ||
         idkelompokKeahlian.value === "" ||
         idkelompokKeahlian.value == null ||
         idtopik.value === "" ||
         idtopik.value == null ||
         idtanggalMulai.value === "" ||
         idtanggalMulai.value == null ||
         idtanggalSelesai.value === "" ||
         idtanggalSelesai.value == null ||
         idbiayaPenelitian.value === "" ||
         idbiayaPenelitian.value == null ||
         anggotaTim.length === 0 ||
         idjudul.value === "" ||
         idjudul.value == null ||
         idmyAbstract.value === "" ||
         idmyAbstract.value == null ||
         $ppmFile.value === "" ||
         $ppmFile.value === null

         // $rabFile.value === "" ||
         // $rabFile.value == null ||
      ) {
         showModalErrorProposal = true;
      } else {
         tab1 = false;
         tab2 = true;
      }
      // tab1 = false;
      // tab2 = true;
   }

   // -----------------------------------------------
   // Tabs Function (Step2)
   // -----------------------------------------------
   let tab1Step2 = true;
   let tab2Step2;
   let tab3Step2;

   function clicktab1Step2() {
      tab1Step2 = true;
      tab2Step2 = false;
      tab3Step2 = false;
   }

   function clicktab2Step2() {
      tab1Step2 = false;
      tab2Step2 = true;
      tab3Step2 = false;
   }

   function clicktab3Step2() {
      tab1Step2 = false;
      tab2Step2 = false;
      tab3Step2 = true;
   }

   // -----------------------------------------------
   // Button Simpan Pengalaman Penelitian
   // -----------------------------------------------
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

   // -----------------------------------------------
   // Button Simpan Pengalaman Pengmas
   // -----------------------------------------------
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

   // -----------------------------------------------
   // Button Simpan Pengalaman Diseminasi
   // -----------------------------------------------
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

   // -----------------------------------------------
   // Button Simpan Pengalaman Publikasi
   // -----------------------------------------------
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

   // -----------------------------------------------
   // Button Simpan Pengalaman Penulisan Buku
   // -----------------------------------------------
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

   // -----------------------------------------------
   // Button Simpan Pengalaman HKI
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

   // -----------------------------------------------
   // Button Delete Pengalaman Penelitian
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

   // -----------------------------------------------
   // Button Delete Pengalaman Pengmas
   // -----------------------------------------------
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

   // -----------------------------------------------
   // Button Delete Pengalaman Diseminasi
   // -----------------------------------------------
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

   // -----------------------------------------------
   // Button Delete Pengalaman Publikasi
   // -----------------------------------------------
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

   // -----------------------------------------------
   // Button Delete Pengalaman Penulisan Buku
   // -----------------------------------------------
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

   // -----------------------------------------------
   // Button Delete Pengalaman HKI
   // -----------------------------------------------
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

   function filePpmChange(e) {
      filePpm = e.target.files[0];
      $ppmFile = e.target.files[0];
   }

   function fileRabChange(e) {
      fileRab = e.target.files[0];
      $rabFile = e.target.files[0];
   }
</script>

<Article>
   <h1 class="title is-1">Pendaftaran Proposal</h1>
   <hr />

   <Modalerror bind:show={showModalErrorProposal}>
      <p>Lengkapi semua form proposal untuk ke step selanjutnya!</p>
   </Modalerror>

   <Modalerror bind:show={showModalErrorBiodata}>
      <p>Lengkapi semua form biodata untuk submit proposal!</p>
   </Modalerror>

   <!-- ---------------------------------------------------- -->
   <!-- Bulma Stepper -->
   <!-- ---------------------------------------------------- -->
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
      </ul>

      <br />

      <!-- ---------------------------------------------------- -->
      <!-- Step 1 - Proposal -->
      <!-- ---------------------------------------------------- -->
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
               <span class="inputf__wrapper">
                  <input
                     id="fileRab"
                     class="inputf custom-file-input"
                     accept=".xlsx"
                     type="file"
                     on:change={fileRabChange}
                  />
                  <label for="fileRab" class="button">
                     {#if $rabFile?.name}
                        {$rabFile.name}
                     {:else}
                        Choose File
                     {/if}
                  </label>
               </span>
               <p class="help is-info">File Type: xlsx</p>
            </Field>
         {/if}

         {#if items.length}
            <Field name="Anggota Tim">
               <Select
                  id="anggotaTim"
                  start="2"
                  {items}
                  bind:result={anggotaTim}
               />
            </Field>
         {/if}

         <br />

         <table class="table is-fullwidth is-striped is-hoverable is-bordered">
            <thead>
               <tr>
                  <th class="is-narrow" style="width:55px"></th>
                  <th class="is-narrow" style="width:86px">Role</th>
                  <th>Nama Anggota </th>
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
            <span class="inputf__wrapper">
               <input
                  id="filePpm"
                  class="inputf custom-file-input"
                  accept="application/pdf"
                  type="file"
                  on:change={filePpmChange}
               />
               <label for="filePpm" class="button">
                  {#if $ppmFile?.name}
                     {$ppmFile.name}
                  {:else}
                     Choose File
                  {/if}
               </label>
            </span>
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

      <!-- ---------------------------------------------------- -->
      <!-- Tabs Step 2 -->
      <!-- ---------------------------------------------------- -->
      {#if tab2 === true}
         <div class="tabs is-boxed">
            <ul>
               <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
               <!-- svelte-ignore a11y-click-events-have-key-events -->
               <li on:click={clicktab1Step2} class:is-active={tab1Step2}>
                  <!-- svelte-ignore a11y-missing-attribute -->
                  <a>
                     <span>Identitas</span>
                  </a>
               </li>
               <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
               <!-- svelte-ignore a11y-click-events-have-key-events -->
               <li on:click={clicktab2Step2} class:is-active={tab2Step2}>
                  <!-- svelte-ignore a11y-missing-attribute -->
                  <a>
                     <span>Riwayat Pendidikan</span>
                  </a>
               </li>
               <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
               <!-- svelte-ignore a11y-click-events-have-key-events -->
               <li on:click={clicktab3Step2} class:is-active={tab3Step2}>
                  <!-- svelte-ignore a11y-missing-attribute -->
                  <a>
                     <span>Pengalaman</span>
                  </a>
               </li>
            </ul>
         </div>

         <!-- ---------------------------------------------------- -->
         <!-- Step 2 Tab 1 - Identitas -->
         <!-- ---------------------------------------------------- -->
         {#if tab1Step2 === true}
            <Field name="Nama Lengkap">
               <input
                  id="namaLengkap"
                  class="input"
                  type="text"
                  bind:value={namaLengkap}
               />
               <p class="help is-info">Masukkan nama lengkap dengan gelar</p>
            </Field>

            <Field name="Jabatan Fungsional">
               <input
                  id="jabatanFungsional"
                  class="input"
                  type="text"
                  bind:value={jabatanFungsional}
               /></Field
            >

            <Field name="NIP">
               <input
                  id="nip"
                  class="input"
                  type="number"
                  bind:value={nip}
               /></Field
            >
            <Field name="NIDN">
               <input
                  id="nidn"
                  class="input"
                  type="number"
                  bind:value={nidn}
               /></Field
            >

            <Field name="Tempat / Tanggal Lahir">
               <div class="field-body">
                  <div class="field">
                     <input
                        id="tempatLahir"
                        class="input"
                        type="text"
                        bind:value={tempatLahir}
                     />
                  </div>
                  <div class="field">
                     <input
                        id="tanggalLahir"
                        class="input"
                        type="date"
                        bind:value={tanggalLahir}
                     />
                  </div>
               </div>
            </Field>

            <Field name="Alamat Rumah">
               <input
                  id="alamatRumah"
                  class="input"
                  type="text"
                  bind:value={alamatRumah}
               />
            </Field>

            <Field name="Telp/Fax Rumah">
               <input
                  id="telpFaxRumah"
                  class="input"
                  type="number"
                  bind:value={telpFaxRumah}
               />
            </Field>

            <Field name="Nomor Handphone">
               <input
                  id="nomorHandphone"
                  class="input"
                  type="number"
                  bind:value={nomorHandphone}
               /></Field
            >
            <Field name="Alamat Kantor">
               <input
                  id="alamatKantor"
                  class="input"
                  type="text"
                  bind:value={alamatKantor}
               /></Field
            >

            <Field name="Telp/Fax Kantor">
               <input
                  id="telpFaxKantor"
                  class="input"
                  type="number"
                  bind:value={telpFaxKantor}
               /></Field
            >
            <Field class="input" name="Email">
               <input id="email" class="input" type="text" bind:value={email} />
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

            <table
               class="table is-fullwidth is-striped is-hoverable is-bordered"
            >
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
         {/if}

         <!-- ---------------------------------------------------- -->
         <!-- Step 2 Tab 2- Riwayat Pendidikan -->
         <!-- ---------------------------------------------------- -->
         {#if tab2Step2 === true}
            <table
               class="table is-fullwidth is-striped is-hoverable is-bordered"
            >
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
                           id="pertiS1"
                           class="input"
                           type="text"
                           bind:value={pertiS1}
                        /></td
                     >
                     <td
                        ><input
                           id="pertiS2"
                           class="input"
                           type="text"
                           bind:value={pertiS2}
                        /></td
                     >
                     <td
                        ><input
                           id="pertiS3"
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
                           id="bidangIlmuS1"
                           class="input"
                           type="text"
                           bind:value={bidangIlmuS1}
                        /></td
                     >
                     <td
                        ><input
                           id="bidangIlmuS2"
                           class="input"
                           type="text"
                           bind:value={bidangIlmuS2}
                        /></td
                     >
                     <td
                        ><input
                           id="bidangIlmuS3"
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
                           id="tahunMasukS1"
                           class="input"
                           type="number"
                           bind:value={tahunMasukS1}
                        /></td
                     >
                     <td
                        ><input
                           id="tahunMasukS2"
                           class="input"
                           type="number"
                           bind:value={tahunMasukS2}
                        /></td
                     >
                     <td
                        ><input
                           id="tahunMasukS3"
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
                           id="tahunLulusS1"
                           class="input"
                           type="number"
                           bind:value={tahunLulusS1}
                        /></td
                     >
                     <td
                        ><input
                           id="tahunLulusS2"
                           class="input"
                           type="number"
                           bind:value={tahunLulusS2}
                        /></td
                     >
                     <td
                        ><input
                           id="tahunLulusS3"
                           class="input"
                           type="number"
                           bind:value={tahunLulusS3}
                        /></td
                     >
                  </tr>
                  <tr>
                     <th>Judul Skripsi/Tesis/Disertasi</th>
                     <td
                        ><textarea
                           id="judulTugasAkhirS1"
                           class="textarea"
                           bind:value={judulTugasAkhirS1}
                        ></textarea></td
                     >
                     <td
                        ><textarea
                           id="judulTugasAkhirS2"
                           class="textarea"
                           bind:value={judulTugasAkhirS2}
                        ></textarea></td
                     >
                     <td
                        ><textarea
                           id="judulTugasAkhirS3"
                           class="textarea"
                           bind:value={judulTugasAkhirS3}
                        ></textarea></td
                     >
                  </tr>
               </tbody>
            </table>
         {/if}

         <!-- ---------------------------------------------------- -->
         <!-- Step 2 Tab 3- Pengalaman -->
         <!-- ---------------------------------------------------- -->
         {#if tab3Step2 === true}
            <!-- ------------------------------------------------------------------------>
            <!-- Table Pengalaman Penelitian -->
            <!-- ------------------------------------------------------------------------>
            <Modal bind:show={showModalPenelitian}>
               <h4 class="title is-4" slot="header">Pengalaman Penelitian</h4>

               <Field name="Tahun">
                  <input
                     class="input"
                     type="number"
                     bind:value={tahunPenelitian}
                  />
               </Field>

               <Field name="Judul Penelitian">
                  <input
                     class="input"
                     type="text"
                     bind:value={judulPenelitian}
                  />
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
                     <button class="button is-info" on:click={simpanPP}
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
                  <input
                     class="input"
                     type="number"
                     bind:value={tahunPengmas}
                  />
               </Field>

               <Field name="Judul Pengmas">
                  <input class="input" type="text" bind:value={judulPengmas} />
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
               </Field>

               <Field name="Sumber Dana">
                  <input
                     class="input"
                     type="text"
                     bind:value={sumberDanaPengmas}
                  />
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
                     <button class="button is-info" on:click={simpanPM}
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
                           Pengalaman Pengabdian Masyarakat
                        </h6>
                     </div>
                  </div>

                  <!-- Right side -->
                  <div class="level-right">
                     <div class="level-item">
                        <button
                           class="button is-info"
                           on:click={clickModalPengmas}
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
                  <input
                     class="input"
                     type="number"
                     bind:value={tahunDiseminasi}
                  />
               </Field>

               <Field name="Judul Artikel">
                  <input
                     class="input"
                     type="text"
                     bind:value={judulDiseminasi}
                  />
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
                     <button class="button is-info" on:click={simpanPD}
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
                           Pengalaman Diseminasi Ilmiah dalam Pertemuan /
                           Pameran
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
                        <th class="is-narrow"
                           >Nama Pertemuan Ilmiah / Pameran</th
                        >
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
                  <input
                     class="input"
                     type="number"
                     bind:value={tahunPublikasi}
                  />
               </Field>

               <Field name="Judul Artikel">
                  <input
                     class="input"
                     type="text"
                     bind:value={judulPublikasi}
                  />
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
                           Pengalaman Publikasi Ilmiah dalam Jurnal (bukan
                           Proceeding)
                        </h6>
                     </div>
                  </div>

                  <!-- Right side -->
                  <div class="level-right">
                     <div class="level-item">
                        <button
                           class="button is-info"
                           on:click={clickModalPublikasi}
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
               <h4 class="title is-4" slot="header">
                  Pengalaman Penulisan Buku
               </h4>

               <Field name="Tahun">
                  <input class="input" type="number" bind:value={tahunBuku} />
               </Field>

               <Field name="Judul Buku">
                  <input class="input" type="text" bind:value={JudulBuku} />
               </Field>

               <Field name="Nama Penulis">
                  <input
                     class="input"
                     type="text"
                     bind:value={namaPenulisBuku}
                  />
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
                  <input
                     class="input"
                     type="text"
                     bind:value={namaPenulisHKI}
                  />
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
      {/if}
   </div>

   <!-- --------------------------------------------------- -->
   <!-- Action Button -->
   <!-- --------------------------------------------------- -->

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

<style>
   /* .custom-file-input {
      color: transparent;
   }
   .custom-file-input::-webkit-file-upload-button {
      visibility: hidden;
   }
   .custom-file-input::before {
      content: "Select some files";
      color: black;
      display: inline-block;
      background: -webkit-linear-gradient(top, #f9f9f9, #e3e3e3);
      border: 1px solid #999;
      border-radius: 3px;
      padding: 5px 8px;
      outline: none;
      white-space: nowrap;
      -webkit-user-select: none;
      cursor: pointer;
      text-shadow: 1px 1px #fff;
      font-weight: 700;
      font-size: 10pt;
   }
   .custom-file-input:hover::before {
      border-color: black;
   }
   .custom-file-input:active {
      outline: 0;
   }
   .custom-file-input:active::before {
      background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
   } */

   .inputf__wrapper {
      position: relative;
      display: flex;
   }
   .inputf__wrapper input {
      width: 0;
      height: 0;
      opacity: 0;
   }
</style>
