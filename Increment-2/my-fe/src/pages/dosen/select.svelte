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
   let error = {};

   function filePpmChange(e) {
      filePpm = e.target.files[0];
      $ppmFile = e.target.files[0];
   }

   async function Submit() {
      error = {};
      isLoading = true;

      const readerPpm = new FileReader();

      //============================================================
      // Upload File Proposal
      //============================================================
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
         } catch (error) {
            console.error("Error uploading file:", error);
            // Buat Handle Error
            // ...
         }
      };

      readerPpm.readAsDataURL(filePpm);
   }
</script>

<Article>
   <Field name="Proposal">
      <span class="inputf__wrapper">
         <input
            id="filePpm"
            class="inputf custom-file-input"
            accept="application/pdf"
            type="file"
            on:change={filePpmChange}
         />
         <div class="file has-name is-success is-small">
            <label class="file-label" for="filePpm">
               <input class="file-input" type="file" name="resume" />
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
         {#if error.fileProposal}
            <p class="error has-text-danger">{error.fileProposal}</p>
         {/if}
      </span>
      <p class="help">File Type: pdf</p>
   </Field>
</Article>

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
