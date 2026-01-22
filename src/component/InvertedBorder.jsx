import React from "react";

const InvertedBorder = () => {
  return (
    <div className="container flex items-center justify-center flex-wrap h-screen gap-2.5 p-[1.25rem]">
      <div className="card relative">
        <div className="cardimg w-[25rem] h-[25rem] rounded-[1.25rem] border-8 solid border-white overflow-hidden relative">
          <img
            className="w-full h-full object-cover"
            src="/images/e6.jpg"
            alt="image"
          />
        </div>
        <div
          className="tag w-[12.5rem] h-[3.75rem] flex justify-center items-center absolute right-0 bottom-0 bg-black border-t-8  border-l-8 border-solid border-white
          p-[0.3rem]  rounded-tl-[1.25rem]"
        >
          <p className="text-white text-2xl">
            <span>200,000</span>
          </p>
        </div>
        <div className="curve_one"></div>
        <div className="curve_two"></div>
      </div>
    </div>
  );
};

export default InvertedBorder;
