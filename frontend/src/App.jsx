import React, { useState } from "react";
import {
  Menu, ChevronRight, RectangleHorizontal, Settings, Share2, Plus,
  ChevronDown, RotateCcw, FlipHorizontal, FlipVertical, X, Play,
  SkipBack, SkipForward, Shuffle, Volume2, Minus, Maximize2, Plus as PlusIcon,
  Sparkles, Lock, Eye, GripVertical, Sun, Moon
} from "lucide-react";

const aspectRatios = [
  { name: "Landscape", ratio: "16:9", width: 1920, height: 1080 },
  { name: "Portrait", ratio: "9:16", width: 1080, height: 1920 },
  { name: "Square", ratio: "1:1", width: 1080, height: 1080 },
  { name: "Instagram", ratio: "4:5", width: 1080, height: 1350 },
  { name: "Old TV", ratio: "4:3", width: 1440, height: 1080 },
  { name: "Ultrawide", ratio: "21:9", width: 2560, height: 1080 },
];

const themes = {
  light: {
    bg: "#F8F7FF",
    surface: "#FFFFFF",
    surfaceSoft: "#F0EEFF",
    border: "#B8B8FF",
    accent: "#9381FF",
    accentSoft: "#B8B8FF",
    text: "#25213B",
    textSecondary: "#6E6A8C",
    textMuted: "#A6A2C4",
    onAccent: "#FFFFFF",
  },
  dark: {
    bg: "#000000",
    surface: "#121319",
    surfaceSoft: "#1B1D26",
    border: "#646881",
    accent: "#23B5D3",
    accentSoft: "#646881",
    text: "#F8F7FF",
    textSecondary: "#A6ABC2",
    textMuted: "#646881",
    onAccent: "#00121A",
  },
};

