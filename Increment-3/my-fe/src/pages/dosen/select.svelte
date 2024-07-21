<script>
   import { cancelIcon, edit, downloadIcon } from "../../store/icons";
   import { route, apiURL, ppmFile } from "../../store";
   import Article from "../../libs/Article.svelte";
   import Fieldview from "../../libs/Fieldview.svelte";
   import Modalerror from "../../libs/Modalerror.svelte";
   import Modalchecked from "../../libs/Modalchecked.svelte";
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

   let showModalError = false;
   let showModalChecked = false;

   function button1() {
      showModalError = true;
   }

   function button2() {
      showModalChecked = true;
   }
</script>

<Article>
   <button class="button is-danger" on:click={button1}>Modal Error</button>
   <br />
   <br />
   <button class="button is-success" on:click={button2}>Modal Checked</button>
</Article>

<Modalerror bind:show={showModalError}>
   <p>Lengkapi semua form</p>
</Modalerror>

<Modalchecked bind:show={showModalChecked}>
   <p>Data berhasil disimpan</p></Modalchecked
>

<style>
</style>
