

const Footer = () => {
  return (
    <footer className="w-full relative overflow-hidden bg-on-surface">
      {/* Separation Background */}
      <div className="absolute inset-0 bg-stone-texture bg-cover bg-center opacity-10 pointer-events-none grayscale"></div>
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center px-margin-lg py-margin-lg space-y-gutter md:space-y-0 max-w-container-max mx-auto">
        <div className="flex flex-col space-y-4">
          <div className="font-headline-md text-headline-md text-surface-bright">synex</div>
          <p className="font-body-lg text-body-lg text-surface opacity-80">© 2024 synex. Engineered for the future of wealth.</p>
        </div>
        <div className="flex items-center space-x-12">
          <div className="flex space-x-8">
            <a className="font-body-lg text-body-lg text-surface-variant hover:text-primary-fixed-dim hover:underline decoration-primary underline-offset-8 transition-all" href="#">Mail us</a>
            <a className="font-body-lg text-body-lg text-surface-variant hover:text-primary-fixed-dim hover:underline decoration-primary underline-offset-8 transition-all" href="#">Book a call</a>
          </div>
          <div className="flex space-x-6">
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
