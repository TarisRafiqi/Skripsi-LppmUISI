<script>
   import menu from "../store/menu";

   // get group info
   const role = localStorage.getItem("role");

   let items;
   if (role === "admin") items = menu["admin"];
   else items = menu["dosen"];
</script>

<aside class="menu">
   <p class="menu-label">General</p>
   {#each items as item}
      <ul class="menu-list">
         <!-- svelte-ignore a11y-missing-attribute -->
         <li>
            <a
               id={item.title === "Dashboard" ? "dashboard" : null}
               href={item.href}>{item.title}</a
            >
         </li>
      </ul>
   {/each}
   {#if role === "Ka.Departemen" || role === "Ka.LPPM" || role === "Ka.PusatKajian" || role === "reviewer"}
      <ul class="menu-list">
         <!-- svelte-ignore a11y-missing-attribute -->
         <li>
            <a href="/dosen/approvalmanagement">Approval Management</a>
         </li>
      </ul>
   {/if}

   {#if role === "admin"}
      <p class="menu-label">Website Settings</p>
      <ul class="menu-list">
         <!-- svelte-ignore a11y-missing-attribute -->
         <li><a href="/admin/pengumuman">Pengumuman</a></li>
         <!-- svelte-ignore a11y-missing-attribute -->
         <li><a href="/admin/aboutuisi">About UISI</a></li>
         <!-- svelte-ignore a11y-missing-attribute -->
         <li><a href="/admin/template">Template</a></li>
      </ul>
   {/if}

   <br />

   <ul class="menu-list">
      <!-- svelte-ignore a11y-missing-attribute -->
      <button class="button is-light is-fullwidth" href="/logout">Logout</button
      >
   </ul>
</aside>

<style>
   .menu-label {
      color: white;
   }
   aside {
      padding-top: 5rem;
      padding-left: 1rem;
      padding-right: 1rem;
      color: var(--sb-color);
      background: var(--sb-background);
      width: var(--wide);
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 0;
      bottom: 0;
   }

   .menu-list a {
      color: inherit;
   }

   .menu-list a:hover {
      color: #4a4a4a;
   }

   a {
      color: white;
   }
</style>
