<script>
   export let items;
   export let start = 1;
   export let result = [];

   let focused = 0;
   let value = "";
   let filteredItems = items;

   function setSelected(e) {
      e.preventDefault();
      let el = e.target;

      if (el.classList.contains("selected")) {
         el.classList.remove("selected");
         result = result.filter((it) => {
            return it.value !== el.getAttribute("data-value");
         });
      } else {
         el.classList.add("selected");

         result = [
            ...result,
            {
               value: el.getAttribute("data-value").trim(),
               label: el.innerText.trim(),
               role: "Anggota",
            },
         ];
      }
   }

   function doFilter() {
      if (value.length >= start) {
         filteredItems = items.filter((item) => {
            let it;
            if (item.label) {
               let idUser = Number(localStorage.getItem("id"));
               let itemLabel = item.label.toLowerCase();
               let itemValue = item.value;
               let valueLabel = value.toLowerCase();

               // it = item.label.toLowerCase().includes(value.toLowerCase());
               it = itemLabel.includes(valueLabel) && itemValue !== idUser;
            }
            return it;
         });
      } else {
         filteredItems = items;
      }
   }

   function clickOutside(e) {
      let el = e.target;
      if (el.tagName !== "A" && el.tagName !== "INPUT") {
         value = "";
         focused = 0;
      }
   }

   document.querySelector("body").addEventListener("click", clickOutside);

   $: value, (focused = value.length >= start ? 1 : 0), doFilter();
</script>

<div class="select">
   <input
      class="input"
      placeholder="Cari user (min 2 huruf)"
      bind:value
      class:focused
   />
   {#if filteredItems}
      <span>
         {#each filteredItems as item}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <!-- svelte-ignore a11y-missing-attribute -->
            <a on:click={setSelected} data-value={item.value}>{item.label}</a>
         {/each}
      </span>
   {/if}
</div>

<style>
   div {
      position: relative;
      display: inline-flex;
      width: 100%;
   }
   span {
      z-index: 10;
      position: absolute;
      display: none;
      right: 0;
      left: 0;
      top: 40px;
      background: white;
      border: 1px solid #ccc;
      cursor: pointer;
      max-height: 200px;
      overflow-y: auto;
      scrollbar-width: thin;
   }
   a {
      position: relative;
      display: block;
      margin: 0;
      padding: 0.25rem 1rem;
      text-decoration: none;
      color: inherit;
   }
   a:hover {
      background: #f0f6fd;
   }
   :global(.select a.selected::after) {
      content: "✔";
      position: absolute;
      right: 0.25rem;
   }
   .focused + span {
      display: block;
   }
</style>
