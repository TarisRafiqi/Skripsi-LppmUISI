<script>
   import { fade, fly } from "svelte/transition";
</script>

<article in:fade>
   <slot />
</article>

<style>
   /* article {
      margin-top: 9.5rem;
   } */
   article {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      padding: 0;
      text-align: center;
   }
</style>
