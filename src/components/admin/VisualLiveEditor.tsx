import React, { useState, useEffect, useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Edit3,
  X,
  Save,
  RotateCcw,
  ExternalLink,
  ChevronRight,
  Plus,
  Trash2,
  Check,
  Eye,
  SlidersHorizontal,
  Image as ImageIcon,
  Layers,
  Sparkles,
  Quote,
  Compass,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { toast } from "sonner";
import { useContent } from "@/context/ContentContext";
import { useDirectEdit } from "@/context/DirectEditContext";
import InlineFloatingEditor from "@/components/admin/InlineFloatingEditor";
import { ROUTES } from "@/lib/routes";

type HomeTab =
  | "hero"
  | "reflections"
  | "ourWork"
  | "fourDecades"
  | "stories"
  | "chronicle"
  | "impact"
  | "support";

export const VisualLiveEditor: React.FC = () => {
  const { pathname, search } = useLocation();
  const { content, updateSection, resetSection, isModified } = useContent();
  const {
    isDirectEdit,
    setDirectEdit,
    toggleDirectEdit,
    highlightOutlines,
    toggleHighlightOutlines,
    selectedHeroSlide,
    setSelectedHeroSlide,
  } = useDirectEdit();

  const [isOpen, setIsOpen] = useState(false);
  const [showDrawerPanel, setShowDrawerPanel] = useState(true);
  const [activeHomeTab, setActiveHomeTab] = useState<HomeTab>("hero");
  const [activeAboutTab, setActiveAboutTab] = useState<"who" | "way" | "where" | "governance" | "fcra">("who");
  const [selectedSlideIndex, setSelectedSlideIndex] = useState<number>(0);
  const [showOptionalFigures, setShowOptionalFigures] = useState<boolean>(false);

  // Sync selectedSlideIndex when slide is clicked in carousel or direct edit context
  useEffect(() => {
    if (selectedHeroSlide !== undefined) {
      setSelectedSlideIndex(selectedHeroSlide);
    }
  }, [selectedHeroSlide]);

  // Auto-open if query param ?edit=true or ?cms=true is present
  useEffect(() => {
    if (search.includes("edit=true") || search.includes("cms=true")) {
      setIsOpen(true);
    }
  }, [search]);

  // Do not render inside the standalone admin dashboard
  if (pathname.startsWith("/admin")) {
    return null;
  }

  // Determine which page content is being viewed
  const pageType = useMemo(() => {
    if (pathname === ROUTES.home || pathname === "") return "home";
    if (pathname.startsWith("/what-we-do")) return "programme";
    if (pathname.startsWith("/about")) return "about";
    if (pathname.startsWith("/stories")) return "stories";
    if (pathname.startsWith("/impact")) return "impact";
    if (pathname.startsWith("/contact")) return "contact";
    if (pathname.startsWith("/donate")) return "donate";
    if (pathname.startsWith("/publications")) return "publications";
    if (pathname.startsWith("/programs")) return "programs_dir";
    return "general";
  }, [pathname]);

  // If on a programme page, find the exact programme by route
  const currentProgIndex = useMemo(() => {
    if (pageType !== "programme") return 0;
    const idx = (content.programmes || []).findIndex(
      (p) => p.to === pathname || pathname.startsWith(p.to)
    );
    return idx >= 0 ? idx : 0;
  }, [pathname, pageType, content.programmes]);

  const currentProgramme = content.programmes?.[currentProgIndex];

  // Helper to update current programme
  const updateProgrammeField = (field: string, val: any) => {
    const progs = [...(content.programmes || [])];
    if (!progs[currentProgIndex]) return;
    progs[currentProgIndex] = {
      ...progs[currentProgIndex],
      [field]: val,
    };
    if (field === "heroHeading" && !progs[currentProgIndex].title) {
      progs[currentProgIndex].title = val;
    }
    updateSection("programmes", progs);
  };

  // Human-friendly title of the active page
  const pageLabel = useMemo(() => {
    switch (pageType) {
      case "home":
        return "Homepage (Hero, Pillars & Field Voices)";
      case "programme":
        return currentProgramme
          ? `Our Work · ${currentProgramme.shortTitle || currentProgramme.title}`
          : "Our Work · Programme";
      case "about":
        return "About LAYA · Who We Are, Journey & Governance";
      case "stories":
        return "Stories from the Field · Impact Narratives";
      case "impact":
        return "Our Impact · Audited Reach & Indicators";
      case "contact":
        return "Contact & Field Offices";
      case "donate":
        return "Support LAYA · Donations & Contributions";
      case "publications":
        return "Resource Centre · Publications & Library";
      case "programs_dir":
        return "Our Work · 3 Core Pillars Overview";
      default:
        return "Website Content";
    }
  }, [pageType, currentProgramme]);

  // Slides helper for home hero
  const slides = content.home?.hero?.slides || [];
  const activeSlide = slides[selectedSlideIndex] || slides[0] || {
    eyebrow: content.home.hero.eyebrow,
    headline: content.home.hero.headline,
    supporting: content.home.hero.supporting,
    primaryCta: content.home.hero.primaryCta,
    secondaryCta: content.home.hero.secondaryCta,
    location: "Eastern Ghats",
    caption: "",
  };

  const updateActiveSlide = (field: string, value: any) => {
    const updatedSlides = [...slides];
    if (!updatedSlides[selectedSlideIndex]) {
      updatedSlides[selectedSlideIndex] = { ...activeSlide };
    }
    updatedSlides[selectedSlideIndex] = {
      ...updatedSlides[selectedSlideIndex],
      [field]: value,
    };

    // If editing slide 0, keep hero.headline and hero.eyebrow synchronized
    const heroUpdates: any = {
      slides: updatedSlides,
    };
    if (selectedSlideIndex === 0) {
      if (field === "headline") heroUpdates.headline = value;
      if (field === "eyebrow") heroUpdates.eyebrow = value;
      if (field === "supporting") heroUpdates.supporting = value;
      if (field === "primaryCta") heroUpdates.primaryCta = value;
      if (field === "secondaryCta") heroUpdates.secondaryCta = value;
    }

    updateSection("home", {
      hero: {
        ...content.home.hero,
        ...heroUpdates,
      },
    });
  };

  const handleAddSlide = () => {
    const newSlide = {
      eyebrow: "New Community Initiative",
      headline: "Strengthening Indigenous Leadership",
      supporting:
        "Building resilient local capacities through participatory planning and cultural preservation.",
      location: "Eastern Ghats",
      primaryCta: { label: "What We Do", to: ROUTES.programs },
      secondaryCta: { label: "Our Story", to: ROUTES.about },
    };
    const updatedSlides = [...slides, newSlide];
    updateSection("home", {
      hero: {
        ...content.home.hero,
        slides: updatedSlides,
      },
    });
    setSelectedSlideIndex(updatedSlides.length - 1);
    toast.success("Added new hero carousel slide.");
  };

  const handleDeleteSlide = (indexToDelete: number) => {
    if (slides.length <= 1) {
      toast.error("At least one slide is required.");
      return;
    }
    const updatedSlides = slides.filter((_, idx) => idx !== indexToDelete);
    updateSection("home", {
      hero: {
        ...content.home.hero,
        slides: updatedSlides,
      },
    });
    setSelectedSlideIndex(Math.max(0, indexToDelete - 1));
    toast.success("Hero slide deleted.");
  };

  return (
    <>
      {/* Floating Trigger Pill when closed */}
      {!isOpen && (
        <aside
          aria-label="Live Visual Content Editor Launcher"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 group print:hidden"
        >
          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
              setDirectEdit(true);
            }}
            className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#1E4D2B] hover:bg-[#163D21] text-white shadow-xl hover:shadow-2xl border border-emerald-600/40 font-medium text-xs tracking-wide transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            title="Edit the content of this page live"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <Edit3 className="w-3.5 h-3.5 text-emerald-300" />
            <span className="font-semibold">Edit This Page Live</span>
            {isModified && (
              <span className="text-[10px] bg-amber-400 text-stone-900 px-1.5 py-0.5 rounded-full font-bold ml-1">
                Edited
              </span>
            )}
          </button>
        </aside>
      )}

      {/* Floating In-Page Micro-Editor (anchors to whatever element user clicks on) */}
      <InlineFloatingEditor />

      {/* When Open: Non-Intrusive Floating Bottom Dock + Sleek Floating Editor Panel */}
      {isOpen && (
        <>
          {/* 1. Floating Bottom Control Dock (Does NOT push or squish the website layout) */}
          <div
            role="toolbar"
            aria-label="Live Editor Control Dock"
            className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 max-w-5xl w-[96vw] bg-stone-900/95 text-white backdrop-blur-xl border border-stone-700/80 shadow-[0_20px_50px_rgba(0,0,0,0.4)] rounded-2xl px-3.5 py-2 flex items-center justify-between gap-2.5 font-sans print:hidden animate-in fade-in slide-in-from-bottom-3 duration-200"
          >
            {/* Left: Status & Current Page */}
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
              </span>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[11px] uppercase tracking-wider text-emerald-400">
                    Live In-Page Editor Active
                  </span>
                  <span className="hidden xl:inline text-[10px] text-stone-400">
                    (Click any text on the website to edit directly)
                  </span>
                </div>
                <span className="text-xs text-stone-200 font-medium truncate max-w-[180px] sm:max-w-xs">
                  {pageLabel}
                </span>
              </div>
            </div>

            {/* Center: Direct On-Page Edit Controls & Quick Slide Switcher */}
            <div className="flex items-center gap-1.5">
              {/* Direct Click-to-Edit Mode Toggle */}
              <button
                type="button"
                onClick={toggleDirectEdit}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm ${
                  isDirectEdit
                    ? "bg-emerald-600 hover:bg-emerald-500 text-white ring-1 ring-emerald-300"
                    : "bg-stone-800 text-stone-300 hover:text-white"
                }`}
                title="Click any text or image directly on the live website to edit"
              >
                <Edit3 className="w-3.5 h-3.5 text-emerald-300" />
                <span>Direct Edit: {isDirectEdit ? "ON" : "OFF"}</span>
              </button>

              {/* Toggle Dashed Outlines */}
              {isDirectEdit && (
                <button
                  type="button"
                  onClick={toggleHighlightOutlines}
                  className="hidden md:inline-flex items-center gap-1 px-2.5 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white rounded-lg text-xs transition-colors border border-stone-700/80"
                  title="Toggle dashed outlines on editable text"
                >
                  <Eye className="w-3 h-3 text-emerald-400" />
                  <span>{highlightOutlines ? "Hide Outlines" : "Show Outlines"}</span>
                </button>
              )}

              {/* Hero Slide Switcher (if on homepage) */}
              {pageType === "home" && slides.length > 0 && (
                <div className="hidden sm:flex items-center gap-1 bg-stone-800/80 px-2 py-1 rounded-lg border border-stone-700/60">
                  <span className="text-[10px] text-stone-400 font-medium uppercase tracking-wider">Slide:</span>
                  {slides.map((_, sIdx) => (
                    <button
                      key={sIdx}
                      type="button"
                      onClick={() => {
                        setSelectedSlideIndex(sIdx);
                        setSelectedHeroSlide(sIdx);
                      }}
                      className={`px-2 py-0.5 rounded text-[11px] font-bold transition-colors ${
                        selectedSlideIndex === sIdx
                          ? "bg-[#7664B5] text-white shadow-sm"
                          : "text-stone-300 hover:text-white hover:bg-stone-700"
                      }`}
                      title={`Switch to Slide ${sIdx + 1} to edit its text & photo`}
                    >
                      {sIdx + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Actions (Save, Reset, Form Drawer Toggle, Full Admin Hub, Close) */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => {
                  toast.success("All edits saved to browser storage.");
                }}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#E8C547] hover:bg-[#F2D566] text-stone-900 font-bold rounded-lg shadow-sm text-xs transition-all"
                title="Save changes"
              >
                <Save className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Save</span>
              </button>

              <button
                type="button"
                onClick={() => setShowDrawerPanel((prev) => !prev)}
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs transition-colors border border-stone-700/80 ${
                  showDrawerPanel
                    ? "bg-stone-700 text-white"
                    : "bg-stone-800 text-stone-300 hover:text-white"
                }`}
                title="Toggle side form drawer"
              >
                <SlidersHorizontal className="w-3 h-3 text-emerald-400" />
                <span className="hidden sm:inline">{showDrawerPanel ? "Hide Drawer" : "Forms"}</span>
              </button>

              <Link
                to={ROUTES.admin}
                target="_blank"
                className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white rounded-lg text-xs transition-colors border border-stone-700/80"
                title="Open full admin dashboard"
              >
                <SlidersHorizontal className="w-3 h-3 text-emerald-400" />
                <span className="hidden md:inline">Full Admin</span>
              </Link>

              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setDirectEdit(false);
                }}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white font-medium rounded-lg text-xs transition-all border border-stone-700/80"
                title="Close Visual In-Page Editor"
              >
                <X className="w-3.5 h-3.5" />
                <span>Close Editor</span>
              </button>
            </div>
          </div>

          {/* 2. Floating Focused Editing Panel (Floats over the page without squashing it) */}
          {showDrawerPanel && (
          <div
            role="dialog"
            aria-modal="false"
            aria-label="Quick-Edit Floating Inspector"
            className="fixed bottom-20 right-4 sm:right-8 w-[520px] max-w-[94vw] max-h-[76vh] bg-white text-stone-900 rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] border border-stone-200/90 flex flex-col z-50 overflow-hidden font-sans print:hidden animate-in fade-in slide-in-from-bottom-3 duration-200"
          >
            {/* Panel Header */}
            <div className="px-4 py-3 bg-[#FAF8F5] border-b border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                <h3 className="font-serif font-bold text-stone-900 text-sm truncate">
                  {pageType === "home" ? (
                    activeHomeTab === "hero"
                      ? "1. Hero Header & Top Eyebrow"
                      : activeHomeTab === "reflections"
                      ? "2. Reflections / Voices from the Field"
                      : activeHomeTab === "ourWork"
                      ? "3. Our Work Section on Homepage"
                      : activeHomeTab === "fourDecades"
                      ? "4. About LAYA / Four Decades"
                      : activeHomeTab === "stories"
                      ? "5. Field Stories Preview"
                      : activeHomeTab === "chronicle"
                      ? "6. The LAYA Chronicle"
                      : activeHomeTab === "impact"
                      ? "7. Audited Impact Overview"
                      : "8. Support LAYA / Donation Banner"
                  ) : (
                    pageLabel
                  )}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-stone-200 text-stone-500 hover:text-stone-900 rounded-lg transition-colors"
                title="Close editor panel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Section Tab Switcher for Homepage */}
            {pageType === "home" && (
              <div className="flex items-center gap-1 bg-stone-100 p-1.5 border-b border-stone-200 overflow-x-auto">
                {[
                  { id: "hero", label: "1. Hero" },
                  { id: "reflections", label: "2. Voices" },
                  { id: "ourWork", label: "3. Our Work" },
                  { id: "fourDecades", label: "4. About LAYA" },
                  { id: "stories", label: "5. Stories" },
                  { id: "chronicle", label: "6. Chronicle" },
                  { id: "impact", label: "7. Impact" },
                  { id: "support", label: "8. Support" },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveHomeTab(t.id as HomeTab)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-all ${
                      activeHomeTab === t.id
                        ? "bg-emerald-700 text-white font-bold shadow-sm"
                        : "text-stone-600 hover:text-stone-900 hover:bg-stone-200"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            )}

            {/* Quick Section Tab Switcher for About */}
            {pageType === "about" && (
              <div className="flex items-center gap-1 bg-stone-100 p-1.5 border-b border-stone-200 overflow-x-auto">
                {[
                  { id: "who", label: "Who We Are" },
                  { id: "way", label: "Way We Work" },
                  { id: "where", label: "Where We Work" },
                  { id: "governance", label: "Governance" },
                  { id: "fcra", label: "FCRA Info" },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveAboutTab(t.id as any)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-all ${
                      activeAboutTab === t.id
                        ? "bg-emerald-700 text-white font-bold shadow-sm"
                        : "text-stone-600 hover:text-stone-900 hover:bg-stone-200"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            )}

            {/* Panel Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 text-xs">
              <p className="text-[11px] text-stone-500 italic bg-amber-50/80 border border-amber-200 p-2.5 rounded-xl leading-relaxed">
                💡 <strong>Instant Visual Live Sync:</strong> Any text typed below updates the live page in real time without refreshing.
              </p>

              {/* ----------------- 1. HOMEPAGE: HERO CAROUSEL ----------------- */}
              {pageType === "home" && activeHomeTab === "hero" && (
                <div className="flex flex-col gap-4">
                  {/* Slide Switcher */}
                  <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-600">
                        Select Slide to Edit ({slides.length} Available)
                      </span>
                      <button
                        type="button"
                        onClick={handleAddSlide}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Slide</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap">
                      {slides.map((s, sIdx) => (
                        <div key={sIdx} className="flex items-center">
                          <button
                            type="button"
                            onClick={() => setSelectedSlideIndex(sIdx)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                              selectedSlideIndex === sIdx
                                ? "bg-emerald-700 text-white font-bold shadow-sm"
                                : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
                            }`}
                          >
                            Slide #{sIdx + 1}
                            {sIdx === 0 && " (Default)"}
                          </button>
                          {slides.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleDeleteSlide(sIdx)}
                              className="ml-1 p-1 text-stone-400 hover:text-red-600 transition-colors"
                              title="Delete this slide"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Active Slide Fields */}
                  <div className="bg-white p-3.5 rounded-xl border border-stone-200 flex flex-col gap-3">
                    <div className="flex items-center justify-between border-b border-stone-100 pb-1.5">
                      <h4 className="font-bold text-[11px] uppercase tracking-wider text-[#1E4D2B]">
                        Editing Slide #{selectedSlideIndex + 1}
                      </h4>
                      <span className="text-[10px] text-stone-400 font-mono">
                        {activeSlide.location || "Eastern Ghats"}
                      </span>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">
                        Hero Eyebrow
                      </label>
                      <input
                        type="text"
                        value={activeSlide.eyebrow || ""}
                        onChange={(e) => updateActiveSlide("eyebrow", e.target.value)}
                        placeholder="Resource Centre for Adivasis · Est. 1985"
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 font-medium"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">
                        Main Headline
                      </label>
                      <textarea
                        rows={2}
                        value={activeSlide.headline || ""}
                        onChange={(e) => updateActiveSlide("headline", e.target.value)}
                        placeholder="Working Alongside Adivasi Communities"
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 font-serif font-bold text-stone-900"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">
                        Hero Supporting / Narrative
                      </label>
                      <textarea
                        rows={3}
                        value={activeSlide.supporting || ""}
                        onChange={(e) => updateActiveSlide("supporting", e.target.value)}
                        placeholder="For nearly four decades, LAYA has walked alongside indigenous communities in the Eastern Ghats..."
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 text-stone-700"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div>
                        <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">
                          Primary Button Label
                        </label>
                        <input
                          type="text"
                          value={activeSlide.primaryCta?.label || ""}
                          onChange={(e) =>
                            updateActiveSlide("primaryCta", {
                              ...activeSlide.primaryCta,
                              label: e.target.value,
                            })
                          }
                          placeholder="What We Do"
                          className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">
                          Secondary Button Label
                        </label>
                        <input
                          type="text"
                          value={activeSlide.secondaryCta?.label || ""}
                          onChange={(e) =>
                            updateActiveSlide("secondaryCta", {
                              ...activeSlide.secondaryCta,
                              label: e.target.value,
                            })
                          }
                          placeholder="Our Story"
                          className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">
                        Image Caption / Location
                      </label>
                      <input
                        type="text"
                        value={activeSlide.image?.caption || activeSlide.location || ""}
                        onChange={(e) =>
                          updateActiveSlide("image", {
                            ...activeSlide.image,
                            caption: e.target.value,
                          })
                        }
                        placeholder="Paddy transplantation, Eastern Ghats"
                        className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 text-stone-600"
                      />
                    </div>
                  </div>

                  {/* Optional Reach Figures Accordion (Kept clean & empty by default) */}
                  <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setShowOptionalFigures((prev) => !prev)}
                      className="w-full p-3 bg-stone-50 hover:bg-stone-100 flex items-center justify-between text-left transition-colors"
                    >
                      <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-stone-700">
                          Optional Hero Reach Figures ({(content.home.hero.figures || []).length})
                        </span>
                        <span className="text-[10px] text-stone-400">
                          On the main website, hero figures are clean/empty. Expand to customize or add metrics.
                        </span>
                      </div>
                      {showOptionalFigures ? (
                        <ChevronUp className="w-4 h-4 text-stone-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-stone-500" />
                      )}
                    </button>

                    {showOptionalFigures && (
                      <div className="p-3 flex flex-col gap-2.5 border-t border-stone-200 bg-white">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-stone-500">
                            Custom metric counters rendered below CTA buttons
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const newFig = { value: "100+", label: "Community Metric" };
                              const figs = [...(content.home.hero.figures || []), newFig];
                              updateSection("home", {
                                hero: { ...content.home.hero, figures: figs },
                              });
                              toast.success("Added figure metric.");
                            }}
                            className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Add Figure</span>
                          </button>
                        </div>

                        {(content.home.hero.figures || []).length === 0 ? (
                          <p className="text-[11px] text-stone-400 italic py-1">
                            No hero figures added. Matches the clean layout of the main website.
                          </p>
                        ) : (
                          (content.home.hero.figures || []).map((fig, fIdx) => (
                            <div key={fIdx} className="grid grid-cols-12 gap-1.5 items-center">
                              <input
                                type="text"
                                value={fig.value}
                                onChange={(e) => {
                                  const figs = [...content.home.hero.figures];
                                  figs[fIdx] = { ...figs[fIdx], value: e.target.value };
                                  updateSection("home", {
                                    hero: { ...content.home.hero, figures: figs },
                                  });
                                }}
                                placeholder="39+"
                                className="col-span-4 text-xs px-2 py-1 border border-stone-300 rounded bg-stone-50 font-bold focus:bg-white"
                              />
                              <input
                                type="text"
                                value={fig.label}
                                onChange={(e) => {
                                  const figs = [...content.home.hero.figures];
                                  figs[fIdx] = { ...figs[fIdx], label: e.target.value };
                                  updateSection("home", {
                                    hero: { ...content.home.hero, figures: figs },
                                  });
                                }}
                                placeholder="Years of Service"
                                className="col-span-7 text-xs px-2 py-1 border border-stone-300 rounded bg-stone-50 focus:bg-white"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const figs = content.home.hero.figures.filter((_, i) => i !== fIdx);
                                  updateSection("home", {
                                    hero: { ...content.home.hero, figures: figs },
                                  });
                                  toast.success("Figure deleted.");
                                }}
                                className="col-span-1 p-1 text-stone-400 hover:text-red-600 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ----------------- 2. HOMEPAGE: OUR WORK (3 PILLARS) ----------------- */}
              {pageType === "home" && activeHomeTab === "ourWork" && (
                <div className="flex flex-col gap-3">
                  <div className="bg-white p-3.5 rounded-xl border border-stone-200 flex flex-col gap-2.5">
                    <h4 className="font-bold text-[11px] uppercase tracking-wider text-[#1E4D2B] border-b border-stone-100 pb-1">
                      Section Title &amp; Lead Intro
                    </h4>
                    <div>
                      <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">
                        Section Title
                      </label>
                      <input
                        type="text"
                        value={content.home.ourWork?.heading || content.home.ourWork?.title || ""}
                        onChange={(e) =>
                          updateSection("home", {
                            ourWork: {
                              ...content.home.ourWork,
                              title: e.target.value,
                              heading: e.target.value,
                            },
                          })
                        }
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 font-serif font-bold text-stone-900"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">
                        Narrative Intro
                      </label>
                      <textarea
                        rows={3}
                        value={content.home.ourWork?.lead || content.home.ourWork?.intro || ""}
                        onChange={(e) =>
                          updateSection("home", {
                            ourWork: {
                              ...content.home.ourWork,
                              lead: e.target.value,
                              intro: e.target.value,
                            },
                          })
                        }
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 text-stone-700"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-xs text-stone-800 block">
                        3 Core Pillars Overview
                      </span>
                      <span className="text-[11px] text-stone-500">
                        Rights &amp; Governance · Lifelong Learning · Climate &amp; Health
                      </span>
                    </div>
                    <Link
                      to={ROUTES.programs}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 hover:text-emerald-900 bg-white px-2.5 py-1 rounded border border-stone-200 shadow-sm"
                    >
                      <span>View Pillars</span>
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              )}

              {/* ----------------- 3. HOMEPAGE: ABOUT LAYA (FOUR DECADES) ----------------- */}
              {pageType === "home" && activeHomeTab === "fourDecades" && (
                <div className="flex flex-col gap-3">
                  <div className="bg-white p-3.5 rounded-xl border border-stone-200 flex flex-col gap-2.5">
                    <h4 className="font-bold text-[11px] uppercase tracking-wider text-[#1E4D2B] border-b border-stone-100 pb-1">
                      Four Decades of Service
                    </h4>
                    <div>
                      <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">
                        Section Heading
                      </label>
                      <input
                        type="text"
                        value={content.home.fourDecades?.heading || content.home.fourDecades?.title || ""}
                        onChange={(e) =>
                          updateSection("home", {
                            fourDecades: {
                              ...content.home.fourDecades,
                              title: e.target.value,
                              heading: e.target.value,
                            },
                          })
                        }
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 font-serif font-bold text-stone-900"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">
                        Story Button Label
                      </label>
                      <input
                        type="text"
                        value={content.home.fourDecades?.cta?.label || "Our Story"}
                        onChange={(e) =>
                          updateSection("home", {
                            fourDecades: {
                              ...content.home.fourDecades,
                              cta: { ...content.home.fourDecades?.cta, label: e.target.value },
                            },
                          })
                        }
                        className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ----------------- 3b. HOMEPAGE: VOICES / REFLECTIONS ----------------- */}
              {pageType === "home" && activeHomeTab === "reflections" && (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between pb-1 border-b border-stone-200">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-600">
                      Community Voices ({content.home.voices?.items?.length || 0})
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const newQuote = {
                          quote: "New community voice reflection on dignity and self-determination.",
                          who: "Community Leader",
                          role: "Village Elder",
                          location: "Eastern Ghats",
                        };
                        const items = [...(content.home.voices?.items || []), newQuote];
                        updateSection("home", {
                          voices: { ...content.home.voices, items },
                        });
                        toast.success("Added voice quote.");
                      }}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Quote</span>
                    </button>
                  </div>

                  <div className="flex flex-col gap-3">
                    {content.home.voices?.items?.map((item, idx) => (
                      <div key={idx} className="bg-white p-3 rounded-xl border border-stone-200 flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-emerald-800">Quote #{idx + 1}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const items = (content.home.voices?.items || []).filter((_, i) => i !== idx);
                              updateSection("home", {
                                voices: { ...content.home.voices, items },
                              });
                              toast.success("Quote removed.");
                            }}
                            className="p-1 text-stone-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">Quote</label>
                          <textarea
                            rows={2}
                            value={item.quote}
                            onChange={(e) => {
                              const items = [...(content.home.voices?.items || [])];
                              items[idx] = { ...items[idx], quote: e.target.value };
                              updateSection("home", { voices: { ...content.home.voices, items } });
                            }}
                            className="w-full text-xs px-2.5 py-1.5 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] font-bold uppercase text-stone-500 block mb-0.5">Author</label>
                            <input
                              type="text"
                              value={item.who}
                              onChange={(e) => {
                                const items = [...(content.home.voices?.items || [])];
                                items[idx] = { ...items[idx], who: e.target.value };
                                updateSection("home", { voices: { ...content.home.voices, items } });
                              }}
                              className="w-full text-xs px-2.5 py-1 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold uppercase text-stone-500 block mb-0.5">Role / Location</label>
                            <input
                              type="text"
                              value={item.role || item.location || ""}
                              onChange={(e) => {
                                const items = [...(content.home.voices?.items || [])];
                                items[idx] = { ...items[idx], role: e.target.value };
                                updateSection("home", { voices: { ...content.home.voices, items } });
                              }}
                              className="w-full text-xs px-2.5 py-1 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ----------------- 3c. HOMEPAGE: STORIES PREVIEW ----------------- */}
              {pageType === "home" && activeHomeTab === "stories" && (
                <div className="bg-white p-3.5 rounded-xl border border-stone-200 flex flex-col gap-2.5">
                  <h4 className="font-bold text-[11px] uppercase tracking-wider text-[#1E4D2B] border-b border-stone-100 pb-1">
                    Field Stories Section on Homepage
                  </h4>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">Section Title</label>
                    <input
                      type="text"
                      value={content.home.stories?.title || ""}
                      onChange={(e) =>
                        updateSection("home", {
                          stories: { ...content.home.stories, title: e.target.value },
                        })
                      }
                      className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white font-serif font-bold text-stone-900"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">Lead Narrative</label>
                    <textarea
                      rows={3}
                      value={content.home.stories?.lead || ""}
                      onChange={(e) =>
                        updateSection("home", {
                          stories: { ...content.home.stories, lead: e.target.value },
                        })
                      }
                      className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white text-stone-700"
                    />
                  </div>
                </div>
              )}

              {/* ----------------- 3d. HOMEPAGE: THE LAYA CHRONICLE ----------------- */}
              {pageType === "home" && activeHomeTab === "chronicle" && (
                <div className="bg-white p-3.5 rounded-xl border border-stone-200 flex flex-col gap-2.5">
                  <h4 className="font-bold text-[11px] uppercase tracking-wider text-[#1E4D2B] border-b border-stone-100 pb-1">
                    The LAYA Chronicle Section
                  </h4>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">Title</label>
                    <input
                      type="text"
                      value={content.home.chronicle?.title || ""}
                      onChange={(e) =>
                        updateSection("home", {
                          chronicle: { ...content.home.chronicle, title: e.target.value },
                        })
                      }
                      className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white font-serif font-bold text-stone-900"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">Lead Narrative</label>
                    <textarea
                      rows={3}
                      value={content.home.chronicle?.lead || ""}
                      onChange={(e) =>
                        updateSection("home", {
                          chronicle: { ...content.home.chronicle, lead: e.target.value },
                        })
                      }
                      className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white text-stone-700"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">Button Label</label>
                    <input
                      type="text"
                      value={content.home.chronicle?.linkText || "Explore Resource Centre"}
                      onChange={(e) =>
                        updateSection("home", {
                          chronicle: { ...content.home.chronicle, linkText: e.target.value },
                        })
                      }
                      className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white"
                    />
                  </div>
                </div>
              )}

              {/* ----------------- 3e. HOMEPAGE: AUDITED IMPACT ----------------- */}
              {pageType === "home" && activeHomeTab === "impact" && (
                <div className="bg-white p-3.5 rounded-xl border border-stone-200 flex flex-col gap-2.5">
                  <h4 className="font-bold text-[11px] uppercase tracking-wider text-[#1E4D2B] border-b border-stone-100 pb-1">
                    Audited Impact Section on Homepage
                  </h4>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">Title</label>
                    <input
                      type="text"
                      value={content.home.impact?.title || ""}
                      onChange={(e) =>
                        updateSection("home", {
                          impact: { ...content.home.impact, title: e.target.value },
                        })
                      }
                      className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white font-serif font-bold text-stone-900"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">Lead Narrative</label>
                    <textarea
                      rows={3}
                      value={content.home.impact?.lead || ""}
                      onChange={(e) =>
                        updateSection("home", {
                          impact: { ...content.home.impact, lead: e.target.value },
                        })
                      }
                      className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white text-stone-700"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">Button Label</label>
                    <input
                      type="text"
                      value={content.home.impact?.linkText || "View Audited Indicators"}
                      onChange={(e) =>
                        updateSection("home", {
                          impact: { ...content.home.impact, linkText: e.target.value },
                        })
                      }
                      className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white"
                    />
                  </div>
                </div>
              )}

              {/* ----------------- 3f. HOMEPAGE: SUPPORT LAYA ----------------- */}
              {pageType === "home" && activeHomeTab === "support" && (
                <div className="bg-white p-3.5 rounded-xl border border-stone-200 flex flex-col gap-2.5">
                  <h4 className="font-bold text-[11px] uppercase tracking-wider text-[#1E4D2B] border-b border-stone-100 pb-1">
                    Support LAYA Section on Homepage
                  </h4>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">Heading</label>
                    <input
                      type="text"
                      value={content.home.support?.title || "Support LAYA"}
                      onChange={(e) =>
                        updateSection("home", {
                          support: { ...(content.home.support as any), title: e.target.value },
                        })
                      }
                      className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white font-serif font-bold text-stone-900"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">Narrative Body</label>
                    <textarea
                      rows={3}
                      value={content.home.support?.body || ""}
                      onChange={(e) =>
                        updateSection("home", {
                          support: { ...(content.home.support as any), body: e.target.value },
                        })
                      }
                      className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white text-stone-700"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">Primary Button</label>
                      <input
                        type="text"
                        value={content.home.support?.primaryCta?.label || "Ways to Give"}
                        onChange={(e) =>
                          updateSection("home", {
                            support: {
                              ...(content.home.support as any),
                              primaryCta: {
                                ...(content.home.support?.primaryCta || { to: ROUTES.donate }),
                                label: e.target.value,
                              },
                            },
                          })
                        }
                        className="w-full text-xs px-2.5 py-1 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">Secondary Button</label>
                      <input
                        type="text"
                        value={content.home.support?.secondaryCta?.label || "Contact Us"}
                        onChange={(e) =>
                          updateSection("home", {
                            support: {
                              ...(content.home.support as any),
                              secondaryCta: {
                                ...(content.home.support?.secondaryCta || { to: ROUTES.contact }),
                                label: e.target.value,
                              },
                            },
                          })
                        }
                        className="w-full text-xs px-2.5 py-1 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ----------------- 4. PROGRAMME PAGES EDITOR ----------------- */}
              {pageType === "programme" && currentProgramme && (
                <div className="flex flex-col gap-4">
                  <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                      Active Programme
                    </label>
                    <select
                      value={currentProgramme.to}
                      onChange={(e) => {
                        window.location.href = `${e.target.value}?edit=true`;
                      }}
                      className="w-full text-xs font-semibold px-3 py-2 border border-stone-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600"
                    >
                      {(content.programmes || []).map((p, idx) => (
                        <option key={p.to || idx} value={p.to}>
                          #{idx + 1} · {p.shortTitle || p.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-stone-200 flex flex-col gap-2.5">
                    <h4 className="font-bold text-[11px] uppercase tracking-wider text-[#1E4D2B] border-b border-stone-100 pb-1">
                      Programme Hero Header
                    </h4>
                    <div>
                      <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">
                        Hero Eyebrow
                      </label>
                      <input
                        type="text"
                        value={currentProgramme.heroEyebrow || ""}
                        onChange={(e) => updateProgrammeField("heroEyebrow", e.target.value)}
                        className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">
                        Main Headline
                      </label>
                      <textarea
                        rows={2}
                        value={currentProgramme.heroHeading || currentProgramme.title}
                        onChange={(e) => updateProgrammeField("heroHeading", e.target.value)}
                        className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white font-serif font-bold text-stone-900"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">
                        Lead Narrative
                      </label>
                      <textarea
                        rows={3}
                        value={currentProgramme.heroLead || currentProgramme.lead || ""}
                        onChange={(e) => updateProgrammeField("heroLead", e.target.value)}
                        className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white text-stone-700"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ----------------- 5. ABOUT PAGE EDITOR ----------------- */}
              {pageType === "about" && (
                <div className="flex flex-col gap-3">
                  {activeAboutTab === "who" && (
                    <div className="bg-white p-3.5 rounded-xl border border-stone-200 flex flex-col gap-2.5">
                      <h4 className="font-bold text-[11px] uppercase tracking-wider text-[#1E4D2B] border-b border-stone-100 pb-1">
                        Who We Are &amp; Core Mission
                      </h4>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">Title</label>
                        <input
                          type="text"
                          value={content.about.whoWeAre.title}
                          onChange={(e) =>
                            updateSection("about", {
                              whoWeAre: { ...content.about.whoWeAre, title: e.target.value },
                            })
                          }
                          className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white font-serif font-bold text-stone-900"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">Narrative Description</label>
                        <textarea
                          rows={4}
                          value={content.about.whoWeAre.description}
                          onChange={(e) =>
                            updateSection("about", {
                              whoWeAre: { ...content.about.whoWeAre, description: e.target.value },
                            })
                          }
                          className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white text-stone-700"
                        />
                      </div>
                    </div>
                  )}

                  {activeAboutTab === "way" && (
                    <div className="bg-white p-3.5 rounded-xl border border-stone-200 flex flex-col gap-2.5">
                      <h4 className="font-bold text-[11px] uppercase tracking-wider text-[#1E4D2B] border-b border-stone-100 pb-1">
                        Way We Work Section
                      </h4>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">Title</label>
                        <input
                          type="text"
                          value={content.about.wayWeWork?.title || "The Way We Work"}
                          onChange={(e) =>
                            updateSection("about", {
                              wayWeWork: { ...(content.about.wayWeWork as any), title: e.target.value },
                            })
                          }
                          className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white font-serif font-bold text-stone-900"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">Description</label>
                        <textarea
                          rows={4}
                          value={content.about.wayWeWork?.description || ""}
                          onChange={(e) =>
                            updateSection("about", {
                              wayWeWork: { ...(content.about.wayWeWork as any), description: e.target.value },
                            })
                          }
                          className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white text-stone-700"
                        />
                      </div>
                    </div>
                  )}

                  {activeAboutTab === "where" && (
                    <div className="bg-white p-3.5 rounded-xl border border-stone-200 flex flex-col gap-2.5">
                      <h4 className="font-bold text-[11px] uppercase tracking-wider text-[#1E4D2B] border-b border-stone-100 pb-1">
                        Where We Work (Geography &amp; Presence)
                      </h4>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">Title</label>
                        <input
                          type="text"
                          value={content.about.whereWeWork?.title || "Where We Work"}
                          onChange={(e) =>
                            updateSection("about", {
                              whereWeWork: { ...(content.about.whereWeWork as any), title: e.target.value },
                            })
                          }
                          className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white font-serif font-bold text-stone-900"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">Description</label>
                        <textarea
                          rows={4}
                          value={content.about.whereWeWork?.description || ""}
                          onChange={(e) =>
                            updateSection("about", {
                              whereWeWork: { ...(content.about.whereWeWork as any), description: e.target.value },
                            })
                          }
                          className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white text-stone-700"
                        />
                      </div>
                    </div>
                  )}

                  {activeAboutTab === "governance" && (
                    <div className="bg-white p-3.5 rounded-xl border border-stone-200 flex flex-col gap-2.5">
                      <h4 className="font-bold text-[11px] uppercase tracking-wider text-[#1E4D2B] border-b border-stone-100 pb-1">
                        Governance Structure &amp; Board
                      </h4>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">Title</label>
                        <input
                          type="text"
                          value={content.about.governance.title}
                          onChange={(e) =>
                            updateSection("about", {
                              governance: { ...content.about.governance, title: e.target.value },
                            })
                          }
                          className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white font-serif font-bold text-stone-900"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">Description</label>
                        <textarea
                          rows={3}
                          value={content.about.governance.description}
                          onChange={(e) =>
                            updateSection("about", {
                              governance: { ...content.about.governance, description: e.target.value },
                            })
                          }
                          className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white text-stone-700"
                        />
                      </div>
                    </div>
                  )}

                  {activeAboutTab === "fcra" && (
                    <div className="bg-white p-3.5 rounded-xl border border-stone-200 flex flex-col gap-2.5">
                      <h4 className="font-bold text-[11px] uppercase tracking-wider text-[#1E4D2B] border-b border-stone-100 pb-1">
                        FCRA Statutory Disclosures
                      </h4>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">Registration Number</label>
                        <input
                          type="text"
                          value={content.about.fcraInformation?.registrationNumber || (content.about.fcraInformation as any)?.fcraRegistration?.registrationNumber || ""}
                          onChange={(e) =>
                            updateSection("about", {
                              fcraInformation: {
                                ...(content.about.fcraInformation as any),
                                registrationNumber: e.target.value,
                              },
                            })
                          }
                          className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">Designated Bank</label>
                        <input
                          type="text"
                          value={content.about.fcraInformation?.bankName || (content.about.fcraInformation as any)?.bankDetails?.bankName || ""}
                          onChange={(e) =>
                            updateSection("about", {
                              fcraInformation: {
                                ...(content.about.fcraInformation as any),
                                bankName: e.target.value,
                              },
                            })
                          }
                          className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ----------------- 6. IMPACT PAGE EDITOR ----------------- */}
              {pageType === "impact" && (
                <div className="flex flex-col gap-3">
                  <div className="bg-white p-3.5 rounded-xl border border-stone-200 flex flex-col gap-2.5">
                    <h4 className="font-bold text-[11px] uppercase tracking-wider text-[#1E4D2B] border-b border-stone-100 pb-1">
                      Impact Header &amp; Disclosures
                    </h4>
                    <div>
                      <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">Eyebrow</label>
                      <input
                        type="text"
                        value={content.impact.hero?.eyebrow || "Verifiable Outcomes"}
                        onChange={(e) =>
                          updateSection("impact", {
                            hero: { ...(content.impact.hero as any), eyebrow: e.target.value },
                          })
                        }
                        className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">Title</label>
                      <input
                        type="text"
                        value={content.impact.hero?.title || "Our Impact"}
                        onChange={(e) =>
                          updateSection("impact", {
                            hero: { ...(content.impact.hero as any), title: e.target.value },
                          })
                        }
                        className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white font-serif font-bold text-stone-900"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">Lead Narrative</label>
                      <textarea
                        rows={3}
                        value={content.impact.hero?.lead || ""}
                        onChange={(e) =>
                          updateSection("impact", {
                            hero: { ...(content.impact.hero as any), lead: e.target.value },
                          })
                        }
                        className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white text-stone-700"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">Provenance Notice</label>
                      <textarea
                        rows={2}
                        value={content.impact.provenanceNotice || ""}
                        onChange={(e) =>
                          updateSection("impact", {
                            provenanceNotice: e.target.value,
                          })
                        }
                        className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white text-stone-700"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ----------------- 7. CONTACT PAGE EDITOR ----------------- */}
              {pageType === "contact" && (
                <div className="bg-white p-3.5 rounded-xl border border-stone-200 flex flex-col gap-2.5">
                  <h4 className="font-bold text-[11px] uppercase tracking-wider text-[#1E4D2B] border-b border-stone-100 pb-1">
                    Contact &amp; Field Hub Coordinates
                  </h4>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">Postal Address</label>
                    <textarea
                      rows={2}
                      value={content.contact.details.address}
                      onChange={(e) =>
                        updateSection("contact", {
                          details: { ...content.contact.details, address: e.target.value },
                        })
                      }
                      className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">Phone</label>
                      <input
                        type="text"
                        value={content.contact.details.phone}
                        onChange={(e) =>
                          updateSection("contact", {
                            details: { ...content.contact.details, phone: e.target.value },
                          })
                        }
                        className="w-full text-xs px-2.5 py-1.5 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">Email</label>
                      <input
                        type="text"
                        value={content.contact.details.email}
                        onChange={(e) =>
                          updateSection("contact", {
                            details: { ...content.contact.details, email: e.target.value },
                          })
                        }
                        className="w-full text-xs px-2.5 py-1.5 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ----------------- 8. DONATE PAGE EDITOR ----------------- */}
              {pageType === "donate" && (
                <div className="bg-white p-3.5 rounded-xl border border-stone-200 flex flex-col gap-2.5">
                  <h4 className="font-bold text-[11px] uppercase tracking-wider text-[#1E4D2B] border-b border-stone-100 pb-1">
                    Donations &amp; Institutional Support
                  </h4>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">Header Eyebrow</label>
                    <input
                      type="text"
                      value={content.donate?.header?.eyebrow || "Support Our Work"}
                      onChange={(e) =>
                        updateSection("donate", {
                          header: { ...(content.donate?.header as any), eyebrow: e.target.value },
                        })
                      }
                      className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">Title</label>
                    <input
                      type="text"
                      value={content.donate?.header?.title || "Support LAYA"}
                      onChange={(e) =>
                        updateSection("donate", {
                          header: { ...(content.donate?.header as any), title: e.target.value },
                        })
                      }
                      className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white font-serif font-bold text-stone-900"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">Lead Narrative</label>
                    <textarea
                      rows={3}
                      value={content.donate?.header?.lead || ""}
                      onChange={(e) =>
                        updateSection("donate", {
                          header: { ...(content.donate?.header as any), lead: e.target.value },
                        })
                      }
                      className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white text-stone-700"
                    />
                  </div>
                </div>
              )}

              {/* ----------------- 9. STORIES PAGE OVERVIEW ----------------- */}
              {pageType === "stories" && (
                <div className="bg-white p-3.5 rounded-xl border border-stone-200 flex flex-col gap-2.5">
                  <h4 className="font-bold text-[11px] uppercase tracking-wider text-[#1E4D2B] border-b border-stone-100 pb-1">
                    Stories &amp; Field Notes Header
                  </h4>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">Title</label>
                    <input
                      type="text"
                      value={content.home.stories?.title || "Field Notes"}
                      onChange={(e) =>
                        updateSection("home", {
                          stories: { ...content.home.stories, title: e.target.value },
                        })
                      }
                      className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white font-serif font-bold text-stone-900"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">Lead Narrative</label>
                    <textarea
                      rows={3}
                      value={content.home.stories?.lead || ""}
                      onChange={(e) =>
                        updateSection("home", {
                          stories: { ...content.home.stories, lead: e.target.value },
                        })
                      }
                      className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white text-stone-700"
                    />
                  </div>
                </div>
              )}

              {/* ----------------- 10. PUBLICATIONS PAGE EDITOR ----------------- */}
              {pageType === "publications" && (
                <div className="bg-white p-3.5 rounded-xl border border-stone-200 flex flex-col gap-2.5">
                  <h4 className="font-bold text-[11px] uppercase tracking-wider text-[#1E4D2B] border-b border-stone-100 pb-1">
                    Resource Centre Header
                  </h4>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">Eyebrow</label>
                    <input
                      type="text"
                      value={content.publications?.header?.eyebrow || "Knowledge"}
                      onChange={(e) =>
                        updateSection("publications", {
                          header: { ...(content.publications?.header as any), eyebrow: e.target.value },
                        })
                      }
                      className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">Title</label>
                    <input
                      type="text"
                      value={content.publications?.header?.title || "Resource Centre"}
                      onChange={(e) =>
                        updateSection("publications", {
                          header: { ...(content.publications?.header as any), title: e.target.value },
                        })
                      }
                      className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white font-serif font-bold text-stone-900"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">Lead Narrative</label>
                    <textarea
                      rows={3}
                      value={content.publications?.header?.lead || ""}
                      onChange={(e) =>
                        updateSection("publications", {
                          header: { ...(content.publications?.header as any), lead: e.target.value },
                        })
                      }
                      className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white text-stone-700"
                    />
                  </div>
                </div>
              )}

              {/* ----------------- 11. OTHER PAGES (FALLBACK) ----------------- */}
              {pageType === "general" && (
                <div className="bg-white p-4 rounded-xl border border-stone-200 flex flex-col gap-3 text-center py-6">
                  <p className="text-xs text-stone-600">
                    You are viewing <strong>{pageLabel}</strong>.
                  </p>
                  <p className="text-[11px] text-stone-500">
                    To edit comprehensive tables or sitewide options, open the full administrative hub:
                  </p>
                  <Link
                    to={ROUTES.admin}
                    target="_blank"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#1E4D2B] text-white font-semibold rounded-lg hover:bg-[#163D21] transition-all shadow-sm text-xs mt-1"
                  >
                    <span>Open Full Admin CMS</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>

            {/* Panel Footer */}
            <div className="px-4 py-2.5 bg-[#FAF8F5] border-t border-stone-200 flex items-center justify-between">
              <span className="text-[11px] text-stone-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {isModified ? "Local edits active" : "Synced with defaults"}
              </span>
              <button
                type="button"
                onClick={() => {
                  toast.success("Changes saved successfully!");
                  setIsOpen(false);
                }}
                className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-[#1E4D2B] hover:bg-[#163D21] text-white font-semibold rounded-lg text-xs transition-colors shadow-sm"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Done Editing</span>
              </button>
            </div>
          </div>
          )}
        </>
      )}
    </>
  );
};
