import { useEffect, useState } from "react";

export function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage or default to system preference
    const saved = localStorage.getItem("laya-theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("is-inverse");
      localStorage.setItem("laya-theme", "dark");
    } else {
      root.classList.remove("is-inverse");
      localStorage.setItem("laya-theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return { isDark, toggleTheme };
}
