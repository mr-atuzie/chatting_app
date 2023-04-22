import React from "react";

const Login = () => {
  return (
    <div className=" flex">
      {/* text div */}
      <div className=" w-[50%] bg-purple-500 h-[100vh]">text</div>
      {/* form div */}
      <div className=" w-[50%] h-[100vh]">
        <div className=" w-full  h-full flex items-center justify-center">
          <div className=" bg-red-200 p-4 w-[65%]">
            <h1>login</h1>

            <form>
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
              <button>sign up</button>
            </form>

            <p>
              Dont have an account ? <span>Register</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
