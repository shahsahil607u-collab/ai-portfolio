import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <main className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-20"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 3 + 3}s ease-in-out infinite`,
              animationDelay: Math.random() * 2 + 's'
            }}
          />
        ))}
      </div>

      <div className={`max-w-3xl text-center z-10 ${mounted ? 'fade-in-up' : 'opacity-0'}`}>
        {/* Logo/Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 pulse-glow flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        {/* Main heading with gradient */}
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          <span className="gradient-text">Sahil's Portfolio</span>
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-purple-300">
          In a 3D World
        </h2>
        
        <p className="mb-8 text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
          Explore an <span className="text-purple-400 font-semibold">interactive 3D portfolio room</span> that showcases projects, skills, education and achievements. Click objects to learn more, and ask the <span className="text-pink-400 font-semibold">AI assistant</span> questions about my work.
        </p>
        
        {/* CTA Button */}
        <Link href="/portfolio" className="inline-block group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
          <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 transform group-hover:scale-105 flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            Enter 3D Portfolio
          </div>
        </Link>

        {/* Feature badges */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {['Interactive 3D', 'AI Powered', 'Fully Responsive'].map((feature, i) => (
            <div 
              key={i} 
              className="glass px-4 py-2 rounded-full text-sm font-medium hover-scale cursor-default"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              {feature}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
