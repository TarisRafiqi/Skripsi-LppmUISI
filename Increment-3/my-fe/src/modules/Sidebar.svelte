<script>
   import menu from "../store/menu";
   import Icon from "../libs/Icon.svelte";
   import { about, pengumuman, template, approval } from "../store/icons";

   const role = localStorage.getItem("role");
   let items;

   if (role === "admin") items = menu["admin"];
   else items = menu["dosen"];
</script>

<aside class="menu">
   <p class="menu-label">General</p>
   {#each items as item}
      <ul class="menu-list">
         <li title={item.title}>
            <a
               id={item.title === "Dashboard" ? "dashboard" : null}
               href={item.href}
            >
               <div class="icon"><Icon id={item.title} src={item.icon} /></div>
               <div class="page-title">{item.title}</div>
            </a>
         </li>
      </ul>
   {/each}
   {#if role === "K.Departemen" || role === "K.LPPM" || role === "K.PusatKajian" || role === "reviewer"}
      <br />
      <p class="menu-label">Evaluator</p>
      <ul class="menu-list">
         <li title="Approval Management">
            <a href="/dosen/approvalmanagement">
               <div class="icon"><Icon id="approval" src={approval} /></div>
               <div class="page-title">Approval Management</div>
            </a>
         </li>
      </ul>
   {/if}

   {#if role === "admin"}
      <br />
      <p class="menu-label">Content Management</p>
      <ul class="menu-list">
         <li title="Pengumuman">
            <a href="/admin/pengumumanmanagement"
               ><div class="icon">
                  <Icon id="pengumuman" src={pengumuman} />
               </div>
               <div class="page-title">Pengumuman</div>
            </a>
         </li>

         <li title="About UISI">
            <a href="/admin/aboutuisi">
               <div class="icon"><Icon id="aboutUISI" src={about} /></div>
               <div class="page-title">About UISI</div>
            </a>
         </li>

         <li title="Template">
            <a href="/admin/template">
               <div class="icon"><Icon id="template" src={template} /></div>
               <div class="page-title">Template</div>
            </a>
         </li>
      </ul>
   {/if}
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
      /* background: var(--sb-background); */
      background: #434a54;
      width: var(--wide);
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 0;
      bottom: 0;
      /* transition: width 1s; */
   }

   .menu-list a {
      color: inherit;
      display: flex;
      align-items: center;
   }

   .menu-list a .icon {
      margin-right: 0.5em;
   }

   .menu-list a:hover {
      color: #434a54;
   }

   a {
      color: white;
   }

   /* Responsive styles */
   @media (max-width: 768px) {
      aside {
         width: var(--narrow);
      }

      .menu-label,
      .menu-list a .page-title {
         display: none;
      }

      .menu-list a .icon {
         margin-right: 0;
      }
   }
</style>
