import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className=" w-[20%] py-10 h-full flex flex-col items-center bg-white ">
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
        11:54pm in Lagos , Nigeria
      </p>

      <button onClick={() => signOut(auth)}>Logout</button>
    </div>
  );
};

export default Profile;
