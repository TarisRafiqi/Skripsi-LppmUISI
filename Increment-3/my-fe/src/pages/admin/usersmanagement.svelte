<script>
   import { route, apiURL } from "../../store";
   import Article from "../../libs/Article.svelte";
   import Icon from "../../libs/Icon.svelte";
   import { accountAdd, searchIcon } from "../../store/icons";

   export let params;

   let profile;
   let items;
   let filterUsername = "";
   let filterRole = "";
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

      if (response.status === 401) {
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

      if (response.status === 401) {
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

      if (response.status === 401) {
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

         if (response.status === 401) {
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
         <h2 class="title is-2">User Management</h2>
         <hr />

         <div class="columns">
            <div class="column is-narrow">
               <button class="button is-info is-fullwidth" on:click={addUser}>
                  <span class="icon">
                     <Icon id="accountAdd" src={accountAdd} />
                  </span>
                  <!-- svelte-ignore a11y-missing-attribute -->
                  <span><a>Create user</a></span>
               </button>
            </div>

            <div class="column is-narrow">
               <div class="field">
                  <div class="select is-fullwidth">
                     <select bind:value={filterRole}>
                        <option value="" selected disabled hidden>Role</option>
                        <option value="9">Admin</option>
                        <option value="0">Dosen</option>
                        <option value="10">Reviewer</option>
                        <option value="11">K. Departemen</option>
                        <option value="12">K. LPPM</option>
                        <option value="13">K. Pusat Kajian</option>
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
                        placeholder="Search username"
                        bind:value={filterUsername}
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
                        <th>Username</th>
                        <th style="text-align: center">Email</th>
                        <th style="text-align: center" class="is-narrow"
                           >Role</th
                        >
                        <th class="is-narrow">Active</th>
                     </tr>
                  </thead>

                  <tbody>
                     <!-- {#each items as item, idx} -->
                     {#each items.filter((item) => item.username
                              .toLowerCase()
                              .includes(filterUsername.toLowerCase()) && (filterRole === "" || item.role === Number(filterRole))) as item, idx}
                        <tr>
                           <td>
                              <a href={"/admin/profile/" + item.id}>
                                 {item.username}
                              </a>
                           </td>
                           <td fixed>{item.email}</td>
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
                                       >K. Departemen</option
                                    >
                                    <option
                                       value="12"
                                       selected={item.role === 12}
                                       >K. LPPM</option
                                    >
                                    <option
                                       value="13"
                                       selected={item.role === 13}
                                       >K. Pusat Kajian</option
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
      /* height: 600px; */
      height: 60vh;
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
