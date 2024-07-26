<script>
   let dev = !process.ENV.production;
   let urlImage = dev
      ? "url(http://localhost:3000/img/Homepage-Background.svg"
      : "url(https://lppmuisi.dififa.com/img/Homepage-Background.svg";

   function scrollToPengumuman() {
      const pengumumanSection = document.getElementById("pengumuman");
      if (pengumumanSection) {
         pengumumanSection.scrollIntoView({ behavior: "smooth" });
      }
   }
</script>

<section class="hero is-fullheight" style:--url={urlImage}>
   <div class="hero-body">
      <div class="columns">
         <div class="column is-9">
            <p class="subtitle custom-subtitle">
               Universitas Internasional Semen Indonesia
            </p>
            <p class="title custom-title">
               Lembaga Penelitian Dan Pengabdian Kepada Masyarakat
            </p>
            <button
               class="button is-danger is-outlined"
               on:click={scrollToPengumuman}
            >
               Pengumuman
            </button>
         </div>

         <div class="column"></div>
      </div>
   </div>
</section>

<style>
   .title {
      color: black;
   }

   .subtitle {
      color: black;
      /* text-align: justify; */
   }

   @media (min-width: 768px) {
      .hero-body {
         padding-right: 10rem;
         padding-left: 10rem;
      }

      .custom-subtitle {
         font-size: 1.5rem;
      }
      .custom-title {
         font-size: 3rem;
      }
   }

   .hero {
      background-color: #eff2f6;
      background-image: var(--url);
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      /* background-attachment: fixed; */
   }

   .hero-body {
      /* margin-top: 5rem; */
      /* margin-bottom: 5rem; */
      /* border-radius: 20px; */
      padding-top: 5rem;
   }
</style>
