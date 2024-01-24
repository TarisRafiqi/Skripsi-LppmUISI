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
         <button class="button is-danger" on:click={clickX}>Close</button>
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
      border-radius: 20px;
      /* padding: 30px 30px 70px; */
      padding: 30px;
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
   button {
      /* background-color: #ed6755; */
      border: none;
      border-radius: 5px;
      width: 200px;
      padding: 14px;
      font-size: 16px;
      color: white;
      box-shadow: 0px 6px 18px -5px rgb(247, 145, 138);
   }
</style>
