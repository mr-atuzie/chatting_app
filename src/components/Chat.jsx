import React from "react";
import Messages from "./Messages";
import Input from "./Input";

const Chat = () => {
  return (
    <div className=" chat w-[55%] h-full bg-gray-300 ">
      {/* top bar */}
      <div className=" shadow-md rounded-md bg-white m-3 p-4">
        <div className=" flex items-center gap-3">
          <img
            className=" w-[70px] h-[70px] rounded-full object-cover"
            src="https://media.gq.com/photos/63c8d5a6cd63aa9138b13c7b/1:1/w_3641,h_3641,c_limit/1246142881"
            alt=""
          />

          <h3 className=" font-medium text-lg capitalize">Rex Atuzie</h3>
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
