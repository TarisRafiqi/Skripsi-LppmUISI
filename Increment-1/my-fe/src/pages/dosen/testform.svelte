<script>
   import { onMount } from "svelte";
   import Article from "../../libs/Article.svelte";
   import { route, apiURL } from "../../store";
   import Icon from "../../libs/Icon.svelte";
   import { deleteIcon, upArrow, downArrow } from "../../store/icons";

   let username = "";
   let email = "";
   let error = {};

   const form = {
      username,
      email,
   };

   function handleSubmit() {
      for (const [key, value] of Object.entries(form)) {
         if (!form[key]) {
            error[key] = "This field is required";
         } else {
            console.log("Sukses...");
         }
      }
   }

   let profileBox = false;
   let tab1 = true;
   let tab2;
   let tab3;

   function clicktab1() {
      tab1 = true;
      tab2 = false;
      tab3 = false;
   }

   function clicktab2() {
      tab1 = false;
      tab2 = true;
      tab3 = false;
   }

   function clicktab3() {
      tab1 = false;
      tab2 = false;
      tab3 = true;
   }

   async function ProfileBoxOn() {
      profileBox = true;
   }
   async function ProfileBoxOff() {
      profileBox = false;
   }
</script>

<Article>
   <h1 class="title is-1">Pendaftaran Proposal</h1>
   <hr />
   <!-- <div class="box">
      <div class="columns">
         <div class="column">
            <div class="field">
               <label class="label" for="label">Username</label>
               <input class="input" type="text" placeholder="Text input" />
               <p class="help is-danger">This username is available</p>
            </div>
         </div>

         <div class="column">
            <div class="field">
               <label class="label" for="label"
                  ><h6 class="title is-6">Username</h6></label
               >
               <input class="input" type="text" placeholder="Text input" />
               <p class="help is-danger">This username is available</p>
            </div>
         </div>
      </div>
   </div> -->
   <!-- ================================================================================================================== -->

   <div class="columns">
      <!-- ===================================== -->
      <!--         Box-1 Detail Proposal         -->
      <!-- ===================================== -->
      <div class="column">
         <div class="box">
            <h4 class="subtitle is-4">Detail Proposal</h4>
            <br />

            <div class="columns">
               <div class="column">
                  <label class="label" for="label"
                     ><h6 class="title is-6">
                        Jenis Proposal<span class="has-text-danger">*</span>
                     </h6></label
                  >
                  <div class="select is-fullwidth is-danger">
                     <select>
                        <option>Proposal Awal</option>
                        <option>Proposal Lanjutan</option>
                     </select>
                  </div>
                  <!-- <p class="help error is-danger">This field is required</p> -->
               </div>
               <div class="column">
                  <label class="label" for="label"
                     ><h6 class="title is-6">Jenis Kegiatan</h6></label
                  >
                  <div class="select is-fullwidth">
                     <select>
                        <option>Select dropdown</option>
                     </select>
                  </div>
               </div>
               <div class="column">
                  <label class="label" for="label"
                     ><h6 class="title is-6">Jenis Skema</h6>
                  </label>
                  <div class="select is-fullwidth">
                     <select>
                        <option>Select dropdown</option>
                     </select>
                  </div>
               </div>
            </div>

            <div class="columns">
               <div class="column">
                  <label class="label" for="label"
                     ><h6 class="title is-6">Kelompok Keahlian</h6></label
                  >
                  <input class="input" type="text" placeholder="Text input" />
                  <!-- <p class="help error is-danger">This field is required</p> -->
               </div>
               <div class="column">
                  <label class="label" for="label"
                     ><h6 class="title is-6">Topik</h6></label
                  >
                  <input class="input" type="text" placeholder="Text input" />
               </div>
            </div>

            <div class="columns">
               <div class="column">
                  <label class="label" for="label"
                     ><h6 class="title is-6">Tanggal Mulai</h6></label
                  >
                  <input class="input" type="date" />
                  <!-- <p class="help error is-danger">This field is required</p> -->
               </div>
               <div class="column">
                  <label class="label" for="label"
                     ><h6 class="title is-6">Tanggal Selesai</h6></label
                  >
                  <input class="input" type="date" />
               </div>
            </div>

            <div class="columns">
               <div class="column">
                  <label class="label" for="label"
                     ><h6 class="title is-6">Biaya Penelitian</h6></label
                  >
                  <input
                     class="input"
                     type="text"
                     placeholder="Masukkan biaya penelitian"
                  />
                  <!-- <p class="help error is-danger">This field is required</p> -->
               </div>
            </div>

            <div class="columns">
               <div class="column">
                  <label class="label" for="label"
                     ><h6 class="title is-6">Anggota Tim</h6></label
                  >
                  <div class="select is-fullwidth">
                     <select>
                        <option>Select dropdown</option>
                     </select>
                  </div>
                  <!-- <p class="help error is-danger">This field is required</p> -->
               </div>
            </div>

            <div class="columns">
               <div class="column">
                  <table
                     class="table is-fullwidth is-striped is-hoverable is-bordered"
                  >
                     <thead>
                        <tr>
                           <th class="is-narrow" style="width:55px"></th>
                           <th class="is-narrow" style="width:86px">Role</th>
                           <th>Nama Anggota </th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <td
                              ><button class="button is-danger is-small"
                                 ><span class="icon">
                                    <Icon id="delete" src={deleteIcon} />
                                 </span>
                              </button></td
                           >
                           <td>Ketua</td>
                           <td>Taris Rafiqi izatri</td>
                        </tr>
                        <tr>
                           <td
                              ><button class="button is-danger is-small"
                                 ><span class="icon">
                                    <Icon id="delete" src={deleteIcon} />
                                 </span>
                              </button></td
                           >
                           <td>Anggota</td>
                           <td>Tristan Byrne</td>
                        </tr>
                        <tr>
                           <td
                              ><button class="button is-danger is-small"
                                 ><span class="icon">
                                    <Icon id="delete" src={deleteIcon} />
                                 </span>
                              </button></td
                           >
                           <td>Anggota</td>
                           <td>Fariz Ghifari</td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </div>

      <!-- ===================================== -->
      <!--         Box-2 Biodata Peneliti        -->
      <!-- ===================================== -->
      <div class="column">
         <div class="box">
            <h4 class="subtitle is-4">Biodata Peneliti</h4>
            <br />

            <div class="profileBox">
               <div class="columns">
                  <div class="column">
                     <h6 class="subtitle is-6">Taris Rafiqi Izatri</h6>
                  </div>
                  <div class="column is-1">
                     <button class="button is-info is-small"
                        ><span class="icon">
                           <Icon id="downArrow" src={downArrow} />
                        </span></button
                     >
                  </div>
               </div>
            </div>

            <div class="profileBox">
               {#if !profileBox}
                  <div class="columns">
                     <div class="column">
                        <h6 class="subtitle is-6">Tristan Byrne</h6>
                     </div>
                     <div class="column is-1">
                        <button
                           class="button is-info is-small"
                           on:click={ProfileBoxOn}
                           ><span class="icon">
                              <Icon id="downArrow" src={downArrow} />
                           </span></button
                        >
                     </div>
                  </div>
               {:else}
                  <div class="columns">
                     <div class="column">
                        <h6 class="subtitle is-6">Tristan Byrne</h6>
                     </div>
                     <div class="column is-1">
                        <button
                           class="button is-info is-small"
                           on:click={ProfileBoxOff}
                           ><span class="icon">
                              <Icon id="upArrow" src={upArrow} />
                           </span></button
                        >
                     </div>
                  </div>
                  <div class="tabs is-boxed">
                     <ul>
                        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <li on:click={clicktab1} class:is-active={tab1}>
                           <!-- svelte-ignore a11y-missing-attribute -->
                           <a>
                              <span>Identitas</span>
                           </a>
                        </li>
                        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <li on:click={clicktab2} class:is-active={tab2}>
                           <!-- svelte-ignore a11y-missing-attribute -->
                           <a>
                              <span>Riwayat Pendidikan</span>
                           </a>
                        </li>
                        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <li on:click={clicktab3} class:is-active={tab3}>
                           <!-- svelte-ignore a11y-missing-attribute -->
                           <a>
                              <span>Pengalaman</span>
                           </a>
                        </li>
                     </ul>
                  </div>

                  {#if tab1 === true}
                     <div class="columns">
                        <div class="column">
                           <label class="label" for="label"
                              ><h6 class="title is-6">Nama lengkap</h6></label
                           >
                           <input
                              class="input"
                              placeholder="Masukkan nama lengkap dengan gelar"
                           />
                        </div>
                     </div>

                     <div class="columns">
                        <div class="column">
                           <label class="label" for="label"
                              ><h6 class="title is-6">
                                 Jabatan Fungsional
                              </h6></label
                           >
                           <div class="select is-fullwidth is-danger">
                              <select>
                                 <option>Tenaga Pengajar</option>
                                 <option>Asisten Ahli</option>
                                 <option>Lektor</option>
                                 <option>Lektor Kepala</option>
                                 <option>Guru Besar</option>
                              </select>
                           </div>
                        </div>

                        <div class="column">
                           <label class="label" for="label"
                              ><h6 class="title is-6">NIP</h6></label
                           >
                           <input class="input" />
                        </div>
                        <div class="column">
                           <label class="label" for="label"
                              ><h6 class="title is-6">NIDN</h6></label
                           >
                           <input class="input" />
                        </div>
                     </div>

                     <div class="columns">
                        <div class="column">
                           <label class="label" for="label"
                              ><h6 class="title is-6">Tempat Lahir</h6></label
                           >
                           <input class="input" />
                        </div>
                        <div class="column">
                           <label class="label" for="label"
                              ><h6 class="title is-6">Tanggal Lahir</h6></label
                           >
                           <input class="input" type="date" />
                        </div>
                     </div>
                  {/if}
                  {#if tab2 === true}
                     tes2
                  {/if}
                  {#if tab3 === true}
                     tes3
                  {/if}
               {/if}
            </div>

            <div class="profileBox">
               <div class="columns">
                  <div class="column">
                     <h6 class="subtitle is-6">Fariz Ghifari</h6>
                  </div>
                  <div class="column is-1">
                     <button class="button is-info is-small"
                        ><span class="icon">
                           <Icon id="downArrow" src={downArrow} />
                        </span></button
                     >
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>

   <div class="box">
      <h4 class="subtitle is-4">Informasi Revisi</h4>
      <br />
   </div>
</Article>

<style>
   .profileBox {
      background-color: rgb(250, 250, 250);
      padding: 15px;
      margin-top: 10px;
      margin-bottom: 10px;
   }

   .columns {
      display: flex;
      align-items: stretch;
   }

   .column {
      display: flex;
      flex-direction: column;
   }

   .column .box {
      flex: 1;
   }
</style>
