import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, SplitText);

const Anim1 = () => {
  const p1 = useRef(null);
  const p2 = useRef(null);
  const navRef = useRef(null);
  const heroRef = useRef(null);
  const heroImgRef = useRef(null);
  const counterRef = useRef(null);
  const preloader = useRef(null);
  const preloaderCont = useRef(null);

  useGSAP(() => {
    const splitTextintoLines = (ref, options = {}) => {
      const defaults = {
        type: "lines",
        mask: "lines",
        linesClass: "line",
        ...options,
      };
      return SplitText.create(ref, defaults);
    };
    document.fonts.ready.then(() => {
      splitTextintoLines(p1.current);
      splitTextintoLines(p2.current);
      splitTextintoLines(counterRef.current);
      gsap.set([navRef.current, heroRef.current, heroImgRef.current], {
        y: "35svh",
      });
      const animateCounter = (selector, delay = 0, duration = 5) => {
        const counterElement = selector;
        const maxDuration = duration * 1000;
        const updateInterval = 200;
        let currentValue = 0;
        const startTime = Date.now();

        const updateCounter = () => {
          const elapsedTime = Date.now() - startTime;
          const progress = elapsedTime / maxDuration;
          if (currentValue < 100 && elapsedTime < maxDuration) {
            const target = Math.floor(progress * 100);
            const jump = Math.floor(Math.random() * 25) + 5;
            currentValue = Math.min(currentValue + jump, target, 100);
            counterElement.textContent = currentValue
              .toString()
              .padStart(2, "0");
            setTimeout(updateCounter, updateInterval + Math.random() * 100);
          } else {
            counterElement.textContent = "100";
          }
        };
        setTimeout(() => {
          updateCounter();
        }, delay * 1000);
      };

      animateCounter(counterRef.current, 2, 4.5);

      const tl = gsap.timeline();
      tl.to(".line", {
        y: "0%",
        duration: 1,
        stagger: 0.075,
        ease: "power3.out",
        delay: 1,
      })
        .to(
          preloader.current,
          {
            scale: 0.1,
            duration: 0.75,
            ease: "power2.out",
          },
          "<"
        )
        .to(preloader.current, {
          scale: 0.25,
          duration: 0.75,
          ease: "power2.out",
        })
        .to(preloader.current, {
          scale: 0.5,
          duration: 0.75,
          ease: "power2.out",
        })
        .to(preloader.current, {
          scale: 0.7,
          duration: 0.75,
          ease: "power3.out",
        })
        .to(preloader.current, {
          scale: 1,
          duration: 0.75,
          ease: "power3.out",
        })
        .to(
          preloaderCont.current,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 1.25,
            ease: "power3.out",
          },
          "-=1"
        ).to([navRef.current, heroRef.current, heroImgRef.current],{
            y:"0%",
            duration:1.25,
             ease: "power3.out",

        },'<')
    });
  }, []);
  return (
    <div className="min-h-screen font-plex">
      <div
        ref={preloaderCont}
        style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
        className=" absolute flex items-center top-0 left-0 w-full h-screen text-white bg-black overflow-hidden z-2 px-5 "
      >
        <div
          ref={preloader}
          className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] bg-blue-700 w-full z-2 aspect-[1] scale-0"
        ></div>
        <div className="preloader-copy ">
          <div className="w-[500px]">
            <p
              ref={p1}
              className="uppercase text-sm tracking-tighter font-semibold  "
            >
              Handpicked to perfect , this is the dopest thing you will ever
              come across in your lifetime
            </p>
          </div>
          <div className="w-[450px]">
            <p
              ref={p2}
              className="uppercase text-sm tracking-tighter font-semibold"
            >
              It will never happen again. Or will it? We will have to find out
              ...
            </p>
          </div>
        </div>
        <div className="preloader-counter">
          <p ref={counterRef}>00</p>
        </div>
      </div>
      <nav ref={navRef} className=" nav">
        <h2>Brand</h2>
        <h2>Links</h2>
        <h2>Cta</h2>
      </nav>
      <section ref={heroRef} className="hero-sec">
        <div ref={heroImgRef} className="hero-sec-img">
          <img
            src="images/hero2.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </section>
    </div>
  );
};

export default Anim1;
