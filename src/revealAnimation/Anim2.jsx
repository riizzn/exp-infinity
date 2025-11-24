import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Anim2 = () => {
  const pinned = useRef(null);
  const whitespace = useRef(null);
  const header = useRef(null);
  const revealer = useRef(null);
  const revealer1 = useRef(null);
  const revealer2 = useRef(null);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: pinned.current,
      start: "top top",
      endTrigger: whitespace.current,
      end: "bottom top",
      pin: true,
      pinSpacing: false,
    });
    ScrollTrigger.create({
      trigger: header.current,
      start: "top top",
      endTrigger: whitespace.current,
      end: "bottom top",
      pin: true,
      pinSpacing: false,
    });
    ScrollTrigger.create({
      trigger: pinned.current,
      start: "top top",
      endTrigger: header.current,
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        const rotation = self.progress * 360;
        gsap.to(revealer.current, { rotation });
      },
    });
    ScrollTrigger.create({
      trigger: pinned.current,
      start: "top top",
      endTrigger: header.current,
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const clipPath = `polygon(
        ${45 - 45 * progress}% ${0 + 0 * progress}%,
         ${55 + 45 * progress}% ${0 + 0 * progress}%,
          ${55 + 45 * progress}% ${100 + 0 * progress}%,
           ${45 - 45 * progress}% ${100 + 0 * progress}%
        )`;
        gsap.set([revealer1.current, revealer2.current], {
          clipPath: clipPath,
        
        });
      },
    });
    ScrollTrigger.create({
      trigger: header.current,
      start: "top top",
      end: "bottom 50%",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const left = 35 + 15 * progress;
        gsap.to(revealer.current, {
          left: `${left}%`,
          ease: "none",
          duration: 0,
        });
      },
    });
    ScrollTrigger.create({
      trigger: whitespace.current,
      start: "top 50%",
      bottom: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        const scale = 1 + 12* self.progress
        gsap.to(revealer.current, {
          scale: scale,
          ease: "none",
          duration: 0,
        });
      },
    });
  }, []);

  return (
    <div className="min-h-screen">
      <section className="hero bg-[url(images/hero.jpg)] bg-no-repeat bg-cover ">
        <h1 className=" text-white uppercase font-bold text-[20vh] tracking-tighter font-stack ">
          Socipathy
        </h1>
      </section>
      <section className="h-screen w-full bg-black">
        <div className=" flex justify-start items-center">
          <h1 className="text-white uppercase font-bold text-[20vh] tracking-tighter font-stack p-5 ">
            Useless
          </h1>
        </div>
        <div className="flex justify-end items-center">
          <h1 className="text-white uppercase font-bold text-[20vh] tracking-tighter font-stack items-end p-5 ">
            Emotions
          </h1>
        </div>
      </section>
      <section
        ref={header}
        className="relative w-full h-screen flex flex-col gap-50 bg-black p-5 "
      >
        <p className="text-lg text-white font-manrope ">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur
          illo quod natus delectus eligendi enim dignissimos vitae magnam, sequi
          unde autem.
        </p>
        <div className="flex justify-between h-full">
          <div className="w-full h-[250px] p-1 ">
            <img
              src="/images/e1.jpg"
              alt="img"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full h-[250px] p-1">
            <img
              src="/images/e2.jpg"
              alt="img"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full h-[250px] p-1">
            <img src="/images/e3.jpg" alt="img" />
          </div>
          <div className="w-full h-[250px] p-1">
            <img src="/images/e4.jpg" alt="img" />
          </div>
        </div>
      </section>
      <section
        ref={whitespace}
        className="relative w-full h-[300vh] bg-white z-[-1]"
      >
        
      </section>
      <section
        ref={pinned}
        className="absolute top-[100vh] w-full h-[250vh] z-2"
      >
        <div
          ref={revealer}
          className="absolute translate-x-[-50%] left-[35%] mt-[325px] w-[120px] h-[120px]"
        >
          <div
            ref={revealer1}
            className="absolute  top-0 left-0 w-full h-full rotate-0 bg-white"
            style={{ clipPath: "polygon(45% 0%, 55% 0%, 55% 100%, 45% 100%)" }}
          ></div>
          <div
            ref={revealer2}
            style={{ clipPath: "polygon(45% 0%, 55% 0%, 55% 100%, 45% 100%)" }}
            className=" absolute top-0   left-0 w-full h-full bg-white rotate-90  "
          ></div>
        </div>
      </section>
      <section className="relative w-full h-[150vh] bg-white z-10">
        <h1 className="text-7xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
          dolores id, obcaecati reprehenderit omnis architecto! Quasi asperiores
          doloremque itaque neque, aliquid amet voluptatum fugiat? Pariatur unde
          libero amet voluptate molestias.
        </h1>
      </section>
    </div>
  );
};

export default Anim2;
