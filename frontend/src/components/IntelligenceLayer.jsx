

const IntelligenceLayer = () => {
  return (
    <section className="py-32 px-margin-lg bg-white relative overflow-hidden">
      <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-margin-lg items-center">
        <div className="order-2 md:order-1 relative h-[500px] flex items-center justify-center">
          {/* Tree Branch Texture */}
          <img className="absolute w-[120%] left-[-10%] h-32 object-cover opacity-60 rounded-full rotate-[-5deg] z-0" alt="Moss covered branch" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9w82k5W_WLH3yrEqBvWtfvJsXJX-b7Md5DnucXvxE_xzhEEl7wgU_q36Jql0-NH3zsSZu9KW95MntYDg_QDs02Cu6v-etqbZcTg3MDZM3cmmhDZlmVRUpeezVRHqSUM5aZ8q2CSAyAADOuILKoJosSZmcb8Yiu0Gc4KBLQ88OTuFfu73mGkOOEvzO395kpFS-g35Y-qIUXANpGTi2-PsciGGBKKv7TAcINlCOvEimoqdG4astdiaHkHM7EFWZF3lZSyUGvpitMD8"/>
          {/* Floating Intelligence UI */}
          <div className="relative z-10 w-full">
            <div className="glass-card p-8 rounded-xl max-w-sm ml-auto emerald-glow border border-white/50">
              <div className="flex justify-between items-center mb-6">
                <span className="font-label-md text-label-md uppercase tracking-widest text-outline">Portfolio signal</span>
                <span className="bg-primary text-white font-bold text-headline-sm p-3 rounded-lg">87</span>
              </div>
              <div className="flex flex-col space-y-4">
                <div className="bg-primary-container/20 text-on-primary-container px-4 py-3 rounded-full flex items-center space-x-2">
                  <span className="material-symbols-outlined">auto_graph</span>
                  <span className="font-label-md text-label-md font-bold">+$12,840 Captured opportunity</span>
                </div>
                <div className="bg-on-surface p-6 rounded-xl text-surface">
                  <div className="flex items-center space-x-2 text-error mb-3">
                    <span className="material-symbols-outlined">warning</span>
                    <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider">Risk Alert</span>
                  </div>
                  <p className="font-body-md text-body-md mb-4 text-surface-dim">High volatility detected in emerging markets.</p>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2 text-label-sm">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                      <span>Immediate exposure review</span>
                    </li>
                    <li className="flex items-center space-x-2 text-label-sm">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                      <span>Rebalance core positions</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <span className="font-label-md text-label-md uppercase tracking-widest text-primary mb-6 block">The Intelligence Layer</span>
          <h2 className="font-headline-lg text-headline-lg mb-8 leading-tight">Proactive Wisdom <br/> at Your Fingertips.</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-lg">
            Synex doesn't just display data; it interprets the market's subtle pulses. Receive real-time tactical signals powered by proprietary AI and curated financial signals.
          </p>
          <div className="flex space-x-6">
            <div className="flex flex-col">
              <span className="font-display-lg text-headline-md text-on-surface">2.4ms</span>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline">Signal Latency</span>
            </div>
            <div className="w-px h-16 bg-outline-variant"></div>
            <div className="flex flex-col">
              <span className="font-display-lg text-headline-md text-on-surface">94%</span>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline">Accuracy Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntelligenceLayer;
