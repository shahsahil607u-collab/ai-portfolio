// Placeholder AI helper. Replace internals with real LLM API calls.
const axios = require('axios')

async function askPortfolioAssistant(question, portfolioData) {
  // Build a compact context prompt from portfolioData (do not include all heavy details in real usage)
  const ctx = []
  ctx.push(`About: ${portfolioData.about || 'No about text'}`)
  if (portfolioData.skills && portfolioData.skills.length) {
    ctx.push('Skills: ' + portfolioData.skills.map(s => s.name).join(', '))
  }
  if (portfolioData.projects && portfolioData.projects.length) {
    ctx.push('Projects: ' + portfolioData.projects.slice(0,5).map(p => p.title).join(', '))
  }

  const prompt = `You are an assistant for Sahil's portfolio. Use the context to answer concisely.\nContext:\n${ctx.join('\n')}\n\nQuestion: ${question}`

  // Placeholder — if OPENAI_API_KEY exists you can call an LLM here.
  if (process.env.OPENAI_API_KEY) {
    // Example pseudocode: call the LLM API here and return answer
    // return await callOpenAI(prompt)
    try {
      // This is intentionally generic; replace with your preferred provider call
      const r = await axios.post('https://api.openai.example/v1/chat/completions', { prompt }, { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } })
      return r.data?.choices?.[0]?.text || 'No answer from LLM.'
    } catch (e) {
      return 'LLM call failed: ' + String(e.message)
    }
  }

  // Fallback: simple rule-based answers
  const q = question.toLowerCase()
  if (q.includes('strongest skills') || q.includes('what are sahil')) {
    return `Sahil's main skills include: ${portfolioData.skills?.slice(0,8).map(s=>s.name).join(', ') || 'N/A'}`
  }
  if (q.includes('3d') || q.includes('three') || q.includes('three.js')) {
    return `Yes — Sahil lists 3D/WebGL / Three.js among the skills: ${portfolioData.skills?.filter(s=>s.category && s.category.toLowerCase().includes('3d')).map(s=>s.name).join(', ') || 'no explicit 3D skills found'}`
  }

  return "I don't have a confident answer yet — consider adding more portfolio content, or plug in an LLM API key.";
}

module.exports = { askPortfolioAssistant }
