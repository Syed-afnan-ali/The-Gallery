import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CarScroll = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%", // scroll duration
          scrub: true,
          pin: true,
        },
      });

      // Car 3
      tl.fromTo(
        ".car3",
        { scale: 1.3, x: 0, y: 0, opacity: 1, zIndex: 5 },
        { scale: 1, x: "-135%", y: 0, opacity: 1 }
      );

      // Car 2
      tl.fromTo(
        ".car2",
        { scale: 1.3, x: 0, y: 0, opacity: 1, zIndex: 4 },
        { scale: 1.13, x: "40%", y: 0, opacity: 1 }
      );

      // Car 1 (pehle left → phir niche)
      tl.fromTo(
        ".car1",
        { scale: 1.22, x: 0, y: 0, opacity: 1, zIndex: 3 },
        { scale: 1, x: "-135%", y: 0, opacity: 1 } // left move
      ).to(".car1", {
        y: "113%", // neeche aayegi
        duration: 1,
      });
      tl.fromTo(
        ".car4",
        { scale: 1.22, x: 0, y: 0, opacity: 1, zIndex: 2 },
        { scale: 1.22, x: "-34%", y: 0, opacity: 1 } // left move
      ).to(".car4", {
        y: "113%", // neeche aayegi
        duration: 1,
        scale: 1
      });
      tl.fromTo(
        ".car5",
        { scale: 0.5, x: 0, y: 0, opacity: 1, zIndex: 0 },
        { scale: 0.5, x: "-22%", y: 0, opacity: 1 } // left move
      ).to(".car5", {
        y: "0", // neeche aayegi
        duration: 1,
      });
      tl.fromTo(
        ".car6",
        { scale: 0.5, x: 0, y: 0, opacity: 1, zIndex: 0 },
        { scale: 0.5, x: "13.5%", y: 0, opacity: 1 } // left move
      ).to(".car6", {
        y: "288", // neeche aayegi
        duration: 1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden"
      >
        {/* Car 1 */}
        <img
          src="/images/1.avif"
          className="car1 absolute top-0 left-1/2 -translate-x-1/2"
          alt="Car 1"
        />

        {/* Car 2 */}
        <img
          src="/images/2.avif"
          className="car2 absolute top-0 left-1/2 -translate-x-1/2"
          alt="Car 2"
        />

        {/* Car 3 */}
        <img
          src="/images/3.avif"
          className="car3 absolute top-0 left-1/2 -translate-x-1/2"
          alt="Car 3"
        />
        {/* Car 4 */}
        <img
          src="/images/4.avif"
          className="car4 absolute top-0 left-1/2 -translate-x-1/2"
          alt="Car 4"
        />
        {/* Car 5 */}
        <img
          src="/images/5.avif"
          className="car5 absolute -top-37   left-229.5 -translate-x-1/2"
          alt="Car 5"
          style={{
            clipPath: "inset(0 24% 0 0)",
            // top, right, bottom, left crop
            height: "101%",
            width: "65%"

          }}

        />
        <img
          src="/images/6.avif"
          className="car6 absolute -top-28   left-280 -translate-x-1/2"
          alt="Car 6"
          style={{
            clipPath: "inset(0 24% 0 0)",
            // top, right, bottom, left crop
            height: "93%",
            width: "70%"

          }}

        />
      </div>

     <section className="w-full min-h-screen bg-gradient-to-b from-black via-[#080c16] to-black text-white flex items-center justify-center px-6 py-16">
  <div className="max-w-6xl w-full">
    <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 tracking-tight">
      Engineered for the Future 🚀
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        { title: "0-100 km/h", value: "2.9s" },
        { title: "Top Speed", value: "350 km/h" },
        { title: "Horsepower", value: "1020 hp" },
        { title: "Range", value: "620 km" },
        { title: "Battery", value: "120 kWh" },
        { title: "Weight", value: "1,850 kg" },
      ].map((item, i) => (
        <div
          key={i}
          className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg relative group"
        >
          {/* Neon border animation */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/30 to-cyan-500/30 opacity-0 group-hover:opacity-100 blur-xl transition duration-500"></div>
          <div className="relative z-10">
            <p className="text-sm text-white/60">{item.title}</p>
            <h3 className="text-3xl font-bold">{item.value}</h3>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

    </>
  );
};

export default CarScroll;
