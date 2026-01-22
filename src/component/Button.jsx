import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Button = ({ frontText = "Enquire Now", backText = "Contact Us" }) => {
  const frontRef = useRef(null);
  const backRef = useRef(null);
  const tlRef = useRef(null);
  useGSAP(() => {
    gsap.set(backRef.current, {
      rotationX: 90,
      y: "50%",
    });
    gsap.set(frontRef.current, {
      rotationX: 0,
      y: 0,
    });
    tlRef.current = gsap.timeline({ paused: true });
    tlRef.current
      .to(
        frontRef.current,
        {
          opacity: 0,
          rotationX: 90,
          y: "-50%",
          duration: 0.5,
          ease: "power2.inOut",
        },
        0,
      )
      .to(
        backRef.current,
        {
          opacity: 1,
          rotationX: 0,
          duration: 0.5,
          y: 0,
          ease: "power2.inOut",
        },
        0,
      );
  }, []);
  const handleMouseEnter = () => {
    tlRef.current.play();
  };
  const handleMouseLeave = () => {
    tlRef.current.reverse();
  };
  return (
    <button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-48 h-12 relative outline-none overflow-hidden perspective-[1000px] rounded-lg"
    >
      <span
        ref={frontRef}
        className="absolute top-0 left-0 w-full h-full px-8 uppercase font-medium transform-3d flex items-center justify-center bg-[linear-gradient(90.84deg,_#F8A61A_0%,_#FDCE7E_103.83%)] "
      >
        {frontText}
      </span>
      <span
        ref={backRef}
        className="absolute top-0 left-0 w-full h-full px-8 uppercase font-medium  transform-3d flex items-center justify-center bg-[linear-gradient(90.84deg,_#FFD27A_0%,_#FFF1C9_103.83%)]
"
      >
        {backText}
      </span>
    </button>
  );
};

export default Button;
