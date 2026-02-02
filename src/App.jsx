import React from "react";
import TextImage from "./component/TextImage";
import TextArt from "./component/TextArt";
import ImgCursorTrail from "./component/ImgCursorTrail";
import ImgContainer from "./component/ImgContainer";
import Anim1 from "./revealAnimation/Anim1";
import Explosion from "./component/Explosion";
import ReactLenis from "lenis/react";
import Anim2 from "./revealAnimation/Anim2";
import Flip from "./component/Flip";
import Physics from "./component/Physics";
import Button from "./component/Button";
import TestButton from "./component/TestButton";
import B2 from "./component/B2";
import Infinte from "./component/Infinte";
import { GlowBorder } from "./component/GlowBorder";
import GlowCard from "./component/GlowCard";
import InvertedBorder from "./component/InvertedBorder";
import ClipPath from "./component/ClipPath";
import Clipcard from "./component/Clipcard";
import Features from "./component/Features";
import GradientBackground from "./component/GradientBackground";

const App = () => {
  return (
    <>
      <ReactLenis root />

      <div className=" relative  min-h-screen  ">
       <GradientBackground/>
       hi
      </div>
    </>
  );
};

export default App;
