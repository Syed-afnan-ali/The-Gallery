import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";

// Showroom Model
function Showroom() {
  const { scene } = useGLTF("/models/metallic_showroom_gallery.glb");
  return <primitive object={scene} scale={1} />;
}

// Car 1 - McLaren
function McLaren() {
  const { scene } = useGLTF("/models/mclaren.glb");
  return (
    <primitive
      object={scene}
      scale={0.5}
      position={[-2, 0, 0]} // left slot
      rotation={[0, Math.PI / 2, 0]}
    />
  );
}

// Car 2 - Dodge
function Dodge() {
  const { scene } = useGLTF("/models/mafioso.glb");
  return (
    <primitive
      object={scene}
      scale={0.5}
      position={[2, 0, 0]} // right slot
      rotation={[0, -Math.PI / 2, 0]}
    />
  );
}
function Dodge1() {
  const { scene } = useGLTF("/models/dodge.glb");
  return (
    <primitive
      object={scene}
      scale={0.5}
      position={[2, 0, 2]} // right slot
      rotation={[0, -Math.PI / 2, 0]}
    />
  );
}

export default function Show() {
  return (
    <div className="w-full h-250"> {/* Full window height */}
      <Canvas camera={{ position: [0, 3, 10], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        <Suspense fallback={null}>
          <Showroom />
          <McLaren />
          <Dodge />
          <Dodge1 />
          
          <Environment preset="city" />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minPolarAngle={Math.PI / 2} // lock vertical angle
          maxPolarAngle={Math.PI / 2} // lock vertical angle
        />
      </Canvas>
    </div>
  );
}
