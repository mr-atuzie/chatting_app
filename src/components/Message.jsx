import React from "react";

const Message = ({ owner }) => {
  return (
    <div
      className={
        owner ? " flex mb-4 gap-3  flex-row-reverse" : "flex mb-4 gap-3"
      }
    >
      <div className={owner ? "flex gap-3 flex-row-reverse" : "flex gap-3"}>
        <img
          className=" w-[25px] h-[25px] rounded-full"
          src="https://images.squarespace-cdn.com/content/v1/530a77dee4b035db71736c02/1570812709805-UW9CYAKYVXKSTO845HHI/Connecticut+headshots+-+lawyer+headshot+-+Seshu+Badrinath.jpg?format=1000w"
          alt=""
        />

        <div>
          <div
            className={
              owner
                ? "bg-pink-700  text-white max-w-lg shadow-lg p-3 rounded-lg"
                : "bg-white rounded-lg p-3 text-gray-700 max-w-lg shadow-lg"
            }
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
            obcaecati nostrum sed temporibus deleniti ea.
            <div
              className={
                owner
                  ? " flex gap-2 items-center justify-end text-white text-xs mt-4 text-right"
                  : " flex gap-2 items-center justify-start text-xs text-gray-500 mt-4 text-right"
              }
            >
              Just now
            </div>
          </div>

          <img
            className={
              owner
                ? " rounded-lg w-[350px] object-cover my-2 float-right"
                : "rounded-lg w-[350px] object-cover my-2"
            }
            src="https://www.themobileheadshot.com/wp-content/uploads/2022/09/TMH00193-1024x819.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Message;
