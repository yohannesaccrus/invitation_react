import { useMusic } from "./MusicProvider";
import { Volume2, VolumeX } from "lucide-react";

export default function FloatingToggle() {
  const { isMuted, toggleMute, isStarted } = useMusic();

  if (!isStarted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <button
        onClick={toggleMute}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-white/80 text-neutral-900 shadow-2xl backdrop-blur-xl transition-all hover:scale-110 active:scale-95 border border-black/5"
        aria-label={isMuted ? "Unmute music" : "Mute music"}
      >
        {isMuted ? (
          <VolumeX className="h-6 w-6" />
        ) : (
          <Volume2 className="h-6 w-6 animate-pulse" />
        )}
      </button>
    </div>
  );
}
