import { ModeToggle } from "@/components/shared/mode-toggle";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="border-b border-[#e5e7eb] p-2 dark:bg-black">
      <div className="flex items-center justify-between">
        <div>
          <Link to={"/"}>
            <h1 className="font-bold text-[30px]">WeMatch Admin</h1>
          </Link>
        </div>

        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
