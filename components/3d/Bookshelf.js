import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'

export default function Bookshelf({ position, onClick, onPointerOver, onPointerOut, hovered }) {
  const groupRef = useRef()
  const booksRef = useRef([])

  useFrame((state) => {
    if (hovered && groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.08
    }
    booksRef.current.forEach((book, i) => {
      if (book && hovered) {
        book.position.z = 0.05 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.02
      }
    })
  })

  const bookColors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899']

  return (
    <group ref={groupRef} position={position} onClick={onClick} onPointerOver={onPointerOver} onPointerOut={onPointerOut}>
      {/* Shelf frame */}
      <RoundedBox args={[1.8, 2.4, 0.4]} radius={0.02} smoothness={4} castShadow>
        <meshStandardMaterial 
          color={hovered ? '#92400e' : '#78350f'}
          roughness={0.7}
          metalness={0.1}
        />
      </RoundedBox>

      {/* Shelves */}
      {[0, 1, 2].map((shelf) => (
        <mesh key={shelf} position={[0, -0.8 + shelf * 0.8, 0]}>
          <boxGeometry args={[1.7, 0.05, 0.35]} />
          <meshStandardMaterial color="#451a03" roughness={0.8} />
        </mesh>
      ))}

      {/* Books */}
      {[0, 1, 2].map((shelfIndex) =>
        [0, 1, 2, 3, 4].map((bookIndex) => (
          <RoundedBox
            key={`${shelfIndex}-${bookIndex}`}
            ref={(el) => (booksRef.current[shelfIndex * 5 + bookIndex] = el)}
            args={[0.25, 0.6, 0.15]}
            radius={0.01}
            smoothness={2}
            position={[-0.65 + bookIndex * 0.33, -0.8 + shelfIndex * 0.8 + 0.35, 0.05]}
            castShadow
          >
            <meshStandardMaterial 
              color={bookColors[(shelfIndex * 5 + bookIndex) % bookColors.length]}
              roughness={0.6}
              metalness={0.2}
              emissive={hovered ? bookColors[(shelfIndex * 5 + bookIndex) % bookColors.length] : '#000000'}
              emissiveIntensity={hovered ? 0.3 : 0}
            />
          </RoundedBox>
        ))
      )}

      {/* Ambient light when hovered */}
      {hovered && <pointLight position={[0, 0, 0.5]} intensity={1.5} color="#fbbf24" distance={2} />}
    </group>
  )
}
