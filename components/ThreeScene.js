import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, Float, Text, SpotLight } from '@react-three/drei'
import { useState, useRef } from 'react'
import Laptop from './3d/Laptop'
import Bookshelf from './3d/Bookshelf'
import TrophyShelf from './3d/TrophyShelf'
import WallFrame from './3d/WallFrame'
import * as THREE from 'three'

function AnimatedSpotlight({ position, target }) {
  const lightRef = useRef()
  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.intensity = 1.5 + Math.sin(state.clock.elapsedTime * 0.5) * 0.3
    }
  })
  return <SpotLight ref={lightRef} position={position} target={target} angle={0.6} penumbra={0.5} intensity={1.5} castShadow />
}

function Room() {
  return (
    <group>
      {/* Floor with gradient */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[25, 25]} />
        <meshStandardMaterial 
          color="#0f172a" 
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 2.5, -4]} receiveShadow>
        <planeGeometry args={[25, 10]} />
        <meshStandardMaterial color="#1e293b" roughness={0.9} />
      </mesh>

      {/* Side walls */}
      <mesh position={[-6, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="#1e293b" roughness={0.9} />
      </mesh>
      <mesh position={[6, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="#1e293b" roughness={0.9} />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 5, 0]}>
        <planeGeometry args={[25, 25]} />
        <meshStandardMaterial color="#0a0f1a" roughness={0.9} />
      </mesh>
    </group>
  )
}

export default function ThreeScene({ onOpenPanel }) {
  const [hovered, setHovered] = useState(null)

  return (
    <Canvas shadows camera={{ position: [0, 2, 8], fov: 60 }}>
      {/* Lighting setup */}
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 4, 0]} intensity={0.8} castShadow />
      <pointLight position={[-3, 2, 2]} intensity={0.4} color="#6366f1" />
      <pointLight position={[3, 2, 2]} intensity={0.4} color="#ec4899" />
      <AnimatedSpotlight position={[0, 5, 2]} target={new THREE.Vector3(0, 0, 0)} />

      {/* Environment and atmosphere */}
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      <fog attach="fog" args={['#0a0f1a', 10, 25]} />

      {/* Room structure */}
      <Room />

      {/* Camera controls */}
      <OrbitControls 
        enableZoom={true} 
        maxPolarAngle={Math.PI / 2.2}
        minPolarAngle={Math.PI / 6}
        maxDistance={12}
        minDistance={4}
        enablePan={false}
      />

      {/* Clickable 3D objects with floating animation */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <Laptop 
          position={[-2.5, 0.8, 0]} 
          onClick={() => onOpenPanel('projects')} 
          onPointerOver={() => setHovered('laptop')}
          onPointerOut={() => setHovered(null)}
          hovered={hovered === 'laptop'}
        />
      </Float>

      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
        <Bookshelf 
          position={[2.5, 1, -1.5]} 
          onClick={() => onOpenPanel('timeline')} 
          onPointerOver={() => setHovered('bookshelf')}
          onPointerOut={() => setHovered(null)}
          hovered={hovered === 'bookshelf'}
        />
      </Float>

      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
        <TrophyShelf 
          position={[0, 1.2, -2.5]} 
          onClick={() => onOpenPanel('achievements')} 
          onPointerOver={() => setHovered('trophy')}
          onPointerOut={() => setHovered(null)}
          hovered={hovered === 'trophy'}
        />
      </Float>

      <Float speed={1.3} rotationIntensity={0.1} floatIntensity={0.3}>
        <WallFrame 
          position={[-3.5, 2, -3]} 
          onClick={() => onOpenPanel('about')} 
          onPointerOver={() => setHovered('frame')}
          onPointerOut={() => setHovered(null)}
          hovered={hovered === 'frame'}
        />
      </Float>

      {/* Floating text labels */}
      {hovered === 'laptop' && (
        <Text position={[-2.5, 2, 0]} fontSize={0.3} color="#a78bfa" anchorX="center">
          PROJECTS
        </Text>
      )}
      {hovered === 'bookshelf' && (
        <Text position={[2.5, 2.5, -1.5]} fontSize={0.3} color="#fbbf24" anchorX="center">
          EDUCATION
        </Text>
      )}
      {hovered === 'trophy' && (
        <Text position={[0, 2.5, -2.5]} fontSize={0.3} color="#fde047" anchorX="center">
          ACHIEVEMENTS
        </Text>
      )}
      {hovered === 'frame' && (
        <Text position={[-3.5, 3, -3]} fontSize={0.3} color="#c084fc" anchorX="center">
          ABOUT ME
        </Text>
      )}
    </Canvas>
  )
}
