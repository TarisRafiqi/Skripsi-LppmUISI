<script>
   import { route, isLogin } from "../store";
   import Article from "../libs/Article.svelte";
   import { menu } from "../store/icons";
   import { onMount } from "svelte";

   import Icon from "../libs/Icon.svelte";
   import { accountRounded } from "../store/icons";

   let token = localStorage.getItem("token");
   let username = localStorage.getItem("username");
   let navbarMenu;
   // console.log($isLogin, token);

   // onMount(() => {
   // const burgerIcon = document.querySelector("#burger");
   // const navbarMenu = document.querySelector("#nav-links");
   // burgerIcon.addEventListener("click", () => {
   //    navbarMenu.classList.toggle("is-active");
   // });
   // });

   function test() {
      navbarMenu.classList.toggle("is-active");
   }
</script>

<header>
   <nav class="navbar is-dark">
      <div class="navbar-brand">
         <a class="navbar-item" href="/">
            <img
               src="/img/logo-uisi-negatif.png"
               width="112"
               height="28"
               alt="Logo UISI"
            />
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
            <a class="navbar-item" href="/about"> About UISI </a>

            <div class="navbar-item has-dropdown is-hoverable">
               <!-- svelte-ignore a11y-missing-attribute -->
               <a class="navbar-link"> Penelitian </a>

               <div class="navbar-dropdown">
                  <a class="navbar-item" href="/penelitian">
                     Penelitian Internal
                  </a>
                  <a class="navbar-item" href="/penelitian">
                     Penelitian Eksternal
                  </a>
                  <a class="navbar-item" href="/penelitian">
                     Penelitian Mandiri
                  </a>
               </div>
            </div>

            <div class="navbar-item has-dropdown is-hoverable">
               <!-- svelte-ignore a11y-missing-attribute -->
               <a class="navbar-link"> Pengabdian Masyarakat </a>

               <div class="navbar-dropdown">
                  <a class="navbar-item" href="/abdimas">
                     Pengabdian Masyarakat Internal
                  </a>
                  <a class="navbar-item" href="/abdimas">
                     Pengabdian Masyarakat Eksternal
                  </a>
                  <a class="navbar-item" href="/abdimas">
                     Pengabdian Masyarakat Mandiri
                  </a>
               </div>
            </div>

            {#if $isLogin || token}
               <!-- <a class="navbar-item" href="/">
                  <h6 class="title is-6" style="color: White;">
                     {username}
                  </h6></a
               > -->

               <div class="navbar-item has-dropdown is-hoverable">
                  <!-- svelte-ignore a11y-missing-attribute -->
                  <a class="navbar-link">
                     <Icon src={accountRounded} />
                     &nbsp;
                     {username}
                  </a>

                  <div class="navbar-dropdown">
                     <a class="navbar-item" href="/">Dashboard</a>

                     <hr class="navbar-divider" />

                     <a class="navbar-item has-text-danger" href="/logout"
                        >Logout</a
                     >
                  </div>
               </div>
            {:else}
               <div class="navbar-item">
                  <div class="buttons">
                     <a class="button is-info is-fullwidth" href="/login">
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
      padding: 0 2rem;
      height: inherit;
   }
</style>
