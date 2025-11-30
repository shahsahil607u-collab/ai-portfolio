import { useState } from 'react'
import axios from 'axios'

export default function ChatAssistant() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return
    const userMsg = { role: 'user', content: input }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)
    try {
      const res = await axios.post('/api/ai-assistant', { question: input })
      setMessages((prev) => [...prev, { role: 'assistant', content: res.data.answer }])
    } catch (e) {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Error: ' + e.message }])
    }
    setLoading(false)
  }

  return (
    <div className="relative">
      {!open && (
        <button 
          onClick={() => setOpen(true)} 
          className="glass px-5 py-3 rounded-xl shadow-2xl hover-scale flex items-center gap-2 font-medium bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500/50"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          AI Assistant
        </button>
      )}
      {open && (
        <div className="glass rounded-2xl shadow-2xl w-96 h-[500px] flex flex-col border-2 border-purple-500/30 overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-slate-600/50 bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-white">AI Portfolio Assistant</h3>
                <p className="text-xs text-slate-400">Powered by AI</p>
              </div>
            </div>
            <button 
              onClick={() => setOpen(false)} 
              className="text-slate-400 hover:text-white hover:bg-slate-700 p-2 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <p className="text-slate-400 text-xs mb-4">Ask me anything about Sahil's portfolio!</p>
                <div className="space-y-2">
                  {['What are your strongest skills?', 'Tell me about your projects', 'What is your experience?'].map((q, i) => (
                    <button
                      key={i}
                      onClick={() => setInput(q)}
                      className="block w-full text-left glass px-3 py-2 rounded-lg text-xs hover-scale text-purple-300"
                    >
                      💡 {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                  m.role === 'user' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white ml-auto' 
                    : 'glass border border-purple-500/30'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="glass px-4 py-3 rounded-2xl border border-purple-500/30 flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <span className="text-xs text-slate-400">Thinking...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input area */}
          <div className="p-4 border-t border-slate-600/50 bg-slate-900/50">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask a question..."
                className="flex-1 glass text-sm px-4 py-3 rounded-xl border border-purple-500/30 outline-none focus:border-purple-500 transition-colors"
              />
              <button 
                onClick={handleSend} 
                disabled={!input.trim() || loading}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-5 py-3 rounded-xl text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all hover-scale"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
