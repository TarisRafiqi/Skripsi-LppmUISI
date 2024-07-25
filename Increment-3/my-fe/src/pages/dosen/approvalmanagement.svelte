<script>
   import { onMount } from "svelte";
   import { route, apiURL } from "../../store";
   import Article from "../../libs/Article.svelte";
   import Icon from "../../libs/Icon.svelte";
   import Status from "../../modules/Status.svelte";
   import { infoOutline, searchIcon } from "../../store/icons";

   const accessToken = localStorage.getItem("token");
   const accountRole = localStorage.getItem("role");

   const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
   };

   const skemaInternal = [
      "Riset Kelompok Keahlian",
      "Riset Terapan",
      "Riset Kerjasama",
      "Pengabdian Masyarakat Desa Binaan",
      "Pengabdian Masyarakat UMKM Binaan",
   ];
   const skemaEksternal = [
      "Riset Eksternal",
      "Pengabdian Masyarakat Hibah Eksternal",
   ];
   const skemaMandiri = ["Riset Mandiri", "Pengabdian Masyarakat Mandiri"];

   const showPPMinKPKandKLPPM = [2, 7, 12];

   const id = localStorage.id;
   let role = localStorage.role;
   let items;
   let filterJudul = "";
   let filterJenisKegiatan = "";
   let filterJenisSkema = "";

   onMount(async () => {
      const response = await fetch($apiURL + "/approval/" + id, {
         method: "GET",
         headers: headers,
      });

      const result = await response.json();

      if (response.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (response.ok) {
            items = result.dbData;
         } else {
            console.log(response);
         }
      }
   });

   function detail(ev) {
      let propId = ev.target.getAttribute("pid");
      $route("/dosen/detailapproval/" + propId);
   }
</script>

<Article>
   {#if accountRole !== "dosen"}
      <h2 class="title is-2">Approval Management</h2>

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
                        <option value="Riset Kerjasama">Riset Kerjasama</option>
                        <option value="Riset Eksternal">Riset Eksternal</option>
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

         <div class="column">
            <div class="field">
               <div class="control has-icons-left">
                  <input
                     class="input"
                     type="text"
                     placeholder="Search judul"
                     bind:value={filterJudul}
                  />
                  <span class="icon is-left">
                     <Icon id="searchIcon" src={searchIcon} />
                  </span>
               </div>
            </div>
         </div>
      </div>

      {#if items}
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
                     {#if role === "K.PusatKajian" || role === "K.LPPM"}
                        <!-- {#each items as item} -->
                        {#each items.filter((item) => item.judul
                                 .toLowerCase()
                                 .includes(filterJudul.toLowerCase()) && (filterJenisKegiatan === "" || item.jenis_kegiatan === filterJenisKegiatan) && (filterJenisSkema === "" || item.jenis_skema === filterJenisSkema)) as item}
                           <!-- {#if ((item.jenis_skema === "Riset Eksternal" || item.jenis_skema === "Pengabdian Masyarakat Hibah Eksternal") && (item.status === 6 || item.status === 10)) || ((item.jenis_skema === "Riset Mandiri" || item.jenis_skema === "Pengabdian Masyarakat Mandiri") && (item.status === 6 || item.status === 10)) || ((item.jenis_skema === "Riset Kelompok Keahlian" || item.jenis_skema === "Riset Terapan" || item.jenis_skema === "Riset Kerjasama" || item.jenis_skema === "Pengabdian Masyarakat Desa Binaan" || item.jenis_skema === "Pengabdian Masyarakat UMKM Binaan") && (item.status === 8 || item.status === 12))} -->
                           {#if item.status > 4 && item.status !== 7 && item.status !== 12}
                              <tr>
                                 <td class="judul">{item.judul}</td>
                                 <td class="kegiatan"
                                    ><p>{item.jenis_kegiatan}</p></td
                                 >
                                 <td class="skema"><p>{item.jenis_skema}</p></td
                                 >
                                 <td class="status" pid={item.id}>
                                    <Status
                                       code={item.status}
                                       jenisSkema={item.jenis_skema}
                                    />
                                 </td>
                                 <td class="review">
                                    <button
                                       class="button is-info is-small"
                                       pid={item.id}
                                       on:click={detail}
                                    >
                                       <span class="icon">
                                          <Icon id="info" src={infoOutline} />
                                       </span>
                                    </button>
                                 </td>
                              </tr>
                           {/if}
                        {/each}
                     {/if}

                     {#if role === "reviewer"}
                        <!-- {#each items as item} -->
                        {#each items.filter((item) => item.judul
                                 .toLowerCase()
                                 .includes(filterJudul.toLowerCase()) && (filterJenisKegiatan === "" || item.jenis_kegiatan === filterJenisKegiatan)) as item}
                           {#if skemaInternal.includes(item.jenis_skema) && item.status === 6}
                              <tr>
                                 <td class="judul">{item.judul}</td>
                                 <td class="kegiatan"
                                    ><p>{item.jenis_kegiatan}</p></td
                                 >
                                 <td class="skema"><p>{item.jenis_skema}</p></td
                                 >
                                 <td class="status" pid={item.id}>
                                    <Status
                                       code={item.status}
                                       jenisSkema={item.jenis_skema}
                                    />
                                 </td>
                                 <td class="review"
                                    ><button
                                       class="button is-info is-small"
                                       pid={item.id}
                                       on:click={detail}
                                       ><span class="icon">
                                          <Icon id="orang" src={infoOutline} />
                                       </span></button
                                    ></td
                                 >
                              </tr>
                           {/if}
                        {/each}
                     {/if}

                     {#if role === "K.Departemen"}
                        <!-- {#each items as item} -->
                        {#each items.filter((item) => item.judul
                                 .toLowerCase()
                                 .includes(filterJudul.toLowerCase()) && (filterJenisKegiatan === "" || item.jenis_kegiatan === filterJenisKegiatan)) as item}
                           {#if item.status === 4}
                              <tr>
                                 <td class="judul">{item.judul}</td>
                                 <td class="kegiatan"
                                    ><p>{item.jenis_kegiatan}</p></td
                                 >
                                 <td class="skema"><p>{item.jenis_skema}</p></td
                                 >
                                 <td class="status" pid={item.id}>
                                    <Status
                                       code={item.status}
                                       jenisSkema={item.jenis_skema}
                                    />
                                 </td>
                                 <td class="review"
                                    ><button
                                       class="button is-info is-small"
                                       pid={item.id}
                                       on:click={detail}
                                       ><span class="icon">
                                          <Icon id="orang" src={infoOutline} />
                                       </span></button
                                    ></td
                                 >
                              </tr>
                           {/if}
                        {/each}
                     {/if}
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
      max-height: 500px;
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
