import React, { useEffect, useRef, useState } from "react";

const carousel1Logos = [
    "/images/audi.png",
    "/images/lambo.png",
    "/images/ferrary.png",
    "/images/jaguar.png",
    "/images/jag.png",
    "/images/porsche.png",
    "/images/chev.png",
    "/images/honda.png",
    "/images/hyundai.png",
    "/images/nissan.png",
    "/images/toyota.png",
    "/images/mercedes.png",
    "/images/bmw.png",
    "/images/kia.png",
    "/images/volkswagen.png",
    "/images/tesla.png",
    "/images/rolls.png",
    "/images/ford.png",
    "/images/citro.png",
    "/images/suzuki.png",

];

const BrandsBounce = () => {
    const containerRef = useRef(null);
    const [logos, setLogos] = useState(
        carousel1Logos.map((src) => ({
            src,
            x: Math.random() * 80, // initial % left
            y: Math.random() * 80, // initial % top
            dx: (Math.random() * 0.2 + 0.05) * (Math.random() > 0.5 ? 1 : -1), // speed x
            dy: (Math.random() * 0.2 + 0.05) * (Math.random() > 0.5 ? 1 : -1), // speed y
        }))
    );

    useEffect(() => {
        let animationFrame;

        const animate = () => {
            setLogos((prev) =>
                prev.map((logo) => {
                    let newX = logo.x + logo.dx;
                    let newY = logo.y + logo.dy;

                    // Collision detection (container boundaries)
                    if (newX < 0 || newX > 80) logo.dx *= -1;
                    if (newY < 0 || newY > 80) logo.dy *= -1;

                    return {
                        ...logo,
                        x: newX,
                        y: newY,
                    };
                })
            );

            animationFrame = requestAnimationFrame(animate);
        };

        animate();

        return () => cancelAnimationFrame(animationFrame);
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative    h-100 ml-15  overflow-hidden"
        >
            {logos.map((logo, idx) => (
                <img
                    key={idx}
                    src={logo.src}
                    alt={`Logo ${idx}`}
                    className="absolute h-24 w-auto object-contain transition-transform"
                    style={{ left: `${logo.x}%`, top: `${logo.y}%` }}
                />
            ))}
        </div>
    );
};

export default BrandsBounce;
