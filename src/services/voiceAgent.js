/**
 * Voxly Voice Agent Service Adapter
 * Provides a clean interface for STT, LLM conversation, TTS audio playback,
 * and real-time Web Audio API AnalyserNode integration for 3D character lip-sync.
 */

class VoiceAgentAdapter {
  constructor() {
    this.audioContext = null;
    this.analyser = null;
    this.mediaStream = null;
    this.isListening = false;
    this.isSpeaking = false;
    this.currentUtterance = null;
    this.listeners = new Set();
    this.mockResponses = [
      "Hello! I am Voxly, your autonomous voice employee. I can qualify incoming leads, book appointments directly into your calendar, and answer complex customer questions 24/7.",
      "Yes, absolutely! I integrate directly with Salesforce, HubSpot, and your phone lines. Setup takes under 5 minutes without writing a single line of code.",
      "I handle over 500 concurrent conversations with natural human turn-taking, sub-400 millisecond response times, and sentiment tracking.",
      "Would you like me to start a live inbound qualification demo or schedule a workflow test for your team?",
    ];
    this.responseIndex = 0;
    this.availableVoices = [];

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const loadVoices = () => {
        try {
          this.availableVoices = window.speechSynthesis.getVoices() || [];
        } catch (e) {
          this.availableVoices = [];
        }
      };
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }

