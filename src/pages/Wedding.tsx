import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Clock, Church, Heart } from "lucide-react";

function Countdown() {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // 06 June 2026, 09:00:00 (Month is 0-indexed, so 5 is June)
    const targetDate = new Date(2026, 5, 6, 9, 0, 0).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center space-x-4 md:space-x-12 mt-8">
      {[
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: timeLeft.hours },
        { label: "Mins", value: timeLeft.minutes },
        { label: "Secs", value: timeLeft.seconds },
      ].map((item) => (
        <div key={item.label} className="flex flex-col items-center bg-white/40 border border-[#2f3542]/10 backdrop-blur-md rounded-2xl w-20 h-24 md:w-28 md:h-32 justify-center shadow-sm">
          <span className="font-serif text-3xl md:text-5xl text-[#2f3542]">{String(item.value).padStart(2, '0')}</span>
          <span className="font-sans text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#57606f] uppercase mt-2">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function WeddingPage() {
  const [searchParams] = useSearchParams();
  const recipient = searchParams.get("to") || "Guest";

  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-50 font-serif">
      <img 
        src="/wedding.jpg" 
        alt="" 
        className="absolute inset-0 h-full w-full object-cover opacity-15 blur-[6px] grayscale-[30%]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/40 to-[#2f3542]/5" />

      <main className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center px-6 py-20 text-center">
        <div className="absolute top-10 left-6 lg:left-10 w-full text-left">
          <Link 
            to={`/?to=${encodeURIComponent(recipient)}`}
            className="group inline-flex items-center space-x-2 text-[#2f3542] transition-colors hover:text-neutral-900 bg-white/50 px-4 py-2 rounded-full border border-[#2f3542]/10 backdrop-blur-md"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="font-sans text-[10px] font-bold tracking-widest uppercase">Back Layout</span>
          </Link>
        </div>

        {/* Greetings Section */}
        <section className="mb-20 md:mb-32 flex flex-col items-center animate-in fade-in duration-1000 px-4 mt-8">
          <div className="w-12 h-12 rounded-full border border-[#2f3542]/20 flex items-center justify-center mb-6 bg-white/30 backdrop-blur-sm">
            <Heart className="h-4 w-4 text-[#2f3542]/60" fill="currentColor" />
          </div>
          <p className="font-playfair text-lg md:text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto italic border-l border-r border-[#2f3542]/20 px-8 py-2">
            "We invite you to share our joy and request your presence at the celebration of our Holy Matrimony."
          </p>
        </section>

        {/* Groom & Bride Section */}
        <section className="mb-24 md:mb-32 w-full animate-in slide-in-from-bottom duration-1000 delay-200 fill-mode-both">
          <div className="relative rounded-[3rem] border border-[#2f3542]/10 bg-white/60 backdrop-blur-2xl p-10 md:p-16 shadow-xl w-full">
            <div className="absolute inset-4 border border-[#2f3542]/5 rounded-[2.5rem] pointer-events-none" />
            
            <div className="grid md:grid-cols-[1fr_auto_1fr] items-center gap-12 relative z-10">
              {/* Groom */}
              <div className="flex flex-col items-center space-y-6">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg overflow-hidden relative">
                   <img src="/accrus.jpg" alt="Accrus" className="absolute inset-0 w-full h-full object-cover object-center" />
                   <div className="absolute inset-0 bg-[#2f3542]/10 mix-blend-overlay pointer-events-none" />
                </div>
                <div>
                  <h2 className="font-tangerine text-5xl md:text-6xl text-[#2f3542] mb-4">Yohannes Accrus</h2>
                  <div className="space-y-2">
                    <p className="font-italiana text-[10px] font-bold tracking-widest text-[#57606f] uppercase">The Groom</p>
                    <p className="font-sans text-xs tracking-wider text-neutral-500 uppercase px-4 border-t border-[#2f3542]/10 py-2 inline-block">Son of</p>
                    <p className="text-sm md:text-base text-neutral-700 leading-relaxed font-playfair font-medium">
                      Bapak Elysius Teguh Wirawan (Alm.) <br className="hidden md:block"/>& Ibu Cicilia Lilik Indrawati
                    </p>
                  </div>
                </div>
              </div>

              {/* Ampersand */}
              <div className="flex flex-col items-center justify-center h-full">
                <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#2f3542]/20 to-transparent mb-6 hidden md:block" />
                <span className="font-tangerine text-6xl md:text-8xl text-[#2f3542]/30 select-none drop-shadow-sm">&</span>
                <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#2f3542]/20 to-transparent mt-6 hidden md:block" />
              </div>

              {/* Bride */}
              <div className="flex flex-col items-center space-y-6">
                 <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg overflow-hidden relative">
                   <img src="/eren.jpg" alt="Eren" className="absolute inset-0 w-full h-full object-cover object-center" />
                   <div className="absolute inset-0 bg-[#2f3542]/20 mix-blend-overlay pointer-events-none" />
                </div>
                <div>
                  <h2 className="font-tangerine text-5xl md:text-6xl text-[#2f3542] mb-4">Chattleya Therence</h2>
                  <div className="space-y-2">
                    <p className="font-italiana text-[10px] font-bold tracking-widest text-[#57606f] uppercase">The Bride</p>
                    <p className="font-sans text-xs tracking-wider text-neutral-500 uppercase px-4 border-t border-[#2f3542]/10 py-2 inline-block">Daughter of</p>
                    <p className="text-sm md:text-base text-neutral-700 leading-relaxed font-playfair font-medium">
                      Bapak Joseph Fransiscus Hendry <br className="hidden md:block"/>& Ibu Maria Elisabeth Merry
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* When It All Began - Story Timeline */}
        <section className="mb-24 md:mb-32 w-full max-w-2xl animate-in slide-in-from-bottom duration-1000 delay-300 fill-mode-both text-center">
           <Heart className="h-6 w-6 text-[#2f3542]/40 mx-auto mb-6" />
           <h3 className="font-tangerine text-6xl md:text-7xl text-[#2f3542] mb-12">When it all began</h3>
           
           <div className="relative border-l border-[#2f3542]/20 ml-4 md:ml-12 space-y-12">
              <div className="relative pl-8 md:pl-12 text-left">
                <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-[#2f3542] shadow-[0_0_0_4px_rgba(255,255,255,1)]" />
                <span className="text-[15px] font-bold tracking-[0.3em] text-[#57606f] uppercase">2010</span>
                <h4 className="font-playfair text-xl md:text-2xl text-[#2f3542] font-semibold mt-1 mb-2">The First Meet</h4>
                <p className="font-sans text-sm text-neutral-600 leading-relaxed">We started as stranger both meet during the Junior High in <strong>Cor Jesu</strong>, We only know each other as friends.</p>
              </div>

              <div className="relative pl-8 md:pl-12 text-left">
                <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-[#2f3542] shadow-[0_0_0_4px_rgba(255,255,255,1)]" />
                <span className="text-[15px] font-bold tracking-[0.3em] text-[#57606f] uppercase">2014</span>
                <h4 className="font-playfair text-xl md:text-2xl text-[#2f3542] font-semibold mt-1 mb-2">The Separation</h4>
                <p className="font-sans text-sm text-neutral-600 leading-relaxed">We still friends until Senior High both also never be in same classroom, this year we <strong>separate</strong> each other continuing life never thought fate will bring us back together</p>
              </div>

              <div className="relative pl-8 md:pl-12 text-left">
                <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-[#2f3542] shadow-[0_0_0_4px_rgba(255,255,255,1)]" />
                <span className="text-[15px] font-bold tracking-[0.3em] text-[#57606f] uppercase">2021</span>
                <h4 className="font-playfair text-xl md:text-2xl text-[#2f3542] font-semibold mt-1 mb-2">Simple Message that Brought Us Back</h4>
                <p className="font-sans text-sm text-neutral-600 leading-relaxed">A simple message "Hi, how are you?" from Accrus after 7 years apart, started a new chapter of our story. This then become promise when Accrus going back to Malang, he will meet Eren</p>
              </div>

              <div className="relative pl-8 md:pl-12 text-left">
                <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-[#2f3542] shadow-[0_0_0_4px_rgba(255,255,255,1)]" />
                <span className="text-[15px] font-bold tracking-[0.3em] text-[#57606f] uppercase">2022</span>
                <h4 className="font-playfair text-xl md:text-2xl text-[#2f3542] font-semibold mt-1 mb-2">First Date</h4>
                <p className="font-sans text-sm text-neutral-600 leading-relaxed">We decide to have a first date in <strong>Malang</strong>, and it was a great moment for us. We start our relationship since then. Mostly long distance for three years, only two times Accrus meets Eren per year</p>
              </div>

              <div className="relative pl-8 md:pl-12 text-left">
                <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-[#2f3542] shadow-[0_0_0_4px_rgba(255,255,255,1)]" />
                <span className="text-[15px] font-bold tracking-[0.3em] text-[#57606f] uppercase">2025</span>
                <h4 className="font-playfair text-xl md:text-2xl text-[#2f3542] font-semibold mt-1 mb-2">Marriage Proposal</h4>
                <p className="font-sans text-sm text-neutral-600 leading-relaxed">After 3 years, we decide to take a step forward to bring our relationship to the next chapter.</p>
              </div>

              <div className="relative pl-8 md:pl-12 text-left">
                <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-[#2f3542] shadow-[0_0_0_4px_rgba(255,255,255,1)]" />
                <span className="text-[15px] font-bold tracking-[0.3em] text-[#57606f] uppercase">2026</span>
                <h4 className="font-playfair text-xl md:text-2xl text-[#2f3542] font-semibold mt-1 mb-2">Wedding</h4>
                <p className="font-sans text-sm text-neutral-600 leading-relaxed">This is our year, we invite you to celebrate this moment of happiness with us together.</p>
              </div>
           </div>
        </section>

        {/* Holy Matrimony Details */}
        <section className="mb-24 md:mb-32 w-full max-w-4xl animate-in slide-in-from-bottom duration-1000 delay-500 fill-mode-both">
          <div className="mb-10 text-center flex flex-col items-center">
             <Church className="h-10 w-10 text-[#2f3542] mb-6 opacity-80" strokeWidth={1} />
             <h3 className="font-tangerine text-5xl md:text-7xl text-[#2f3542]">Holy Matrimony Details</h3>
          </div>

          <div className="relative overflow-hidden rounded-[2.5rem] border border-[#2f3542]/10 bg-white/40 backdrop-blur-xl shadow-2xl p-8 md:p-14">
            <div className="absolute inset-4 border border-[#2f3542]/5 rounded-[1.8rem] pointer-events-none" />
            
             <Countdown />

            <div className="grid gap-10 md:grid-cols-3 relative text-center mt-12 pt-12 border-t border-[#2f3542]/10">
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-white p-3 rounded-full shadow-sm">
                  <Calendar className="h-5 w-5 text-[#2f3542]" />
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-italiana text-[10px] font-bold tracking-[0.3em] text-[#57606f] uppercase mb-2">Date</span>
                  <p className="font-playfair text-2xl font-medium text-[#2f3542] italic">Saturday</p>
                  <p className="text-neutral-700 font-sans tracking-widest text-sm">06 June 2026</p>
                </div>
              </div>

              <div className="flex flex-col items-center space-y-4">
                <div className="bg-white p-3 rounded-full shadow-sm">
                  <Clock className="h-5 w-5 text-[#2f3542]" />
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-italiana text-[10px] font-bold tracking-[0.3em] text-[#57606f] uppercase mb-2">Time</span>
                  <p className="font-playfair text-2xl font-medium text-[#2f3542] italic">09.00 - 11.00</p>
                  <p className="text-neutral-700 font-sans tracking-widest text-sm">WIB</p>
                </div>
              </div>

              <div className="flex flex-col items-center space-y-4">
                <div className="bg-white p-3 rounded-full shadow-sm">
                  <MapPin className="h-5 w-5 text-[#2f3542]" />
                </div>
                <div className="flex flex-col items-center">
                    <span className="font-italiana text-[10px] font-bold tracking-[0.3em] text-[#57606f] uppercase mb-2">Location</span>
                    <p className="font-playfair text-xl md:text-2xl font-medium text-[#2f3542] italic leading-tight">Albertus de Trapani</p>
                    <p className="text-[10px] text-neutral-600 tracking-widest mt-1 px-4 font-sans uppercase">Gereja Katolik Paroki, Malang</p>
                </div>
              </div>
            </div>

            <div className="mt-12 space-y-8">
              <div className="w-full overflow-hidden rounded-3xl border border-[#2f3542]/10 bg-white/50 p-1 md:p-2 shadow-inner">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.546861614909!2d112.6396390753446!3d-7.942301079112588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd629c0433c5ccb%3A0x75690d6c79ab08f0!2sGereja%20Katolik%20Paroki%20St.%20Albertus%20de%20Trapani!5e0!3m2!1sen!2sid!4v1775046986049!5m2!1sen!2sid" 
                  width="100%" 
                  height="350" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-2xl grayscale-[50%] contrast-[0.9] opacity-90 shadow-md"
                ></iframe>
              </div>

              <a 
                href="https://maps.app.goo.gl/3w5i2jHjJR6n9X8v8" 
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center space-x-3 rounded-full border border-[#2f3542]/20 bg-white px-10 py-4 text-[10px] font-bold tracking-[0.3em] text-[#2f3542] transition-all hover:bg-[#2f3542] hover:text-white active:scale-95 shadow-md"
              >
                <MapPin className="h-4 w-4 transition-transform group-hover:-translate-y-1" />
                <span>OPEN IN GOOGLE MAPS</span>
              </a>
            </div>
          </div>
        </section>

        {/* Thank You Section */}
        <section className="relative max-w-3xl animate-in slide-in-from-bottom pb-20 px-6 duration-1000 delay-700 fill-mode-both text-center">
           <div className="relative flex flex-col items-center">
              <p className="font-playfair text-2xl md:text-3xl text-[#2f3542] leading-relaxed italic mb-8 px-6">
                Thank you for being part of our story and blessing our new chapter. We can't wait to celebrate with you!
              </p>
           </div>

           <div className="w-16 md:w-24 h-[1px] bg-[#2f3542]/20 mx-auto mb-10" />

           <div className="space-y-4">
              <h2 className="font-tangerine text-5xl text-[#2f3542]">Accrus & Eren</h2>
           </div>
        </section>
      </main>
    </div>
  );
}