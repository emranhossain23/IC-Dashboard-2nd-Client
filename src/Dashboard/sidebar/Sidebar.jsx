import MenuItem from "../menuItem/MenuItem";
import { dashboardRoutes } from "../../routes/dashboardRoutes";

const Sidebar = ({ toggle }) => {
  return (
    <div
      className={`fixed ${
        toggle ? "w-20" : "w-64"
      } min-h-screen flex flex-col justify-between bg-white shadow-lg transition-all duration-300 ease-in-out
overflow-hidden`}
    >
      <nav>
        {dashboardRoutes.map((rout) => (
          <MenuItem
            address={rout.path}
            label={rout.label}
            icon={rout.icon}
            toggle={toggle}
          ></MenuItem>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
