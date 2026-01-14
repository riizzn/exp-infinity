import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { Flip } from "gsap/Flip";

gsap.registerPlugin(useGSAP, Flip);

const Flipp = () => {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const switchLayout = (layoutNumber) => {
  if (!sectionRef.current) return;

  const state = Flip.getState("[data-flip-id]");
  sectionRef.current.dataset.layout = layoutNumber;

  Flip.from(state, {
    duration: 1.2,
    ease: "expo.inOut",
    absolute: true,
    stagger: 0.05,
  });
};
 

  return (
    <main ref={containerRef} className="bg-black relative p-5 text-white">
      <section
        ref={sectionRef}
        className="grid-layout h-[90svh] w-full py-4"
        data-layout="1"
      >
        <div className="absolute z-10 flex flex-col gap-4 self-center text-sm font-light">
          <div
            onClick={() => switchLayout("1")}
            data-btn-layout="1"
            className="flex size-8 cursor-pointer items-center justify-center border-[1px] text-white border-white/20 transition-all duration-300 hover:bg-white hover:text-black"
          >
            1
          </div>
          <div
            onClick={() => switchLayout("2")}
            data-btn-layout="2"
            className="flex size-8 cursor-pointer items-center justify-center border-[1px] text-white border-white/20 transition-all duration-300 hover:bg-white hover:text-black"
          >
            2
          </div>
          <div
            onClick={() => switchLayout("3")}
            data-btn-layout="3"
            className="flex size-8 cursor-pointer items-center justify-center border-[1px] text-white border-white/20 transition-all duration-300 hover:bg-white hover:text-black"
          >
            3
          </div>
        </div>

        <h4
          data-flip-id="logo"
          className="text-[200px] text-white tracking-tighter font-bold"
        >
          z.studio
        </h4>

        <div data-flip-id="menu" className="flex flex-col gap-2">
          <div className="h-px w-10 bg-white/80"></div>
          <div className="h-px w-10 bg-white/80"></div>
        </div>

        {/* IMAGE CARD */}
        <div data-flip-id="image-card" className="relative w-full">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-lg">See projects</p>

              <div className="flex size-8 items-center justify-center bg-white">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 12L14 5V9H3.8C3.51997 9 3.37996 9 3.273 9.0545C3.17892 9.10243 3.10243 9.17892 3.0545 9.273C3 9.37996 3 9.51997 3 9.8V14.2C3 14.48 3 14.62 3.0545 14.727C3.10243 14.8211 3.17892 14.8976 3.273 14.9455C3.37996 15 3.51997 15 3.8 15H14V19L21 12Z"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <img
              src="/images/e14.jpg"
              alt="image"
              width={1200}
              height={800}
              className="aspect-[3/2] w-full object-cover object-bottom"
            />
          </div>
        </div>

        <p data-flip-id="paragraph" className="paragraph font-medium">
          Creating tailored solution at the interaction of design and technology
        </p>
      </section>

      <div className="grid-overlay z-1">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="block h-full w-full bg-[#26262626]"></div>
        ))}
      </div>
    </main>
  );
};

export default Flipp;
