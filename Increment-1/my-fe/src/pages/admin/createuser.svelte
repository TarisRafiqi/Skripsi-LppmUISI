<script>
   import Article from "../../libs/Article.svelte";
   import { route, apiURL } from "../../store";
   import Field from "../../libs/Field.svelte";
   import Modalerror from "../../libs/Modalerror.svelte";

   let createUsername, createPassword, createEmail, createRole;
   let selectedActivation = "";
   let jenisRole = "";
   let error = {};
   let showModalError = false;
   let showModalErrorEmptyForm = false;
   const role = localStorage.getItem("role");
   const accessToken = localStorage.getItem("token");

   function kembali() {
      $route("/admin/usersmanagement");
   }

   const validateFormCreateUser = () => {
      error = {};
      if (!createUsername) error.createUsername = "Username is required.";
      if (!createPassword) error.createPassword = "Password is required.";
      if (!createEmail) error.createEmail = "Email is required.";
      if (!jenisRole) error.jenisRole = "Role is required.";
      if (!selectedActivation)
         error.selectedActivation = "Activation is required.";
   };

   async function HandleCreateUser() {
      validateFormCreateUser();

      if (Object.keys(error).length > 0) {
         showModalErrorEmptyForm = true;
      } else {
         let payload = {
            createUsername,
            createPassword,
            createEmail,
            selectedActivation,
            jenisRole,
         };

         try {
            const response = await fetch($apiURL + "/createUser", {
               method: "POST",
               headers: {
                  Authorization: `Bearer ${accessToken}`,
                  "Content-Type": "application/json",
               },
               body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (response.status === 401) {
               // localStorage.clear();
               location.pathname = "/tokenexpired";
            } else {
               if (response.ok) {
                  $route("/admin/usersmanagement");
               } else {
                  showModalError = true;
               }
            }
         } catch (error) {
            console.error("Error", error);
         }
      }
   }
</script>

<Article>
   <Modalerror bind:show={showModalError}>
      <p>
         Username yang anda gunakan telah terdaftar, silahkan gunakan username
         lain
      </p>
   </Modalerror>
   <Modalerror bind:show={showModalErrorEmptyForm}>
      <p>Lengkapi seluruh form!</p>
   </Modalerror>

   <h1 class="title is-1">Create User</h1>
   <hr />

   {#if role === "admin"}
      <div class="box">
         <div class="notification is-warning is-light">
            <p>Untuk Dosen / Reviewer dari luar UISI!</p>
         </div>

         <Field name="Username">
            <input
               id="username"
               class="input"
               type="text"
               placeholder="Masukkan username"
               bind:value={createUsername}
            />
            {#if error.createUsername}
               <span class="help error is-danger">{error.createUsername}</span>
            {/if}
         </Field>

         <Field name="Password">
            <input
               id="password"
               class="input"
               type="password"
               placeholder="Masukkan password"
               bind:value={createPassword}
            />
            {#if error.createPassword}
               <span class="help error is-danger">{error.createPassword}</span>
            {/if}
         </Field>

         <Field name="Email">
            <input
               id="email"
               class="input"
               type="text"
               placeholder="Masukkan email"
               bind:value={createEmail}
            />
            {#if error.createEmail}
               <span class="help error is-danger">{error.createEmail}</span>
            {/if}
         </Field>

         <Field name="Role">
            <div class="select is-fullwidth">
               <select id="jenisRole" bind:value={jenisRole}>
                  <option value="" selected disabled hidden
                     >Pilih Jenis Role</option
                  >
                  <option value="0">Dosen</option>
                  <option value="10">Reviewer</option>
                  <option value="11">Kepala Departemen</option>
                  <option value="12">Kepala LPPM</option>
                  <option value="13">Kepala Pusat Kajian</option>
               </select>
            </div>
            {#if error.jenisRole}
               <span class="help error is-danger">{error.jenisRole}</span>
            {/if}
         </Field>

         <Field name="Active">
            <div class="control">
               <label class="radio">
                  <input
                     id="selectedActivation"
                     type="radio"
                     name="active"
                     value="1"
                     bind:group={selectedActivation}
                  />
                  Yes
               </label>
               <label class="radio">
                  <input
                     id="selectedActivation"
                     type="radio"
                     name="active"
                     value="0"
                     bind:group={selectedActivation}
                  />
                  No
               </label>
            </div>
            {#if error.selectedActivation}
               <span class="help error is-danger"
                  >{error.selectedActivation}</span
               >
            {/if}
         </Field>
      </div>

      <div class="field is-grouped is-grouped-right">
         <div class="control">
            <button class="button is-info is-light" on:click={kembali}
               >Kembali</button
            >
         </div>
         <div class="control">
            <button class="button is-info" on:click={HandleCreateUser}
               >Create</button
            >
         </div>
      </div>
   {:else}
      <h4 class="title is-4">Anda tidak memiliki hak akses halaman ini!</h4>
   {/if}
</Article>

<style>
   .help {
      /* top, right, bottom, left */
      margin: -6px 0px 0px 0px;
   }
</style>
