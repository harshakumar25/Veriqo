import React, { useRef, useState, useEffect } from 'react';

interface RevealOnScrollProps {
  children: React.ReactNode;
  delayMs?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  delayMs = 0,
  className = '',
  style = {},
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div
      ref={ref}
      className={`reveal-wrapper ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: reducedMotion
          ? 'none'
          : `opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms`,
        willChange: 'opacity, transform',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
