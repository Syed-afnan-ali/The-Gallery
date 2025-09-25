import React, { useEffect, useState } from "react";

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const hoverTargets = document.querySelectorAll("button, a, input, textarea, select, option");


  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);

    const addHover = () => setHovering(true);
    const removeHover = () => setHovering(false);

    // Links aur buttons par hover detect karna
    const hoverTargets = document.querySelectorAll("button, a, input, textarea");
    hoverTargets.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      hoverTargets.forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, []);

  // Smooth trailing effect
  const [trailPos, setTrailPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const follow = () => {
      setTrailPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.25, // 0.15 => smoothness
        y: prev.y + (pos.y - prev.y) * 0.25,
      }));
      requestAnimationFrame(follow);
    };
    follow();
  }, [pos]);

  return (
    <div
      style={{
        position: "fixed",
        top: trailPos.y,
        left: trailPos.x,
        width: hovering ? "35px" : "20px", // Hover pe size bara
        height: hovering ? "35px" : "20px",
        backgroundColor: "rgba(255, 0, 0, 0.8)", // Transparent red
        borderRadius: "50%",
        pointerEvents: "none",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
        transition: "width 0.2s ease, height 0.2s ease, background 0.3s ease",
        boxShadow: hovering
          ? "0 0 20px rgba(255,0,0,0.8), 0 0 40px rgba(255,0,0,0.5)"
          : "0 0 8px rgba(255,0,0,0.4)", // Glow effect
      }}
    ></div>
  );
};

export default CustomCursor;
