import { useEffect, useState } from 'react'
import axios from 'axios'

export default function TimelinePanel({ onClose }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    axios.get('/api/timeline').then(r => setItems(r.data)).catch(console.error)
  }, [])

  return (
    <div className="h-full bg-slate-800 shadow-xl overflow-y-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Education & Experience</h2>
        <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
      </div>
      {items.length === 0 && <p className="text-slate-400">No timeline entries yet.</p>}
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item._id} className="bg-slate-700 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <span className="text-xs text-slate-400">{item.type}</span>
            </div>
            {item.institution && <p className="text-sm text-slate-300 mb-1">{item.institution}</p>}
            {item.startDate && (
              <p className="text-xs text-slate-400 mb-2">
                {new Date(item.startDate).toLocaleDateString()} — {item.endDate ? new Date(item.endDate).toLocaleDateString() : 'Present'}
              </p>
            )}
            {item.description && <p className="text-sm text-slate-300">{item.description}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
