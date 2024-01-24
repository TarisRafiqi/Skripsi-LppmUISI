<script>
   import { onMount } from "svelte";
   import Article from "../../libs/Article.svelte";
   import Field from "../../libs/Field.svelte";
   import Wysiwyg from "../../libs/Wysiwyg.svelte";

   let lppmUisi, fungsiTujuan, visiMisi;
</script>

<Article>
   <h1 class="title is-1">About UISI</h1>
   <hr />

   <Field name="LPPM UISI">
      <Wysiwyg id="isi" content={lppmUisi} />
   </Field>

   <Field name="Fungsi & Tujuan">
      <Wysiwyg id="isi" content={fungsiTujuan} />
   </Field>

   <Field name="Visi & Misi">
      <Wysiwyg id="isi" content={visiMisi} />
   </Field>

   <!-- <Field id="lppmUISI" textarea name="LPPM UISI" />
   <Field id="fungsiTujuan" textarea name="Fungsi dan Tujuan" />
   <Field id="visiMisi" textarea name="Visi dan Misi" /> -->
</Article>
