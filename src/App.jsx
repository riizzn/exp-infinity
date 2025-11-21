import React from "react";
import TextImage from "./component/TextImage";
import TextArt from "./component/TextArt";
import ImgCursorTrail from "./component/ImgCursorTrail";
import ImgContainer from "./component/ImgContainer";
import Anim1 from "./revealAnimation/Anim1";
import Explosion from "./component/Explosion";
import ReactLenis from "lenis/react";

const App = () => {
  return (
    <>
      <ReactLenis root />
      <div className="min-h-screen">
        <Explosion />
      </div>
    </>
  );
};

export default App;
