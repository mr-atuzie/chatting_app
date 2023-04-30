import {
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { Link, useNavigate } from "react-router-dom";

import Search from "./Search";
import { IoArrowBackOutline } from "react-icons/io5";

const Allusers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const navigate = useNavigate();

  // const navigate = useNavigate();

  useEffect(() => {
    const getAllUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));

      const users = [];

      querySnapshot.forEach((doc) => {
        users.push(doc.data());
        setAllUsers(users.filter((u) => u.uid !== currentUser.uid));
      });
    };

    getAllUsers();
  }, [currentUser.uid]);

  const handleSelectChat = async (user) => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userinfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userinfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {}
  };

  const handleSelect = (u) => {
    handleSelectChat(u);
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  const handleSelect2 = (u) => {
    handleSelectChat(u);
    dispatch({ type: "CHANGE_USER", payload: u });
    navigate("/chats");
  };

  return (
    <div className=" w-full">
      <div className="flex justify-between items-center p-3 lg:hidden">
        <div className=" ">
          <Link to={"/"}>
            <IoArrowBackOutline size={30} />
          </Link>
        </div>

        <img
          className=" w-[40px] h-[40px] rounded-full object-cover"
          src={currentUser.photoURL}
          alt=""
        />
      </div>
      <div className=" px-3 lg:hidden">
        <Search />
      </div>

      <div className=" px-3 ">
        <p className=" font-semibold text-gray-700 text-lg my-3 lg:hidden">
          Everyone on zilt - <span>{allUsers.length}</span>
        </p>
        {allUsers.map((user) => {
          return (
            <div key={user.uid}>
              <div
                className=" hidden lg:block cursor-pointer border-b py-3"
                onClick={() => handleSelect(user)}
              >
                <div className=" w-full flex gap-3 items-center">
                  <img
                    className=" w-[50px] h-[50px] rounded-full object-cover"
                    src={user.photoURL}
                    alt=""
                  />

                  <div className=" w-full">
                    <div className=" flex justify-between items-center">
                      <h3 className=" font-medium capitalize text-lg ">
                        {user.displayName}
                      </h3>
                    </div>
                    <p className="  w-full text-gray-600"> {user.email}</p>
                  </div>
                </div>
              </div>
              <div
                className="lg:hidden cursor-pointer border-b py-3"
                onClick={() => handleSelect2(user)}
              >
                <div className=" w-full flex gap-3 items-center">
                  <img
                    className=" w-[50px] h-[50px] rounded-full object-cover"
                    src={user.photoURL}
                    alt=""
                  />

                  <div className=" w-full">
                    <div className=" flex justify-between items-center">
                      <h3 className=" font-medium capitalize text-lg ">
                        {user.displayName}
                      </h3>

                      {/* <p className=" text-sm text-green-500">5m</p> */}
                    </div>
                    <p className="   w-full text-gray-600"> {user.email}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Allusers;
