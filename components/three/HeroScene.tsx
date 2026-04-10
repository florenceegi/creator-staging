/**
 * @package YURI-BIAGINI — HeroScene
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — YURI-BIAGINI)
 * @date 2026-04-10
 * @purpose Fullscreen Three.js particle scene with mouse interaction, mobile fallback
 */

'use client';

import { useRef, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion, useMediaQuery } from '@/lib/hooks/useReducedMotion';

const PARTICLE_COUNT_DESKTOP = 6000;
const PARTICLE_COUNT_MOBILE = 800;
const ACCENT_COLOR = new THREE.Color('#c8a97e');
const BASE_COLOR = new THREE.Color('#333333');

function Particles() {
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const { viewport } = useThree();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const count = isMobile ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;

  const { positions, velocities, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 20;
      pos[i3 + 1] = (Math.random() - 0.5) * 20;
      pos[i3 + 2] = (Math.random() - 0.5) * 10;

      vel[i3] = (Math.random() - 0.5) * 0.002;
      vel[i3 + 1] = (Math.random() - 0.5) * 0.002;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.001;

      const t = Math.random();
      const color = BASE_COLOR.clone().lerp(ACCENT_COLOR, t * 0.3);
      col[i3] = color.r;
      col[i3 + 1] = color.g;
      col[i3 + 2] = color.b;
    }

    return { positions: pos, velocities: vel, colors: col };
  }, [count]);

  const onPointerMove = useCallback(
    (e: { clientX: number; clientY: number }) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    },
    []
  );

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const geo = meshRef.current.geometry;
    const posArr = geo.attributes.position.array as Float32Array;
    const colArr = geo.attributes.color.array as Float32Array;

    const mx = mouseRef.current.x * viewport.width * 0.5;
    const my = mouseRef.current.y * viewport.height * 0.5;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      posArr[i3] += velocities[i3];
      posArr[i3 + 1] += velocities[i3 + 1];
      posArr[i3 + 2] += velocities[i3 + 2];

      const dx = posArr[i3] - mx;
      const dy = posArr[i3 + 1] - my;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 3) {
        const force = (3 - dist) * 0.0008;
        posArr[i3] += dx * force;
        posArr[i3 + 1] += dy * force;

        const t = 1 - dist / 3;
        const color = BASE_COLOR.clone().lerp(ACCENT_COLOR, t);
        colArr[i3] = color.r;
        colArr[i3 + 1] = color.g;
        colArr[i3 + 2] = color.b;
      }

      if (Math.abs(posArr[i3]) > 10) velocities[i3] *= -1;
      if (Math.abs(posArr[i3 + 1]) > 10) velocities[i3 + 1] *= -1;
      if (Math.abs(posArr[i3 + 2]) > 5) velocities[i3 + 2] *= -1;
    }

    geo.attributes.position.needsUpdate = true;
    geo.attributes.color.needsUpdate = true;
    meshRef.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={meshRef} onPointerMove={onPointerMove}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.04 : 0.025}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function HeroScene() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div
        className="absolute inset-0 bg-gradient-to-b from-[var(--bg)] via-[var(--bg-surface)] to-[var(--bg)]"
        role="img"
        aria-label="Abstract artistic background"
      />
    );
  }

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      >
        <fog attach="fog" args={['#0a0a0a', 5, 20]} />
        <Particles />
      </Canvas>
    </div>
  );
}
