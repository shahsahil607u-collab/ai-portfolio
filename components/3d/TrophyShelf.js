import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Cylinder, Cone, Sphere } from '@react-three/drei'

function Trophy({ position, scale = 1, color }) {
  const trophyRef = useRef()

  useFrame((state) => {
    if (trophyRef.current) {
      trophyRef.current.rotation.y = Math.sin(state.clock.elapsedTime + position[0]) * 0.3
      trophyRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.05
    }
  })

  return (
    <group ref={trophyRef} position={position} scale={scale}>
      {/* Base */}
      <Cylinder args={[0.15, 0.2, 0.1, 32]} position={[0, 0, 0]} castShadow>
        <meshStandardMaterial color="#78350f" metalness={0.8} roughness={0.2} />
      </Cylinder>

      {/* Stem */}
      <Cylinder args={[0.05, 0.05, 0.3, 16]} position={[0, 0.2, 0]} castShadow>
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
      </Cylinder>

      {/* Cup base */}
      <Cylinder args={[0.12, 0.08, 0.15, 32]} position={[0, 0.4, 0]} castShadow>
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
      </Cylinder>

      {/* Cup */}
      <Cylinder args={[0.2, 0.12, 0.25, 32]} position={[0, 0.55, 0]} castShadow>
        <meshStandardMaterial color={color} metalness={0.95} roughness={0.05} />
      </Cylinder>

      {/* Handles */}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * 0.2, 0.55, 0]} rotation={[0, 0, side * Math.PI / 6]}>
          <torusGeometry args={[0.08, 0.02, 16, 32, Math.PI]} />
          <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
    </group>
  )
}

export default function TrophyShelf({ position, onClick, onPointerOver, onPointerOut, hovered }) {
  const groupRef = useRef()

  useFrame(() => {
    if (hovered && groupRef.current) {
      groupRef.current.scale.setScalar(1.05 + Math.sin(Date.now() * 0.003) * 0.02)
    } else if (groupRef.current) {
      groupRef.current.scale.setScalar(1)
    }
  })

  return (
    <group ref={groupRef} position={position} onClick={onClick} onPointerOver={onPointerOver} onPointerOut={onPointerOut}>
      {/* Shelf */}
      <mesh position={[0, -0.3, 0]} castShadow>
        <boxGeometry args={[2.5, 0.1, 0.4]} />
        <meshStandardMaterial 
          color="#451a03" 
          roughness={0.6}
          metalness={0.3}
        />
      </mesh>

      {/* Wall mount */}
      <mesh position={[0, -0.2, -0.15]}>
        <boxGeometry args={[2.5, 0.4, 0.1]} />
        <meshStandardMaterial color="#292524" roughness={0.8} />
      </mesh>

      {/* Trophies */}
      <Trophy position={[-0.8, 0, 0]} scale={0.8} color={hovered ? '#fde047' : '#eab308'} />
      <Trophy position={[0, 0, 0]} scale={1} color={hovered ? '#fde047' : '#eab308'} />
      <Trophy position={[0.8, 0, 0]} scale={0.75} color={hovered ? '#fde047' : '#eab308'} />

      {/* Spotlight on trophies */}
      {hovered && (
        <>
          <pointLight position={[0, 1, 0.5]} intensity={2} color="#fde047" distance={3} />
          <pointLight position={[-0.8, 0.5, 0.5]} intensity={1.5} color="#fde047" distance={2} />
          <pointLight position={[0.8, 0.5, 0.5]} intensity={1.5} color="#fde047" distance={2} />
        </>
      )}
    </group>
  )
}
