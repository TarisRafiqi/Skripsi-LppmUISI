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
      <div class="columns">
         <div class="column">
            <div class="field">
               <label class="label" for="label">Username</label>
               <input class="input" type="text" placeholder="Text input" />
               <p class="help is-danger">This username is available</p>
            </div>
         </div>

         <div class="column">
            <div class="field">
               <label class="label" for="label">Username</label>
               <input class="input" type="text" placeholder="Text input" />
               <p class="help is-danger">This username is available</p>
            </div>
         </div>
      </div>

      <div class="columns">
         <div class="column">
            <div class="field">
               <label class="label" for="label">Username</label>
               <input class="input" type="text" placeholder="Text input" />
               <p class="help is-danger">This username is available</p>
            </div>
         </div>

         <div class="column">
            <div class="field">
               <label class="label" for="label">Username</label>
               <input class="input" type="text" placeholder="Text input" />
               <p class="help is-danger">This username is available</p>
            </div>
         </div>
      </div>
   </div>
</Article>

<style>
   .column {
      /* background-color: lightblue; */
      padding-top: 0;
      padding-bottom: 0;
   }
</style>
