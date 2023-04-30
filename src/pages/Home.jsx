import React from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import Profile from "../components/Profile";

const Home = () => {
  return (
    <div className=" w-full h-screen ">
      <div className=" w-full h-full flex">
        <div className=" w-full lg:w-[25%]  h-full bg-white overflow-y-scroll  scrollbar-thin scrollbar-thumb-pink-600 scrollbar-track-pink-50  px-2  lg:px-6">
          <Sidebar />
        </div>

        <div className="hidden lg:block  w-full lg:w-[50%] h-full bg-gray-300 ">
          <Chat />
        </div>

        <div className="hidden  lg:block   w-[25%]  h-full ">
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default Home;
