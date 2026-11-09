import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Save,
  RotateCcw,
  Download,
  Upload,
  ExternalLink,
  Search,
  CheckCircle2,
  AlertTriangle,
  Home,
  BookOpen,
  Sprout,
  FileText,
  TrendingUp,
  Mail,
  PanelBottom,
  Sparkles,
  Layers,
  Plus,
  Trash2,
  ChevronRight,
  Eye,
  RefreshCw,
  Sliders,
  Check,
  Building,
  Info,
  Columns2,
  Edit3,
  Monitor,
  Tablet,
  Smartphone,
  Heart,
} from "lucide-react";
import { useWebsiteContent } from "@/context/ContentContext";
import { WebsiteContentState } from "@/lib/contentStore";
import { toast } from "sonner";
import { ROUTES } from "@/lib/routes";
import { referenceLogo } from "@/assets/referenceAssets";

// Sub-navigation tabs
type AdminTab =
  | "overview"
  | "home"
  | "about"
  | "programmes"
  | "stories"
  | "impact"
  | "contact"
  | "donate"
  | "publications"
  | "footer";

export const AdminDashboard: React.FC = () => {
  const {
    content,
    updateSection,
    updateFullContent,
    resetSection,
    resetAll,
    exportJson,
    importJson,
    isModified,
  } = useWebsiteContent();

  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProgrammeId, setSelectedProgrammeId] = useState<string | number>(1);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
  const [selectedJourneyPhaseIndex, setSelectedJourneyPhaseIndex] = useState(0);
  const [isSavedFeedback, setIsSavedFeedback] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importJsonText, setImportJsonText] = useState("");
  const [isSplitView, setIsSplitView] = useState(false);
  const [splitDevice, setSplitDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [iframeKey, setIframeKey] = useState(0);

  // Keyboard shortcut for Cmd/Ctrl + S
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        triggerSaveNotification();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const triggerSaveNotification = useCallback(() => {
    setIsSavedFeedback(true);
    toast.success("Content saved and updated across website in real time!", {
      description: "Edits are immediately visible on live pages.",
    });
    setTimeout(() => setIsSavedFeedback(false), 2000);
  }, []);

  // Export content JSON file
  const handleExport = () => {
    const jsonStr = exportJson();
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `laya_content_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Content backup downloaded successfully!");
  };

  // Import content JSON
  const handleImportSubmit = () => {
    if (!importJsonText.trim()) {
      toast.error("Please paste valid JSON content.");
      return;
    }
    const success = importJson(importJsonText);
    if (success) {
      toast.success("Content restored from backup successfully!");
      setShowImportModal(false);
      setImportJsonText("");
    } else {
      toast.error("Failed to parse JSON. Please check formatting.");
    }
  };

  // Handle section reset
  const handleResetCurrentSection = () => {
    if (activeTab === "overview") return;
    const confirmed = window.confirm(
      `Are you sure you want to reset the "${activeTab.toUpperCase()}" section back to code defaults? Any unsaved edits in this section will be replaced.`
    );
    if (confirmed) {
      resetSection(activeTab as keyof WebsiteContentState);
      toast.info(`Section "${activeTab}" reset to code defaults.`);
    }
  };

  // Handle complete factory reset
  const handleFactoryReset = () => {
    const confirmed = window.confirm(
      "WARNING: Are you sure you want to revert the ENTIRE website back to default factory content? This will reset all edits made across every page."
    );
    if (confirmed) {
      resetAll();
      toast.success("All website content has been reset to factory defaults.");
    }
  };

  // Live page route mapping for the current tab
  const activePageRoute = useMemo(() => {
    switch (activeTab) {
      case "home":
        return ROUTES.home;
      case "about":
        return ROUTES.aboutWhoWeAre;
      case "programmes":
        const prog = content.programmes?.find(
          (p) => String(p.id) === String(selectedProgrammeId) || p.to === String(selectedProgrammeId)
        );
        return prog ? prog.to : ROUTES.programs;
      case "stories":
        return ROUTES.stories;
      case "impact":
        return ROUTES.impact;
      case "contact":
        return ROUTES.contact;
      case "donate":
        return ROUTES.donate;
      case "publications":
        return ROUTES.publications;
      case "footer":
        return ROUTES.home;
      default:
        return ROUTES.home;
    }
  }, [activeTab, content.programmes, selectedProgrammeId]);

  return (
    <>
      <Helmet>
        <title>LAYA CMS Admin Dashboard | Edit Website Content</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-[#F4F1EA] text-[#1E293B] font-sans flex flex-col">
        {/* Top CMS Header */}
        <header className="sticky top-0 z-40 bg-[#1E4D2B] text-white shadow-md border-b border-[#2A653B]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
            {/* Logo and Brand */}
            <div className="flex items-center gap-3">
              <Link to={ROUTES.home} className="flex items-center gap-2 group">
                <img
                  src={referenceLogo}
                  alt="LAYA Logo"
                  className="w-9 h-9 rounded-full bg-white p-0.5 object-cover"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-lg tracking-tight text-white group-hover:text-[#A7D7B5] transition-colors">
                      LAYA CMS
                    </span>
                    <span className="text-[10px] uppercase font-semibold tracking-wider bg-[#2A653B] text-[#A7D7B5] px-2 py-0.5 rounded-full border border-[#3A7B4D]">
                      Admin v2.0
                    </span>
                  </div>
                  <p className="text-xs text-[#A7D7B5] hidden sm:block">
                    Live Content Management &amp; Real-Time Publisher
                  </p>
                </div>
              </Link>
            </div>

            {/* Status indicator */}
            <div className="hidden md:flex items-center gap-2 text-xs bg-[#163D21] px-3 py-1.5 rounded-md border border-[#2A653B]">
              <span
                className={`w-2 h-2 rounded-full ${
                  isModified ? "bg-amber-400 animate-pulse" : "bg-emerald-400"
                }`}
              />
              <span className="text-stone-200">
                {isModified ? "Local Edits Active (Saved in Browser)" : "Synced with Factory Defaults"}
              </span>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsSplitView((v) => !v)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all shadow-sm ${
                  isSplitView
                    ? "bg-[#E8C547] text-[#1E3A20]"
                    : "bg-[#2A653B] hover:bg-[#357F4B] text-white"
                }`}
                title="Toggle side-by-side live website split preview"
              >
                <Columns2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">
                  {isSplitView ? "Close Split View" : "Split Live View"}
                </span>
              </button>

              <Link
                to={`${activePageRoute}?edit=true`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-[#163D21] hover:bg-[#20522D] text-emerald-200 border border-emerald-600/50 transition-all shadow-sm"
                title="Edit this exact page live in visual in-page editor"
              >
                <Edit3 className="w-3.5 h-3.5 text-emerald-300" />
                <span>Edit Website Directly</span>
                <ExternalLink className="w-3 h-3 text-[#A7D7B5]" />
              </Link>

              <Link
                to={activePageRoute}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-[#2A653B] hover:bg-[#357F4B] text-white transition-all shadow-sm"
                title="Preview active section in a new tab"
              >
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Preview Live Page</span>
                <ExternalLink className="w-3 h-3 text-[#A7D7B5]" />
              </Link>

              <button
                type="button"
                onClick={triggerSaveNotification}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-md bg-[#E8C547] text-[#1E3A20] hover:bg-[#F2D566] transition-all shadow-sm"
                title="Save content changes (⌘S)"
              >
                {isSavedFeedback ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleExport}
                className="p-1.5 text-stone-300 hover:text-white hover:bg-[#2A653B] rounded-md transition-colors"
                title="Download JSON Backup"
              >
                <Download className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setShowImportModal(true)}
                className="p-1.5 text-stone-300 hover:text-white hover:bg-[#2A653B] rounded-md transition-colors"
                title="Import JSON Backup"
              >
                <Upload className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Main Workspace */}
        <div
          className={`mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 flex flex-col ${
            isSplitView ? "xl:flex-row max-w-[1800px]" : "md:flex-row max-w-7xl"
          } gap-6`}
        >
          {/* Sidebar Nav */}
          <aside className="w-full md:w-64 shrink-0 flex flex-col gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400 px-3 py-1">
                Content Sections
              </p>
              <nav className="flex flex-col gap-1 mt-1">
                <NavButton
                  active={activeTab === "overview"}
                  onClick={() => setActiveTab("overview")}
                  icon={<Sliders className="w-4 h-4" />}
                  label="Overview & Stats"
                  badge={isModified ? "Edited" : undefined}
                />
                <NavButton
                  active={activeTab === "home"}
                  onClick={() => setActiveTab("home")}
                  icon={<Home className="w-4 h-4" />}
                  label="Home Page"
                />
                <NavButton
                  active={activeTab === "about"}
                  onClick={() => setActiveTab("about")}
                  icon={<Building className="w-4 h-4" />}
                  label="About Us"
                />
                <NavButton
                  active={activeTab === "programmes"}
                  onClick={() => setActiveTab("programmes")}
                  icon={<Sprout className="w-4 h-4" />}
                  label="Programmes (8)"
                />
                <NavButton
                  active={activeTab === "stories"}
                  onClick={() => setActiveTab("stories")}
                  icon={<BookOpen className="w-4 h-4" />}
                  label="Stories & Field Notes"
                />
                <NavButton
                  active={activeTab === "impact"}
                  onClick={() => setActiveTab("impact")}
                  icon={<TrendingUp className="w-4 h-4" />}
                  label="Impact & Metrics"
                />
                <NavButton
                  active={activeTab === "donate"}
                  onClick={() => setActiveTab("donate")}
                  icon={<Heart className="w-4 h-4" />}
                  label="Support & Donate"
                />
                <NavButton
                  active={activeTab === "publications"}
                  onClick={() => setActiveTab("publications")}
                  icon={<FileText className="w-4 h-4" />}
                  label="Resource Centre"
                />
                <NavButton
                  active={activeTab === "contact"}
                  onClick={() => setActiveTab("contact")}
                  icon={<Mail className="w-4 h-4" />}
                  label="Contact & Donate Info"
                />
                <NavButton
                  active={activeTab === "footer"}
                  onClick={() => setActiveTab("footer")}
                  icon={<PanelBottom className="w-4 h-4" />}
                  label="Sitewide & Footer"
                />
              </nav>
            </div>

            {/* Quick Helper / Reset Box */}
            <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-4 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-stone-700">
                <Info className="w-4 h-4 text-emerald-600" />
                <span>Instant Reactivity</span>
              </div>
              <p className="text-xs text-stone-500 leading-relaxed">
                Edits made in any input update the live website immediately. Open{" "}
                <Link
                  to={ROUTES.home}
                  target="_blank"
                  className="text-emerald-700 underline font-medium"
                >
                  the website
                </Link>{" "}
                in another tab to see changes live.
              </p>
              <div className="pt-2 border-t border-stone-100 flex flex-col gap-2">
                {activeTab !== "overview" && (
                  <button
                    type="button"
                    onClick={handleResetCurrentSection}
                    className="w-full text-xs py-2 px-3 rounded-lg border border-stone-200 hover:border-amber-400 text-stone-600 hover:text-amber-800 hover:bg-amber-50 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset {activeTab} section</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleFactoryReset}
                  className="w-full text-xs py-2 px-3 rounded-lg border border-red-200 hover:border-red-400 text-red-600 hover:bg-red-50 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Factory Reset All</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Main Editing Canvas */}
          <main
            className={`bg-white rounded-xl shadow-sm border border-stone-200 p-6 sm:p-8 overflow-hidden ${
              isSplitView ? "w-full xl:w-[48%] shrink-0" : "flex-1"
            }`}
          >
            {activeTab === "overview" && (
              <OverviewPanel
                content={content}
                isModified={isModified}
                onSelectTab={setActiveTab}
                onExport={handleExport}
                onFactoryReset={handleFactoryReset}
              />
            )}

            {activeTab === "home" && (
              <HomeEditor
                home={content.home}
                onChange={(updated) => updateSection("home", updated)}
              />
            )}

            {activeTab === "about" && (
              <AboutEditor
                about={content.about}
                selectedPhase={selectedJourneyPhaseIndex}
                onSelectPhase={setSelectedJourneyPhaseIndex}
                onChange={(updated) => updateSection("about", updated)}
              />
            )}

            {activeTab === "programmes" && (
              <ProgrammesEditor
                programmes={content.programmes || []}
                selectedId={selectedProgrammeId}
                onSelectId={setSelectedProgrammeId}
                onChange={(updatedProgrammes) =>
                  updateSection("programmes", updatedProgrammes)
                }
              />
            )}

            {activeTab === "stories" && (
              <StoriesEditor
                stories={content.stories || []}
                selectedIndex={selectedStoryIndex}
                onSelectIndex={setSelectedStoryIndex}
                onChange={(updatedStories) =>
                  updateSection("stories", updatedStories)
                }
              />
            )}

            {activeTab === "impact" && (
              <ImpactEditor
                impact={content.impact}
                onChange={(updated) => updateSection("impact", updated)}
              />
            )}

            {activeTab === "donate" && (
              <DonateEditor
                donate={content.donate}
                bankDomestic={content.contact.bankDomestic}
                bankForeign={content.contact.bankForeign}
                onChangeDonate={(updated) => updateSection("donate", updated)}
                onChangeBankDomestic={(updated) =>
                  updateSection("contact", { ...content.contact, bankDomestic: updated })
                }
                onChangeBankForeign={(updated) =>
                  updateSection("contact", { ...content.contact, bankForeign: updated })
                }
              />
            )}

            {activeTab === "publications" && (
              <PublicationsEditor
                publications={content.publications}
                onChange={(updated) => updateSection("publications", updated)}
              />
            )}

            {activeTab === "contact" && (
              <ContactEditor
                contact={content.contact}
                onChange={(updated) => updateSection("contact", updated)}
              />
            )}

            {activeTab === "footer" && (
              <FooterEditor
                footer={content.footer}
                contactDetails={content.contact.details}
                onChangeFooter={(updated) => updateSection("footer", updated)}
                onChangeContact={(updated) =>
                  updateSection("contact", {
                    ...content.contact,
                    details: { ...content.contact.details, ...updated },
                  })
                }
              />
            )}
          </main>

          {/* Side-by-Side Live Website Interactive Preview */}
          {isSplitView && (
            <div className="w-full xl:w-[52%] flex flex-col bg-white rounded-xl shadow-lg border border-stone-300 overflow-hidden sticky top-20 h-[calc(100vh-6.5rem)] shrink-0">
              {/* Preview Header / Device Toolbar */}
              <div className="bg-[#1E4D2B] text-white px-4 py-2.5 flex items-center justify-between border-b border-[#2A653B] text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold text-emerald-200 uppercase tracking-wider text-[10px]">
                    Live Split Preview:
                  </span>
                  <span className="font-mono text-stone-200 text-[11px] truncate">
                    {activePageRoute}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-[#163D21] p-0.5 rounded border border-[#2A653B]">
                    <button
                      type="button"
                      onClick={() => setSplitDevice("desktop")}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                        splitDevice === "desktop"
                          ? "bg-[#2A653B] text-white"
                          : "text-stone-300 hover:text-white"
                      }`}
                      title="Desktop view (100% width)"
                    >
                      <Monitor className="w-3 h-3" />
                      <span className="hidden sm:inline">Desktop</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSplitDevice("tablet")}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                        splitDevice === "tablet"
                          ? "bg-[#2A653B] text-white"
                          : "text-stone-300 hover:text-white"
                      }`}
                      title="Tablet view (768px)"
                    >
                      <Tablet className="w-3 h-3" />
                      <span className="hidden sm:inline">Tablet</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSplitDevice("mobile")}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                        splitDevice === "mobile"
                          ? "bg-[#2A653B] text-white"
                          : "text-stone-300 hover:text-white"
                      }`}
                      title="Mobile view (390px)"
                    >
                      <Smartphone className="w-3 h-3" />
                      <span className="hidden sm:inline">Mobile</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIframeKey((k) => k + 1)}
                    className="p-1 hover:bg-[#2A653B] rounded text-stone-300 hover:text-white transition-colors"
                    title="Reload live preview"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>

                  <Link
                    to={activePageRoute}
                    target="_blank"
                    className="p-1 hover:bg-[#2A653B] rounded text-stone-300 hover:text-white transition-colors"
                    title="Open in new window"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Iframe Viewport Frame */}
              <div className="flex-1 bg-stone-100 p-2 overflow-auto flex justify-center items-start">
                <div
                  className={`h-full bg-white transition-all shadow-md rounded-md overflow-hidden ${
                    splitDevice === "mobile"
                      ? "w-[390px]"
                      : splitDevice === "tablet"
                      ? "w-[768px]"
                      : "w-full"
                  }`}
                >
                  <iframe
                    key={iframeKey}
                    src={activePageRoute}
                    className="w-full h-full border-0"
                    title="Live Website Interactive Preview"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Import Content Backup (JSON)
              </h3>
              <button
                type="button"
                onClick={() => setShowImportModal(false)}
                className="text-stone-400 hover:text-stone-600 text-lg leading-none"
              >
                &times;
              </button>
            </div>
            <p className="text-xs text-stone-500">
              Paste the exported JSON content below. All valid fields will replace
              current website text and persist immediately.
            </p>
            <textarea
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              placeholder="Paste JSON content here..."
              rows={8}
              className="w-full text-xs font-mono p-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setShowImportModal(false)}
                className="px-4 py-2 text-xs font-medium text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleImportSubmit}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors"
              >
                Restore Content
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

/* -------------------------------------------------------------------------
   SUB-COMPONENTS & EDITORS
------------------------------------------------------------------------- */

const NavButton = ({
  active,
  onClick,
  icon,
  label,
  badge,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  badge?: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
      active
        ? "bg-[#1E4D2B] text-white shadow-sm"
        : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
    }`}
  >
    <div className="flex items-center gap-2.5">
      <span className={active ? "text-[#E8C547]" : "text-stone-400"}>{icon}</span>
      <span>{label}</span>
    </div>
    {badge && (
      <span
        className={`text-[10px] px-1.5 py-0.5 rounded ${
          active ? "bg-[#2A653B] text-white" : "bg-amber-100 text-amber-800"
        }`}
      >
        {badge}
      </span>
    )}
  </button>
);

/* -------------------------------------------------------------------------
   1. OVERVIEW PANEL
------------------------------------------------------------------------- */
const OverviewPanel = ({
  content,
  isModified,
  onSelectTab,
  onExport,
  onFactoryReset,
}: {
  content: WebsiteContentState;
  isModified: boolean;
  onSelectTab: (tab: AdminTab) => void;
  onExport: () => void;
  onFactoryReset: () => void;
}) => {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-serif font-bold text-stone-900">
          Website Content Management Hub
        </h2>
        <p className="text-sm text-stone-500 mt-1">
          Welcome to the LAYA Resource Center live editor. You can modify any
          written text, headings, statistics, mission statements, and programme
          descriptions. All changes update instantly on the live site.
        </p>
      </div>

      {/* Direct In-Page Visual Editor Callout Banner */}
      <div className="bg-gradient-to-r from-[#1E4D2B] via-[#245D35] to-[#1E4D2B] text-white p-5 rounded-xl shadow-md border border-emerald-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-emerald-800/80 flex items-center justify-center flex-shrink-0 border border-emerald-500/40 text-[#E8C547]">
            <Edit3 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded border border-emerald-600/50">
                New Feature
              </span>
              <h3 className="font-serif font-bold text-base text-white">
                Edit the Exact Website Directly (In-Page Mode)
              </h3>
            </div>
            <p className="text-xs text-emerald-100/90 mt-1 leading-relaxed max-w-xl">
              Prefer to edit visually on the live pages? Launch our In-Page Visual Editor to browse the website naturally and modify headlines, statistics, and text right where they appear.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            to="/?edit=true"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#E8C547] hover:bg-[#F2D566] text-[#1E3A20] font-bold text-xs rounded-lg transition-all shadow-md transform hover:-translate-y-0.5"
          >
            <span>Launch In-Page Visual Editor</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Quick Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#FAF8F5] border border-stone-200 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
              Live State
            </span>
            <div className="flex items-center gap-2 mt-2">
              <span
                className={`w-3 h-3 rounded-full ${
                  isModified ? "bg-amber-500" : "bg-emerald-500"
                }`}
              />
              <span className="font-serif font-bold text-lg text-stone-800">
                {isModified ? "Custom Edits Saved" : "Factory Defaults"}
              </span>
            </div>
          </div>
          <p className="text-xs text-stone-500 mt-3">
            Stored in browser localStorage and reactive across tabs.
          </p>
        </div>

        <div className="bg-[#FAF8F5] border border-stone-200 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
              Programmes
            </span>
            <p className="font-serif font-bold text-2xl text-stone-800 mt-1">
              {content.programmes?.length || 8} Initiatives
            </p>
          </div>
          <button
            type="button"
            onClick={() => onSelectTab("programmes")}
            className="text-xs text-emerald-700 font-semibold hover:underline mt-3 flex items-center gap-1"
          >
            Edit programmes <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="bg-[#FAF8F5] border border-stone-200 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
              Field Notes / Stories
            </span>
            <p className="font-serif font-bold text-2xl text-stone-800 mt-1">
              {content.stories?.length || 3} Stories
            </p>
          </div>
          <button
            type="button"
            onClick={() => onSelectTab("stories")}
            className="text-xs text-emerald-700 font-semibold hover:underline mt-3 flex items-center gap-1"
          >
            Edit stories <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Quick Jump Buttons */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-stone-600">
          Jump to Section
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { id: "home", label: "Homepage Hero & Stats", icon: Home },
            { id: "about", label: "History & Leadership", icon: Building },
            { id: "programmes", label: "8 Core Programmes", icon: Sprout },
            { id: "stories", label: "Field Notes & Voices", icon: BookOpen },
            { id: "impact", label: "Impact Metrics", icon: TrendingUp },
            { id: "contact", label: "Offices & Bank Info", icon: Mail },
            { id: "footer", label: "Footer & Legal", icon: PanelBottom },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTab(item.id as AdminTab)}
              className="p-4 bg-white border border-stone-200 hover:border-emerald-600 hover:shadow-sm rounded-xl text-left flex flex-col gap-2 transition-all group"
            >
              <item.icon className="w-5 h-5 text-emerald-700 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-stone-800">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Live Site Test Matrix */}
      <div className="bg-[#F8FAF8] border border-emerald-200/60 rounded-xl p-5">
        <h3 className="font-serif font-bold text-emerald-900 text-base">
          Live Website Verification Shortcuts
        </h3>
        <p className="text-xs text-emerald-700 mt-0.5">
          Click any link below to open the public site and test your edits live:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-4 text-xs">
          <Link
            to={ROUTES.home}
            target="_blank"
            className="p-2.5 bg-white rounded-lg border border-emerald-100 hover:border-emerald-400 text-emerald-900 flex items-center justify-between"
          >
            <span>Homepage (/)</span>
            <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
          </Link>
          <Link
            to={ROUTES.aboutWhoWeAre}
            target="_blank"
            className="p-2.5 bg-white rounded-lg border border-emerald-100 hover:border-emerald-400 text-emerald-900 flex items-center justify-between"
          >
            <span>About / Our Journey</span>
            <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
          </Link>
          <Link
            to={ROUTES.programs}
            target="_blank"
            className="p-2.5 bg-white rounded-lg border border-emerald-100 hover:border-emerald-400 text-emerald-900 flex items-center justify-between"
          >
            <span>Programmes Directory</span>
            <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
          </Link>
          <Link
            to={ROUTES.whatWeDoHbhc}
            target="_blank"
            className="p-2.5 bg-white rounded-lg border border-emerald-100 hover:border-emerald-400 text-emerald-900 flex items-center justify-between"
          >
            <span>Herbal Health (HBHC)</span>
            <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
          </Link>
          <Link
            to={ROUTES.stories}
            target="_blank"
            className="p-2.5 bg-white rounded-lg border border-emerald-100 hover:border-emerald-400 text-emerald-900 flex items-center justify-between"
          >
            <span>Stories &amp; Notes</span>
            <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
          </Link>
          <Link
            to={ROUTES.contact}
            target="_blank"
            className="p-2.5 bg-white rounded-lg border border-emerald-100 hover:border-emerald-400 text-emerald-900 flex items-center justify-between"
          >
            <span>Contact &amp; Offices</span>
            <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
          </Link>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------
   2. HOMEPAGE EDITOR
------------------------------------------------------------------------- */
const HomeEditor = ({
  home,
  onChange,
}: {
  home: WebsiteContentState["home"];
  onChange: (updated: WebsiteContentState["home"]) => void;
}) => {
  const updateHero = (field: string, value: any) => {
    const updatedHero: any = {
      ...home.hero,
      [field]: value,
    };
    if (field === "headline" && updatedHero.slides?.[0]) {
      updatedHero.slides = [...updatedHero.slides];
      updatedHero.slides[0] = { ...updatedHero.slides[0], headline: value };
    }
    if (field === "eyebrow" && updatedHero.slides?.[0]) {
      updatedHero.slides = [...updatedHero.slides];
      updatedHero.slides[0] = { ...updatedHero.slides[0], eyebrow: value };
    }
    onChange({
      ...home,
      hero: updatedHero,
    });
  };

  const updateSlide = (index: number, field: string, value: string) => {
    const updatedSlides = [...home.hero.slides];
    updatedSlides[index] = {
      ...updatedSlides[index],
      [field]: value,
    };
    const updatedHero: any = {
      ...home.hero,
      slides: updatedSlides,
    };
    if (index === 0) {
      if (field === "headline") updatedHero.headline = value;
      if (field === "eyebrow") updatedHero.eyebrow = value;
    }
    onChange({
      ...home,
      hero: updatedHero,
    });
  };

  const handleAddSlide = () => {
    const nextIdx = (home.hero.slides?.length || 0) + 1;
    const newSlide = {
      eyebrow: "Resource Centre for Adivasis · Est. 1985",
      headline: `Field Initiative #${nextIdx}`,
      supporting:
        "Accompanying Adivasi communities across the Eastern Ghats in sustainable development.",
      location: "Eastern Ghats",
      image: {
        src: referenceLogo,
        alt: "LAYA Field Initiative",
        caption: "Community accompaniment, Eastern Ghats",
      },
      primaryCta: { label: "What We Do", to: ROUTES.programs },
      secondaryCta: { label: "Our Story", to: ROUTES.about },
    };
    const updated = [...(home.hero.slides || []), newSlide];
    updateHero("slides", updated);
    toast.success(`Added Slide #${nextIdx}`);
  };

  const handleDeleteSlide = (idx: number) => {
    if ((home.hero.slides?.length || 0) <= 1) {
      toast.error("At least one slide is required.");
      return;
    }
    const updated = home.hero.slides.filter((_, i) => i !== idx);
    updateHero("slides", updated);
    toast.success("Hero slide deleted.");
  };

  const updateFigure = (index: number, field: string, value: string) => {
    const updatedFigures = [...home.hero.figures];
    updatedFigures[index] = {
      ...updatedFigures[index],
      [field]: value,
    };
    updateHero("figures", updatedFigures);
  };

  const handleAddFigure = () => {
    const newFig = { value: "100+", label: "New Figure Metric" };
    const updated = [...(home.hero.figures || []), newFig];
    updateHero("figures", updated);
    toast.success("Added new figure metric.");
  };

  const handleDeleteFigure = (idx: number) => {
    const updated = (home.hero.figures || []).filter((_, i) => i !== idx);
    updateHero("figures", updated);
    toast.success("Figure metric deleted.");
  };

  const handleAddParagraph = () => {
    const updated = [
      ...(home.fourDecades.paragraphs || []),
      "New narrative paragraph describing LAYA's continuous engagement with indigenous communities.",
    ];
    onChange({
      ...home,
      fourDecades: { ...home.fourDecades, paragraphs: updated },
    });
    toast.success("Added paragraph.");
  };

  const handleDeleteParagraph = (idx: number) => {
    const updated = (home.fourDecades.paragraphs || []).filter((_, i) => i !== idx);
    onChange({
      ...home,
      fourDecades: { ...home.fourDecades, paragraphs: updated },
    });
    toast.success("Paragraph removed.");
  };

  const handleAddPrinciple = () => {
    const updated = [
      ...(home.fourDecades.principles || []),
      {
        title: "Holistic accompaniment",
        description: "Partnering for enduring autonomy and cultural dignity.",
      },
    ];
    onChange({
      ...home,
      fourDecades: { ...home.fourDecades, principles: updated },
    });
    toast.success("Added operating principle.");
  };

  const handleDeletePrinciple = (idx: number) => {
    const updated = (home.fourDecades.principles || []).filter((_, i) => i !== idx);
    onChange({
      ...home,
      fourDecades: { ...home.fourDecades, principles: updated },
    });
    toast.success("Operating principle removed.");
  };

  const handleAddStat = () => {
    const updated = [
      ...(home.fourDecades.stats || []),
      { number: "25+", label: "Habitations", desc: "Active community engagement" },
    ];
    onChange({
      ...home,
      fourDecades: { ...home.fourDecades, stats: updated },
    });
    toast.success("Added pillar stat.");
  };

  const handleDeleteStat = (idx: number) => {
    const updated = (home.fourDecades.stats || []).filter((_, i) => i !== idx);
    onChange({
      ...home,
      fourDecades: { ...home.fourDecades, stats: updated },
    });
    toast.success("Pillar stat removed.");
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-xl font-serif font-bold text-stone-900">
          Homepage Content Editor
        </h2>
        <p className="text-xs text-stone-500 mt-1">
          Edit the hero headlines, carousel narratives, key metrics, and documentary sections.
          Add or delete slides, metrics, paragraphs, and operating principles seamlessly.
        </p>
      </div>

      {/* Hero Section */}
      <div className="bg-[#FAF8F5] border border-stone-200 rounded-xl p-5 flex flex-col gap-4">
        <h3 className="font-serif font-bold text-stone-900 text-base">
          1. Hero Header &amp; Top Eyebrow
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field
            label="Hero Eyebrow"
            value={home.hero.eyebrow}
            onChange={(val) => updateHero("eyebrow", val)}
          />
          <Field
            label="Primary CTA Button Label"
            value={home.hero.primaryCta?.label || ""}
            onChange={(val) =>
              updateHero("primaryCta", {
                ...home.hero.primaryCta,
                label: val,
              })
            }
          />
        </div>

        <Field
          label="Hero Main Headline"
          value={home.hero.headline}
          onChange={(val) => updateHero("headline", val)}
        />

        <TextAreaField
          label="Hero Supporting Text"
          value={home.hero.supporting}
          onChange={(val) => updateHero("supporting", val)}
          rows={3}
        />

        {/* Hero Figures / Key stats */}
        <div className="pt-3 border-t border-stone-200">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Optional Hero Figures ({home.hero.figures?.length || 0} Key Metrics)
              </p>
              <p className="text-[11px] text-stone-400">
                On the live reference website, reach figures are clean / not shown in the hero header. You may optionally add custom counters below.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddFigure}
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded border border-emerald-200 transition-colors shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Figure</span>
            </button>
          </div>
          {(!home.hero.figures || home.hero.figures.length === 0) && (
            <p className="text-xs text-stone-400 italic py-1">
              No figures currently enabled under hero buttons (matching the live reference site). Click "+ Add Figure" to add a custom metric.
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {home.hero.figures?.map((fig, idx) => (
              <div
                key={idx}
                className="bg-white p-3 rounded-lg border border-stone-200 flex flex-col gap-2 relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-stone-400">Figure #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => handleDeleteFigure(idx)}
                    className="p-1 text-stone-400 hover:text-red-600 transition-colors"
                    title="Delete figure"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <Field
                  label="Number / Metric"
                  value={fig.value}
                  onChange={(val) => updateFigure(idx, "value", val)}
                />
                <Field
                  label="Label"
                  value={fig.label}
                  onChange={(val) => updateFigure(idx, "label", val)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Carousel Slides Editor */}
      <div className="bg-[#FAF8F5] border border-stone-200 rounded-xl p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-stone-900 text-base">
              2. Hero Carousel Slides ({home.hero.slides?.length || 0} Active Slides)
            </h3>
            <p className="text-xs text-stone-500">
              Each slide appears in the rotating homepage banner with its location tag and narrative.
              If only 1 slide exists, the website gracefully renders it as an intentional static hero banner.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddSlide}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-colors shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Slide</span>
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {home.hero.slides?.map((slide, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-xl border border-stone-200 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Slide #{idx + 1}
                  </span>
                  <span className="text-xs text-stone-400">
                    Location: {slide.location || "Eastern Ghats"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteSlide(idx)}
                  disabled={(home.hero.slides?.length || 0) <= 1}
                  className={`p-1.5 rounded transition-colors flex items-center gap-1 text-xs ${
                    (home.hero.slides?.length || 0) <= 1
                      ? "text-stone-300 cursor-not-allowed"
                      : "text-stone-400 hover:text-red-600 hover:bg-red-50"
                  }`}
                  title={
                    (home.hero.slides?.length || 0) <= 1
                      ? "At least one hero slide is required"
                      : "Delete slide"
                  }
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Delete</span>
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field
                  label="Slide Eyebrow"
                  value={slide.eyebrow}
                  onChange={(val) => updateSlide(idx, "eyebrow", val)}
                />
                <Field
                  label="Slide Location Tag"
                  value={slide.location || ""}
                  onChange={(val) => updateSlide(idx, "location", val)}
                />
              </div>
              <Field
                label="Slide Headline"
                value={slide.headline}
                onChange={(val) => updateSlide(idx, "headline", val)}
              />
              <TextAreaField
                label="Slide Supporting Narrative"
                value={slide.supporting}
                onChange={(val) => updateSlide(idx, "supporting", val)}
                rows={2}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Four Decades Section */}
      <div className="bg-[#FAF8F5] border border-stone-200 rounded-xl p-5 flex flex-col gap-4">
        <h3 className="font-serif font-bold text-stone-900 text-base">
          3. Four Decades of Engagement Section
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field
            label="Section Eyebrow"
            value={home.fourDecades.eyebrow}
            onChange={(val) =>
              onChange({
                ...home,
                fourDecades: { ...home.fourDecades, eyebrow: val },
              })
            }
          />
          <Field
            label="Section Title"
            value={home.fourDecades.title}
            onChange={(val) =>
              onChange({
                ...home,
                fourDecades: { ...home.fourDecades, title: val },
              })
            }
          />
        </div>

        <TextAreaField
          label="Lead Narrative"
          value={home.fourDecades.lead}
          onChange={(val) =>
            onChange({
              ...home,
              fourDecades: { ...home.fourDecades, lead: val },
            })
          }
          rows={2}
        />

        {/* Narrative Paragraphs */}
        <div className="pt-2 border-t border-stone-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Narrative Paragraphs ({home.fourDecades.paragraphs?.length || 0})
            </p>
            <button
              type="button"
              onClick={handleAddParagraph}
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded border border-emerald-200 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Paragraph</span>
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {home.fourDecades.paragraphs?.map((p, idx) => (
              <div key={idx} className="flex gap-2 items-start bg-white p-3 rounded-lg border border-stone-200">
                <div className="flex-1">
                  <TextAreaField
                    label={`Paragraph #${idx + 1}`}
                    value={p}
                    onChange={(val) => {
                      const updated = [...home.fourDecades.paragraphs];
                      updated[idx] = val;
                      onChange({
                        ...home,
                        fourDecades: { ...home.fourDecades, paragraphs: updated },
                      });
                    }}
                    rows={2}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteParagraph(idx)}
                  className="p-2 text-stone-400 hover:text-red-600 transition-colors mt-6"
                  title="Delete paragraph"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Operating Principles */}
        <div className="pt-2 border-t border-stone-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Operating Principles ({home.fourDecades.principles?.length || 0} Principles)
            </p>
            <button
              type="button"
              onClick={handleAddPrinciple}
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded border border-emerald-200 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Principle</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {home.fourDecades.principles?.map((principle, idx) => (
              <div
                key={idx}
                className="bg-white p-3 rounded-lg border border-stone-200 flex flex-col gap-2 relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-stone-400">Principle #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => handleDeletePrinciple(idx)}
                    className="p-1 text-stone-400 hover:text-red-600 transition-colors"
                    title="Delete principle"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <Field
                  label="Title"
                  value={principle.title}
                  onChange={(val) => {
                    const updated = [...home.fourDecades.principles];
                    updated[idx] = { ...updated[idx], title: val };
                    onChange({
                      ...home,
                      fourDecades: { ...home.fourDecades, principles: updated },
                    });
                  }}
                />
                <TextAreaField
                  label="Description"
                  value={principle.description}
                  onChange={(val) => {
                    const updated = [...home.fourDecades.principles];
                    updated[idx] = { ...updated[idx], description: val };
                    onChange({
                      ...home,
                      fourDecades: { ...home.fourDecades, principles: updated },
                    });
                  }}
                  rows={2}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 3 Decades Stats */}
        <div className="pt-2 border-t border-stone-200">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Decades Impact Stats ({home.fourDecades.stats?.length || 0} Pillars)
            </p>
            <button
              type="button"
              onClick={handleAddStat}
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded border border-emerald-200 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Stat</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {home.fourDecades.stats?.map((st, idx) => (
              <div
                key={idx}
                className="bg-white p-3 rounded-lg border border-stone-200 flex flex-col gap-2 relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-stone-400">Pillar #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => handleDeleteStat(idx)}
                    className="p-1 text-stone-400 hover:text-red-600 transition-colors"
                    title="Delete stat"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <Field
                  label="Stat Number"
                  value={st.number}
                  onChange={(val) => {
                    const stats = [...home.fourDecades.stats];
                    stats[idx] = { ...stats[idx], number: val };
                    onChange({
                      ...home,
                      fourDecades: { ...home.fourDecades, stats },
                    });
                  }}
                />
                <Field
                  label="Label"
                  value={st.label}
                  onChange={(val) => {
                    const stats = [...home.fourDecades.stats];
                    stats[idx] = { ...stats[idx], label: val };
                    onChange({
                      ...home,
                      fourDecades: { ...home.fourDecades, stats },
                    });
                  }}
                />
                <Field
                  label="Description"
                  value={st.desc}
                  onChange={(val) => {
                    const stats = [...home.fourDecades.stats];
                    stats[idx] = { ...stats[idx], desc: val };
                    onChange({
                      ...home,
                      fourDecades: { ...home.fourDecades, stats },
                    });
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Intros for Our Work, Stories, Impact */}
      <div className="bg-[#FAF8F5] border border-stone-200 rounded-xl p-5 flex flex-col gap-4">
        <h3 className="font-serif font-bold text-stone-900 text-base">
          4. Homepage Section Intros
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl border border-stone-200 flex flex-col gap-2">
            <h4 className="text-xs font-bold text-emerald-800 uppercase">
              Our Work Section Intro
            </h4>
            <Field
              label="Title"
              value={home.ourWork.title}
              onChange={(val) =>
                onChange({
                  ...home,
                  ourWork: { ...home.ourWork, title: val },
                })
              }
            />
            <TextAreaField
              label="Lead text"
              value={home.ourWork.lead}
              onChange={(val) =>
                onChange({
                  ...home,
                  ourWork: { ...home.ourWork, lead: val },
                })
              }
              rows={2}
            />
          </div>

          <div className="bg-white p-4 rounded-xl border border-stone-200 flex flex-col gap-2">
            <h4 className="text-xs font-bold text-emerald-800 uppercase">
              Stories / Field Notes Intro
            </h4>
            <Field
              label="Title"
              value={home.stories.title}
              onChange={(val) =>
                onChange({
                  ...home,
                  stories: { ...home.stories, title: val },
                })
              }
            />
            <TextAreaField
              label="Lead text"
              value={home.stories.lead}
              onChange={(val) =>
                onChange({
                  ...home,
                  stories: { ...home.stories, lead: val },
                })
              }
              rows={2}
            />
          </div>
        </div>
      </div>

      {/* 5. Voices & Community Reflections Strip */}
      <div className="bg-[#FAF8F5] border border-stone-200 rounded-xl p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-stone-900 text-base">
              5. Reflections / Voices from the Field ({home.voices?.items?.length || 0} Quotes)
            </h3>
            <p className="text-xs text-stone-500">
              Quotes displayed in the reflection marquee on the homepage.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              const newQuote = {
                quote: "New community voice reflection on dignity and autonomy.",
                who: "Community Leader",
                role: "Village Elder",
                location: "Eastern Ghats",
              };
              const items = [...(home.voices?.items || []), newQuote];
              onChange({ ...home, voices: { ...home.voices, items } });
              toast.success("Added voice quote.");
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Quote</span>
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {home.voices?.items?.map((item, idx) => (
            <div key={idx} className="bg-white p-3.5 rounded-xl border border-stone-200 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800">Quote #{idx + 1}</span>
                <button
                  type="button"
                  onClick={() => {
                    const items = (home.voices?.items || []).filter((_, i) => i !== idx);
                    onChange({ ...home, voices: { ...home.voices, items } });
                    toast.success("Quote removed.");
                  }}
                  className="p-1 text-stone-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <TextAreaField
                label="Quote Text"
                value={item.quote}
                onChange={(val) => {
                  const items = [...(home.voices?.items || [])];
                  items[idx] = { ...items[idx], quote: val };
                  onChange({ ...home, voices: { ...home.voices, items } });
                }}
                rows={2}
              />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <Field
                  label="Author / Speaker"
                  value={item.who}
                  onChange={(val) => {
                    const items = [...(home.voices?.items || [])];
                    items[idx] = { ...items[idx], who: val };
                    onChange({ ...home, voices: { ...home.voices, items } });
                  }}
                />
                <Field
                  label="Role / Organisation"
                  value={item.role || ""}
                  onChange={(val) => {
                    const items = [...(home.voices?.items || [])];
                    items[idx] = { ...items[idx], role: val };
                    onChange({ ...home, voices: { ...home.voices, items } });
                  }}
                />
                <Field
                  label="Location / Country"
                  value={item.location || ""}
                  onChange={(val) => {
                    const items = [...(home.voices?.items || [])];
                    items[idx] = { ...items[idx], location: val };
                    onChange({ ...home, voices: { ...home.voices, items } });
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. The LAYA Chronicle & Audited Impact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-[#FAF8F5] border border-stone-200 rounded-xl p-5 flex flex-col gap-3">
          <h3 className="font-serif font-bold text-stone-900 text-base">
            6. The LAYA Chronicle
          </h3>
          <Field
            label="Section Title"
            value={home.chronicle?.title || ""}
            onChange={(val) =>
              onChange({
                ...home,
                chronicle: { ...home.chronicle, title: val },
              })
            }
          />
          <TextAreaField
            label="Lead Narrative"
            value={home.chronicle?.lead || ""}
            onChange={(val) =>
              onChange({
                ...home,
                chronicle: { ...home.chronicle, lead: val },
              })
            }
            rows={2}
          />
          <Field
            label="CTA Button Label"
            value={home.chronicle?.linkText || "Explore Resource Centre"}
            onChange={(val) =>
              onChange({
                ...home,
                chronicle: { ...home.chronicle, linkText: val },
              })
            }
          />
        </div>

        <div className="bg-[#FAF8F5] border border-stone-200 rounded-xl p-5 flex flex-col gap-3">
          <h3 className="font-serif font-bold text-stone-900 text-base">
            7. Audited Impact on Homepage
          </h3>
          <Field
            label="Section Title"
            value={home.impact?.title || ""}
            onChange={(val) =>
              onChange({
                ...home,
                impact: { ...home.impact, title: val },
              })
            }
          />
          <TextAreaField
            label="Lead Narrative"
            value={home.impact?.lead || ""}
            onChange={(val) =>
              onChange({
                ...home,
                impact: { ...home.impact, lead: val },
              })
            }
            rows={2}
          />
          <Field
            label="CTA Button Label"
            value={home.impact?.linkText || "View Audited Indicators"}
            onChange={(val) =>
              onChange({
                ...home,
                impact: { ...home.impact, linkText: val },
              })
            }
          />
        </div>
      </div>

      {/* 8. Support LAYA / Donation Section */}
      <div className="bg-[#FAF8F5] border border-stone-200 rounded-xl p-5 flex flex-col gap-4">
        <h3 className="font-serif font-bold text-stone-900 text-base">
          8. Support LAYA Section on Homepage
        </h3>
        <Field
          label="Heading"
          value={home.support?.title || "Support LAYA"}
          onChange={(val) =>
            onChange({
              ...home,
              support: {
                ...(home.support || {
                  body: "",
                  primaryCta: { label: "Ways to Give", to: ROUTES.donate },
                  secondaryCta: { label: "Contact Us", to: ROUTES.contact },
                  assurances: [],
                }),
                title: val,
              },
            })
          }
        />
        <TextAreaField
          label="Narrative Body"
          value={home.support?.body || ""}
          onChange={(val) =>
            onChange({
              ...home,
              support: {
                ...(home.support || {
                  title: "Support LAYA",
                  primaryCta: { label: "Ways to Give", to: ROUTES.donate },
                  secondaryCta: { label: "Contact Us", to: ROUTES.contact },
                  assurances: [],
                }),
                body: val,
              },
            })
          }
          rows={3}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field
            label="Primary Button Label"
            value={home.support?.primaryCta?.label || "Ways to Give"}
            onChange={(val) =>
              onChange({
                ...home,
                support: {
                  ...(home.support || {
                    title: "Support LAYA",
                    body: "",
                    primaryCta: { label: "Ways to Give", to: ROUTES.donate },
                    secondaryCta: { label: "Contact Us", to: ROUTES.contact },
                    assurances: [],
                  }),
                  primaryCta: {
                    ...(home.support?.primaryCta || { to: ROUTES.donate }),
                    label: val,
                  },
                },
              })
            }
          />
          <Field
            label="Secondary Button Label"
            value={home.support?.secondaryCta?.label || "Contact Us"}
            onChange={(val) =>
              onChange({
                ...home,
                support: {
                  ...(home.support || {
                    title: "Support LAYA",
                    body: "",
                    primaryCta: { label: "Ways to Give", to: ROUTES.donate },
                    secondaryCta: { label: "Contact Us", to: ROUTES.contact },
                    assurances: [],
                  }),
                  secondaryCta: {
                    ...(home.support?.secondaryCta || { to: ROUTES.contact }),
                    label: val,
                  },
                },
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------
   3. ABOUT US EDITOR
------------------------------------------------------------------------- */
const AboutEditor = ({
  about,
  selectedPhase,
  onSelectPhase,
  onChange,
}: {
  about: WebsiteContentState["about"];
  selectedPhase: number;
  onSelectPhase: (idx: number) => void;
  onChange: (updated: WebsiteContentState["about"]) => void;
}) => {
  const [subTab, setSubTab] = useState<
    "who" | "director" | "phases" | "governance" | "fcra" | "way" | "where"
  >("who");

  const updateWho = (field: string, val: string) => {
    onChange({
      ...about,
      whoWeAre: { ...about.whoWeAre, [field]: val },
    });
  };

  const updateDirector = (field: string, val: any) => {
    onChange({
      ...about,
      executiveDirectorMessage: {
        ...about.executiveDirectorMessage,
        [field]: val,
      },
    });
  };

  const updateCurrentPhase = (field: string, val: any) => {
    const phases = [...about.journeyPhases];
    phases[selectedPhase] = {
      ...phases[selectedPhase],
      [field]: val,
    };
    onChange({ ...about, journeyPhases: phases });
  };

  const handleAddPhase = () => {
    const nextNum = (about.journeyPhases?.length || 0) + 1;
    const newPhase = {
      phase: String(nextNum),
      years: "2025–Present",
      title: "New Strategic Phase",
      theme: "Community Empowerment & Field Innovation",
      description:
        "Deepening community accompaniment, decentralised indigenous governance, and climate adaptation initiatives across the Eastern Ghats.",
      highlights: [
        "Expansion of community health and agro-forestry networks",
        "Youth fellowship and indigenous self-reliance programmes",
      ],
    };
    const updated = [...(about.journeyPhases || []), newPhase];
    onChange({ ...about, journeyPhases: updated });
    onSelectPhase(updated.length - 1);
    toast.success(`Added Phase ${nextNum}`);
  };

  const handleDeletePhase = (idx: number) => {
    if ((about.journeyPhases?.length || 0) <= 1) {
      toast.error("At least one historical journey phase is required.");
      return;
    }
    const updated = about.journeyPhases.filter((_, i) => i !== idx);
    onChange({ ...about, journeyPhases: updated });
    if (selectedPhase >= updated.length) {
      onSelectPhase(Math.max(0, updated.length - 1));
    }
    toast.success("Journey phase deleted.");
  };

  const handleAddMember = () => {
    const newMember = {
      name: "New Board Member",
      role: "Member",
      bio: "Development Specialist & Grassroots Practitioner",
    };
    const updated = [...(about.governance.members || []), newMember];
    onChange({
      ...about,
      governance: { ...about.governance, members: updated },
    });
    toast.success("Added new board member.");
  };

  const handleDeleteMember = (idx: number) => {
    if ((about.governance.members?.length || 0) <= 1) {
      toast.error("At least one board member is required.");
      return;
    }
    const updated = about.governance.members.filter((_, i) => i !== idx);
    onChange({
      ...about,
      governance: { ...about.governance, members: updated },
    });
    toast.success("Board member deleted.");
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-serif font-bold text-stone-900">
          About Us Content Editor
        </h2>
        <p className="text-xs text-stone-500 mt-1">
          Edit organizational identity, Executive Director message, the {about.journeyPhases?.length || 7}
          historical journey phases, and governance disclosures.
        </p>
      </div>

      {/* Sub tabs */}
      <div className="flex border-b border-stone-200 gap-2 overflow-x-auto">
        {[
          { id: "who", label: "Who We Are & Vision" },
          { id: "way", label: "Way We Work" },
          { id: "where", label: "Where We Work" },
          { id: "director", label: "Executive Director's Message" },
          { id: "phases", label: `${about.journeyPhases?.length || 7} Historical Journey Phases` },
          { id: "governance", label: "Governance & Board" },
          { id: "fcra", label: "FCRA Information" },
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setSubTab(t.id as any)}
            className={`pb-2.5 px-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
              subTab === t.id
                ? "border-emerald-700 text-emerald-800"
                : "border-transparent text-stone-500 hover:text-stone-800"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* 1. Who We Are */}
      {subTab === "who" && (
        <div className="flex flex-col gap-4">
          <div className="bg-[#FAF8F5] border border-stone-200 rounded-xl p-5 flex flex-col gap-3">
            <h3 className="font-serif font-bold text-stone-900 text-sm">
              Who We Are — Core Identity
            </h3>
            <Field
              label="Page Eyebrow"
              value={about.whoWeAre.eyebrow}
              onChange={(val) => updateWho("eyebrow", val)}
            />
            <Field
              label="Page Title"
              value={about.whoWeAre.title}
              onChange={(val) => updateWho("title", val)}
            />
            <TextAreaField
              label="Main Description / Lead"
              value={about.whoWeAre.description}
              onChange={(val) => updateWho("description", val)}
              rows={4}
            />
          </div>

          <div className="bg-[#FAF8F5] border border-stone-200 rounded-xl p-5 flex flex-col gap-3">
            <h3 className="font-serif font-bold text-stone-900 text-sm">
              Future Vision &amp; Trajectory
            </h3>
            <Field
              label="Vision Eyebrow"
              value={about.futureVision?.eyebrow || ""}
              onChange={(val) =>
                onChange({
                  ...about,
                  futureVision: { ...about.futureVision, eyebrow: val },
                })
              }
            />
            <Field
              label="Vision Title"
              value={about.futureVision?.title || ""}
              onChange={(val) =>
                onChange({
                  ...about,
                  futureVision: { ...about.futureVision, title: val },
                })
              }
            />
            <TextAreaField
              label="Vision Lead Paragraph"
              value={about.futureVision?.lead || ""}
              onChange={(val) =>
                onChange({
                  ...about,
                  futureVision: { ...about.futureVision, lead: val },
                })
              }
              rows={3}
            />
          </div>
        </div>
      )}

      {/* 1b. Way We Work */}
      {subTab === "way" && (
        <div className="bg-[#FAF8F5] border border-stone-200 rounded-xl p-5 flex flex-col gap-3">
          <h3 className="font-serif font-bold text-stone-900 text-sm">
            The Way We Work — Community Methodologies
          </h3>
          <Field
            label="Page Title"
            value={about.wayWeWork?.title || "The Way We Work"}
            onChange={(val) =>
              onChange({
                ...about,
                wayWeWork: {
                  ...(about.wayWeWork || {}),
                  title: val,
                },
              })
            }
          />
          <Field
            label="Subtitle"
            value={about.wayWeWork?.subtitle || ""}
            onChange={(val) =>
              onChange({
                ...about,
                wayWeWork: {
                  ...(about.wayWeWork || {}),
                  subtitle: val,
                },
              })
            }
          />
          <TextAreaField
            label="Main Description / Narrative"
            value={about.wayWeWork?.description || ""}
            onChange={(val) =>
              onChange({
                ...about,
                wayWeWork: {
                  ...(about.wayWeWork || {}),
                  description: val,
                },
              })
            }
            rows={4}
          />
        </div>
      )}

      {/* 1c. Where We Work */}
      {subTab === "where" && (
        <div className="bg-[#FAF8F5] border border-stone-200 rounded-xl p-5 flex flex-col gap-3">
          <h3 className="font-serif font-bold text-stone-900 text-sm">
            Where We Work — Geographic Coverage &amp; Landscape
          </h3>
          <Field
            label="Page Title"
            value={about.whereWeWork?.title || "Where We Work"}
            onChange={(val) =>
              onChange({
                ...about,
                whereWeWork: {
                  ...(about.whereWeWork || {}),
                  title: val,
                },
              })
            }
          />
          <Field
            label="Subtitle"
            value={about.whereWeWork?.subtitle || ""}
            onChange={(val) =>
              onChange({
                ...about,
                whereWeWork: {
                  ...(about.whereWeWork || {}),
                  subtitle: val,
                },
              })
            }
          />
          <TextAreaField
            label="Geographic Scope Description"
            value={about.whereWeWork?.description || ""}
            onChange={(val) =>
              onChange({
                ...about,
                whereWeWork: {
                  ...(about.whereWeWork || {}),
                  description: val,
                },
              })
            }
            rows={4}
          />
        </div>
      )}

      {/* 2. Executive Director Message */}
      {subTab === "director" && (
        <div className="bg-[#FAF8F5] border border-stone-200 rounded-xl p-5 flex flex-col gap-4">
          <h3 className="font-serif font-bold text-stone-900 text-sm">
            Executive Director's Message
          </h3>
          <Field
            label="Section Eyebrow"
            value={about.executiveDirectorMessage.eyebrow}
            onChange={(val) => updateDirector("eyebrow", val)}
          />
          <Field
            label="Section Title"
            value={about.executiveDirectorMessage.title}
            onChange={(val) => updateDirector("title", val)}
          />
          <TextAreaField
            label="Highlight Pull Quote"
            value={about.executiveDirectorMessage.quote}
            onChange={(val) => updateDirector("quote", val)}
            rows={2}
          />
          <TextAreaField
            label="Lead Paragraph"
            value={about.executiveDirectorMessage.lead}
            onChange={(val) => updateDirector("lead", val)}
            rows={3}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Field
              label="Sign-off Name"
              value={about.executiveDirectorMessage.signoff.name}
              onChange={(val) =>
                updateDirector("signoff", {
                  ...about.executiveDirectorMessage.signoff,
                  name: val,
                })
              }
            />
            <Field
              label="Title / Role"
              value={about.executiveDirectorMessage.signoff.title}
              onChange={(val) =>
                updateDirector("signoff", {
                  ...about.executiveDirectorMessage.signoff,
                  title: val,
                })
              }
            />
            <Field
              label="Year / Period"
              value={about.executiveDirectorMessage.signoff.year}
              onChange={(val) =>
                updateDirector("signoff", {
                  ...about.executiveDirectorMessage.signoff,
                  year: val,
                })
              }
            />
          </div>
        </div>
      )}

      {/* 3. Historical Journey Phases */}
      {subTab === "phases" && (
        <div className="flex flex-col gap-4">
          {/* Phase selector tabs + Add Phase button */}
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-stone-600">
              Timeline Phases ({about.journeyPhases.length})
            </p>
            <button
              type="button"
              onClick={handleAddPhase}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-colors shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Phase</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5 p-1.5 bg-[#FAF8F5] rounded-lg border border-stone-200">
            {about.journeyPhases.map((phase, idx) => (
              <button
                key={phase.phase || idx}
                type="button"
                onClick={() => onSelectPhase(idx)}
                className={`px-3 py-1.5 rounded text-xs font-semibold transition-all ${
                  selectedPhase === idx
                    ? "bg-[#1E4D2B] text-white shadow-sm"
                    : "text-stone-600 hover:bg-stone-200"
                }`}
              >
                Phase {phase.phase} ({phase.years})
              </button>
            ))}
          </div>

          {/* Active Phase Editor */}
          {about.journeyPhases[selectedPhase] && (
            <div className="bg-[#FAF8F5] border border-stone-200 rounded-xl p-5 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                    Editing Phase {about.journeyPhases[selectedPhase].phase} of {about.journeyPhases.length}
                  </span>
                  <span className="text-xs text-stone-400 ml-3">
                    Years: {about.journeyPhases[selectedPhase].years}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeletePhase(selectedPhase)}
                  disabled={about.journeyPhases.length <= 1}
                  className={`p-1.5 rounded transition-colors flex items-center gap-1 text-xs ${
                    about.journeyPhases.length <= 1
                      ? "text-stone-300 cursor-not-allowed"
                      : "text-stone-400 hover:text-red-600 hover:bg-red-50"
                  }`}
                  title={
                    about.journeyPhases.length <= 1
                      ? "At least one phase is required"
                      : "Delete phase"
                  }
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Delete Phase</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field
                  label="Phase Number / Label"
                  value={about.journeyPhases[selectedPhase].phase}
                  onChange={(val) => updateCurrentPhase("phase", val)}
                />
                <Field
                  label="Time Span (Years)"
                  value={about.journeyPhases[selectedPhase].years}
                  onChange={(val) => updateCurrentPhase("years", val)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field
                  label="Phase Title"
                  value={about.journeyPhases[selectedPhase].title}
                  onChange={(val) => updateCurrentPhase("title", val)}
                />
                <Field
                  label="Theme / Focus"
                  value={about.journeyPhases[selectedPhase].theme}
                  onChange={(val) => updateCurrentPhase("theme", val)}
                />
              </div>

              <TextAreaField
                label="Full Historical Description"
                value={about.journeyPhases[selectedPhase].description}
                onChange={(val) => updateCurrentPhase("description", val)}
                rows={4}
              />

              <div className="pt-2 border-t border-stone-200">
                <p className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                  Highlights &amp; Milestones (Bullet Points)
                </p>
                <div className="flex flex-col gap-2">
                  {about.journeyPhases[selectedPhase].highlights?.map(
                    (h, hIdx) => (
                      <div key={hIdx} className="flex gap-2">
                        <input
                          type="text"
                          value={h}
                          onChange={(e) => {
                            const hl = [
                              ...about.journeyPhases[selectedPhase].highlights,
                            ];
                            hl[hIdx] = e.target.value;
                            updateCurrentPhase("highlights", hl);
                          }}
                          className="flex-1 text-xs px-3 py-2 border border-stone-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const hl = about.journeyPhases[
                              selectedPhase
                            ].highlights.filter((_, i) => i !== hIdx);
                            updateCurrentPhase("highlights", hl);
                          }}
                          className="p-2 text-stone-400 hover:text-red-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      const hl = [
                        ...(about.journeyPhases[selectedPhase].highlights || []),
                        "New milestone point",
                      ];
                      updateCurrentPhase("highlights", hl);
                    }}
                    className="self-start text-xs text-emerald-700 font-semibold flex items-center gap-1 hover:underline mt-1"
                  >
                    <Plus className="w-3 h-3" /> Add highlight point
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. Governance & Board */}
      {subTab === "governance" && (
        <div className="bg-[#FAF8F5] border border-stone-200 rounded-xl p-5 flex flex-col gap-4">
          <h3 className="font-serif font-bold text-stone-900 text-sm">
            Governance &amp; Board of Management
          </h3>
          <Field
            label="Section Eyebrow"
            value={about.governance.eyebrow}
            onChange={(val) =>
              onChange({
                ...about,
                governance: { ...about.governance, eyebrow: val },
              })
            }
          />
          <Field
            label="Section Title"
            value={about.governance.title}
            onChange={(val) =>
              onChange({
                ...about,
                governance: { ...about.governance, title: val },
              })
            }
          />
          <TextAreaField
            label="Description"
            value={about.governance.description}
            onChange={(val) =>
              onChange({
                ...about,
                governance: { ...about.governance, description: val },
              })
            }
            rows={3}
          />

          <div className="pt-2 border-t border-stone-200">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Board of Management Members ({about.governance.members?.length || 0})
              </p>
              <button
                type="button"
                onClick={handleAddMember}
                className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded border border-emerald-200 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Board Member</span>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {about.governance.members?.map((m, idx) => (
                <div
                  key={idx}
                  className="bg-white p-3 rounded-lg border border-stone-200 flex flex-col gap-2 relative group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-stone-400">
                      Member #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDeleteMember(idx)}
                      disabled={(about.governance.members?.length || 0) <= 1}
                      className={`p-1 rounded transition-colors ${
                        (about.governance.members?.length || 0) <= 1
                          ? "text-stone-300 cursor-not-allowed"
                          : "text-stone-400 hover:text-red-600 hover:bg-red-50"
                      }`}
                      title={
                        (about.governance.members?.length || 0) <= 1
                          ? "At least one member is required"
                          : "Delete member"
                      }
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <Field
                    label="Name"
                    value={m.name}
                    onChange={(val) => {
                      const members = [...about.governance.members];
                      members[idx] = { ...members[idx], name: val };
                      onChange({
                        ...about,
                        governance: { ...about.governance, members },
                      });
                    }}
                  />
                  <Field
                    label="Role"
                    value={m.role}
                    onChange={(val) => {
                      const members = [...about.governance.members];
                      members[idx] = { ...members[idx], role: val };
                      onChange({
                        ...about,
                        governance: { ...about.governance, members },
                      });
                    }}
                  />
                  <Field
                    label="Affiliation / Bio"
                    value={m.bio || ""}
                    onChange={(val) => {
                      const members = [...about.governance.members];
                      members[idx] = { ...members[idx], bio: val };
                      onChange({
                        ...about,
                        governance: { ...about.governance, members },
                      });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. FCRA Information */}
      {subTab === "fcra" && (
        <div className="bg-[#FAF8F5] border border-stone-200 rounded-xl p-5 flex flex-col gap-4">
          <h3 className="font-serif font-bold text-stone-900 text-sm">
            FCRA Statutory Disclosures &amp; Compliance
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field
              label="FCRA Registration Number"
              value={about.fcraInformation.fcraRegistration.registrationNumber}
              onChange={(val) =>
                onChange({
                  ...about,
                  fcraInformation: {
                    ...about.fcraInformation,
                    fcraRegistration: {
                      ...about.fcraInformation.fcraRegistration,
                      registrationNumber: val,
                    },
                  },
                })
              }
            />
            <Field
              label="Nature of Association"
              value={about.fcraInformation.fcraRegistration.natureOfAssociation}
              onChange={(val) =>
                onChange({
                  ...about,
                  fcraInformation: {
                    ...about.fcraInformation,
                    fcraRegistration: {
                      ...about.fcraInformation.fcraRegistration,
                      natureOfAssociation: val,
                    },
                  },
                })
              }
            />
          </div>

          <Field
            label="Designated FCRA Bank Name"
            value={about.fcraInformation.bankDetails.bankName}
            onChange={(val) =>
              onChange({
                ...about,
                fcraInformation: {
                  ...about.fcraInformation,
                  bankDetails: {
                    ...about.fcraInformation.bankDetails,
                    bankName: val,
                  },
                },
              })
            }
          />
          <Field
            label="FCRA Bank Address"
            value={about.fcraInformation.bankDetails.address}
            onChange={(val) =>
              onChange({
                ...about,
                fcraInformation: {
                  ...about.fcraInformation,
                  bankDetails: {
                    ...about.fcraInformation.bankDetails,
                    address: val,
                  },
                },
              })
            }
          />
        </div>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------
   4. PROGRAMMES EDITOR
------------------------------------------------------------------------- */
const ProgrammesEditor = ({
  programmes,
  selectedId,
  onSelectId,
  onChange,
}: {
  programmes: any[];
  selectedId: string | number;
  onSelectId: (id: string | number) => void;
  onChange: (updated: any[]) => void;
}) => {
  const currentProgIndex = programmes.findIndex(
    (p) => String(p.id) === String(selectedId) || p.to === String(selectedId)
  );
  const actualIndex = currentProgIndex >= 0 ? currentProgIndex : 0;
  const prog = programmes[actualIndex] || programmes[0];

  const updateCurrentProg = (field: string, val: any) => {
    const updated = [...programmes];
    updated[actualIndex] = {
      ...updated[actualIndex],
      [field]: val,
    };
    // Sync related fields if title or heroHeading changes
    if (field === "heroHeading" && !updated[actualIndex].title) {
      updated[actualIndex].title = val;
    }
    if (field === "heroLead" && !updated[actualIndex].lead) {
      updated[actualIndex].lead = val;
    }
    onChange(updated);
  };

  if (!prog) {
    return <p className="text-xs text-stone-500">No programmes found.</p>;
  }

  const glanceStats = prog.glance || [];
  const initiatives = prog.objectives || [];

  const handleAddGlance = () => {
    const newGlance = {
      value: "100+",
      label: "New Reach Metric",
      detail: "Verified institutional milestone and community outcome.",
    };
    const glance = [...glanceStats, newGlance];
    updateCurrentProg("glance", glance);
    toast.success("Added glance metric.");
  };

  const handleDeleteGlance = (gIdx: number) => {
    const glance = glanceStats.filter((_: any, i: number) => i !== gIdx);
    updateCurrentProg("glance", glance);
    toast.success("Glance metric removed.");
  };

  const handleAddInitiative = () => {
    const updatedInit = [
      ...initiatives,
      "New strategic field initiative and community accompaniment.",
    ];
    updateCurrentProg("objectives", updatedInit);
    toast.success("Added strategic initiative.");
  };

  const handleDeleteInitiative = (idx: number) => {
    const updatedInit = initiatives.filter((_: any, i: number) => i !== idx);
    updateCurrentProg("objectives", updatedInit);
    toast.success("Initiative removed.");
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
            Main Website: "Our Work" Section
          </span>
        </div>
        <h2 className="text-xl font-serif font-bold text-stone-900 mt-1">
          Programmes &amp; Initiatives Editor
        </h2>
        <p className="text-xs text-stone-500 mt-1">
          Select any of LAYA's 8 core initiatives to edit titles, summaries, glance metrics, and annual report disclosures. All content matches the live website layout under <strong>Our Work (/what-we-do/*)</strong>.
        </p>
      </div>

      {/* Programme selection pill strip */}
      <div className="flex flex-wrap gap-1.5 p-1.5 bg-[#FAF8F5] rounded-xl border border-stone-200">
        {programmes.map((p, pIdx) => {
          const isSelected =
            String(selectedId) === String(p.id) ||
            p.to === String(selectedId) ||
            (!selectedId && pIdx === 0);
          const badge = String(p.id ?? pIdx + 1);

          // Full terminology matching the main website navigation exactly
          const EXACT_WEBSITE_NAMES: Record<string, string> = {
            "/what-we-do/rla": "#1 · Safeguarding Adivasi Rights (RLA)",
            "/what-we-do/hbhc": "#2 · Health · Herbal-Based Care (Vanantharam)",
            "/what-we-do/srm": "#3 · Sustainable Resource Management (SRM)",
            "/what-we-do/lifelong-learning": "#4 · Lifelong Learning",
            "/what-we-do/climate-crisis-sustainable-development": "#5 · Climate Crisis & Sustainable Development",
            "/what-we-do/climate-friendly-technologies-coastal-ecosystems": "#6 · Climate Tech & Coastal Ecosystems",
            "/what-we-do/urban-peri-urban-ecosystems": "#7 · Urban & Peri-Urban Ecosystems",
            "/what-we-do/partner-engagements": "#8 · Partner Engagements",
          };

          const label = EXACT_WEBSITE_NAMES[p.to] || `#${badge} · ${p.shortTitle || p.title}`;

          return (
            <button
              key={p.id ?? pIdx}
              type="button"
              onClick={() => onSelectId(p.id ?? pIdx + 1)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isSelected
                  ? "bg-[#1E4D2B] text-white shadow-sm"
                  : "text-stone-600 hover:bg-stone-200"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Active Programme Form */}
      <div className="bg-[#FAF8F5] border border-stone-200 rounded-xl p-5 flex flex-col gap-5">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Our Work Category: {prog.category || "General"} · Canonical Route: {prog.to}
            </span>
            <h3 className="font-serif font-bold text-stone-900 text-base mt-0.5">
              {prog.title || prog.heroHeading}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to={`${prog.to}?edit=true`}
              target="_blank"
              className="text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 flex items-center gap-1 px-3 py-1.5 rounded-lg border border-emerald-300 shadow-sm transition-colors"
              title="Edit directly on live page"
            >
              <Edit3 className="w-3.5 h-3.5 text-emerald-700" />
              <span>Edit on Page</span>
            </Link>
            <Link
              to={prog.to}
              target="_blank"
              className="text-xs font-medium text-stone-700 bg-white hover:bg-stone-100 flex items-center gap-1 px-3 py-1.5 rounded-lg border border-stone-300 shadow-sm transition-colors"
            >
              <span>View Live</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 1. Hero Section */}
        <div className="bg-white p-4 rounded-xl border border-stone-200 flex flex-col gap-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E4D2B] pb-1 border-b border-stone-100">
            1. Hero Header &amp; Top Eyebrow
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field
              label="Hero Eyebrow"
              value={prog.heroEyebrow || `Our Work · ${prog.shortTitle || prog.title}`}
              onChange={(val) => updateCurrentProg("heroEyebrow", val)}
            />
            <Field
              label="Programme Display Name"
              value={prog.title}
              onChange={(val) => updateCurrentProg("title", val)}
            />
          </div>

          <Field
            label="Hero Main Headline"
            value={prog.heroHeading || prog.title}
            onChange={(val) => updateCurrentProg("heroHeading", val)}
          />

          <TextAreaField
            label="Hero Lead Narrative"
            value={prog.heroLead || prog.lead || ""}
            onChange={(val) => updateCurrentProg("heroLead", val)}
            rows={3}
          />
        </div>

        {/* 2. Institutional Overview */}
        <div className="bg-white p-4 rounded-xl border border-stone-200 flex flex-col gap-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E4D2B] pb-1 border-b border-stone-100">
            2. Institutional Overview &amp; Context
          </h4>
          <Field
            label="Overview Section Title"
            value={prog.overviewHeading || `${prog.shortTitle || prog.title} in Numbers & Reach`}
            onChange={(val) => updateCurrentProg("overviewHeading", val)}
          />
          <TextAreaField
            label="Overview Lead Text"
            value={prog.overviewIntro || prog.description || ""}
            onChange={(val) => updateCurrentProg("overviewIntro", val)}
            rows={3}
          />
        </div>

        {/* 3. Glance stats */}
        <div className="bg-white p-4 rounded-xl border border-stone-200 flex flex-col gap-3">
          <div className="flex items-center justify-between pb-1 border-b border-stone-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E4D2B]">
              3. At a Glance Statistics ({glanceStats.length})
            </h4>
            <button
              type="button"
              onClick={handleAddGlance}
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded border border-emerald-200 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Glance Metric</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {glanceStats.map((g: any, gIdx: number) => (
              <div
                key={gIdx}
                className="bg-[#FAF8F5] p-3 rounded-lg border border-stone-200 flex flex-col gap-2 relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-stone-400">
                    Metric #{gIdx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDeleteGlance(gIdx)}
                    className="p-1 text-stone-400 hover:text-red-600 transition-colors"
                    title="Delete metric"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <Field
                  label="Metric Value"
                  value={g.value}
                  onChange={(val) => {
                    const glance = [...glanceStats];
                    glance[gIdx] = { ...glance[gIdx], value: val };
                    updateCurrentProg("glance", glance);
                  }}
                />
                <Field
                  label="Label"
                  value={g.label}
                  onChange={(val) => {
                    const glance = [...glanceStats];
                    glance[gIdx] = { ...glance[gIdx], label: val };
                    updateCurrentProg("glance", glance);
                  }}
                />
                <Field
                  label="Detail / Description"
                  value={g.detail || g.desc || ""}
                  onChange={(val) => {
                    const glance = [...glanceStats];
                    glance[gIdx] = { ...glance[gIdx], detail: val, desc: val };
                    updateCurrentProg("glance", glance);
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 4. Annual Report Disclosures & Key Initiatives */}
        <div className="bg-white p-4 rounded-xl border border-stone-200 flex flex-col gap-3">
          <div className="flex items-center justify-between pb-1 border-b border-stone-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E4D2B]">
              4. Annual Report Disclosures &amp; Strategic Initiatives ({initiatives.length})
            </h4>
            <button
              type="button"
              onClick={handleAddInitiative}
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded border border-emerald-200 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Strategic Initiative</span>
            </button>
          </div>

          <Field
            label="Annual Report Theme Title"
            value={prog.annualReportTheme || prog.title}
            onChange={(val) => updateCurrentProg("annualReportTheme", val)}
          />

          <p className="text-[11px] font-bold uppercase tracking-wider text-stone-500 mt-1">
            Key Strategic Initiatives (Bullet Points)
          </p>
          <div className="flex flex-col gap-2">
            {initiatives.map((obj: string, oIdx: number) => (
              <div key={oIdx} className="flex gap-2">
                <input
                  type="text"
                  value={obj}
                  onChange={(e) => {
                    const objs = [...initiatives];
                    objs[oIdx] = e.target.value;
                    updateCurrentProg("objectives", objs);
                  }}
                  className="flex-1 text-xs px-3 py-2 border border-stone-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteInitiative(oIdx)}
                  className="p-2 text-stone-400 hover:text-red-600"
                  title="Delete initiative"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------
   5. STORIES & FIELD NOTES EDITOR
------------------------------------------------------------------------- */
const StoriesEditor = ({
  stories,
  selectedIndex,
  onSelectIndex,
  onChange,
}: {
  stories: any[];
  selectedIndex: number;
  onSelectIndex: (idx: number) => void;
  onChange: (updated: any[]) => void;
}) => {
  const note = stories[selectedIndex] || stories[0];

  const updateCurrentNote = (field: string, val: any) => {
    const updated = [...stories];
    updated[selectedIndex] = {
      ...updated[selectedIndex],
      [field]: val,
    };
    onChange(updated);
  };

  if (!note) {
    return <p className="text-xs text-stone-500">No stories found.</p>;
  }

  const handleAddStory = () => {
    const nextIdx = stories.length + 1;
    const newSlug = `field-note-${nextIdx}-${Date.now().toString().slice(-4)}`;
    const newStory = {
      slug: newSlug,
      title: `Field Record #${nextIdx}: Eastern Ghats Accompaniment`,
      subtitle: "Grassroots documentation from community field initiatives",
      author: "LAYA Field Team",
      date: new Date().toISOString().split("T")[0],
      readTime: "3 min read",
      category: "Tribal Rights & Autonomy",
      categorySlug: "rights",
      excerpt:
        "Community reflections on land sovereignty, traditional knowledge, and ecological stewardship.",
      body: [
        "In the forested ridges of the Eastern Ghats, Adivasi hamlets continue to demonstrate resilient community self-reliance.",
        "Through collective assemblies, elders and youth work together to protect forest tracts and preserve ancestral biodiversity.",
      ],
    };
    const updated = [...stories, newStory];
    onChange(updated);
    onSelectIndex(updated.length - 1);
    toast.success(`Created Note #${nextIdx}`);
  };

  const handleDeleteStory = (idx: number) => {
    if (stories.length <= 1) {
      toast.error("At least one field note is required.");
      return;
    }
    const updated = stories.filter((_, i) => i !== idx);
    onChange(updated);
    if (selectedIndex >= updated.length) {
      onSelectIndex(Math.max(0, updated.length - 1));
    }
    toast.success("Field note deleted.");
  };

  const bodyParagraphs: string[] = Array.isArray(note.body)
    ? note.body
    : typeof note.body === "string" && note.body
    ? [note.body]
    : [];

  const handleAddBodyParagraph = () => {
    const updatedParas = [
      ...bodyParagraphs,
      "New documentary field observation and community testimony.",
    ];
    updateCurrentNote("body", updatedParas);
    toast.success("Added paragraph to story.");
  };

  const handleDeleteBodyParagraph = (pIdx: number) => {
    const updatedParas = bodyParagraphs.filter((_, i) => i !== pIdx);
    updateCurrentNote("body", updatedParas);
    toast.success("Paragraph removed.");
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-serif font-bold text-stone-900">
          Field Notes &amp; Stories Editor
        </h2>
        <p className="text-xs text-stone-500 mt-1">
          Edit long-form documentary field notes, authors, dates, excerpts, and
          narrative paragraphs. All changes adapt across desktop and mobile layouts.
        </p>
      </div>

      {/* Story tabs + Add Button */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-wider text-stone-600">
          Field Notes ({stories.length})
        </p>
        <button
          type="button"
          onClick={handleAddStory}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-colors shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Field Note</span>
        </button>
      </div>

      <div className="flex flex-wrap gap-2 p-1.5 bg-[#FAF8F5] rounded-xl border border-stone-200">
        {stories.map((s, idx) => (
          <button
            key={s.slug || idx}
            type="button"
            onClick={() => onSelectIndex(idx)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedIndex === idx
                ? "bg-[#1E4D2B] text-white shadow-sm"
                : "text-stone-600 hover:bg-stone-200"
            }`}
          >
            Note #{idx + 1}: {s.title.slice(0, 25)}...
          </button>
        ))}
      </div>

      {/* Active Story Form */}
      <div className="bg-[#FAF8F5] border border-stone-200 rounded-xl p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between pb-2 border-b border-stone-200">
          <div>
            <span className="text-xs font-bold text-emerald-800">
              Note #{selectedIndex + 1} of {stories.length} · Slug: /stories/{note.slug}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to={`/stories/${note.slug}`}
              target="_blank"
              className="text-xs font-medium text-emerald-700 hover:underline flex items-center gap-1"
            >
              <span>Read on website</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
            <button
              type="button"
              onClick={() => handleDeleteStory(selectedIndex)}
              disabled={stories.length <= 1}
              className={`p-1.5 rounded transition-colors flex items-center gap-1 text-xs ${
                stories.length <= 1
                  ? "text-stone-300 cursor-not-allowed"
                  : "text-stone-400 hover:text-red-600 hover:bg-red-50"
              }`}
              title={
                stories.length <= 1
                  ? "At least one story is required"
                  : "Delete field note"
              }
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Delete Note</span>
            </button>
          </div>
        </div>

        <Field
          label="Story Title"
          value={note.title}
          onChange={(val) => updateCurrentNote("title", val)}
        />
        <Field
          label="Subtitle"
          value={note.subtitle || ""}
          onChange={(val) => updateCurrentNote("subtitle", val)}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Field
            label="Author"
            value={note.author || ""}
            onChange={(val) => updateCurrentNote("author", val)}
          />
          <Field
            label="Date"
            value={note.date || ""}
            onChange={(val) => updateCurrentNote("date", val)}
          />
          <Field
            label="Read Time"
            value={note.readTime || ""}
            onChange={(val) => updateCurrentNote("readTime", val)}
          />
        </div>

        <TextAreaField
          label="Story Excerpt / Teaser"
          value={note.excerpt || ""}
          onChange={(val) => updateCurrentNote("excerpt", val)}
          rows={3}
        />

        {/* Narrative Body Paragraphs */}
        <div className="pt-2 border-t border-stone-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Story Body Paragraphs ({bodyParagraphs.length})
            </p>
            <button
              type="button"
              onClick={handleAddBodyParagraph}
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded border border-emerald-200 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Paragraph</span>
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {bodyParagraphs.map((para: string, pIdx: number) => (
              <div
                key={pIdx}
                className="flex gap-2 items-start bg-white p-3 rounded-lg border border-stone-200"
              >
                <div className="flex-1">
                  <TextAreaField
                    label={`Paragraph #${pIdx + 1}`}
                    value={para}
                    onChange={(val) => {
                      const updated = [...bodyParagraphs];
                      updated[pIdx] = val;
                      updateCurrentNote("body", updated);
                    }}
                    rows={3}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteBodyParagraph(pIdx)}
                  className="p-2 text-stone-400 hover:text-red-600 transition-colors mt-6"
                  title="Delete paragraph"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------
   6. IMPACT & METRICS EDITOR
------------------------------------------------------------------------- */
const ImpactEditor = ({
  impact,
  onChange,
}: {
  impact: WebsiteContentState["impact"];
  onChange: (updated: WebsiteContentState["impact"]) => void;
}) => {
  const stats = impact.headlineStatistics || [];

  const handleAddMetric = () => {
    const newMetric = {
      value: "1,500+",
      suffix: "",
      label: "New Impact Metric",
      detail: "Verified outcome documented across target tribal mandals.",
    };
    const updated = [...stats, newMetric];
    onChange({ ...impact, headlineStatistics: updated });
    toast.success("Added headline impact metric.");
  };

  const handleDeleteMetric = (idx: number) => {
    if (stats.length <= 1) {
      toast.error("At least one headline metric is required.");
      return;
    }
    const updated = stats.filter((_, i) => i !== idx);
    onChange({ ...impact, headlineStatistics: updated });
    toast.success("Headline metric deleted.");
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-serif font-bold text-stone-900">
          Impact &amp; Headline Statistics Editor
        </h2>
        <p className="text-xs text-stone-500 mt-1">
          Edit the header narrative, provenance disclosures, thematic reach, and top verifiable impact figures displayed across the website.
        </p>
      </div>

      {/* 1. Page Header & Provenance */}
      <div className="bg-[#FAF8F5] border border-stone-200 rounded-xl p-5 flex flex-col gap-4">
        <h3 className="font-serif font-bold text-stone-900 text-sm">
          1. Impact Page Header &amp; Disclosures
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field
            label="Header Eyebrow"
            value={impact.hero?.eyebrow || "Verifiable Outcomes"}
            onChange={(val) =>
              onChange({
                ...impact,
                hero: {
                  ...(impact.hero || {
                    title: "Our Impact",
                    lead: "",
                  }),
                  eyebrow: val,
                },
              })
            }
          />
          <Field
            label="Main Title"
            value={impact.hero?.title || "Our Impact"}
            onChange={(val) =>
              onChange({
                ...impact,
                hero: {
                  ...(impact.hero || {
                    eyebrow: "Verifiable Outcomes",
                    lead: "",
                  }),
                  title: val,
                },
              })
            }
          />
        </div>
        <TextAreaField
          label="Lead Narrative"
          value={impact.hero?.lead || ""}
          onChange={(val) =>
            onChange({
              ...impact,
              hero: {
                ...(impact.hero || {
                  eyebrow: "Verifiable Outcomes",
                  title: "Our Impact",
                }),
                lead: val,
              },
            })
          }
          rows={2}
        />
        <TextAreaField
          label="Provenance & Transparency Notice"
          value={impact.provenanceNotice || ""}
          onChange={(val) =>
            onChange({
              ...impact,
              provenanceNotice: val,
            })
          }
          rows={2}
        />
      </div>

      {/* 2. Thematic Heading */}
      <div className="bg-[#FAF8F5] border border-stone-200 rounded-xl p-5 flex flex-col gap-3">
        <h3 className="font-serif font-bold text-stone-900 text-sm">
          2. Thematic Reach Section Heading
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field
            label="Section Eyebrow"
            value={impact.thematicHeading?.eyebrow || "Reach"}
            onChange={(val) =>
              onChange({
                ...impact,
                thematicHeading: {
                  ...(impact.thematicHeading || {
                    title: "Thematic Reach",
                    intro: "",
                  }),
                  eyebrow: val,
                },
              })
            }
          />
          <Field
            label="Section Title"
            value={impact.thematicHeading?.title || "Thematic Reach"}
            onChange={(val) =>
              onChange({
                ...impact,
                thematicHeading: {
                  ...(impact.thematicHeading || {
                    eyebrow: "Reach",
                    intro: "",
                  }),
                  title: val,
                },
              })
            }
          />
        </div>
        <TextAreaField
          label="Intro Narrative"
          value={impact.thematicHeading?.intro || ""}
          onChange={(val) =>
            onChange({
              ...impact,
              thematicHeading: {
                ...(impact.thematicHeading || {
                  eyebrow: "Reach",
                  title: "Thematic Reach",
                }),
                intro: val,
              },
            })
          }
          rows={2}
        />
      </div>

      {/* 3. Headline Statistics */}
      <div className="bg-[#FAF8F5] border border-stone-200 rounded-xl p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-bold text-stone-900 text-sm">
            3. Headline Statistics ({stats.length})
          </h3>
          <button
            type="button"
            onClick={handleAddMetric}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-colors shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Headline Metric</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stats.map((st, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-xl border border-stone-200 flex flex-col gap-3 relative group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-800">
                    Metric #{idx + 1}
                  </span>
                  <span className="text-xs text-stone-400 font-mono">
                    {st.value}
                    {st.suffix}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteMetric(idx)}
                  disabled={stats.length <= 1}
                  className={`p-1 rounded transition-colors ${
                    stats.length <= 1
                      ? "text-stone-300 cursor-not-allowed"
                      : "text-stone-400 hover:text-red-600 hover:bg-red-50"
                  }`}
                  title={
                    stats.length <= 1
                      ? "At least one headline metric is required"
                      : "Delete metric"
                  }
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Field
                  label="Number Value"
                  value={st.value}
                  onChange={(val) => {
                    const updated = [...stats];
                    updated[idx] = { ...updated[idx], value: val };
                    onChange({ ...impact, headlineStatistics: updated });
                  }}
                />
                <Field
                  label="Suffix (+ / %)"
                  value={st.suffix || ""}
                  onChange={(val) => {
                    const updated = [...stats];
                    updated[idx] = { ...updated[idx], suffix: val };
                    onChange({ ...impact, headlineStatistics: updated });
                  }}
                />
              </div>
              <Field
                label="Metric Label"
                value={st.label}
                onChange={(val) => {
                  const updated = [...stats];
                  updated[idx] = { ...updated[idx], label: val };
                  onChange({ ...impact, headlineStatistics: updated });
                }}
              />
              <TextAreaField
                label="Descriptive Context"
                value={st.detail || ""}
                onChange={(val) => {
                  const updated = [...stats];
                  updated[idx] = { ...updated[idx], detail: val };
                  onChange({ ...impact, headlineStatistics: updated });
                }}
                rows={2}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------
   7. CONTACT & DONATION EDITOR
------------------------------------------------------------------------- */
const ContactEditor = ({
  contact,
  onChange,
}: {
  contact: WebsiteContentState["contact"];
  onChange: (updated: WebsiteContentState["contact"]) => void;
}) => {
  const updateDetails = (field: string, val: string) => {
    onChange({
      ...contact,
      details: { ...contact.details, [field]: val },
    });
  };

  const updateBank = (type: "domestic" | "foreign", field: string, val: string) => {
    onChange({
      ...contact,
      [type === "domestic" ? "bankDomestic" : "bankForeign"]: {
        ...(type === "domestic" ? contact.bankDomestic : contact.bankForeign),
        [field]: val,
      },
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-serif font-bold text-stone-900">
          Contact &amp; Donation Bank Details
        </h2>
        <p className="text-xs text-stone-500 mt-1">
          Edit institutional contact addresses, phones, emails, and donation
          bank instructions.
        </p>
      </div>

      {/* Main Office Contact */}
      <div className="bg-[#FAF8F5] border border-stone-200 rounded-xl p-5 flex flex-col gap-4">
        <h3 className="font-serif font-bold text-stone-900 text-sm">
          Headquarters Contact Info
        </h3>
        <TextAreaField
          label="Postal Address"
          value={contact.details.address}
          onChange={(val) => updateDetails("address", val)}
          rows={2}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field
            label="Phone Number"
            value={contact.details.phone}
            onChange={(val) => updateDetails("phone", val)}
          />
          <Field
            label="Email Address"
            value={contact.details.email}
            onChange={(val) => updateDetails("email", val)}
          />
        </div>
        <Field
          label="Website URL"
          value={contact.details.website}
          onChange={(val) => updateDetails("website", val)}
        />
      </div>

      {/* Bank Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Domestic Bank */}
        <div className="bg-[#FAF8F5] border border-stone-200 rounded-xl p-5 flex flex-col gap-3">
          <h4 className="font-serif font-bold text-stone-900 text-sm">
            Domestic Contribution Bank
          </h4>
          <Field
            label="Bank Name"
            value={contact.bankDomestic.bankName}
            onChange={(val) => updateBank("domestic", "bankName", val)}
          />
          <Field
            label="Account Name"
            value={contact.bankDomestic.accountName}
            onChange={(val) => updateBank("domestic", "accountName", val)}
          />
          <Field
            label="Account Number"
            value={contact.bankDomestic.accountNumber}
            onChange={(val) => updateBank("domestic", "accountNumber", val)}
          />
          <Field
            label="IFSC Code"
            value={contact.bankDomestic.ifscCode}
            onChange={(val) => updateBank("domestic", "ifscCode", val)}
          />
          <Field
            label="Branch"
            value={contact.bankDomestic.branch}
            onChange={(val) => updateBank("domestic", "branch", val)}
          />
        </div>

        {/* Foreign Bank */}
        <div className="bg-[#FAF8F5] border border-stone-200 rounded-xl p-5 flex flex-col gap-3">
          <h4 className="font-serif font-bold text-stone-900 text-sm">
            Foreign Contribution (FCRA) Bank
          </h4>
          <Field
            label="Bank Name"
            value={contact.bankForeign.bankName}
            onChange={(val) => updateBank("foreign", "bankName", val)}
          />
          <Field
            label="Account Name"
            value={contact.bankForeign.accountName}
            onChange={(val) => updateBank("foreign", "accountName", val)}
          />
          <Field
            label="Account Number"
            value={contact.bankForeign.accountNumber}
            onChange={(val) => updateBank("foreign", "accountNumber", val)}
          />
          <Field
            label="SWIFT / IFSC Code"
            value={contact.bankForeign.swiftCode}
            onChange={(val) => updateBank("foreign", "swiftCode", val)}
          />
          <Field
            label="Branch"
            value={contact.bankForeign.branch}
            onChange={(val) => updateBank("foreign", "branch", val)}
          />
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------
   8. FOOTER & SITEWIDE EDITOR
------------------------------------------------------------------------- */
const FooterEditor = ({
  footer,
  contactDetails,
  onChangeFooter,
  onChangeContact,
}: {
  footer: WebsiteContentState["footer"];
  contactDetails: any;
  onChangeFooter: (updated: WebsiteContentState["footer"]) => void;
  onChangeContact: (updated: any) => void;
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-serif font-bold text-stone-900">
          Sitewide &amp; Footer Content
        </h2>
        <p className="text-xs text-stone-500 mt-1">
          Edit brand identity strings, tagline, mission description, and copyright
          statements rendered in the footer across every page.
        </p>
      </div>

      <div className="bg-[#FAF8F5] border border-stone-200 rounded-xl p-5 flex flex-col gap-4">
        <h3 className="font-serif font-bold text-stone-900 text-sm">
          Brand Identity in Footer
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field
            label="Organization Brand Name"
            value={footer.identity.name}
            onChange={(val) =>
              onChangeFooter({
                ...footer,
                identity: { ...footer.identity, name: val },
              })
            }
          />
          <Field
            label="Tagline"
            value={footer.identity.tagline}
            onChange={(val) =>
              onChangeFooter({
                ...footer,
                identity: { ...footer.identity, tagline: val },
              })
            }
          />
        </div>

        <TextAreaField
          label="Footer Mission Description"
          value={footer.identity.description}
          onChange={(val) =>
            onChangeFooter({
              ...footer,
              identity: { ...footer.identity, description: val },
            })
          }
          rows={3}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field
            label="Meaning of 'LAYA'"
            value={footer.identity.meaning}
            onChange={(val) =>
              onChangeFooter({
                ...footer,
                identity: { ...footer.identity, meaning: val },
              })
            }
          />
          <Field
            label="Founded Statement"
            value={footer.identity.founded}
            onChange={(val) =>
              onChangeFooter({
                ...footer,
                identity: { ...footer.identity, founded: val },
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------
   8. DONATE & INSTITUTIONAL GIVING EDITOR
------------------------------------------------------------------------- */
const DonateEditor = ({
  donate,
  bankDomestic,
  bankForeign,
  onChangeDonate,
  onChangeBankDomestic,
  onChangeBankForeign,
}: {
  donate?: WebsiteContentState["donate"];
  bankDomestic: any;
  bankForeign: any;
  onChangeDonate: (updated: any) => void;
  onChangeBankDomestic: (updated: any) => void;
  onChangeBankForeign: (updated: any) => void;
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-serif font-bold text-stone-900">
          Donate &amp; Institutional Contributions
        </h2>
        <p className="text-xs text-stone-500 mt-1">
          Edit header narrative, contribution guidelines, and domestic/FCRA banking instructions.
        </p>
      </div>

      <div className="bg-[#FAF8F5] border border-stone-200 rounded-xl p-5 flex flex-col gap-4">
        <h3 className="font-serif font-bold text-stone-900 text-sm">
          Donation Page Header
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field
            label="Eyebrow"
            value={donate?.header?.eyebrow || "Support Our Work"}
            onChange={(val) =>
              onChangeDonate({
                ...donate,
                header: {
                  ...(donate?.header || { title: "Support LAYA", lead: "" }),
                  eyebrow: val,
                },
              })
            }
          />
          <Field
            label="Title"
            value={donate?.header?.title || "Support LAYA"}
            onChange={(val) =>
              onChangeDonate({
                ...donate,
                header: {
                  ...(donate?.header || { eyebrow: "Support Our Work", lead: "" }),
                  title: val,
                },
              })
            }
          />
        </div>
        <TextAreaField
          label="Lead Narrative"
          value={donate?.header?.lead || ""}
          onChange={(val) =>
            onChangeDonate({
              ...donate,
              header: {
                ...(donate?.header || { eyebrow: "Support Our Work", title: "Support LAYA" }),
                lead: val,
              },
            })
          }
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-[#FAF8F5] border border-stone-200 rounded-xl p-5 flex flex-col gap-3">
          <h4 className="font-serif font-bold text-stone-900 text-sm">
            Domestic Bank Details (80G Tax Exemption)
          </h4>
          <Field
            label="Bank Name"
            value={bankDomestic?.bankName || ""}
            onChange={(val) => onChangeBankDomestic({ ...bankDomestic, bankName: val })}
          />
          <Field
            label="Account Name"
            value={bankDomestic?.accountName || ""}
            onChange={(val) => onChangeBankDomestic({ ...bankDomestic, accountName: val })}
          />
          <Field
            label="Account Number"
            value={bankDomestic?.accountNumber || ""}
            onChange={(val) => onChangeBankDomestic({ ...bankDomestic, accountNumber: val })}
          />
          <Field
            label="IFSC Code"
            value={bankDomestic?.ifscCode || ""}
            onChange={(val) => onChangeBankDomestic({ ...bankDomestic, ifscCode: val })}
          />
        </div>

        <div className="bg-[#FAF8F5] border border-stone-200 rounded-xl p-5 flex flex-col gap-3">
          <h4 className="font-serif font-bold text-stone-900 text-sm">
            Foreign Bank Details (FCRA Compliant)
          </h4>
          <Field
            label="Bank Name"
            value={bankForeign?.bankName || ""}
            onChange={(val) => onChangeBankForeign({ ...bankForeign, bankName: val })}
          />
          <Field
            label="Account Name"
            value={bankForeign?.accountName || ""}
            onChange={(val) => onChangeBankForeign({ ...bankForeign, accountName: val })}
          />
          <Field
            label="Account Number"
            value={bankForeign?.accountNumber || ""}
            onChange={(val) => onChangeBankForeign({ ...bankForeign, accountNumber: val })}
          />
          <Field
            label="SWIFT / IFSC"
            value={bankForeign?.swiftCode || ""}
            onChange={(val) => onChangeBankForeign({ ...bankForeign, swiftCode: val })}
          />
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------
   9. RESOURCE CENTRE & PUBLICATIONS EDITOR
------------------------------------------------------------------------- */
const PublicationsEditor = ({
  publications,
  onChange,
}: {
  publications?: WebsiteContentState["publications"];
  onChange: (updated: any) => void;
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-serif font-bold text-stone-900">
          Resource Centre &amp; Publications Library
        </h2>
        <p className="text-xs text-stone-500 mt-1">
          Edit header introduction, knowledge repository lead, and documentary publications framing.
        </p>
      </div>

      <div className="bg-[#FAF8F5] border border-stone-200 rounded-xl p-5 flex flex-col gap-4">
        <h3 className="font-serif font-bold text-stone-900 text-sm">
          Resource Centre Header
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field
            label="Header Eyebrow"
            value={publications?.header?.eyebrow || "Knowledge"}
            onChange={(val) =>
              onChange({
                ...publications,
                header: {
                  ...(publications?.header || { title: "Resource Centre", lead: "" }),
                  eyebrow: val,
                },
              })
            }
          />
          <Field
            label="Main Title"
            value={publications?.header?.title || "Resource Centre"}
            onChange={(val) =>
              onChange({
                ...publications,
                header: {
                  ...(publications?.header || { eyebrow: "Knowledge", lead: "" }),
                  title: val,
                },
              })
            }
          />
        </div>
        <TextAreaField
          label="Lead Narrative"
          value={publications?.header?.lead || ""}
          onChange={(val) =>
            onChange({
              ...publications,
              header: {
                ...(publications?.header || { eyebrow: "Knowledge", title: "Resource Centre" }),
                lead: val,
              },
            })
          }
          rows={3}
        />
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------
   COMMON FORM CONTROLS
------------------------------------------------------------------------- */
const Field = ({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
      {label}
    </label>
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="text-xs px-3 py-2 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all"
    />
  </div>
);

const TextAreaField = ({
  label,
  value,
  onChange,
  rows = 3,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  rows?: number;
  placeholder?: string;
}) => (
  <div className="flex flex-col gap-1">
    <div className="flex items-center justify-between">
      <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
        {label}
      </label>
      <span className="text-[10px] text-stone-400 font-mono">
        {value?.length || 0} chars
      </span>
    </div>
    <textarea
      value={value}
      rows={rows}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="text-xs p-3 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all font-sans leading-relaxed"
    />
  </div>
);

export default AdminDashboard;
