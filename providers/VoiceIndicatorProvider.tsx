"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { VoiceIndicator } from "@/components/ui/VoiceIndicator";

interface VoiceIndicatorContextType {
  isVisible: boolean;
  show: () => void;
  hide: () => void;
  toggle: () => void;
}

const VoiceIndicatorContext = createContext<VoiceIndicatorContextType | undefined>(
  undefined
);

// Extend window interface for global access
declare global {
  interface Window {
    __voiceIndicator?: {
      show: () => void;
      hide: () => void;
      toggle: () => void;
    };
  }
}

export function VoiceIndicatorProvider({ children }: { children: ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);

  const show = useCallback(() => {
    setIsVisible(true);
  }, []);

  const hide = useCallback(() => {
    setIsVisible(false);
  }, []);

  const toggle = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);

  // Set up window event listeners for external voice system
  useEffect(() => {
    const handleShow = () => show();
    const handleHide = () => hide();

    // Listen for custom events
    window.addEventListener("voice-indicator-show", handleShow);
    window.addEventListener("voice-indicator-hide", handleHide);

    // Expose global functions for external access
    window.__voiceIndicator = {
      show,
      hide,
      toggle,
    };

    return () => {
      window.removeEventListener("voice-indicator-show", handleShow);
      window.removeEventListener("voice-indicator-hide", handleHide);
      delete window.__voiceIndicator;
    };
  }, [show, hide, toggle]);

  return (
    <VoiceIndicatorContext.Provider value={{ isVisible, show, hide, toggle }}>
      {children}
      <VoiceIndicator isVisible={isVisible} />
    </VoiceIndicatorContext.Provider>
  );
}

export function useVoiceIndicator() {
  const context = useContext(VoiceIndicatorContext);
  if (context === undefined) {
    throw new Error(
      "useVoiceIndicator must be used within a VoiceIndicatorProvider"
    );
  }
  return context;
}
