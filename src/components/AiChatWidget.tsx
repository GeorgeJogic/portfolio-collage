import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PRESET_AI_QUESTIONS, STUDENT_PROFILE } from '../data/portfolioData';

interface ChatMessage {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  source?: string;
}

function synthesizeLocalFallback(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('roll') || q.includes('university') || q.includes('college') || q.includes('academic') || q.includes('degree') || q.includes('score') || q.includes('class') || q.includes('section')) {
    return PRESET_AI_QUESTIONS[0].answer;
  }
  if (q.includes('project') || q.includes('pureair') || q.includes('campusaid') || q.includes('grocery') || q.includes('python') || q.includes('built') || q.includes('app')) {
    return PRESET_AI_QUESTIONS[1].answer;
  }
  if (q.includes('cert') || q.includes('achievement') || q.includes('workshop') || q.includes('quizoff') || q.includes('vcw26') || q.includes('award')) {
    return PRESET_AI_QUESTIONS[2].answer;
  }
  if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('reach') || q.includes('hire') || q.includes('location') || q.includes('github') || q.includes('linkedin')) {
    return PRESET_AI_QUESTIONS[3].answer;
  }
  if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('language') || q.includes('vibe') || q.includes('raspberry')) {
    return `George specializes in Vibe Coding & AI-Assisted Engineering (Lovable, Google Gemini, LangChain, FAISS, Ollama), Full-Stack Web Engineering (React, Next.js, TypeScript, Vite, Tailwind CSS, Vercel), and Python & Edge AI exploration on Raspberry Pi 5.`;
  }

  return `George Jogi Chittilappilly (Roll No: ${STUDENT_PROFILE.rollNumber}, ${STUDENT_PROFILE.section}) is a 1st-year B.Tech AI & ML undergraduate at ${STUDENT_PROFILE.university}. He has shipped live web applications including PureAir Drive, CampusAid, and GroceryCheck, and holds the StartupTN x Google for Developers Vibe Coding Workshop credential (ID: VCW26-86235). You can email him directly at ${STUDENT_PROFILE.email}.`;
}

export const AiChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hi! I'm George's Portfolio AI Assistant. Ask me about his B.Tech AI & ML studies at Joy University (Roll No: 2026BTAI069), his shipped platforms (PureAir Drive, CampusAid, GroceryCheck), or his verified certifications.`,
      source: 'Portfolio Knowledge Engine',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handlePresetClick = (preset: typeof PRESET_AI_QUESTIONS[number]) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: preset.question,
    };
    const botMsg: ChatMessage = {
      id: `bot-${Date.now() + 1}`,
      role: 'assistant',
      content: preset.answer,
      source: 'Verified Academic Dossier',
    };
    setMessages((prev) => [...prev, userMsg, botMsg]);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmed,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Check if it matches one of the preset questions directly
    const matchedPreset = PRESET_AI_QUESTIONS.find(
      (p) => p.question.toLowerCase() === trimmed.toLowerCase()
    );
    if (matchedPreset) {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now() + 1}`,
          role: 'assistant',
          content: matchedPreset.answer,
          source: 'Verified Academic Dossier',
        },
      ]);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
      });
      const data = await res.json();

      const replyText =
        data && typeof data.reply === 'string' && data.reply.trim().length > 0
          ? data.reply.trim()
          : synthesizeLocalFallback(trimmed);

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now() + 1}`,
          role: 'assistant',
          content: replyText,
          source: data?.reply ? 'Gemini AI · Portfolio Grounded' : 'Local Portfolio Synthesis',
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now() + 1}`,
          role: 'assistant',
          content: synthesizeLocalFallback(trimmed),
          source: 'Local Portfolio Synthesis',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: `Hi! I'm George's Portfolio AI Assistant. Ask me about his B.Tech AI & ML studies at Joy University (Roll No: 2026BTAI069), his shipped platforms (PureAir Drive, CampusAid, GroceryCheck), or his verified certifications.`,
        source: 'Portfolio Knowledge Engine',
      },
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="mb-3 w-[calc(100vw-2rem)] sm:w-96 max-h-[540px] bg-[#11131A]/95 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3.5 bg-[#161922] border-b border-slate-800/80">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#F8FAFC] font-display">
                    Ask George&apos;s AI
                  </h3>
                  <p className="text-[11px] text-[#94A3B8] font-mono tabular-nums">
                    Roll No: 2026BTAI069 · Hybrid AI
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  title="Reset conversation"
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close AI assistant"
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-72">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-md bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <div
                    className={`max-w-[82%] rounded-xl px-3.5 py-2.5 text-xs leading-relaxed whitespace-pre-line ${
                      msg.role === 'user'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-[#161922] text-[#F8FAFC] border border-slate-800/80'
                    }`}
                  >
                    <p>{msg.content}</p>
                    {msg.source && (
                      <p className="text-[10px] font-mono text-[#64748B] mt-1.5">
                        {msg.source}
                      </p>
                    )}
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-6 h-6 rounded-md bg-slate-800 flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 text-xs text-[#94A3B8] font-mono pl-8">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                  <span>Synthesizing portfolio response...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Preset Quick Chips */}
            <div className="px-4 py-2.5 bg-[#090A0F]/60 border-t border-slate-800/80">
              <p className="text-[10px] font-mono text-[#64748B] mb-2">
                Quick Portfolio Queries:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_AI_QUESTIONS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handlePresetClick(item)}
                    className="text-left text-[11px] px-2.5 py-1 rounded-lg bg-[#161922] hover:bg-indigo-950/60 text-[#94A3B8] hover:text-indigo-200 border border-slate-800 hover:border-indigo-500/40 transition-colors cursor-pointer"
                  >
                    {item.question}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSend}
              className="p-3 bg-[#161922] border-t border-slate-800/80 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about George's work..."
                className="flex-1 bg-[#090A0F] border border-slate-800 rounded-lg px-3 py-2 text-xs text-[#F8FAFC] placeholder-[#64748B] focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
                className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white transition-colors cursor-pointer shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex items-center gap-2.5 px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-2xl border border-indigo-400/30 transition-all cursor-pointer whitespace-nowrap"
      >
        <MessageSquare className="w-4 h-4" />
        <span>Ask George&apos;s AI</span>
      </motion.button>
    </div>
  );
};
