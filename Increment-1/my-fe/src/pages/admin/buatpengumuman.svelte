<script>
   import Article from "../../libs/Article.svelte";
   import Field from "../../libs/Field.svelte";
   import Wysiwyg from "../../libs/Wysiwyg.svelte";

   let judulPengumuman, isiPengumuman;

   function simpanPengumuman() {}
</script>

<Article>
   <h1 class="title is-1">Buat Pengumuman</h1>
   <hr />

   <Field name="Judul Pengumuman">
      <input
         class="input"
         type="text"
         placeholder="Masukkan Judul Pengumuman"
         bind:value={judulPengumuman}
      />
   </Field>

   <Field name="Isi Pengumuman">
      <Wysiwyg id="isi" content={isiPengumuman} />
   </Field>

   <hr />

   <div class="field is-grouped is-grouped-right">
      <p class="control">
         <button class="button is-info" on:click={simpanPengumuman}
            >Simpan</button
         >
      </p>
   </div>
</Article>
