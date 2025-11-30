import { useEffect, useState } from 'react'
import axios from 'axios'

export default function SkillsPanel({ onClose }) {
  const [skills, setSkills] = useState([])

  useEffect(() => {
    axios.get('/api/skills').then(r => setSkills(r.data)).catch(console.error)
  }, [])

  const grouped = skills.reduce((acc, s) => {
    const cat = s.category || 'Other'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(s)
    return acc
  }, {})

  return (
    <div className="h-full bg-slate-800 shadow-xl overflow-y-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Skills</h2>
        <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
      </div>
      {skills.length === 0 && <p className="text-slate-400">No skills yet.</p>}
      <div className="space-y-6">
        {Object.keys(grouped).map((cat) => (
          <div key={cat}>
            <h3 className="text-lg font-semibold mb-2 text-indigo-300">{cat}</h3>
            <div className="flex flex-wrap gap-2">
              {grouped[cat].map((s) => (
                <span key={s._id} className="bg-slate-700 text-sm px-3 py-1 rounded-full">{s.name}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
