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

const App = () => {
  return (
    <>
      <ReactLenis root />
      <div className="min-h-screen">
        <Physics/>
    
      </div>
    </>
  );
};

export default App;
