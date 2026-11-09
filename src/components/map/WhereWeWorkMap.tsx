import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "@/styles/map.css";
import {
  MapPin,
  Building2,
  HeartPulse,
  Compass,
  ArrowRight,
  ShieldCheck,
  Info,
  ListFilter,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Mountain,
  Satellite,
  Map as MapIcon,
} from "lucide-react";
import {
  VERIFIED_LOCATIONS,
  VERIFIED_DISTRICTS,
  GEOGRAPHICAL_DATA_AUDIT,
  type VerifiedLocation,
} from "@/content/whereWeWorkData";

type MapStyleKey = "terrain" | "voyager" | "satellite";

interface TileConfig {
  name: string;
  icon: typeof Mountain;
  url: string;
  subdomains?: string;
  attribution: string;
  maxZoom: number;
}

const MAP_STYLES: Record<MapStyleKey, TileConfig> = {
  terrain: {
    name: "Terrain Relief",
    icon: Mountain,
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
    attribution: '&copy; Esri, USGS, NOAA &copy; OpenStreetMap',
    maxZoom: 18,
  },
  voyager: {
    name: "Voyager Atlas",
    icon: MapIcon,
    url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    subdomains: "abcd",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 19,
  },
  satellite: {
    name: "Satellite",
    icon: Satellite,
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: '&copy; Esri, Maxar, Earthstar Geographics',
    maxZoom: 18,
  },
};

const REGIONAL_BOUNDS: L.LatLngBoundsLiteral = [
  [17.15, 81.35],
  [18.95, 84.25],
];

const DISTRICT_BOUNDS: Record<string, L.LatLngBoundsLiteral> = {
  "dist-asr": [
    [17.3, 81.6],
    [18.3, 82.85],
  ],
  "dist-visakhapatnam": [
    [17.6, 83.15],
    [17.95, 83.55],
  ],
  "dist-srikakulam": [
    [18.45, 83.5],
    [18.9, 84.1],
  ],
};

/**
 * WHERE WE WORK MAP COMPONENT
 * ---------------------------------------------------------------------------
 * High-precision, interactive cartographic map representing LAYA's operational
 * footprint across the Eastern Ghats and Northern Coastal Andhra Pradesh.
 *
 * FEATURES:
 *  - Real geographic topography showing mountain ridges, river basins, and coastline.
 *  - Tile style switcher (Terrain Relief, Voyager Atlas, Satellite Imagery).
 *  - Interactive custom HTML markers with branded elevation and pulse effects.
 *  - Keyboard & screen-reader accessible quick-hub dock with verified coordinates.
 *  - Tabular directory fallback for accessibility.
 * ---------------------------------------------------------------------------
 */
