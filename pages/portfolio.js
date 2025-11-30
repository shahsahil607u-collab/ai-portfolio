import dynamic from 'next/dynamic'
import { useState, Suspense } from 'react'
import ProjectsPanel from '../components/panels/ProjectsPanel'
import SkillsPanel from '../components/panels/SkillsPanel'
import TimelinePanel from '../components/panels/TimelinePanel'
import AchievementsPanel from '../components/panels/AchievementsPanel'
import AboutPanel from '../components/panels/AboutPanel'
import ChatAssistant from '../components/ChatAssistant'

const ThreeScene = dynamic(() => import('../components/ThreeScene'), { ssr: false })

function LoadingScreen() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 z-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-xl font-semibold gradient-text">Loading 3D Experience...</p>
      </div>
    </div>
  )
}

export default function Portfolio() {
  const [openPanel, setOpenPanel] = useState(null)

  return (
    <div className="h-screen w-screen flex flex-col relative">
      {/* 3D Scene */}
      <div className="flex-1 relative">
        <Suspense fallback={<LoadingScreen />}>
          <ThreeScene onOpenPanel={(panel) => setOpenPanel(panel)} />
        </Suspense>

        {/* Controls hint */}
        <div className="absolute bottom-6 left-6 glass px-4 py-3 rounded-lg z-10 fade-in-up">
          <p className="text-sm text-slate-300 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            Click objects to explore • Drag to rotate • Scroll to zoom
          </p>
        </div>

        {/* AI Assistant */}
        <div className="absolute top-6 right-6 z-30">
          <ChatAssistant />
        </div>

        {/* Back button */}
        <a href="/" className="absolute top-6 left-6 glass px-4 py-2 rounded-lg hover-scale z-10 flex items-center gap-2 text-sm font-medium">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Home
        </a>

        {/* Panels with backdrop */}
        {openPanel && (
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 z-20 backdrop-blur-sm" 
            onClick={() => setOpenPanel(null)}
          />
        )}

        <div className="absolute inset-y-0 right-0 z-20 w-full md:w-2/5">
          {openPanel === 'projects' && <ProjectsPanel onClose={() => setOpenPanel(null)} />}
          {openPanel === 'skills' && <SkillsPanel onClose={() => setOpenPanel(null)} />}
          {openPanel === 'timeline' && <TimelinePanel onClose={() => setOpenPanel(null)} />}
          {openPanel === 'achievements' && <AchievementsPanel onClose={() => setOpenPanel(null)} />}
          {openPanel === 'about' && <AboutPanel onClose={() => setOpenPanel(null)} />}
        </div>
      </div>
    </div>
  )
}
