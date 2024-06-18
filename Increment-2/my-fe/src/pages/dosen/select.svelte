<script>
   import { cancelIcon, edit, downloadIcon } from "../../store/icons";
   import { route, apiURL, ppmFile } from "../../store";
   import Article from "../../libs/Article.svelte";
   import Fieldview from "../../libs/Fieldview.svelte";
   import { onMount } from "svelte";
   import Select from "../../libs/Select.svelte";
   import Field from "../../libs/Field.svelte";
   import Icon from "../../libs/Icon.svelte";
   import {
      accountAdmin,
      uploadIcon,
      googleIcon,
      copyright,
      infoOutline,
      penelitian,
      pengmas,
      jurnal,
   } from "../../store/icons";

   const accessToken = localStorage.getItem("token");
   const id = Number(localStorage.getItem("id"));
   const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
   };

   let errorMark = true;
</script>

<Article>
   <aside class="menu">
      <p class="menu-label">General</p>
      <ul class="menu-list">
         <li>
            <a href=".">
               <div class="icon">
                  <Icon id="dashboard" src={accountAdmin} />
               </div>
               Dashboard
            </a>
         </li>
         <li>
            <a href=".">
               <div class="icon">
                  <Icon id="customers" src={uploadIcon} />
               </div>
               Customers
            </a>
         </li>
      </ul>

      <p class="menu-label">Transactions</p>
      <ul class="menu-list">
         <li><a href=".">Payments</a></li>
         <li><a href=".">Transfers</a></li>
         <li><a href=".">Balance</a></li>
      </ul>
   </aside>
</Article>

<style>
   /* .errorMark {
      color: hsl(348, 100%, 61%);
      font-size: small;
   } */
   /*
   .toggle-button {
      cursor: pointer;
      color: #fc6c78;
      font-size: small;
   }
   */

   /* ul {
      margin-left: 1.2em;
      margin-top: -1em;
   }

   ul li {
      margin-bottom: 4px;
   } */

   .menu-list a {
      display: flex;
      align-items: center;
   }

   .menu-list a .icon {
      margin-right: 0.5em;
   }
</style>
