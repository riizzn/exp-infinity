import React from "react";
import Spotlight from "./Spotlight";

const Explosion = () => {

  return (
    <>
      <section className="h-screen w-full bg-amber-50 text-center content-center  ">
       <h1 className="capitalize font-instrument text-4xl tracking-tight"> Lets get sucked in to this magical Black hole</h1>
      </section>
      <Spotlight/>
      
      <section className="h-screen w-full bg-amber-50 text-center content-center ">
        
        <h1 className="capitalize font-instrument text-4xl tracking-tight"> You are mesmerized by the beauty.</h1>
      </section>
    </>
  );
};

export default Explosion;
