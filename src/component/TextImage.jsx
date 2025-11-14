import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, SplitText);
const galleryImages = [
  "/images/f3.jpg",
  "/images/f4.jpg",
  "/images/f5.jpg",
  "/images/f6.jpg",
  "/images/f7.jpg",
  "/images/f8.jpg",
];
const names = ["love", "empathy", "cruelty", "sadness", "lust", "anger"];
const TextImage = () => {
  const textRef = useRef([]);
  const defaultRef = useRef(null);
  const splitRef = useRef([]);
  const defaultSplit = useRef(null);
  const imageRef = useRef([]);
  useGSAP(() => {
    defaultSplit.current = SplitText.create(defaultRef.current, {
      type: "chars",
    });
    gsap.set(defaultSplit.current.chars, { y: "0%" });
    textRef.current.forEach((el, i) => {
      if (!el) return;
      splitRef.current[i] = SplitText.create(el, { type: "chars" });
      gsap.set(splitRef.current[i].chars, { y: "100%" });
    });
  }, []);
  const onEnter = (id) => {
    const split = splitRef.current[id];

    const image=imageRef.current[id]
    gsap.killTweensOf(split.chars);
    gsap.killTweensOf(defaultSplit.current.chars);
    gsap.killTweensOf(imageRef.current)
    gsap.to(split.chars, {
      y: "0%",
      duration: 0.5,
      stagger: { each: 0.025, from: "center" },
      ease: "power4.out",
    });
    gsap.to(defaultSplit.current.chars, {
      y: "-100%",
      duration: 0.5,
      stagger: { each: 0.025, from: "center" },
      ease: "power4.out",
    });
    gsap.to(image, {
      width:200,
      height:200,
      duration:0.5,
       ease: "power4.out",
    })
  };
  const onLeave = (id) => {
     const image=imageRef.current[id]
    const split = splitRef.current[id];
    gsap.killTweensOf(split.chars);
    gsap.killTweensOf(defaultSplit.current.chars);
     gsap.killTweensOf(imageRef.current)
    gsap.to(split.chars, {
      y: "100%",
      duration: 0.75,
      stagger: { each: 0.025, from: "center" },
      ease: "power4.out",
    });
    gsap.to(defaultSplit.current.chars, {
      y: "0%",
      duration: 0.75,
      stagger: { each: 0.025, from: "center" },
      ease: "power4.out",
    });
     gsap.to(image, {
      width:100,
      height:100,
      duration:0.5,
      ease: "power4.out",
    })
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-10 overflow-hidden">
      <div className=" max-w-max flex items-center justify-center mx-auto">
        {galleryImages.map((img, i) => (
          <div
          ref={(el) => (imageRef.current[i] = el)}
            onMouseEnter={() => onEnter(i)}
            onMouseLeave={() => onLeave(i)}
            key={`image-${i}`}
            className=" w-[100px] h-[100px] cursor-pointer p-5 "
          >
            <img src={img} className="w-full h-full object-cover rounded-sm " />
          </div>
        ))}
      </div>
      <div
        style={{ clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0% 100%)" }}
        className="  relative w-full h-[260px]  overflow-hidden "
      >
        <div className=" font-bold tracking-tighter w-full absolute uppercase text-center text-[200px] text-white">
          <h1 ref={defaultRef} className=" ">
            Emotions
          </h1>
        </div>

        {names.map((name, i) => (
          <div
            key={i}
            className="font-bold tracking-tighter w-full absolute uppercase text-center text-[200px] text-violet-400"
          >
            <h1 ref={(el) => (textRef.current[i] = el)} className=" ">
              {name}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextImage;
