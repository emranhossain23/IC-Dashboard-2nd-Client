import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineSearch } from "react-icons/hi";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const HeaderClientSelector = ({
  open,
  clients = [],
  selectedClients = [],
  refetch
}) => {
  const [search, setSearch] = useState("");
  const axiosSecure = useAxiosSecure();

  const safeSelected = Array.isArray(selectedClients)
    ? selectedClients
    : [];

  const filteredClients = clients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  // React Query mutation (FIXED)
  const { mutateAsync: updateClinicSelected } = useMutation({
    mutationFn: async ({ clinicId, selected }) => {
      const { data } = await axiosSecure.patch("/clinic/select", {
        clinicId,
        selected,
      });
      return data;
    },
    onSuccess: () => {
      toast.success("Clinic selection updated");
      refetch()
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to update clinic");
    },
  });

  // Select / Deselect All
  const handleSelectAll = async () => {
    const selectAll = safeSelected.length !== clients.length;

    try {
      await Promise.all(
        clients.map((c) =>
          updateClinicSelected({
            clinicId: c._id,
            selected: selectAll,
          })
        )
      );
    } catch {
    // 
    }
  };

  //  Single select
  const handleSelect = async (client) => {
    const previous = [...safeSelected];
    const exists = previous.some((i) => i._id === client._id);
    const newSelected = !exists;

    try {
      await updateClinicSelected({
        clinicId: client._id,
        selected: newSelected,
      });
    } catch {
    // 
    }
  };
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          exit={{ opacity: 0, scaleY: 0 }}
          transition={{ duration: 0.25 }}
          style={{ originY: 0 }}
          className="md:w-[575px] h-[300px] bg-white border rounded-lg shadow-xl p-3 overflow-y-auto"
        >
          {/* Search */}
          <div className="relative mb-3">
            <input
              type="search"
              placeholder="Search clinics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-8 border rounded-md pl-8 text-sm outline-none focus:ring-1 focus:ring-[#1677FF]"
            />
            <HiOutlineSearch className="absolute left-2 top-1/2 -translate-y-1/2" />
          </div>

          {/* Select All */}
          <div className="flex justify-between items-center border-b pb-2 mb-2">
            <CustomCheckbox
              checked={safeSelected.length === clients.length}
              onChange={handleSelectAll}
              label="Select All"
            />
            <span className="text-xs text-gray-500">
              {safeSelected.length}/{clients.length}
            </span>
          </div>

          {/* Selected Clinics */}
          {safeSelected.length > 0 && (
            <>
              <p className="text-xs text-gray-500 mb-1">
                Selected Clinics
              </p>
              {filteredClients
                .filter((c) =>
                  safeSelected.some((s) => s._id === c._id)
                )
                .map((client) => (
                  <CustomCheckbox
                    key={client._id}
                    checked
                    onChange={() => handleSelect(client)}
                    label={client.name}
                  />
                ))}
              <hr className="my-2" />
            </>
          )}

          {/* Unselected Clinics */}
          {filteredClients
            .filter(
              (c) => !safeSelected.some((s) => s._id === c._id)
            )
            .map((client) => (
              <CustomCheckbox
                key={client._id}
                checked={false}
                onChange={() => handleSelect(client)}
                label={client.name}
              />
            ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HeaderClientSelector;