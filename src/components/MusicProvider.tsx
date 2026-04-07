import React, { createContext, useContext, useRef, useState, useEffect, useCallback } from "react";
import { Howl } from "howler";

interface MusicContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playMusic: () => void;
  isStarted: boolean;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const howlRef = useRef<Howl | null>(null);

  useEffect(() => {
    if (!howlRef.current) {
      howlRef.current = new Howl({
        src: ["/ost.mp3"],
        loop: true,
        html5: true,
        preload: true,
        volume: 1.0,
      });
    }

    return () => {
      if (howlRef.current) {
        howlRef.current.unload();
        howlRef.current = null;
      }
    };
  }, []);

  const toggleMute = useCallback(() => {
    if (!howlRef.current) return;
    
    const sound = howlRef.current;
    
    if (!isStarted || !sound.playing()) {
      sound.play();
      setIsStarted(true);
      setIsMuted(false);
      sound.mute(false);
      return;
    }
    
    const nextMuted = !isMuted;
    sound.mute(nextMuted);
    setIsMuted(nextMuted);
  }, [isMuted, isStarted]);

  const playMusic = useCallback(() => {
    if (!howlRef.current) return;
    
    const sound = howlRef.current;
    
    if (sound.playing()) return;

    sound.play();
    setIsStarted(true);
    sound.mute(false);
    setIsMuted(false);
  }, []);

  return (
    <MusicContext.Provider value={{ isMuted, toggleMute, playMusic, isStarted }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
}
