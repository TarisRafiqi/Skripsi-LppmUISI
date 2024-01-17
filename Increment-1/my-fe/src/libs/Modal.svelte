<script>
   export let show = false;

   function handleClick() {
      console.log(show);
      show = false;
   }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<b class:show on:click={handleClick}>
   <div>
      <span class="close">&times;</span>
      <slot name="header" />
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
      background-color: rgba(0, 0, 0, 0.7);
      visibility: visible;
   }

   div {
      padding: 1em 1.5em;
      /* max-width: 32em; */
      width: 35em;
      background: white;
      border-radius: 0.5em;
   }
</style>
