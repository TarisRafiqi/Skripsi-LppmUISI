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
      <span>
         <span class="close" on:click={clickX}>&times;</span>
         <slot name="header" />
      </span>
      <hr />
      <slot />
   </div>
</b>

<style>
   /* The Close Button */
   .close {
      color: #aaaaaa;
      float: right;
      font-size: 28px;
      font-weight: bold;
   }

   .close:hover,
   .close:focus {
      color: #000;
      text-decoration: none;
      cursor: pointer;
   }

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

   div {
      padding: 1em 1.5em;
      /* max-width: 32em; */
      /* border-radius: 0.5em; */
      width: 40em;
      background: white;
      border-radius: 10px;
   }
</style>