export default function VideoEditorUI() {
  const [prompt, setPrompt] = useState("");
  const [isDark, setIsDark] = useState(false);
  const [ratioOpen, setRatioOpen] = useState(false);
  const [selectedRatio, setSelectedRatio] = useState(aspectRatios[0]);

  const t = isDark ? themes.dark : themes.light;
  const cssVars = {
    "--bg": t.bg,
    "--surface": t.surface,
    "--surface-soft": t.surfaceSoft,
    "--border": t.border,
    "--accent": t.accent,
    "--accent-soft": t.accentSoft,
    "--text": t.text,
    "--text-secondary": t.textSecondary,
    "--text-muted": t.textMuted,
    "--on-accent": t.onAccent,
  };

  const previewWide = selectedRatio.width >= selectedRatio.height;

  return (
    <div
      style={cssVars}
      className="w-full h-screen bg-[var(--bg)] text-[13px] text-[var(--text)] flex flex-col font-sans transition-colors duration-300"
    >
      {/* Top bar */}
      <div className="h-12 flex items-center justify-between px-3 border-b border-[var(--border)]/40 shrink-0">
        <div className="flex items-center gap-3">
          <Menu size={18} className="text-[var(--text-secondary)]" />
          <div
            className="w-6 h-6 rounded flex items-center justify-center"
            style={{ background: t.accent }}
          >
            <div className="w-3 h-3 bg-[var(--on-accent)] rounded-sm" />
          </div>
          <span className="font-medium text-[var(--text)]">Untitled Project</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-[var(--text-muted)]">
            <RotateCcw size={15} className="scale-x-[-1]" />
            <RotateCcw size={15} />
          </div>

          {/* Aspect ratio selector */}
          <div className="relative">
            <button
              onClick={() => setRatioOpen((v) => !v)}
              className="flex items-center gap-1.5 border border-[var(--border)]/60 rounded-md px-2 py-1 text-[var(--text-secondary)] hover:bg-[var(--surface-soft)]"
            >
              <RectangleHorizontal size={13} />
              <span>
                {selectedRatio.name} ({selectedRatio.ratio})
              </span>
              <ChevronDown size={13} />
            </button>

            {ratioOpen && (
              <div className="absolute top-full mt-1 left-0 w-56 bg-[var(--surface)] border border-[var(--border)]/60 rounded-md shadow-lg z-20 overflow-hidden">
                {aspectRatios.map((r) => (
                  <button
                    key={r.name}
                    onClick={() => {
                      setSelectedRatio(r);
                      setRatioOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-[var(--surface-soft)] ${
                      r.name === selectedRatio.name ? "text-[var(--accent)]" : "text-[var(--text-secondary)]"
                    }`}
                  >
                    <span>{r.name}</span>
                    <span className="text-[11px] text-[var(--text-muted)]">
                      {r.ratio} · {r.width}×{r.height}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-[var(--text-secondary)]">
            <span
              className="w-2 h-2 rounded-full inline-block"
              style={{ background: t.accent }}
            />
            <span>Background</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={() => setIsDark((v) => !v)}
            className="w-8 h-8 flex items-center justify-center rounded-md border border-[var(--border)]/60 text-[var(--text-secondary)] hover:bg-[var(--surface-soft)]"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <Settings size={16} className="text-[var(--text-secondary)]" />
          <Share2 size={16} className="text-[var(--text-secondary)]" />
          <button
            className="flex items-center gap-1 text-[13px] font-medium px-3 py-1.5 rounded-md"
            style={{ background: t.accent, color: t.onAccent }}
          >
            <Plus size={14} /> Export
          </button>
        </div>
      </div>

      {/* Main body */}
      <div className="flex flex-1 min-h-0">
        {/* Left: Directr AI panel */}
        <div className="w-72 border-r border-[var(--border)]/40 flex flex-col shrink-0 bg-[var(--surface)]">
          <div className="h-10 flex items-center justify-between px-3 border-b border-[var(--border)]/40">
            <div className="flex items-center gap-1.5 font-medium text-[var(--text)]">
              <Sparkles size={14} style={{ color: t.accent }} />
              Directr AI
            </div>
            <X size={15} className="text-[var(--text-muted)]" />
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            <div className="bg-[var(--surface-soft)] rounded-lg rounded-tl-sm px-3 py-2 max-w-[90%] text-[12.5px] leading-snug text-[var(--text)]">
              Hey — I scanned your clips. Want me to trim the silence between 0:06 and 0:07 on Audio 1?
            </div>
            <div className="text-[11px] text-[var(--text-muted)] pl-0.5">15m ago</div>
          </div>

          <div className="px-3 pb-2 flex gap-2 flex-wrap">
            {["Generate subtitles", "Suggest B-roll", "Trim silence"].map((label) => (
              <button
                key={label}
                className="text-[12px] border border-[var(--border)]/60 rounded-full px-2.5 py-1 text-[var(--text-secondary)] hover:bg-[var(--surface-soft)]"
              >
                {label}
              </button>
            ))}
          </div>

          <div className="p-2.5 border-t border-[var(--border)]/40">
            <div
              className="rounded-lg px-3 py-2 border"
              style={{ borderColor: t.accentSoft }}
            >
              <input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask anything, or @ mention a file..."
                className="w-full text-[12.5px] outline-none bg-transparent placeholder:text-[var(--text-muted)] mb-2 text-[var(--text)]"
              />
              <div className="flex items-center justify-between">
                <Plus size={16} className="text-[var(--text-muted)]" />
                <div className="flex items-center gap-1.5">
                  <span className="flex items-center gap-1 text-[12px] text-[var(--text-secondary)]">
                    Flash <ChevronDown size={11} />
                  </span>
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ background: t.accent }}
                  >
                    <ChevronRight size={13} style={{ color: t.onAccent }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center: preview + timeline */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Preview */}
          <div className="flex-1 flex items-center justify-center bg-[var(--bg)] p-6 min-h-0">
            <div
              className="relative rounded-md overflow-hidden shadow-sm border border-[var(--border)]/30"
              style={{
                aspectRatio: `${selectedRatio.width} / ${selectedRatio.height}`,
                width: previewWide ? "100%" : "auto",
                height: previewWide ? "auto" : "100%",
                maxWidth: "100%",
                maxHeight: "100%",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1577401239170-897942555fb3?w=1200&q=80"
                alt="Wolf running in the snow"
                className="w-full h-full object-cover"
              />
              <Maximize2 size={16} className="absolute top-2 right-2 text-white/90 drop-shadow" />
            </div>
          </div>

          {/* Transport controls */}
          <div className="h-11 flex items-center justify-between px-4 border-t border-[var(--border)]/40 shrink-0">
            <div className="flex items-center gap-4 text-[var(--text-secondary)]">
              <SkipBack size={15} className="scale-x-[-1]" />
              <SkipBack size={15} />
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: t.accent }}
              >
                <Play size={13} fill={t.onAccent} style={{ color: t.onAccent }} className="ml-0.5" />
              </div>
              <SkipForward size={15} />
              <SkipForward size={15} className="scale-x-[-1]" />
            </div>

            <div className="text-[12.5px] text-[var(--text-secondary)] tabular-nums">
              00:00:12.000 / 00:00:12
            </div>

            <div className="flex items-center gap-4 text-[var(--text-muted)]">
              <Shuffle size={14} />
              <Volume2 size={15} />
              <span className="flex items-center gap-1 text-[var(--text-secondary)] text-[12.5px]">
                120ms <ChevronDown size={11} />
              </span>
              <span className="text-[var(--text-secondary)] text-[12.5px]">1.2x</span>
            </div>
          </div>

          {/* Timeline */}
          <div className="h-52 border-t border-[var(--border)]/40 flex flex-col shrink-0 bg-[var(--surface)]">
            <div className="h-9 flex items-center justify-between px-3 border-b border-[var(--border)]/30">
              <span className="font-medium text-[var(--text-secondary)] text-[12.5px] tracking-wide">
                TIMELINE
              </span>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1 text-[var(--text-secondary)] text-[12.5px]">
                  <Plus size={13} /> Track
                </button>
                <div className="flex items-center gap-2 text-[var(--text-muted)]">
                  <Minus size={13} />
                  <span className="text-[var(--text-secondary)] text-[12px]">150%</span>
                  <PlusIcon size={13} />
                  <Maximize2 size={13} />
                </div>
              </div>
            </div>

            {/* Ruler */}
            <div className="h-6 flex items-center border-b border-[var(--border)]/30 text-[10.5px] text-[var(--text-muted)] pl-24 pr-3 relative">
              <div className="flex-1 grid grid-cols-12">
                {Array.from({ length: 12 }, (_, i) => (
                  <span key={i}>00:00:{String(i).padStart(2, "0")}</span>
                ))}
              </div>
            </div>

            {/* Tracks */}
            <div className="flex-1 overflow-y-auto">
              {/* Video track */}
              <div className="flex border-b border-[var(--border)]/30 h-14">
                <div className="w-24 flex items-center gap-1.5 px-2 border-r border-[var(--border)]/30 text-[var(--text-muted)] shrink-0">
                  <GripVertical size={13} />
                  <div className="w-4 h-4 rounded bg-[var(--surface-soft)]" />
                  <Eye size={13} />
                  <Lock size={13} />
                </div>
                <div className="flex-1 relative py-1.5 px-1">
                  <div
                    className="absolute left-1 top-1.5 bottom-1.5 w-[54%] rounded-sm px-2 py-1 text-[11px] leading-tight"
                    style={{ background: t.accent, color: t.onAccent }}
                  >
                    intro_take_03.mp4
                    <div className="text-[10px] opacity-80">00:00:06</div>
                  </div>
                  <div
                    className="absolute left-[58%] top-1.5 bottom-1.5 w-[28%] rounded-sm px-2 py-1 text-[11px] leading-tight"
                    style={{ background: t.accent, color: t.onAccent }}
                  >
                    b_roll_01.mp4
                    <div className="text-[10px] opacity-80">00:00:04</div>
                  </div>
                </div>
              </div>

              {/* Audio track */}
              <div className="flex h-12">
                <div className="w-24 flex items-center gap-1.5 px-2 border-r border-[var(--border)]/30 text-[var(--text-muted)] shrink-0">
                  <GripVertical size={13} />
                  <div className="w-4 h-4 rounded bg-[var(--surface-soft)]" />
                  <Eye size={13} />
                  <Lock size={13} />
                </div>
                <div className="flex-1 relative py-1.5 px-1">
                  <div
                    className="absolute left-1 top-1.5 bottom-1.5 w-[70%] rounded-sm px-2 py-1 text-[11px]"
                    style={{ background: t.accentSoft, color: isDark ? t.text : t.text }}
                  >
                    ambient_track.wav
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Properties panel */}
        <div className="w-72 border-l border-[var(--border)]/40 flex flex-col shrink-0 overflow-y-auto bg-[var(--surface)]">
          <div className="h-10 flex items-center justify-between px-3 border-b border-[var(--border)]/40">
            <span className="font-medium text-[var(--text)]">Properties</span>
            <span
              className="text-[11px] px-2 py-0.5 rounded"
              style={{ background: t.accent, color: t.onAccent }}
            >
              video
            </span>
          </div>

          <div className="p-3 space-y-4">
            <div>
              <div className="text-[11px] text-[var(--text-muted)] mb-1 tracking-wide">
                SELECTED CLIP
              </div>
              <div className="text-[var(--text)]">intro_take_03.mp4</div>
            </div>

            <div className="border-t border-[var(--border)]/30 pt-3">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-[var(--text-secondary)] text-[12.5px] tracking-wide">
                  TIMING
                </span>
                <ChevronDown size={14} className="text-[var(--text-muted)]" />
              </div>

              <Field label="Start" value="00:00:00.000" t={t} />
              <Field label="End" value="00:00:06.400" t={t} />
              <div className="flex items-end gap-2 mb-3">
                <Field label="Duration" value="00:00:06.400" className="flex-1" t={t} />
                <SmallBox value="6.4" t={t} />
              </div>
              <div className="flex items-end gap-2">
                <Field label="Duration" value="120ms" className="flex-1" t={t} />
                <SmallBox value="1.2x" t={t} />
              </div>
            </div>

            <div className="border-t border-[var(--border)]/30 pt-3">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-[var(--text-secondary)] text-[12.5px] tracking-wide">
                  APPEARANCE
                </span>
                <ChevronDown size={14} className="text-[var(--text-muted)]" />
              </div>

              <div className="flex items-end gap-2 mb-3">
                <Field label="Opacity" value="" className="flex-1" t={t} />
                <SmallBox value="100%" t={t} />
              </div>
              <div className="flex items-end gap-2 mb-3">
                <Field label="Scale" value="" className="flex-1" t={t} />
                <SmallBox value="100%" t={t} />
              </div>
              <div>
                <div className="text-[11px] text-[var(--text-muted)] mb-1">Scale</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 border border-[var(--border)]/60 rounded-md px-2 py-1.5 text-[var(--text-secondary)]">
                    0°
                  </div>
                  <RotateCcw size={14} className="text-[var(--text-muted)]" />
                  <FlipHorizontal size={14} className="text-[var(--text-muted)]" />
                  <FlipVertical size={14} className="text-[var(--text-muted)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, className = "" }) {
  return (
    <div className={`mb-3 ${className}`}>
      <div className="text-[11px] text-[var(--text-muted)] mb-1">{label}</div>
      <div className="border border-[var(--border)]/60 rounded-md px-2 py-1.5 text-[var(--text-secondary)] flex items-center justify-between">
        <span>{value}</span>
        <GripVertical size={12} className="text-[var(--text-muted)]" />
      </div>
    </div>
  );
}

function SmallBox({ value }) {
  return (
    <div className="border border-[var(--border)]/60 rounded-md px-2 py-1.5 text-[var(--text-secondary)] text-[12px] w-14 text-center mb-3">
      {value}
    </div>
  );
}