<script>
   import { onMount, afterUpdate } from "svelte";

   export let id;
   export let content = "";
   export let name;
   export let fewFeatures = false;

   let me;
   let selector = "#" + id;

   onMount(() => {
      try {
         // tinymce.activeEditor.destroy();
         tinymce.remove(selector);
      } catch (error) {}

      const plugins = fewFeatures
         ? "lists table visualblocks wordcount "
         : "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount ";

      const toolbar = fewFeatures
         ? "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | table | align lineheight | numlist bullist indent outdent | removeformat"
         : "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat";

      tinymce.init({
         selector: selector,
         height: 500,
         plugins: plugins,
         toolbar: toolbar,
         tinycomments_mode: "embedded",
         tinycomments_author: "Author name",
         mergetags_list: [
            { value: "First.Name", title: "First Name" },
            { value: "Email", title: "Email" },
         ],
      });
   });
</script>

<div>
   <textarea bind:this={me} {name} {id}>
      {content}
   </textarea>
</div>
