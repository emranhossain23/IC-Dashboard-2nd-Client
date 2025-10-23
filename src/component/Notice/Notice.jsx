import React from "react";

const Notice = ({ type, children, bg, color }) => {
  return (
    <div>
      <p
        className="bg-[rgb(239,246,255)]text-[#1E40AF] text-sm col-span-2 p-3 rounded-md"
        style={{
          background: `${bg || "rgb(239,246,255)"}`,
          color: `${color || "#1E40AF"}`,
        }}
      >
        <strong>{type || "Note"}:</strong> {children}
      </p>
    </div>
  );
};

export default Notice;
