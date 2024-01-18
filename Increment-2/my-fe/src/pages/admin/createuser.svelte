<script>
   import Article from "../../libs/Article.svelte";
   import { route, apiURL } from "../../store";

   function kembali() {
      $route("/admin/users");
   }
</script>

<Article>
   <h1 class="title is-1">Create User</h1>

   <hr />

   <div class="field">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="label">Username</label>
      <div class="control">
         <input class="input" type="text" placeholder="Username..." />
      </div>
   </div>

   <div class="field">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="label">Password</label>
      <div class="control">
         <input class="input" type="text" placeholder="Password..." />
      </div>
   </div>

   <div class="field">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="label">Role</label>
      <div class="control">
         <div class="select">
            <select>
               <option>Ka.Departemen</option>
               <option>Ka.LPPM</option>
               <option>Ka.PusatKajian</option>
               <option>Reviewer</option>
               <option>Dosen</option>
            </select>
         </div>
      </div>
   </div>

   <br />

   <div class="field is-grouped">
      <div class="control">
         <button class="button is-info is-light" on:click={kembali}
            >Kembali</button
         >
      </div>
      <div class="control">
         <button class="button is-info">Create</button>
      </div>
   </div>
</Article>
