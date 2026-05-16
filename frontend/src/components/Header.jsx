

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-surface/70 backdrop-blur-xl border-b border-white/40">
      <nav className="flex justify-between items-center max-w-container-max mx-auto px-margin-lg py-6">
        <div className="font-headline-sm text-headline-sm lowercase text-on-surface">synex</div>
        <div className="hidden md:flex space-x-gutter items-center">
          <a className="font-body-md text-body-md uppercase tracking-widest text-primary font-bold border-b-2 border-primary pb-1" href="#">DASHBOARD</a>
          <a className="font-body-md text-body-md uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors" href="#">ASSETS</a>
          <a className="font-body-md text-body-md uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors" href="#">ANALYTICS</a>
          <a className="font-body-md text-body-md uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors" href="#">MARKETS</a>
        </div>
        <div className="flex items-center space-x-6">
          <button className="flex items-center space-x-2 text-on-surface-variant hover:text-primary transition-all">
            <span className="material-symbols-outlined">language</span>
            <span className="font-label-md text-label-md uppercase tracking-wider">EN</span>
          </button>
          <button className="bg-on-surface text-surface px-6 py-3 rounded-full font-label-md text-label-md tracking-widest hover:scale-105 active:opacity-80 transition-all uppercase">
            LAUNCH APP
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
