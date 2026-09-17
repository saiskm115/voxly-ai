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
      this.audioContext.resume();
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
      listener(event, data);
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

      // Connect microphone to an analyser if desired
      const source = this.audioContext.createMediaStreamSource(this.mediaStream);
      // We don't route microphone to audioContext.destination to avoid acoustic feedback!

      // Check SpeechRecognition support for demo transcript
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          this.stopListening();
          if (onSpeechResult) onSpeechResult(transcript);
          this.handleUserInput(transcript);
        };

        recognition.onerror = (e) => {
          console.warn("Speech recognition error:", e.error);
          this.stopListening();
          // Fallback demo input if speech recognition fails or is silent
          this.handleUserInput("Tell me how Voxly qualifies leads.");
        };

        recognition.start();
        this.recognition = recognition;
      } else {
        // Fallback simulation timer for browsers without SpeechRecognition
        setTimeout(() => {
          if (this.isListening) {
            this.stopListening();
            this.handleUserInput("Tell me how Voxly qualifies leads.");
          }
        }, 3200);
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
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
      this.mediaStream = null;
    }
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {}
      this.recognition = null;
    }
  }

  async handleUserInput(userText) {
    this.notify('stateChange', { state: 'THINKING', userText });

    // Simulate AI thinking latency (sub-500ms feel)
    setTimeout(() => {
      const response = this.mockResponses[this.responseIndex % this.mockResponses.length];
      this.responseIndex++;
      this.playTTS(response);
    }, 700);
  }

  playTTS(text, { onStart, onEnd } = {}) {
    const ctx = this.ensureAudioContext();
    this.isSpeaking = true;
    this.notify('stateChange', { state: 'TALKING', responseText: text });

    // Play a gentle, high-tech robot chime so user immediately hears audio feedback on click
    if (ctx) {
      try {
        const now = ctx.currentTime;
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const chimeGain = ctx.createGain();

        osc1.type = 'sine';
        osc2.type = 'triangle';
        osc1.frequency.setValueAtTime(587.33, now); // D5
        osc1.frequency.exponentialRampToValueAtTime(880.0, now + 0.12); // A5
        osc2.frequency.setValueAtTime(440.0, now); // A4
        osc2.frequency.exponentialRampToValueAtTime(659.25, now + 0.12); // E5

        chimeGain.gain.setValueAtTime(0.08, now);
        chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc1.connect(chimeGain);
        osc2.connect(chimeGain);
        chimeGain.connect(ctx.destination);

        if (this.analyser) {
          chimeGain.connect(this.analyser);
        }

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.36);
        osc2.stop(now + 0.36);
      } catch (e) {}
    }

    if ('speechSynthesis' in window) {
      try {
        if (window.speechSynthesis.speaking) {
          window.speechSynthesis.cancel();
        }
        window.speechSynthesis.resume();
      } catch (e) {}

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.02;
      utterance.pitch = 1.1;
      utterance.volume = 1.0;

      // Pick a friendly, high-quality voice if available
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        const preferredVoice = voices.find(
          (v) => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Female') || v.name.includes('Zira') || v.name.includes('Jenny'))
        );
        if (preferredVoice) utterance.voice = preferredVoice;
      }

      let osc = null;
      let gain = null;

      if (this.audioContext && this.analyser) {
        try {
          osc = this.audioContext.createOscillator();
          gain = this.audioContext.createGain();
          gain.gain.value = 0.0001;
          osc.frequency.setValueAtTime(220, this.audioContext.currentTime);
          osc.connect(gain);
          gain.connect(this.analyser);
          osc.start();
        } catch (e) {}
      }

      const cleanup = () => {
        if (osc) {
          try {
            osc.stop();
            gain.disconnect();
          } catch (e) {}
          osc = null;
        }
        this.isSpeaking = false;
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
      };

      this.currentUtterance = utterance;

      // Speak SYNCHRONOUSLY within user gesture call stack
      try {
        window.speechSynthesis.speak(utterance);
      } catch (e) {
        cleanup();
      }
    } else {
      setTimeout(() => {
        this.isSpeaking = false;
        this.notify('stateChange', { state: 'IDLE' });
        if (onEnd) onEnd();
      }, 2500);
    }
  }

  stopTTS() {
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }
    this.isSpeaking = false;
    this.currentUtterance = null;
  }

  stopConversation() {
    this.stopListening();
    this.stopTTS();
    this.notify('stateChange', { state: 'IDLE' });
  }
}

export const voiceAgent = new VoiceAgentAdapter();
