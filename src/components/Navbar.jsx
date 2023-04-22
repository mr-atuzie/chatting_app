import React from "react";

const Navbar = () => {
  return (
    <div className=" flex justify-between items-center h-[80px] px-3">
      <div className=" flex items-center gap-3">
        <div className=" w-[50px] h-[50px] bg-pink-600 pb-3 rounded-full flex items-end justify-center">
          <div className="text-white font-medium">Z</div>
        </div>

        <h1 className=" font-semibold text-2xl">ZiltChat</h1>
      </div>
    </div>
  );
};

export default Navbar;
