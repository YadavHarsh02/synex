

const Architecture = () => {
  return (
    <section className="py-20 sm:py-32 lg:py-40 px-4 sm:px-margin-lg bg-surface relative overflow-hidden">
      <div className="max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-margin-lg items-center mb-20 sm:mb-32 lg:mb-40">
          <div>
            <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-headline-lg mb-4 sm:mb-8 leading-tight">One platform. <br/> Multiple intelligence layers.</h2>
            <p className="font-body-lg text-sm sm:text-body-lg text-on-surface-variant max-w-md">
              Our architecture is designed for modularity and absolute transparency. From our Core ledger to AI-driven insights, every layer works in harmony.
            </p>
          </div>
          {/* Architecture Graph */}
          <div className="relative h-[300px] sm:h-[350px] lg:h-[400px] glass-card rounded-2xl p-6 sm:p-8 lg:p-12 flex items-center justify-center border border-white/20">
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,theme(colors.primary),transparent)]"></div>
            <div className="grid grid-cols-2 gap-3 sm:gap-gutter relative z-10 w-full h-full">
              <div className="border border-primary/20 rounded-xl p-3 sm:p-4 lg:p-6 flex flex-col justify-center items-center text-center hover:bg-primary-container/10 transition-all cursor-default group">
                <span className="material-symbols-outlined text-primary text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-4 group-hover:scale-110 transition-transform">hub</span>
                <span className="font-label-md text-[10px] sm:text-xs lg:text-label-md uppercase tracking-widest">Synex Core</span>
              </div>
              <div className="border border-primary/20 rounded-xl p-3 sm:p-4 lg:p-6 flex flex-col justify-center items-center text-center hover:bg-primary-container/10 transition-all cursor-default group">
                <span className="material-symbols-outlined text-primary text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-4 group-hover:scale-110 transition-transform">psychology</span>
                <span className="font-label-md text-[10px] sm:text-xs lg:text-label-md uppercase tracking-widest">AI Intelligence</span>
              </div>
              <div className="border border-primary/20 rounded-xl p-3 sm:p-4 lg:p-6 flex flex-col justify-center items-center text-center hover:bg-primary-container/10 transition-all cursor-default group">
                <span className="material-symbols-outlined text-primary text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-4 group-hover:scale-110 transition-transform">layers</span>
                <span className="font-label-md text-[10px] sm:text-xs lg:text-label-md uppercase tracking-widest">Web3 Layer</span>
              </div>
              <div className="border border-primary/20 rounded-xl p-3 sm:p-4 lg:p-6 flex flex-col justify-center items-center text-center hover:bg-primary-container/10 transition-all cursor-default group">
                <span className="material-symbols-outlined text-primary text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-4 group-hover:scale-110 transition-transform">security</span>
                <span className="font-label-md text-[10px] sm:text-xs lg:text-label-md uppercase tracking-widest">Guardian Shield</span>
              </div>
            </div>
          </div>
        </div>
        {/* Integration Orbit */}
        <div className="text-center">
          <span className="font-label-md text-label-md uppercase tracking-widest text-primary mb-4 sm:mb-6 block">Connected Ecosystem</span>
          <h3 className="font-headline-md text-xl sm:text-2xl lg:text-headline-md mb-8 sm:mb-12 lg:mb-16">Seamlessly connected to your financial ecosystem.</h3>
          <div className="relative flex justify-center items-center py-10 sm:py-16 lg:py-20">
            {/* Orbiting Elements (Conceptual Layout) */}
            <div className="w-24 h-24 sm:w-36 sm:h-36 lg:w-48 lg:h-48 bg-on-surface rounded-full flex items-center justify-center text-surface-bright font-display-lg text-sm sm:text-lg lg:text-headline-sm emerald-glow relative z-20">
              CORE
            </div>
            {/* Integration Nodes (Fixed Positions) */}
            <div className="absolute w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] lg:w-[600px] lg:h-[600px] border border-outline-variant/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
            <div className="absolute w-10 h-10 sm:w-14 sm:h-14 lg:w-20 lg:h-20 glass-card rounded-full flex items-center justify-center top-0 left-1/2 -translate-x-1/2 hover:scale-110 transition-transform">
              <img className="w-5 h-5 sm:w-7 sm:h-7 lg:w-10 lg:h-10 object-contain rounded" alt="Logo 1" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5aagGcz6GDxcPz5Y8Ub2NkiS4pfAFRzMidpGgkXg1WV2xqYyfdQiA_Guim6yzRdqcJUwrej680aduAgWZUsW5wCeAs4Oth6Y1lbnyzDCEfPqk1RLm62yhAHTAg5YgMk_QUBOQHtVOnQAXszxlM9Y51xpJp_fwb6YPLxLKgRKHAKNu3kPAHGnAYWgZjeYI_-mGm8ISu_ut5TeUp-s2qig9kpNAv3lS6YW7Nkl8kkRixDYyz9yRM6X51ed_CcsE6D9c0Wez3tJSzyc"/>
            </div>
            <div className="absolute w-10 h-10 sm:w-14 sm:h-14 lg:w-20 lg:h-20 glass-card rounded-full flex items-center justify-center bottom-0 left-1/2 -translate-x-1/2 hover:scale-110 transition-transform">
              <img className="w-5 h-5 sm:w-7 sm:h-7 lg:w-10 lg:h-10 object-contain rounded" alt="Logo 2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLvViu1pKVyquPFJG90Uc7XIxLJ0VAsJxrnp3i5N1NGTfDhlF1xXmX4UtNHBQKbn4FNuMNuFB58F-4ac0AOgy3BqFV3SF8YiM2TaQW5EZ0eyNTQkll8uIfNoZkifo-g014ckA-O2mrWYUTfqpzCRXf6sV9OhfHDHd0D9l_m8Zf8ADti_sXUVlzEhtnOVwFtCfW1Jr6jMAFwkUHEDH9wWr6qMIxYbmx2-2bHtICCQwODY5gT57TKxmmk3PpALQ_ykdWo30wGxCI_D4"/>
            </div>
            <div className="absolute w-10 h-10 sm:w-14 sm:h-14 lg:w-20 lg:h-20 glass-card rounded-full flex items-center justify-center left-0 top-1/2 -translate-y-1/2 hover:scale-110 transition-transform">
              <img className="w-5 h-5 sm:w-7 sm:h-7 lg:w-10 lg:h-10 object-contain rounded" alt="Logo 3" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqhP-2N0Fl8f8iiGhsR87HrnREVNdt7VG39hCvjx3ZH-syw4MhWGJfFVIp-ic9PXuyleDMQAJCZa2Hn47JTtRXQS_dIwKzu-YWlAtdq87cqhrvBU72yqYmIzJMBPevNLXqyAPC-7fa3qY6o6RnFLkN7xfaEgLH_VKqVRfJQQvVqadHyQr84spxtUQ01xkshgWfjfysCc5HfT7eqlaxpTnvkgcQtbOnluOufinIEtgOr8XOymFdOaeDlXlh3ugEO6quZn3U9_1m6XU"/>
            </div>
            <div className="absolute w-10 h-10 sm:w-14 sm:h-14 lg:w-20 lg:h-20 glass-card rounded-full flex items-center justify-center right-0 top-1/2 -translate-y-1/2 hover:scale-110 transition-transform">
              <img className="w-5 h-5 sm:w-7 sm:h-7 lg:w-10 lg:h-10 object-contain rounded" alt="Logo 4" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsaMg-Pqfzyr321WQobliHkGluFI8WEIA8lQffT_9hcl4hvkcPLGSj74ymLt2EydQe9lD3lyphRlrpRFdwvSrse4pq4fjKTysf9P8Uf72y8BXAue_mC3IsG0N7x3B_pBtYAPZzYYw9jA9i1mnQXCe3QgTyPbOPe6DwCmR_TOcg6GZ81A2KTzWpodxSuuKZmx03tsb2lvx8J0Fyhq971OmqSHGR8mp6C52r7QWROd1edRnmI3DwkZ-ypC3W5ICLOA-h_-S2BxL6Iq4"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Architecture;
