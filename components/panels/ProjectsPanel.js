import { useEffect, useState } from 'react'
import axios from 'axios'

export default function ProjectsPanel({ onClose }) {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    axios.get('/api/projects').then(r => setProjects(r.data)).catch(console.error)
  }, [])

  return (
    <div className="h-full bg-slate-800 shadow-xl overflow-y-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Projects</h2>
        <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
      </div>
      {projects.length === 0 && <p className="text-slate-400">No projects yet. Add some via the admin panel.</p>}
      <div className="space-y-4">
        {projects.map((p) => (
          <div key={p._id} className="bg-slate-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-1">{p.title}</h3>
            <p className="text-sm text-slate-300 mb-2">{p.description}</p>
            {p.tech && p.tech.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {p.tech.map((t, i) => (
                  <span key={i} className="text-xs bg-indigo-500 px-2 py-1 rounded">{t}</span>
                ))}
              </div>
            )}
            <div className="flex gap-3 text-sm">
              {p.github && <a href={p.github} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">GitHub</a>}
              {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="text-green-400 hover:underline">Live Demo</a>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
