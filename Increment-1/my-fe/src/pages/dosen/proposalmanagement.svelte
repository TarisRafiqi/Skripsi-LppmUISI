<script>
   import { onMount } from "svelte";
   import { route, apiURL } from "../../store";
   import Article from "../../libs/Article.svelte";
   import Icon from "../../libs/Icon.svelte";
   import { accountAdd, infoOutline } from "../../store/icons";
   import Status from "../../modules/Status.svelte";
   import Modalroute from "../../libs/Modalroute.svelte";

   const localStorage_namaLengkap = localStorage.getItem("nama_lengkap");
   const id = localStorage.id;
   let showModalError = false;
   let items;

   function daysUntil(targetDate) {
      const today = new Date();
      const target = new Date(targetDate);
      const difference = target.getTime() - today.getTime();
      const positiveDifference = Math.abs(difference);
      // const days = Math.ceil(difference / (1000 * 3600 * 24));
      const days = Math.floor(positiveDifference / (1000 * 3600 * 24));

      // Convert the difference from milliseconds to days, weeks, and months
      const weeks = Math.floor(days / 7);
      const months = Math.floor(days / 30);
      const remainingWeeks = weeks % 4;
      const remainingDays = days % 30;
      return {
         months,
         remainingWeeks,
         remainingDays,
      };
   }

   onMount(async () => {
      const accessToken = localStorage.getItem("token");

      const headers = {
         Authorization: `Bearer ${accessToken}`,
         "Content-Type": "application/json",
      };

      const response = await fetch($apiURL + "/ppm/all/" + id, {
         method: "GET",
         headers: headers,
      });

      const result = await response.json();
      console.log(result);
      // return;

      const reminder = [];

      if (result.statusCode != 200) {
         // localStorage.clear();
         location.pathname = "/tokenexpired";
      } else {
         if (response.ok) {
            items = result.dbData;
            for (const item of items) {
               reminder.push({
                  judul: item.judul,
                  selesai: item.tanggal_selesai,
                  tersisa: `${daysUntil(item.tanggal_selesai).months} bulan, ${daysUntil(item.tanggal_selesai).remainingWeeks} minggu dan ${daysUntil(item.tanggal_selesai).remainingDays} hari.`,
               });
            }
         } else {
            console.log(response);
         }
      }
   });

   function detail(ev) {
      let propId = ev.target.getAttribute("pid");
      location.href = "/dosen/proposals/" + propId;
   }

   function addProposal() {
      if (
         localStorage_namaLengkap === null ||
         localStorage_namaLengkap === ""
      ) {
         showModalError = true;
      } else {
         location.href = "/dosen/pendaftaranproposal";
      }
   }
</script>

<Article>
   <h1 class="title is-1">Proposal Management</h1>
   <hr />

   <Modalroute bind:show={showModalError}>
      <p>Lengkapi profile anda terlebih dahulu</p>
   </Modalroute>

   <div class="box">
      <div class="columns">
         <div class="column is-narrow">
            <p>Daftarkan proposal anda, klik disini!</p>
         </div>
         <div class="column">
            <button class="button is-info is-small" on:click={addProposal}>
               <span class="icon">
                  <Icon id="accountAdd" src={accountAdd} />
               </span>
               <!-- svelte-ignore a11y-missing-attribute -->
               <span><a>Buat Proposal</a></span>
            </button>
         </div>
      </div>
   </div>

   <div class="box parent">
      <div class="child">
         <table class="table is-fullwidth is-striped is-hoverable">
            <thead>
               <tr>
                  <th style="width: 50%;">Judul</th>
                  <th style="width: 10%; text-align: center" class="is-narrow"
                     >Jenis Kegiatan</th
                  >
                  <th style="width: auto; text-align: center" class="is-narrow"
                     >Jenis Skema</th
                  >
                  <th style="width: 15%; text-align: center">Status</th>
                  <th style="width: 5%;" colspan="2">Action</th>
               </tr>
            </thead>

            {#if items}
               <tbody>
                  {#each items as item}
                     <tr>
                        <td class="judul"><p>{item.judul}</p></td>
                        <td class="kegiatan"><p>{item.jenis_kegiatan}</p></td>
                        <td class="skema"><p>{item.jenis_skema}</p></td>
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
      </div>
   </div>
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
      height: 600px;
      overflow: hidden;
   }

   .child {
      height: 100%;
      margin-right: -20px;
      padding-right: 20px;
      scrollbar-width: thin;
      overflow-y: scroll;
   }
</style>
