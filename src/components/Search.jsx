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

  const handleSearch = async (e) => {
    e.preventDefault();
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
      console.log(error);
    }

    return user;
  };

  // const handleKey = (e) => {
  //   e.preventDefault();
  //   e.code === "Enter" && handleSearch();
  // };

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

  const handleSelect2 = async (user) => {
    handleChat2(user);

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
    } catch (error) {
      setErr(true);
    }

    setUser(null);
    setUsername("");
  };

  console.log(user);

  return (
    <div>
      <form className=" bg-gray-100 rounded-md " onSubmit={handleSearch}>
        <input
          className=" w-full  outline-none bg-transparent p-4"
          type="text"
          value={username}
          placeholder="Search for user"
          // onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* <button onClick={handleKey}>click</button> */}
      </form>

      {err && <p className=" text-sm text-red-600">Something went wrong</p>}

      {user && (
        <div>
          <div
            className="hidden lg:block cursor-pointer border-b py-3"
            onClick={handleSelect}
          >
            <div className=" flex gap-3 items-center">
              <img
                className=" w-[40px] h-[40px] rounded-full object-cover"
                src={user.photoURL}
                alt=""
              />

              <div>
                <h3 className=" font-medium">{user.displayName}</h3>
                <p className=" text-gray-600 text-sm">{user.email}</p>
              </div>
            </div>
          </div>
          <div
            className="lg:hidden cursor-pointer border-b py-3"
            onClick={() => handleSelect2(user)}
          >
            <div className=" flex gap-3 items-center">
              <img
                className=" w-[40px] h-[40px] rounded-full object-cover"
                src={user.photoURL}
                alt=""
              />

              <div>
                <h3 className=" font-medium ">{user.displayName}</h3>
                <p className=" text-gray-600 text-sm">{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
