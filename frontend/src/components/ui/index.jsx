import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const Card = ({ children, className }) => {
  return (
    <div className={cn(
      "rounded-3xl border border-white/10 bg-surface/50 backdrop-blur-md p-6 overflow-hidden relative group",
      className
    )}>
      {/* Subtle glare effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      {children}
    </div>
  );
};

export const Button = ({ children, className, variant = "primary", ...props }) => {
  const variants = {
    primary: "bg-on-surface text-surface hover:scale-105 active:scale-95",
    secondary: "bg-surface border border-border text-on-surface hover:bg-white/5",
    ghost: "text-on-surface-variant hover:text-primary transition-colors",
    danger: "bg-error text-on-error hover:opacity-90"
  };

  return (
    <button 
      className={cn(
        "px-6 py-2.5 rounded-full font-bold text-sm transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
