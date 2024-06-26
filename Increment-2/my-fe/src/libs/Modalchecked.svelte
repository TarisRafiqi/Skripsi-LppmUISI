<script>
   import { fade } from "svelte/transition";

   export let show = false;
   let showLoader = true;

   // $: if (show) {
   //    setTimeout(() => {
   //       show = false;
   //    }, 600);
   // }

   function handleClick(e) {
      if (e.target === e.currentTarget) {
         show = false;
      }
   }

   function clickX() {
      show = false;
   }

   $: if (show) {
      showLoader = true;
      setTimeout(() => {
         showLoader = false;
      }, 400);
   }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<b class:show on:click={handleClick}>
   <div>
      <div class="cookiesContent">
         {#if showLoader}
            <div class="loader-wrapper">
               <div
                  class="loader is-loading"
                  in:fade={{ duration: 10 }}
                  out:fade={{ duration: 10 }}
               ></div>
            </div>
         {:else}
            <img
               src="/img/checked.png"
               alt="alert-icon"
               in:fade={{ duration: 10 }}
               out:fade={{ duration: 10 }}
            />
         {/if}
         <h2 class="title is-2">Success!</h2>
         <p>
            <slot />
         </p>
         <button class="button is-success is-fullwidth" on:click={clickX}
            >Confirm</button
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
      margin-bottom: 20px;
      font-size: 18px;
   }

   .loader-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 82px;
      height: 82px;
      margin-bottom: 15px;
   }

   .loader.is-loading {
      border: 8px solid rgb(199, 199, 199);
      border-top: 8px solid #0ca170;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      animation: spin 0.4s linear infinite;
   }

   @keyframes spin {
      0% {
         transform: rotate(0deg);
      }
      100% {
         transform: rotate(360deg);
      }
   }
</style>
