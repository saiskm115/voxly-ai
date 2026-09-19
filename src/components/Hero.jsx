import React, { useState, useRef, useEffect } from 'react';
import { VoxlyScene } from '../three/VoxlyScene';
import { HERO_CONTENT } from '../data/siteContent';
import { voiceAgent } from '../services/voiceAgent';
import { Play, Check, Sparkles, Mic, Volume2, X } from 'lucide-react';


const SEQUENCE_STEPS = [
  {
    title: "Voxly",
    message: "Hello! Hiii! 👋 I'm Voxly! Nice to meet you!",
    speech: "Hello! Hiii! I am Voxly! Nice to meet you!",
    audioSrc: "/audio/voxly/hero_step1.mp3",
    expression: "HAPPY",
    gesture: "RIGHT_HAND_WAVE",
    mood: "friendly",
  },
  {
    title: "Voxly",
    message: "Hiii! Excited to scale your voice workflows! ✨ Ready for 500+ calls.",
    speech: "Hiii! Excited to scale your voice workflows! Ready for 500 plus calls.",
    audioSrc: "/audio/voxly/hero_step2.mp3",
    expression: "EXCITED",
    gesture: "DOUBLE_WAVE",
    mood: "excited",
  },
  {
    title: "Voxly (Acrobatic)",
    message: "Whoaaa! Watch this barrel roll! 🎉 360° celebratory spin & wave!",
    speech: "Whoaaa! Watch this barrel roll! Double hi to you!",
    audioSrc: "/audio/voxly/hero_step3.mp3",
    expression: "EXCITED",
    gesture: "ROLL_DOUBLE_WAVE",
    mood: "celebration",
  },
  {
    title: "Voxly",
    message: "Don't tickle me! Haha! Double hi to you! 👋😄👋",
    speech: "Don't tickle me! Haha! Double hi to you!",
    audioSrc: "/audio/voxly/hero_step4.mp3",
    expression: "EXCITED",
    gesture: "DOUBLE_WAVE",
    mood: "playful",
  },
  {
    title: "Voxly",
    message: "Double barrel roll & high five! 🚀✨ Let's conquer customer calls!",
    speech: "Double barrel roll and high five! Let's conquer customer calls!",
    audioSrc: "/audio/voxly/hero_step5.mp3",
    expression: "EXCITED",
    gesture: "ROLL_DOUBLE_WAVE",
    mood: "celebration",
  },
];

