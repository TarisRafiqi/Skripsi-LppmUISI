<script>
   import { route, apiURL } from "../store";
   import Article from "../libs/Article.svelte";
   import { onMount } from "svelte";

   let username = "fiqi";
   let password = "1234";

   onMount(async () => {
      let token = localStorage.getItem("Ttoken");
      // console.log(token);
      // if (token) {
      //    const payload = {
      //       method: "GET",
      //       headers: {
      //          Authorization: `Bearer ${token}`,
      //          "Content-Type": "application/json",
      //       },
      //    };
      //    const response = await fetch($apiURL + "/authorize", payload);
      //    const result = await response.json();
      //    if (result.auth) {
      //       console.log("Authorize");
      //       $route("/testdashboard");
      //    } else {
      //       console.log("Not authorize");
      //    }
      // }
   });

   async function handleSubmit() {
      const payload = {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            username,
            password,
         }),
      };

      const response = await fetch($apiURL + "/testSignIn", payload);
      const result = await response.json();

      if (result.token) {
         localStorage.setItem("Ttoken", result.token);
         $route("/testdashboard");
         // console.log(result);
      } else {
         console.log(result);
      }

      // if (sukses === "true") $route("/admin");
   }
</script>

<Article>
   <h1 class="title is-1">Login Page</h1>

   <div>
      <div>Username</div>
      <input class="input" type="text" bind:value={username} />
   </div>
   <div>
      <div>Password</div>
      <input class="input" type="password" bind:value={password} />
   </div>

   <br />

   <button class="button is-info is-fullwidth" on:click={handleSubmit}
      >Submit</button
   >
   <p>
      <a href="/testdashboard">To Dashboard</a>
   </p>
</Article>
