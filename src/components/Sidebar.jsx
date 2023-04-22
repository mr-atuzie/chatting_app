import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";

const Sidebar = () => {
  return (
    <div className=" w-[25%] shadow-md h-full bg-white overflow-y-scroll  scrollbar-thin scrollbar-thumb-pink-600 scrollbar-track-pink-50   px-6">
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
};

export default Sidebar;
