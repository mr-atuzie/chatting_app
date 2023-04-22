import React from "react";
import { IoIosPeople } from "react-icons/io";

const Chats = () => {
  return (
    <div className=" ">
      <div className=" my-5 flex gap-4 items-center">
        <div className=" bg-slate-50 w-[40px] h-[40px] flex items-center justify-center rounded-full text-gray-700">
          <IoIosPeople size={25} />
        </div>
        <p className=" font-medium text-lg"> All</p>
        <span className=" bg-pink-50 text-pink-400 px-4 py-1 rounded-full">
          26
        </span>
      </div>
      <div className=" border-b py-3">
        <div className=" flex gap-3 items-center">
          <img
            className=" w-[50px] h-[50px] rounded-full object-cover"
            src="https://images.squarespace-cdn.com/content/v1/530a77dee4b035db71736c02/1570812709805-UW9CYAKYVXKSTO845HHI/Connecticut+headshots+-+lawyer+headshot+-+Seshu+Badrinath.jpg?format=1000w"
            alt=""
          />

          <div>
            <div className=" flex items-center justify-between">
              <h3 className=" font-medium capitalize">Rex Atuzie</h3>
              <p className=" text-green-500 text-sm">5m</p>
            </div>
            <p className=" text-gray-600  text-sm">
              I love you too, can't wait to come back to lagos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
