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

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const { data } = useContext(ChatContext);

  const { currentUser } = useContext(AuthContext);

  const handleSend = async () => {
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
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    setText("");
    setImg(null);
  };
  return (
    <div className="  p-6 bg-white h-[150px]">
      <div className="border-2 border-gray-200 rounded-xl h-full flex items-center">
        <input
          className=" px-4 w-[80%] h-full outline-none"
          type="text"
          placeholder="Type something..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className=" h-[42px] w-[2px] bg-gray-300"></div>

        <div className=" flex gap-4 items-center ml-5">
          <div>
            <input
              onChange={(e) => setImg(e.target.files[0])}
              className="hidden"
              type="file"
              id="file"
            />

            <label htmlFor="file">
              <BsImages size={30} />
            </label>
          </div>
          <button
            onClick={handleSend}
            className=" bg-pink-600 rounded-2xl text-white capitalize font-medium px-6 py-2"
          >
            send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;
