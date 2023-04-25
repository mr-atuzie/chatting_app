import React, { useContext, useEffect, useState } from "react";
import { IoIosPeople } from "react-icons/io";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
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

  console.log(Object.entries(chats));

  return (
    <div className=" ">
      <div className=" my-5 flex gap-4 items-center">
        <div className=" bg-slate-50 w-[40px] h-[40px] flex items-center justify-center rounded-full text-gray-700">
          <IoIosPeople size={25} />
        </div>
        <p className=" font-medium text-lg"> All</p>
        <span className=" bg-pink-50 text-pink-400 px-4 py-1 rounded-full">
          26
        </span>
      </div>
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => {
          return (
            <div
              key={chat[0]}
              className=" cursor-pointer border-b py-3"
              onClick={() => handleSelect(chat[1].userinfo)}
            >
              <div className=" w-full flex gap-3 items-center">
                <img
                  className=" w-[50px] h-[50px] rounded-full object-cover"
                  src={chat[1].userinfo.photoURL}
                  alt=""
                />

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
