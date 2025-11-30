import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, Text } from '@react-three/drei'

export default function WallFrame({ position, onClick, onPointerOver, onPointerOut, hovered }) {
  const groupRef = useRef()
  const glowRef = useRef()

  useFrame((state) => {
    if (hovered && groupRef.current) {
      groupRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.05)
    } else if (groupRef.current) {
      groupRef.current.scale.setScalar(1)
    }
    if (glowRef.current) {
      glowRef.current.material.opacity = hovered ? 0.6 + Math.sin(state.clock.elapsedTime * 4) * 0.2 : 0.3
    }
  })

  return (
    <group ref={groupRef} position={position} onClick={onClick} onPointerOver={onPointerOver} onPointerOut={onPointerOut}>
      {/* Frame border */}
      <RoundedBox args={[1.6, 1.2, 0.08]} radius={0.02} smoothness={4} castShadow>
        <meshStandardMaterial 
          color={hovered ? '#581c87' : '#6b21a8'}
          metalness={0.7}
          roughness={0.3}
        />
      </RoundedBox>

      {/* Inner frame */}
      <RoundedBox args={[1.4, 1, 0.06]} radius={0.01} smoothness={4} position={[0, 0, 0.01]}>
        <meshStandardMaterial 
          color={hovered ? '#7c3aed' : '#9333ea'}
          metalness={0.5}
          roughness={0.4}
        />
      </RoundedBox>

      {/* Canvas/Photo area */}
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[1.2, 0.85]} />
        <meshStandardMaterial 
          color={hovered ? '#c084fc' : '#a855f7'}
          emissive={hovered ? '#c084fc' : '#9333ea'}
          emissiveIntensity={hovered ? 0.6 : 0.2}
        />
      </mesh>

      {/* Decorative text on canvas */}
      <Text
        position={[0, 0, 0.06]}
        fontSize={0.15}
        color="#1e1b4b"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.woff"
      >
        SAHIL
      </Text>

      {/* Glow effect */}
      <mesh ref={glowRef} position={[0, 0, 0.04]}>
        <planeGeometry args={[1.3, 0.9]} />
        <meshBasicMaterial color="#c084fc" transparent opacity={0.3} />
      </mesh>

      {/* Corner decorations */}
      {[
        [-0.65, 0.48], [0.65, 0.48], [-0.65, -0.48], [0.65, -0.48]
      ].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.04]}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}

      {/* Spotlight effect when hovered */}
      {hovered && <spotLight position={[0, 0, 1]} intensity={2} angle={0.5} color="#c084fc" distance={3} />}
    </group>
  )
}
