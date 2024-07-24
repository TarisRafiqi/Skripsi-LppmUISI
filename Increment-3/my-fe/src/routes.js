import Detailpengumuman from "./pages/Detailpengumuman.svelte";
import Home from "./pages/Index.svelte";
import Login from "./pages/Login.svelte";
import Logout from "./pages/Logout.svelte";
import Penelitianeksternal from "./pages/Penelitianeksternal.svelte";
import Penelitianinternal from "./pages/Penelitianinternal.svelte";
import Penelitianmandiri from "./pages/Penelitianmandiri.svelte";
import Pengmaseksternal from "./pages/Pengmaseksternal.svelte";
import Pengmasinternal from "./pages/Pengmasinternal.svelte";
import Pengmasmandiri from "./pages/Pengmasmandiri.svelte";
import Profil from "./pages/Profil.svelte";
import Strukturorganisasi from "./pages/Strukturorganisasi.svelte";
import Tokenexpired from "./pages/Tokenexpired.svelte";
import Visidanmisi from "./pages/Visidanmisi.svelte";
import adminIndex from "./pages/admin/Index.svelte";
import authIndex from "./pages/auth/Index.svelte";
import dosenIndex from "./pages/dosen/Index.svelte";

export default [
	{ path: "/detailpengumuman", page: Detailpengumuman },
	{ path: "/", page: Home },
	{ path: "/login", page: Login },
	{ path: "/logout", page: Logout },
	{ path: "/penelitianeksternal", page: Penelitianeksternal },
	{ path: "/penelitianinternal", page: Penelitianinternal },
	{ path: "/penelitianmandiri", page: Penelitianmandiri },
	{ path: "/pengmaseksternal", page: Pengmaseksternal },
	{ path: "/pengmasinternal", page: Pengmasinternal },
	{ path: "/pengmasmandiri", page: Pengmasmandiri },
	{ path: "/profil", page: Profil },
	{ path: "/strukturorganisasi", page: Strukturorganisasi },
	{ path: "/tokenexpired", page: Tokenexpired },
	{ path: "/visidanmisi", page: Visidanmisi },
	{ path: "/admin/:0", page: adminIndex },
	{ path: "/auth/:0", page: authIndex },
	{ path: "/dosen/:0", page: dosenIndex },
]