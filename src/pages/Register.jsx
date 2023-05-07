import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(false);
    setLoading(true);

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
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div className=" flex">
      {/* text div */}
      <div className=" hidden w-[50%] bg-pink-100 h-[100vh] lg:flex px-5 justify-center items-center"></div>
      {/* form div */}
      <div className=" w-full lg:w-[50%] relative h-[100vh]">
        <div className=" flex items-center absolute left-4 top-4 gap-3">
          <div className=" w-[50px] h-[50px] bg-pink-600 pb-3 rounded-full flex items-end justify-center">
            <div className="text-white font-medium">Z</div>
          </div>

          <h1 className=" font-semibold text-xl lg:text-2xl">ZiltChat</h1>
        </div>
        <div className=" w-full  h-full flex items-center justify-center">
          <div className=" p-4 lg:w-[65%]">
            <h1 className=" text-3xl lg:text-5xl font-medium capitalize">
              register
            </h1>
            <p className=" text-xs text-gray-500 mt-2 lg:text-sm">
              Fastest growing friendly environment for you to chat with others,
              whether you're looking for new friends, a casual conversation, or
              a meaningful connection.You can create your own profile, upload
              photos, and start chatting instantly with our private messaging
              system.
            </p>
            :
            {err && (
              <p className=" text-sm text-red-600">
                Something went wrong, please try again
              </p>
            )}
            <form className=" mt-6" onSubmit={handleSubmit}>
              <div className=" mb-4">
                <label
                  className=" mb-1 text-gray-700  block font-medium "
                  htmlFor="display"
                >
                  Display name
                </label>
                <input
                  className="border w-full lg:w-[80%] px-4 py-3"
                  type="text"
                  placeholder="Enter display name"
                  id="display"
                />
              </div>

              <div className=" mb-4">
                <label
                  className=" mb-1 text-gray-700 block font-medium "
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="border  w-full lg:w-[80%] px-4 py-3"
                  type="email"
                  placeholder="Enter email"
                  id="email"
                />
              </div>
              <div className=" mb-4">
                <label
                  className=" mb-1 text-gray-700 block font-medium "
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="border  w-full lg:w-[80%] px-4 py-3"
                  type="password"
                  placeholder="Enter password"
                  id="password"
                />
              </div>
              <div className=" mb-2">
                <input className="hidden" type="file" id="file" />
                <label htmlFor="file">Select profile picture</label>
              </div>
              {loading ? (
                <button
                  disabled
                  className=" mt-4  w-full lg:w-[80%] bg-pink-600 text-white py-3"
                >
                  Loading
                </button>
              ) : (
                <button
                  className=" mt-4  w-full lg:w-[80%] bg-pink-600 text-white py-3"
                  type="submit"
                >
                  Sign up
                </button>
              )}
            </form>
            <p className=" mt-5">
              You already have an account ?{" "}
              <Link className=" text-blue-600" to={"/login"}>
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
