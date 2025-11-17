import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";
gsap.registerPlugin(useGSAP);

const images =[
    "/images/f3.jpg",
    "/images/f4.jpg",
    "/images/f5.jpg",
    "/images/f6.jpg",
    "/images/f7.jpg",
    "/images/f8.jpg",
    "/images/f3.jpg",
]

const ImgCursor = () => {
  const containerRef = useRef(null);
  const count = 6;
  const lastpos = useRef({ x: 0, y: 0 });

  const threshold = 60;
  const imgIndex = useRef(0);
  const images = Array.from(
    { length: count },
    (_, i) => `/images/f${i + 3}.jpg`
  );

  useGSAP(() => {
    const createTrail = (x, y) => {
      const container = containerRef.current;
      if (!container) return;

      const img = document.createElement("img");
      img.classList.add("image-trail");
      img.src = images[imgIndex.current];
      container.appendChild(img);

      imgIndex.current = (imgIndex.current + 1) % count;

      gsap.set(img, {
        x,
        y,
        scale: 0,
        opacity: 0,
        rotation: gsap.utils.random(-20, 20),
      });

      gsap.to(img, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });

      gsap.to(img, {
        scale: 0.2,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "power2.in",
        onComplete: () => img.remove(),
      });
    };

    const onMove = (e) => {
      const dx = e.clientX - lastpos.current.x;
      const dy = e.clientY - lastpos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > threshold) {
        createTrail(e.clientX, e.clientY);
      }

      lastpos.current.x = e.clientX;
      lastpos.current.y = e.clientY;
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute w-full h-full  overflow-hidden  z-2"
    />
  );
};

export default ImgCursor;
