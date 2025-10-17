import React from "react";

const CustomCheckbox = ({ checked, onChange, label, selectedClients = 0 }) => {
  return (
    <label className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-100 p-2 rounded-md">
      <div className="relative w-4 h-4">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="opacity-0 absolute w-full h-full cursor-pointer peer"
        />
        {/* Checkbox Box */}
        <div
          className={`w-full h-full rounded-[4px] border transition-all duration-200
          ${
            checked ? "bg-blue-600 border-blue-600" : "bg-white border-gray-400"
          }
          peer-hover:border-blue-500`}
        ></div>

        {/* Check Icon */}
        {checked ? (
          <svg
            className="absolute top-0 left-0 w-4 h-4 text-white pointer-events-none"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        ) : selectedClients > 0 ? (
          <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-sm pointer-events-none"></div>
        ) : null}
      </div>
      <span className="text-sm text-primary">{label}</span>
    </label>
  );
};

export default CustomCheckbox;
