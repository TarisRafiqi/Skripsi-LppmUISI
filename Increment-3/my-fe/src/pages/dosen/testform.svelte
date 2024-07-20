<script>
   import { onMount } from "svelte";
   import Article from "../../libs/Article.svelte";
   import { route, apiURL } from "../../store";
   import Icon from "../../libs/Icon.svelte";
   import {
      deleteIcon,
      upArrow,
      downArrow,
      downloadIcon,
      add,
   } from "../../store/icons";

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
   <h2 class="title is-2">Pendaftaran Proposal</h2>
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

   <div class="columns is-desktop">
      <!-- ===================================== -->
      <!--         Box-1 Detail PPM         -->
      <!-- ===================================== -->
      <div class="column">
         <div class="box">
            <h4 class="subtitle is-4">Detail PPM</h4>
            <br />

            <div class="columns is-desktop">
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
                        <option>Penelitian</option>
                        <option>Pengabdian Masyarakat</option>
                     </select>
                  </div>
               </div>
            </div>

            <div class="columns is-desktop">
               <div class="column">
                  <label class="label" for="label"
                     ><h6 class="title is-6">Kelompok Keahlian</h6></label
                  >
                  <input class="input" />
               </div>

               <div class="column">
                  <label class="label" for="label"
                     ><h6 class="title is-6">Jenis Skema</h6>
                  </label>
                  <div class="select is-fullwidth">
                     <select>
                        <option>Pilih jenis skema</option>
                     </select>
                  </div>
               </div>
            </div>

            <div class="columns is-desktop">
               <div class="column">
                  <label class="label" for="label"
                     ><h6 class="title is-6">Topik</h6></label
                  >
                  <input class="input" />
               </div>

               <div class="column">
                  <label class="label" for="label"
                     ><h6 class="title is-6">Biaya Penelitian</h6></label
                  >
                  <input class="input" />
               </div>
            </div>

            <div class="columns is-desktop">
               <div class="column">
                  <label class="label" for="label"
                     ><h6 class="title is-6">Tanggal Mulai</h6></label
                  >
                  <input class="input" type="date" />
               </div>
               <div class="column">
                  <label class="label" for="label"
                     ><h6 class="title is-6">Tanggal Selesai</h6></label
                  >
                  <input class="input" type="date" />
               </div>
            </div>

            <div class="columns is-desktop">
               <div class="column">
                  <label class="label" for="label"
                     ><h6 class="title is-6">Anggota Tim</h6></label
                  >
                  <div class="select is-fullwidth">
                     <select>
                        <option>Select dropdown</option>
                     </select>
                  </div>
               </div>
            </div>

            <div class="columns is-desktop">
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

                  <hr />

                  <div class="columns is-desktop">
                     <div class="column">
                        <label class="label" for="label"
                           ><h6 class="title is-6">Judul</h6></label
                        >
                        <input class="input" />
                     </div>
                  </div>

                  <div class="columns is-desktop">
                     <div class="column">
                        <label class="label" for="label"
                           ><h6 class="title is-6">Abstrak</h6></label
                        >
                        <textarea class="textarea" id="myAbstract"></textarea>
                     </div>
                  </div>

                  <div class="columns is-desktop">
                     <div class="column">
                        <label class="label" for="label"
                           ><h6 class="title is-6">Proposal</h6></label
                        >
                        <div class="file has-name is-success">
                           <label class="file-label" for="fileRab">
                              <input
                                 class="file-input"
                                 type="file"
                                 name="resume"
                              />
                              <span class="file-cta">
                                 <span class="file-icon">
                                    <Icon id="download" src={downloadIcon} />
                                 </span>
                                 <span class="file-label"> Choose a file</span>
                              </span>
                              <span class="file-name">No file chosen</span>
                           </label>
                        </div>
                     </div>

                     <div class="column">
                        <label class="label" for="label"
                           ><h6 class="title is-6">
                              Rencana Aggaran Biaya
                           </h6></label
                        >
                        <div class="file has-name is-success">
                           <label class="file-label" for="fileRab">
                              <input
                                 class="file-input"
                                 type="file"
                                 name="resume"
                              />
                              <span class="file-cta">
                                 <span class="file-icon">
                                    <Icon id="download" src={downloadIcon} />
                                 </span>
                                 <span class="file-label"> Choose a file</span>
                              </span>
                              <span class="file-name">No file chosen</span>
                           </label>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>

   <div class="field is-grouped is-grouped-right">
      <p class="control">
         <button class="button is-info is-light">Simpan</button>
      </p>
      <p class="control">
         <button class="button is-info">Submit</button>
      </p>
   </div>
</Article>

<style>
   /* .columns {
      display: flex;
      align-items: stretch;
   }

   .column {
      display: flex;
      flex-direction: column;
   }

   .column .box {
      flex: 1;
   } */
</style>
