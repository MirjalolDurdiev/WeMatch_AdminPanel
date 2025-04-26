import Item from "@/components/shared/item";
import Modal from "@/components/shared/modal";
import { Button } from "@/components/ui/button";
import { LOGOUT } from "@/redux/action/logout";
import { Grid2x2Plus } from "lucide-react";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logOut, setLogOut] = useState(false);
  const navLinks = [
    {
      label: "Opportunities",
      icon: Grid2x2Plus,
      path: "/opportunities",
    },
  ];

  const logout = () => {
    dispatch({ type: LOGOUT });
    localStorage.removeItem("accessToken");
    navigate("/login");
  };
  return (
    <div>
      <div className="max-w-[300px] w-full h-[100vh] p-2 bg-white fixed border-r border-[#e5e7eb] dark:bg-black">
        <div className="relative h-[100vh]">
          <div className="flex flex-col">
            {navLinks?.map((links, id) => {
              const { label, icon, path } = links;
              return (
                <Link to={path} key={id}>
                  <Item label={label} icon={icon} />
                </Link>
              );
            })}
          </div>

          <Button
            className="absolute bottom-[12%] left-0 w-full"
            onClick={() => setLogOut(true)}
          >
            Log Out
          </Button>
        </div>
      </div>
      {logOut && (
        <Modal close={() => setLogOut(false)}>
          <div className="bg-white p-[10px] rounded-[10px]">
            <div className="flex items-center gap-[10px]">
              <Button onClick={() => setLogOut(false)}>Cancel</Button>
              <Button onClick={logout}>Logout</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Sidebar;
