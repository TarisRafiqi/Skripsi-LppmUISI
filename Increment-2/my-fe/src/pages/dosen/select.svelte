<script>
   import { cancelIcon, edit, downloadIcon } from "../../store/icons";
   import { route, apiURL, ppmFile } from "../../store";
   import Article from "../../libs/Article.svelte";
   import Fieldview from "../../libs/Fieldview.svelte";
   import { onMount } from "svelte";
   import Select from "../../libs/Select.svelte";
   import Field from "../../libs/Field.svelte";
   import Icon from "../../libs/Icon.svelte";
   import { deleteIcon } from "../../store/icons";

   const localStorage_namaLengkap = localStorage.getItem("nama_lengkap");
   const localStorage_id = localStorage.getItem("id");
   const accessToken = localStorage.getItem("token");
   const id = Number(localStorage.getItem("id"));
   const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
   };

   let isFormVisible1 = false;
   let anggotaTim = [
      {
         value: localStorage_id,
         label: localStorage_namaLengkap,
         role: "Ketua",
      },
   ];
   let userData = [];
   let items = [];

   onMount(async () => {
      //============================================================
      // Get Users for Form Select Anggota Tim
      //============================================================
      const response = await fetch($apiURL + "/pilihUser", {
         method: "GET",
         headers: headers,
      });

      const result = await response.json();

      if (response.status === 401) {
         location.pathname = "/tokenexpired";
      } else {
         if (response.ok) {
            listUser = result;
            items = [];
            for (const [key, value] of Object.entries(listUser)) {
               items.push({
                  value: value.uid,
                  label: value.nama_lengkap,
               });
            }
         } else {
            console.log(response);
         }
      }

      // =========================================================
      // getBiodataAnggota();
   });

   $: getBiodataAnggota();

   async function getBiodataAnggota() {
      let ids = anggotaTim.map((anggota) => anggota.value);
      let promises = ids.map(async (idAnggota) => {
         try {
            // ==============================================
            // Get profile
            // ==============================================
            const profileResponse = await fetch(
               $apiURL + "/user/" + idAnggota,
               {
                  method: "GET",
                  headers: headers,
               }
            );

            if (profileResponse.status === 401) {
               location.pathname = "/tokenexpired";
               return;
            }
            if (!profileResponse.ok) {
               throw new Error(`Failed to fetch profile for ID ${idAnggota}`);
            }
            const profileResult = await profileResponse.json();

            // ==============================================
            // Get RPS1
            // ==============================================
            const RPS1Response = await fetch(
               $apiURL + "/riwayatPendidikanS1/" + idAnggota,
               {
                  method: "GET",
                  headers: headers,
               }
            );

            if (RPS1Response.status === 401) {
               location.pathname = "/tokenexpired";
               return;
            }
            if (!RPS1Response.ok) {
               throw new Error(
                  `Failed to fetch Riwayat Pendidikan S1 for ID ${idAnggota}`
               );
            }
            const RPS1Result = await RPS1Response.json();

            return {
               profile: profileResult,
               RPS1: RPS1Result.dbData,
            };
         } catch (error) {
            console.error(`Error fetching data for ID ${idAnggota}:`, error);
            return {
               profile: null,
               RPS1: [],
               error: error.message,
            };
         }
      });

      // userData = await Promise.all(promises);
      userData = await Promise.all(promises.filter(Boolean));
      // console.log(userData);
   }

   function deleteMember(e) {
      let uid = e.target.getAttribute("data-value");
      anggotaTim = anggotaTim.filter((member) => {
         return member.value !== uid;
      });
   }
</script>

