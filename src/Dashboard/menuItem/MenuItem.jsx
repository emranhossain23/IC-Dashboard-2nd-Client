import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

// eslint-disable-next-line no-unused-vars
const MenuItem = ({ address, icon: Icon, label,toggle }) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `text-[#000000E0] flex items-center gap-2 px-6 py-2.5 mx-1 mb-1 rounded-lg hover:bg-gray-200 hover:border-white transition duration-300 ${
          isActive
            ? "bg-[#E6F4FF] text-[#1677FF] hover:bg-[#E6F4FF]"
            : "bg-transparent border-transparent"
        }`
      }
    >
      <i>
        <Icon lassName="w-4 h-4 border" size={16} />
      </i>
      <h4 className={`text-sm text-nowrap ${toggle? "opacity-0" :"opacity-100"}`}>{label}</h4>
    </NavLink>
  );
};

MenuItem.propTypes = {
  label: PropTypes.string,
  address: PropTypes.string,
  icon: PropTypes.elementType,
};

export default MenuItem;
