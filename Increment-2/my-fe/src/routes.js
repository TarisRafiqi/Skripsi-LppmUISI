import Abdimas from "./pages/Abdimas.svelte";
import About from "./pages/About.svelte";
import Home from "./pages/Index.svelte";
import Login from "./pages/Login.svelte";
import Logout from "./pages/Logout.svelte";
import Penelitian from "./pages/Penelitian.svelte";
import Tokenexpired from "./pages/Tokenexpired.svelte";
import adminIndex from "./pages/admin/Index.svelte";
import authIndex from "./pages/auth/Index.svelte";
import dosenIndex from "./pages/dosen/Index.svelte";

export default [
   { path: "/abdimas", page: Abdimas },
   { path: "/about", page: About },
   { path: "/", page: Home },
   { path: "/login", page: Login },
   { path: "/logout", page: Logout },
   { path: "/penelitian", page: Penelitian },
   { path: "/tokenexpired", page: Tokenexpired },
   { path: "/admin/:0", page: adminIndex },
   { path: "/auth/:0", page: authIndex },
   { path: "/dosen/:0", page: dosenIndex },
];
