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
      <!--         Box-1 Detail Proposal         -->
      <!-- ===================================== -->
      <div class="column">
         <div class="box">
            <h4 class="subtitle is-4">Detail Proposal</h4>
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
                     ><h6 class="title is-6">Kelompok Keahlian</h6></label
                  >
                  <input class="input" />
               </div>
               <div class="column">
                  <label class="label" for="label"
                     ><h6 class="title is-6">Topik</h6></label
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
                     ><h6 class="title is-6">Biaya Penelitian</h6></label
                  >
                  <input class="input" />
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

      <!-- ===================================== -->
      <!--         Box-2 Biodata Peneliti        -->
      <!-- ===================================== -->
      <div class="column">
         <div class="box boxBiodataPeneliti">
            <h4 class="subtitle is-4">Biodata Peneliti</h4>
            <br />

            <div class="box profileBox">
               {#if !profileBox}
                  <div class="columns">
                     <div class="column">
                        <h6 class="subtitle is-6">Taris Rafiqi Izatri</h6>
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
                        <h6 class="subtitle is-6">Taris Rafiqi Izatri</h6>
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

                  <div class="parent">
                     <div class="child">
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
                           <div class="columns is-desktop">
                              <div class="column">
                                 <label class="label" for="label"
                                    ><h6 class="title is-6">
                                       Nama lengkap
                                    </h6></label
                                 >
                                 <input
                                    class="input"
                                    placeholder="Masukkan nama lengkap dengan gelar"
                                 />
                              </div>
                           </div>
                           <div class="columns is-desktop">
                              <div class="column">
                                 <label class="label" for="label"
                                    ><h6 class="title is-6">
                                       Nomor Handphone
                                    </h6></label
                                 >
                                 <input class="input" />
                              </div>
                              <div class="column">
                                 <label class="label" for="label"
                                    ><h6 class="title is-6">Email</h6></label
                                 >
                                 <input class="input" />
                              </div>
                           </div>

                           <div class="columns is-desktop">
                              <div class="column">
                                 <label class="label" for="label"
                                    ><h6 class="title is-6">
                                       Jabatan Fungsional
                                    </h6></label
                                 >
                                 <div class="select is-fullwidth is-danger">
                                    <select>
                                       <option>Asisten Ahli</option>
                                       <option>Lektor</option>
                                       <option>Lektor Kepala</option>
                                       <option>Guru Besar / Profesor</option>
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

                           <div class="columns is-desktop">
                              <div class="column">
                                 <label class="label" for="label"
                                    ><h6 class="title is-6">
                                       Tempat Lahir
                                    </h6></label
                                 >
                                 <input class="input" />
                              </div>
                              <div class="column">
                                 <label class="label" for="label"
                                    ><h6 class="title is-6">
                                       Tanggal Lahir
                                    </h6></label
                                 >
                                 <input class="input" type="date" />
                              </div>
                           </div>

                           <div class="columns is-desktop">
                              <div class="column">
                                 <label class="label" for="label"
                                    ><h6 class="title is-6">
                                       Alamat Rumah
                                    </h6></label
                                 >
                                 <input class="input" />
                              </div>
                              <div class="column">
                                 <label class="label" for="label"
                                    ><h6 class="title is-6">
                                       Telp/Fax Rumah
                                    </h6></label
                                 >
                                 <input class="input" />
                              </div>
                           </div>

                           <div class="columns is-desktop">
                              <div class="column">
                                 <label class="label" for="label"
                                    ><h6 class="title is-6">
                                       Alamat Kantor
                                    </h6></label
                                 >
                                 <input class="input" />
                              </div>
                              <div class="column">
                                 <label class="label" for="label"
                                    ><h6 class="title is-6">
                                       Telp/Fax Kantor
                                    </h6></label
                                 >
                                 <input class="input" />
                              </div>
                           </div>

                           <div class="columns is-desktop">
                              <div class="column">
                                 <div class="field is-grouped">
                                    <p class="control is-expanded">
                                       <input
                                          class="input"
                                          placeholder="Tambahkan mata kuliah yang diampu"
                                       />
                                    </p>
                                    <p class="control">
                                       <button class="button is-info">
                                          <span class="icon">
                                             <Icon id="orang" src={add} />
                                          </span>
                                          <!-- svelte-ignore a11y-missing-attribute -->
                                          <span><a>Tambah</a></span>
                                       </button>
                                    </p>
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
                                          <th class="is-narrow"></th>
                                          <th>Mata Kuliah</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       <tr>
                                          <td
                                             ><button
                                                class="button is-danger is-small"
                                                ><span class="icon">
                                                   <Icon
                                                      id="delete"
                                                      src={deleteIcon}
                                                   />
                                                </span></button
                                             ></td
                                          >
                                          <td>Informatika</td>
                                       </tr>
                                    </tbody>
                                 </table>
                              </div>
                           </div>
                        {/if}

                        <!-- ===================== -->
                        <!-- Riwayat Pendidikan    -->
                        <!-- ===================== -->
                        {#if tab2 === true}
                           <!-- ===================================================================== -->
                           <!-- Table Program S1 -->
                           <!-- ===================================================================== -->
                           <label class="label" for="label"
                              ><h6 class="title is-6">Program S1</h6></label
                           >
                           <table
                              class="table is-fullwidth is-striped is-hoverable is-bordered"
                           >
                              <thead>
                                 <tr>
                                    <th></th>
                                    <th>Nama Perguruan Tinggi</th>
                                    <th>Bidang Ilmu</th>
                                    <th>Tahun Masuk</th>
                                    <th>Tahun Lulus</th>
                                    <th>Judul Skripsi/Tesis/Disertasi</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 <tr>
                                    <td
                                       ><button
                                          class="button is-danger is-small"
                                          ><span class="icon">
                                             <Icon
                                                id="delete"
                                                src={deleteIcon}
                                             />
                                          </span></button
                                       ></td
                                    >
                                    <td
                                       >Universitas Internasional Semen
                                       Indonesia</td
                                    >
                                    <td>Informatika</td>
                                    <td>2018</td>
                                    <td>2024</td>
                                    <td
                                       >Perancangan Sistem Informasi LPPM UISI
                                       Menggunakan Metode Incremental</td
                                    >
                                 </tr>
                                 <tr>
                                    <td colspan="6">
                                       <button
                                          class="button is-small is-success is-fullwidth"
                                          >Tambah</button
                                       >
                                    </td>
                                 </tr>
                              </tbody>
                           </table>

                           <!-- ===================================================================== -->
                           <!-- Table Program S2 -->
                           <!-- ===================================================================== -->
                           <label class="label" for="label"
                              ><h6 class="title is-6">Program S2</h6></label
                           >
                           <table
                              class="table is-fullwidth is-striped is-hoverable is-bordered"
                           >
                              <thead>
                                 <tr>
                                    <th></th>
                                    <th>Nama Perguruan Tinggi</th>
                                    <th>Bidang Ilmu</th>
                                    <th>Tahun Masuk</th>
                                    <th>Tahun Lulus</th>
                                    <th>Judul Skripsi/Tesis/Disertasi</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 <tr>
                                    <td
                                       ><button
                                          class="button is-danger is-small"
                                          ><span class="icon">
                                             <Icon
                                                id="delete"
                                                src={deleteIcon}
                                             />
                                          </span></button
                                       ></td
                                    >
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                 </tr>
                                 <tr>
                                    <td colspan="6">
                                       <button
                                          class="button is-small is-success is-fullwidth"
                                          >Tambah</button
                                       >
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                           <!-- ===================================================================== -->
                           <!-- Table Program S3 -->
                           <!-- ===================================================================== -->
                           <label class="label" for="label"
                              ><h6 class="title is-6">Program S3</h6></label
                           >
                           <table
                              class="table is-fullwidth is-striped is-hoverable is-bordered"
                           >
                              <thead>
                                 <tr>
                                    <th></th>
                                    <th>Nama Perguruan Tinggi</th>
                                    <th>Bidang Ilmu</th>
                                    <th>Tahun Masuk</th>
                                    <th>Tahun Lulus</th>
                                    <th>Judul Skripsi/Tesis/Disertasi</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 <tr>
                                    <td
                                       ><button
                                          class="button is-danger is-small"
                                          ><span class="icon">
                                             <Icon
                                                id="delete"
                                                src={deleteIcon}
                                             />
                                          </span></button
                                       ></td
                                    >
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                 </tr>
                                 <tr>
                                    <td colspan="6">
                                       <button
                                          class="button is-small is-success is-fullwidth"
                                          >Tambah</button
                                       >
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                        {/if}

                        <!-- ===================== -->
                        <!-- Pengalaman            -->
                        <!-- ===================== -->
                        {#if tab3 === true}
                           <!-- ====================================== -->
                           <!-- Table Pengalaman Penelitian            -->
                           <!-- ====================================== -->
                           <label class="label" for="label"
                              ><h6 class="title is-6">
                                 Pengalaman Penelitian
                              </h6></label
                           >
                           <table
                              class="table is-fullwidth is-striped is-hoverable is-bordered"
                           >
                              <thead>
                                 <tr>
                                    <th></th>
                                    <th>Tahun</th>
                                    <th>Judul Penelitian</th>
                                    <th>Role</th>
                                    <th>Sumber Dana</th>
                                    <th>Jumlah Rp.</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 <tr>
                                    <td
                                       ><button
                                          class="button is-danger is-small"
                                          ><span class="icon">
                                             <Icon
                                                id="delete"
                                                src={deleteIcon}
                                             />
                                          </span></button
                                       ></td
                                    >
                                    <td>2018</td>
                                    <td
                                       >Perancangan Sistem Informasi LPPM UISI
                                       Menggunakan Metode Incremental</td
                                    >
                                    <td>Ketua</td>
                                    <td>Internal UISI</td>
                                    <td>Rp. 10.000.000</td>
                                 </tr>
                                 <tr>
                                    <td colspan="6">
                                       <button
                                          class="button is-small is-success is-fullwidth"
                                          >Tambah</button
                                       >
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                           <!-- ====================================== -->
                           <!-- Table Pengalaman Penelitian            -->
                           <!-- ====================================== -->
                           <label class="label" for="label"
                              ><h6 class="title is-6">
                                 Pengalaman Penelitian
                              </h6></label
                           >
                           <table
                              class="table is-fullwidth is-striped is-hoverable is-bordered"
                           >
                              <thead>
                                 <tr>
                                    <th></th>
                                    <th>Tahun</th>
                                    <th>Judul Penelitian</th>
                                    <th>Role</th>
                                    <th>Sumber Dana</th>
                                    <th>Jumlah Rp.</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 <tr>
                                    <td
                                       ><button
                                          class="button is-danger is-small"
                                          ><span class="icon">
                                             <Icon
                                                id="delete"
                                                src={deleteIcon}
                                             />
                                          </span></button
                                       ></td
                                    >
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td> </td>
                                    <td></td>
                                 </tr>
                                 <tr>
                                    <td colspan="6">
                                       <button
                                          class="button is-small is-success is-fullwidth"
                                          >Tambah</button
                                       >
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                           <!-- ====================================== -->
                           <!-- Table Pengalaman Diseminasi            -->
                           <!-- ====================================== -->
                           <label class="label" for="label"
                              ><h6 class="title is-6">
                                 Pengalaman Diseminasi Ilmiah dalam Pertemuan /
                                 Pameran
                              </h6></label
                           >
                           <table
                              class="table is-fullwidth is-striped is-hoverable is-bordered"
                           >
                              <thead>
                                 <tr>
                                    <th></th>
                                    <th>Tahun</th>
                                    <th>Judul Artikel</th>
                                    <th>Nama Pemakalah</th>
                                    <th>Nama Pertemuan Ilmiah / Pameran</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 <tr>
                                    <td
                                       ><button
                                          class="button is-danger is-small"
                                          ><span class="icon">
                                             <Icon
                                                id="delete"
                                                src={deleteIcon}
                                             />
                                          </span></button
                                       ></td
                                    >
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td> </td>
                                 </tr>
                                 <tr>
                                    <td colspan="6">
                                       <button
                                          class="button is-small is-success is-fullwidth"
                                          >Tambah</button
                                       >
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                           <!-- ==================================================================== -->
                           <!-- Table Pengalaman Pengalaman Publikasi Ilmiah dalam Jurnal            -->
                           <!-- ==================================================================== -->
                           <label class="label" for="label"
                              ><h6 class="title is-6">
                                 Pengalaman Publikasi Ilmiah dalam Jurnal (bukan
                                 Proceeding)
                              </h6></label
                           >
                           <table
                              class="table is-fullwidth is-striped is-hoverable is-bordered"
                           >
                              <thead>
                                 <tr>
                                    <th></th>
                                    <th>Tahun</th>
                                    <th>Judul Artikel</th>
                                    <th>Nama Penulis</th>
                                    <th
                                       >Nama Jurnal, Vol., No Issue/No Artikel,
                                       Halaman</th
                                    >
                                    <th
                                       >Impact Factor/Scopus Quarter/Akreditasi</th
                                    >
                                 </tr>
                              </thead>
                              <tbody>
                                 <tr>
                                    <td
                                       ><button
                                          class="button is-danger is-small"
                                          ><span class="icon">
                                             <Icon
                                                id="delete"
                                                src={deleteIcon}
                                             />
                                          </span></button
                                       ></td
                                    >
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                 </tr>
                                 <tr>
                                    <td colspan="6">
                                       <button
                                          class="button is-small is-success is-fullwidth"
                                          >Tambah</button
                                       >
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                           <!-- ========================================== -->
                           <!-- Table Pengalaman Pengalaman Penulisan Buku -->
                           <!-- ========================================== -->
                           <label class="label" for="label"
                              ><h6 class="title is-6">
                                 Pengalaman Penulisan Buku
                              </h6></label
                           >
                           <table
                              class="table is-fullwidth is-striped is-hoverable is-bordered"
                           >
                              <thead>
                                 <tr>
                                    <th></th>
                                    <th>Tahun</th>
                                    <th>Judul Buku</th>
                                    <th>Nama Penulis</th>
                                    <th>Penerbit</th>
                                    <th>ISBN</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 <tr>
                                    <td
                                       ><button
                                          class="button is-danger is-small"
                                          ><span class="icon">
                                             <Icon
                                                id="delete"
                                                src={deleteIcon}
                                             />
                                          </span></button
                                       ></td
                                    >
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td> </td>
                                    <td></td>
                                 </tr>
                                 <tr>
                                    <td colspan="6">
                                       <button
                                          class="button is-small is-success is-fullwidth"
                                          >Tambah</button
                                       >
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                           <!-- ========================================= -->
                           <!-- Table Pengalaman Hak Kekayaan Intelektual -->
                           <!-- ========================================= -->
                           <label class="label" for="label"
                              ><h6 class="title is-6">
                                 Pengalaman Hak Kekayaan Intelektual
                              </h6></label
                           >
                           <table
                              class="table is-fullwidth is-striped is-hoverable is-bordered"
                           >
                              <thead>
                                 <tr>
                                    <th></th>
                                    <th>Tahun</th>
                                    <th>Judul HKI</th>
                                    <th>Nama Penulis</th>
                                    <th>Jenis HKI</th>
                                    <th>No HKI</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 <tr>
                                    <td
                                       ><button
                                          class="button is-danger is-small"
                                          ><span class="icon">
                                             <Icon
                                                id="delete"
                                                src={deleteIcon}
                                             />
                                          </span></button
                                       ></td
                                    >
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td> </td>
                                    <td></td>
                                 </tr>
                                 <tr>
                                    <td colspan="6">
                                       <button
                                          class="button is-small is-success is-fullwidth"
                                          >Tambah</button
                                       >
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                        {/if}
                     </div>
                  </div>
               {/if}
            </div>

            <div class="box profileBox">
               <div class="columns">
                  <div class="column">
                     <h6 class="subtitle is-6">Tristan Byrne</h6>
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

            <div class="box profileBox">
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
   .parent {
      height: 600px;
      /* overflow: hidden; */
   }

   .child {
      height: 100%;
      margin-right: -35px; /* Maximum width of scrollbar */
      padding-right: 25px; /* Maximum width of scrollbar */
      padding-bottom: 25px;
      scrollbar-width: thin;
      overflow-y: scroll;
   }

   .boxBiodataPeneliti {
      /* background-color: rgb(241, 244, 247); */
      background-color: rgb(245, 245, 245);
      border-color: rgb(200, 200, 200);
      border-style: solid;
      border-width: 1px;
      height: 100%;
   }

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
