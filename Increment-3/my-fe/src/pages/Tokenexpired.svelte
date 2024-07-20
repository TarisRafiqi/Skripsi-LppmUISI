<script>
   import { isLogin } from "../store";
   import Article from "../libs/Article.svelte";
   import { onMount } from "svelte";

   localStorage.clear();
   $isLogin = false;

   setTimeout(() => {
      location.pathname = "/login";
   }, 500);
</script>

<!-- <Article> -->
<article>
   <div class="box">
      <img src="/img/warning.png" alt="alert-icon" />
      <h4 class="title is-3">Your session has expired</h4>
      <h6 class="subtitle is-6">You will be redirected to login page</h6>
   </div>
</article>

<!-- </Article> -->

<style>
   article {
      margin-top: 100px;
      margin-left: auto;
      margin-right: auto;
      text-align: center;
   }

   .box {
      height: auto;
      width: auto;
   }

   img {
      width: 70px;
      margin-bottom: 15px;
   }
</style>
