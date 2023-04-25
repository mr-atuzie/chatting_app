import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, `${displayName}/${file.name}`);

      uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (url) => {
          console.log(url);

          await updateProfile(res.user, {
            displayName,
            photoURL: url,
          });

          await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            displayName,
            email,
            photoURL: url,
          });

          await setDoc(doc(db, "userChats", res.user.uid), {});

          navigate("/");
        });
      });
    } catch (error) {
      setErr(true);
    }
  };
  return (
    <div className=" flex">
      {/* text div */}
      <div className=" w-[50%] bg-purple-500 h-[100vh]">text</div>
      {/* form div */}
      <div className=" w-[50%] h-[100vh]">
        <div className=" w-full  h-full flex items-center justify-center">
          <div className=" bg-red-200 p-4 w-[65%]">
            <h1>register</h1>

            <form onSubmit={handleSubmit}>
              <div>
                <input type="text" placeholder="display name" />
              </div>

              <div>
                <input type="email" placeholder="email" />
              </div>
              <div>
                <input type="password" placeholder="password" />
              </div>
              <div>
                <input className="hidden" type="file" id="file" />
                <label htmlFor="file">select profile picture</label>
              </div>
              <button type="submit">sign up</button>
            </form>

            <p>
              You already have an account ? <Link to={"/login"}>login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
