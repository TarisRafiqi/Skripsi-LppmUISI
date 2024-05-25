<script>
   import { onMount } from "svelte";
   import Article from "../../libs/Article.svelte";
   import { route, apiURL } from "../../store";

   let username = "";
   let email = "";
   let error = {};

   const form = {
      username,
      email,
   };

   function handleSubmit() {
      error = {};
      for (const [key, value] of Object.entries(form)) {
         if (!form[key]) {
            error[key] = "This field is required";
         } else {
            console.log("Sukses...");
         }
      }
   }
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
      <button class="button is-info" on:click={handleSubmit}>Submit</button>
   </div>
</Article>

<style>
   .field {
      padding-bottom: 10px;
   }
   .red-asterisk {
      color: red;
      font-weight: bold;
   }
</style>
