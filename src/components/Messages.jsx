import React, { useContext, useEffect, useState } from "react";
import Message from "./Message";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const chats = () => {
      const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });

      return () => {
        unsub();
      };
    };

    data.chatId && chats();
  }, [data.chatId]);

  // console.log(data.chatId);

  // console.log(messages);

  return (
    <div className="  bg-transparent px-2 h-[80vh] lg:h-[74vh] lg:px-4 overflow-y-scroll  scrollbar-thin scrollbar-thumb-pink-600 scrollbar-track-pink-50  ">
      {messages.map((message) => {
        return <Message message={message} key={message.id} />;
      })}
    </div>
  );
};

export default Messages;
