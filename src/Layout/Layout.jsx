import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";

const Layout = () => {
  return (
    <div className="border border-[#e5e7eb] rounded-[8px]">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="bg-[#fff] flex flex-col w-full h-[100vh] ms-[300px] dark:bg-black p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
