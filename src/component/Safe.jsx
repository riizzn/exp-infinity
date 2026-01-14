import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(useGSAP,CustomEase);
const Safe = () => {
  const menuRef = useRef(null);
  return (
    <div
      ref={menuRef}
      className="menu fixed top-0 left-0 w-full h-svh pointer-events-none overflow-hidden"
    >
      <div className="menu-bg absolute w-full h-full pointer-events-none">
        <div className="menu-bg-left absolute w-[50%] h-full overflow-hidden left-0">
          <div className="menu-bg-left-inner absolute w-full h-full will-change-transform bg-pink-200 transform-[100%_50%] rotate-180 scale-2  "></div>
        </div>
        <div className="menu-bg-right  absolute w-[50%] h-full overflow-hidden right-0  bg-pink-200 transform-[0%_50%] -rotate-180 scale-2 ">
          <div className="menu-bg-right-inner absolute w-full h-full will-change-transform"></div>
        </div>
      </div>
    </div>
  );
};

export default Safe;
