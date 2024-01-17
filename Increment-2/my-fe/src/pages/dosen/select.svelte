<script>
   import { onMount } from "svelte";
   import Article from "../../libs/Article.svelte";
   import Modal from "../../libs/Modal.svelte";
   import Field from "../../libs/Field.svelte";
   import Status from "../../modules/Status.svelte";
   import { route, apiURL } from "../../store";
   import Select from "../../libs/Select.svelte";

   let file;
   let showModal = false;
   let showModal2 = false;

   async function handleDownload(e) {
      const accessToken = localStorage.getItem("token");
      const headers = {
         Authorization: `${accessToken}`,
         "Content-Type": "application/json",
      };
      let filename = "rab.xlsx";
      try {
         const response = await fetch(`/api/upload/${randomFileName}`, {
            method: "GET",
            headers: headers,
         });
         const blob = await response.blob();
         const link = document.createElement("a");
         link.href = window.URL.createObjectURL(blob);
         link.download = filename;
         link.click();
      } catch (error) {
         console.error("Error downloading file:", error);
      }
   }

   async function cekmodal() {
      showModal = true;
   }
   async function cekmodal2() {
      showModal2 = true;
   }

   async function handleFileUpload() {
      const accessToken = localStorage.getItem("token");

      const reader = new FileReader();
      reader.onloadend = async () => {
         const base64Data = reader.result.split(",")[1];
         const payloadfile = {
            file: {
               name: file.name,
               type: file.type,
               data: base64Data,
            },
            randomFileName,
         };

         try {
            const response = await fetch($apiURL + "/upload", {
               method: "POST",
               headers: {
                  Authorization: `${accessToken}`,
                  "Content-Type": "application/json",
               },
               body: JSON.stringify(payloadfile),
            });
            const result = await response.json();
            console.log(result);
         } catch (error) {
            console.error("Error uploading file:", error);
         }
      };
      reader.readAsDataURL(file);
   }
</script>

<Article>
   <br />

   <input
      class="input"
      accept=".xlsx"
      type="file"
      on:change={(e) => (file = e.target.files[0])}
   />

   <br />
   <br />

   <button on:click={handleFileUpload}>Upload File</button>

   <br />
   <br />

   <button on:click={handleDownload}>Download</button>

   <br />
   <br />

   <button on:click={cekmodal}> Cek Modal </button>
   <br />
   <button on:click={cekmodal2}> Cek Modal2 </button>

   <br />
   <br />

   <Modal bind:show={showModal}>
      <h2 slot="header">Find Approval</h2>
      <p>
         Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores
         fuga odit accusamus, neque nulla vitae! Fugiat, accusamus amet? Cum est
         delectus soluta iusto odio architecto impedit maxime non asperiores
         eligendi?
      </p>
   </Modal>

   <br />

   <Modal bind:show={showModal2}>
      <h2 slot="header">Test Modal 2</h2>
      <p>
         Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores
         fuga odit accusamus, neque nulla vitae! Fugiat, accusamus amet? Cum est
         delectus soluta iusto odio architecto impedit maxime non asperiores
         eligendi?
      </p>
   </Modal>
</Article>

<style>
</style>
