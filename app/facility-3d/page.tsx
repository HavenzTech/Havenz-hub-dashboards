"use client";

import dynamic from "next/dynamic";

const PowerPlantScene = dynamic(
  () => import("@/components/three/PowerPlantScene").then((m) => m.PowerPlantScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center text-white/60 text-sm">
        Loading 3D scene…
      </div>
    ),
  },
);

export default function Facility3DPage() {
  return (
    <main className="h-screen w-screen bg-[#0a1220] text-white overflow-hidden flex flex-col">
      <header className="px-8 pt-8 pb-4 shrink-0">
        <div className="text-[10px] uppercase tracking-[0.3em] text-[#00d4aa]">
          Facility · Live View
        </div>
        <h1 className="text-2xl font-semibold mt-1">Power Plant</h1>
        <p className="text-sm text-white/50 mt-1">
          Tap a glowing sensor to inspect its readings.
        </p>
      </header>

      <section className="flex-1 min-h-0 px-4 pb-4">
        <div className="w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-[#0a1220]">
          <PowerPlantScene />
        </div>
      </section>
    </main>
  );
}
