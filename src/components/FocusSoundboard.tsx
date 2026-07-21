import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Music, Flame, Sparkles, Sliders, Play, Square, Keyboard } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";

// Single audio context shared across elements
let globalAudioCtx: AudioContext | null = null;
let keyboardVolume = 0.3;

function getAudioCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!globalAudioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      globalAudioCtx = new AudioContextClass();
    }
  }
  if (globalAudioCtx && globalAudioCtx.state === "suspended") {
    globalAudioCtx.resume();
  }
  return globalAudioCtx;
}

// Synthesize mechanical keyboard click using pure Web Audio API
export function playKeyboardClick() {
  const ctx = getAudioCtx();
  if (!ctx || keyboardVolume === 0) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc.type = "sine";
  osc.frequency.setValueAtTime(1200, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.04);

  filter.type = "bandpass";
  filter.frequency.setValueAtTime(800, ctx.currentTime);
  filter.Q.setValueAtTime(5, ctx.currentTime);

  gain.gain.setValueAtTime(keyboardVolume * 0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.06);

  // Layer a small high-frequency noise tick
  const tickOsc = ctx.createOscillator();
  const tickGain = ctx.createGain();
  tickOsc.type = "triangle";
  tickOsc.frequency.setValueAtTime(3000, ctx.currentTime);
  tickGain.gain.setValueAtTime(keyboardVolume * 0.08, ctx.currentTime);
  tickGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.015);
  tickOsc.connect(tickGain);
  tickGain.connect(ctx.destination);
  tickOsc.start();
  tickOsc.stop(ctx.currentTime + 0.02);
}

