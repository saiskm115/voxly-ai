import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Volume2, Sparkles, CheckCircle2 } from 'lucide-react';
import { voiceAgent } from '../services/voiceAgent';

const DEMO_STEPS = [
  {
    speaker: "Voxly AI",
    text: "Hello! Thank you for calling CloudMetrics. My name is Voxly, your autonomous voice rep. Are you looking to upgrade your current data warehousing plan or resolve an existing pipeline question?",
    time: "0:03",
  },
  {
    speaker: "Prospect",
    text: "Hi! We're currently processing 40 million events per day on Snowflake and our queries are hitting concurrency limits. What's your integration timeline?",
    time: "0:09",
  },
  {
    speaker: "Voxly AI",
    text: "We deploy a direct zero-copy connector with Snowflake that activates in under 15 minutes. Our enterprise customers typically see a 4.2x speedup on concurrent analytics while cutting compute spend by 30%. Would you like to schedule a 15-minute technical benchmark with our solutions team?",
    time: "0:17",
  },
  {
    speaker: "Prospect",
    text: "Yes, that sounds great. What days do you have open this week?",
    time: "0:23",
  },
  {
    speaker: "Voxly AI",
    text: "I have Thursday at 11 AM Eastern or Friday at 2 PM Eastern available on our solutions architect's calendar. Which one suits your schedule best?",
    time: "0:29",
  },
];

export function WatchDemoModal({ isOpen, onClose, onSelectBotState }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      voiceAgent.stopTTS();
      setIsPlaying(false);
      setCurrentStep(0);
      if (onSelectBotState) onSelectBotState('IDLE');
    }
  }, [isOpen, onSelectBotState]);

  useEffect(() => {
    let timer = null;
    if (isPlaying) {
      const step = DEMO_STEPS[currentStep];
      if (step.speaker === 'Voxly AI') {
        if (onSelectBotState) onSelectBotState('TALKING');
        voiceAgent.playTTS(step.text, {
          onEnd: () => {
            proceedToNext();
          },
        });
      } else {
        if (onSelectBotState) onSelectBotState('LISTENING');
        timer = setTimeout(() => {
          proceedToNext();
        }, 3200);
      }
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep]);

  const proceedToNext = () => {
    if (currentStep < DEMO_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsPlaying(false);
      if (onSelectBotState) onSelectBotState('IDLE');
    }
  };

  const handleTogglePlay = () => {
    if (!isPlaying && currentStep >= DEMO_STEPS.length - 1) {
      setCurrentStep(0);
    }
    setIsPlaying(!isPlaying);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171522]/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl p-5 sm:p-6 shadow-2xl border border-[#7657E8]/15 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#7657E8]/10 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#7657E8] to-[#B18CFE] flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#171522]">
                Interactive Voice Employee Demo
              </h3>
              <p className="text-xs text-[#6F6B7D]">
                Simulating Live Telephony Inbound Call with Real-time TTS
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FAF9FD] hover:bg-[#EDE7FF] flex items-center justify-center text-[#6F6B7D] hover:text-[#171522] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Live Conversation Display */}
        <div className="space-y-3 mb-6 max-h-[280px] overflow-y-auto pr-2">
          {DEMO_STEPS.slice(0, currentStep + 1).map((step, idx) => {
            const isVoxly = step.speaker === 'Voxly AI';
            const isCurrent = idx === currentStep;
            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl transition-all duration-300 ${
                  isVoxly
                    ? 'bg-[#FAF9FD] border-l-4 border-l-[#7657E8] border border-[#7657E8]/10'
                    : 'bg-[#EDE7FF]/30 border-l-4 border-l-[#5D6FEF] border border-[#5D6FEF]/10'
                } ${isCurrent ? 'ring-2 ring-[#7657E8]/30' : 'opacity-85'}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-bold ${isVoxly ? 'text-[#7657E8]' : 'text-[#5D6FEF]'}`}>
                    {step.speaker}
                  </span>
                  <span className="text-[10px] text-[#6F6B7D] font-mono">{step.time}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#171522] leading-relaxed">
                  {step.text}
                </p>
              </div>
            );
          })}
        </div>

        {/* Playback Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#7657E8]/10">
          <div className="flex items-center gap-2 text-xs text-[#20B486] font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Audio & Lip-Sync Driver Connected</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setCurrentStep(0);
                setIsPlaying(false);
                voiceAgent.stopTTS();
                if (onSelectBotState) onSelectBotState('IDLE');
              }}
              className="p-2.5 rounded-xl bg-[#FAF9FD] hover:bg-[#EDE7FF] text-[#6F6B7D]"
              title="Restart Demo"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={handleTogglePlay}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#7657E8] to-[#9B7BF7] hover:from-[#6A47E5] hover:to-[#8E6DF5] shadow-md shadow-[#7657E8]/25 transition-all"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isPlaying ? 'Pause Demo' : 'Play Live Voice Demo'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
