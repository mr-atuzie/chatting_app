import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Login = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(false);
    setLoading(true);

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className=" flex">
      {/* text div */}
      <div className=" hidden lg:block w-[50%] bg-pink-100 h-[100vh]">text</div>
      {/* form div */}
      <div className=" w-full lg:w-[50%] relative h-[100vh]">
        <div className=" flex items-center absolute left-4 top-4 gap-3">
          <div className=" w-[50px] h-[50px] bg-pink-600 pb-3 rounded-full flex items-end justify-center">
            <div className="text-white font-medium">Z</div>
          </div>

          <h1 className=" font-semibold text-xl lg:text-2xl">ZiltChat</h1>
        </div>
        <div className=" w-full  h-full flex items-center justify-center">
          <div className=" p-4 w-[65%]">
            <h1 className=" text-3xl lg:text-5xl font-medium capitalize">
              Welcome back
            </h1>

            {err && (
              <p className=" text-sm text-red-600">
                Something went wrong, please try again
              </p>
            )}

            <form className=" mt-6" onSubmit={handleSubmit}>
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
                  Login
                </button>
              )}
            </form>

            <p className=" mt-5">
              Don't have have an account ?{" "}
              <Link className=" text-blue-600" to={"/register"}>
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
