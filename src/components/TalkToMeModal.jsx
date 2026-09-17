import React, { useState, useEffect } from 'react';
import { X, Mic, MicOff, Sparkles, Volume2, AlertCircle } from 'lucide-react';
import { voiceAgent } from '../services/voiceAgent';

const QUICK_PROMPTS = [
  "How do you qualify leads?",
  "What CRM platforms do you integrate with?",
  "Can you transfer calls to human sales reps?",
  "How fast are your response times?",
];

export function TalkToMeModal({ isOpen, onClose, onSelectBotState }) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [statusText, setStatusText] = useState("Press the microphone or select a question below to speak with Voxly.");
  const [errorMessage, setErrorMessage] = useState(null);
  const [conversationHistory, setConversationHistory] = useState([
    { speaker: 'Voxly', text: "Hi! I'm Voxly. Ask me anything about how I handle inbound calls, qualify leads, or book meetings." }
  ]);

  useEffect(() => {
    if (!isOpen) {
      voiceAgent.stopConversation();
      setIsListening(false);
      setIsSpeaking(false);
      setErrorMessage(null);
      if (onSelectBotState) onSelectBotState('IDLE');
    }
  }, [isOpen, onSelectBotState]);

  useEffect(() => {
    const unsubscribe = voiceAgent.subscribe((event, data) => {
      if (event === 'stateChange') {
        if (data.state === 'LISTENING') {
          setIsListening(true);
          setIsSpeaking(false);
          setStatusText("Listening to your microphone...");
          if (onSelectBotState) onSelectBotState('LISTENING');
        } else if (data.state === 'THINKING') {
          setIsListening(false);
          setIsSpeaking(false);
          setStatusText("Thinking...");
          if (data.userText) {
            setConversationHistory((prev) => [...prev, { speaker: 'You', text: data.userText }]);
          }
          if (onSelectBotState) onSelectBotState('THINKING');
        } else if (data.state === 'TALKING') {
          setIsListening(false);
          setIsSpeaking(true);
          setStatusText("Voxly is speaking...");
          if (data.responseText) {
            setConversationHistory((prev) => [...prev, { speaker: 'Voxly', text: data.responseText }]);
          }
          if (onSelectBotState) onSelectBotState('TALKING');
        } else if (data.state === 'IDLE') {
          setIsListening(false);
          setIsSpeaking(false);
          setStatusText("Ready. Select another prompt or speak again.");
          if (onSelectBotState) onSelectBotState('IDLE');
        }
      } else if (event === 'error') {
        setIsListening(false);
        setErrorMessage(data.message || "Microphone access is needed for live conversation.");
        if (onSelectBotState) onSelectBotState('IDLE');
      }
    });

    return () => unsubscribe();
  }, [onSelectBotState]);

  const handleStartMic = async () => {
    setErrorMessage(null);
    const success = await voiceAgent.startListening({
      onError: (err) => {
        setErrorMessage("Microphone access was denied or is not supported. You can still test with the prompt buttons below!");
      },
    });
  };

  const handleQuickPrompt = (promptText) => {
    setErrorMessage(null);
    voiceAgent.stopConversation();
    voiceAgent.handleUserInput(promptText);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171522]/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-2xl p-5 sm:p-6 shadow-2xl border border-[#7657E8]/15 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#7657E8]/10 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#EDE7FF] flex items-center justify-center text-[#7657E8]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#171522]">
                Talk to Voxly
              </h3>
              <p className="text-xs text-[#6F6B7D]">
                Real-Time Voice Agent with Speech Synthesis & 3D Lip-Sync
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FAF9FD] hover:bg-[#EDE7FF] flex items-center justify-center text-[#6F6B7D] hover:text-[#171522]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message Log */}
        <div className="space-y-3 mb-6 max-h-[220px] overflow-y-auto pr-1">
          {conversationHistory.map((item, i) => {
            const isVoxly = item.speaker === 'Voxly';
            return (
              <div
                key={i}
                className={`p-3.5 rounded-2xl text-xs sm:text-sm ${
                  isVoxly
                    ? 'bg-[#FAF9FD] text-[#171522] border border-[#7657E8]/12 mr-6'
                    : 'bg-[#7657E8] text-white ml-6 text-right'
                }`}
              >
                <div className={`text-[10px] font-bold uppercase mb-1 ${isVoxly ? 'text-[#7657E8]' : 'text-[#EDE7FF]'}`}>
                  {item.speaker}
                </div>
                <p className="leading-relaxed">{item.text}</p>
              </div>
            );
          })}
        </div>

        {/* Status Indicator */}
        <div className="p-3 rounded-xl bg-[#FAF9FD] border border-[#7657E8]/10 text-center mb-5">
          <div className="text-xs font-semibold text-[#6F6B7D] flex items-center justify-center gap-2">
            {isListening && <span className="w-2.5 h-2.5 rounded-full bg-[#E85D75] animate-ping" />}
            {isSpeaking && <Volume2 className="w-4 h-4 text-[#7657E8] animate-bounce" />}
            <span>{statusText}</span>
          </div>
        </div>

        {/* Error message banner */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-[#E85D75]/10 border border-[#E85D75]/20 text-xs text-[#E85D75] flex items-start gap-2 mb-4">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Microphone Button */}
        <div className="flex flex-col items-center justify-center mb-5">
          <button
            onClick={isListening ? () => voiceAgent.stopListening() : handleStartMic}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
              isListening
                ? 'bg-[#E85D75] text-white scale-110 shadow-[#E85D75]/40 animate-pulse'
                : 'bg-gradient-to-tr from-[#7657E8] to-[#9B7BF7] text-white hover:scale-105 shadow-[#7657E8]/30'
            }`}
            aria-label={isListening ? 'Stop listening' : 'Start speaking'}
          >
            {isListening ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
          </button>
          <span className="text-[11px] font-bold text-[#6F6B7D] mt-2">
            {isListening ? 'Tap to Stop Listening' : 'Tap to Speak'}
          </span>
        </div>

        {/* Quick Question Chips */}
        <div>
          <span className="text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider block mb-2 text-center">
            Or Click a Sample Question:
          </span>
          <div className="flex flex-wrap gap-2 justify-center">
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleQuickPrompt(prompt)}
                className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#EDE7FF]/60 hover:bg-[#EDE7FF] text-[#4C3A91] transition-colors border border-[#7657E8]/10"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
