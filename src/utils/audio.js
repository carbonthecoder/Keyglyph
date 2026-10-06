// Synthesized Web Audio API Key Sounds - zero external assets needed!

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.soundType = 'clicky'; // 'clicky' | 'linear' | 'thock'
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playKey() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      
      // High-frequency click oscillator
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      if (this.soundType === 'clicky') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1400 + Math.random() * 200, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      } else if (this.soundType === 'thock') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(350 + Math.random() * 50, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.06);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      } else {
        // Subtle soft linear
        osc.type = 'sine';
        osc.frequency.setValueAtTime(700, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.03);

        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
      }

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch {
      // Audio playback error (e.g. user hasn't interacted yet)
    }
  }
}

export const soundEngine = new SoundEngine();
