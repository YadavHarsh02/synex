import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  Coins, 
  ArrowRight, 
  Check,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/react';
import api, { setAuthToken } from '../services/api';
import { Card, Button, cn } from '../components/ui';

const CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
];

const Onboarding = () => {
  const { getToken } = useAuth();
  const [step, setStep] = useState(1);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const navigate = useNavigate();

  const handleComplete = async () => {
    if (!selectedCurrency) return;
    
    try {
      const token = await getToken();
      setAuthToken(token);
      await api.post('/user/upsert', {
        currency: selectedCurrency.code
      });
      // Redirect to dashboard after successful onboarding
      navigate('/dashboard');
    } catch (error) {
      console.error("Onboarding failed:", error);
      alert("Failed to save selection. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-surface flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-success/5 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-md w-full text-center space-y-6 sm:space-y-8"
          >
            <div className="flex justify-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-[24px] sm:rounded-[32px] flex items-center justify-center relative">
                <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                <motion.div 
                  className="absolute inset-0 border-2 border-primary rounded-[24px] sm:rounded-[32px]"
                  animate={{ scale: [1, 1.1, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Welcome to Synex</h1>
              <p className="text-on-surface-variant leading-relaxed text-sm sm:text-base px-2">
                Let&apos;s get your workspace ready. First, choose the primary currency for your financial tracking.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {CURRENCIES.map((currency) => (
                <button
                  key={currency.code}
                  onClick={() => setSelectedCurrency(currency)}
                  className={cn(
                    "p-3 sm:p-4 rounded-2xl sm:rounded-3xl border transition-all duration-300 flex flex-col items-center space-y-1 sm:space-y-2 group relative overflow-hidden",
                    selectedCurrency?.code === currency.code 
                      ? "border-primary bg-primary/5 shadow-lg shadow-primary/10" 
                      : "border-white/5 bg-white/5 hover:border-white/20 hover:bg-white/[0.08]"
                  )}
                >
                  <span className="text-xl sm:text-2xl">{currency.flag}</span>
                  <span className="font-bold text-xs sm:text-sm">{currency.code}</span>
                  <span className="text-[8px] sm:text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">{currency.name}</span>
                  
                  {selectedCurrency?.code === currency.code && (
                    <motion.div 
                      layoutId="check"
                      className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-4 h-4 sm:w-5 sm:h-5 bg-primary rounded-full flex items-center justify-center"
                    >
                      <Check className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                    </motion.div>
                  )}
                </button>
              ))}
            </div>

            <Button 
              className="w-full py-3.5 sm:py-4 text-base sm:text-lg shadow-xl shadow-primary/20 disabled:opacity-30"
              disabled={!selectedCurrency}
              onClick={() => setStep(2)}
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-md w-full text-center space-y-8 sm:space-y-10"
          >
            <div className="flex justify-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-success/10 rounded-full flex items-center justify-center relative">
                <div className="text-3xl sm:text-4xl">{selectedCurrency?.flag}</div>
                <motion.div 
                  className="absolute inset-0 border-2 border-success rounded-full"
                  animate={{ scale: [1, 1.2], opacity: [1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4 px-2">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">You&apos;re all set!</h2>
              <p className="text-on-surface-variant leading-relaxed text-sm sm:text-base">
                Your primary currency is set to <span className="text-on-surface font-bold">{selectedCurrency?.name} ({selectedCurrency?.symbol})</span>. 
                You can change this later in your settings.
              </p>
            </div>

            <Card className="bg-white/5 p-4 sm:p-6 border-white/10 text-left space-y-3 sm:space-y-4">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary/10 rounded-lg sm:rounded-xl flex items-center justify-center mt-0.5 sm:mt-1 flex-shrink-0">
                  <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold">Global Ready</p>
                  <p className="text-[10px] sm:text-xs text-on-surface-variant">We&apos;ll use current exchange rates for multi-currency transactions.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-success/10 rounded-lg sm:rounded-xl flex items-center justify-center mt-0.5 sm:mt-1 flex-shrink-0">
                  <Coins className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-success" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold">Smart Tracking</p>
                  <p className="text-[10px] sm:text-xs text-on-surface-variant">Your budgets will be automatically converted to {selectedCurrency?.code}.</p>
                </div>
              </div>
            </Card>

            <div className="flex flex-col space-y-3">
              <Button className="w-full py-3.5 sm:py-4 text-base sm:text-lg" onClick={handleComplete}>
                Start Managing Wealth
              </Button>
              <button 
                onClick={() => setStep(1)}
                className="text-[10px] sm:text-xs font-bold text-on-surface-variant hover:text-on-surface transition-colors"
              >
                Change Currency
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Onboarding;
