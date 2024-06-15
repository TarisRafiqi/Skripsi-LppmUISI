<script>
   import { onMount } from "svelte";
   import Article from "../../libs/Article.svelte";
   import { route, apiURL, ppmFile } from "../../store";
   import Field from "../../libs/Field.svelte";
   import Icon from "../../libs/Icon.svelte";
   import { cancelIcon, edit, downloadIcon } from "../../store/icons";

   let isFormVisible1 = false;

   async function getBiodataAnggota() {
      let ids = anggotaTim.map((anggota) => anggota.value);
      let promises = ids.map(async (idAnggota) => {
         try {
            // ==============
            // get profile
            // ==============
            const profileResponse = await fetch(
               $apiURL + "/user/" + idAnggota,
               {
                  method: "GET",
                  headers: headers,
               }
            );
            if (!profileResponse.ok) {
               throw new Error(`Failed to fetch profile for ID ${idAnggota}`);
            }
            const profileResult = await profileResponse.json();

            // ==============
            // get RPS1
            // ==============
            const RPS1Response = await fetch(
               $apiURL + "/riwayatPendidikanS1/" + idAnggota,
               {
                  method: "GET",
                  headers: headers,
               }
            );
            if (!RPS1Response.ok) {
               throw new Error(`Failed to fetch RPS1 for ID ${idAnggota}`);
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

      userData = await Promise.all(promises);
      // You might want to handle cases where some user data couldn't be fetched
      console.log(userData);
   }
</script>

<Article>
   <div class="box">
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <h4 class="title is-4">
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
      color: #434a54;
      font-size: small;
   }
</style>
