import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const Spotlight = () => {
  const imagesRef = useRef([]);
  const cover = useRef(null);
  const intro = useRef(null);

  const outro = useRef(null);
  const spotlight = useRef(null);
  const images = Array.from({ length: 20 }, (_, i) => `images/e${i + 1}.jpg`);
  useGSAP(() => {
    const introSplit = SplitText.create(intro.current, { type: "words" });
    const outroSplit = SplitText.create(outro.current, { type: "words" });
    gsap.set(introSplit.words, { opacity: 1 });
    gsap.set(outroSplit.words, { opacity: 0 });
   const scatterDirections = [
  { x: 1.2, y: 0.6 },
  { x: -1.4, y: 1.1 },
  { x: 0.9, y: -1.3 },
  { x: -1.6, y: -0.7 },
  { x: 0.5, y: 1.4 },
  { x: -0.8, y: -1.2 },
  { x: 1.5, y: 0.2 },
  { x: -0.6, y: 1.6 },
  { x: 1.1, y: -1.5 },
  { x: -1.3, y: 0.8 },
  { x: 1.7, y: -0.4 },
  { x: -0.9, y: -1.7 },
  { x: 0.7, y: 1.8 },
  { x: -1.8, y: 0.3 },
  { x: 0.8, y: -1.8 },
  { x: -0.5, y: 1.9 },
  { x: 1.6, y: -0.9 },
  { x: -1.2, y: -1.1 },
  { x: 0.4, y: 1.9 },
  { x: 1.3, y: -0.5 },
];
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const isMobile = screenWidth < 1000;
    const scatterMultiplier = isMobile ? 2.5 : 0.5;
    const startPos = images.map(() => ({
      x: 0,
      y: 0,
      z: -1000,
      scale: 0,
    }));

    const endPos = scatterDirections.map((dir) => ({
      x: dir.x * screenWidth * scatterMultiplier,
      y: dir.y * screenHeight * scatterMultiplier,
      z: 2000,
      scale: 1,
    }));
    imagesRef.current.forEach((img, index) => {
      gsap.set(img, startPos[index]);
    });
    gsap.set(cover.current, {
      x: 0,
      y: 0,
      z: -1000,
      scale: 0,
    });
    ScrollTrigger.create({
      trigger: spotlight.current,
      start: "top top",
      end: `+=${screenHeight * 4}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        imagesRef.current.forEach((img, index) => {
          const stagger = index * 0.03;
          const scaleMultiplier = isMobile ? 4 : 2;
          let imageProgress = Math.max(0, (progress - stagger) * 4);
          const start = startPos[index];
          const end = endPos[index];
          const zValue = gsap.utils.interpolate(start.z, end.z, imageProgress);
          const scaleValue = gsap.utils.interpolate(
            start.scale,
            end.scale,
            imageProgress * scaleMultiplier
          );
          const xValue = gsap.utils.interpolate(start.x, end.x, imageProgress);
          const yValue = gsap.utils.interpolate(start.y, end.y, imageProgress);
          gsap.set(img, {
            z: zValue,
            scale: scaleValue,
            x: xValue,
            y: yValue,
          });
        });
        const coverProgress = Math.max(0, (progress - 0.7) * 4);
        const coverZvalue = -1000 + 1000 * coverProgress;
        const coverScaleValue = Math.min(1, coverProgress * 1.5);
        gsap.set(cover.current, {
          z: coverZvalue,
          scale: coverScaleValue,
          x: 0,
          y: 0,
        });
        if (introSplit && introSplit.words.length > 0) {
          if (progress >= 0.6 && progress <= 0.75) {
            const introFade = (progress - 0.6) / 0.15;
            const totalWords = introSplit.words.length;
            introSplit.words.forEach((word, index) => {
              const wordFadeProgress = index / totalWords;
              const fadeRange = 0.1;
              if (introFade >= wordFadeProgress + fadeRange) {
                gsap.set(word, { opacity: 0 });
              } else if (introFade <= wordFadeProgress) {
                gsap.set(word, { opacity: 1 });
              } else {
                const wordOpacity =
                  1 - (introFade - wordFadeProgress) / fadeRange;
                gsap.set(word, { opacity: wordOpacity });
              }
            });
          } else if (progress < 0.6) {
            gsap.set(introSplit.words, { opacity: 1 });
          }else if(progress>0.75){
            gsap.set(introSplit.words,{opacity:0})
          }
        }
         if (outroSplit && outroSplit.words.length > 0) {
          if (progress >= 0.8 && progress <= 0.95) {
            const outroFade = (progress - 0.8) / 0.15;
            const totalWords = outroSplit.words.length;
            outroSplit.words.forEach((word, index) => {
              const wordFadeProgress = index / totalWords;
              const fadeRange = 0.1;
              if (outroFade >= wordFadeProgress + fadeRange) {
                gsap.set(word, { opacity: 1 });
              } else if (outroFade <= wordFadeProgress) {
                gsap.set(word, { opacity: 0 });
              } else {
                const wordOpacity =
                  (outroFade - wordFadeProgress) / fadeRange;
                gsap.set(word, { opacity: wordOpacity });
              }
            });
          } else if (progress < 0.8) {
            gsap.set(outroSplit.words, { opacity: 0 });
          }else if(progress>0.95){
            gsap.set(outroSplit.words,{opacity:1})
          }
        }
      },
    });
  }, []);

  return (
    <section
      ref={spotlight}
      className="h-screen w-full text-amber-50 bg-black relative overflow-hidden "
    >
      <div className="w-full h-full absolute top-0 left-0 transform-3d perspective-[2000px] ">
        {images.map((img, i) => (
          <div
            key={i}
            ref={(el) => (imagesRef.current[i] = el)}
            className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[500px] h-[350px] will-change-transform"
          >
            <img src={img} alt="image" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
      <div
        ref={cover}
        className="will-change-transform w-full h-full absolute top-0 left-0 "
      >
        <img
          src="/images/e21.jpg"
          alt="image"
          className="w-full h-full object-cover"
        />
      </div>
      <div
        ref={intro}
        className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[50%] text-center z-1"
      >
        <h1 className="capitalize font-instrument text-4xl tracking-tight">
          Find beauty in the ordinary.
        </h1>
      </div>
      <div
        ref={outro}
        className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[50%] text-center z-10"
      >
        <h1 className="capitalize font-instrument text-4xl tracking-tight">
          Even the smallest flowers carry the scent of wonder.
        </h1>
      </div>
    </section>
  );
};

export default Spotlight;
