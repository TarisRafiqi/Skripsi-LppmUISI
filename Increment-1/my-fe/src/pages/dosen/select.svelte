<script>
   import { onMount } from "svelte";
   import Article from "../../libs/Article.svelte";
   import { route, apiURL } from "../../store";

   let username = "";
   let email = "";
   // const error = {};
   let error = {};

   const form = {
      username,
      email,
   };

   // function handleSubmit() {
   //    for (const [key, value] of Object.entries(form)) {
   //       if (!form[key]) {
   //          error[key] = `${key} harus diisi`;
   //       } else {
   //          console.log("Sukses...");
   //       }
   //    }
   // }

   const validateForm = () => {
      error = {};
      if (!username) error.username = "username is required.";
      if (!email) error.email = "Email is required.";
   };

   const handleSubmit = (event) => {
      // event.preventDefault();
      validateForm();

      if (Object.keys(error).length === 0) {
         // console.log("Form submitted", { username, email });
         $route("/dosen/proposalmanagement");
      } else {
         console.log("Form has error", error);
      }
   };
</script>

<Article>
   <div class="box">
      <div>
         <label for="username">Username</label>
         <input class="input" type="text" id="username" bind:value={username} />
         {#if error.username}
            <span class="error has-text-danger">{error.username}</span>
         {/if}
      </div>

      <div>
         <label for="email">Email</label>
         <input class="input" type="text" id="email" bind:value={email} />
         {#if error.email}
            <span class="error has-text-danger">{error.email}</span>
         {/if}
      </div>
      <br />
      <button class="button is-info" on:click={handleSubmit}>Submit</button>
   </div>
</Article>

<style>
</style>
