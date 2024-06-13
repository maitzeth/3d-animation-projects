/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Canvas, useLoader } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import { MotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { useMouse } from '../hooks/useMouse';
import { motion } from 'framer-motion-3d';

export const Scene = () => {
  const container = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  const progress = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const smoothProgress = useSpring(progress, {
    damping: 20
  });

  return (
    <div className="relative h-[500vh]" ref={container}>
      <div className="sticky top-0 h-screen">
        <Canvas>
          {/* <ScrollControls pages={5}> */}
            <OrbitControls
              enableZoom={false}
              enablePan={false}
            />
            <ambientLight intensity={1} />
            <directionalLight position={[2, 1, 1]} />
            <Cube progress={smoothProgress} />
          {/* </ScrollControls> */}
        </Canvas>
      </div>
    </div>
  );
};

function Cube({ progress }: { progress: MotionValue<number> }) {
  const mesh = useRef<THREE.Mesh | null>(null);
  // const mouse = useMouse();

  // drei approach ScrollControls, useScroll
  // useFrame(() => {
  //   const { offset } = data;

  //   if (mesh.current) {
  //     mesh.current.rotation.x = offset * 5;
  //     mesh.current.rotation.y = offset * 5;
  //     mesh.current.rotation.z = offset * 5;
  //   }
  // });
  
  // useFrame((_state, delta) => {
  //   if (mesh.current) {
      // mesh.current.rotation.x += delta * 0.5;
      // mesh.current.rotation.y += delta * 0.5;
      // mesh.current.rotation.z += delta * 0.5;
  //   }
  // });

  const texture_1 = useLoader(THREE.TextureLoader, '/1.jpg');
  const texture_2 = useLoader(THREE.TextureLoader, '/2.jpg');
  const texture_3 = useLoader(THREE.TextureLoader, '/3.jpg');
  const texture_4 = useLoader(THREE.TextureLoader, '/4.jpg');
  const texture_5 = useLoader(THREE.TextureLoader, '/5.jpg');
  const texture_6 = useLoader(THREE.TextureLoader, '/6.jpg');

  return (
    // @ts-ignore
    <motion.mesh ref={mesh} rotation-x={progress} rotation-y={progress}>
      <boxGeometry args={[2.5, 2.5, 2.5]} />
      <meshStandardMaterial map={texture_1} attach="material-0" />
      <meshStandardMaterial map={texture_2} attach="material-1" />
      <meshStandardMaterial map={texture_3} attach="material-2" />
      <meshStandardMaterial map={texture_4} attach="material-3" />
      <meshStandardMaterial map={texture_5} attach="material-4" />
      <meshStandardMaterial map={texture_6} attach="material-5" />
    </motion.mesh>
  );
}
