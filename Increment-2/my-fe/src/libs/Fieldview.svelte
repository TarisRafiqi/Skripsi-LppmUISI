<script>
   import Status from "../modules/Status.svelte";
   export let title;
   export let content;
   export let skema;
   export let type = "text"; // default
</script>

<div class="column">
   <div class="field">
      {#if title === "" && content === ""}
         <p class="title is-6"><span></span></p>
         <p class="subtitle is-6"><span></span></p>
      {:else}
         {#if title !== ""}
            <p class="title is-6"><b>{title}</b></p>
         {/if}
         <p class="subtitle is-6 has-text-justified">
            {#if type === "text"}
               {#if content}
                  {content}
               {:else}
                  ...
               {/if}
            {:else if type === "list"}
               {#if content && content.length > 0}
                  <ul style="list-style-type:disc">
                     {#each content as item}
                        <li>{item.label}</li>
                     {/each}
                  </ul>
               {:else}
                  ...
               {/if}
            {:else if type === "status"}
               {#if content}
                  <Status code={content} jenisSkema={skema} />
               {:else}
                  ...
               {/if}
            {/if}
         </p>
      {/if}
   </div>
</div>

<style>
   ul {
      margin-left: 1.2em;
      margin-top: -1em;
   }
   ul li {
      margin-bottom: 4px;
   }
</style>
