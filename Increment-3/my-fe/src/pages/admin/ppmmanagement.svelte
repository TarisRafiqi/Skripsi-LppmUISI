<script>
   import { onMount } from "svelte";
   import { route, apiURL } from "../../store";
   import Article from "../../libs/Article.svelte";
   import Icon from "../../libs/Icon.svelte";
   import Status from "../../modules/Status.svelte";
   import { infoOutline, searchIcon } from "../../store/icons";

   let items;
   let filterJudul = "";
   let filterStatus = "";
   let filterJenisSkema = "";
   let filterJenisKegiatan = "";
   const accessToken = localStorage.getItem("token");
   const accountRole = localStorage.getItem("role");

   const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
   };

   // Pakai akses token, Hanya role admin yang bisa mengakses halaman ini
   onMount(async () => {
      const response = await fetch($apiURL + "/ppm", {
         method: "GET",
         headers: headers,
      });

      const result = await response.json();

      if (response.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (response.ok) {
            items = result.dbData;
            // console.log(items);
         }
      }
   });

   async function handleReview(ev) {
      const id = ev.target.getAttribute("uid");
      $route("/admin/detailppm/" + id);
   }

   async function handleApproval(ev) {
      const id = ev.target.getAttribute("uid");
   }
</script>

<Article>
   {#if accountRole === "admin"}
      {#if items}
         <h2 class="title is-2">PPM Management</h2>
         <hr />

         <div class="columns">
            <div class="column is-narrow">
               <div class="field">
                  <div class="select is-fullwidth">
                     <select bind:value={filterJenisKegiatan}>
                        <option value="" selected disabled hidden
                           >Jenis Kegiatan</option
                        >
                        <option value="Penelitian">Penelitian</option>
                        <option value="Pengabdian Masyarakat"
                           >Pengabdian Masyarakat</option
                        >
                     </select>
                  </div>
               </div>
            </div>

            <div class="column is-narrow">
               <div class="field">
                  <div class="select is-fullwidth">
                     <select bind:value={filterJenisSkema}>
                        <option value="" selected disabled hidden
                           >Jenis Skema</option
                        >

                        <optgroup label="Penelitian">
                           <option value="Riset Kelompok Keahlian"
                              >Riset Kelompok Keahlian</option
                           >
                           <option value="Riset Terapan">Riset Terapan</option>
                           <option value="Riset Kerjasama"
                              >Riset Kerjasama</option
                           >
                           <option value="Riset Eksternal"
                              >Riset Eksternal</option
                           >
                           <option value="Riset Mandiri">Riset Mandiri</option>
                        </optgroup>

                        <optgroup label="Pengabdian Masyarakat">
                           <option value="Pengabdian Masyarakat Desa Binaan"
                              >Pengabdian Masyarakat Desa Binaan</option
                           >
                           <option value="Pengabdian Masyarakat UMKM Binaan"
                              >Pengabdian Masyarakat UMKM Binaan</option
                           >
                           <option value="Pengabdian Masyarakat Hibah Eksternal"
                              >Pengabdian Masyarakat Hibah Eksternal</option
                           >
                           <option value="Pengabdian Masyarakat Mandiri"
                              >Pengabdian Masyarakat Mandiri</option
                           >
                        </optgroup>
                     </select>
                  </div>
               </div>
            </div>

            <div class="column is-narrow">
               <div class="field">
                  <div class="select is-fullwidth">
                     <select bind:value={filterStatus}>
                        <option value="" selected disabled hidden>Status</option
                        >
                        <option value="2">Review Administrasi</option>
                        <option value="">Lainnya</option>
                     </select>
                  </div>
               </div>
            </div>

            <div class="column">
               <div class="field">
                  <div class="control has-icons-left">
                     <input
                        class="input"
                        type="text"
                        bind:value={filterJudul}
                     />
                     <span class="icon is-left">
                        <Icon id="searchIcon" src={searchIcon} />
                     </span>
                  </div>
               </div>
            </div>
         </div>

         <div class="box parent">
            <div class="child">
               <table class="table is-fullwidth is-striped is-hoverable">
                  <thead>
                     <tr>
                        <th style="width: 50%;">Judul</th>
                        <th
                           style="width: 10%; text-align: center"
                           class="is-narrow">Jenis Kegiatan</th
                        >
                        <th
                           style="width: auto; text-align: center"
                           class="is-narrow">Jenis Skema</th
                        >
                        <th style="width: 15%; text-align: center">Status</th>
                        <th style="width: 5%;" colspan="2">Action</th>
                     </tr>
                  </thead>

                  <tbody>
                     <!-- {#each items as item} -->
                     {#each items.filter((item) => item.judul
                              .toLowerCase()
                              .includes(filterJudul.toLowerCase()) && (filterJenisKegiatan === "" || item.jenis_kegiatan === filterJenisKegiatan) && (filterJenisSkema === "" || item.jenis_skema === filterJenisSkema) && (filterStatus === "" || item.status === Number(filterStatus))) as item}
                        <tr>
                           <td class="judul"><p>{item.judul}</p> </td>
                           <td class="kegiatan"><p>{item.jenis_kegiatan}</p></td
                           >
                           <td class="skema"><p>{item.jenis_skema}</p></td>
                           <td class="status"
                              ><Status
                                 code={item.status}
                                 jenisSkema={item.jenis_skema}
                              /></td
                           >
                           <td class="review"
                              ><button
                                 class="button is-info is-small"
                                 uid={item.id}
                                 on:click={handleReview}
                              >
                                 <span class="icon">
                                    <Icon id="review" src={infoOutline} />
                                 </span></button
                              ></td
                           >
                        </tr>
                     {/each}
                  </tbody>
               </table>
            </div>
         </div>
      {/if}
   {:else}
      <p class="title is-4">Anda tidak memiliki hak akses halaman ini!</p>
   {/if}
</Article>

<style>
   .judul {
      text-align: justify;
   }

   .kegiatan,
   .skema,
   .status,
   .review {
      text-align: center;
   }

   .review {
      cursor: pointer;
   }

   .parent {
      max-height: 60vh;
      overflow: hidden;
   }

   .child {
      max-height: 100%;
      overflow-y: auto;
      scrollbar-width: thin;
   }

   .box {
      display: flex;
      flex-direction: column;
      /* flex: 1; */
   }
</style>
