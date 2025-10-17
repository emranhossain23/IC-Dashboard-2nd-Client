import { Outlet } from "react-router-dom";
import Sidebar from "../Dashboard/Sidebar/Sidebar";
import Header from "../Dashboard/Header/Header";
import { useState } from "react";

const DashboardLayout = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="min-h-screen flex relative">
      {/* header */}
      <Header toggle={toggle} setToggle={setToggle}></Header>

      {/* sidebar */}
      <div className="mt-[70px]">
        <Sidebar toggle={toggle}></Sidebar>
      </div>

      {/* outlet */}
      <div
        className={`flex-1 ${toggle ? "w-20" : "w-64"} mt-[65px] bg-[#EEF1F3]`}
      >
        <Outlet></Outlet>
        <div>rafi khan</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
