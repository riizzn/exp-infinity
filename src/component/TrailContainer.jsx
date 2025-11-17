import React, { useEffect, useRef } from "react";

// Fixed, cleaned and fully working TrailContainer component
// - spelling fixes (getBoundingClientRect)
// - append img container once (outside loop)
// - push to trailRef.current (not trailContainer.current)
// - proper clip-path transitions using `transition`, not `transform`
// - robust start/stop logic and cleanup
// - nicer variable names and small defensive guards

const TrailContainer = () => {
  const trailcontRef = useRef(null);
  const animRf = useRef(null);
  const trailRef = useRef([]); // array of { element, maskLayers, imgLayers, removeTime }
  const curImageRef = useRef(0);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const interpolatedPosRef = useRef({ x: 0, y: 0 });
  const isDesktopRef = useRef(false);
  const cleanupMouseListenerRef = useRef(null);

  useEffect(() => {
    const config = {
      imageLifeSpan: 1000,
      mousThershold: 150,
      inDuration: 750,
      outDuration: 1000,
      staggerIn: 100,
      staggerOut: 25,
      slideDuration: 1000,
      slideEasing: "cubic-bezier(0.25,0.46,0.45,0.94)",
      easing: "cubic-bezier(0.87,0,0.13,1)",
    };

    const imageCount = 6;
    const images = Array.from({ length: imageCount }, (_, i) => `/images/f${i + 3}.jpg`);

    const mathUtils = {
      lerp: (x, y, a) => x * (1 - a) + y * a,
      distance: (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1),
    };

    // helpers
    const getTrailContainerRect = () => {
      const el = trailcontRef.current;
      return el ? el.getBoundingClientRect() : { left: 0, top: 0, right: 0, bottom: 0 };
    };

    const getMouseDist = () => {
      return mathUtils.distance(
        mousePosRef.current.x,
        mousePosRef.current.y,
        lastMousePosRef.current.x,
        lastMousePosRef.current.y
      );
    };

    const isInTrailContainer = (x, y) => {
      const rect = getTrailContainerRect();
      return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
    };

    const createTrailImage = () => {
      const trailContainer = trailcontRef.current;
      if (!trailContainer) return;

      const imgCont = document.createElement("div");
      imgCont.classList.add("trail-img");
      imgCont.style.position = "absolute";
      imgCont.style.pointerEvents = "none";

      const imgSrc = images[curImageRef.current];
      curImageRef.current = (curImageRef.current + 1) % imageCount;

      const rect = getTrailContainerRect();
      const startX = (interpolatedPosRef.current.x || mousePosRef.current.x) - rect.left - 87.5;
      const startY = (interpolatedPosRef.current.y || mousePosRef.current.y) - rect.top - 87.5;
      const targetX = mousePosRef.current.x - rect.left - 87.5;
      const targetY = mousePosRef.current.y - rect.top - 87.5;

      imgCont.style.left = `${startX}px`;
      imgCont.style.top = `${startY}px`;
      imgCont.style.width = `175px`;
      imgCont.style.height = `175px`;
      imgCont.style.overflow = "hidden";

      // layers
      const maskLayers = [];
      const imgLayers = [];

      for (let i = 0; i < 10; i++) {
        const layer = document.createElement("div");
        layer.classList.add("mask-layer");
        // ensure layer fills the image container
        layer.style.position = "absolute";
        layer.style.top = "0";
        layer.style.left = "0";
        layer.style.width = "100%";
        layer.style.height = "100%";
        layer.style.overflow = "hidden";

        const imageLayer = document.createElement("div");
        imageLayer.classList.add("img-layer");
        imageLayer.style.position = "absolute";
        imageLayer.style.top = "0";
        imageLayer.style.left = "0";
        imageLayer.style.width = "100%";
        imageLayer.style.height = "100%";
        imageLayer.style.backgroundImage = `url(${imgSrc})`;
        imageLayer.style.backgroundSize = "cover";
        imageLayer.style.backgroundPosition = "center";

        const sliceStart = i * 10; // percent
        const sliceEnd = (i + 1) * 10;

        // start with a collapsed vertical line in center
        layer.style.clipPath = `polygon(50% ${sliceStart}%, 50% ${sliceStart}%, 50% ${sliceEnd}%, 50% ${sliceEnd}%)`;
        // animate clip-path using transition
        layer.style.transition = `clip-path ${config.inDuration}ms ${config.easing}`;
        layer.style.willChange = "clip-path";

        // performance hints
        layer.style.transform = "translateZ(0)";
        layer.style.backfaceVisibility = "hidden";

        layer.appendChild(imageLayer);
        imgCont.appendChild(layer);

        maskLayers.push(layer);
        imgLayers.push(imageLayer);
      }

      // append container once
      trailContainer.appendChild(imgCont);

      // trigger move + reveal on next frame
      requestAnimationFrame(() => {
        imgCont.style.left = `${targetX}px`;
        imgCont.style.top = `${targetY}px`;
        // reveal slices with stagger from middle
        maskLayers.forEach((layer, i) => {
          const sliceStart = i * 10;
          const sliceEnd = (i + 1) * 10;
          const distFromMid = Math.abs(i - 4.5);
          const delay = distFromMid * config.staggerIn;
          setTimeout(() => {
            layer.style.clipPath = `polygon(0% ${sliceStart}%, 100% ${sliceStart}%, 100% ${sliceEnd}%, 0% ${sliceEnd}%)`;
          }, delay);
        });
      });

      trailRef.current.push({
        element: imgCont,
        maskLayers,
        imgLayers,
        removeTime: Date.now() + config.imageLifeSpan,
      });
    };

    const removeOldImages = () => {
      const now = Date.now();
      if (trailRef.current.length === 0) return;
      const oldestImg = trailRef.current[0];
      if (now >= oldestImg.removeTime) {
        const imgToRemove = trailRef.current.shift();
        // animate hide
        imgToRemove.maskLayers.forEach((layer, i) => {
          const sliceStart = i * 10;
          const sliceEnd = (i + 1) * 10;
          const distFromEdge = 4.5 - Math.abs(i - 4.5);
          const delay = distFromEdge * config.staggerOut;
          // set leaving transition
          layer.style.transition = `clip-path ${config.outDuration}ms ${config.easing}`;
          setTimeout(() => {
            layer.style.clipPath = `polygon(50% ${sliceStart}%, 50% ${sliceStart}%, 50% ${sliceEnd}%, 50% ${sliceEnd}%)`;
          }, delay);
        });

        imgToRemove.imgLayers.forEach((imageLayer) => {
          imageLayer.style.transition = `opacity ${config.outDuration}ms ${config.easing}`;
          imageLayer.style.opacity = "0.25";
        });

        // finally remove from DOM after out animation
        setTimeout(() => {
          if (imgToRemove.element.parentNode) imgToRemove.element.parentNode.removeChild(imgToRemove.element);
        }, config.outDuration + 100);
      }
    };

    const render = () => {
      if (!isDesktopRef.current) return;
      const distance = getMouseDist();

      interpolatedPosRef.current.x = mathUtils.lerp(
        interpolatedPosRef.current.x || mousePosRef.current.x,
        mousePosRef.current.x,
        0.1
      );
      interpolatedPosRef.current.y = mathUtils.lerp(
        interpolatedPosRef.current.y || mousePosRef.current.y,
        mousePosRef.current.y,
        0.1
      );

      if (
        distance > config.mousThershold &&
        isInTrailContainer(mousePosRef.current.x, mousePosRef.current.y)
      ) {
        createTrailImage();
        lastMousePosRef.current = { ...mousePosRef.current };
      }

      removeOldImages();
      animRf.current = requestAnimationFrame(render);
    };

    // mouse handler and lifecycle control
    const handleMouseMove = (e) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const startAnim = () => {
      if (!isDesktopRef.current) return null;
      document.addEventListener("mousemove", handleMouseMove);
      animRf.current = requestAnimationFrame(render);
      return () => document.removeEventListener("mousemove", handleMouseMove);
    };

    const stopAnim = () => {
      if (animRf.current) {
        cancelAnimationFrame(animRf.current);
        animRf.current = null;
      }
      // remove all trail elements from DOM
      trailRef.current.forEach((item) => {
        if (item.element.parentNode) item.element.parentNode.removeChild(item.element);
      });
      trailRef.current.length = 0;
    };

    // resize watcher
    const handleResize = () => {
      const wasDesktop = isDesktopRef.current;
      isDesktopRef.current = window.innerWidth > 1000;

      if (isDesktopRef.current && !wasDesktop) {
        // became desktop
        cleanupMouseListenerRef.current = startAnim();
      } else if (!isDesktopRef.current && wasDesktop) {
        // left desktop
        stopAnim();
        if (cleanupMouseListenerRef.current) {
          cleanupMouseListenerRef.current();
          cleanupMouseListenerRef.current = null;
        }
      }
    };

    // init
    isDesktopRef.current = window.innerWidth > 1000;
    window.addEventListener("resize", handleResize);
    if (isDesktopRef.current) cleanupMouseListenerRef.current = startAnim();

    // cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      if (cleanupMouseListenerRef.current) cleanupMouseListenerRef.current();
      stopAnim();
    };
  }, []);

  return <div ref={trailcontRef} className="trail-container"></div>;
};

export default TrailContainer;
