import { useRef } from 'react';

export function useAudio() {
  const audioCtxRef = useRef(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtxRef.current = new AudioContext();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const playTick = () => {
    try {
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch (e) {
      console.warn("Audio playTick error:", e);
    }
  };

  const playWin = () => {
    try {
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;

      const now = ctx.currentTime;
      // Celebratory Major arpeggio C4 -> E4 -> G4 -> C5 -> E5 -> G5 -> C6
      const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
      
      notes.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + index * 0.08);
        
        gain.gain.setValueAtTime(0, now + index * 0.08);
        gain.gain.linearRampToValueAtTime(0.15, now + index * 0.08 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 0.4);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(now + index * 0.08);
        osc.stop(now + index * 0.08 + 0.45);
      });
    } catch (e) {
      console.warn("Audio playWin error:", e);
    }
  };

  const playWhistle = () => {
    try {
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;

      const now = ctx.currentTime;

      // Whistles use two high frequencies slightly out of tune to create beating
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      
      const gainNode = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(1800, now);
      
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1950, now);

      // Create pitch/amplitude wobble (pea effect) using LFO
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(16, now); // 16Hz flutter
      lfoGain.gain.setValueAtTime(30, now); // Frequency modulation depth

      // Modulate frequency of both oscillators for a realistic trill
      lfoGain.connect(osc1.frequency);
      lfoGain.connect(osc2.frequency);
      lfo.connect(lfoGain);

      // Volume envelope: Short blow, then a long blow ("Peep! Peeeeep!")
      gainNode.gain.setValueAtTime(0, now);
      
      // Blow 1: Short whistle (0.15s)
      gainNode.gain.linearRampToValueAtTime(0.18, now + 0.03);
      gainNode.gain.setValueAtTime(0.18, now + 0.12);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

      // Blow 2: Long stadium whistle (0.5s)
      const start2 = now + 0.22;
      gainNode.gain.setValueAtTime(0, start2);
      gainNode.gain.linearRampToValueAtTime(0.24, start2 + 0.04);
      gainNode.gain.setValueAtTime(0.24, start2 + 0.45);
      gainNode.gain.exponentialRampToValueAtTime(0.001, start2 + 0.55);

      filter.type = 'bandpass';
      filter.frequency.value = 1900;
      filter.Q.value = 2;

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(filter);
      filter.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      lfo.start(now);

      osc1.stop(now + 0.85);
      osc2.stop(now + 0.85);
      lfo.stop(now + 0.85);
    } catch (e) {
      console.warn("Audio playWhistle error:", e);
    }
  };

  return {
    playTick,
    playWin,
    playWhistle,
    initAudio
  };
}
