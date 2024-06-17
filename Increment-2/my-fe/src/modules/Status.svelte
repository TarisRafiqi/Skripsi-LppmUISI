<script>
   export let code;
   export let jenisSkema;
</script>

{#if jenisSkema === "Riset Mandiri" || jenisSkema === "Pengabdian Masyarakat Mandiri"}
   {#if code === 0}
      <span class="tag is-warning is-light">Draft Proposal</span>
   {:else if code === 1}
      <span class="tag is-danger is-light">Revisi Proposal</span>
   {:else if code === 2}
      <span class="tag is-warning">Review Administrasi</span>
   {:else if code === 3}
      <span class="tag is-danger is-light">Revisi Ka.Departemen</span>
   {:else if code === 4}
      <span class="tag is-warning">Review Ka.Departemen</span>
   {:else if code === 5}
      <span class="tag is-danger is-light">Revisi Ka.LPPM</span>
   {:else if code === 6}
      <span class="tag is-warning">Review Ka.LPPM</span>
   {:else if code === 7}
      <span class="tag is-danger is-light">Revisi Ka.Pusat Kajian</span>
   {:else if code === 8}
      <span class="tag is-warning">Review Ka.Pusat Kajian</span>
   {:else if code === 9}
      <span class="tag is-danger">Proposal Ditolak</span>
   {:else if code === 10}
      <span class="tag is-info">PPM Berlangsung</span>
   {:else if code === 11}
      <span class="tag is-danger is-light">Revisi Hasil Penelitian</span>
   {:else if code === 12}
      <span class="tag is-warning">Review Hasil Penelitian</span>
   {:else if code === 13}
      <span class="tag is-warning">Presentasi Hasil Penelitian</span>
   {:else if code === 14}
      <span class="tag is-success">PPM Selesai</span>
   {/if}
{:else if jenisSkema === "Riset Eksternal" || jenisSkema === "Pengabdian Masyarakat Hibah Eksternal"}
   {#if code === 0}
      <span class="tag is-warning is-light">Draft Proposal</span>
   {:else if code === 1}
      <span class="tag is-danger is-light">Revisi Proposal</span>
   {:else if code === 2}
      <span class="tag is-warning">Review Administrasi</span>
   {:else if code === 3}
      <span class="tag is-danger is-light">Revisi Ka.Departemen</span>
   {:else if code === 4}
      <span class="tag is-warning">Review Ka.Departemen</span>
   {:else if code === 5}
      <span class="tag is-danger is-light">Revisi Ka.LPPM</span>
   {:else if code === 6}
      <span class="tag is-warning">Review Ka.LPPM</span>
   {:else if code === 7}
      <span class="tag is-danger is-light">Revisi Ka.Pusat Kajian</span>
   {:else if code === 8}
      <span class="tag is-warning">Review Ka.Pusat Kajian</span>
   {:else if code === 9}
      <span class="tag is-danger">Proposal Ditolak</span>
   {:else if code === 10}
      <span class="tag is-info">PPM Berlangsung</span>
   {:else if code === 11}
      <span class="tag is-success">PPM Selesai</span>
   {/if}
{:else if jenisSkema === "Riset Kelompok Keahlian" || jenisSkema === "Riset Terapan" || jenisSkema === "Riset Kerjasama" || jenisSkema === "Pengabdian Masyarakat Desa Binaan" || jenisSkema === "Pengabdian Masyarakat UMKM Binaan"}
   {#if code === 0}
      <span class="tag is-warning is-light">Draft Proposal</span>
   {:else if code === 1}
      <span class="tag is-danger is-light">Revisi Proposal</span>
   {:else if code === 2}
      <span class="tag is-warning">Review Administrasi</span>
   {:else if code === 3}
      <span class="tag is-danger is-light">Revisi Ka.Departemen</span>
   {:else if code === 4}
      <span class="tag is-warning">Review Ka.Departemen</span>
   {:else if code === 5}
      <span class="tag is-danger is-light"> Revisi Ka.LPPM</span>
   {:else if code === 6}
      <span class="tag is-warning"> Review Ka.LPPM</span>
   {:else if code === 7}
      <span class="tag is-danger is-light">Revisi Reviewer</span>
   {:else if code === 8}
      <span class="tag is-warning">Review Reviewer</span>
   {:else if code === 9}
      <span class="tag is-danger is-light">Revisi Ka.Pusat Kajian</span>
   {:else if code === 10}
      <span class="tag is-warning">Review Ka.Pusat Kajian</span>
   {:else if code === 11}
      <span class="tag is-danger">Proposal Ditolak</span>
   {:else if code === 12}
      <span class="tag is-info">PPM Berlangsung</span>
   {:else if code === 13}
      <span class="tag is-danger is-light">Revisi Hasil Penelitian</span>
   {:else if code === 14}
      <span class="tag is-warning">Review Hasil Penelitian</span>
   {:else if code === 15}
      <span class="tag is-warning">Presentasi Hasil Penelitian</span>
   {:else if code === 16}
      <span class="tag is-success">PPM Selesai</span>
   {/if}
{/if}

<!-- ========================================
              Catatan Warna Tag
=============================================
Draft Proposal    = "tag is-warning is-light"
Revisi            = "tag is-danger is-light"
Review            = "tag is-warning"
Proposal Ditolak  = "tag is-danger"
PPM Berlangsung   = "tag is-info"
PPM Selesai       = "tag is-success"
========================================= -->

<style>
   /* .is-lightDark {
      background-color: #adb5bd;
      color: #fff;
   }
   .is-moreLightDark {
      background-color: #5e6a6e;
      color: #fff;
   } */
</style>
