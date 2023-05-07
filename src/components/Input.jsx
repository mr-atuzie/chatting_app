import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useContext, useState } from "react";
import { BsImages } from "react-icons/bs";
import { ChatContext } from "../context/ChatContext";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { AuthContext } from "../context/AuthContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Input = ({ setSending }) => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const { data } = useContext(ChatContext);

  console.log(data);

  const { currentUser } = useContext(AuthContext);

  const handleSend = async (e) => {
    setSending(true);
    e.preventDefault();

    try {
      if (img) {
        const storageRef = ref(storage, `chats/${uuid()}`);

        uploadBytes(storageRef, img).then((snapshot) => {
          getDownloadURL(snapshot.ref).then(async (url) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: url,
              }),
            });
          });
        });

        setSending(false);
        setImg(null);
        setText("");
      } else {
        setText("");
        setImg(null);
        setSending(true);

        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });

        setSending(false);
      }
    } catch (error) {
      console.log(error);
      setSending(false);
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user?.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
  };
  return (
    <div className="  w-full p-2 lg:p-6  chat   ">
      <form
        className=" bg-white py-3 lg:py-6 h-full flex rounded-full items-center"
        onSubmit={handleSend}
      >
        <input
          className=" px-4 w-[80%] h-full outline-none text-gray-800"
          required
          type="text"
          placeholder="Message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className=" h-[42px] w-[2px] bg-gray-700"></div>

        <div className=" flex gap-4 items-center ml-3 lg:ml-5">
          <div>
            <input
              onChange={(e) => setImg(e.target.files[0])}
              className="hidden"
              type="file"
              id="file"
            />

            <label htmlFor="file">
              <BsImages className=" text-gray-600" size={25} />
            </label>
          </div>
          <button
            onClick={handleSend}
            className="hidden lg:block bg-pink-600 rounded-full text-white capitalize font-medium text-sm lg:text-base px-3 lg:px-6 py-1 lg:py-3"
          >
            send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Input;
