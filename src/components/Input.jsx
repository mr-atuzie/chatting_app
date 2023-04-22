import React from "react";
import { BsImages } from "react-icons/bs";

const Input = () => {
  return (
    <div className="  p-6 bg-white h-[150px]">
      <div className="border-2 border-gray-200 rounded-xl h-full flex items-center">
        <input
          className=" px-4 w-[80%] h-full outline-none"
          type="text"
          placeholder="Type something..."
        />

        <div className=" h-[42px] w-[2px] bg-gray-300"></div>

        <div className=" flex gap-4 items-center ml-5">
          <div>
            <BsImages size={30} />
          </div>
          <button className=" bg-pink-600 rounded-2xl text-white capitalize font-medium px-6 py-2">
            send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;
