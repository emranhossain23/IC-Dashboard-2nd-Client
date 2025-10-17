import { AiOutlineDashboard } from "react-icons/ai";
import { CiBellOn, CiSettings } from "react-icons/ci";
import { FaRegFileAlt } from "react-icons/fa";
import { GoBell } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";

export const dashboardRoutes = [
  {
    label: "Dashboard",
    icon: AiOutlineDashboard,
    path: "/",
  },
  {
    label: "Master Report",
    icon: FaRegFileAlt,
    path: "master-report",
  },
  {
    label: "Amber Alerts",
    icon: GoBell,
    path: "amber-alerts",
  },
  {
    label: "Admin",
    icon: IoSettingsOutline,
    path: "admin",
  },
];
