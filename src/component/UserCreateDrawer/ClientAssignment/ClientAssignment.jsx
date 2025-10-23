import ClientSelector from "@/component/ClientSelector/ClientSelector";
import Notice from "@/component/Notice/Notice";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const ClientAssignment = ({ selectedClients, setSelectedClients }) => {
  const [open, setOpen] = useState(false);
  const [clients, setClients] = useState([]);
  const dropdownRef = useRef(null);

  // Demo data
  useEffect(() => {
    const demoClients = Array.from({ length: 896 }, (_, i) => ({
      id: i + 1,
      name: `Client ${i + 1}`,
    }));
    setClients(demoClients);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <h4 className="text-gray-900 mb-4 text-lg font-medium">
        Client Assignment
      </h4>
      <h6 className="text-gray-700 mb-2 text-sm font-medium">Assign Clients</h6>

      <div className="mb-4 relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="text-[#595959] font-medium text-sm border px-4 py-1.5 rounded-md flex items-center gap-2"
        >
          Select clients for this user
          <IoIosArrowDown />
        </button>

        <div className="absolute top-10 left-0">
          <ClientSelector
            open={open}
            clients={clients}
            selectedClients={selectedClients}
            setSelectedClients={setSelectedClients}
          ></ClientSelector>
        </div>
      </div>

      <Notice>
        Multiple clients can be assigned to a user. This determines which client
        data the user can access.
      </Notice>
    </div>
  );
};

export default ClientAssignment;
