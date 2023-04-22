import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage } from "../firebase";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion

const Register = () => {
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].value;

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          // Handle unsuccessful uploads
          setError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
          });
        }
      );
    } catch (error) {
      setError(true);
      console.log(error);
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
              You already have an account ? <span>Login</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
