<script>
   let dev = !process.ENV.production;
   let urlImage = dev
      ? "url(http://localhost:3000/img/vector-gradient.jpg"
      : "url(https://lppmuisi.dififa.com/img/vector-gradient.jpg";
</script>

<!-- <section class="hero is-large ">
   <div class="hero-body" style:--url={urlImage}>
      <p class="title">LPPM Universitas Internasional Semen Indonesia</p>
      <p class="subtitle">test</p>
   </div>
</section> -->

<section class="hero is-fullheight">
   <div class="hero-body">
      <div class="hero-content-kiri">
         <p class="subtitle custom-subtitle">
            Universitas Internasional Semen Indonesia
         </p>
         <p class="title custom-title">
            Lembaga Penelitian Dan Pengabdian Kepada Masyarakat
         </p>
         <button class="button is-dark is-rounded">Panduan PPM UISI</button>
         <button class="button is-danger is-outlined is-rounded"
            >Pengumuman</button
         >
      </div>

      <div class="box hero-content-kanan" style:--url={urlImage}>
         <!-- <img src="img/vector-gradient.jpg" alt="vectior-gradient.jpg" /> -->
      </div>
   </div>
</section>

<style>
   .box.hero-content-kanan {
      height: 600px;
      width: 300px;
      /* height: auto; */
      background-image: var(--url);
      background-repeat: no-repeat;
      background-attachment: fixed;
      background-size: 100% 100%;
   }

   .title {
      color: black;
   }

   .subtitle {
      color: black;
   }

   @media (min-width: 768px) {
      .hero-body {
         padding-right: 5rem;
         padding-left: 5rem;
      }

      .custom-subtitle {
         font-size: 1.5rem;
      }
      .custom-title {
         font-size: 3rem;
      }
   }

   @media (min-width: 1024px) {
      .hero-body {
         padding-right: 11rem;
         padding-left: 11rem;
      }
   }

   .hero {
      background-color: #eff2f6;
   }

   .hero-body {
      margin-top: 2rem;
      background-image: var(--url);
      background-repeat: no-repeat;
      background-attachment: fixed;
      background-size: 100% 100%;
   }
</style>
