import React, { useContext, useState } from "react";

import { AuthContext } from "../context/AuthContext";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { ChatContext } from "../context/ChatContext";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  const handleChat = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  const handleChat2 = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
    navigate("/chats");
  };

  const handleSearch = async () => {
    try {
      const colRef = collection(db, "users");

      const q = query(colRef, where("displayName", "==", username));

      onSnapshot(q, (snapshot) => {
        snapshot.docs.forEach((doc) => {
          setUser(doc.data());
        });
      });
    } catch (error) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    handleChat(user);

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

    setUser(null);
    setUsername("");
  };

  return (
    <div>
      <div className=" bg-gray-100 rounded-md p-4">
        <input
          className=" outline-none bg-transparent"
          type="text"
          value={username}
          placeholder="Search for user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* <button onClick={handleKey}>click</button> */}
      </div>

      {err && <p className=" text-gray-600"> User not found</p>}
      {user && (
        <div>
          <div className="hidden lg:block cursor-pointer border-b py-3">
            <div onClick={handleSelect} className=" flex gap-3 items-center">
              <img
                className=" w-[40px] h-[40px] rounded-full object-cover"
                src={user.photoURL}
                alt=""
              />

              <div>
                <h3 className=" font-medium capitalize">{user.displayName}</h3>
                {/* <p className=" text-gray-600 text-sm">Joined April 2023</p> */}
              </div>
            </div>
          </div>
          <div className="lg:hidden cursor-pointer border-b py-3">
            <div
              onClick={handleChat2(user)}
              className=" flex gap-3 items-center"
            >
              <img
                className=" w-[40px] h-[40px] rounded-full object-cover"
                src={user.photoURL}
                alt=""
              />

              <div>
                <h3 className=" font-medium capitalize">{user.displayName}</h3>
                <p className=" text-gray-600 text-sm">Joined April 2023</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
