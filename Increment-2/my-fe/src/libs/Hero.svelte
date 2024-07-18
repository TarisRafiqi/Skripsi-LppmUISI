<script>
   let dev = !process.ENV.production;
   let urlImage = dev
      ? "url(http://localhost:3000/img/vector-gradient.jpg"
      : "url(https://lppmuisi.dififa.com/img/vector-gradient.jpg";
</script>

<!-- <section class="hero is-large">
   <div class="hero-body" style:--url={urlImage}>
      <p class="title">LPPM Universitas Internasional Semen Indonesia</p>
      <p class="subtitle">test</p>
   </div>
</section> -->

<section class="hero is-fullheight">
   <div class="hero-body">
      <div class="columns">
         <div class="column is-6">
            <p class="subtitle is-3">
               Universitas Internasional Semen Indonesia
            </p>
            <p class="title is-1">
               Lembaga Penelitian Dan Pengabdian Kepada Masyarakat
            </p>
            <button class="button is-dark">Panduan PPM UISI</button>
            <button class="button is-danger is-outlined">Pengumuman</button>
         </div>

         <div class="column">
            <div class="box boxHero-Kanan">
               Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi
               et, suscipit veniam voluptatibus exercitationem reprehenderit
               atque accusantium dignissimos minus dicta beatae debitis
               asperiores libero optio facilis quod dolorum? Facilis, in?
            </div>
         </div>
      </div>
   </div>
</section>

<style>
   .box.boxHero-Kanan {
      height: 300px;
   }

   .title {
      color: black;
   }

   .subtitle {
      color: black;
      text-align: justify;
   }

   @media (min-width: 768px) {
      /* div {
         grid-template-columns: 2fr 0.6fr;
      } */
   }
   .hero {
      background-color: #eff2f6;
   }

   .hero-body {
      /* margin-top: 5rem; */
      /* margin-bottom: 5rem; */
      padding-top: 5rem;
      margin-left: 5rem;
      margin-right: 5rem;
      border-radius: 20px;
      background-image: var(--url);
      background-repeat: no-repeat;
      background-attachment: fixed;
      background-size: 100% 100%;
   }
</style>
