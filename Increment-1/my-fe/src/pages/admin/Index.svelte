<script>
   import * as pages from "./";
   import E404 from "../../modules/E404.svelte";
   export let params = {};

   let cmp;

   $: params, (cmp = pages[params["0"]] || null);
</script>

{#if Object.keys(params).length === 0}
   <svelte:component this={pages.home} {params} />
{:else if cmp}
   <svelte:component this={cmp} {params} />
{:else}
   <E404 />
{/if}