export const WhereWeWorkMap = () => {
  const [selectedLocationId, setSelectedLocationId] = useState<string>(
    VERIFIED_LOCATIONS[0].id,
  );
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  const [mapStyle, setMapStyle] = useState<MapStyleKey>("terrain");

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersGroupRef = useRef<L.LayerGroup | null>(null);

  const selectedLocation =
    VERIFIED_LOCATIONS.find((loc) => loc.id === selectedLocationId) ||
    VERIFIED_LOCATIONS[0];

  const filteredLocations =
    selectedDistrictId === "all"
      ? VERIFIED_LOCATIONS
      : VERIFIED_LOCATIONS.filter((loc) => {
          const dist = VERIFIED_DISTRICTS.find((d) => d.id === selectedDistrictId);
          return dist ? loc.district.toLowerCase() === dist.name.toLowerCase() : true;
        });

  // Initialize or update Leaflet Map
  useEffect(() => {
    if (viewMode !== "map" || !mapContainerRef.current) return;

    // Initialize Map if not already created
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [17.92, 82.75],
        zoom: 8,
        zoomControl: false,
        scrollWheelZoom: false,
        attributionControl: true,
      });

      // Fit regional bounds
      map.fitBounds(REGIONAL_BOUNDS, { padding: [30, 30] });

      mapInstanceRef.current = map;
      markersGroupRef.current = L.layerGroup().addTo(map);
    }

    const map = mapInstanceRef.current;

    // Update Tile Layer
    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    const currentStyle = MAP_STYLES[mapStyle];
    tileLayerRef.current = L.tileLayer(currentStyle.url, {
      subdomains: currentStyle.subdomains || "abc",
      attribution: currentStyle.attribution,
      maxZoom: currentStyle.maxZoom,
    }).addTo(map);

    // Update Markers
    if (markersGroupRef.current) {
      markersGroupRef.current.clearLayers();

      filteredLocations.forEach((loc) => {
        const isSelected = loc.id === selectedLocationId;
        const typeClass =
          loc.type === "Headquarters"
            ? "laya-pin-badge--hq"
            : loc.type === "Health & Training Center"
            ? "laya-pin-badge--health"
            : "laya-pin-badge--field";

        const iconSvg =
          loc.type === "Headquarters"
            ? `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M16 14h.01"/></svg>`
            : loc.type === "Health & Training Center"
            ? `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66"/></svg>`
            : `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>`;

        const html = `
          <div class="laya-pin-badge ${typeClass} ${isSelected ? "laya-pin-badge--selected" : ""}">
            ${isSelected ? '<span class="laya-pin-pulse"></span>' : ""}
            <span class="laya-pin-badge__icon-wrap">${iconSvg}</span>
            <span class="laya-pin-badge__title">${loc.shortName}</span>
          </div>
        `;

        const customIcon = L.divIcon({
          html,
          className: "laya-leaflet-marker",
          iconSize: [140, 36],
          iconAnchor: [70, 36],
        });

        const marker = L.marker([loc.coordinates.lat, loc.coordinates.lng], {
          icon: customIcon,
          zIndexOffset: isSelected ? 1000 : 100,
        });

        marker.on("click", () => {
          setSelectedLocationId(loc.id);
          map.flyTo([loc.coordinates.lat, loc.coordinates.lng], 10, { duration: 0.8 });
        });

        markersGroupRef.current?.addLayer(marker);
      });
    }

    // Gentle size invalidation for layout stability
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [viewMode, mapStyle, selectedDistrictId, selectedLocationId, filteredLocations]);

  // Handle District Switch with Bounds Zoom
  const handleDistrictChange = (districtId: string) => {
    setSelectedDistrictId(districtId);

    const firstMatch =
      districtId === "all"
        ? VERIFIED_LOCATIONS[0]
        : VERIFIED_LOCATIONS.find((l) => {
            const dist = VERIFIED_DISTRICTS.find((d) => d.id === districtId);
            return dist ? l.district.toLowerCase() === dist.name.toLowerCase() : true;
          });

    if (firstMatch) {
      setSelectedLocationId(firstMatch.id);
    }

    if (mapInstanceRef.current) {
      if (districtId === "all") {
        mapInstanceRef.current.flyToBounds(REGIONAL_BOUNDS, {
          padding: [30, 30],
          duration: 1.0,
        });
      } else if (DISTRICT_BOUNDS[districtId]) {
        mapInstanceRef.current.flyToBounds(DISTRICT_BOUNDS[districtId], {
          padding: [40, 40],
          duration: 1.0,
        });
      }
    }
  };

  const handleSelectLocation = (loc: VerifiedLocation) => {
    setSelectedLocationId(loc.id);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([loc.coordinates.lat, loc.coordinates.lng], 10, {
        duration: 0.8,
      });
    }
  };

  const handleResetView = () => {
    setSelectedDistrictId("all");
    setSelectedLocationId(VERIFIED_LOCATIONS[0].id);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyToBounds(REGIONAL_BOUNDS, {
        padding: [30, 30],
        duration: 1.0,
      });
    }
  };

  return (
    <div className="w-full">
      {/* Top Controls: District Selector & View Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border-subtle">
        {/* District Filter Pills */}
        <div
          className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 sm:flex-wrap scrollbar-none max-w-full"
          role="tablist"
          aria-label="Filter locations by district"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 mr-2 flex items-center gap-1 shrink-0">
            <Compass className="w-3.5 h-3.5 text-[#7664B5]" /> Filter:
          </span>
          <button
            type="button"
            role="tab"
            aria-selected={selectedDistrictId === "all"}
            onClick={() => handleDistrictChange("all")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-none transition-colors shrink-0 ${
              selectedDistrictId === "all"
                ? "bg-[#7664B5] text-white"
                : "bg-surface-warm text-neutral-700 hover:bg-neutral-200"
            }`}
          >
            All Districts ({VERIFIED_LOCATIONS.length})
          </button>
          {VERIFIED_DISTRICTS.map((dist) => (
            <button
              key={dist.id}
              type="button"
              role="tab"
              aria-selected={selectedDistrictId === dist.id}
              onClick={() => handleDistrictChange(dist.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-none transition-colors shrink-0 ${
                selectedDistrictId === dist.id
                  ? "bg-[#7664B5] text-white"
                  : "bg-surface-warm text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              {dist.name}
            </button>
          ))}
        </div>

        {/* View Toggle (Map / List) */}
        <div className="flex items-center gap-1 self-start sm:self-auto bg-surface-warm p-1 border border-border-subtle">
          <button
            type="button"
            onClick={() => setViewMode("map")}
            aria-pressed={viewMode === "map"}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-wider transition-colors ${
              viewMode === "map"
                ? "bg-white text-neutral-900 shadow-xs"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#7664B5]" /> Interactive Map
          </button>
          <button
            type="button"
            onClick={() => setViewMode("list")}
            aria-pressed={viewMode === "list"}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-wider transition-colors ${
              viewMode === "list"
                ? "bg-white text-neutral-900 shadow-xs"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            <ListFilter className="w-3.5 h-3.5 text-[#7664B5]" /> Detailed Directory
          </button>
        </div>
      </div>

      {/* Main Interactive Map & Details View */}
      {viewMode === "map" ? (
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left/Center: Real Interactive Cartographic Map (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-border-subtle p-3 sm:p-5 relative shadow-xs">
            {/* Map Canvas Header with Geographic Scope Indicator */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-2 border-b border-border-subtle text-[11px] text-neutral-500 gap-2">
              <span className="font-semibold text-neutral-800 uppercase tracking-wider flex items-center gap-1.5">
                <Mountain className="w-3.5 h-3.5 text-[#7664B5]" />
                Eastern Ghats Regional Footprint · Andhra Pradesh
              </span>
              <span className="font-mono text-neutral-500 text-[10px]">
                17.2° N – 19.0° N · 81.5° E – 84.0° E
              </span>
            </div>

            {/* Interactive Leaflet Map Wrapper */}
            <div
              className="laya-map-wrapper"
              role="region"
              aria-label="Interactive map of LAYA field hubs across the Eastern Ghats"
            >
              <div ref={mapContainerRef} className="laya-leaflet-container" />

              {/* Floating Map Style Switcher (Top Right) */}
              <div className="absolute top-3 right-3 z-[400] bg-white/95 backdrop-blur-xs border border-neutral-300 p-1 shadow-md flex items-center gap-1">
                {(Object.keys(MAP_STYLES) as MapStyleKey[]).map((styleKey) => {
                  const cfg = MAP_STYLES[styleKey];
                  const Icon = cfg.icon;
                  const isActive = mapStyle === styleKey;
                  return (
                    <button
                      key={styleKey}
                      type="button"
                      onClick={() => setMapStyle(styleKey)}
                      aria-pressed={isActive}
                      className={`inline-flex items-center gap-1 px-2 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors ${
                        isActive
                          ? "bg-[#7664B5] text-white shadow-xs"
                          : "text-neutral-700 hover:bg-neutral-100"
                      }`}
                      title={cfg.name}
                    >
                      <Icon className="w-3 h-3" />
                      <span className="hidden sm:inline">{cfg.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Floating Zoom & Fit-All Controls (Bottom Right) */}
              <div className="absolute bottom-6 right-3 z-[400] flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => mapInstanceRef.current?.zoomIn()}
                  aria-label="Zoom in map"
                  className="w-8 h-8 bg-white border border-neutral-300 shadow-md flex items-center justify-center text-neutral-700 hover:text-[#7664B5] hover:bg-neutral-50 transition-colors"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => mapInstanceRef.current?.zoomOut()}
                  aria-label="Zoom out map"
                  className="w-8 h-8 bg-white border border-neutral-300 shadow-md flex items-center justify-center text-neutral-700 hover:text-[#7664B5] hover:bg-neutral-50 transition-colors"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleResetView}
                  aria-label="Reset map view to whole region"
                  title="Fit All Hubs"
                  className="w-8 h-8 bg-white border border-neutral-300 shadow-md flex items-center justify-center text-neutral-700 hover:text-[#7664B5] hover:bg-neutral-50 transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Map Floating Legend (Desktop/Tablet) */}
              <div className="hidden sm:flex absolute bottom-6 left-3 z-[400] bg-white/95 backdrop-blur-xs border border-neutral-300 p-2 shadow-md text-[10px] flex-col gap-1 max-w-[210px] pointer-events-auto">
                <span className="font-bold text-neutral-800 uppercase tracking-wider mb-0.5 border-b border-neutral-200 pb-0.5">
                  Institutional Footprint
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#7664B5] shrink-0" />
                  <span className="text-neutral-700 leading-tight">Headquarters (Visakhapatnam)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7] shrink-0" />
                  <span className="text-neutral-700 leading-tight">Health Campus (Vanantharam)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7] shrink-0" />
                  <span className="text-neutral-700 leading-tight">Agency Field Hubs (ASR / Srikakulam)</span>
                </div>
              </div>
            </div>

            {/* Mobile Map Legend rendered beneath canvas so map markers remain unblocked */}
            <div className="flex sm:hidden flex-wrap items-center gap-x-4 gap-y-1.5 mt-2.5 pt-2 border-t border-border-subtle text-[11px] text-neutral-700">
              <span className="font-bold text-neutral-900 uppercase tracking-wider text-[10px]">
                Key:
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7664B5] shrink-0" />
                <span>Headquarters</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7] shrink-0" />
                <span>Health Campus &amp; Field Hubs</span>
              </div>
            </div>

            {/* Direct Location Quick Reference Strip */}
            <div className="mt-4 pt-3 border-t border-border-subtle">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-2 block">
                Field Hub Reference &amp; Verified Coordinates:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {filteredLocations.map((loc) => {
                  const isSelected = loc.id === selectedLocationId;
                  return (
                    <div
                      key={loc.id}
                      onClick={() => handleSelectLocation(loc)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs cursor-pointer border transition-colors ${
                        isSelected
                          ? "bg-purple-50 text-[#5D4B94] border-[#7664B5] font-semibold"
                          : "bg-surface-warm text-neutral-600 border-neutral-200 hover:border-neutral-300"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${
                          loc.type === "Headquarters"
                            ? "bg-[#7664B5]"
                            : loc.type === "Health & Training Center"
                            ? "bg-[#0284c7]"
                            : "bg-[#0ea5e9]"
                        }`}
                      />
                      <span>{loc.shortName}</span>
                      <span className="text-[10px] text-neutral-400 font-mono">
                        {loc.coordinates.lat.toFixed(2)}°N, {loc.coordinates.lng.toFixed(2)}°E
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footnote */}
            <p className="text-[11px] text-neutral-500 mt-3 text-center">
              Click or tap any pin on the map or hub button to reveal detailed verified operational records and programme linkages.
            </p>
          </div>

          {/* Right: Selected Location Evidence Card (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-border-subtle p-5 sm:p-6 shadow-xs flex flex-col justify-between h-full">
            <div>
              {/* Type Badge & District */}
              <div className="flex items-center justify-between gap-2 border-b border-border-subtle pb-3">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${
                    selectedLocation.type === "Headquarters"
                      ? "bg-purple-100 text-[#5D4B94]"
                      : selectedLocation.type === "Health & Training Center"
                      ? "bg-blue-100 text-[#0369a1]"
                      : "bg-neutral-100 text-neutral-800"
                  }`}
                >
                  {selectedLocation.type === "Headquarters" ? (
                    <Building2 className="w-3.5 h-3.5" />
                  ) : selectedLocation.type === "Health & Training Center" ? (
                    <HeartPulse className="w-3.5 h-3.5" />
                  ) : (
                    <MapPin className="w-3.5 h-3.5" />
                  )}
                  {selectedLocation.type}
                </span>

                <span className="text-xs font-semibold text-neutral-500">
                  {selectedLocation.district} District
                </span>
              </div>

              {/* Title & Postal Verification */}
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 mt-4 leading-snug">
                {selectedLocation.name}
              </h3>

              <div className="mt-3 p-3 bg-surface-warm/70 border-l-2 border-[#7664B5] text-xs text-neutral-700 space-y-1">
                <p>
                  <strong>Address:</strong> {selectedLocation.address}
                </p>
                <p>
                  <strong>Postal PIN:</strong> {selectedLocation.pincode} · {selectedLocation.state}
                </p>
                <p className="text-[11px] text-neutral-500 font-mono">
                  <strong>Coordinates:</strong> {selectedLocation.coordinates.lat.toFixed(4)}° N, {selectedLocation.coordinates.lng.toFixed(4)}° E
                </p>
              </div>

              {/* Operational Role */}
              <div className="mt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                  Operational Scope:
                </h4>
                <p className="text-sm text-neutral-800 leading-relaxed">
                  {selectedLocation.operationalRole}
                </p>
              </div>

              {/* Verified Background Description */}
              <div className="mt-3">
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {selectedLocation.description}
                </p>
              </div>

              {/* Linked Programmes */}
              <div className="mt-5 pt-4 border-t border-border-subtle">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-600 mb-2">
                  Key Linked Programmes:
                </h4>
                <div className="space-y-2">
                  {selectedLocation.primaryProgrammes.map((prog, pIdx) => (
                    <Link
                      key={pIdx}
                      to={prog.route}
                      className="group flex items-center justify-between p-2.5 bg-neutral-50 hover:bg-purple-50/60 border border-neutral-200 transition-colors"
                    >
                      <div>
                        <span className="block text-xs font-bold text-neutral-900 group-hover:text-[#7664B5] transition-colors">
                          {prog.title}
                        </span>
                        <span className="text-[10px] text-neutral-500 font-medium">
                          {prog.category}
                        </span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#7664B5] transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Source & Provenance Tag */}
            <div className="mt-6 pt-3 border-t border-border-subtle flex items-center justify-between text-[11px] text-neutral-500">
              <span>
                <strong>Source:</strong> {selectedLocation.source}
              </span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* Alternative View: Structured Accessible Table / List View */
        <div className="mt-8 border border-border-subtle bg-white overflow-hidden shadow-xs">
          <div className="p-4 bg-neutral-50 border-b border-border-subtle flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-700">
              Verified Institutional Directory ({filteredLocations.length} Locations)
            </span>
            <span className="text-xs text-neutral-500">
              Alluri Sitharama Raju, Visakhapatnam, East Godavari, Srikakulam
            </span>
          </div>

          <div className="divide-y divide-border-subtle">
            {filteredLocations.map((loc) => (
              <div key={loc.id} className="p-5 hover:bg-neutral-50/50 transition-colors">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                  <div className="md:col-span-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-neutral-100 text-neutral-700">
                        {loc.type}
                      </span>
                      <span className="text-xs font-semibold text-[#7664B5]">
                        {loc.district}
                      </span>
                    </div>
                    <h4 className="font-serif text-lg font-bold text-neutral-900">
                      {loc.name}
                    </h4>
                    <p className="text-xs text-neutral-600 mt-1">
                      {loc.address} · PIN {loc.pincode}
                    </p>
                    <p className="text-[10px] text-neutral-400 font-mono mt-0.5">
                      {loc.coordinates.lat.toFixed(4)}° N, {loc.coordinates.lng.toFixed(4)}° E
                    </p>
                  </div>

                  <div className="md:col-span-5">
                    <p className="text-xs text-neutral-800 leading-relaxed">
                      {loc.operationalRole}
                    </p>
                    <p className="text-[11px] text-neutral-500 mt-1">
                      {loc.description}
                    </p>
                  </div>

                  <div className="md:col-span-3 flex flex-col gap-1.5 md:items-end">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                      Linked Work:
                    </span>
                    {loc.primaryProgrammes.map((prog, pIdx) => (
                      <Link
                        key={pIdx}
                        to={prog.route}
                        className="text-xs font-bold text-[#7664B5] hover:text-[#5D4B94] inline-flex items-center gap-1"
                      >
                        {prog.title} <ArrowRight className="w-3 h-3" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cartographic Transparency & Data Integrity Notice */}
      <div className="mt-8 p-4 bg-white border border-border-subtle border-l-4 border-l-[#59BCE8] shadow-xs">
        <div className="flex items-start gap-3">
          <Info className="w-4 h-4 text-[#0284c7] shrink-0 mt-0.5" />
          <div className="text-xs text-neutral-700 leading-relaxed space-y-1">
            <p>
              <strong>Regional Scope:</strong> {GEOGRAPHICAL_DATA_AUDIT.regionalScope}
            </p>
            <p>
              <strong>Data Scope &amp; Privacy Notice:</strong> {GEOGRAPHICAL_DATA_AUDIT.privacyNotice}
            </p>
            <p className="text-neutral-500">
              <strong>Methodology:</strong> {GEOGRAPHICAL_DATA_AUDIT.methodologyNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
