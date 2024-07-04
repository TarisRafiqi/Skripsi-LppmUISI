import { dashboardFill, profile, article, addProposal } from "../store/icons";

const admin = [
   {
      title: "Dashboard",
      href: "/admin",
      icon: dashboardFill,
   },
   {
      title: "User Management",
      href: "/admin/usersmanagement",
      icon: profile,
   },
   {
      title: "PPM Management",
      href: "/admin/ppmmanagement",
      icon: article,
   },
];

const dosen = [
   {
      title: "Dashboard",
      href: "/dosen",
      icon: dashboardFill,
   },
   {
      title: "Profile",
      href: "/dosen/profile",
      icon: profile,
   },
   {
      title: "PPM Management",
      href: "/dosen/ppmmanagement",
      icon: article,
   },
   {
      title: "Pendaftaran Proposal",
      href: "/dosen/pendaftaran",
      icon: addProposal,
   },
];
export default {
   admin,
   dosen,
};
