import "./style/app.scss";
import App from "./App.svelte";

// if (process.ENV) {
//    const { sw } = process.ENV;
//    if (sw) {
//       if ("serviceWorker" in navigator) {
//          navigator.serviceWorker
//             .register("/sw.js")
//             .then((serviceWorker) => {
//                console.log("Service Worker registered: ", serviceWorker);
//             })
//             .catch((error) => {
//                console.error("Error registering the Service Worker: ", error);
//             });
//       }
//    }
// }

const app = new App({
   target: document.body,
});

export default app;
