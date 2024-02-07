<script>
   import { onMount } from "svelte";
   import Article from "../../libs/Article.svelte";
   import Field from "../../libs/Field.svelte";
   import Wysiwyg from "../../libs/Wysiwyg.svelte";

   let lppmUisi, fungsiTujuan, visiMisi;

   function simpanLppmUISI() {}

   function simpanFungsiTujuan() {}

   function simpanVisiMisi() {}

   let tab1 = true;
   let tab2;
   let tab3;

   function clicktab1() {
      tab1 = true;
      tab2 = false;
      tab3 = false;
   }

   function clicktab2() {
      tab1 = false;
      tab2 = true;
      tab3 = false;
   }

   function clicktab3() {
      tab1 = false;
      tab2 = false;
      tab3 = true;
   }
</script>

<Article>
   <h1 class="title is-1">About UISI</h1>
   <hr />

   <div class="tabs is-boxed">
      <ul>
         <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
         <!-- svelte-ignore a11y-click-events-have-key-events -->
         <li on:click={clicktab1} class:is-active={tab1}>
            <!-- svelte-ignore a11y-missing-attribute -->
            <a>
               <span>LPPM UISI</span>
            </a>
         </li>
         <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
         <!-- svelte-ignore a11y-click-events-have-key-events -->
         <li on:click={clicktab2} class:is-active={tab2}>
            <!-- svelte-ignore a11y-missing-attribute -->
            <a>
               <span>Fungsi & Tujuan</span>
            </a>
         </li>
         <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
         <!-- svelte-ignore a11y-click-events-have-key-events -->
         <li on:click={clicktab3} class:is-active={tab3}>
            <!-- svelte-ignore a11y-missing-attribute -->
            <a>
               <span>Visi & Misi</span>
            </a>
         </li>
      </ul>
   </div>

   {#if tab1 === true}
      <Field name="LPPM UISI">
         <Wysiwyg id="isi" content={lppmUisi} />
      </Field>

      <hr />

      <div class="field is-grouped is-grouped-right">
         <p class="control">
            <button class="button is-info" on:click={simpanLppmUISI}
               >Simpan</button
            >
         </p>
      </div>
   {/if}

   {#if tab2 === true}
      <Field name="Fungsi & Tujuan">
         <Wysiwyg id="isi" content={fungsiTujuan} />
      </Field>

      <hr />

      <div class="field is-grouped is-grouped-right">
         <p class="control">
            <button class="button is-info" on:click={simpanFungsiTujuan}
               >Simpan</button
            >
         </p>
      </div>
   {/if}

   {#if tab3 === true}
      <Field name="Visi & Misi">
         <Wysiwyg id="isi" content={visiMisi} />
      </Field>

      <hr />

      <div class="field is-grouped is-grouped-right">
         <p class="control">
            <button class="button is-info" on:click={simpanVisiMisi}
               >Simpan</button
            >
         </p>
      </div>
   {/if}
</Article>
