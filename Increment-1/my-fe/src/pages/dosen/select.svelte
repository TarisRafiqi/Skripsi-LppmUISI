<script>
   import { onMount } from "svelte";
   import Article from "../../libs/Article.svelte";
   import { route, apiURL, ppmFile } from "../../store";
   import Field from "../../libs/Field.svelte";
   import Icon from "../../libs/Icon.svelte";
   import { cancelIcon, edit, downloadIcon } from "../../store/icons";

   let username = "";
   let email = "";
   let error = {};
   let isLoading = false;
   let editMode = false;
   let form = {
      email,
      username,
   };

   function toggleEditMode() {
      editMode = !editMode;
   }

   function isObjectEmpty(objectName) {
      return (
         objectName &&
         Object.keys(objectName).length === 0 &&
         objectName.constructor === Object
      );
   }

   function handleSubmit() {
      error = {};
      isLoading = true;
      for (const [key, value] of Object.entries(form)) {
         if (!form[key]) {
            error[key] = "This field is required";
         } else {
            console.log("Sukses Cek Form Error");
         }
      }

      // if (isObjectEmpty($ppmFile)) {
      //    error["fileProposal"] = `*`;
      // }

      if (Object.keys(error).length > 0) {
         console.log("Error, Lengkapi semua form");
         isLoading = false;
      } else {
         console.log("Tombol akan kembali dalam 3 detik...");
         setTimeout((isLoading = false), 3000);
         // isLoading = false;
         console.log("Sukses");
         return;
      }
   }

   function stopLoading() {
      isLoading = false;
   }

   // function filePpmChange(e) {
   //    filePpm = e.target.files[0];
   //    $ppmFile = e.target.files[0];
   // }
</script>

<Article>
   <div class="box">
      <div class="field">
         <label for="email">Email</label>
         <input class="input" type="text" bind:value={form.email} />
         {#if error.email}
            <span class="help error has-text-danger">{error.email}</span>
         {/if}
      </div>

      <div class="field">
         {#if error.username}
            <label for="username"
               >Username<span class="red-asterisk">*</span></label
            >
            <input
               class="input is-danger"
               type="text"
               bind:value={form.username}
            />
         {:else}
            <label for="username">Username</label>
            <input class="input" type="text" bind:value={form.username} />
         {/if}
      </div>

      <br />
      <button
         class="button is-info"
         on:click={handleSubmit}
         class:is-loading={isLoading}>Submit</button
      >
   </div>

   <!-- ----------------------------------------------------------------------------- -->
   <!-- <Field name="Proposal">
      {#if !editMode}
         <button class="button is-link button">Download Proposal</button>
         <button
            class="button is-link is-light"
            on:click={toggleEditMode}
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

            <div class="file has-name">
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
                     <span class="file-name">...</span>
                  {/if}
               </label>
            </div>
            {#if error.fileProposal}
               <p class="error has-text-danger">{error.fileProposal}</p>
            {/if}
            <button
               class="button is-danger is-light"
               on:click={toggleEditMode}
               title="Cancel"
               ><span class="icon">
                  <Icon id="cancel" src={cancelIcon} />
               </span></button
            >
         </span>

         <p class="help is-info">File Type: pdf</p>
      {/if}
   </Field> -->
</Article>

<style>
   .field {
      padding-bottom: 10px;
   }
   .red-asterisk {
      color: red;
      font-weight: bold;
   }

   /* .inputf__wrapper {
      position: relative;
      display: flex;
   } */
   /* .inputf__wrapper input {
      width: 0;
      height: 0;
      opacity: 0;
   } */

   /* .help {
      margin: -6px 0px 0px 0px;
   } */
</style>
