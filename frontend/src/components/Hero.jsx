

const Hero = () => {
  return (
    <section className="min-height-[921px] flex flex-col items-center justify-center pt-32 pb-20 px-margin-lg text-center relative overflow-hidden">
      {/* Background Decorative Texture */}
      <div className="absolute inset-0 -z-10 opacity-30 grayscale pointer-events-none">
        <img className="w-full h-full object-cover" alt="Serene landscape" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGVmewqVbGo2OMCWc_6iDsFVsXPCsKJz9nPhh88u6DyiHAi_hizOmr17cCk3kM0U2PbIbCqOsedggGZKW8SWLMlmnWI10v7mH7aFT5_P5lQRBssSLt2yZKkOrhP-OEhUvYe5aEBVAgKBPnMPlIZx-d-QBnyK45nimdEgMccNQ528UUWJq2SEBG1AX0U2M-WNZ-Ctvf-zsLURZJiYs6w_hZwIAeFWFnORLn3B5dveFg3P8vaPuVd4honUoztSMdXwLoT9kM0SLZFkE"/>
      </div>
      <span className="font-label-md text-label-md uppercase tracking-[0.4em] text-outline mb-6">Finance Reimagined</span>
      <h1 className="font-display-lg text-display-lg max-w-4xl mb-8 leading-tight">
        A New Standard <br/> in Wealth Management
      </h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-12">
        Take full control of your assets with a unified platform for investing, tracking, and growing your portfolio in real time.
      </p>
      {/* Dashboard Preview Hero */}
      <div className="w-full max-w-5xl mx-auto glass-card rounded-xl overflow-hidden emerald-glow p-8 mt-12 relative">
        <div className="flex justify-between items-start mb-12">
          <div className="text-left">
            <div className="flex items-center space-x-3 mb-2">
              <span className="material-symbols-outlined text-primary">bolt</span>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline">Capital Under Control</span>
            </div>
            <div className="flex items-baseline space-x-4">
              <h2 className="font-display-lg text-headline-lg">$ 345,398.34</h2>
              <div className="bg-primary-container/20 text-on-primary-container px-3 py-1 rounded-full flex items-center space-x-1">
                <span className="material-symbols-outlined text-sm">trending_up</span>
                <span className="font-label-sm text-label-sm">8.9%</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="glass-card px-4 py-2 rounded-lg text-on-surface-variant font-label-sm uppercase tracking-widest">H D W M All</div>
            <div className="glass-card px-4 py-2 rounded-lg flex items-center space-x-2">
              <span className="material-symbols-outlined text-sm">calendar_today</span>
              <span className="font-label-sm text-label-sm uppercase">Oct 1 - Nov 30</span>
            </div>
          </div>
        </div>
        {/* Bento Grid Visualization Mockup */}
        <div className="grid grid-cols-12 gap-gutter text-left">
          <div className="col-span-8 h-64 border-b border-outline-variant flex items-end justify-between pb-4">
            <div className="w-2 bg-primary/20 h-[40%] rounded-t-sm"></div>
            <div className="w-2 bg-primary/30 h-[60%] rounded-t-sm"></div>
            <div className="w-2 bg-primary/40 h-[45%] rounded-t-sm"></div>
            <div className="w-2 bg-primary/60 h-[80%] rounded-t-sm"></div>
            <div className="w-2 bg-primary h-[95%] rounded-t-sm"></div>
            <div className="w-2 bg-primary/50 h-[70%] rounded-t-sm"></div>
            <div className="w-2 bg-primary/20 h-[30%] rounded-t-sm"></div>
            <div className="w-2 bg-primary/30 h-[50%] rounded-t-sm"></div>
            <div className="w-2 bg-primary/40 h-[55%] rounded-t-sm"></div>
            <div className="w-2 bg-primary/80 h-[85%] rounded-t-sm"></div>
          </div>
          <div className="col-span-4 flex flex-col space-y-4">
            <div className="p-4 rounded-lg bg-surface-container-low border border-outline-variant/30">
              <div className="flex justify-between mb-2">
                <span className="font-label-sm text-label-sm uppercase text-outline">Ethereum</span>
                <span className="font-label-sm text-label-sm font-bold">$28,500</span>
              </div>
              <div className="w-full bg-outline-variant h-1 rounded-full">
                <div className="bg-primary h-full w-[32%] rounded-full"></div>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-surface-container-low border border-outline-variant/30">
              <div className="flex justify-between mb-2">
                <span className="font-label-sm text-label-sm uppercase text-outline">Bitcoin</span>
                <span className="font-label-sm text-label-sm font-bold">$35,200</span>
              </div>
              <div className="w-full bg-outline-variant h-1 rounded-full">
                <div className="bg-primary h-full w-[48%] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
