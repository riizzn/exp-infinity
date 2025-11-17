import React from "react";
import ImgCursor from "./ImgCursor";

const ImgContainer = () => {
  return (
    <section className="h-screen flex items-center justify-center overflow-hidden relative">
      <div className="h-full w-full absolute opacity-35 ">
        <img src="/images/hero.jpg" alt="hero" />
       
      </div>
       <ImgCursor />
    </section>
  );
};

export default ImgContainer;
