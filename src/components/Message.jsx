import React, { useContext, useEffect, useRef } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import moment from "moment/moment";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={
        message.senderId === currentUser.uid
          ? " flex mb-4 gap-3  flex-row-reverse"
          : "flex mb-4 gap-3"
      }
    >
      <div
        className={
          message.senderId === currentUser.uid
            ? "flex flex-col items-end gap-3 lg:flex-row-reverse"
            : "flex gap-3"
        }
      >
        <img
          className=" w-[35px] h-[35px]  lg:w-[40px] lg:h-[40px] object-cover rounded-full"
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />

        <div>
          {message.text && (
            <div
              className={
                message.senderId === currentUser.uid
                  ? "bg-pink-700  text-white text-base w-[300px] lg:w-[350px] shadow-lg  p-3 rounded-lg"
                  : "bg-white rounded-lg p-3 text-base text-gray-700 w-[300px] lg:w-[350px] shadow-lg"
              }
            >
              {message.text.charAt(0).toUpperCase() + message.text.slice(1)}
              <div
                className={
                  message.senderId === currentUser.uid
                    ? " flex gap-2 items-center justify-end text-white text-xs mt-4 text-right"
                    : " flex gap-2 items-center justify-start text-xs text-gray-500 mt-4 text-right"
                }
              >
                {moment(message.date?.toDate()).calendar()}
              </div>
            </div>
          )}

          {message.img && (
            <img
              className={
                message.senderId === currentUser.uid
                  ? " rounded-lg w-[300px] lg:w-[350px] object-cover my-2 float-right"
                  : "rounded-lg w-[300px] lg:w-[350px] object-cover my-2"
              }
              src={message.img}
              alt=""
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
