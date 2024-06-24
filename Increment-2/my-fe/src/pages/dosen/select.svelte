<script>
   import { cancelIcon, edit, downloadIcon } from "../../store/icons";
   import { route, apiURL, ppmFile } from "../../store";
   import Article from "../../libs/Article.svelte";
   import Fieldview from "../../libs/Fieldview.svelte";
   import { onMount } from "svelte";
   import Select from "../../libs/Select.svelte";
   import Field from "../../libs/Field.svelte";
   import Icon from "../../libs/Icon.svelte";
   import {
      accountAdmin,
      uploadIcon,
      googleIcon,
      copyright,
      infoOutline,
      penelitian,
      pengmas,
      jurnal,
   } from "../../store/icons";

   const accessToken = localStorage.getItem("token");
   const id = Number(localStorage.getItem("id"));
   const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
   };

   let errorMark = true;

   // Function to check the condition
   function ShowButtonPerbaikan() {
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

      const StatusRevisiSkemaInternal = [1, 3, 5, 7];
      const StatusRevisiSkemaEksternal = [1, 3, 5];
      const StatusRevisiSkemaMandiri = [1, 3, 5];

      if (
         skemaInternal.includes(data.jenis_skema) &&
         StatusRevisiSkemaInternal.includes(data.status)
      ) {
         return true;
      }
      if (
         skemaEksternal.includes(data.jenis_skema) &&
         StatusRevisiSkemaEksternal.includes(data.status)
      ) {
         return true;
      }
      if (
         skemaMandiri.includes(data.jenis_skema) &&
         StatusRevisiSkemaMandiri.includes(data.status)
      ) {
         return true;
      }

      return false;
   }
</script>

<Article>
   <div class="box">Lorem ipsum</div>
   <div class="box">lorem</div>
</Article>

<style>
   .box {
      transition: height 0.5s ease;
      height: 150px;
   }

   @media (max-width: 768px) {
      .box {
         height: 400px;
      }
   }
</style>
