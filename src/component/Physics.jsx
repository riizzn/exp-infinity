"use client";

import React, { useEffect, useRef } from "react";
import Matter from "matter-js";

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
  const containerRef = useRef(null);
  const objectRef = useRef([]);
  const engineRef = useRef(null);
  const runnerRef = useRef(null);
  const mouseConstraintRef = useRef(null);
  const bodiesRef = useRef([]);

  const config = {
    gravity: { x: 0, y: 1 },
    restitution: 0.5,
    friction: 0.15,
    frictionAir: 0.02,
    density: 0.002,
    wallThickness: 200,
    mouseStiffness: 0.6,
  };

  useEffect(() => {
    if (!containerRef.current) return;

    /* ---------------- ENGINE ---------------- */
    const engine = Matter.Engine.create();
    engine.gravity.x = config.gravity.x;
    engine.gravity.y = config.gravity.y;

    engineRef.current = engine;

    const runner = Matter.Runner.create();
    runnerRef.current = runner;

    const containerRect = containerRef.current.getBoundingClientRect();

    /* ---------------- WALLS ---------------- */
    const t = config.wallThickness;
    const walls = [
      // floor
      Matter.Bodies.rectangle(
        containerRect.width / 2,
        containerRect.height + t / 2,
        containerRect.width + t * 2,
        t,
        { isStatic: true }
      ),
      // left
      Matter.Bodies.rectangle(
        -t / 2,
        containerRect.height / 2,
        t,
        containerRect.height + t * 2,
        { isStatic: true }
      ),
      // right
      Matter.Bodies.rectangle(
        containerRect.width + t / 2,
        containerRect.height / 2,
        t,
        containerRect.height + t * 2,
        { isStatic: true }
      ),
    ];

    Matter.World.add(engine.world, walls);

    /* ---------------- BODIES ---------------- */
    objectRef.current.forEach((el, i) => {
      if (!el) return;

      const rect = el.getBoundingClientRect();

      const body = Matter.Bodies.rectangle(
        Math.random() * (containerRect.width - rect.width) + rect.width / 2,
        -300 - i * 150,
        rect.width,
        rect.height,
        {
          restitution: config.restitution,
          friction: config.friction,
          frictionAir: config.frictionAir,
          density: config.density,
        }
      );

      bodiesRef.current.push({
        body,
        element: el,
        width: rect.width,
        height: rect.height,
      });
    });

    Matter.World.add(
      engine.world,
      bodiesRef.current.map((b) => b.body)
    );

    /* ---------------- MOUSE ---------------- */
    const mouse = Matter.Mouse.create(containerRef.current);

    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: config.mouseStiffness,
        render: { visible: false },
      },
    });

    mouseConstraintRef.current = mouseConstraint;
    Matter.World.add(engine.world, mouseConstraint);

    mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

    mouse.element.oncontextmenu = () => false;

    /* ---------------- RUN ---------------- */
    Matter.Runner.run(runner, engine);

    /* ---------------- DOM SYNC ---------------- */
    let rafId;

    const update = () => {
      bodiesRef.current.forEach(({ body, element, width, height }) => {
        element.style.left = body.position.x - width / 2 + "px";
        element.style.top = body.position.y - height / 2 + "px";
        element.style.transform = `rotate(${body.angle}rad)`;
      });

      rafId = requestAnimationFrame(update);
    };

    update();

    /* ---------------- CLEANUP ---------------- */
    return () => {
      cancelAnimationFrame(rafId);

      Matter.Runner.stop(runner);
      Matter.World.clear(engine.world, false);
      Matter.Engine.clear(engine);

      bodiesRef.current = [];
    };
  }, []);

  return (
    <>
      <section className="hero text-white w-full h-svh p-8 flex items-center justify-center">
        <h1 className="w-[45%] max-lg:w-full text-center text-[4rem] max-lg:text-[2rem] font-bold leading-none">
          Release some anger and gain some mental clarity
        </h1>
      </section>

      <section
        ref={containerRef}
        className="footer bg-white text-black w-full h-svh relative overflow-hidden"
      >
        <div className="object-container">
          {objectNames.map((name, i) => (
            <div
              key={name}
              ref={(el) => (objectRef.current[i] = el)}
              className="object absolute"
            >
              <p>{name}</p>
            </div>
          ))}
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h1 className="w-[45%] max-lg:w-full text-center text-[4rem] max-lg:text-[2rem] font-bold leading-none pointer-events-auto">
            It’s ok to be evil
          </h1>
        </div>
      </section>
    </>
  );
};

export default Physics;
