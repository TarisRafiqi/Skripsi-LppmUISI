<script>
   import Article from "../../libs/Article.svelte";
   import { route, apiURL } from "../../store";
   import Field from "../../libs/Field.svelte";
   import Modalerror from "../../libs/Modalerror.svelte";

   let createUsername, createPassword, createEmail, createRole;
   let showModalError = false;

   function kembali() {
      $route("/admin/usersmanagement");
   }

   async function HandleCreateUser() {
      const accessToken = localStorage.getItem("token");

      let payload = {
         createUsername,
         createPassword,
         createEmail,
      };

      try {
         const response = await fetch($apiURL + "/createUser", {
            method: "POST",
            headers: {
               Authorization: `${accessToken}`,
               "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
         });

         const result = await response.json();
         if (response.ok) {
            $route("/admin/usersmanagement");
         } else {
            showModalError = true;
         }
      } catch (error) {
         console.error("Error", error);
      }
   }
   // $: console.log(showModalError);
</script>

<Article>
   <Modalerror bind:show={showModalError}>
      <p>
         Username yang anda gunakan telah terdaftar, silahkan gunakan username
         lain
      </p>
   </Modalerror>

   <h1 class="title is-1">Create User</h1>

   <hr />

   <div class="box">
      <Field name="Username">
         <input
            class="input"
            type="text"
            placeholder="Masukkan username"
            bind:value={createUsername}
         />
      </Field>

      <Field name="Password">
         <input
            class="input"
            type="password"
            placeholder="Masukkan password"
            bind:value={createPassword}
         />
      </Field>

      <Field name="Email">
         <input
            class="input"
            type="text"
            placeholder="Masukkan email"
            bind:value={createEmail}
         />
      </Field>
      <br />
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
   </div>
</Article>
