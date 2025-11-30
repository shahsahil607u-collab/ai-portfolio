export default function AboutPanel({ onClose }) {
  // Hardcoded about text for now — can be fetched from an API endpoint later
  const aboutText = `Hi, I'm Sahil — a full-stack developer passionate about building immersive web experiences with cutting-edge tech. I love working with React, Three.js, and AI integrations. This portfolio is a 3D interactive space where you can explore my projects, skills, and achievements in a unique way.`

  return (
    <div className="h-full bg-slate-800 shadow-xl overflow-y-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">About Sahil</h2>
        <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
      </div>
      <p className="text-slate-300 leading-relaxed">{aboutText}</p>
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Get in touch</h3>
        <p className="text-sm text-slate-400">Email: sahil@example.com</p>
        <p className="text-sm text-slate-400">GitHub: github.com/sahil</p>
        <p className="text-sm text-slate-400">LinkedIn: linkedin.com/in/sahil</p>
      </div>
    </div>
  )
}
