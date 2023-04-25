import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Login = () => {
  const [err, setErr] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
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
            <h1>login</h1>

            <form onSubmit={handleSubmit}>
              <div>
                <input type="email" placeholder="email" />
              </div>
              <div>
                <input type="password" placeholder="password" />
              </div>

              <button>sign up</button>
            </form>

            <p>
              Dont have an account ? <Link to={"/register"}>Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
