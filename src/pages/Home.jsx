import React from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import Profile from "../components/Profile";

const Home = () => {
  return (
    <div className=" w-full h-screen ">
      <div className=" w-full h-full flex">
        <Sidebar />
        <Chat />
        <Profile />
      </div>
    </div>
  );
};

export default Home;
