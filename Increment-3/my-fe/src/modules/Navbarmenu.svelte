<script>
   import { route, isLogin, isUsername } from "../store";
   import Article from "../libs/Article.svelte";
   import { menu } from "../store/icons";
   import { onMount } from "svelte";

   import Icon from "../libs/Icon.svelte";
   import { accountRounded } from "../store/icons";

   let token = localStorage.getItem("token");
   let username = localStorage.getItem("username");
   let navbarMenu;

   // console.log($isLogin, token);

   function test() {
      navbarMenu.classList.toggle("is-active");
   }

   function gotoDashboard() {
      const role = localStorage.getItem("role");
      if (role === "admin") $route("/admin");
      else $route("/dosen");
   }

   onMount(() => {
      const links = navbarMenu.querySelectorAll(".navbar-item");
      links.forEach((link) => {
         link.addEventListener("click", function () {
            burger.classList.remove("is-active");
            navbarMenu.classList.remove("is-active");
         });
      });
   });
</script>

<header>
   <nav class="navbar">
      <div class="navbar-brand">
         <a class="navbar-item" href="/">
            <img src="/img/LogoLppmUISI.png" alt="Logo UISI" />
         </a>
         <!-- svelte-ignore a11y-missing-attribute -->
         <!-- svelte-ignore a11y-click-events-have-key-events -->
         <!-- svelte-ignore a11y-no-static-element-interactions -->
         <a class="navbar-burger" id="burger" on:click={test}>
            <span></span>
            <span></span>
            <span></span>
         </a>
      </div>

      <div class="navbar-menu" id="nav-links" bind:this={navbarMenu}>
         <div class="navbar-end">
            <a class="navbar-item" href="/"> Beranda </a>

            <div class="navbar-item has-dropdown is-hoverable">
               <!-- svelte-ignore a11y-missing-attribute -->
               <a class="navbar-link"> About UISI </a>

               <div class="navbar-dropdown">
                  <a class="navbar-item" href="/profil"> Profil </a>
                  <a class="navbar-item" href="/visidanmisi"> Visi dan Misi </a>
                  <a class="navbar-item" href="/strukturorganisasi">
                     Struktur Organisasi
                  </a>
               </div>
            </div>

            <div class="navbar-item has-dropdown is-hoverable">
               <!-- svelte-ignore a11y-missing-attribute -->
               <a class="navbar-link"> Penelitian </a>

               <div class="navbar-dropdown">
                  <a class="navbar-item" href="/penelitianinternal">
                     Penelitian Internal
                  </a>
                  <a class="navbar-item" href="/penelitianeksternal">
                     Penelitian Eksternal
                  </a>
                  <a class="navbar-item" href="/penelitianmandiri">
                     Penelitian Mandiri
                  </a>
               </div>
            </div>

            <div class="navbar-item has-dropdown is-hoverable">
               <!-- svelte-ignore a11y-missing-attribute -->
               <a class="navbar-link"> Pengabdian Masyarakat </a>

               <div class="navbar-dropdown">
                  <a class="navbar-item" href="/pengmasinternal">
                     Pengabdian Masyarakat Internal
                  </a>
                  <a class="navbar-item" href="/pengmaseksternal">
                     Pengabdian Masyarakat Eksternal
                  </a>
                  <a class="navbar-item" href="/pengmasmandiri">
                     Pengabdian Masyarakat Mandiri
                  </a>
               </div>
            </div>

            {#if $isLogin || token}
               <div class="navbar-item has-dropdown is-hoverable">
                  <!-- svelte-ignore a11y-missing-attribute -->
                  <a class="navbar-link">
                     <Icon src={accountRounded} />
                     &nbsp;
                     {username || $isUsername}
                  </a>

                  <div class="navbar-dropdown">
                     <!-- svelte-ignore a11y-missing-attribute -->
                     <!-- svelte-ignore a11y-click-events-have-key-events -->
                     <!-- svelte-ignore a11y-no-static-element-interactions -->
                     <a class="navbar-item" on:click={gotoDashboard}
                        >Dashboard</a
                     >

                     <hr class="navbar-divider" />

                     <a class="navbar-item has-text-danger" href="/logout"
                        >Logout</a
                     >
                  </div>
               </div>
            {:else}
               <div class="navbar-item">
                  <div class="buttons">
                     <a
                        class="button is-dark is-small is-rounded is-fullwidth"
                        href="/login"
                     >
                        Login
                     </a>
                  </div>
               </div>
            {/if}
         </div>
      </div>
   </nav>
</header>

<style>
   @media (min-width: 768px) {
      /* div {
         grid-template-columns: 2fr 0.6fr;
      } */
      nav {
         padding: 0 10rem;
      }
   }

   header {
      z-index: 100;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 3.5rem;
   }
   nav {
      /* position: relative; */
      height: inherit;
      box-shadow: 0 6px 6px -6px rgba(0, 0, 0, 0.295);
   }

   .navbar-item img {
      max-height: 3rem;
   }
</style>
