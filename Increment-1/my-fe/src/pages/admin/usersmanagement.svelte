<script>
   import { route, apiURL } from "../../store";
   import Article from "../../libs/Article.svelte";
   import Icon from "../../libs/Icon.svelte";
   import { accountAdd, searchIcon } from "../../store/icons";

   export let params;

   let profile;
   let items;
   const accessToken = localStorage.getItem("token");
   const roleFromToken = localStorage.getItem("role");

   const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
   };

   // Pakai akses token, Hanya tole Admin yang bisa mengakses halaman ini
   async function populateTable() {
      const response = await fetch($apiURL + "/user", {
         method: "GET",
         headers: headers,
      });
      const result = await response.json();

      if (result.statusCode != 200) {
         // localStorage.clear();
         location.pathname = "/tokenexpired";
      } else {
         if (response.status === 200) {
            items = result.dbData;
         }
      }
   }

   async function handleActive(ev) {
      const value = ev.target.getAttribute("role");
      const id = ev.target.getAttribute("uid");

      const payload = {
         id: items[id].id,
         role: Number(value),
         active: !items[id].active,
      };

      const response = await fetch($apiURL + "/user", {
         method: "PATCH",
         headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
         },
         body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.statusCode != 200) {
         // localStorage.clear();
         location.pathname = "/tokenexpired";
      } else {
         if (response.ok) {
            populateTable();
         } else {
            console.log(response);
         }
      }
   }

   async function handleGroup(ev) {
      const value = ev.target.value;
      const id = ev.target.getAttribute("uid");

      const payload = {
         id: items[id].id,
         role: Number(value),
         active: items[id].active,
      };

      const response = await fetch($apiURL + "/user", {
         method: "PATCH",
         headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
         },
         body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.statusCode != 200) {
         // localStorage.clear();
         location.pathname = "/tokenexpired";
      } else {
         if (response.ok) {
            populateTable();
         } else {
            console.log(response);
         }
      }
   }

   // Pakai akses Token, hanya uid pemilik dan role Admin yang bisa mengakses halaman ini
   async function getPage() {
      if (params["1"] === "profile") {
         let id = params["2"];

         const response = await fetch($apiURL + "/user/" + id, {
            method: "GET",
            headers: headers,
         });

         const result = await response.json();

         if (result.statusCode != 200) {
            // localStorage.clear();
            location.pathname = "/tokenexpired";
         } else {
            if (response.ok) {
               if (!result.length) return;
               profile = [];
               for (const [field, value] of Object.entries(result[0])) {
                  profile.push({
                     field,
                     value,
                  });
               }
            } else {
               data = null;
            }
         }
      }
   }

   function addUser() {
      $route("/admin/createuser");
   }

   $: params, getPage();
   $: profile, profile ? (items = null) : populateTable();
</script>

<Article>
   {#if roleFromToken === "admin"}
      {#if items}
         <h1 class="title is-1">User Management</h1>
         <hr />

         <!-- <div class="notification is-info is-light">
            <div class="columns">
               <div class="column is-4">
                  <p>
                     Untuk <strong>Dosen / Reviewer</strong> dari luar UISI<br
                     />buat akun disini
                  </p>
               </div>

               <div class="column"> 
                  <button class="button is-info" on:click={addUser}>
                     <span class="icon">
                        <Icon id="orang" src={accountAdd} />
                     </span>
                     <span><a>Create User</a></span>
                  </button>
               </div>
            </div>
         </div> -->

         <div class="box parent">
            <div class="columns">
               <div class="column">
                  <button class="button is-info" on:click={addUser}>
                     <span class="icon">
                        <Icon id="accountAdd" src={accountAdd} />
                     </span>
                     <!-- svelte-ignore a11y-missing-attribute -->
                     <span><a>Create user</a></span>
                  </button>
               </div>

               <div class="column">
                  <div class="field has-addons">
                     <div class="control is-expanded">
                        <input
                           class="input"
                           type="text"
                           placeholder="Search user"
                        />
                     </div>
                     <div class="control">
                        <button class="button is-outlined">
                           <span class="icon">
                              <Icon id="searchIcon" src={searchIcon} />
                           </span></button
                        >
                     </div>
                  </div>
               </div>
            </div>

            <div class="child">
               <table class="table is-fullwidth is-striped is-hoverable">
                  <thead>
                     <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th class="is-narrow">Role</th>
                        <th class="is-narrow">Active</th>
                     </tr>
                  </thead>

                  <tbody>
                     {#each items as item, idx}
                        <tr>
                           <td>
                              <a href={"/admin/profile/" + item.id}>
                                 {item.username}
                              </a>
                           </td>
                           <td>{item.email}</td>
                           <td fixed class="group">
                              <div class="select">
                                 <select uid={idx} on:change={handleGroup}>
                                    <option value="9" selected={item.role === 9}
                                       >Admin</option
                                    >
                                    <option value="0" selected={item.role === 0}
                                       >Dosen</option
                                    >
                                    <option
                                       value="10"
                                       selected={item.role === 10}
                                       >Reviewer</option
                                    >
                                    <option
                                       value="11"
                                       selected={item.role === 11}
                                       >Ka. Departemen</option
                                    >
                                    <option
                                       value="12"
                                       selected={item.role === 12}
                                       >Ka. LPPM</option
                                    >
                                    <option
                                       value="13"
                                       selected={item.role === 13}
                                       >Ka. Pusat Kajian</option
                                    >
                                 </select>
                              </div>
                           </td>
                           <td
                              fixed
                              on:click={handleActive}
                              uid={idx}
                              role={item.role}
                              class="active"
                              class:red={!item.active}
                              >{item.active ? "✔" : "✘"}
                           </td>
                        </tr>
                     {/each}
                  </tbody>
               </table>
            </div>
         </div>
      {/if}
   {:else}
      <h4 class="title is-4">Anda tidak memiliki hak akses halaman ini!</h4>
   {/if}
</Article>

<style>
   [fixed] {
      text-align: center;
   }

   .group {
      padding: 0 0.5rem;
   }

   .active {
      color: green;
      cursor: pointer;
   }

   .active.red {
      color: orangered;
   }

   select {
      border: none;
      box-shadow: none;
      background: inherit;
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
