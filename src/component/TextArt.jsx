import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const TextArt = () => {
  const splits = useRef([]);
  
useGSAP(() => {
  document.fonts.ready.then(() => {
    const elements = gsap.utils.toArray(".title h1");

    elements.forEach((el) => {
      const split = SplitText.create(el, { type: "chars" });
      splits.current.push(split);

      
    });

    const titles = gsap.utils.toArray(".title");

    titles.forEach((title, i) => {
      const titleContainer = title.querySelector(".title-container");
      const titleConXPos = i === 1 ? -100 : 100;
      const split = splits.current[i];
      const charCount = split.chars.length;

      ScrollTrigger.create({
        trigger: title,
        start: "top bottom",
        end: "top -25%",
        scrub: 1,
        onUpdate: (self) => {
          const titleConX = titleConXPos - self.progress * titleConXPos;
          gsap.set(titleContainer, { x: `${titleConX}%` });

          split.chars.forEach((char, id) => {
            const charStaggerIndex = i === 1 ? charCount - 1 - id : id;

            const startDelay = 0.1; 
            const available = 1 - startDelay;
            const stagger = Math.min(0.75, available * 0.75);

            const delay =
              startDelay + (charStaggerIndex / charCount) * stagger;

            const duration =
              available - (stagger * (charCount - 1)) / charCount;

            let charProgress = 0;
            if (self.progress >= delay) {
              charProgress = Math.min(
                1,
                (self.progress - delay) / duration
              );
            }

            const initY = id % 2 === 0 ? -150 : 150;
            gsap.set(char, { y: initY - charProgress * initY });
          });
        },
      });
    });
  });
}, []);


  return (
    <>
      <section className="h-screen bg-yellow-200  text-center content-center">
        <h1 className="text-black">I love</h1>
      </section>
      <section className="min-h-screen">
        <div className="title  ">
          <div className="title-container">
            <h1>Veiny ah Dih</h1>
          </div>
        </div>
        <div className="title bg-yellow-200 text-black">
          <div className="title-container">
            <h1>Big Biceps</h1>
          </div>
        </div>
        <div className="title">
          <div className="title-container">
            <h1>6ft tall</h1>
          </div>
        </div>
      </section>
      <section className="h-screen text-center content-center bg-yellow-200 text-black">
        <h1>Men</h1>
      </section>
    </>
  );
};

export default TextArt;
