

const IntelligenceLayer = () => {
  return (
    <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-margin-lg bg-white relative overflow-hidden">
      <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-margin-lg items-center">
        <div className="order-2 lg:order-1 relative h-[350px] sm:h-[450px] lg:h-[500px] flex items-center justify-center">
          {/* Tree Branch Texture */}
          <img className="absolute w-full lg:w-[120%] left-0 lg:left-[-10%] h-20 sm:h-32 object-cover opacity-60 rounded-full rotate-[-5deg] z-0" alt="Moss covered branch" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9w82k5W_WLH3yrEqBvWtfvJsXJX-b7Md5DnucXvxE_xzhEEl7wgU_q36Jql0-NH3zsSZu9KW95MntYDg_QDs02Cu6v-etqbZcTg3MDZM3cmmhDZlmVRUpeezVRHqSUM5aZ8q2CSAyAADOuILKoJosSZmcb8Yiu0Gc4KBLQ88OTuFfu73mGkOOEvzO395kpFS-g35Y-qIUXANpGTi2-PsciGGBKKv7TAcINlCOvEimoqdG4astdiaHkHM7EFWZF3lZSyUGvpitMD8"/>
          {/* Floating Intelligence UI */}
          <div className="relative z-10 w-full">
            <div className="glass-card p-4 sm:p-6 lg:p-8 rounded-xl max-w-sm mx-auto lg:ml-auto emerald-glow border border-white/50">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <span className="font-label-md text-xs sm:text-label-md uppercase tracking-widest text-outline">Portfolio signal</span>
                <span className="bg-primary text-white font-bold text-lg sm:text-headline-sm p-2 sm:p-3 rounded-lg">87</span>
              </div>
              <div className="flex flex-col space-y-3 sm:space-y-4">
                <div className="bg-primary-container/20 text-on-primary-container px-3 sm:px-4 py-2 sm:py-3 rounded-full flex items-center space-x-2">
                  <span className="material-symbols-outlined text-sm sm:text-base">auto_graph</span>
                  <span className="font-label-md text-xs sm:text-label-md font-bold">+$12,840 Captured opportunity</span>
                </div>
                <div className="bg-on-surface p-4 sm:p-6 rounded-xl text-surface">
                  <div className="flex items-center space-x-2 text-error mb-2 sm:mb-3">
                    <span className="material-symbols-outlined text-sm sm:text-base">warning</span>
                    <span className="font-label-sm text-[10px] sm:text-label-sm font-bold uppercase tracking-wider">Risk Alert</span>
                  </div>
                  <p className="font-body-md text-xs sm:text-body-md mb-3 sm:mb-4 text-surface-dim">High volatility detected in emerging markets.</p>
                  <ul className="space-y-1 sm:space-y-2">
                    <li className="flex items-center space-x-2 text-[10px] sm:text-label-sm">
                      <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-primary rounded-full"></span>
                      <span>Immediate exposure review</span>
                    </li>
                    <li className="flex items-center space-x-2 text-[10px] sm:text-label-sm">
                      <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-primary rounded-full"></span>
                      <span>Rebalance core positions</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <span className="font-label-md text-label-md uppercase tracking-widest text-primary mb-4 sm:mb-6 block">The Intelligence Layer</span>
          <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-headline-lg mb-4 sm:mb-8 leading-tight">Proactive Wisdom <br className="hidden sm:block"/> at Your Fingertips.</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-6 sm:mb-10 max-w-lg">
            Synex doesn&apos;t just display data; it interprets the market&apos;s subtle pulses. Receive real-time tactical signals powered by proprietary AI and curated financial signals.
          </p>
          <div className="flex space-x-4 sm:space-x-6">
            <div className="flex flex-col">
              <span className="font-display-lg text-xl sm:text-headline-md text-on-surface">2.4ms</span>
              <span className="font-label-sm text-[10px] sm:text-label-sm uppercase tracking-widest text-outline">Signal Latency</span>
            </div>
            <div className="w-px h-12 sm:h-16 bg-outline-variant"></div>
            <div className="flex flex-col">
              <span className="font-display-lg text-xl sm:text-headline-md text-on-surface">94%</span>
              <span className="font-label-sm text-[10px] sm:text-label-sm uppercase tracking-widest text-outline">Accuracy Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntelligenceLayer;
