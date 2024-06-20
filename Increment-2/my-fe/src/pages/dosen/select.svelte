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
