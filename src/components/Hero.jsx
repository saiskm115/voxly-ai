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
    expression: "HAPPY",
    gesture: "RIGHT_HAND_WAVE",
    mood: "friendly",
  },
  {
    title: "Voxly",
    message: "Hiii! Excited to scale your voice workflows! ✨ Ready for 500+ calls.",
    speech: "Hiii! Excited to scale your voice workflows! Ready for 500 plus calls.",
    expression: "EXCITED",
    gesture: "DOUBLE_WAVE",
    mood: "excited",
  },
  {
    title: "Voxly (Acrobatic)",
    message: "Whoaaa! Watch this barrel roll! 🎉 360° celebratory spin & wave!",
    speech: "Whoaaa! Watch this barrel roll! Double hi to you!",
    expression: "EXCITED",
    gesture: "ROLL_DOUBLE_WAVE",
    mood: "celebration",
  },
  {
    title: "Voxly",
    message: "Don't tickle me! Haha! Double hi to you! 👋😄👋",
    speech: "Don't tickle me! Haha! Double hi to you!",
    expression: "EXCITED",
    gesture: "DOUBLE_WAVE",
    mood: "playful",
  },
  {
    title: "Voxly",
    message: "Double barrel roll & high five! 🚀✨ Let's conquer customer calls!",
    speech: "Double barrel roll and high five! Let's conquer customer calls!",
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
  const autoLoopTimerRef = useRef(null);
  const popupAutoDismissTimerRef = useRef(null);
  const loopIndexRef = useRef(0);
  const isHoveredRef = useRef(false);

  // Clean up all timers on unmount
  useEffect(() => {
    return () => {
      if (autoLoopTimerRef.current) clearTimeout(autoLoopTimerRef.current);
      if (popupAutoDismissTimerRef.current) clearTimeout(popupAutoDismissTimerRef.current);
    };
  }, []);

  // Centralized step execution for both automatic loop & manual clicks
  const executeStep = (stepData) => {
    setActivePopup(stepData);
    setBotExpression(stepData.expression);

    // Auto-dismiss dialogue box after 4.8 seconds
    if (popupAutoDismissTimerRef.current) {
      clearTimeout(popupAutoDismissTimerRef.current);
    }
    popupAutoDismissTimerRef.current = setTimeout(() => {
      if (!isHoveredRef.current) {
        setActivePopup(null);
      }
    }, 4800);

    // Trigger 3D robot expression & physical animation (wave / 360 roll / double wave)
    if (botControllerRef?.current) {
      botControllerRef.current.setExpression(stepData.expression, true);
      if (stepData.gesture) {
        botControllerRef.current.playGesture(stepData.gesture);
      }
    }

    // Play synthesized voice & greeting chime
    voiceAgent.playTTS(stepData.speech);
  };

  // Schedule next automated step when user doesn't do anything
  const scheduleNextAutoStep = (delayMs = 7200) => {
    if (autoLoopTimerRef.current) {
      clearTimeout(autoLoopTimerRef.current);
    }

    autoLoopTimerRef.current = setTimeout(() => {
      // Only run if user is currently viewing the Hero section and no modal is open
      if (!isHeroInView || isModalOpen) return;

      const stepIndex = loopIndexRef.current % SEQUENCE_STEPS.length;
      loopIndexRef.current = (loopIndexRef.current + 1) % SEQUENCE_STEPS.length;

      executeStep(SEQUENCE_STEPS[stepIndex]);

      // Schedule next automated step (4.8s visible + 2.4s pause = 7.2s cycle)
      scheduleNextAutoStep(7200);
    }, delayMs);
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

  // AUTOMATIC LOOP CONTROLLER:
  // 1) If user didn't do anything, runs the clicking expressions automatically in a loop
  // 2) When user goes to another section, pauses loop and resets to 0
  // 3) When user returns to the modal section, restarts again from Step 1!
  useEffect(() => {
    if (isHeroInView && !isModalOpen) {
      // User is viewing the Hero/modal section: restart loop from Step 1!
      loopIndexRef.current = 0;
      clickCountRef.current = 0;
      // Start initial step after 1.8s so 3D model finishes initial mount
      scheduleNextAutoStep(1800);
    } else {
      // User scrolled to another section or opened modal: pause loop, close popup, reset index
      if (autoLoopTimerRef.current) clearTimeout(autoLoopTimerRef.current);
      if (popupAutoDismissTimerRef.current) clearTimeout(popupAutoDismissTimerRef.current);
      setActivePopup(null);
      loopIndexRef.current = 0;
      clickCountRef.current = 0;
      if (botControllerRef?.current) {
        botControllerRef.current.setExpression('HAPPY', false);
      }
    }

    return () => {
      if (autoLoopTimerRef.current) clearTimeout(autoLoopTimerRef.current);
      if (popupAutoDismissTimerRef.current) clearTimeout(popupAutoDismissTimerRef.current);
    };
  }, [isHeroInView, isModalOpen]);

  const handleMouseEnterPopup = () => {
    isHoveredRef.current = true;
    if (popupAutoDismissTimerRef.current) {
      clearTimeout(popupAutoDismissTimerRef.current);
    }
  };

  const handleMouseLeavePopup = () => {
    isHoveredRef.current = false;
    // Dismiss dialogue box after 3.2s when mouse leaves
    if (popupAutoDismissTimerRef.current) {
      clearTimeout(popupAutoDismissTimerRef.current);
    }
    popupAutoDismissTimerRef.current = setTimeout(() => {
      setActivePopup(null);
    }, 3200);
  };

  // Interactive quick action triggers from dialogue modal buttons
  const triggerBotAction = (actionType) => {
    if (!botControllerRef?.current) return;
    if (actionType === 'WAVE') {
      botControllerRef.current.setExpression('HAPPY', true);
      botControllerRef.current.playGesture('RIGHT_HAND_WAVE');
      voiceAgent.playTTS("Hello again! Always happy to wave!");
    } else if (actionType === 'ROLL') {
      botControllerRef.current.setExpression('EXCITED', true);
      botControllerRef.current.playGesture('ROLL_DOUBLE_WAVE');
      voiceAgent.playTTS("Whoaaa! Full 360 spin and wave!");
    } else if (actionType === 'REPLAY') {
      if (activePopup?.speech) {
        voiceAgent.playTTS(activePopup.speech);
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
  // Manual clicks also work seamlessly at any time, advancing the sequence
  const handleBotClick = () => {
    const now = Date.now();
    if (now - lastClickTimeRef.current < 420) {
      return; // Ignore duplicate synthetic/bubbling events
    }
    lastClickTimeRef.current = now;

    // Pause auto-loop while user is actively clicking
    if (autoLoopTimerRef.current) {
      clearTimeout(autoLoopTimerRef.current);
    }

    clickCountRef.current += 1;
    const count = clickCountRef.current;

    let stepData = null;
    if (count <= SEQUENCE_STEPS.length) {
      stepData = SEQUENCE_STEPS[count - 1];
      // Keep loop index synchronized with user's clicks
      loopIndexRef.current = count % SEQUENCE_STEPS.length;
    } else {
      // 6th click+: Pouty / angry expression
      stepData = {
        title: "Voxly (Pouty)",
        message: "Hey! Don't poke me, I have calls to make! 😤 Click 'Live Mic Chat' instead!",
        speech: "Hey! Don't poke me, I have calls to make! Click live mic chat instead!",
        expression: "ANGRY",
        gesture: null,
        mood: "angry",
      };
      // Reset counter after angry poke so next clicks or idle loop restart fresh
      clickCountRef.current = 0;
      loopIndexRef.current = 0;
    }

    executeStep(stepData);

    // Resume the automated loop after 7.5 seconds of user inactivity
    scheduleNextAutoStep(7500);
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-[90vh] pt-28 pb-16 overflow-hidden subtle-mesh-bg flex items-center"
    >
      {/* Decorative ambient background glows */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-gradient-to-br from-[#EDE7FF]/70 via-[#E4DCFF]/40 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-48 right-10 w-96 h-96 bg-[#9B7BF7]/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Typography & CTAs matching reference */}
          <div className="lg:col-span-6 flex flex-col items-start z-10">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDE7FF] border border-[#7657E8]/15 text-[#7657E8] text-xs font-bold tracking-widest uppercase mb-5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{HERO_CONTENT.eyebrow}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-[#171522] leading-[1.08] tracking-tight mb-5">
              {HERO_CONTENT.titleLine1}{' '}
              <span className="block gradient-text-lavender">
                {HERO_CONTENT.titleHighlight}
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-sm sm:text-base text-[#6F6B7D] leading-relaxed max-w-xl mb-7">
              {HERO_CONTENT.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 mb-8 w-full sm:w-auto">
              {/* Primary CTA */}
              <button
                onClick={onGetStarted}
                className="group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#7657E8] to-[#9B7BF7] hover:from-[#6A47E5] hover:to-[#8E6DF5] shadow-md shadow-[#7657E8]/35 hover:shadow-lg hover:shadow-[#7657E8]/45 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <span>{HERO_CONTENT.ctaPrimary}</span>
              </button>

              {/* Secondary CTA: Talk to AI */}
              <button
                onClick={onTalkToMe}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-bold text-[#171522] bg-white hover:bg-[#F9F8FD] border border-[#7657E8]/20 shadow-xs hover:shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <div className="w-7 h-7 rounded-full bg-[#7657E8] flex items-center justify-center text-white shadow-xs">
                  <Mic className="w-3.5 h-3.5" />
                </div>
                <span>{HERO_CONTENT.ctaSecondary}</span>
              </button>
            </div>

            {/* Value Props / Checkmarks matching reference */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs font-semibold text-[#6F6B7D]">
              {HERO_CONTENT.perks.map((perk) => (
                <div key={perk} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#7657E8] flex items-center justify-center text-white text-[9px]">
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
                onControllerReady={(ctrl) => {
                  botControllerRef.current = ctrl;
                }}
              />

              {/* Dynamic Interactive Dialogue Box on Click — positioned on the RIGHT side of the robot */}
              {activePopup && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  onMouseEnter={handleMouseEnterPopup}
                  onMouseLeave={handleMouseLeavePopup}
                  className={`absolute top-2 right-2 sm:right-4 lg:-right-4 max-w-[280px] sm:max-w-[310px] p-4 rounded-2xl shadow-xl border animate-in fade-in zoom-in-95 duration-200 z-30 transition-all ${
                    activePopup.mood === 'angry'
                      ? 'bg-[#171522]/95 text-white border-[#FF3366]/50 shadow-[#FF3366]/20'
                      : 'bg-white/95 text-[#171522] border-[#7657E8]/25 shadow-[#7657E8]/15'
                  }`}
                >
                  {/* Subtle speech pointer pointing to the robot on the left */}
                  <div
                    className={`absolute top-6 -left-1.5 w-3 h-3 rotate-45 border-l border-b hidden sm:block ${
                      activePopup.mood === 'angry'
                        ? 'bg-[#171522] border-[#FF3366]/50'
                        : 'bg-white border-[#7657E8]/25'
                    }`}
                  />

                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#20B486] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#20B486]"></span>
                      </span>
                      <span
                        className={`text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                          activePopup.mood === 'angry' ? 'text-[#FF3366]' : 'text-[#7657E8]'
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5" /> {activePopup.title}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActivePopup(null);
                      }}
                      className="text-xs font-bold opacity-60 hover:opacity-100 p-0.5"
                      title="Dismiss"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-xs font-semibold leading-relaxed mb-3">
                    {activePopup.message}
                  </p>

                  {/* Quick Interactive Action Buttons right inside dialogue box */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerBotAction('WAVE');
                      }}
                      className="px-2 py-1 bg-[#EDE7FF] hover:bg-[#E2D8FF] text-[#7657E8] text-[10px] font-bold rounded-lg transition-colors flex items-center gap-1 shadow-xs"
                      title="Make Voxly wave"
                    >
                      👋 Wave
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerBotAction('ROLL');
                      }}
                      className="px-2 py-1 bg-[#EDE7FF] hover:bg-[#E2D8FF] text-[#7657E8] text-[10px] font-bold rounded-lg transition-colors flex items-center gap-1 shadow-xs"
                      title="Make Voxly roll 360"
                    >
                      🤸 Roll & Wave
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerBotAction('REPLAY');
                      }}
                      className="px-2 py-1 bg-[#FAF9FD] hover:bg-[#EDE7FF] text-[#6F6B7D] hover:text-[#171522] border border-[#7657E8]/10 text-[10px] font-bold rounded-lg transition-colors flex items-center gap-1"
                      title="Replay speech"
                    >
                      <Volume2 className="w-2.5 h-2.5" /> Replay
                    </button>
                  </div>

                  <div className="pt-2 border-t border-[#7657E8]/10 flex items-center justify-between gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onTalkToMe();
                      }}
                      className="py-1 px-2.5 bg-[#7657E8] hover:bg-[#6845DF] text-white text-[10px] font-bold rounded-lg transition-colors flex items-center gap-1 shadow-xs"
                    >
                      <Mic className="w-3 h-3" /> Live Mic Chat
                    </button>
                    <span className="text-[10px] opacity-60 flex items-center gap-1">
                      <Volume2 className="w-3 h-3" /> Voice active
                    </span>
                  </div>
                </div>
              )}

              {/* Handwritten Script badge matching reference: "Always On For Your Business" */}
              <div className="absolute bottom-4 right-2 sm:right-6 pointer-events-none select-none z-10 flex flex-col items-center">
                <span className="font-handwriting text-2xl sm:text-3xl text-[#7657E8] font-bold -rotate-6 drop-shadow-xs">
                  Always On
                </span>
                <span className="font-handwriting text-2xl sm:text-3xl text-[#4C3A91] font-bold -rotate-6">
                  For Your Business
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
