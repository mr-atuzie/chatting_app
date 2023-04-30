import React, { useContext, useEffect, useState } from "react";
// import { IoIosPeople } from "react-icons/io";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  const handleSelectChat = async (u) => {
    const user = u[1].userinfo;
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
    const user = u[1].userinfo;
    dispatch({ type: "CHANGE_USER", payload: user });
    handleSelectChat(u);
  };

  const handleSelect2 = (u) => {
    const user = u[1].userinfo;

    dispatch({ type: "CHANGE_USER", payload: user });
    handleSelectChat(u);
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
      <Link to="/users">
        <div className=" lg:hidden py-3">
          <div className=" my-2 flex  gap-2 items-center">
            <h3 className=" text-gray-700 my-3">Start a conversation</h3>
          </div>

          <div className=" flex">
            {allUsers.map((data, index) => {
              return (
                <div
                  key={data.uid}
                  className={`${index > 0 && "-ml-3 "} cursor-pointer `}
                >
                  <div className=" w-full flex gap-3 items-center">
                    <img
                      className=" shadow-lg w-[50px] h-[50px] rounded-full object-cover"
                      src={data.photoURL}
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
      </Link>

      <div className=" mt-6 mb-2 flex  gap-2 items-center">
        <p className=" font-medium text-lg">Recent conversations</p>
      </div>

      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((user) => {
          return (
            <div key={user[1].userinfo.uid}>
              <div
                className=" hidden lg:block cursor-pointer border-b py-3"
                onClick={() => handleSelect(user)}
              >
                <div className=" w-full flex gap-3 items-center">
                  <img
                    className=" w-[50px] h-[50px] rounded-full object-cover"
                    src={user[1].userinfo.photoURL}
                    alt=""
                  />

                  <div className=" w-full">
                    <div className=" flex justify-between items-center">
                      <h3 className=" font-medium capitalize text-lg ">
                        {user[1].userinfo.displayName}
                      </h3>

                      <p className=" text-sm text-green-500">
                        {moment(user[1].date?.toDate()).calendar()}
                      </p>
                    </div>
                    <p className="  w-full text-gray-600">
                      {" "}
                      {user[1].lastMessage?.text}
                    </p>
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
                    src={user[1].userinfo.photoURL}
                    alt=""
                  />

                  <div className=" w-full">
                    <div className=" flex justify-between items-center">
                      <h3 className=" font-medium capitalize text-lg ">
                        {user[1].userinfo.displayName}
                      </h3>

                      {/* <p className=" text-sm text-green-500">5m</p> */}
                    </div>
                    <p className="   w-full text-gray-600">
                      {" "}
                      {user[1].lastMessage?.text}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

      {/* console.log(chat[1].userinfo.displayName); */}

      {/* {allUsers?.map((user) => {
        return (
          <div key={user.email}>
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

                    <p className=" text-sm text-green-500">5m</p>
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

                    <p className=" text-sm text-green-500">5m</p>
                  </div>
                  <p className="   w-full text-gray-600"> {user.email}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })} */}
    </div>
  );
};

export default Chats;
