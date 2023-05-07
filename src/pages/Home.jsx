import React from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import Profile from "../components/Profile";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { BiLogOut } from "react-icons/bi";

const Home = () => {
  return (
    <div className=" w-full h-screen  relative">
      <div className=" w-full h-full flex">
        <div className=" w-full lg:w-[25%]  h-full bg-white overflow-y-scroll  scrollbar-thin scrollbar-thumb-pink-600 scrollbar-track-pink-50  px-2  lg:px-6">
          <Sidebar />
        </div>

        <div className="hidden lg:block  w-full lg:w-[50%] h-full bg-gray-300 ">
          <Chat />
        </div>

        <div className="hidden  lg:block   w-[25%]  h-full overflow-y-scroll  scrollbar-thin scrollbar-thumb-pink-600 scrollbar-track-pink-50  ">
          <Profile />
        </div>

        <button
          className=" z-50 bg-pink-700 w-[60px] h-[60px] rounded-full shadow-md text-white absolute bottom-5 right-5 lg:hidden"
          onClick={() => signOut(auth)}
        >
          <BiLogOut size={30} />
        </button>
      </div>
    </div>
  );
};

export default Home;
