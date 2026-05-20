

const Footer = () => {
  return (
    <footer className="w-full relative overflow-hidden bg-on-surface">
      {/* Separation Background */}
      <div className="absolute inset-0 bg-stone-texture bg-cover bg-center opacity-10 pointer-events-none grayscale"></div>
      <div className="relative z-10 flex flex-col space-y-6 lg:flex-row lg:justify-between lg:items-center px-4 sm:px-margin-lg py-8 sm:py-margin-lg lg:space-y-0 max-w-container-max mx-auto">
        <div className="flex flex-col space-y-3 sm:space-y-4 text-center lg:text-left">
          <div className="font-headline-md text-xl sm:text-headline-md text-surface-bright">synex</div>
          <p className="font-body-lg text-sm sm:text-body-lg text-surface opacity-80">2024 synex. Engineered for the future of wealth.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 lg:space-x-12">
          <div className="flex space-x-6 sm:space-x-8">
            <a className="font-body-lg text-sm sm:text-body-lg text-surface-variant hover:text-primary-fixed-dim hover:underline decoration-primary underline-offset-8 transition-all" href="#">Mail us</a>
            <a className="font-body-lg text-sm sm:text-body-lg text-surface-variant hover:text-primary-fixed-dim hover:underline decoration-primary underline-offset-8 transition-all" href="#">Book a call</a>
          </div>
          <div className="flex space-x-4 sm:space-x-6">
            <span className="material-symbols-outlined text-surface-bright cursor-pointer hover:text-primary transition-colors">public</span>
            <span className="material-symbols-outlined text-surface-bright cursor-pointer hover:text-primary transition-colors">account_balance</span>
            <span className="material-symbols-outlined text-surface-bright cursor-pointer hover:text-primary transition-colors">hub</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
