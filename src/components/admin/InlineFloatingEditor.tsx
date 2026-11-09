import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Check,
  X,
  RotateCcw,
  Sparkles,
  Camera,
  Image as ImageIcon,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { useDirectEdit } from "@/context/DirectEditContext";
import { newGalleryImages } from "@/assets/newGalleryAssets";
import { layaPublicationImages } from "@/assets/layaAssets";

export const InlineFloatingEditor: React.FC = () => {
  const { activeTarget, closeInlineEditor, saveValue } = useDirectEdit();

  const [currentVal, setCurrentVal] = useState<string>("");
  const [initialVal, setInitialVal] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (activeTarget) {
      setCurrentVal(activeTarget.value || "");
      setInitialVal(activeTarget.value || "");
    }
  }, [activeTarget]);

  // Focus input when opened
  useEffect(() => {
    if (activeTarget && inputRef.current) {
      inputRef.current.focus();
      if (inputRef.current instanceof HTMLInputElement || inputRef.current instanceof HTMLTextAreaElement) {
        inputRef.current.select();
      }
    }
  }, [activeTarget]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeTarget) return;
      if (e.key === "Escape") {
        e.preventDefault();
        closeInlineEditor();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeTarget, closeInlineEditor]);

  // Calculate coordinates to anchor near the clicked element without overflowing viewport
  const positionStyle = useMemo<React.CSSProperties>(() => {
    if (!activeTarget?.rect) {
      return {
        position: "fixed",
        bottom: "80px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
      };
    }

    const { rect } = activeTarget;
    const padding = 16;
    const editorWidth = 460;
    const editorHeightEstimate = activeTarget.type === "image" ? 420 : activeTarget.multiline ? 260 : 160;

    // Default: position below element, or above if near bottom
    let top = rect.bottom + 12;
    if (top + editorHeightEstimate > window.innerHeight - padding) {
      top = Math.max(padding, rect.top - editorHeightEstimate - 12);
    }

    let left = rect.left + rect.width / 2 - editorWidth / 2;
    if (left < padding) left = padding;
    if (left + editorWidth > window.innerWidth - padding) {
      left = window.innerWidth - editorWidth - padding;
    }

    return {
      position: "fixed",
      top: `${Math.round(top)}px`,
      left: `${Math.round(left)}px`,
      width: `${Math.min(editorWidth, window.innerWidth - 32)}px`,
      zIndex: 9999,
    };
  }, [activeTarget]);

  if (!activeTarget) return null;

  const handleSave = () => {
    saveValue(activeTarget.path, currentVal, activeTarget.label);
    closeInlineEditor();
  };

  const handleRevert = () => {
    setCurrentVal(initialVal);
    saveValue(activeTarget.path, initialVal, activeTarget.label);
  };

  const isImageMode = activeTarget.type === "image";

  // Pre-curated photo archive presets for quick picking
  const photoPresets = [
    { label: "SRI Paddy Transplantation", src: newGalleryImages[1]?.src },
    { label: "Training & Social Entitlements", src: newGalleryImages[0]?.src },
    { label: "Regenerative Biofarm Farmer", src: newGalleryImages[3]?.src },
    { label: "Community Health Center", src: newGalleryImages[5]?.src },
    { label: "Community Meeting Gathering", src: newGalleryImages[6]?.src },
    { label: "Field Outreach Visit", src: newGalleryImages[7]?.src },
    { label: "Village Youth Engagement", src: newGalleryImages[8]?.src },
    { label: "Livestock Vaccination", src: newGalleryImages[2]?.src },
  ].filter((p) => Boolean(p.src));

  return (
    <div
      ref={containerRef}
      style={positionStyle}
      role="dialog"
      aria-modal="true"
      aria-label={`Direct Editor for ${activeTarget.label}`}
      className="bg-stone-900/95 text-white backdrop-blur-2xl border border-emerald-500/70 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] rounded-2xl p-4 font-sans animate-in fade-in zoom-in-95 duration-150"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-stone-800">
        <div className="flex items-center gap-2 min-w-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider truncate">
            {isImageMode ? "Change Image" : "Direct Live Edit"}
          </span>
          <span className="text-stone-400 text-xs truncate max-w-[200px]">· {activeTarget.label}</span>
        </div>
        <button
          type="button"
          onClick={closeInlineEditor}
          className="text-stone-400 hover:text-white p-1 rounded-md hover:bg-stone-800 transition-colors"
          title="Close editor (Esc)"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Editor Content */}
      {isImageMode ? (
        <div className="space-y-3">
          {/* Current URL Input */}
          <div>
            <label className="block text-[11px] font-semibold text-stone-300 mb-1">
              Image URL / Asset Path
            </label>
            <input
              type="text"
              value={currentVal}
              onChange={(e) => setCurrentVal(e.target.value)}
              placeholder="https://... or /src/assets/..."
              className="w-full bg-stone-950 border border-stone-700 focus:border-emerald-500 rounded-lg px-3 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* Quick Select from Authentic LAYA Photography Archive */}
          <div>
            <label className="block text-[11px] font-semibold text-stone-300 mb-1.5 flex items-center justify-between">
              <span>Choose Authentic Field Photo:</span>
              <span className="text-[10px] text-emerald-400">Click to apply</span>
            </label>
            <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto pr-1 py-1">
              {photoPresets.map((photo, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setCurrentVal(photo.src || "");
                    saveValue(activeTarget.path, photo.src, activeTarget.label);
                  }}
                  className={`group relative aspect-video rounded-md overflow-hidden border transition-all ${
                    currentVal === photo.src
                      ? "border-emerald-400 ring-2 ring-emerald-400/50"
                      : "border-stone-700 hover:border-emerald-500"
                  }`}
                  title={photo.label}
                >
                  <img src={photo.src} alt={photo.label} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-1 text-[9px] text-white font-medium leading-tight text-left">
                    {photo.label}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : activeTarget.multiline ? (
        <div>
          <textarea
            ref={inputRef as any}
            rows={4}
            value={currentVal}
            onChange={(e) => {
              setCurrentVal(e.target.value);
              // Live update directly as you type silently
              saveValue(activeTarget.path, e.target.value, activeTarget.label, true);
            }}
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                e.preventDefault();
                handleSave();
              }
            }}
            className="w-full bg-stone-950 border border-stone-700 focus:border-emerald-500 rounded-lg p-3 text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 leading-relaxed font-sans resize-y"
            placeholder={`Enter ${activeTarget.label.toLowerCase()}...`}
          />
          <div className="flex items-center justify-between mt-1 text-[10px] text-stone-400">
            <span>Updates live on website as you type</span>
            <span>Ctrl + Enter to finish</span>
          </div>
        </div>
      ) : (
        <div>
          <input
            ref={inputRef as any}
            type="text"
            value={currentVal}
            onChange={(e) => {
              setCurrentVal(e.target.value);
              // Live update directly as you type silently
              saveValue(activeTarget.path, e.target.value, activeTarget.label, true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSave();
              }
            }}
            className="w-full bg-stone-950 border border-stone-700 focus:border-emerald-500 rounded-lg px-3 py-2 text-sm font-medium text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            placeholder={`Enter ${activeTarget.label.toLowerCase()}...`}
          />
          <div className="flex items-center justify-between mt-1 text-[10px] text-stone-400">
            <span>Updates live as you type</span>
            <span>Press Enter to save</span>
          </div>
        </div>
      )}

      {/* Footer Controls */}
      <div className="flex items-center justify-between pt-3 mt-3 border-t border-stone-800">
        <button
          type="button"
          onClick={handleRevert}
          disabled={currentVal === initialVal}
          className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-200 disabled:opacity-40 disabled:hover:text-stone-400 transition-colors"
          title="Revert to original text"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Revert</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={closeInlineEditor}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
          >
            Done
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md hover:shadow-lg transition-all"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Save &amp; Close</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InlineFloatingEditor;
