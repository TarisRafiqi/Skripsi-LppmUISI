<script>
   import { isLogin } from "../store";

   localStorage.clear();
   $isLogin = false;

   setTimeout(() => {
      location.pathname = "/";
   }, 1000);
</script>

<article>
   <div class="box">
      <h3 class="title is-3">You are Logged Out</h3>
      <h6 class="subtitle is-6">Thank you for using our website</h6>
   </div>
</article>

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
</style>
