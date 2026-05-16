

import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-surface/70 backdrop-blur-xl border-b border-white/40">
      <nav className="flex justify-between items-center max-w-container-max mx-auto px-margin-lg py-6">
        <div className="flex items-center space-x-3 group cursor-pointer">
          <img src="/logo.png" alt="Synex Logo" className="w-8 h-8 group-hover:scale-110 transition-transform" />
          <div className="font-headline-sm text-2xl font-bold lowercase text-on-surface tracking-tighter">
            synex
          </div>
        </div>
        <div className="hidden md:flex space-x-gutter items-center">
          <a className="font-body-md text-body-md uppercase tracking-wider text-primary font-bold border-b-2 border-primary pb-1" href="#">DASHBOARD</a>
          <a className="font-body-md text-body-md uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors" href="#">ASSETS</a>
          <a className="font-body-md text-body-md uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors" href="#">ANALYTICS</a>
          <a className="font-body-md text-body-md uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors" href="#">MARKETS</a>
        </div>
        <div className="flex items-center space-x-6">
          <button className="flex items-center space-x-2 text-on-surface-variant hover:text-primary transition-all">
            <span className="material-symbols-outlined">language</span>
            <span className="font-label-md text-label-md uppercase tracking-wider">EN</span>
          </button>
          
          <Show when="signed-out">
            <div className="flex items-center space-x-4">
              <SignInButton mode="modal">
                <button className="text-on-surface-variant font-label-md hover:text-primary transition-colors uppercase tracking-widest">Sign In</button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="bg-on-surface text-surface px-6 py-2.5 rounded-full font-label-md text-label-md flex items-center space-x-2 hover:scale-105 active:opacity-80 transition-all">
                  <span className="material-symbols-outlined text-base">play_circle</span>
                  <span>Launch app</span>
                </button>
              </SignUpButton>
            </div>
          </Show>
          
          <Show when="signed-in">
            <UserButton appearance={{ elements: { userButtonAvatarBox: 'w-10 h-10' } }} />
          </Show>
        </div>
      </nav>
    </header>
  );
};

export default Header;
