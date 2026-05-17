import { useState, useEffect } from 'react';

const Hero = () => {
  const [balance, setBalance] = useState(345398.34);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setBalance(prev => prev + (Math.random() * 10 - 5));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-start pt-32 pb-20 px-margin-lg text-center relative overflow-hidden bg-background">
      {/* 1. Initial Fade-In: Background within a browser mockup */}
      <div className={`absolute inset-0 -z-10 transition-opacity duration-1000 ${isVisible ? 'opacity-30' : 'opacity-0'} grayscale pointer-events-none`}>
        <div className="w-full h-full border-[12px] border-surface-container rounded-3xl overflow-hidden shadow-2xl scale-110">
          <img 
            className="w-full h-full object-cover" 
            alt="Serene landscape" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGVmewqVbGo2OMCWc_6iDsFVsXPCsKJz9nPhh88u6DyiHAi_hizOmr17cCk3kM0U2PbIbCqOsedggGZKW8SWLMlmnWI10v7mH7aFT5_P5lQRBssSLt2yZKkOrhP-OEhUvYe5aEBVAgKBPnMPlIZx-d-QBnyK45nimdEgMccNQ528UUWJq2SEBG1AX0U2M-WNZ-Ctvf-zsLURZJiYs6w_hZwIAeFWFnORLn3B5dveFg3P8vaPuVd4honUoztSMdXwLoT9kM0SLZFkE"
          />
        </div>
      </div>

      <div className="max-w-container-max mx-auto flex flex-col items-center relative z-10">
        {/* 2. Typography Presentation: Kicker and Headline */}
        <div className="space-y-6 mb-12 opacity-0 animate-fade-in [animation-delay:400ms]">
          <span className="font-label-sm text-label-sm uppercase tracking-[0.4em] text-outline block">Finance Reimagined</span>
          <h1 className="font-serif text-[clamp(40px,8vw,80px)] max-w-5xl leading-[1.05] tracking-tight text-on-surface">
            A New Standard <br/> 
            <span className="italic font-serif opacity-90">in Wealth</span> Management
          </h1>
        </div>

        {/* 3. Subheadline Reveal */}
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-16 opacity-0 animate-fade-in [animation-delay:800ms]">
          Take full control of your assets with a unified platform for investing, tracking, and growing your portfolio in real time.
        </p>

        {/* 4. Dashboard Reveal & UI Animation */}
        <div className="w-full max-w-5xl mx-auto glass-card rounded-2xl overflow-hidden emerald-glow p-8 opacity-0 animate-fade-in-up [animation-delay:1200ms] shadow-2xl border border-white/50">
          <div className="flex justify-between items-start mb-12">
            <div className="text-left">
              <div className="flex items-center space-x-3 mb-3">
                <span className="material-symbols-outlined text-primary animate-pulse">bolt</span>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline">Capital Under Control</span>
              </div>
              <div className="flex items-baseline space-x-4">
                <h2 className="font-serif text-5xl tabular-nums tracking-tighter">
                  $ {balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h2>
                <div className="bg-primary-container/20 text-on-primary-container px-3 py-1 rounded-full flex items-center space-x-1 animate-fade-in">
                  <span className="material-symbols-outlined text-sm">trending_up</span>
                  <span className="font-label-sm text-label-sm">8.9%</span>
                  <span className="text-[10px] opacity-60 ml-1">$241,348.09</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <div className="glass-card px-4 py-2 rounded-lg text-on-surface-variant font-label-sm uppercase tracking-widest border border-white/20">H D W M All</div>
              <div className="glass-card px-4 py-2 rounded-lg flex items-center space-x-2 border border-white/20">
                <span className="material-symbols-outlined text-sm">calendar_today</span>
                <span className="font-label-sm text-label-sm uppercase">Oct 1 - Nov 30</span>
                <span className="material-symbols-outlined text-xs ml-1">expand_more</span>
              </div>
            </div>
          </div>

          {/* Asset allocation visualization */}
          <div className="grid grid-cols-12 gap-12 text-left">
            <div className="col-span-8 h-48 flex items-end justify-between px-2 border-b border-outline-variant/30">
              {[40, 60, 45, 80, 95, 70, 30, 50, 55, 85].map((h, i) => (
                <div 
                  key={i}
                  style={{ '--target-height': `${h}%` }}
                  className="w-3 bg-primary/20 rounded-t-sm animate-grow-bar transition-all duration-1000 hover:bg-primary"
                />
              ))}
            </div>
            <div className="col-span-4 space-y-4">
              {[
                { name: 'Ethereum', val: '$28,500', color: 'bg-primary' },
                { name: 'Bitcoin', val: '$35,200', color: 'bg-on-surface' },
                { name: 'Tether', val: '$24,300', color: 'bg-outline' }
              ].map((asset, i) => (
                <div key={i} className="p-4 rounded-xl bg-surface-container-low/50 border border-white/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-label-sm text-label-sm uppercase text-outline">{asset.name}</span>
                    <span className="font-body-md font-bold text-on-surface">{asset.val}</span>
                  </div>
                  <div className="w-full bg-outline-variant/20 h-1 rounded-full overflow-hidden">
                    <div className={`${asset.color} h-full w-[32%] rounded-full opacity-80 animate-fade-in`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5. Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 opacity-0 animate-fade-in [animation-delay:2000ms]">
        <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-outline">Scroll to explore</span>
        <span className="material-symbols-outlined animate-float">arrow_downward</span>
      </div>
    </section>
  );
};

export default Hero;
