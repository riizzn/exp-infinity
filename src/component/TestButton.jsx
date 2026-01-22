import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const TestButton = ({ frontText = "Enquire Now", backText = "Contact Us" }) => {
  const frontRef = useRef(null);
  const backRef = useRef(null);

  useEffect(() => {
    // Set initial states
    gsap.set(backRef.current, {
      opacity: 0,
      rotationX: 90,
      y: '-50%'
    });
    
    gsap.set(frontRef.current, {
      opacity: 1,
      rotationX: 0,
      y: 0
    });
  }, []);

  const handleMouseEnter = () => {
    // Animate front out
    gsap.to(frontRef.current, {
      opacity: 0,
      rotationX: 90,
      y: '50%',
      duration: 0.5,
      ease: 'power2.inOut'
    });

    // Animate back in
    gsap.to(backRef.current, {
      opacity: 1,
      rotationX: 0,
      y: 0,
      duration: 0.5,
      ease: 'power2.inOut'
    });
  };

  const handleMouseLeave = () => {
    // Animate back out
    gsap.to(backRef.current, {
      opacity: 0,
      rotationX: 90,
      y: '-50%',
      duration: 0.5,
      ease: 'power2.inOut'
    });

    // Animate front in
    gsap.to(frontRef.current, {
      opacity: 1,
      rotationX: 0,
      y: 0,
      duration: 0.5,
      ease: 'power2.inOut'
    });
  };

  return (
    <div className="min-h-screen bg-[#1e1e24] flex items-center justify-center">
      <button
        className="relative w-48 h-12 overflow-hidden outline-none"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: '1000px' }}
      >
        {/* Front face */}
        <span
          ref={frontRef}
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center px-8 text-white uppercase tracking-wider font-medium bg-[#323237] text-[#adadaf]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {frontText}
        </span>

        {/* Back face */}
        <span
          ref={backRef}
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-[#323237] uppercase tracking-wider font-medium bg-[#adadaf]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {backText}
        </span>
        
      </button>
    </div>
  );
};

export default TestButton;