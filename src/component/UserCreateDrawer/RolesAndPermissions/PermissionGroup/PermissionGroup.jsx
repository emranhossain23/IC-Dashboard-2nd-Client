import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { FaChevronDown } from "react-icons/fa";

const PermissionGroup = ({
  title,
  permissions,
  onPermissionChange,
  subPermissions,
  openDefault = false,
}) => {
  const [isOpen, setIsOpen] = useState(openDefault);

  // Handle parent checkbox
  const handleMainChange = (checked) => {
    const updatedSubs = {};
    subPermissions.forEach((key) => {
      updatedSubs[key] = checked;
    });
    onPermissionChange({
      [title]: checked,
      [`${title}Subs`]: updatedSubs,
    });
  };

  // Handle sub-checkbox
  const handleSubChange = (key, checked) => {
    const updatedSubs = {
      ...permissions[`${title}Subs`],
      [key]: checked,
    };

    const allTrue = Object.values(updatedSubs).every(Boolean);

    onPermissionChange({
      [title]: allTrue,
      [`${title}Subs`]: updatedSubs,
    });
  };

  return (
    <div className="border rounded-md shadow">
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-between w-full cursor-pointer border p-4"
      >
        <div
          className="flex items-center gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          <Checkbox
            checked={permissions[title]}
            onCheckedChange={handleMainChange}
          />
          <h4 className="text-[#111827] text-sm font-semibold">{title}</h4>
        </div>
        <FaChevronDown
          className={`transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      <ul
        className={`${
          isOpen ? "visible h-auto py-3" : "invisible h-0"
        } px-4 space-y-4 overflow-hidden transition-all duration-300`}
      >
        {subPermissions.map((key) => (
          <li key={key}>
            <label className="text-[#111827] text-sm font-semibold flex items-center gap-2 w-fit">
              <Checkbox
                checked={permissions[`${title}Subs`][key]}
                onCheckedChange={(val) => handleSubChange(key, val)}
              />
              {key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PermissionGroup;
