import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);

  console.log(data);
  return (
    <div className=" chat w-[55%] h-full bg-gray-300 ">
      {/* top bar */}
      <div className=" shadow-md rounded-md bg-white m-3 p-4">
        <div className=" flex items-center gap-3">
          <img
            className=" w-[70px] h-[70px] rounded-full object-cover"
            src={data.user?.photoURL}
            alt=""
          />

          <h3 className=" font-medium text-lg capitalize">
            {data.user?.displayName}
          </h3>
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
