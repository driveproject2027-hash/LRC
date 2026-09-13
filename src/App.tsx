import { lazy, Suspense, useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import Loader from "@/components/Loader";
import SiteBackground from "@/components/SiteBackground";
import layaLogo from "@/assets/laya-logo.png";
import { scrollPageToTop } from "@/lib/scrollRoot";

const RouteScrollToTop = () => {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    const scrollTop = () => scrollPageToTop();

    scrollTop();
    // Re-run after route transition / lazy load so scroll isn't lost
    const t1 = window.setTimeout(scrollTop, 0);
    const t2 = window.setTimeout(scrollTop, 150);
    const t3 = window.setTimeout(scrollTop, 500);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [pathname, search, hash]);

  return null;
};

// Lazy loaded pages for code splitting
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const AboutCategory = lazy(() => import("./pages/AboutCategory"));
const Programs = lazy(() => import("./pages/Programs"));
const WhatWeDoCategory = lazy(() => import("./pages/WhatWeDoCategory"));
const Publications = lazy(() => import("./pages/Publications"));
const Donate = lazy(() => import("./pages/Donate"));
const Impact = lazy(() => import("./pages/Impact"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Team = lazy(() => import("./pages/Team"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  const [routeLoading, setRouteLoading] = useState(false);

  useEffect(() => {
    setRouteLoading(true);
    const timer = setTimeout(() => {
      setRouteLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      {routeLoading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/60 backdrop-blur-lg">
          <div className="text-center">
            <img
              src={layaLogo}
              alt="LAYA Logo"
              className="h-16 w-16 rounded-full object-cover animate-pulse-logo mb-3"
            />
            <div className="flex justify-center gap-1 text-2xl text-primary font-bold">
              <span className="animate-bounce" style={{ animationDelay: '0s' }}>.</span>
              <span className="animate-bounce" style={{ animationDelay: '0.15s' }}>.</span>
              <span className="animate-bounce" style={{ animationDelay: '0.3s' }}>.</span>
            </div>
          </div>
        </div>
      )}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/about/who-we-are" element={<PageTransition><AboutCategory /></PageTransition>} />
        <Route path="/about/way-we-work" element={<PageTransition><AboutCategory /></PageTransition>} />
        <Route path="/about/where-we-work" element={<PageTransition><AboutCategory /></PageTransition>} />
        <Route path="/about/financial-reports" element={<PageTransition><AboutCategory /></PageTransition>} />
        <Route path="/about/fcra-information" element={<PageTransition><AboutCategory /></PageTransition>} />
        <Route path="/about/governance" element={<PageTransition><AboutCategory /></PageTransition>} />
        <Route path="/about/support-partners" element={<PageTransition><AboutCategory /></PageTransition>} />
        <Route path="/programs" element={<PageTransition><Programs /></PageTransition>} />
        <Route path="/what-we-do/rla" element={<PageTransition><WhatWeDoCategory /></PageTransition>} />
        <Route path="/what-we-do/hbhc" element={<PageTransition><WhatWeDoCategory /></PageTransition>} />
        <Route path="/what-we-do/srm" element={<PageTransition><WhatWeDoCategory /></PageTransition>} />
        <Route path="/what-we-do/lifelong-learning" element={<PageTransition><WhatWeDoCategory /></PageTransition>} />
        <Route path="/what-we-do/climate-crisis-sustainable-development" element={<PageTransition><WhatWeDoCategory /></PageTransition>} />
        <Route path="/publications" element={<PageTransition><Publications /></PageTransition>} />
        <Route path="/donate" element={<PageTransition><Donate /></PageTransition>} />
        <Route path="/impact" element={<PageTransition><Impact /></PageTransition>} />
        <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
        <Route path="/team" element={<PageTransition><Team /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* Persistent site curve — must live outside route remounts */}
          <SiteBackground />
          <RouteScrollToTop />
          <Suspense fallback={<Loader />}>
            <AnimatedRoutes />
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
