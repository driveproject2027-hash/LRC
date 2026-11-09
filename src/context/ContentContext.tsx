import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import {
  WebsiteContentState,
  getLiveContent,
  updateSection as storeUpdateSection,
  updateFullContent as storeUpdateFullContent,
  resetSection as storeResetSection,
  resetAllContent as storeResetAllContent,
  exportContentJson as storeExportJson,
  importContentJson as storeImportJson,
  isContentModified as storeIsModified,
  subscribe,
} from "@/lib/contentStore";

export interface ContentContextType {
  content: WebsiteContentState;
  updateSection: <K extends keyof WebsiteContentState>(
    section: K,
    partialData: Partial<WebsiteContentState[K]>
  ) => void;
  updateFullContent: (newContent: WebsiteContentState) => void;
  resetSection: (section: keyof WebsiteContentState) => void;
  resetAll: () => void;
  exportJson: () => string;
  importJson: (json: string) => boolean;
  isModified: boolean;
  refresh: () => void;
}

const defaultContextValue: ContentContextType = {
  content: getLiveContent(),
  updateSection: storeUpdateSection,
  updateFullContent: storeUpdateFullContent,
  resetSection: storeResetSection,
  resetAll: storeResetAllContent,
  exportJson: storeExportJson,
  importJson: storeImportJson,
  isModified: storeIsModified(),
  refresh: () => {},
};

const ContentContext = createContext<ContentContextType>(defaultContextValue);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<WebsiteContentState>(() => getLiveContent());
  const [isModified, setIsModified] = useState<boolean>(() => storeIsModified());

  const handleUpdate = useCallback(() => {
    setContent(getLiveContent());
    setIsModified(storeIsModified());
  }, []);

  useEffect(() => {
    const unsubscribe = subscribe(handleUpdate);
    return () => unsubscribe();
  }, [handleUpdate]);

  const updateSection = useCallback(
    <K extends keyof WebsiteContentState>(
      section: K,
      partialData: Partial<WebsiteContentState[K]>
    ) => {
      storeUpdateSection(section, partialData);
      setContent(getLiveContent());
      setIsModified(storeIsModified());
    },
    []
  );

  const updateFullContent = useCallback((newContent: WebsiteContentState) => {
    storeUpdateFullContent(newContent);
    setContent(getLiveContent());
    setIsModified(storeIsModified());
  }, []);

  const resetSection = useCallback((section: keyof WebsiteContentState) => {
    storeResetSection(section);
    setContent(getLiveContent());
    setIsModified(storeIsModified());
  }, []);

  const resetAll = useCallback(() => {
    storeResetAllContent();
    setContent(getLiveContent());
    setIsModified(false);
  }, []);

  const exportJson = useCallback(() => {
    return storeExportJson();
  }, []);

  const importJson = useCallback((jsonString: string) => {
    const success = storeImportJson(jsonString);
    if (success) {
      setContent(getLiveContent());
      setIsModified(storeIsModified());
    }
    return success;
  }, []);

  const value = useMemo<ContentContextType>(
    () => ({
      content,
      updateSection,
      updateFullContent,
      resetSection,
      resetAll,
      exportJson,
      importJson,
      isModified,
      refresh: handleUpdate,
    }),
    [content, isModified, updateSection, updateFullContent, resetSection, resetAll, exportJson, importJson, handleUpdate]
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
};

/**
 * Hook to access dynamic website content and mutations.
 * Safe to use anywhere — falls back to live store if outside ContentProvider.
 */
export function useWebsiteContent(): ContentContextType {
  const ctx = useContext(ContentContext);
  return ctx || defaultContextValue;
}

export const useContent = useWebsiteContent;