<Article>
   {#if userData.length > 0}
      {#each userData as user, index}
         <div class="box">
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <h6 class="title is-6">
               Biodata - {user.profile.nama_lengkap}
               <span
                  class="toggle-button"
                  on:click={() =>
                     (userData[index].profileVisible =
                        !userData[index].profileVisible)}
               >
                  {userData[index].profileVisible ? "(tutup)" : "(buka)"}
               </span>
            </h6>

            {#if userData[index].profileVisible}
               <!-- =================== -->
               <!-- Identitas -->
               <!-- =================== -->
               <hr class="has-background-grey-light" />

               <h5 class="title is-5">Identitas Diri</h5>
               <div class="notification is-info is-light">
                  <p>Pastikan untuk melengkapi Identitas Diri.</p>
               </div>

               <div class="columns is-desktop">
                  <Fieldview
                     title="Nama Lengkap"
                     content={user.profile.nama_lengkap}
                  />
                  <Fieldview
                     title="Jabatan Fungsional"
                     content={user.profile.jabatan_fungsional}
                  />
               </div>

               <div class="columns is-desktop">
                  <Fieldview title="NIP" content={user.profile.nip} />
                  <Fieldview title="NIDN" content={user.profile.nidn} />
               </div>

               <div class="columns is-desktop">
                  <Fieldview title="Email" content={user.profile.email} />
                  <Fieldview
                     title="Nomor Handphone"
                     content={user.profile.nomor_handphone}
                  />
               </div>

               <div class="columns is-desktop">
                  <Fieldview
                     title="Tempat Lahir"
                     content={user.profile.tempat_lahir}
                  />
                  <Fieldview
                     title="Tanggal Lahir"
                     content={user.profile.tanggal_lahir}
                  />
               </div>

               <div class="columns is-desktop">
                  <Fieldview
                     title="Alamat Rumah"
                     content={user.profile.alamat_rumah}
                  />
                  <Fieldview
                     title="Telp/Fax Rumah"
                     content={user.profile.telp_fax_rumah}
                  />
               </div>

               <div class="columns is-desktop">
                  <Fieldview
                     title="Alamat Kantor"
                     content={user.profile.alamat_kantor}
                  />
                  <Fieldview
                     title="Telp/Fax Kantor"
                     content={user.profile.telp_fax_kantor}
                  />
               </div>

               <div class="columns is-desktop">
                  <Fieldview
                     title="Mata Kuliah yang diampu"
                     content={user.profile.mata_kuliah}
                     type="list"
                  />
                  <Fieldview title="" content="" />
               </div>

               <hr class="has-background-grey-light" />
            {/if}
         </div>
      {/each}
   {/if}

   <br />

   <table class="table is-fullwidth is-striped is-hoverable is-bordered">
      <thead>
         <tr>
            <th class="is-narrow" style="width:55px"></th>
            <th class="is-narrow" style="width:86px">Role</th>
            <th>Nama Anggota </th>
         </tr>
      </thead>
      <tbody>
         {#if anggotaTim.length > 0}
            {#each anggotaTim as member, idx}
               <tr>
                  <td>
                     {#if idx > 0}
                        <button
                           class="button is-danger is-small"
                           data-value={member.value}
                           on:click={deleteMember}
                           ><span class="icon">
                              <Icon id="delete" src={deleteIcon} />
                           </span>
                        </button>
                     {/if}
                  </td>
                  <td>{member.role}</td>
                  <td>{member.label}</td>
               </tr>
            {/each}
         {/if}
      </tbody>
   </table>

   <div class="box">
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <h4 class="title is-5">
         Test Extend Box
         <span
            class="toggle-button"
            on:click={() => (isFormVisible1 = !isFormVisible1)}
         >
            {isFormVisible1 ? "(tutup)" : "(buka)"}
         </span>
      </h4>

      {#if isFormVisible1}
         <div class="field">
            <label for="Username">Username</label>
            <input class="input" type="text" />
         </div>

         <div class="field">
            <label for="Passowrd">Password</label>
            <input class="input" type="password" />
         </div>
      {/if}
   </div>
</Article>

<style>
   .toggle-button {
      cursor: pointer;
      color: #fc6c78;
      font-size: small;
   }
   /* ul {
      margin-left: 1.2em;
      margin-top: -1em;
   }
   ul li {
      margin-bottom: 4px;
   } */
</style>
