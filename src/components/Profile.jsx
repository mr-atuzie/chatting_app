import React from "react";

const Profile = () => {
  return (
    <div className=" w-[20%] py-10 h-full flex flex-col items-center bg-white ">
      <img
        className=" w-[150px] h-[150px] rounded-full object-cover"
        src="https://www.themobileheadshot.com/wp-content/uploads/2022/09/TMH00193-1024x819.jpg"
        alt=""
      />

      <h3 className=" font-semibold text-lg capitalize mt-5">Alex Yakubu</h3>

      <p className=" text-gray-600 text-sm tracking-wide">
        {" "}
        11:54pm in Lagos , Nigeria
      </p>
    </div>
  );
};

export default Profile;
