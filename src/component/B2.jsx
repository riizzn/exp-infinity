import React from "react";

const B2 = () => {
  return (
    <>
      <button className=" relative bg-white px-5 py-2 rounded-xl group  overflow-hidden   ">
        <span className="relative z-10 group-hover:text-white duration-700 transition-colors ease-[cubic-bezier(0.76,0,0.24,1)] ">
          ENQUIRE NOW
        </span>
        <span className="absolute inset-0 bg-pink-300 -translate-x-full group-hover:translate-x-0 rounded-xl transition-transform duration-700  ease-[cubic-bezier(0.12, 0, 0.39, 0)]"></span>
      </button>
      {/* rounded-button animation */}
      <button className=" relative bg-white px-5 py-2 rounded-xl group  overflow-hidden  ">
        <span className="relative z-10 group-hover:text-white duration-700 transition-colors ease-[cubic-bezier(0.76,0,0.24,1)] ">
          OUR WORK
        </span>
        <span className="absolute rounded-[100%] group-hover:rounded-xl inset-0 bg-pink-300  translate-y-full group-hover:translate-y-0  transition-all duration-700  ease-[cubic-bezier(0.12, 0, 0.39, 0)]"></span>
      </button>
      <button className="relative isolate px-6 py-3 group">
        {/* 1. The Text (Top Layer) */}
        <span className="relative z-20 font-bold text-gray-800">
          The Leader in Online Learning
        </span>

        {/* 2. The White Background (Middle Layer) */}
        <span className="absolute inset-0 bg-white rounded-full z-10 border border-gray-200"></span>

        {/* 3. The Pink "Border" (Bottom Layer) */}
        <span
          className="absolute -inset-0.5 bg-pink-300 rounded-full z-0 transition-transform bg-linear-to-r
    from-[#fef7e6]
    via-[#f9c84b]
    to-[#b0730e] animate-gradient"
        ></span>
      </button>

      <button className="relative isolate  px-5 py-2 rounded-xl overflow-hidden">
        <span className="absolute -inset-0.5  rounded-xl z-0"></span>
      </button>

      <button className="relative isolate  bg-white px-8 py-3 rounded-full group overflow-hidden">
        {/* Text */}
        <span className="relative right-0 z-20 font-bold text-gray-800">
          About Us
        </span>

        <span className="absolute inset-0 z-10 left-2 group-hover:left-0 group-hover:text-white transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"></span>

        {/* Expanding pink circle */}
        <span
          className="
      absolute
      left-5 top-1/2 -translate-y-1/2
      size-2 rounded-full bg-pink-300
      scale-100
      group-hover:scale-[30]
      transition-transform duration-200
      origin-center
      ease-[cubic-bezier(0.12,0,0.39,0)]
    "
        ></span>
      </button>
    </>
  );
};

export default B2;