export default function FocusSoundboard() {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlayingNoise, setIsPlayingNoise] = useState(false);
  const [isPlayingDrone, setIsPlayingDrone] = useState(false);
  const [isPlayingLofi, setIsPlayingLofi] = useState(false);
  const [kbClickEnabled, setKbClickEnabled] = useState(true);

  // Volume states
  const [noiseVol, setNoiseVol] = useState(0.4);
  const [droneVol, setDroneVol] = useState(0.3);
  const [lofiVol, setLofiVol] = useState(0.3);
  const [clickVol, setClickVol] = useState(0.3);

  // Audio Node references
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const noiseGainNodeRef = useRef<GainNode | null>(null);

  const droneOsc1Ref = useRef<OscillatorNode | null>(null);
  const droneOsc2Ref = useRef<OscillatorNode | null>(null);
  const droneLfoRef = useRef<OscillatorNode | null>(null);
  const droneGainNodeRef = useRef<GainNode | null>(null);

  // Sequencer state for custom procedural Lofi Beat
  const lofiTimerRef = useRef<any>(null);
  const lofiStepRef = useRef(0);
  const lofiGainNodeRef = useRef<GainNode | null>(null);

  // Canvas visualizer refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Synchronize global keyboard volume
  useEffect(() => {
    keyboardVolume = kbClickEnabled ? clickVol : 0;
  }, [kbClickEnabled, clickVol]);

  // Global keyboard click listener
  useEffect(() => {
    const handleKeyPress = () => {
      if (kbClickEnabled && !isMuted) {
        playKeyboardClick();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [kbClickEnabled, isMuted]);

  // Master Mute synchronization
  useEffect(() => {
    const ctx = getAudioCtx();
    if (!ctx) return;
    if (isMuted) {
      if (noiseGainNodeRef.current) noiseGainNodeRef.current.gain.setValueAtTime(0, ctx.currentTime);
      if (droneGainNodeRef.current) droneGainNodeRef.current.gain.setValueAtTime(0, ctx.currentTime);
      if (lofiGainNodeRef.current) lofiGainNodeRef.current.gain.setValueAtTime(0, ctx.currentTime);
      keyboardVolume = 0;
    } else {
      if (noiseGainNodeRef.current) noiseGainNodeRef.current.gain.setValueAtTime(noiseVol, ctx.currentTime);
      if (droneGainNodeRef.current) droneGainNodeRef.current.gain.setValueAtTime(droneVol * 0.5, ctx.currentTime);
      if (lofiGainNodeRef.current) lofiGainNodeRef.current.gain.setValueAtTime(lofiVol, ctx.currentTime);
      keyboardVolume = kbClickEnabled ? clickVol : 0;
    }
  }, [isMuted, noiseVol, droneVol, lofiVol, clickVol, kbClickEnabled]);

  // Handle Focus Rain / Brown Noise
  const toggleNoise = () => {
    const ctx = getAudioCtx();
    if (!ctx) return;

    if (isPlayingNoise) {
      if (noiseSourceRef.current) {
        try {
          noiseSourceRef.current.stop();
        } catch (e) {}
        noiseSourceRef.current.disconnect();
        noiseSourceRef.current = null;
      }
      setIsPlayingNoise(false);
    } else {
      // Lazy construct brown noise buffer
      const bufferSize = 2 * ctx.sampleRate;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5; // boost amplitude
      }

      const source = ctx.createBufferSource();
      source.buffer = noiseBuffer;
      source.loop = true;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(isMuted ? 0 : noiseVol, ctx.currentTime);

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(400, ctx.currentTime);

      source.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      source.start(0);

      noiseSourceRef.current = source;
      noiseGainNodeRef.current = gain;
      setIsPlayingNoise(true);
    }
  };

  // Handle Deep Space Focus Drone
  const toggleDrone = () => {
    const ctx = getAudioCtx();
    if (!ctx) return;

    if (isPlayingDrone) {
      if (droneOsc1Ref.current) { droneOsc1Ref.current.stop(); droneOsc1Ref.current = null; }
      if (droneOsc2Ref.current) { droneOsc2Ref.current.stop(); droneOsc2Ref.current = null; }
      if (droneLfoRef.current) { droneLfoRef.current.stop(); droneLfoRef.current = null; }
      setIsPlayingDrone(false);
    } else {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc1.type = "triangle";
      osc1.frequency.setValueAtTime(73.42, ctx.currentTime); // D2

      osc2.type = "sine";
      osc2.frequency.setValueAtTime(110.00, ctx.currentTime); // A2

      lfo.type = "sine";
      lfo.frequency.setValueAtTime(0.1, ctx.currentTime); // very slow pulsation

      lfoGain.gain.setValueAtTime(15, ctx.currentTime); // modulate frequency slightly

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(180, ctx.currentTime);

      gain.gain.setValueAtTime(isMuted ? 0 : droneVol * 0.5, ctx.currentTime);

      // Node connections
      lfo.connect(lfoGain);
      lfoGain.connect(osc1.frequency);
      lfoGain.connect(osc2.frequency);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      lfo.start();

      droneOsc1Ref.current = osc1;
      droneOsc2Ref.current = osc2;
      droneLfoRef.current = lfo;
      droneGainNodeRef.current = gain;
      setIsPlayingDrone(true);
    }
  };

  // Synthesize soft lofi kick / snare / chord beats dynamically
  const playStep = () => {
    const ctx = getAudioCtx();
    if (!ctx || isMuted || !lofiGainNodeRef.current) return;

    const step = lofiStepRef.current;
    const beatTime = ctx.currentTime;

    // Trigger Kick on steps 0, 4, 8, 12 (4/4 time)
    if (step === 0 || step === 8 || step === 10) {
      const kickOsc = ctx.createOscillator();
      const kickGain = ctx.createGain();
      kickOsc.type = "sine";
      kickOsc.frequency.setValueAtTime(150, beatTime);
      kickOsc.frequency.exponentialRampToValueAtTime(0.01, beatTime + 0.15);
      kickGain.gain.setValueAtTime(lofiVol * 0.6, beatTime);
      kickGain.gain.exponentialRampToValueAtTime(0.001, beatTime + 0.2);

      kickOsc.connect(kickGain);
      kickGain.connect(ctx.destination);
      kickOsc.start(beatTime);
      kickOsc.stop(beatTime + 0.25);
    }

    // Trigger soft retro static snare on steps 4, 12
    if (step === 4 || step === 12) {
      const snareOsc = ctx.createOscillator();
      const snareGain = ctx.createGain();
      snareOsc.type = "triangle";
      snareOsc.frequency.setValueAtTime(180, beatTime);
      snareGain.gain.setValueAtTime(lofiVol * 0.25, beatTime);
      snareGain.gain.exponentialRampToValueAtTime(0.001, beatTime + 0.1);

      snareOsc.connect(snareGain);
      snareGain.connect(ctx.destination);
      snareOsc.start(beatTime);
      snareOsc.stop(beatTime + 0.12);

      // Noise component of snare
      const bufferSize = 0.05 * ctx.sampleRate;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const noiseNode = ctx.createBufferSource();
      noiseNode.buffer = noiseBuffer;
      const snareNoiseGain = ctx.createGain();
      snareNoiseGain.gain.setValueAtTime(lofiVol * 0.25, beatTime);
      snareNoiseGain.gain.exponentialRampToValueAtTime(0.001, beatTime + 0.08);
      const snareFilter = ctx.createBiquadFilter();
      snareFilter.type = "highpass";
      snareFilter.frequency.setValueAtTime(1000, beatTime);

      noiseNode.connect(snareFilter);
      snareFilter.connect(snareNoiseGain);
      snareNoiseGain.connect(ctx.destination);
      noiseNode.start(beatTime);
    }

    // Trigger soft lofi chord on steps 0, 6, 12
    if (step === 0 || step === 6 || step === 12) {
      const notes = step === 0 ? [146.83, 185.00, 220.00] : step === 6 ? [164.81, 196.00, 246.94] : [130.81, 164.81, 196.00]; // D, Em, C chords
      notes.forEach((freq) => {
        const chordOsc = ctx.createOscillator();
        const chordGain = ctx.createGain();
        chordOsc.type = "sine";
        chordOsc.frequency.setValueAtTime(freq * 1.5, beatTime); // soft octave up
        chordGain.gain.setValueAtTime(lofiVol * 0.15, beatTime);
        chordGain.gain.exponentialRampToValueAtTime(0.001, beatTime + 0.8);

        chordOsc.connect(chordGain);
        chordGain.connect(ctx.destination);
        chordOsc.start(beatTime);
        chordOsc.stop(beatTime + 0.9);
      });
    }

    // Step hi-hat on odd steps
    if (step % 2 === 1) {
      const hatOsc = ctx.createOscillator();
      const hatGain = ctx.createGain();
      hatOsc.type = "triangle";
      hatOsc.frequency.setValueAtTime(4000, beatTime);
      hatGain.gain.setValueAtTime(lofiVol * 0.08, beatTime);
      hatGain.gain.exponentialRampToValueAtTime(0.001, beatTime + 0.02);

      hatOsc.connect(hatGain);
      hatGain.connect(ctx.destination);
      hatOsc.start(beatTime);
      hatOsc.stop(beatTime + 0.03);
    }

    lofiStepRef.current = (step + 1) % 16;
  };

  const toggleLofi = () => {
    const ctx = getAudioCtx();
    if (!ctx) return;

    if (isPlayingLofi) {
      if (lofiTimerRef.current) {
        clearInterval(lofiTimerRef.current);
        lofiTimerRef.current = null;
      }
      setIsPlayingLofi(false);
    } else {
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(isMuted ? 0 : lofiVol, ctx.currentTime);
      lofiGainNodeRef.current = gain;

      // 120 BPM -> 4 steps per beat -> 125ms per step
      lofiStepRef.current = 0;
      playStep(); // Trigger initial immediately
      lofiTimerRef.current = setInterval(playStep, 150);

      setIsPlayingLofi(true);
    }
  };

  // Run visualizer frame render
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let waves = [
      { speed: 0.03, amplitude: 15, frequency: 0.015, color: "rgba(99, 102, 241, 0.2)" },
      { speed: 0.02, amplitude: 22, frequency: 0.01, color: "rgba(168, 85, 247, 0.15)" },
      { speed: 0.04, amplitude: 8, frequency: 0.02, color: "rgba(6, 182, 212, 0.25)" }
    ];

    let t = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isAnyActive = isPlayingNoise || isPlayingDrone || isPlayingLofi;

      // Multiplier of visual intensity based on active sound
      const activeMultiplier = isAnyActive ? (isMuted ? 0.1 : 1.2) : 0.05;

      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 1.5;

        for (let x = 0; x < canvas.width; x++) {
          const y = canvas.height / 2 + Math.sin(x * wave.frequency + t * wave.speed) * wave.amplitude * activeMultiplier;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      });

      t += 0.8;
      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPlayingNoise, isPlayingDrone, isPlayingLofi, isMuted]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      if (noiseSourceRef.current) {
        try { noiseSourceRef.current.stop(); } catch (e) {}
      }
      if (droneOsc1Ref.current) {
        try { droneOsc1Ref.current.stop(); } catch (e) {}
      }
      if (droneOsc2Ref.current) {
        try { droneOsc2Ref.current.stop(); } catch (e) {}
      }
      if (droneLfoRef.current) {
        try { droneLfoRef.current.stop(); } catch (e) {}
      }
      if (lofiTimerRef.current) {
        clearInterval(lofiTimerRef.current);
      }
    };
  }, []);

  return (
    <div id="soundboard-hub" className="p-8 rounded-3xl border border-white/5 bg-neutral-950/60 backdrop-blur-md">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-electric-blue/20 bg-electric-blue/5 mb-3">
            <Sliders className="w-3.5 h-3.5 text-electric-glow" />
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-electric-glow">
              Focus Environment
            </span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            AUDIO SYNTH WORKSPACE
          </h3>
          <p className="text-neutral-400 text-xs sm:text-sm mt-1 max-w-xl">
            Synthesize high-fidelity ambient workspace sound directly in your browser. Generates low-frequency focus frequencies programmatically.
          </p>
        </div>

        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider font-bold border transition-all active:scale-95 ${
            isMuted
              ? "bg-red-500/10 border-red-500/30 text-red-400"
              : "bg-white/5 border-white/10 text-white hover:bg-white hover:text-black hover:border-white"
          }`}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-4 h-4" />
              MUTED
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4" />
              SOUND IS ON
            </>
          )}
        </button>
      </div>

      {/* Visualizer Wave Canvas */}
      <div className="relative w-full h-24 bg-neutral-950/80 rounded-2xl border border-white/5 overflow-hidden mb-8">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" width={600} height={96} />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isPlayingNoise || isPlayingDrone || isPlayingLofi ? 'bg-electric-glow animate-pulse' : 'bg-neutral-600'}`} />
          <span className="font-mono text-[8px] uppercase tracking-widest text-neutral-500">
            Oscillator Monitor // Real-time Synth Channel
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Brown Noise / Rain card */}
        <div className={`p-5 rounded-2xl border transition-all ${isPlayingNoise ? 'bg-blue-500/5 border-blue-500/30' : 'bg-white/[0.01] border-white/5 hover:border-white/10'}`}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="font-mono text-[9px] text-blue-400 uppercase tracking-widest block font-bold">
                Channel 01
              </span>
              <h4 className="font-display text-base font-bold text-white mt-1">Brown Noise</h4>
            </div>
            <button
              onClick={toggleNoise}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                isPlayingNoise
                  ? "bg-blue-500 border-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                  : "border-white/10 text-white hover:bg-white/5"
              }`}
            >
              {isPlayingNoise ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-neutral-500 text-[11px] mb-4">
            A rich, deep acoustic hum that effectively blocks distractions and calms focus.
          </p>
          <div className="flex items-center gap-3">
            <Sliders className="w-3.5 h-3.5 text-neutral-600" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={noiseVol}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setNoiseVol(val);
                const ctx = getAudioCtx();
                if (ctx && noiseGainNodeRef.current && !isMuted) {
                  noiseGainNodeRef.current.gain.setValueAtTime(val, ctx.currentTime);
                }
              }}
              className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>
        </div>

        {/* Space Drone Card */}
        <div className={`p-5 rounded-2xl border transition-all ${isPlayingDrone ? 'bg-purple-500/5 border-purple-500/30' : 'bg-white/[0.01] border-white/5 hover:border-white/10'}`}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="font-mono text-[9px] text-purple-400 uppercase tracking-widest block font-bold">
                Channel 02
              </span>
              <h4 className="font-display text-base font-bold text-white mt-1">Cosmic Drone</h4>
            </div>
            <button
              onClick={toggleDrone}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                isPlayingDrone
                  ? "bg-purple-500 border-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                  : "border-white/10 text-white hover:bg-white/5"
              }`}
            >
              {isPlayingDrone ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-neutral-500 text-[11px] mb-4">
            Slow triangle-wave modular synthesis, mimicking deep galactic frequencies.
          </p>
          <div className="flex items-center gap-3">
            <Sliders className="w-3.5 h-3.5 text-neutral-600" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={droneVol}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setDroneVol(val);
                const ctx = getAudioCtx();
                if (ctx && droneGainNodeRef.current && !isMuted) {
                  droneGainNodeRef.current.gain.setValueAtTime(val * 0.5, ctx.currentTime);
                }
              }}
              className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>
        </div>

        {/* Lofi Beats Card */}
        <div className={`p-5 rounded-2xl border transition-all ${isPlayingLofi ? 'bg-cyan-500/5 border-cyan-500/30' : 'bg-white/[0.01] border-white/5 hover:border-white/10'}`}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="font-mono text-[9px] text-cyan-400 uppercase tracking-widest block font-bold">
                Channel 03
              </span>
              <h4 className="font-display text-base font-bold text-white mt-1">Lofi Synth Loop</h4>
            </div>
            <button
              onClick={toggleLofi}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                isPlayingLofi
                  ? "bg-cyan-500 border-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                  : "border-white/10 text-white hover:bg-white/5"
              }`}
            >
              {isPlayingLofi ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-neutral-500 text-[11px] mb-4">
            Procedural kick, snare, and soft electric chord sequences triggered on the fly.
          </p>
          <div className="flex items-center gap-3">
            <Sliders className="w-3.5 h-3.5 text-neutral-600" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={lofiVol}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setLofiVol(val);
                const ctx = getAudioCtx();
                if (ctx && lofiGainNodeRef.current && !isMuted) {
                  lofiGainNodeRef.current.gain.setValueAtTime(val, ctx.currentTime);
                }
              }}
              className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
          </div>
        </div>

        {/* Interactive Keyboard Clicks */}
        <div className={`p-5 rounded-2xl border transition-all ${kbClickEnabled ? 'bg-emerald-500/5 border-emerald-500/30' : 'bg-white/[0.01] border-white/5 hover:border-white/10'}`}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="font-mono text-[9px] text-emerald-400 uppercase tracking-widest block font-bold">
                Global FX
              </span>
              <h4 className="font-display text-base font-bold text-white mt-1">Mech Keyboard</h4>
            </div>
            <button
              onClick={() => setKbClickEnabled(!kbClickEnabled)}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                kbClickEnabled
                  ? "bg-emerald-500 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                  : "border-white/10 text-white hover:bg-white/5"
              }`}
            >
              <Keyboard className="w-4 h-4" />
            </button>
          </div>
          <p className="text-neutral-500 text-[11px] mb-4">
            Hear tactile synthesized mechanical keyboard clicks as you type and tap across the site.
          </p>
          <div className="flex items-center gap-3">
            <Sliders className="w-3.5 h-3.5 text-neutral-600" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={clickVol}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setClickVol(val);
              }}
              className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
