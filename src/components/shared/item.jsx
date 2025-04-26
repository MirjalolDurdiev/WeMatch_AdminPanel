import React from "react";

const Item = ({ label, icon: Icon }) => {
  return (
    <div className="flex items-center gap-2 transition text-[#202124] text-[14px] hover:bg-secondary rounded-full px-3 py-2 cursor-pointer dark:text-white">
      <Icon className="w-4 h-4" />
      <span className="pl-2 text=[#09090b] opacity-75">{label}</span>
    </div>
  );
};

export default Item;
