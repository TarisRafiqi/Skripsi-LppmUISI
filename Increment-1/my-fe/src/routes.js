import Abdimas from "./pages/Abdimas.svelte";
import About from "./pages/About.svelte";
import AuthGoogle from "./pages/AuthGoogle.svelte";
import Home from "./pages/Index.svelte";
import Login from "./pages/Login.svelte";
import Logout from "./pages/Logout.svelte";
import Penelitian from "./pages/Penelitian.svelte";
import Register from "./pages/Register.svelte";
import Testdashboard from "./pages/Testdashboard.svelte";
import Testlogin from "./pages/Testlogin.svelte";
import Tokenexpired from "./pages/Tokenexpired.svelte";
import Verify from "./pages/Verify.svelte";
import adminIndex from "./pages/admin/Index.svelte";
import authIndex from "./pages/auth/Index.svelte";
import dosenIndex from "./pages/dosen/Index.svelte";

export default [
	{ path: "/abdimas", page: Abdimas },
	{ path: "/about", page: About },
	{ path: "/authgoogle", page: AuthGoogle },
	{ path: "/", page: Home },
	{ path: "/login", page: Login },
	{ path: "/logout", page: Logout },
	{ path: "/penelitian", page: Penelitian },
	{ path: "/register", page: Register },
	{ path: "/testdashboard", page: Testdashboard },
	{ path: "/testlogin", page: Testlogin },
	{ path: "/tokenexpired", page: Tokenexpired },
	{ path: "/verify", page: Verify },
	{ path: "/admin/:0", page: adminIndex },
	{ path: "/auth/:0", page: authIndex },
	{ path: "/dosen/:0", page: dosenIndex },
]