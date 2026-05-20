

import { useState } from 'react';
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-surface/70 backdrop-blur-xl border-b border-white/40">
      <nav className="flex justify-between items-center max-w-container-max mx-auto px-4 sm:px-margin-lg py-4 sm:py-6">
        <div className="flex items-center space-x-3 group cursor-pointer">
          <img src="/logo.png" alt="Synex Logo" className="w-7 h-7 sm:w-8 sm:h-8 group-hover:scale-110 transition-transform" />
          <div className="font-headline-sm text-xl sm:text-2xl font-bold lowercase text-on-surface tracking-tighter">
            synex
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex space-x-gutter items-center">
          <a className="font-body-md text-body-md uppercase tracking-wider text-primary font-bold border-b-2 border-primary pb-1" href="#">DASHBOARD</a>
          <a className="font-body-md text-body-md uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors" href="#">ASSETS</a>
          <a className="font-body-md text-body-md uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors" href="#">ANALYTICS</a>
          <a className="font-body-md text-body-md uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors" href="#">MARKETS</a>
        </div>
        
        <div className="flex items-center space-x-3 sm:space-x-6">
          <button className="hidden sm:flex items-center space-x-2 text-on-surface-variant hover:text-primary transition-all">
            <span className="material-symbols-outlined">language</span>
            <span className="font-label-md text-label-md uppercase tracking-wider">EN</span>
          </button>
          
          <Show when="signed-out">
            <div className="hidden sm:flex items-center space-x-4">
              <SignInButton mode="modal">
                <button className="text-on-surface-variant font-label-md hover:text-primary transition-colors uppercase tracking-widest text-sm">Sign In</button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="bg-on-surface text-surface px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-label-md text-label-md flex items-center space-x-2 hover:scale-105 active:opacity-80 transition-all text-sm">
                  <span className="material-symbols-outlined text-base">play_circle</span>
                  <span>Launch app</span>
                </button>
              </SignUpButton>
            </div>
          </Show>
          
          <Show when="signed-in">
            <UserButton appearance={{ elements: { userButtonAvatarBox: 'w-8 h-8 sm:w-10 sm:h-10' } }} />
          </Show>
          
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 text-on-surface-variant hover:text-on-surface transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface/95 backdrop-blur-xl border-t border-white/10">
          <div className="flex flex-col px-4 py-4 space-y-4">
            <a className="font-body-md text-body-md uppercase tracking-wider text-primary font-bold py-2" href="#">DASHBOARD</a>
            <a className="font-body-md text-body-md uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors py-2" href="#">ASSETS</a>
            <a className="font-body-md text-body-md uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors py-2" href="#">ANALYTICS</a>
            <a className="font-body-md text-body-md uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors py-2" href="#">MARKETS</a>
            
            <Show when="signed-out">
              <div className="flex flex-col space-y-3 pt-4 border-t border-white/10">
                <SignInButton mode="modal">
                  <button className="text-on-surface-variant font-label-md hover:text-primary transition-colors uppercase tracking-widest py-2 text-left">Sign In</button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="bg-on-surface text-surface px-6 py-3 rounded-full font-label-md text-label-md flex items-center justify-center space-x-2 hover:scale-105 active:opacity-80 transition-all">
                    <span className="material-symbols-outlined text-base">play_circle</span>
                    <span>Launch app</span>
                  </button>
                </SignUpButton>
              </div>
            </Show>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