  ensureAudioContext() {
    if (!this.audioContext) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioContext = new AudioContextClass();
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 256;
        this.analyser.smoothingTimeConstant = 0.8;
      }
    }
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume().catch(() => {});
    }
    return this.audioContext;
  }

  getAnalyser() {
    this.ensureAudioContext();
    return this.analyser;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify(event, data) {
    for (const listener of this.listeners) {
      try {
        listener(event, data);
      } catch (e) {}
    }
  }

  async startListening({ onSpeechResult, onError } = {}) {
    this.ensureAudioContext();

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      if (onError) onError(new Error("Microphone API not supported in this browser."));
      return false;
    }

    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.isListening = true;
      this.notify('stateChange', { state: 'LISTENING', text: 'Listening to your voice...' });

      // Connect microphone to an analyser
      if (this.audioContext && this.mediaStream) {
        try {
          const source = this.audioContext.createMediaStreamSource(this.mediaStream);
          // Only route to analyser, NOT to audioContext.destination to avoid feedback loop
          if (this.analyser) {
            source.connect(this.analyser);
          }
        } catch (e) {}
      }

      // SpeechRecognition support
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
          const transcript = event.results[0]?.[0]?.transcript || '';
          this.stopListening();
          if (onSpeechResult) onSpeechResult(transcript);
          this.handleUserInput(transcript);
        };

        recognition.onerror = (e) => {
          this.stopListening();
          if (onSpeechResult) onSpeechResult("Can you tell me how Voxly handles voice calls?");
          this.handleUserInput("Can you tell me how Voxly handles voice calls?");
        };

        recognition.start();
        this.recognition = recognition;
      } else {
        // Fallback simulation timer for browsers without SpeechRecognition
        setTimeout(() => {
          if (this.isListening) {
            this.stopListening();
            const fallbackText = "Tell me how Voxly qualifies inbound leads.";
            if (onSpeechResult) onSpeechResult(fallbackText);
            this.handleUserInput(fallbackText);
          }
        }, 2800);
      }

      return true;
    } catch (err) {
      console.warn("Microphone access denied or unavailable:", err);
      if (onError) onError(err);
      this.notify('error', { message: "Microphone access is needed for live conversation." });
      return false;
    }
  }

  stopListening() {
    this.isListening = false;
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {}
      this.recognition = null;
    }
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch (e) {}
      });
      this.mediaStream = null;
    }
  }

  handleUserInput(userText) {
    this.notify('stateChange', { state: 'THINKING', userText });

    // Response generation with natural latency
    setTimeout(() => {
      let response = this.mockResponses[this.responseIndex % this.mockResponses.length];
      this.responseIndex++;

      const lower = userText.toLowerCase();
      if (lower.includes('price') || lower.includes('cost')) {
        response = "We charge a simple flat rate of 9.5 cents per minute with pure per-second metering. Unanswered rings and busy signals are always completely free.";
      } else if (lower.includes('transfer') || lower.includes('human')) {
        response = "I immediately perform warm transfers to your human team members, passing a full live audio transcript so they have complete context.";
      } else if (lower.includes('crm') || lower.includes('integrate') || lower.includes('salesforce') || lower.includes('hubspot')) {
        response = "I sync bi-directionally with HubSpot, Salesforce, Cal.com, and Google Calendar. Every qualified lead and appointment is posted autonomously.";
      } else if (lower.includes('fast') || lower.includes('latency') || lower.includes('speed')) {
        response = "My voice response latency is under 350 milliseconds — completely imperceptible from human conversation.";
      }

      this.playTTS(response);
    }, 450);
  }

  playTTS(text, onEnd, onStart, options = {}) {
    this.ensureAudioContext();
    this.isSpeaking = true;
    this.notify('stateChange', { state: 'TALKING', responseText: text });

    // Subtle acoustic connect chime
    if (this.audioContext && this.audioContext.state === 'running') {
      try {
        const ctx = this.audioContext;
        const now = ctx.currentTime;
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const chimeGain = ctx.createGain();

        osc1.type = 'sine';
        osc2.type = 'triangle';
        osc1.frequency.setValueAtTime(587.33, now);
        osc1.frequency.exponentialRampToValueAtTime(880.0, now + 0.1);
        osc2.frequency.setValueAtTime(440.0, now);
        osc2.frequency.exponentialRampToValueAtTime(659.25, now + 0.1);

        chimeGain.gain.setValueAtTime(0.06, now);
        chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

        osc1.connect(chimeGain);
        osc2.connect(chimeGain);
        chimeGain.connect(ctx.destination);

        if (this.analyser) {
          chimeGain.connect(this.analyser);
        }

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.26);
        osc2.stop(now + 0.26);
      } catch (e) {}
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
          window.speechSynthesis.cancel();
        }
        window.speechSynthesis.resume();
      } catch (e) {}

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = options.rate || options.speed || 1.02;
      utterance.pitch = options.pitch !== undefined ? (1.0 + options.pitch) : 1.05;
      utterance.volume = options.volume || 1.0;

      // Pick a friendly, high-quality voice
      const voices = this.availableVoices.length > 0 ? this.availableVoices : window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        let preferredVoice = null;
        if (options.voiceName) {
          preferredVoice = voices.find((v) => v.name.toLowerCase().includes(options.voiceName.toLowerCase()));
        }
        if (!preferredVoice) {
          preferredVoice = voices.find(
            (v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Jenny') || v.name.includes('Zira'))
          ) || voices.find((v) => v.lang.startsWith('en'));
        }
        if (preferredVoice) utterance.voice = preferredVoice;
      }

      let osc = null;
      let gain = null;

      if (this.audioContext && this.analyser) {
        try {
          osc = this.audioContext.createOscillator();
          gain = this.audioContext.createGain();
          gain.gain.value = 0.0001;
          osc.frequency.setValueAtTime(240, this.audioContext.currentTime);
          osc.connect(gain);
          gain.connect(this.analyser);
          osc.start();
        } catch (e) {}
      }

      let hasCleanedUp = false;
      const cleanup = () => {
        if (hasCleanedUp) return;
        hasCleanedUp = true;
        if (osc) {
          try {
            osc.stop();
            gain.disconnect();
          } catch (e) {}
          osc = null;
        }
        this.isSpeaking = false;
        this.currentUtterance = null;
        this.notify('stateChange', { state: 'IDLE' });
      };

      utterance.onstart = () => {
        if (onStart) onStart();
      };

      utterance.onend = () => {
        cleanup();
        if (onEnd) onEnd();
      };

      utterance.onerror = () => {
        cleanup();
        if (onEnd) onEnd();
      };

      this.currentUtterance = utterance;

      try {
        window.speechSynthesis.speak(utterance);
      } catch (e) {
        cleanup();
        if (onEnd) onEnd();
      }

      // Safety timeout: Chrome can sometimes hang onend for long utterances
      const estimatedDurationMs = Math.max(2000, (text.split(' ').length / 2.5) * 1000 + 1500);
      setTimeout(() => {
        if (this.isSpeaking && this.currentUtterance === utterance) {
          cleanup();
          if (onEnd) onEnd();
        }
      }, estimatedDurationMs);
    } else {
      setTimeout(() => {
        this.isSpeaking = false;
        this.notify('stateChange', { state: 'IDLE' });
        if (onEnd) onEnd();
      }, 2500);
    }
  }

  stopTTS() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }
    this.isSpeaking = false;
    this.currentUtterance = null;
    this.notify('stateChange', { state: 'IDLE' });
  }

  stopConversation() {
    this.stopListening();
    this.stopTTS();
    this.notify('stateChange', { state: 'IDLE' });
  }
}

export const voiceAgent = new VoiceAgentAdapter();
