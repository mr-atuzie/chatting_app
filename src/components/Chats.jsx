import React, { useContext, useEffect, useState } from "react";
// import { IoIosPeople } from "react-icons/io";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { useNavigate } from "react-router-dom";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  const handleSelect2 = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
    navigate("/chats");
  };

  useEffect(() => {
    const getChat = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChat();
  }, [currentUser.uid]);

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

  // console.log(Object.entries(allUsers));
  // console.log(allUsers);

  return (
    <div className=" ">
      {Object.entries(chats).length > 0 && (
        <div className=" py-3">
          <h3 className=" text-gray-700 mb-2">Recent chats</h3>

          <div className=" flex">
            {Object.entries(chats)
              ?.sort((a, b) => b[1].date - a[1].date)
              .map((chat, index) => {
                return (
                  <div
                    key={chat[0]}
                    className={`${index > 0 && "-ml-3 "} cursor-pointer `}
                  >
                    <div className=" w-full flex gap-3 items-center">
                      <img
                        className=" shadow-lg w-[50px] h-[50px] rounded-full object-cover"
                        src={chat[1].userinfo.photoURL}
                        alt=""
                      />
                      {/* 
                <div className=" w-full">
                  <div className=" flex justify-between items-center">
                    <h3 className=" font-medium capitalize text-lg ">
                      {chat[1].userinfo.displayName}
                    </h3>

                    <p className=" text-sm text-green-500">5m</p>
                  </div>
                  <p className="  w-full text-gray-600">
                    {" "}
                    {chat[1].lastMessage?.text}
                  </p>
                </div> */}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      <div className=" my-2 flex  gap-2 items-center">
        <p className=" font-medium text-lg">Others</p>
        <span className=" text-lg text-gray-600">{allUsers.length}</span>
      </div>

      {allUsers?.map((user) => {
        return (
          <div>
            <div
              key={user.uid}
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

                    <p className=" text-sm text-green-500">5m</p>
                  </div>
                  <p className="  w-full text-gray-600"> {user.email}</p>
                </div>
              </div>
            </div>
            <div
              key={user.uid}
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

      {/* console.log(chat[1].userinfo.displayName); */}
    </div>
  );
};

export default Chats;
