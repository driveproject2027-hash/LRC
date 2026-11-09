import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useWebsiteContent } from "@/context/ContentContext";
import { toast } from "sonner";

export interface InlineEditTarget {
  path: string;
  label: string;
  value: string;
  multiline?: boolean;
  type?: "text" | "textarea" | "image";
  rect?: DOMRect;
  options?: string[];
}

export interface DirectEditContextType {
  isDirectEdit: boolean;
  setDirectEdit: (active: boolean) => void;
  toggleDirectEdit: () => void;
  highlightOutlines: boolean;
  setHighlightOutlines: (val: boolean) => void;
  toggleHighlightOutlines: () => void;
  activeTarget: InlineEditTarget | null;
  openInlineEditor: (target: InlineEditTarget) => void;
  closeInlineEditor: () => void;
  saveValue: (path: string, newValue: any, label?: string, silent?: boolean) => void;
  selectedHeroSlide: number;
  setSelectedHeroSlide: (slideIdx: number) => void;
}

const STORAGE_KEY = "laya_admin_direct_edit";

const DirectEditContext = createContext<DirectEditContextType | null>(null);

/**
 * Deeply sets a value in an object given a dot-notated path ("a.b.c.0.d")
 * Returns a new immutably cloned object.
 */
export function setDeepPath<T extends object>(obj: T, path: string, value: any): T {
  const parts = path.split(".");
  const clone = JSON.parse(JSON.stringify(obj));

  let current: any = clone;
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i];
    if (current[key] === undefined || current[key] === null) {
      const nextKey = parts[i + 1];
      current[key] = !isNaN(Number(nextKey)) ? [] : {};
    }
    current = current[key];
  }
  const lastKey = parts[parts.length - 1];
  current[lastKey] = value;

  return clone;
}

export const DirectEditProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { content, updateSection } = useWebsiteContent();
  const { pathname, search } = useLocation();

  // State: Direct edit mode is enabled if stored in localStorage or URL query ?edit=true or ?cms=true
  const [isDirectEdit, setIsDirectEditState] = useState<boolean>(() => {
    try {
      const urlHasEdit = window.location.search.includes("edit=true") || window.location.search.includes("cms=true");
      if (urlHasEdit) return true;
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored === "true";
    } catch {
      return false;
    }
  });

  const [highlightOutlines, setHighlightOutlines] = useState<boolean>(true);
  const [activeTarget, setActiveTarget] = useState<InlineEditTarget | null>(null);
  const [selectedHeroSlide, setSelectedHeroSlide] = useState<number>(0);

  // Sync with URL query param if present
  useEffect(() => {
    if (search.includes("edit=true") || search.includes("cms=true")) {
      setIsDirectEditState(true);
      try {
        localStorage.setItem(STORAGE_KEY, "true");
      } catch {}
    }
  }, [search]);

  // Persist state in localStorage
  const setDirectEdit = useCallback((active: boolean) => {
    setIsDirectEditState(active);
    try {
      localStorage.setItem(STORAGE_KEY, active ? "true" : "false");
    } catch {}
    if (active) {
      toast.success("Direct Live Website Editing Activated", {
        description: "Click any text or image on the page to edit directly in place.",
      });
    } else {
      setActiveTarget(null);
    }
  }, []);

  const toggleDirectEdit = useCallback(() => {
    setDirectEdit(!isDirectEdit);
  }, [isDirectEdit, setDirectEdit]);

  const toggleHighlightOutlines = useCallback(() => {
    setHighlightOutlines((prev) => !prev);
  }, []);

  const openInlineEditor = useCallback(
    (target: InlineEditTarget) => {
      if (!isDirectEdit) return;
      setActiveTarget(target);
    },
    [isDirectEdit]
  );

  const closeInlineEditor = useCallback(() => {
    setActiveTarget(null);
  }, []);

  /**
   * Save a modified field path into the central content store.
   * Handles slide-0 synchronization with hero top-level fields.
   */
  const saveValue = useCallback(
    (path: string, newValue: any, label?: string, silent: boolean = false) => {
      try {
        const rootSection = path.split(".")[0];
        let updatedFull = setDeepPath(content, path, newValue);

        // Keep slide 0 synchronized with hero top-level fields
        if (path === "home.hero.headline") {
          updatedFull = setDeepPath(updatedFull, "home.hero.slides.0.headline", newValue);
        } else if (path === "home.hero.slides.0.headline") {
          updatedFull = setDeepPath(updatedFull, "home.hero.headline", newValue);
        } else if (path === "home.hero.eyebrow") {
          updatedFull = setDeepPath(updatedFull, "home.hero.slides.0.eyebrow", newValue);
        } else if (path === "home.hero.slides.0.eyebrow") {
          updatedFull = setDeepPath(updatedFull, "home.hero.eyebrow", newValue);
        } else if (path === "home.hero.supporting") {
          updatedFull = setDeepPath(updatedFull, "home.hero.slides.0.supporting", newValue);
        } else if (path === "home.hero.slides.0.supporting") {
          updatedFull = setDeepPath(updatedFull, "home.hero.supporting", newValue);
        } else if (path === "home.hero.primaryCta.label") {
          updatedFull = setDeepPath(updatedFull, "home.hero.slides.0.primaryCta.label", newValue);
        } else if (path === "home.hero.slides.0.primaryCta.label") {
          updatedFull = setDeepPath(updatedFull, "home.hero.primaryCta.label", newValue);
        } else if (path === "home.hero.secondaryCta.label") {
          updatedFull = setDeepPath(updatedFull, "home.hero.slides.0.secondaryCta.label", newValue);
        } else if (path === "home.hero.slides.0.secondaryCta.label") {
          updatedFull = setDeepPath(updatedFull, "home.hero.secondaryCta.label", newValue);
        }

        // Apply mutation to the specific section
        updateSection(rootSection as any, (updatedFull as any)[rootSection]);

        if (!silent) {
          toast.success(`Saved: ${label || path}`, {
            description: "Changes applied live across the website.",
            duration: 2500,
          });
        }
      } catch (err) {
        console.error("Failed to save inline edit:", err);
        if (!silent) {
          toast.error("Could not save edit. Please check console for details.");
        }
      }
    },
    [content, updateSection]
  );

  const value: DirectEditContextType = {
    isDirectEdit: !pathname.startsWith("/admin") && isDirectEdit,
    setDirectEdit,
    toggleDirectEdit,
    highlightOutlines,
    setHighlightOutlines,
    toggleHighlightOutlines,
    activeTarget,
    openInlineEditor,
    closeInlineEditor,
    saveValue,
    selectedHeroSlide,
    setSelectedHeroSlide,
  };

  return <DirectEditContext.Provider value={value}>{children}</DirectEditContext.Provider>;
};

export function useDirectEdit(): DirectEditContextType {
  const ctx = useContext(DirectEditContext);
  if (!ctx) {
    return {
      isDirectEdit: false,
      setDirectEdit: () => {},
      toggleDirectEdit: () => {},
      highlightOutlines: false,
      setHighlightOutlines: () => {},
      toggleHighlightOutlines: () => {},
      activeTarget: null,
      openInlineEditor: () => {},
      closeInlineEditor: () => {},
      saveValue: () => {},
      selectedHeroSlide: 0,
      setSelectedHeroSlide: () => {},
    };
  }
  return ctx;
}
