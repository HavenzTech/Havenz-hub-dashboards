"use client";

import { classNames } from "@/lib/utils";

interface AuroraBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

export function AuroraBackground({ className, children }: AuroraBackgroundProps) {
  return (
    <div className={classNames("relative w-full h-full overflow-hidden bg-brand-dark", className)}>
      {/* Aurora blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large teal blob */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[120px] animate-aurora-1"
          style={{
            background: "radial-gradient(circle, #00b894 0%, transparent 70%)",
            top: "-10%",
            left: "-10%",
          }}
        />

        {/* Large blue blob */}
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-15 blur-[100px] animate-aurora-2"
          style={{
            background: "radial-gradient(circle, #0984c4 0%, transparent 70%)",
            top: "30%",
            right: "-5%",
          }}
        />

        {/* Medium purple blob */}
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-10 blur-[80px] animate-aurora-3"
          style={{
            background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
            bottom: "10%",
            left: "20%",
          }}
        />

        {/* Small accent blob */}
        <div
          className="absolute w-[300px] h-[300px] rounded-full opacity-15 blur-[60px] animate-aurora-4"
          style={{
            background: "radial-gradient(circle, #00b894 0%, transparent 70%)",
            bottom: "30%",
            right: "30%",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>

      <style jsx>{`
        @keyframes aurora-1 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(5%, 10%) scale(1.1);
          }
          50% {
            transform: translate(10%, 5%) scale(1);
          }
          75% {
            transform: translate(5%, -5%) scale(1.05);
          }
        }

        @keyframes aurora-2 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(-10%, 5%) scale(1.05);
          }
          50% {
            transform: translate(-5%, 10%) scale(1.1);
          }
          75% {
            transform: translate(5%, 5%) scale(1);
          }
        }

        @keyframes aurora-3 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(10%, -5%) scale(1.1);
          }
          50% {
            transform: translate(5%, -10%) scale(1);
          }
          75% {
            transform: translate(-5%, -5%) scale(1.05);
          }
        }

        @keyframes aurora-4 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(-5%, 10%) scale(1.05);
          }
          50% {
            transform: translate(-10%, -5%) scale(1.1);
          }
          75% {
            transform: translate(5%, -10%) scale(1);
          }
        }

        .animate-aurora-1 {
          animation: aurora-1 20s ease-in-out infinite;
        }

        .animate-aurora-2 {
          animation: aurora-2 25s ease-in-out infinite;
        }

        .animate-aurora-3 {
          animation: aurora-3 30s ease-in-out infinite;
        }

        .animate-aurora-4 {
          animation: aurora-4 22s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
