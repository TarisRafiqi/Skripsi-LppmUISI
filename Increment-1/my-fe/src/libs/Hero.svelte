<script>
   let dev = !process.ENV.production;
   let urlImage = dev
      ? "url(http://localhost:3000/img/vector-gradient.jpg"
      : "url(https://lppmuisi.dififa.com/img/vector-gradient.jpg";
</script>

<section class="hero is-medium">
   <div class="hero-body" style:--url={urlImage}>
      <p class="title">LPPM Universitas Internasional Semen Indonesia</p>
      <p class="subtitle">
         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
         tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
         veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
         commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
         velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
         occaecat cupidatat non proident, sunt in culpa qui officia deserunt
         mollit anim id est laborum.
      </p>
   </div>
</section>

<style>
   .title {
      color: black;
   }

   .subtitle {
      color: black;
      text-align: justify;
   }
   /* div {
      display: grid;
      min-height: 15rem;
      background: var(--hero-background);
      color: var(--hero-color);
      padding: 5rem 2rem;
      gap: 2rem;
      align-items: center;
      text-align: center;
      justify-content: center;
   } */

   /* div > :global(*) {
      display: inline-flex;
      flex-direction: column;
   } */

   @media (min-width: 768px) {
      /* div {
         grid-template-columns: 2fr 0.6fr;
      } */
   }

   .hero-body {
      margin-top: 5rem;
      margin-left: 1.5rem;
      margin-right: 1.5rem;
      border-radius: 20px;
      background-image: var(--url);
      background-repeat: no-repeat;
      background-attachment: fixed;
      background-size: 100% 100%;
   }
</style>
