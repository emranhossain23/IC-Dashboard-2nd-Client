import { useState, useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { FaAngleDown } from "react-icons/fa";
import { HiOutlineSearch } from "react-icons/hi";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";

const ClientSelector = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [clients, setClients] = useState([]);
  const [selectedClients, setSelectedClients] = useState([]);

  const dropdownRef = useRef(null);

  // Demo data
  useEffect(() => {
    const demoClients = Array.from({ length: 896 }, (_, i) => ({
      id: i + 1,
      name: `Client ${i + 1}`,
    }));
    setClients(demoClients);
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter clients
  const filteredClients = clients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  // Select all toggle
  const handleSelectAll = () => {
    if (selectedClients.length === clients.length) {
      setSelectedClients([]);
    } else {
      setSelectedClients(clients.map((c) => c.id));
    }
  };

  const handleSelect = (id) => {
    setSelectedClients((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Navbar Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 bg-[#2E5DDE] text-white text-sm px-6 py-1.5 rounded-md hover:bg-white hover:text-[#2E5DDE] transition duration-300"
      >
        {selectedClients.length} clients selected{" "}
        <FaAngleDown
          className={`${
            open ? "rotate-180" : "rotate-0"
          } transition duration-200`}
        />
      </button>

      {/* Dropdown Box */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.25 }}
            style={{ originY: 0 }}
            className="absolute top-10 right-0 w-[575px] h-[300px] overflow-y-auto bg-white shadow-xl border rounded-lg p-2 z-50"
          >
            {/* Search */}
            <div className="relative mb-2 m-1">
              <input
                type="search"
                placeholder="Search clients..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-8 border rounded-md pt-2 pb-3 pl-8 text-sm outline-none placeholder:text-[13px] focus:ring-1 focus:border-transparent focus:ring-[#1677FF] hover:border-[#1677FF] transition duration-150"
              />
              <HiOutlineSearch
                size={15}
                className="absolute top-1/2 -translate-y-1/2 left-2.5"
              />
            </div>

            {/* Select All */}
            <div className="flex items-center justify-between gap-2 border-b pb-2 mb-2">
              <div className="w-full">
                <CustomCheckbox
                  checked={selectedClients.length === clients.length}
                  onChange={handleSelectAll}
                  label={"Select All"}
                  selectedClients={selectedClients.length}
                ></CustomCheckbox>
              </div>

              <span className="text-xs text-gray-500">
                {selectedClients.length}/{clients.length}
              </span>
            </div>

            {/* Scrollable Clients List */}
            <div className="space-y-1">
              {/* Selected clients */}
              {selectedClients.length > 0 && (
                <>
                  <p className="text-xs text-gray-500 mb-1">Selected Clients</p>
                  {filteredClients
                    .filter((c) => selectedClients.includes(c.id))
                    .map((client) => (
                      <CustomCheckbox
                        checked={selectedClients.includes(client.id)}
                        onChange={() => handleSelect(client.id)}
                        label={client.name}
                      ></CustomCheckbox>
                    ))}
                  <hr className="my-2" />
                </>
              )}

              {/* Unselected clients */}
              {filteredClients
                .filter((c) => !selectedClients.includes(c.id))
                .map((client) => (
                  <CustomCheckbox
                    checked={selectedClients.includes(client.id)}
                    onChange={() => handleSelect(client.id)}
                    label={client.name}
                  ></CustomCheckbox>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClientSelector