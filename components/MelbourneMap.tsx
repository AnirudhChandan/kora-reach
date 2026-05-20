"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

type Region = {
  id: string;
  name: string;
  label: string;
  tooltip: string;
  path: string;
  labelPos: { x: number; y: number };
  covered: boolean;
};

const regions: Region[] = [
  {
    id: "inner",
    name: "Inner Melbourne",
    label: "Inner",
    tooltip: "We serve the inner Melbourne area including CBD, Southbank, Carlton, Fitzroy, Richmond, and surrounding suburbs.",
    labelPos: { x: 210, y: 235 },
    covered: true,
    path: "M185,195 L225,185 L250,200 L255,230 L240,260 L210,265 L185,250 L175,225 Z",
  },
  {
    id: "north",
    name: "Northern Suburbs",
    label: "North",
    tooltip: "We cover northern suburbs including Brunswick, Coburg, Preston, Reservoir, Thomastown, and Epping.",
    labelPos: { x: 210, y: 130 },
    covered: true,
    path: "M150,70 L190,55 L245,60 L270,85 L265,120 L250,155 L235,180 L225,185 L185,195 L175,225 L155,195 L140,155 L135,115 Z",
  },
  {
    id: "west",
    name: "Western Suburbs",
    label: "West",
    tooltip: "We serve western Melbourne including Footscray, Sunshine, Werribee, Williamstown, and Altona.",
    labelPos: { x: 110, y: 250 },
    covered: true,
    path: "M30,175 L80,140 L135,115 L140,155 L155,195 L175,225 L185,250 L180,280 L155,310 L115,320 L70,300 L40,270 L25,230 Z",
  },
  {
    id: "east",
    name: "Eastern Suburbs",
    label: "East",
    tooltip: "We cover eastern suburbs including Hawthorn, Box Hill, Doncaster, Ringwood, and surrounds.",
    labelPos: { x: 330, y: 195 },
    covered: true,
    path: "M265,120 L310,100 L365,110 L390,145 L385,190 L370,225 L340,250 L300,260 L255,230 L250,200 L225,185 L235,180 L250,155 Z",
  },
  {
    id: "southeast",
    name: "South-East Suburbs",
    label: "South-East",
    tooltip: "We serve the south-east including Glen Waverley, Dandenong, Cranbourne, and Frankston areas.",
    labelPos: { x: 310, y: 320 },
    covered: true,
    path: "M255,230 L300,260 L340,250 L370,280 L375,330 L355,375 L310,390 L260,375 L225,340 L210,305 L210,265 L240,260 Z",
  },
  {
    id: "south",
    name: "Southern Suburbs",
    label: "South",
    tooltip: "Coverage includes St Kilda, Brighton, Moorabbin, and bayside areas. Contact us to confirm your specific suburb.",
    labelPos: { x: 195, y: 330 },
    covered: true,
    path: "M115,320 L155,310 L180,280 L185,250 L210,265 L210,305 L225,340 L215,370 L180,385 L140,375 L105,350 Z",
  },
];

export default function MelbourneMap() {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const active = regions.find((r) => r.id === activeRegion);

  return (
    <section className="py-24 bg-brand-warmNeutral">
      <div className="container-custom">
        <div className="text-center mb-12">
          <p className="text-xs font-sans font-semibold tracking-[0.2em] uppercase text-brand-dark/40 mb-4">
            Coverage Area
          </p>
          <h2 className="mb-4">Where we operate in Melbourne</h2>
          <p className="text-lg text-brand-dark/60 font-sans max-w-xl mx-auto">
            We provide NDIS support across the entire Melbourne metropolitan area.
            Hover over a region to learn more.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          {/* Map */}
          <div className="md:col-span-7">
            <div className="relative">
              <svg
                viewBox="0 0 420 440"
                className="w-full h-auto"
                role="img"
                aria-label="Interactive map of Melbourne metropolitan coverage areas"
              >
                {/* Water / bay */}
                <ellipse
                  cx="140"
                  cy="410"
                  rx="130"
                  ry="50"
                  fill="var(--color-brand-lightGreen)"
                  opacity="0.5"
                />
                <text x="140" y="418" textAnchor="middle" fontSize="11" fill="var(--color-brand-green)" opacity="0.4" fontFamily="var(--font-sans)">
                  Port Phillip Bay
                </text>

                {/* Regions */}
                {regions.map((region) => {
                  const isActive = activeRegion === region.id;
                  return (
                    <g key={region.id}>
                      <path
                        d={region.path}
                        fill={isActive ? "var(--color-brand-green)" : "var(--color-brand-lightGreen)"}
                        stroke="var(--color-brand-green)"
                        strokeWidth={isActive ? "2.5" : "1.5"}
                        opacity={isActive ? 1 : activeRegion ? 0.5 : 0.8}
                        className="cursor-pointer"
                        style={{
                          transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                        }}
                        onMouseEnter={() => setActiveRegion(region.id)}
                        onMouseLeave={() => setActiveRegion(null)}
                      />
                      <text
                        x={region.labelPos.x}
                        y={region.labelPos.y}
                        textAnchor="middle"
                        fontSize="12"
                        fontWeight="600"
                        fill={isActive ? "#ffffff" : "var(--color-brand-green)"}
                        fontFamily="var(--font-sans)"
                        className="pointer-events-none select-none"
                        style={{ transition: "fill 0.3s ease" }}
                      >
                        {region.label}
                      </text>
                    </g>
                  );
                })}

                {/* CBD dot */}
                <circle cx="215" cy="230" r="4" fill="var(--color-brand-accent)" />
                <text
                  x="215"
                  y="220"
                  textAnchor="middle"
                  fontSize="9"
                  fill="var(--color-brand-accent)"
                  fontWeight="700"
                  fontFamily="var(--font-sans)"
                  className="pointer-events-none"
                >
                  CBD
                </text>
              </svg>
            </div>
          </div>

          {/* Info panel */}
          <div className="md:col-span-5">
            <div
              className="bg-white rounded-2xl shadow-elevated-lg p-8 border border-brand-lightGreen min-h-[280px] flex flex-col justify-between"
              style={{
                transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              {active ? (
                <div className="animate-in fade-in duration-200" key={active.id}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-brand-green flex items-center justify-center">
                      <MapPin size={18} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-serif">{active.name}</h3>
                      <span className="text-xs font-sans font-semibold tracking-wider uppercase text-brand-accent">
                        {active.covered ? "We cover this area" : "Limited coverage"}
                      </span>
                    </div>
                  </div>
                  <p className="text-brand-dark/70 font-sans leading-relaxed mb-6">
                    {active.tooltip}
                  </p>
                  <Link
                    href={`/contact?region=${encodeURIComponent(active.name)}`}
                    className="btn-primary flex items-center gap-2 w-fit group text-sm"
                  >
                    Enquire for {active.label}
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center h-full py-4">
                  <div className="w-14 h-14 rounded-full bg-brand-lightGreen flex items-center justify-center mb-4">
                    <MapPin size={24} className="text-brand-green" />
                  </div>
                  <h3 className="text-lg font-serif mb-2">Select a Region</h3>
                  <p className="text-brand-dark/50 font-sans text-sm leading-relaxed max-w-xs">
                    Hover over or tap a region on the map to see coverage details
                    and start an enquiry for your area.
                  </p>
                </div>
              )}
            </div>

            {/* Quick region list for mobile */}
            <div className="mt-4 md:hidden">
              <div className="grid grid-cols-2 gap-2">
                {regions.map((region) => (
                  <button
                    key={region.id}
                    onClick={() => setActiveRegion(activeRegion === region.id ? null : region.id)}
                    className="text-left px-4 py-3 rounded-xl text-sm font-sans transition-all"
                    style={{
                      backgroundColor:
                        activeRegion === region.id
                          ? "var(--color-brand-green)"
                          : "var(--color-brand-lightGreen)",
                      color:
                        activeRegion === region.id
                          ? "#ffffff"
                          : "var(--color-brand-dark)",
                    }}
                  >
                    <MapPin size={12} className="inline mr-1.5" />
                    {region.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
