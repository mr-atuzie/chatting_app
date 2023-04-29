import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import { Link } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";

const Chat = () => {
  const { data } = useContext(ChatContext);

  console.log(data);
  return (
    <div className="chat">
      {/* top bar */}
      <div className=" rounded-md bg-white mb-2  lg:m-3  p-2 lg:p-4">
        <div className=" flex items-center gap-3">
          <div>
            <Link to={"/"}>
              <IoArrowBackOutline size={30} />
            </Link>
          </div>
          <img
            className=" w-[50px] h-[50px] lg:w-[70px] lg:h-[70px] rounded-full object-cover"
            src={data.user?.photoURL}
            alt=""
          />

          <div>
            <h3 className=" font-medium lg:text-lg capitalize">
              {data.user?.displayName}
            </h3>
            <p className=" text-gray-600 text-sm lg:text-base">
              {data.user?.email}
            </p>
          </div>
        </div>
      </div>
      {/* chat box */}
      <Messages />
      {/*message input  */}
      <Input />
    </div>
  );
};

export default Chat;
