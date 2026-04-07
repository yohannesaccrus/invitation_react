import { useState, useEffect } from 'react'
import { useMusic } from './components/MusicProvider'
import FloatingToggle from './components/FloatingToggle'
import { MailOpen } from 'lucide-react'

function App() {
  const { playMusic, isStarted } = useMusic()
  const [isOpen, setIsOpen] = useState(false)
  const [recipient, setRecipient] = useState("Jangan Diganti!")

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const to = params.get("to")
    if (to) setRecipient(to)
  }, [])

  const handleOpen = () => {
    playMusic()
    setIsOpen(true)
  }

  if (!isOpen && !isStarted) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-black">
        {/* Cover Overlay */}
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
          <img 
            src="/bg.jpg" 
            alt="Cover Background" 
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm" />
          
          <div className="absolute top-[15%] left-0 right-0 z-20 flex flex-col items-center justify-center text-center px-6">
            <p className="font-italiana text-xs font-semibold tracking-[0.2em] text-rose-200 uppercase mb-3 drop-shadow-lg">
              Dear, special guest
            </p>
            <div className="rounded-xl border border-white/20 bg-white/10 backdrop-blur-md px-8 py-3 shadow-2xl">
              <p className="font-playfair text-2xl font-medium text-white tracking-wide italic">
                {recipient}
              </p>
            </div>
          </div>

          <div className="relative z-50 flex flex-col items-center justify-center text-center px-6 pt-10">
            <p className="font-italiana text-sm font-medium tracking-[0.2em] text-rose-200 uppercase mb-8">
              The Wedding Of
            </p>
            <h1 className="font-tangerine text-8xl tracking-tight text-white sm:text-9xl md:text-[10rem] mb-6 drop-shadow-2xl">
              Accrus <span className="mx-2 font-normal text-[#f19066]">&amp;</span> Eren
            </h1>

            <div>
              <button
                onClick={handleOpen}
                className="group relative flex items-center justify-center space-x-3 overflow-visible rounded-full bg-white/95 backdrop-blur-md px-14 py-5 font-sans text-sm font-semibold tracking-[0.2em] text-neutral-900 transition-all hover:bg-white active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:cursor-pointer touch-manipulation"
              >
                <span>OPEN INVITATION</span>
                <MailOpen className="h-4 w-4 text-neutral-400 transition-colors group-hover:text-rose-400" />
                <div className="absolute inset-0 -z-10 animate-ping rounded-full bg-white/20" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900 transition-colors duration-1000 flex flex-col relative font-serif overflow-y-auto">
      {/* Background with blur and overlay */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/bg.jpg" 
          alt="" 
          className="h-full w-full object-cover opacity-20 blur-[10px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-neutral-200/40" />
      </div>

      <main className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center px-6 py-20 text-center">
        <header className="mb-16 flex flex-col items-center animate-in fade-in slide-in-from-top duration-1000">
          <p className="font-italiana text-[10px] font-bold tracking-[0.4em] text-neutral-500 uppercase mb-8">
            Wedding Celebration
          </p>
          <div className="z-10 max-w-lg w-full items-center justify-between font-mono text-xs mb-8">
            <p className="flex w-full justify-center border border-black/5 bg-white/40 pb-4 pt-4 backdrop-blur-xl rounded-full shadow-sm">
              The music is now playing for&nbsp;
              <code className="font-bold">{recipient}</code>
            </p>
          </div>
          <h2 className="font-tangerine text-7xl text-neutral-800 md:text-9xl tracking-tight leading-tight">
            Main Events
          </h2>
          <div className="w-12 h-[1px] bg-neutral-800/20 mt-10" />
        </header>

        <section className="grid gap-12 md:grid-cols-2 w-full max-w-4xl px-4 animate-in fade-in slide-in-from-bottom duration-1000 delay-300 fill-mode-both">
          {/* Example Invitation Card 1 */}
          <div className="group relative overflow-hidden rounded-[2rem] border border-black/5 bg-white/40 backdrop-blur-xl p-10 shadow-2xl transition-all hover:scale-[1.02]">
            <h3 className="font-italiana text-xs font-bold tracking-widest text-neutral-500 uppercase mb-4">The Ceremony</h3>
            <p className="font-playfair text-3xl font-medium text-neutral-800 italic mb-2">Holy Matrimony</p>
            <p className="font-sans text-sm tracking-widest text-neutral-400 uppercase mb-6">06 June 2026</p>
            <div className="h-px w-8 bg-neutral-200 mx-auto" />
          </div>

          {/* Example Invitation Card 2 */}
          <div className="group relative overflow-hidden rounded-[2rem] border border-black/5 bg-white/40 backdrop-blur-xl p-10 shadow-2xl transition-all hover:scale-[1.02]">
            <h3 className="font-italiana text-xs font-bold tracking-widest text-neutral-500 uppercase mb-4">The Reception</h3>
            <p className="font-playfair text-3xl font-medium text-neutral-800 italic mb-2">Grand Ballroom</p>
            <p className="font-sans text-sm tracking-widest text-neutral-400 uppercase mb-6">19:00 - 21:00</p>
            <div className="h-px w-8 bg-neutral-200 mx-auto" />
          </div>
        </section>

        <footer className="mt-auto pt-20 pb-10 text-center animate-in fade-in duration-1000 delay-700 fill-mode-both">
          <p className="font-italiana text-[10px] font-bold tracking-[0.3em] text-neutral-400 uppercase">
            Scrolling down for more details
          </p>
        </footer>
      </main>
      
      <FloatingToggle />
    </div>
  )
}

export default App
