import React, { useEffect, useState } from "react";

export default function Steering() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let lastScroll = window.scrollY;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll) {
        // Scroll Down → Rotate Right
        setRotation((prev) => prev + 2);
      } else {
        // Scroll Up → Rotate Left
        setRotation((prev) => prev - 2);
      }

      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="h-[300px] flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 bg-black">
      {/* Left Text */}
      <h1 className="bg-gradient-to-b from-gray-200 to-gray-500 bg-clip-text text-transparent text-6xl md:text-8xl font-extrabold tracking-wide">
        AUTO
      </h1>

      {/* Steering Image */}
      <img
        src="/images/steering.png" // apna steering image ka path yahan do
        alt="Steering Wheel"
        className="hover:drop-shadow-[0_0_40px_cyan] transition duration-300"
        style={{
          width: "240px",
          height: "240px",
          transform: `rotate(${rotation}deg)`,
          transition: "transform 0.15s linear",
          filter: "drop-shadow(0 0 25px white)",
        }}
      />

      {/* Right Text */}
      <h1 className="bg-gradient-to-b from-red-800 to-red-500 bg-clip-text text-transparent text-6xl md:text-8xl font-extrabold tracking-wide">
        STYLE
      </h1>
    </section>
  );
}
