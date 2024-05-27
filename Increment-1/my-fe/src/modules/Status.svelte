<script>
   export let code;

   // console.log(code);
</script>

{#if code === 0}
   <span class="tag is-warning is-light">Draft Proposal</span>
   <!-- Draft Proposal -->
{:else if code === 1}
   <span class="tag is-danger is-light">Revisi Proposal</span>
   <!-- Revisi Proposal -->
{:else if code === 2}
   <span class="tag is-warning">Review Administrasi</span>
   <!-- Review Administrasi -->
{:else if code === 3}
   <span class="tag is-danger is-light">Revisi Ka.Departemen</span>
   <!-- Revisi Ka.Departemen -->
{:else if code === 4}
   <span class="tag is-warning">Review Ka. Departemen</span>
   <!-- Review Ka. Departemen -->
{:else if code === 5}
   <span class="tag is-danger is-light"> Revisi Ka. LPPM</span>
   <!-- Revisi Ka. LPPM -->
{:else if code === 6}
   <span class="tag is-warning"> Review Ka. LPPM</span>
   <!-- Review Ka. LPPM -->
{:else if code === 7}
   <span class="tag is-danger is-light">Revisi Reviewer</span>
   <!-- Revisi Reviewer -->
{:else if code === 8}
   <span class="tag is-warning">Review Reviewer</span>
   <!-- Review Reviewer -->
{:else if code === 9}
   <span class="tag is-danger is-light">Revisi Ka. Pusat Kajian</span>
   <!-- Revisi Ka. Pusat Kajian -->
{:else if code === 10}
   <span class="tag is-warning">Review Ka. Pusat Kajian</span>
   <!-- Review Ka. Pusat Kajian -->
{:else if code === 11}
   <span class="tag is-danger">Proposal Ditolak</span>
   <!-- Ditolak Ka. Pusat Kajian -->
{:else if code === 12}
   <span class="tag is-link is-success">Proposal Diterima</span>
   <!-- Penelitian Dimulai -->
   <!-- {:else if code === 13} -->
   <!-- <span class="tag is-success ">PPM Selesai</span> -->
   <!-- Penelitian Selesai -->
{/if}
