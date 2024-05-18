<script>
   import { route, isLogin, isUsername, apiURL } from "../store";
   // import Icon from "../libs/Icon.svelte";
   // import { googleIcon } from "../store/icons";

   let username = "fiqi";
   let password = "1234";

   document.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
         handleSubmit();
      }
   });

   async function handleSubmit(ev) {
      const paragraph = document.getElementById("errorLoginHandler");

      const payload = {
         method: "post",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            username,
            password,
         }),
      };

      const response = await fetch($apiURL + "/auth", payload);
      const result = await response.json();

      if (result.sukses) {
         $isLogin = true;
         const { id, username, role, token } = result;
         $isUsername = username;
         localStorage.setItem("id", id);
         localStorage.setItem("username", username);
         localStorage.setItem("role", role);
         localStorage.setItem("token", token);
         // return;
         if (role === "admin") $route("/admin");
         else $route("/dosen");
      } else {
         paragraph.style.display = "block";
         // console.log("Username atau password salah");
      }
   }

   async function signGoogle() {
      window.open($apiURL + "/auth/google", "_self");

      return;
   }
</script>

<article class="container">
   <div class="box">
      <h3 class="title is-3">Login</h3>

      <div>
         <div>Username</div>
         <input class="input" type="text" bind:value={username} />
      </div>

      <div>
         <div>Password</div>
         <input class="input" type="password" bind:value={password} />
      </div>

      <br />

      <div>
         <button class="button is-info" on:click={handleSubmit}>Submit</button>
      </div>

      <div>
         <button class="button" on:click={signGoogle}>
            <span class="icon">
               <span class="icon">
                  <img src="/img/iconGoogle.svg" alt="" width="20" />
               </span>
            </span>
            <span><h6 class="subtitle is-6">Sign in with Google</h6> </span>
         </button>
      </div>

      <p id="errorLoginHandler" class="has-text-danger">
         Maaf, username atau password anda salah. Silahkan cek kembali.
      </p>
   </div>
</article>

<style>
   #errorLoginHandler {
      display: none;
      /* text-align: justify; */
   }

   article.container {
      /* background: lightblue; */
      /* z-index: 101; */
      padding-top: 10rem;
      text-align: center;
   }

   div.box {
      display: inline-flex;
      flex-direction: column;
      gap: 0.5rem;
      width: 300px;
   }

   div.box div {
      text-align: left;
   }

   button {
      width: 100%;
   }
</style>
