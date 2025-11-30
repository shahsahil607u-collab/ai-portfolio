import { useEffect, useState } from 'react'
import axios from 'axios'

export default function AchievementsPanel({ onClose }) {
  const [achievements, setAchievements] = useState([])

  useEffect(() => {
    axios.get('/api/achievements').then(r => setAchievements(r.data)).catch(console.error)
  }, [])

  return (
    <div className="h-full bg-slate-800 shadow-xl overflow-y-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Achievements & Awards</h2>
        <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
      </div>
      {achievements.length === 0 && <p className="text-slate-400">No achievements yet.</p>}
      <div className="space-y-4">
        {achievements.map((a) => (
          <div key={a._id} className="bg-slate-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-1">{a.title}</h3>
            {a.issuer && <p className="text-sm text-slate-300 mb-1">Issued by: {a.issuer}</p>}
            {a.date && <p className="text-xs text-slate-400 mb-2">{new Date(a.date).toLocaleDateString()}</p>}
            {a.description && <p className="text-sm text-slate-300">{a.description}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
