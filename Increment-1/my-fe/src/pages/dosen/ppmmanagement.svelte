<script>
   import { onMount } from "svelte";
   import { route, apiURL } from "../../store";
   import Article from "../../libs/Article.svelte";
   import Icon from "../../libs/Icon.svelte";
   import Status from "../../modules/Status.svelte";
   import { accountAdd, infoOutline } from "../../store/icons";

   const id = localStorage.id;
   let items;

   onMount(async () => {
      const accessToken = localStorage.getItem("token");

      const headers = {
         Authorization: `${accessToken}`,
         "Content-Type": "application/json",
      };

      const response = await fetch($apiURL + "/ppm/all/" + id, {
         method: "GET",
         headers: headers,
      });

      const result = await response.json();

      if (response.ok) {
         items = result.dbData;
      } else {
         console.log(response);
      }
   });

   function detail(ev) {
      let propId = ev.target.getAttribute("pid");
      location.href = "/dosen/proposals/" + propId;
   }

   function addProposal() {
      location.href = "/dosen/proposal";
   }
</script>

<Article>
   <h1 class="title is-1">PPM Management</h1>
   <hr />

   <button class="button is-info" on:click={addProposal}>
      <span class="icon">
         <Icon id="orang" src={accountAdd} />
      </span>
      <!-- svelte-ignore a11y-missing-attribute -->
      <span><a>Buat Proposal</a></span>
   </button>

   <table class="table is-fullwidth is-striped is-hoverable">
      <thead>
         <tr>
            <th>Judul</th>
            <th class="is-narrow">Jenis Kegiatan</th>
            <th class="is-narrow">Jenis Skema</th>
            <th>Status</th>
            <th colspan="2">Action</th>
         </tr>
      </thead>

      {#if items}
         <tbody>
            {#each items as item}
               <tr>
                  <td><p>{item.judul}</p></td>
                  <td><p>{item.jenis_kegiatan}</p></td>
                  <td><p>{item.jenis_skema}</p></td>
                  <td class="status" pid={item.id}>
                     <Status code={item.status} />
                  </td>
                  <td class="review"
                     ><button
                        class="button is-info is-rounded is-small"
                        pid={item.id}
                        on:click={detail}
                        ><span class="icon">
                           <Icon id="info" src={infoOutline} />
                        </span></button
                     ></td
                  >
               </tr>
            {/each}
         </tbody>
      {/if}
   </table>
</Article>

<style>
   p {
      text-align: justify;
   }
   .review {
      cursor: pointer;
   }

   .status {
      text-align: center;
   }
</style>
