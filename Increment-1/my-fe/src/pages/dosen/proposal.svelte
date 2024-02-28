<script>
   import { onMount } from "svelte";
   import { route, apiURL } from "../../store";
   import Article from "../../libs/Article.svelte";
   import Icon from "../../libs/Icon.svelte";
   import Field from "../../libs/Field.svelte";
   import { deleteIcon } from "../../store/icons";
   import Select from "../../libs/Select.svelte";
   import Wysiwyg from "../../libs/Wysiwyg.svelte";

   let value;
   let label;

   let jenisKegiatan = "";
   let jenisProposal = "";
   let jenisSkema = "";
   let kelompokKeahlian = "";
   let judul = "";
   let tahunPelaksanaan = "";
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
   let file;
   let fileRab;
   let filePpm;

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
      console.log(fileRab);
      console.log(fileRab.name);
      console.log(fileRab.type);
      console.log(randomRabFileName);
      console.log(randomPpmFileName);

      const accessToken = localStorage.getItem("token");
      // myAbstract = tinymce.get("abstract").getContent();
      myIsi = tinymce.get("isi").getContent();

      // -----------------------------------------------------------------------------//
      const reader = new FileReader();
      reader.onloadend = async () => {
         const base64Data = reader.result.split(",")[1];
         const payloadfile = {
            fileRab: {
               name: fileRab.name,
               type: fileRab.type,
               data: base64Data,
            },
            randomRabFileName,
         };
         return;

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
      reader.readAsDataURL(fileRab);
      // -----------------------------------------------------------------------------//
      return;
      let payload = {
         id,
         jenisProposal,
         jenisKegiatan,
         jenisSkema,
         kelompokKeahlian,
         topik,
         tahunPelaksanaan,
         biayaPenelitian,
         anggotaTim,
         judul,
         myAbstract,
         myIsi,
         status: 0,
         randomRabFileName,
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
      const accessToken = localStorage.getItem("token");
      // myAbstract = tinymce.get("abstract").getContent();
      myIsi = tinymce.get("isi").getContent();

      // -----------------------------------------------------------------------------//
      const reader = new FileReader();
      reader.onloadend = async () => {
         const base64Data = reader.result.split(",")[1];
         const payloadfile = {
            fileRab: {
               name: fileRab.name,
               type: fileRab.type,
               data: base64Data,
            },
            randomRabFileName,
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
            // console.log(result);
         } catch (error) {
            console.error("Error uploading file:", error);
         }
      };
      reader.readAsDataURL(fileRab);
      // -----------------------------------------------------------------------------//

      let payload = {
         id,
         jenisProposal,
         jenisKegiatan,
         jenisSkema,
         kelompokKeahlian,
         topik,
         tahunPelaksanaan,
         biayaPenelitian,
         anggotaTim,
         judul,
         myAbstract,
         myIsi,
         status: 2,
         randomRabFileName,
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
</script>

<Article>
   <h1 class="title is-1">Buat Proposal</h1>
   <hr />

   <Field name="Jenis Proposal">
      <div class="select is-fullwidth">
         <select bind:value={jenisProposal}>
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
         <select bind:value={jenisKegiatan}>
            <option value="" selected disabled hidden
               >Pilih Jenis Kegiatan</option
            >
            <option value="Penelitian">Penelitian</option>
            <option value="Pengabdian Masyarakat">Pengabdian Masyarakat</option>
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
         placeholder="Masukkan kelompok keahlian"
         bind:value={kelompokKeahlian}
      />
   </Field>

   <Field name="Topik">
      <input
         class="input"
         type="text"
         placeholder="Masukkan topik"
         bind:value={topik}
      />
   </Field>

   <Field datepicker name="Tahun Pelaksanaan" bind:value={tahunPelaksanaan} />

   <!-- <Field name="Tanggal Mulai">
      <div class="field">
         <input class="input" type="date" bind:value={tanggalMulai} />
      </div>
   </Field>

   <Field name="Tanggal Selesai">
      <div class="field">
         <input class="input" type="date" bind:value={tanggalSelesai} />
      </div>
   </Field> -->

   <Field name="Biaya Penelitian">
      <input
         class="input"
         type="text"
         placeholder="Masukkan biaya penelitian"
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
         on:change={(e) => (fileRab = e.target.files[0])}
      />
      <p class="help is-info">File Type: xlsx</p>
   </Field>

   <Field name="Anggota Tim">
      <Select start="2" {items} bind:result={anggotaTim} />
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
         class="input"
         type="text"
         placeholder="Masukkan judul"
         bind:value={judul}
      />
   </Field>

   <Field name="Abstrak">
      <textarea
         class="textarea"
         bind:value={myAbstract}
         placeholder="Masukkan abstrak"
      ></textarea>
   </Field>

   <Field name="Proposal">
      <input
         class="input"
         accept="application/pdf"
         type="file"
         on:change={(e) => (filePpm = e.target.files[0])}
      />
      <p class="help is-info">File Type: pdf</p>
   </Field>

   <!-- <Field name="Isi Proposal">
      <Wysiwyg id="isi" content={myIsi} />
   </Field> -->

   <!-- <Field id="abstract" textarea name="Abstrak" />
   <Field id="isi" textarea name="Isi Proposal" /> -->

   <hr />

   <!-- <Field>
      <button class="button is-info is-light" on:click={simpanProposal}
         >Simpan</button
      >
      <button class="button is-info" on:click={submitProposal}>Submit</button>
   </Field> -->

   <div class="field is-grouped is-grouped-right">
      <p class="control">
         <button class="button is-info is-light" on:click={simpanProposal}
            >Simpan</button
         >
      </p>
      <p class="control">
         <button class="button is-info" on:click={submitProposal}>Submit</button
         >
      </p>
   </div>
</Article>
