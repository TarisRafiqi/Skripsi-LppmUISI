<script>
   import Article from "../../libs/Article.svelte";
   import Field from "../../libs/Field.svelte";
   import Wysiwyg from "../../libs/Wysiwyg.svelte";

   let judulPengumuman, isiPengumuman;

   function simpanPengumuman() {}
</script>

<Article>
   <h2 class="title is-2">Buat Pengumuman</h2>
   <hr />

   <div class="box">
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
   </div>

   <div class="field is-grouped is-grouped-right">
      <p class="control">
         <button class="button is-info" on:click={simpanPengumuman}
            >Simpan</button
         >
      </p>
   </div>
</Article>
