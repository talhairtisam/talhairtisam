"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type CoreSceneProps = {
  size?: "hero" | "mini";
  scrollProgress?: number;
  activeSection?: number;
  interactive?: boolean;
  pointer?: { x: number; y: number };
};

function getNodePositions(count: number, radius: number): THREE.Vector3[] {
  const positions: THREE.Vector3[] = [];
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(-1 + (2 * i) / count);
    const theta = Math.sqrt(count * Math.PI) * phi;
    positions.push(
      new THREE.Vector3(
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi),
      ),
    );
  }
  return positions;
}

export function CoreScene({
  size = "hero",
  scrollProgress = 0,
  activeSection = 0,
  interactive = true,
  pointer = { x: 0, y: 0 },
}: CoreSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const nodeCount = size === "mini" ? 16 : 32;
  const radius = size === "mini" ? 1.2 : 2.2;

  const nodes = useMemo(() => getNodePositions(nodeCount, radius), [nodeCount, radius]);

  const sectionColors = [
    new THREE.Color("#22d3ee"),
    new THREE.Color("#a78bfa"),
    new THREE.Color("#bef264"),
    new THREE.Color("#22d3ee"),
    new THREE.Color("#a78bfa"),
    new THREE.Color("#bef264"),
    new THREE.Color("#22d3ee"),
  ];

  const activeColor = sectionColors[activeSection % sectionColors.length];

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.15 + scrollProgress * Math.PI * 2;
    groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;

    if (interactive) {
      groupRef.current.rotation.y += pointer.x * 0.3;
      groupRef.current.rotation.x += pointer.y * 0.2;
    }
  });

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions: number[] = [];
    nodes.forEach((node, i) => {
      const next = nodes[(i + 1) % nodes.length];
      const far = nodes[(i + 5) % nodes.length];
      positions.push(node.x, node.y, node.z, next.x, next.y, next.z);
      if (i % 3 === 0) {
        positions.push(node.x, node.y, node.z, far.x, far.y, far.z);
      }
    });
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, [nodes]);

  const nodeGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = nodes.flatMap((n) => [n.x, n.y, n.z]);
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, [nodes]);

  const nodeSize = size === "mini" ? 0.06 : 0.08;

  return (
    <group ref={groupRef}>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color={activeColor} transparent opacity={0.35} />
      </lineSegments>
      <points geometry={nodeGeometry}>
        <pointsMaterial
          size={nodeSize}
          color={activeColor}
          transparent
          opacity={0.9}
          sizeAttenuation
        />
      </points>
      <mesh>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.8} />
      </mesh>
      {nodes.map((node, i) => (
        <PulseRing key={i} position={node} index={i} color={activeColor} size={size} />
      ))}
    </group>
  );
}

function PulseRing({
  position,
  index,
  color,
  size,
}: {
  position: THREE.Vector3;
  index: number;
  color: THREE.Color;
  size: "hero" | "mini";
}) {
  const ref = useRef<THREE.Mesh>(null);
  const ringSize = size === "mini" ? 0.04 : 0.06;

  useFrame((state) => {
    if (!ref.current) return;
    const pulse = (Math.sin(state.clock.elapsedTime * 2 + index * 0.5) + 1) / 2;
    ref.current.scale.setScalar(0.5 + pulse * 0.5);
    (ref.current.material as THREE.MeshBasicMaterial).opacity = 0.2 + pulse * 0.4;
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[ringSize, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.3} />
    </mesh>
  );
}
