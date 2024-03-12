<script>
   import { isLogin } from "../store";
   import Article from "../libs/Article.svelte";

   localStorage.clear();
   $isLogin = false;

   setTimeout(() => {
      location.pathname = "/";
   }, 1000);
</script>

<Article>
   <article>
      <h3 class="title is-3">TERIMA KASIH</h3>
      <h5 class="subtitle is-5">Karena anda sudah menggunakan aplikasi ini.</h5>
   </article>
</Article>

<style>
   article {
      margin: 0 auto;
      text-align: center;
   }
</style>
