<script>
   import { onMount } from "svelte";
   import Article from "../../libs/Article.svelte";
   import { route, apiURL } from "../../store";

   let file;

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
            const response = await fetch($apiURL + "/uploadRab", {
               method: "POST",
               headers: {
                  Authorization: `${accessToken}`,
                  "Content-Type": "application/json",
               },
               body: JSON.stringify(payloadfile),
            });
            const result = await response.json();
         } catch (error) {
            console.error("Error uploading file:", error);
         }
      };
      reader.readAsDataURL(file);
   }

   // --------------------------------------------------------------
   let isLoading = false;

   function handleClick() {
      isLoading = true;
      // Simulate loading delay, you can replace this with your actual async operation
      setTimeout(() => {
         isLoading = false;
      }, 2000); // 2 seconds
   }

   // Optional: If you want to reset loading state when component is mounted
   onMount(() => {
      isLoading = false;
   });
</script>

<Article>
   <button
      class="button is-info {isLoading ? 'is-loading' : ''}"
      on:click={handleClick}
   >
      <span>Click Me</span>
   </button>

   <br />

   <!-- <input
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

   <button on:click={handleDownload}>Download</button> -->
</Article>

<style>
</style>
