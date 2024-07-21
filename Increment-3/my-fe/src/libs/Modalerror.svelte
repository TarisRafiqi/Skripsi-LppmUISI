<script>
   export let show = false;

   function handleClick(e) {
      if (e.target === e.currentTarget) {
         show = false;
      }
   }
   function clickX() {
      show = false;
   }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<b class:show on:click={handleClick}>
   <div>
      <div class="cookiesContent">
         <img src="/img/warning.png" alt="alert-icon" />
         <p>
            <slot />
         </p>
         <button class="button is-danger is-fullwidth" on:click={clickX}
            >Tutup</button
         >
      </div>
   </div>
</b>

<style>
   b {
      display: block;
      font-weight: normal;
      z-index: 17;
      position: fixed;
      display: flex;
      align-items: center;
      justify-content: center;
      inset: 0;
      background-color: rgba(0, 0, 0, 0);
      visibility: hidden;
   }

   b.show {
      background-color: rgba(0, 0, 0, 0.5);
      visibility: visible;
   }

   .cookiesContent {
      width: 400px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: #fff;
      color: #000;
      text-align: center;
      border-radius: 10px;
      padding: 20px;
      margin: 20px;
   }

   img {
      width: 82px;
      margin-bottom: 15px;
   }
   p {
      font-family: "Roboto", sans-serif;
      margin-bottom: 40px;
      font-size: 18px;
   }
</style>
