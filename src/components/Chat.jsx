import React, { useContext, useState } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import { Link } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";

const Chat = () => {
  const { data } = useContext(ChatContext);
  const [sending, setSending] = useState(false);

  console.log(data.user);
  return (
    <div className="chat relative">
      {/* top bar */}
      <div className="  bg-white  mb-3 w-full z-40 sticky top-0   p-3 lg:p-4">
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
              {/* {data.user[1].email} */}
            </p>
          </div>
        </div>
      </div>
      {/* chat box */}
      <Messages sending={sending} />
      {/*message input  */}
      <Input setSending={setSending} />
    </div>
  );
};

export default Chat;
