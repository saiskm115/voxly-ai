import React, { useState } from 'react';
import {
  Mic,
  Volume2,
  Play,
  Square,
  Sparkles,
  Bot,
  ArrowRight,
  Headphones,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { voiceAgent } from '../services/voiceAgent';

export function TalkToAiSection({ onOpenTalkModal }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activePrompt, setActivePrompt] = useState(null);
  const [currentResponse, setCurrentResponse] = useState(
    "Hi there! I'm Voxly, your autonomous voice employee. Click any question below or hit 'Start Conversation' to hear me speak live!"
  );

  const testScenarios = [
    {
      label: "Sales Lead Qualification",
      question: "Hi Voxly, how do you qualify inbound leads for our sales team?",
      answer: "I answer on ring one, ask the caller their company size and budget, detect buying intent, and automatically book high-value meetings on your account executive's calendar!",
    },
    {
      label: "24/7 Customer Support",
      question: "Can you handle refund inquiries and technical support?",
      answer: "Yes! I can look up customer order IDs, troubleshoot tier-1 issues from your knowledge base, and even process billing adjustments without making customers wait on hold.",
    },
    {
      label: "Human Agent Warm Transfer",
      question: "What happens if a customer asks for a human manager?",
      answer: "I immediately perform a warm transfer to your team, passing a live audio transcript and structured summary so your agent has 100% context before saying hello.",
    },
    {
      label: "Scalability & Speed",
      question: "How fast do you respond, and how many calls can you take?",
      answer: "My voice response latency is under 350 milliseconds — indistinguishable from human conversation — and our distributed telephony cluster can handle over 100,000 calls at once.",
    },
  ];

  const handleTestPrompt = (scenario) => {
    setActivePrompt(scenario.label);
    setCurrentResponse(scenario.answer);
    setIsPlaying(true);
    voiceAgent.playTTS(scenario.answer, () => {
      setIsPlaying(false);
    });
  };

  const handleStartConversation = () => {
    if (onOpenTalkModal) {
      onOpenTalkModal();
    } else {
      const defaultGreeting = "Hello! I am ready to talk. Ask me any question or test my live capabilities!";
      setCurrentResponse(defaultGreeting);
      setIsPlaying(true);
      voiceAgent.playTTS(defaultGreeting, () => {
        setIsPlaying(false);
      });
    }
  };

  return (
    <section id="talk-to-ai" className="py-24 sm:py-32 bg-[#171522] text-white relative overflow-hidden">
      {/* Background ambient lighting glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#7657E8]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#20B486]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#EDE7FF] text-xs font-bold tracking-widest uppercase mb-4 shadow-sm backdrop-blur-md">
            <Headphones className="w-3.5 h-3.5 text-[#7657E8]" />
            <span>Interactive Voice Demonstration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Don't take our word for it.{' '}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9B7BF7] via-[#EDE7FF] to-[#7657E8]">
              Talk to it.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-white/70 leading-relaxed">
            Experience real-time sub-500ms speech synthesis, natural interruption handling, and empathetic conversational flow directly in your browser.
          </p>
        </div>

        {/* Central Architecture Visual Flow */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white/5 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
            
            {/* TOP NODE: AI EMPLOYEE */}
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#7657E8] to-[#9B7BF7] text-white font-extrabold text-sm tracking-wider uppercase shadow-lg shadow-[#7657E8]/30 flex items-center gap-2">
                <Bot className="w-4 h-4" />
                <span>AI EMPLOYEE</span>
              </div>
              {/* Vertical connector line */}
              <div className="w-0.5 h-8 bg-gradient-to-b from-[#7657E8] to-white/30 my-1" />
            </div>

            {/* SPLIT NODES: LISTEN vs RESPOND */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              {/* Horizontal bridge bar */}
              <div className="hidden md:block absolute -top-4 left-1/4 right-1/4 h-0.5 bg-white/20" />

              {/* LISTEN NODE */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#20B486]/50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#20B486] flex items-center gap-1.5">
                    <Mic className="w-4 h-4" /> LISTEN
                  </span>
                  <span className="text-[11px] font-mono text-white/50">Audio Input • STT</span>
                </div>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-4">
                  Stream incoming speech packets, detect pauses and interruptions, and convert intent into tokens in &lt;120ms.
                </p>
                {/* Listening animated visualizer */}
                <div className="flex items-center gap-1 h-6 px-3 rounded-lg bg-black/30 border border-white/5">
                  {[12, 24, 16, 28, 14, 22, 10, 26, 18, 12, 20].map((h, i) => (
                    <span
                      key={i}
                      className="w-1 bg-[#20B486] rounded-full animate-pulse"
                      style={{ height: `${h}px`, animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                  <span className="text-[10px] font-mono text-white/50 ml-auto">Live Mic Frequency</span>
                </div>
              </div>

              {/* RESPOND NODE */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#7657E8]/50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#9B7BF7] flex items-center gap-1.5">
                    <Volume2 className="w-4 h-4" /> RESPOND
                  </span>
                  <span className="text-[11px] font-mono text-white/50">Neural TTS • 320ms</span>
                </div>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-4">
                  Synthesize personalized acoustic speech with pitch modulation, empathy, and professional domain knowledge.
                </p>
                {/* Synthesizing visualizer */}
                <div className="flex items-center gap-1 h-6 px-3 rounded-lg bg-black/30 border border-white/5">
                  {[20, 14, 28, 18, 26, 12, 24, 16, 22, 14, 26].map((h, i) => (
                    <span
                      key={i}
                      className="w-1 bg-[#9B7BF7] rounded-full animate-pulse"
                      style={{ height: `${h}px`, animationDelay: `${i * 140}ms` }}
                    />
                  ))}
                  <span className="text-[10px] font-mono text-white/50 ml-auto">Acoustic Output</span>
                </div>
              </div>
            </div>

            {/* BOTTOM CONNECTOR: CONVERSATION */}
            <div className="flex flex-col items-center justify-center mt-6">
              <div className="w-0.5 h-8 bg-gradient-to-b from-white/30 to-[#7657E8] my-1" />
              <div className="px-6 py-2 rounded-full bg-white/10 border border-white/20 text-[#EDE7FF] font-bold text-xs tracking-widest uppercase shadow-md flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#20B486]" />
                <span>REAL-TIME CONVERSATION</span>
              </div>
            </div>

            {/* Interactive Live Speech Box */}
            <div className="mt-8 bg-black/40 border border-white/15 rounded-2xl p-5 sm:p-6">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-white/60 flex items-center gap-1.5">
                  <Bot className="w-4 h-4 text-[#7657E8]" />
                  Voxly Live Speech Player:
                </span>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                  isPlaying ? 'bg-[#20B486]/20 text-[#20B486] border border-[#20B486]/30 animate-pulse' : 'bg-white/10 text-white/50'
                }`}>
                  {isPlaying ? '● Speaking Now' : 'Idle • Ready'}
                </span>
              </div>

              <p className="text-sm sm:text-base font-medium text-[#EDE7FF] leading-relaxed mb-5 bg-white/5 p-4 rounded-xl border border-white/5 min-h-[70px]">
                "{currentResponse}"
              </p>

              {/* Sample Prompt Chips */}
              <div className="mb-5">
                <span className="text-[11px] font-bold text-white/40 uppercase tracking-wider block mb-2">
                  Click a test question to hear Voxly respond:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {testScenarios.map((sc, i) => (
                    <button
                      key={i}
                      onClick={() => handleTestPrompt(sc)}
                      className={`text-left text-xs p-2.5 rounded-xl border transition-all ${
                        activePrompt === sc.label
                          ? 'bg-[#7657E8]/30 border-[#7657E8] text-white shadow-sm'
                          : 'bg-white/5 hover:bg-white/10 border-white/10 text-white/70 hover:text-white'
                      }`}
                    >
                      <span className="font-semibold block text-[#EDE7FF]">{sc.label}</span>
                      <span className="text-[11px] text-white/50 truncate block mt-0.5">"{sc.question}"</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Primary Call to Action Button */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <button
                  onClick={handleStartConversation}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#7657E8] to-[#9B7BF7] hover:from-[#6A47E5] hover:to-[#8E6DF5] shadow-lg shadow-[#7657E8]/40 hover:shadow-xl hover:shadow-[#7657E8]/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                >
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                  <span>▶ Start Conversation</span>
                </button>

                <button
                  onClick={() => handleTestPrompt(testScenarios[0])}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold text-white/90 bg-white/10 hover:bg-white/15 border border-white/20 transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Replay Sample Response</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
