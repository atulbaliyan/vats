import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Check if touch device or prefers reduced motion
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (isTouch || reducedMotionQuery.matches) {
      setIsReducedMotion(true);
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
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.tagName === 'SELECT'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.body.addEventListener('mouseenter', onMouseEnter);
    document.body.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.removeEventListener('mouseenter', onMouseEnter);
      document.body.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isVisible]);

  if (isReducedMotion || !isVisible) return null;

  return (
    <>
      {/* Precision center dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full bg-vats-lime transition-transform duration-75 hidden md:block"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${isHovered ? 0 : 1})`,
          width: '6px',
          height: '6px',
        }}
      />
      {/* Outer follow circle */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full border border-vats-lime/60 transition-all duration-150 ease-out hidden md:block"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${isHovered ? 1.6 : 1})`,
          width: '32px',
          height: '32px',
          backgroundColor: isHovered ? 'rgba(199, 255, 53, 0.12)' : 'transparent',
          borderColor: isHovered ? '#C7FF35' : 'rgba(199, 255, 53, 0.5)',
        }}
      />
    </>
  );
};
