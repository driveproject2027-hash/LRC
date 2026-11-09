export const LAYA_SCROLL_ID = "laya-scroll";

export const getScrollRoot = (): HTMLElement | null =>
  document.getElementById(LAYA_SCROLL_ID);

export const getScrollTop = (): number => {
  const root = getScrollRoot();
  if (root) return root.scrollTop;
  return window.scrollY || document.documentElement.scrollTop || 0;
};

export const scrollPageToTop = (smooth = false) => {
  const root = getScrollRoot();
  if (root) {
    if (smooth) root.scrollTo({ top: 0, behavior: "smooth" });
    else root.scrollTop = 0;
  }
  if (smooth) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }
};

export const scrollToElement = (targetId: string, smooth = true) => {
  const id = targetId.replace(/^#/, "");
  const el = document.getElementById(id);
  if (!el) return;

  const root = getScrollRoot();
  const chromeHeight = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue("--laya-chrome-height") || "120",
    10
  );

  if (root) {
    const rootRect = root.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const targetScrollTop = root.scrollTop + (elRect.top - rootRect.top) - 16;
    root.scrollTo({
      top: Math.max(0, targetScrollTop),
      behavior: smooth ? "smooth" : "auto",
    });
  } else {
    const elTop = el.getBoundingClientRect().top + window.scrollY - (chromeHeight + 16);
    window.scrollTo({
      top: Math.max(0, elTop),
      behavior: smooth ? "smooth" : "auto",
    });
  }
};

export const onScrollRoot = (handler: () => void) => {
  const root = getScrollRoot();
  const opts = { passive: true } as const;
  if (root) {
    root.addEventListener("scroll", handler, opts);
    return () => root.removeEventListener("scroll", handler);
  }
  window.addEventListener("scroll", handler, opts);
  return () => window.removeEventListener("scroll", handler);
};
