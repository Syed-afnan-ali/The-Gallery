import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html, Environment } from "@react-three/drei";
import { Suspense, useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import * as THREE from "three";
import gsap from "gsap";

// Loader Component
function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center text-white">
        <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-3 font-bold">Loading...</p>
      </div>
    </Html>
  );
}

// Car Model Component
function CarModel({ modelPath, onPartClick, highlightedPart }) {
  const { scene } = useGLTF(modelPath);

  scene.traverse((child) => {
    if (child.isMesh) {
      child.userData.partName = child.name;
      child.material.metalness = 1;
      child.material.roughness = 0.3;
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        if (child.userData.partName === highlightedPart) {
          child.material.emissive.set("yellow");
          child.material.emissiveIntensity = 1;
          gsap.to(child.rotation, { y: Math.PI / 2, duration: 1 });
        } else {
          child.material.emissive.set("black");
          child.material.emissiveIntensity = 0;
          gsap.to(child.rotation, { y: 0, duration: 1 });
        }
      }
    });
  }, [highlightedPart, scene]);

  return (
    <primitive
      object={scene}
      onClick={(e) => {
        e.stopPropagation();
        onPartClick(e.object);
      }}
    />
  );
}

// Turntable Group (Car + Ground rotate together)
function Turntable({ children }) {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002; // slow showroom rotation
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

// Main Viewer
export default function CarViewer() {
  const [highlightedPart, setHighlightedPart] = useState(null);

  const cars = [
    {
      name: "Lamborghini Aventador",
      path: "/models/lamborghini.glb",
      sound: "/sounds/lamborghini.mp3",
      thumbnail: "/images/lambo(1)(1).png",
    },
    {
      name: "Dodge Viper 1996",
      path: "/models/dodge1996.glb",
      sound: "/sounds/dodge.mp3",
      thumbnail: "/images/dodge.jpg",
    },
    {
      name: "Nissan GTR",
      path: "/models/sport.glb",
      sound: "/sounds/gtr.mp3",
      thumbnail: "/images/gtr.jpg",
    },
  ];

  const [carIndex, setCarIndex] = useState(0);

  useEffect(() => {
    const audio = new Audio(cars[carIndex].sound);
    audio.play().catch(() => {});
  }, [carIndex]);

  const handlePartClick = (part) => setHighlightedPart(part.userData.partName);

  const nextCar = () => setCarIndex((p) => (p + 1) % cars.length);
  const prevCar = () => setCarIndex((p) => (p - 1 + cars.length) % cars.length);

  const resetHighlight = () => setHighlightedPart(null);

  return (
    <div className="h-screen w-[90%] mx-auto rounded-b-4xl bg-black relative overflow-hidden">
      <h1 className="absolute top-10 w-full text-center text-white text-4xl font-bold z-10">
        {cars[carIndex].name}
      </h1>

      <Canvas
        shadows
        camera={{ position: [4, 4, 14], fov: 50 }}
        onPointerDown={resetHighlight}
      >
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={2} />
          <directionalLight position={[10, 15, 10]} intensity={3} castShadow />
          <pointLight position={[0, 8, 5]} intensity={1.2} />
          <OrbitControls enablePan enableZoom />
          <Environment preset="city" /> {/* showroom-like HDRI */}

          {/* Turntable containing ground + car */}
          <Turntable>
            {/* Ground */}
            <mesh
              rotation={[-Math.PI / 1, 0, 0]}
              scale={[1.3, 1.3, 1.3]}
              receiveShadow
            >
              <cylinderGeometry args={[7, 7, 0.3, 128]} />
              <meshStandardMaterial color="#444" metalness={0.6} roughness={0.3} />
            </mesh>

            {/* Car */}
            <AnimatePresence>
              <motion.group
                key={cars[carIndex].path}
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -200 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                position={[0, 0.1, 0]}
                scale={[2.5, 2.5, 2.5]}
                rotation={[0, 3, 0]}
              >
                <CarModel
                  modelPath={cars[carIndex].path}
                  onPartClick={handlePartClick}
                  highlightedPart={highlightedPart}
                />
              </motion.group>
            </AnimatePresence>
          </Turntable>
        </Suspense>
      </Canvas>

      {/* Car navigation buttons */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          prevCar();
        }}
        className="absolute left-10 top-1/2 -translate-y-1/2 w-18 h-18 bg-white text-black font-bold clip-octagon shadow-lg z-10"
      >
        ◀
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          nextCar();
        }}
        className="absolute right-9 top-1/2 -translate-y-1/2 w-18 h-18 bg-white text-black font-bold clip-octagon shadow-lg z-10"
      >
        ▶
      </button>

      {/* Info Panel for Highlighted Part */}
      {highlightedPart && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-lg text-white px-6 py-3 rounded-lg shadow-lg z-20">
          <h2 className="text-xl font-bold">{highlightedPart}</h2>
          <p className="text-sm">
            This is the <span className="font-semibold">{highlightedPart}</span> of the car.
          </p>
        </div>
      )}

      {/* Thumbnail Selector */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 z-20">
        {cars.map((car, index) => (
          <img
            key={car.name}
            src={car.thumbnail}
            alt={car.name}
            onClick={() => setCarIndex(index)}
            className={`w-20 h-14 object-cover rounded-lg  border-2 transition ${
              carIndex === index ? "border-red-500 scale-110" : "border-transparent"
            }`}
          />
        ))}
      </div>

      <style>{`
        .clip-octagon {
          clip-path: polygon(
            30% 0%, 70% 0%,
            100% 30%, 100% 70%,
            70% 100%, 30% 100%,
            0% 70%, 0% 30%
          );
        }
      `}</style>
    </div>
  );
}
