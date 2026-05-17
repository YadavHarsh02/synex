import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertCircle, Info } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 max-w-sm w-full">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
              className={`p-4 rounded-2xl shadow-xl flex items-center justify-between border backdrop-blur-md ${
                toast.type === 'success'
                  ? 'bg-success/10 border-success/20 text-success'
                  : toast.type === 'error'
                  ? 'bg-error/10 border-error/20 text-error'
                  : 'bg-primary/10 border-primary/20 text-primary'
              }`}
            >
              <div className="flex items-center space-x-3">
                {toast.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-success" />
                ) : toast.type === 'error' ? (
                  <AlertCircle className="w-5 h-5 flex-shrink-0 text-error" />
                ) : (
                  <Info className="w-5 h-5 flex-shrink-0 text-primary" />
                )}
                <span className="text-sm font-bold text-on-surface">{toast.message}</span>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="ml-4 p-1 hover:bg-white/10 rounded-lg transition-colors text-on-surface-variant hover:text-on-surface"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};
