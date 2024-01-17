import Home from "./pages/Index.svelte";
import Abdimas from "./pages/Abdimas.svelte";
import About from "./pages/About.svelte";
import AuthGoogle from "./pages/AuthGoogle.svelte";
import Login from "./pages/Login.svelte";
import Logout from "./pages/Logout.svelte";
import Penelitian from "./pages/Penelitian.svelte";
import Register from "./pages/Register.svelte";
import Verify from "./pages/Verify.svelte";
import dosenIndex from "./pages/dosen/Index.svelte";
import adminIndex from "./pages/admin/Index.svelte";
import authIndex from "./pages/auth/Index.svelte";

export default [
	{ path: "/", page: Home },
	{ path: "/abdimas", page: Abdimas },
	{ path: "/about", page: About },
	{ path: "/authgoogle", page: AuthGoogle },
	{ path: "/login", page: Login },
	{ path: "/logout", page: Logout },
	{ path: "/penelitian", page: Penelitian },
	{ path: "/register", page: Register },
	{ path: "/verify", page: Verify },
	{ path: "/dosen/:0", page: dosenIndex },
	{ path: "/admin/:0", page: adminIndex },
	{ path: "/auth/:0", page: authIndex },
]