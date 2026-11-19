import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isEligibleDevice, setIsEligibleDevice] = useState(false);

  useEffect(() => {
    // Media queries for strict eligibility:
    // 1. Device must support fine precision pointing (mouse / trackball)
    // 2. Primary input must support hover capability
    // 3. User must NOT have requested reduced motion
    const finePointerQuery = window.matchMedia('(pointer: fine)');
    const hoverQuery = window.matchMedia('(hover: hover)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const evaluateEligibility = () => {
      const eligible =
        finePointerQuery.matches && hoverQuery.matches && !reducedMotionQuery.matches;
      setIsEligibleDevice(eligible);
      return eligible;
    };

    if (!evaluateEligibility()) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    // Track hovered interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest('button') ||
        target?.closest('a') ||
        target?.closest('[role="button"]') ||
        target?.closest('[role="radio"]') ||
        target?.closest('[role="tab"]') ||
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.tagName === 'SELECT'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.body.addEventListener('mouseenter', onMouseEnter);
    document.body.addEventListener('mouseleave', onMouseLeave);

    const onReducedMotionChange = () => evaluateEligibility();
    reducedMotionQuery.addEventListener('change', onReducedMotionChange);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.removeEventListener('mouseenter', onMouseEnter);
      document.body.removeEventListener('mouseleave', onMouseLeave);
      reducedMotionQuery.removeEventListener('change', onReducedMotionChange);
    };
  }, [isVisible]);

  // Never mount/render on touch-first or ineligible devices
  if (!isEligibleDevice || !isVisible) return null;

  return (
    <>
      {/* Precision center dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full bg-vats-lime transition-transform duration-75"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${isHovered ? 0 : 1})`,
          width: '6px',
          height: '6px',
        }}
        aria-hidden="true"
      />
      {/* Outer follow circle */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full border border-vats-lime/60 transition-all duration-150 ease-out"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${isHovered ? 1.6 : 1})`,
          width: '32px',
          height: '32px',
          backgroundColor: isHovered ? 'rgba(199, 255, 53, 0.12)' : 'transparent',
          borderColor: isHovered ? '#C7FF35' : 'rgba(199, 255, 53, 0.5)',
        }}
        aria-hidden="true"
      />
    </>
  );
};
