<script>
   import { onMount } from "svelte";
   import Article from "../../libs/Article.svelte";
   import { route, apiURL, ppmFile } from "../../store";
   import Field from "../../libs/Field.svelte";
   import Icon from "../../libs/Icon.svelte";
   import { cancelIcon, edit, downloadIcon } from "../../store/icons";

   let username = "";
   let email = "";
   let isFormVisible1 = false;
   let isFormVisible2 = false;
</script>

<Article>
   <div class="box">
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <h4 class="title is-4">
         Catan Revisi
         <span
            class="toggle-button"
            on:click={() => (isFormVisible1 = !isFormVisible1)}
         >
            {isFormVisible1 ? "(tutup)" : "(buka)"}
         </span>
      </h4>

      {#if isFormVisible1}
         <div class="field">
            <label for="email">Email</label>
            <input class="input" type="text" />
         </div>

         <div class="field">
            <label for="email">Password</label>
            <input class="input" type="text" />
         </div>
      {/if}
   </div>

   <div class="box">
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <h4 class="title is-4">
         Input Evaluator
         <span
            class="toggle-button"
            on:click={() => (isFormVisible2 = !isFormVisible2)}
         >
            {isFormVisible2 ? "(tutup)" : "(buka)"}
         </span>
      </h4>

      {#if isFormVisible2}
         <div class="field">
            <label for="email">Email</label>
            <input class="input" type="text" />
         </div>

         <div class="field">
            <label for="email">Password</label>
            <input class="input" type="text" />
         </div>
      {/if}
   </div>
</Article>

<style>
   .toggle-button {
      cursor: pointer;
      color: #434a54;
      font-size: small;
   }
</style>
