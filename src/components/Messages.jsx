import React from "react";
import Message from "./Message";

const Messages = () => {
  return (
    <div className="  bg-transparent h-[70vh] px-4 overflow-y-scroll  scrollbar-thin scrollbar-thumb-pink-600 scrollbar-track-pink-50  ">
      <Message />
      <Message owner />
      <Message />
      <Message owner />
      <Message />
      <Message owner />
      <Message />
      <Message owner />
      <Message owner />
      <Message />
    </div>
  );
};

export default Messages;
