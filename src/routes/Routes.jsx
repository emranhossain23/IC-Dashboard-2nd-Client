import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import Home from "../Dashboard/page/Home/Home";
import MasterReport from "../Dashboard/page/MasterReport/MasterReport";
import AmberAlerts from "../Dashboard/page/AmberAlerts/AmberAlerts";
import Users from "../Dashboard/page/Admin/Users/Users";
import Roles from "../Dashboard/page/Admin/Roles/Roles";
import RowSettings from "../Dashboard/page/Admin/RowSettings/RowSettings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      { index: true, element: <Home></Home> },
      {
        path: "master-report",
        element: <MasterReport></MasterReport>,
      },
      {
        path: "amber-alerts",
        element: <AmberAlerts></AmberAlerts>,
      },
      {
        path: "users",
        element: <Users></Users>,
      },
      {
        path: "roles",
        element: <Roles></Roles>,
      },
      {
        path: "row-level-settings",
        element: <RowSettings></RowSettings>,
      },
    ],
  },
]);
