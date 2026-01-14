import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Matter from "matter-js";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const objectNames = [
  "Malevolent",
  "Obsidian",
  "Paranoia",
  "Ruthless",
  "Voidborne",
  "Neurosis",
  "Predatory",
  "Anathema",
  "Deranged",
  "Cataclysm",
];

const Physics = () => {
  const engineRef = useRef(null);
  const runnerRef = useRef(null);
  const mouseConstraintRef = useRef(null);
  const bodiesRef = useRef([]);
  const topWallRef = useRef(null);
  const containerRef = useRef(null);
  const objectRef = useRef([]);
  const sectionRef = useRef(null);
  const animationFrameRef = useRef(null);

  const animateOnScroll = true;
  const config = {
    gravity: { x: 0, y: 1 },
    restitution: 0.5,
    friction: 0.15,
    frictionAir: 0.02,
    density: 0.002,
    wallThickness: 200,
    mouseStiffness: 0.6,
  };

  const clamp = (val, min, max) => {
    return Math.max(min, Math.min(max, val));
  };

  useEffect(() => {
    let hasInitialized = false;

    const initPhysics = () => {
      if (hasInitialized || !containerRef.current) return;
      hasInitialized = true;

      //Create engine 
      engineRef.current = Matter.Engine.create();
      const engine = engineRef.current;
      
      engine.gravity = config.gravity;
      engine.constraintIterations = 10;
      engine.positionIterations = 20;
      engine.velocityIterations = 16;
      engine.timing.timeScale = 1;

      const containerRect = containerRef.current.getBoundingClientRect();
      const wallThickness = config.wallThickness;

      // Create walls
      const walls = [
        // Bottom
        Matter.Bodies.rectangle(
          containerRect.width / 2,
          containerRect.height + wallThickness / 2,
          containerRect.width + wallThickness * 2,
          wallThickness,
          { isStatic: true }
        ),
        // Left
        Matter.Bodies.rectangle(
          -wallThickness / 2,
          containerRect.height / 2,
          wallThickness,
          containerRect.height + wallThickness * 2,
          { isStatic: true }
        ),
        // Right
        Matter.Bodies.rectangle(
          containerRect.width + wallThickness / 2,
          containerRect.height / 2,
          wallThickness,
          containerRect.height + wallThickness * 2,
          { isStatic: true }
        ),
      ];
      
      Matter.World.add(engine.world, walls);

      // Create bodies from DOM elements
      objectRef.current.forEach((obj, index) => {
        if (!obj) return;
        
        const objRect = obj.getBoundingClientRect();
        const startX =
          Math.random() * (containerRect.width - objRect.width) +
          objRect.width / 2;
        const startY = -500 - index * 200;
        const startRotation = (Math.random() - 0.5) * Math.PI;

        const body = Matter.Bodies.rectangle(
          startX,
          startY,
          objRect.width,
          objRect.height,
          {
            restitution: config.restitution,
            friction: config.friction,
            frictionAir: config.frictionAir,
            density: config.density,
          }
        );
        
        Matter.Body.setAngle(body, startRotation);
        bodiesRef.current.push({
          body: body,
          element: obj,
          width: objRect.width,
          height: objRect.height,
        });
      });

      Matter.World.add(
        engine.world,
        bodiesRef.current.map((item) => item.body)
      );

      // Add top wall after delay
      setTimeout(() => {
        topWallRef.current = Matter.Bodies.rectangle(
          containerRect.width / 2,
          -wallThickness / 2,
          containerRect.width + wallThickness * 2,
          wallThickness,
          { isStatic: true }
        );
        Matter.World.add(engine.world, topWallRef.current);
      }, 3000);

      // Create mouse constraint
      const mouse = Matter.Mouse.create(containerRef.current);
      mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
      mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

    
      mouseConstraintRef.current = Matter.MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: config.mouseStiffness,
          render: { visible: false },
        },
      });

      mouseConstraintRef.current.mouse.element.oncontextmenu = () => false;

      // Drag handling
      let dragging = null;
      let originalInertia = null;

      Matter.Events.on(mouseConstraintRef.current, "startdrag", function (event) {
        dragging = event.body;
        if (dragging) {
          originalInertia = dragging.inertia;
         
          Matter.Body.setInertia(dragging, Infinity);
          Matter.Body.setVelocity(dragging, { x: 0, y: 0 });
          Matter.Body.setAngularVelocity(dragging, 0);
        }
      });

      Matter.Events.on(mouseConstraintRef.current, "enddrag", function (event) {
        if (dragging) {
          Matter.Body.setInertia(dragging, originalInertia || 1);
          dragging = null;
          originalInertia = null;
        }
      });

      Matter.Events.on(engine, "beforeUpdate", function () {
        if (dragging) {
          const found = bodiesRef.current.find((b) => b.body === dragging);
          if (found) {
            const minX = found.width / 2;
            const maxX = containerRect.width - found.width / 2;
            const minY = found.height / 2;
            const maxY = containerRect.height - found.height / 2;

            Matter.Body.setPosition(dragging, {
              x: clamp(dragging.position.x, minX, maxX),
              y: clamp(dragging.position.y, minY, maxY),
            });
            Matter.Body.setVelocity(dragging, {
              x: clamp(dragging.velocity.x, -20, 20),
              y: clamp(dragging.velocity.y, -20, 20),
            });
          }
        }
      });

      containerRef.current.addEventListener("mouseleave", () => {
        if (mouseConstraintRef.current) {
          mouseConstraintRef.current.constraint.bodyB = null;
          mouseConstraintRef.current.constraint.pointB = null;
        }
      });

      document.addEventListener("mouseup", () => {
        if (mouseConstraintRef.current) {
          mouseConstraintRef.current.constraint.bodyB = null;
          mouseConstraintRef.current.constraint.pointB = null;
        }
      });

     
      Matter.World.add(engine.world, mouseConstraintRef.current);

      
      runnerRef.current = Matter.Runner.create();
      Matter.Runner.run(runnerRef.current, engine);

      updatePositions();
    };

    function updatePositions() {
      if (!containerRef.current || bodiesRef.current.length === 0) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      
      bodiesRef.current.forEach(({ body, element, width, height }) => {
        const x = body.position.x - width / 2;
        const y = Math.min(
          body.position.y - height / 2,
          containerRect.height - height
        );

        element.style.left = x + "px";
        element.style.top = y + "px";
        element.style.transform = `rotate(${body.angle}rad)`;
      });

      animationFrameRef.current = requestAnimationFrame(updatePositions);
    }


    if (animateOnScroll) {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        once: true,
        onEnter: () => {
          initPhysics();
        },
      });
    } else {
    
      initPhysics();
    }

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (runnerRef.current && engineRef.current) {
        Matter.Runner.stop(runnerRef.current);
        Matter.Engine.clear(engineRef.current);
      }
      bodiesRef.current = [];
    };
  }, []);

  return (
    <>
      <section className="hero text-white w-full h-svh p-8 overflow-hidden flex items-center justify-center">
        <h1 className="w-[45%] max-lg:w-full text-center text-[4rem] max-lg:text-[2rem] font-bold tracking-tight leading-none">
          Release some anger and gain some mental clarity
        </h1>
      </section>
      
      {/* ✅ FIX 9: Changed useRef to ref */}
      <section
        ref={sectionRef}
        className="footer bg-white text-black w-full h-svh relative"
      >
        <div ref={containerRef} className="object-container absolute inset-0">
          {objectNames.map((name, index) => (
            <div
              ref={(el) => (objectRef.current[index] = el)}
              key={name}
              className="object absolute bg-black text-white px-6 py-3 rounded-lg font-semibold cursor-grab active:cursor-grabbing select-none"
              style={{ transformOrigin: 'center center' }}
            >
              <p>{name}</p>
            </div>
          ))}
        </div>
        
        <div className="footer-content absolute top-0 left-0 w-full h-full p-8 flex justify-center items-center pointer-events-none z-10">
          <h1 className="w-[45%] max-lg:w-full text-center text-[4rem] font-bold tracking-tight leading-none pointer-events-auto max-lg:text-[2rem]">
            Its ok to be evil
          </h1>
        </div>
      </section>
    </>
  );
};

export default Physics;