"use client";

import { useEffect, useRef, useState } from "react";

const beeSvg = (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="20" cy="22" rx="14" ry="8" fill="#1a1a1a" />
    <ellipse cx="12" cy="20" rx="5" ry="6" fill="#1a1a1a" />
    <ellipse cx="12" cy="20" rx="4" ry="3" fill="#FFD700" />
    <ellipse cx="16" cy="19" rx="3" ry="3" fill="#FFD700" />
    <ellipse cx="20" cy="18" rx="3" ry="3" fill="#FFD700" />
    <ellipse cx="24" cy="19" rx="3" ry="3" fill="#FFD700" />
    <ellipse cx="28" cy="20" rx="4" ry="3" fill="#FFD700" />
    <ellipse cx="32" cy="22" rx="5" ry="3" fill="#1a1a1a" />
    <ellipse cx="7" cy="16" rx="2" ry="6" fill="#FFD700" opacity="0.6" />
    <ellipse cx="33" cy="16" rx="2" ry="6" fill="#FFD700" opacity="0.6" />
    <path d="M10 22 Q12 18 14 22" stroke="#1a1a1a" strokeWidth="1.5" fill="none" />
    <path d="M18 22 Q20 17 22 22" stroke="#1a1a1a" strokeWidth="1.5" fill="none" />
    <path d="M26 22 Q28 18 30 22" stroke="#1a1a1a" strokeWidth="1.5" fill="none" />
    <ellipse cx="9" cy="17" rx="1.5" ry="1.5" fill="white" opacity="0.9" />
    <ellipse cx="31" cy="17" rx="1.5" ry="1.5" fill="white" opacity="0.9" />
    <path d="M6 14 Q8 10 10 14" stroke="#1a1a1a" strokeWidth="1" fill="none" />
    <path d="M34 14 Q32 10 30 14" stroke="#1a1a1a" strokeWidth="1" fill="none" />
    <ellipse cx="28" cy="28" rx="2" ry="2" fill="#FFD700" />
    <ellipse cx="26" cy="26" rx="2" ry="2" fill="#FFD700" />
    <ellipse cx="24" cy="24" rx="2" ry="2" fill="#FFD700" />
  </svg>
);

export function FlyingBee() {
  const beeRef = useRef<HTMLDivElement>(null);
  const [path, setPath] = useState({ x: -50, y: 100, rotation: 0 });
  const [wingPhase, setWingPhase] = useState(0);

  useEffect(() => {
    let animationId: number;
    let pathIndex = 0;
    const startTime = Date.now();

    const generatePath = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const paths = [
        {
          x: -50,
          y: height * 0.15,
          cp1x: width * 0.1,
          cp1y: height * 0.1,
          cp2x: width * 0.3,
          cp2y: height * 0.25,
          endX: width * 0.5,
          endY: height * 0.2,
        },
        {
          x: width * 0.5,
          y: height * 0.2,
          cp1x: width * 0.65,
          cp1y: height * 0.1,
          cp2x: width * 0.8,
          cp2y: height * 0.35,
          endX: width + 50,
          endY: height * 0.3,
        },
        {
          x: width + 50,
          y: height * 0.4,
          cp1x: width * 0.85,
          cp1y: height * 0.45,
          cp2x: width * 0.65,
          cp2y: height * 0.55,
          endX: width * 0.5,
          endY: height * 0.5,
        },
        {
          x: width * 0.5,
          y: height * 0.5,
          cp1x: width * 0.3,
          cp1y: height * 0.6,
          cp2x: width * 0.15,
          cp2y: height * 0.7,
          endX: -50,
          endY: height * 0.65,
        },
        {
          x: -50,
          y: height * 0.75,
          cp1x: width * 0.2,
          cp1y: height * 0.8,
          cp2x: width * 0.4,
          cp2y: height * 0.9,
          endX: width * 0.6,
          endY: height * 0.85,
        },
        {
          x: width * 0.6,
          y: height * 0.85,
          cp1x: width * 0.8,
          cp1y: height * 0.95,
          cp2x: width * 1.05,
          cp2y: height * 0.8,
          endX: width + 50,
          endY: height * 0.75,
        },
      ];
      return paths;
    };

    let paths = generatePath();

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const pathDuration = 8;
      const totalDuration = paths.length * pathDuration;
      const cycleTime = elapsed % totalDuration;
      const currentPathIndex = Math.floor(cycleTime / pathDuration);
      const pathProgress = (cycleTime % pathDuration) / pathDuration;

      if (currentPathIndex !== pathIndex) {
        pathIndex = currentPathIndex;
        paths = generatePath();
      }

      const currentPath = paths[currentPathIndex % paths.length];
      const t = pathProgress;
      const mt = 1 - t;

      const x =
        mt * mt * mt * currentPath.x +
        3 * mt * mt * t * currentPath.cp1x +
        3 * mt * t * t * currentPath.cp2x +
        t * t * t * currentPath.endX;

      const y =
        mt * mt * mt * currentPath.y +
        3 * mt * mt * t * currentPath.cp1y +
        3 * mt * t * t * currentPath.cp2y +
        t * t * t * currentPath.endY;

      const nextT = Math.min(t + 0.01, 1);
      const nextX =
        mt * mt * mt * currentPath.x +
        3 * (1 - nextT) * (1 - nextT) * nextT * currentPath.cp1x +
        3 * (1 - nextT) * nextT * nextT * currentPath.cp2x +
        nextT * nextT * nextT * currentPath.endX;
      const nextY =
        mt * mt * mt * currentPath.y +
        3 * (1 - nextT) * (1 - nextT) * nextT * currentPath.cp1y +
        3 * (1 - nextT) * nextT * nextT * currentPath.cp2y +
        nextT * nextT * nextT * currentPath.endY;

      const angle = Math.atan2(nextY - y, nextX - x) * (180 / Math.PI);

      setPath({ x, y, rotation: angle });
      setWingPhase((p) => (p + 0.3) % (Math.PI * 2));
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      paths = generatePath();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={beeRef}
      className="fixed pointer-events-none z-[100] bee-container"
      style={{
        transform: `translate(${path.x}px, ${path.y}px) rotate(${path.rotation}deg)`,
      }}
      aria-hidden="true"
    >
      <div className="bee-body" style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))" }}>
        {beeSvg}
      </div>
    </div>
  );
}
