import { useState } from 'react'
import { useMusic } from './components/MusicProvider'
import FloatingToggle from './components/FloatingToggle'
import { Play } from 'lucide-react'

function App() {
  const { playMusic, isStarted } = useMusic()
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    playMusic()
    setIsOpen(true)
  }

  if (!isOpen && !isStarted) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-neutral-950 p-6 text-white overflow-hidden relative">
        <div className="z-10 flex flex-col items-center space-y-8 text-center animate-in fade-in zoom-in duration-1000">
          <div className="space-y-4">
            <h1 className="text-4xl font-light tracking-[0.3em] sm:text-6xl uppercase">
              WELCOME
            </h1>
            <p className="text-sm font-medium tracking-[0.4em] text-neutral-400 uppercase">
              You are invited to our special day
            </p>
          </div>

          <button
            onClick={handleOpen}
            className="group relative flex items-center space-x-3 overflow-visible rounded-full bg-white px-12 py-5 text-sm font-bold tracking-[0.2em] text-neutral-950 transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            <span>OPEN INVITATION</span>
            <Play className="h-4 w-4 fill-current transition-transform group-hover:translate-x-1" />
            
            <div className="absolute inset-0 -z-10 animate-ping rounded-full bg-white/10" />
          </button>
        </div>
        
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent)]" />
      </main>
    )
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900 transition-colors duration-1000">
      <main className="flex flex-col items-center justify-center p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex mb-16 animate-in slide-in-from-top duration-700">
          <p className="flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4">
            The music is now playing!&nbsp;
          </p>
        </div>

        <div className="relative flex place-items-center text-center flex-col space-y-8 animate-in fade-in slide-in-from-bottom duration-1000">
          <h2 className="text-6xl font-bold tracking-tight">Main Content</h2>
          <p className="text-neutral-500 max-w-md text-lg leading-relaxed">
            This is your React-based invitation. The audio context is unlocked and the background music is active.
          </p>
        </div>

        <div className="mt-20 text-center text-xs tracking-[0.3em] text-neutral-400 uppercase animate-pulse">
          Use the button below to toggle mute
        </div>
      </main>
      
      <FloatingToggle />
    </div>
  )
}

export default App
