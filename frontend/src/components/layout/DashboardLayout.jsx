import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  PieChart, 
  Target, 
  PlusCircle,
  Search,
  Bell,
  Menu,
  X
} from 'lucide-react';
import { UserButton } from '@clerk/react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../ui';

const SidebarItem = ({ to, icon: Icon, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) => cn(
      "flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-300 group",
      isActive 
        ? "bg-primary/10 text-primary font-bold shadow-sm" 
        : "text-on-surface-variant hover:bg-white/5 hover:text-on-surface"
    )}
  >
    <Icon className={cn("w-5 h-5", "group-hover:scale-110 transition-transform")} />
    <span className="text-sm font-medium">{children}</span>
  </NavLink>
);

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen bg-background text-on-surface overflow-hidden font-body-md">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm transition-all"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-surface border-r border-white/5 transform transition-transform duration-300 md:relative md:translate-x-0 flex flex-col",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center space-x-3 group cursor-pointer">
            <img src="/logo.png" alt="Synex Logo" className="w-8 h-8 group-hover:rotate-12 transition-transform" />
            <span className="text-2xl font-bold tracking-tighter">synex</span>
          </div>
          <button className="md:hidden" onClick={() => setIsSidebarOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 py-4">
          <div className="px-4 pb-2 text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant opacity-50">
            Main Menu
          </div>
          <SidebarItem to="/dashboard" icon={LayoutDashboard}>Dashboard</SidebarItem>
          <SidebarItem to="/transactions" icon={ArrowLeftRight}>Transactions</SidebarItem>
          <SidebarItem to="/analytics" icon={PieChart}>Analytics</SidebarItem>
          <SidebarItem to="/budgets" icon={Target}>Budgets</SidebarItem>
          
          <div className="pt-8 px-4 pb-2 text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant opacity-50">
            Quick Actions
          </div>
          <SidebarItem to="/transactions/new" icon={PlusCircle}>New Transaction</SidebarItem>
        </nav>

        <div className="p-6">
          <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10">
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Unlock advanced insights with <span className="text-primary font-bold">Synex Pro</span>.
            </p>
            <button className="mt-4 w-full bg-on-surface text-surface py-2 rounded-xl text-xs font-bold hover:scale-105 transition-transform">
              Upgrade Now
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Navbar */}
        <header className="h-16 sm:h-20 bg-background/50 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-4 sm:px-8 z-30">
          <div className="flex items-center md:hidden">
            <button onClick={() => setIsSidebarOpen(true)} className="mr-3 sm:mr-4">
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <div className="flex items-center space-x-2">
              <img src="/logo.png" alt="Synex Logo" className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-lg sm:text-xl font-bold">synex</span>
            </div>
          </div>

          <div className="hidden md:flex items-center bg-white/5 border border-white/5 px-4 py-2 rounded-2xl w-96 group focus-within:border-primary/50 transition-colors">
            <Search className="w-4 h-4 text-on-surface-variant group-focus-within:text-primary" />
            <input 
              type="text" 
              placeholder="Search transactions..." 
              className="bg-transparent border-none outline-none text-sm px-3 w-full text-on-surface"
            />
          </div>

          <div className="flex items-center space-x-3 sm:space-x-6">
            <button className="relative text-on-surface-variant hover:text-on-surface transition-colors">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute top-0 right-0 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-primary rounded-full border-2 border-background"></span>
            </button>
            <div className="h-6 sm:h-8 w-[1px] bg-white/10 mx-1 sm:mx-2"></div>
            <UserButton afterSignOutUrl="/" appearance={{ elements: { userButtonAvatarBox: 'w-8 h-8 sm:w-10 sm:h-10 ring-2 ring-primary/20' } }} />
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 relative scrollbar-hide">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
