"use client";

import { motion, AnimatePresence } from "motion/react";
import { ZLogoSVG } from "./ZLogoSVG";

interface VoiceIndicatorProps {
  isVisible: boolean;
}

export function VoiceIndicator({ isVisible }: VoiceIndicatorProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 left-1/2 z-40"
          initial={{ opacity: 0, scale: 0.8, x: "-50%", y: 20 }}
          animate={{ opacity: 1, scale: 1, x: "-50%", y: 0 }}
          exit={{ opacity: 0, scale: 0.9, x: "-50%", y: 10 }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
        >
          {/* Glow effect behind logo */}
          <div className="absolute inset-0 rounded-full bg-cyan-400/30 blur-xl scale-150" />

          {/* Logo with shadow */}
          <div className="relative drop-shadow-2xl">
            <ZLogoSVG size={80} animated={true} />
          </div>

          {/* Subtle pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-cyan-400/50"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeOut",
            }}
            style={{ width: 80, height: 80 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default VoiceIndicator;
