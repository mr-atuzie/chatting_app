import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import Allusers from "./Allusers";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="py-10 w-full  h-full relative ">
      <div className="flex flex-col items-center ">
        <img
          className=" w-[150px] h-[150px] rounded-full object-cover"
          src={currentUser.photoURL}
          alt=""
        />

        <h3 className=" font-semibold text-lg capitalize mt-5">
          {currentUser.displayName}
        </h3>

        <p className=" text-gray-600 text-sm tracking-wide">
          {" "}
          {currentUser.email}
        </p>
      </div>

      <div className="">
        <div className=" px-3 mt-6  flex  gap-2 items-center">
          <p className=" font-medium text-lg">Start a conversations</p>
        </div>

        <Allusers />
      </div>

      <div className=" flex justify-center items-center">
        <button
          className=" bg-pink-600 w-[200px] py-3 rounded-lg text-white absolute bottom-5"
          onClick={() => signOut(auth)}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