export function Hero({
  botState,
  setBotState,
  onTalkToMe,
  onWatchDemo,
  onGetStarted,
  botControllerRef,
  isModalOpen = false,
}) {
  const heroRef = useRef(null);
  const sceneContainerRef = useRef(null);
  const [heroPointer, setHeroPointer] = useState({ x: 0, y: 0 });
  const [botExpression, setBotExpression] = useState('HAPPY');
  const [activePopup, setActivePopup] = useState(null);
  const [isHeroInView, setIsHeroInView] = useState(true);

  const clickCountRef = useRef(0);
  const lastClickTimeRef = useRef(0);
  const popupAutoDismissTimerRef = useRef(null);
  const loopIndexRef = useRef(0);
  const isHoveredRef = useRef(false);

  // Clean up all timers on unmount
  useEffect(() => {
    return () => {
      if (popupAutoDismissTimerRef.current) clearTimeout(popupAutoDismissTimerRef.current);
    };
  }, []);

  // Helper to start the 3-second auto-dismiss timer
  const resetDismissTimer = (durationMs = 3000) => {
    if (popupAutoDismissTimerRef.current) {
      clearTimeout(popupAutoDismissTimerRef.current);
    }
    popupAutoDismissTimerRef.current = setTimeout(() => {
      if (!isHoveredRef.current) {
        setActivePopup(null);
      }
    }, durationMs);
  };

  // Centralized step execution for user-initiated interactions
  const executeStep = (stepData) => {
    setActivePopup(stepData);
    setBotExpression(stepData.expression);

    // Auto-dismiss dialogue box after exactly 3 seconds as required
    resetDismissTimer(3000);

    // Trigger 3D robot expression & physical animation (wave / 360 roll / double wave)
    if (botControllerRef?.current) {
      botControllerRef.current.setExpression(stepData.expression, true);
      if (stepData.gesture) {
        botControllerRef.current.playGesture(stepData.gesture);
      }
    }

    // Play high-clarity pre-rendered neural voice clip with lip-sync and chime sound
    const soundType = stepData.mood === 'angry' ? 'tickle' : stepData.gesture?.includes('ROLL') ? 'roll' : stepData.gesture?.includes('WAVE') ? 'wave' : 'happy';
    if (stepData.audioSrc) {
      voiceAgent.playAudioClip(stepData.audioSrc, null, null, { soundType });
    } else {
      voiceAgent.playTTS(stepData.speech, null, null, { soundType });
    }
  };

  // Section observer: Detect when user is in Hero section vs other sections
  useEffect(() => {
    if (!heroRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  // When user scrolls away or modal opens, dismiss dialogue cleanly
  useEffect(() => {
    if (!isHeroInView || isModalOpen) {
      if (popupAutoDismissTimerRef.current) clearTimeout(popupAutoDismissTimerRef.current);
      setActivePopup(null);
      clickCountRef.current = 0;
      loopIndexRef.current = 0;
      if (botControllerRef?.current) {
        botControllerRef.current.setExpression('HAPPY', false);
      }
    }
  }, [isHeroInView, isModalOpen]);

  const handleMouseEnterPopup = () => {
    isHoveredRef.current = true;
    if (popupAutoDismissTimerRef.current) {
      clearTimeout(popupAutoDismissTimerRef.current);
    }
  };

  const handleMouseLeavePopup = () => {
    isHoveredRef.current = false;
    // Auto-dismiss after 3 seconds when mouse leaves
    resetDismissTimer(3000);
  };

  // Handle manual interaction buttons inside speech bubble
  const triggerBotAction = (actionType) => {
    if (!botControllerRef?.current) return;
    resetDismissTimer(3000);

    if (actionType === 'WAVE') {
      botControllerRef.current.setExpression('HAPPY', true);
      botControllerRef.current.playGesture('WAVE');
      voiceAgent.playAudioClip('/audio/voxly/hero_wave.mp3', null, null, { soundType: 'wave' });
    } else if (actionType === 'ROLL') {
      botControllerRef.current.setExpression('CONFIDENT', true);
      botControllerRef.current.playGesture('ROLL_DOUBLE_WAVE');
      voiceAgent.playAudioClip('/audio/voxly/hero_roll.mp3', null, null, { soundType: 'roll' });
    } else if (actionType === 'REPLAY') {
      if (activePopup?.audioSrc) {
        voiceAgent.playAudioClip(activePopup.audioSrc, null, null, { soundType: 'chime' });
      } else if (activePopup?.speech) {
        voiceAgent.playTTS(activePopup.speech, null, null, { soundType: 'chime' });
      }
    }
  };

  // ACCURATE MOUSE TRACKING RELATIVE TO ROBOT POSITION:
  // When cursor is on/near the robot, pointerX is 0 (robot looks straight forward at user).
  // When cursor is to the left, robot turns left (up to -60 deg).
  // When cursor is to the right, robot turns right (up to +60 deg).
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!sceneContainerRef.current) return;
      const botRect = sceneContainerRef.current.getBoundingClientRect();
      const botCenterX = botRect.left + botRect.width * 0.5;
      const botCenterY = botRect.top + botRect.height * 0.45;

      const diffX = e.clientX - botCenterX;
      const diffY = e.clientY - botCenterY;

      // Normalization scale: ~450px left/right corresponds to full -1 / +1 turn
      const maxDistX = Math.max(window.innerWidth * 0.42, 450);
      const maxDistY = Math.max(window.innerHeight * 0.38, 350);

      // Deadband & center-focus: when cursor is near the robot, smoothly lock to 0
      // so it looks directly forward at the user and NEVER turns away to the right!
      const distFromCenter = Math.abs(diffX);
      let rawNormX = Math.max(-1, Math.min(1, diffX / maxDistX));
      if (distFromCenter < 140) {
        // Smooth quadratic blend to 0 near center
        const t = distFromCenter / 140;
        rawNormX = rawNormX * (t * t);
      }

      const normalizedY = -Math.max(-1, Math.min(1, diffY / maxDistY));

      setHeroPointer({ x: rawNormX, y: normalizedY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // MANUAL CLICKS:
  // Debounced (420ms) so 1 physical click = 1 action increment
  // Manual clicks initiate interaction mode and display dialogue for 3 seconds
  const handleBotClick = () => {
    const now = Date.now();
    if (now - lastClickTimeRef.current < 420) {
      return; // Ignore duplicate synthetic/bubbling events
    }
    lastClickTimeRef.current = now;

    clickCountRef.current += 1;
    const count = clickCountRef.current;

    let stepData = null;
    if (count <= SEQUENCE_STEPS.length) {
      stepData = SEQUENCE_STEPS[count - 1];
      loopIndexRef.current = count % SEQUENCE_STEPS.length;
    } else {
      // 6th click+: Pouty / angry expression
      stepData = {
        title: "Voxly (Pouty)",
        message: "Hey! Don't poke me, I have calls to make! 😤 Click 'Live Mic Chat' instead!",
        speech: "Hey! Don't poke me, I have calls to make! Click live mic chat instead!",
        audioSrc: "/audio/voxly/hero_pouty.mp3",
        expression: "ANGRY",
        gesture: null,
        mood: "angry",
      };
      // Reset counter after angry poke so next clicks restart fresh
      clickCountRef.current = 0;
      loopIndexRef.current = 0;
    }

    executeStep(stepData);
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-[90vh] pt-28 pb-16 overflow-hidden flex items-center bg-[#FAF9FD]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Solid typography & tactile CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start z-10">
            {/* Eyebrow badge: Clean restrained label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white border border-[#E4E2EB] text-[#6344E7] text-xs font-bold tracking-wider uppercase mb-5 shadow-craft-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              <span>{HERO_CONTENT.eyebrow}</span>
            </div>

            {/* Main Headline: Solid high-contrast text */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-[#0F0E17] leading-[1.08] tracking-tight mb-5">
              {HERO_CONTENT.titleLine1}{' '}
              <span className="block text-[#0F0E17]">
                {HERO_CONTENT.titleHighlight}
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-sm sm:text-base text-[#524E5E] leading-relaxed max-w-xl mb-7">
              {HERO_CONTENT.subtitle}
            </p>

            {/* CTA Buttons: Emil Kowalski tactile buttons */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 mb-8 w-full sm:w-auto">
              {/* Primary CTA */}
              <button
                onClick={onGetStarted}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-[#0F0E17] hover:bg-[#232130] active:scale-[0.98] shadow-sm transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6344E7]"
              >
                <span>{HERO_CONTENT.ctaPrimary}</span>
              </button>

              {/* Secondary CTA: Talk to AI */}
              <button
                onClick={onTalkToMe}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold text-[#0F0E17] bg-white hover:bg-[#F9F8FD] border border-[#E4E2EB] active:scale-[0.98] shadow-xs transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6344E7]"
              >
                <div className="w-6 h-6 rounded-lg bg-[#FAF9FD] border border-[#E4E2EB] flex items-center justify-center text-[#6344E7]">
                  <Mic className="w-3.5 h-3.5" />
                </div>
                <span>{HERO_CONTENT.ctaSecondary}</span>
              </button>
            </div>

            {/* Value Props / Checkmarks */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs font-semibold text-[#524E5E]">
              {HERO_CONTENT.perks.map((perk) => (
                <div key={perk} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#EFECE6] flex items-center justify-center text-[#0F0E17] text-[9px]">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>{perk}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: 3D Three.js WebGL Scene */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
            
            {/* 3D WebGL Canvas Container */}
            <div
              ref={sceneContainerRef}
              onClick={handleBotClick}
              className="relative w-full h-[400px] sm:h-[460px] lg:h-[500px] flex items-center justify-center cursor-pointer"
            >
              <VoxlyScene
                state={botState}
                expression={botExpression}
                onBotClick={handleBotClick}
                onExpressionChange={(expr) => {
                  setBotExpression(expr);
                }}
                externalPointer={heroPointer}
                isInView={isHeroInView}
                onControllerReady={(ctrl) => {
                  botControllerRef.current = ctrl;
                }}
              />

              {/* Dynamic Interactive Dialogue Box on Interaction:
                  Increased by 30% in size (w-[255px] sm:w-[270px], p-3.5),
                  positioned at top-right side touching slightly the robot contour,
                  leaving robot animations, expressions, and 360 roll clearly visible.
                  Auto-hides after exactly 3 seconds unless hovered. */}
              {activePopup && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  onMouseEnter={handleMouseEnterPopup}
                  onMouseLeave={handleMouseLeavePopup}
                  className={`absolute top-3 right-1 sm:top-4 sm:right-3 md:right-4 lg:top-4 lg:right-2 xl:right-4 w-[255px] sm:w-[270px] p-3.5 rounded-2xl shadow-xl border z-30 transition-all ${
                    activePopup.mood === 'angry'
                      ? 'bg-[#111019] text-white border-red-500/40 shadow-xl'
                      : 'bg-white text-[#0F0E17] border-[#E4E2EB] shadow-craft-md'
                  }`}
                >
                  {/* Speech pointer directed towards the robot's upper contour */}
                  <div
                    className={`absolute top-5 -left-1.5 w-3 h-3 rotate-45 border-l border-b hidden sm:block ${
                      activePopup.mood === 'angry'
                        ? 'bg-[#111019] border-red-500/40'
                        : 'bg-white border-[#E4E2EB]'
                    }`}
                  />

                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
                      </span>
                      <span
                        className={`text-[11px] font-bold uppercase tracking-wider ${
                          activePopup.mood === 'angry' ? 'text-red-400' : 'text-[#6344E7]'
                        }`}
                      >
                        {activePopup.title}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActivePopup(null);
                      }}
                      className="text-xs font-bold opacity-60 hover:opacity-100 p-0.5 rounded transition-opacity"
                      title="Dismiss"
                      aria-label="Dismiss dialogue"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-xs font-medium text-[#524E5E] leading-relaxed mb-3">
                    {activePopup.message}
                  </p>

                  {/* Quick Interactive Action Buttons (Sized +30% proportionally) */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerBotAction('WAVE');
                      }}
                      className="px-2.5 py-1 bg-[#F0EEF6] hover:bg-[#E4E2EB] text-[#0F0E17] text-[9.5px] font-bold rounded-lg transition-colors shadow-2xs"
                      title="Make Voxly wave"
                    >
                      Wave
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerBotAction('ROLL');
                      }}
                      className="px-2.5 py-1 bg-[#F0EEF6] hover:bg-[#E4E2EB] text-[#0F0E17] text-[9.5px] font-bold rounded-lg transition-colors shadow-2xs"
                      title="Make Voxly roll 360"
                    >
                      Roll & Wave
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerBotAction('REPLAY');
                      }}
                      className="px-2.5 py-1 bg-[#FAF9FD] hover:bg-[#F0EEF6] text-[#524E5E] hover:text-[#0F0E17] border border-[#E4E2EB] text-[9.5px] font-bold rounded-lg transition-colors flex items-center gap-1"
                      title="Replay speech"
                    >
                      <Volume2 className="w-2.5 h-2.5" /> Replay
                    </button>
                  </div>

                  <div className="pt-2 border-t border-[#E4E2EB] flex items-center justify-between gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onTalkToMe();
                      }}
                      className="py-1 px-2.5 bg-[#6344E7] hover:bg-[#5234D4] text-white text-[9.5px] font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
                    >
                      <Mic className="w-3 h-3" /> Live Mic Chat
                    </button>
                    <span className="text-[9.5px] text-[#524E5E] flex items-center gap-1 font-medium">
                      <Volume2 className="w-2.5 h-2.5 text-[#10B981]" /> Active
                    </span>
                  </div>
                </div>
              )}

              {/* Status badge: Always On Fleet Indicator */}
              <div className="absolute bottom-4 right-2 sm:right-6 pointer-events-none select-none z-10 flex flex-col items-end">
                <div className="bg-white/95 backdrop-blur-xs border border-[#E4E2EB] shadow-craft-xs px-3 py-1.5 rounded-xl flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                  <span className="text-[11px] font-mono font-semibold text-[#0F0E17] uppercase tracking-wider">
                    Always On • 24/7 Fleet
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
