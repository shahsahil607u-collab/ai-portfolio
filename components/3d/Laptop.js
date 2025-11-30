import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

export default function Laptop({ position, onClick, onPointerOver, onPointerOut, hovered }) {
  const groupRef = useRef()
  const glowRef = useRef()

  useFrame((state) => {
    if (hovered && groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.1
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 3) * 0.05
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(hovered ? 1.2 + Math.sin(state.clock.elapsedTime * 5) * 0.1 : 1)
    }
  })

  return (
    <group ref={groupRef} position={position} onClick={onClick} onPointerOver={onPointerOver} onPointerOut={onPointerOut}>
      {/* Laptop base */}
      <RoundedBox args={[1.2, 0.08, 0.9]} radius={0.02} smoothness={4} castShadow>
        <meshStandardMaterial 
          color={hovered ? '#7c3aed' : '#5b21b6'} 
          metalness={0.8}
          roughness={0.2}
          emissive={hovered ? '#7c3aed' : '#000000'}
          emissiveIntensity={hovered ? 0.5 : 0}
        />
      </RoundedBox>

      {/* Laptop screen */}
      <RoundedBox args={[1.1, 0.75, 0.05]} radius={0.02} smoothness={4} position={[0, 0.4, -0.35]} rotation={[-0.3, 0, 0]} castShadow>
        <meshStandardMaterial 
          color={hovered ? '#a78bfa' : '#6366f1'}
          metalness={0.6}
          roughness={0.1}
          emissive={hovered ? '#a78bfa' : '#4338ca'}
          emissiveIntensity={hovered ? 0.8 : 0.3}
        />
      </RoundedBox>

      {/* Screen glow effect */}
      <mesh ref={glowRef} position={[0, 0.4, -0.32]} rotation={[-0.3, 0, 0]}>
        <planeGeometry args={[0.9, 0.6]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={hovered ? 0.4 : 0.2} />
      </mesh>

      {/* Keyboard details */}
      <mesh position={[0, 0.05, 0.1]}>
        <boxGeometry args={[0.8, 0.01, 0.5]} />
        <meshStandardMaterial color="#1e1b4b" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Point light from screen */}
      {hovered && <pointLight position={[0, 0.4, -0.3]} intensity={2} color="#a78bfa" distance={3} />}
    </group>
  )
}
