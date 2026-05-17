import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, 
  Plus, 
  AlertCircle, 
  TrendingUp, 
  Trash2,
  PieChart,
  X
} from 'lucide-react';
import { Card, Button, cn, Skeleton, useToast } from '../components/ui';
import api from '../services/api';

const BudgetCard = ({ budget, onDelete, isDeleting }) => {
  const spent = Number(budget.spent || 0);
  const limit = Number(budget.amount || 0);
  const percentage = Math.min((spent / limit) * 100, 100);
  const isOver = spent > limit;
  const remaining = Math.max(limit - spent, 0);
  const color = budget.category?.color || '#006c49';

  return (
    <Card className="flex flex-col h-full justify-between min-h-[220px]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white" 
            style={{ backgroundColor: color }}
          >
            <PieChart className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm">{budget.category?.name || 'General'}</h4>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Monthly Budget</p>
          </div>
        </div>
        <button 
          onClick={() => onDelete(budget.id)}
          disabled={isDeleting}
          className="text-error/60 hover:text-error transition-colors p-2 hover:bg-error/10 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed"
          title="Delete Budget"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-2xl font-bold">${spent.toFixed(2)}</span>
            <span className="text-on-surface-variant text-xs ml-1">of ${limit.toFixed(0)}</span>
          </div>
          <div className={cn(
            "text-xs font-bold px-2 py-1 rounded-lg",
            isOver ? "bg-error/10 text-error" : "bg-success/10 text-success"
          )}>
            {percentage.toFixed(0)}%
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{ backgroundColor: isOver ? '#ff4d4d' : color }}
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-1.5 text-on-surface-variant">
            {isOver ? (
              <>
                <AlertCircle className="w-4 h-4 text-error" />
                <span className="text-[10px] font-bold text-error uppercase tracking-wider">Overspent by ${(spent - limit).toFixed(2)}</span>
              </>
            ) : (
              <>
                <TrendingUp className="w-4 h-4 text-success" />
                <span className="text-[10px] font-bold text-success uppercase tracking-wider">${remaining.toFixed(2)} remaining</span>
              </>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

const Budgets = () => {
  const { showToast } = useToast();
  const [budgets, setBudgets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const fetchBudgetsAndCategories = async () => {
    try {
      const [budgetsRes, categoriesRes] = await Promise.all([
        api.get('/budgets'),
        api.get('/categories')
      ]);
      setBudgets(budgetsRes.data);
      setCategories(categoriesRes.data);
    } catch (error) {
      console.error("Failed to load budgets/categories:", error);
      showToast("Failed to fetch budgets data.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgetsAndCategories();
  }, []);

  const handleDeleteBudget = async (id) => {
    if (!window.confirm("Are you sure you want to delete this budget?")) return;
    
    const previousBudgets = [...budgets];
    setBudgets(prev => prev.filter(b => b.id !== id));
    setDeletingId(id);
    
    try {
      await api.delete(`/budgets/${id}`);
      showToast("Budget deleted successfully!", "success");
    } catch (error) {
      console.error("Failed to delete budget:", error);
      showToast("Failed to delete budget. Reverting...", "error");
      setBudgets(previousBudgets);
    } finally {
      setDeletingId(null);
    }
  };

  const handleCreateBudget = async (e) => {
    e.preventDefault();
    if (!amount || !categoryId) return;
    setSaving(true);
    
    try {
      const response = await api.post('/budgets', {
        amount: parseFloat(amount),
        categoryId,
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear()
      });
      
      showToast("Budget saved successfully!", "success");
      
      // Update budgets list live
      setBudgets(prev => {
        const existingIdx = prev.findIndex(b => b.id === response.data.id);
        if (existingIdx > -1) {
          const updated = [...prev];
          updated[existingIdx] = response.data;
          return updated;
        }
        return [...prev, response.data];
      });
      
      setIsModalOpen(false);
      setAmount('');
      setCategoryId('');
    } catch (error) {
      console.error("Failed to save budget:", error);
      showToast("Failed to save budget.", "error");
    } finally {
      setSaving(false);
    }
  };

  const totalLimit = budgets.reduce((sum, b) => sum + Number(b.amount), 0);
  const totalSpent = budgets.reduce((sum, b) => sum + Number(b.spent || 0), 0);
  const totalPercentage = totalLimit > 0 ? (totalSpent / totalLimit) * 100 : 0;

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-9 w-48" />
            <Skeleton className="h-4 w-80" />
          </div>
          <Skeleton className="h-10 w-36 rounded-full" />
        </div>
        
        {/* Summary Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="h-32 flex flex-col justify-between">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-3 w-40" />
            </Card>
          ))}
        </div>

        {/* Budgets Grid Skeleton */}
        <div className="space-y-6">
          <Skeleton className="h-6 w-44" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="h-56 flex flex-col justify-between">
                <div className="flex items-center space-x-3">
                  <Skeleton className="w-10 h-10 rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-5 w-12 rounded-lg" />
                  </div>
                  <Skeleton className="h-2 w-full rounded-full" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-20"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Budgets</h1>
          <p className="text-on-surface-variant mt-1 text-sm">Plan and control your spending by category.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4" />
          <span>Create Budget</span>
        </Button>
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-primary/5 border-primary/10 flex flex-col justify-between">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Total Budget</p>
          <h2 className="text-3xl font-bold mt-4">${totalLimit.toFixed(2)}</h2>
          <p className="text-xs text-on-surface-variant mt-2">Combined limit for all categories</p>
        </Card>
        <Card className="flex flex-col justify-between">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">Total Spent</p>
          <h2 className="text-3xl font-bold mt-4">${totalSpent.toFixed(2)}</h2>
          <div className="flex items-center space-x-2 mt-2">
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${Math.min(totalPercentage, 100)}%` }} />
            </div>
            <span className="text-[10px] font-bold">{totalPercentage.toFixed(0)}%</span>
          </div>
        </Card>
        <Card className="flex flex-col justify-between">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">Remaining</p>
          <h2 className="text-3xl font-bold mt-4">${Math.max(totalLimit - totalSpent, 0).toFixed(2)}</h2>
          <p className={cn(
            "text-xs font-bold mt-2",
            totalSpent > totalLimit ? "text-error" : "text-success"
          )}>
            {totalSpent > totalLimit ? "Over budget this month" : "On track for this month"}
          </p>
        </Card>
      </div>

      {/* Category Budgets Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-lg">Category Breakdown</h3>
          </div>
          <Button variant="secondary" className="px-3 py-1.5 text-xs font-bold" onClick={fetchBudgetsAndCategories}>
            Refresh
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgets.map(budget => (
            <BudgetCard 
              key={budget.id} 
              budget={budget} 
              onDelete={handleDeleteBudget}
              isDeleting={deletingId === budget.id}
            />
          ))}
          
          {/* Add New Budget Placeholder */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-[32px] p-8 hover:bg-white/5 hover:border-primary/50 transition-all group min-h-[220px]"
          >
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Plus className="w-6 h-6 text-on-surface-variant" />
            </div>
            <p className="font-bold text-sm">Add New Budget</p>
            <p className="text-[10px] text-on-surface-variant mt-1">Set limits for more categories</p>
          </button>
        </div>
      </div>

      {/* Glassmorphic Create Budget Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md bg-surface/90 border border-white/10 p-8 rounded-[32px] shadow-2xl backdrop-blur-xl z-10"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-on-surface-variant hover:text-on-surface transition-colors p-1.5 hover:bg-white/5 rounded-xl"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="mb-6">
                <h3 className="text-xl font-bold">Set Category Budget</h3>
                <p className="text-xs text-on-surface-variant mt-1">Define monthly limits to keep your expenses in check.</p>
              </div>

              <form onSubmit={handleCreateBudget} className="space-y-6">
                {/* Category Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant px-1">Category</label>
                  <select 
                    required
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-sm font-medium outline-none focus:border-primary/50 transition-all appearance-none"
                  >
                    <option value="" disabled className="bg-surface">Select category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id} className="bg-surface">{cat.name}</option>
                    ))}
                  </select>
                </div>

                {/* Amount Input */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant px-1">Monthly Limit ($)</label>
                  <input 
                    type="number" 
                    step="1"
                    required
                    placeholder="e.g. 500, 1000..."
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-sm font-medium outline-none focus:border-primary/50 transition-all"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button 
                    type="button" 
                    variant="secondary" 
                    className="flex-1 py-3" 
                    onClick={() => setIsModalOpen(false)}
                    disabled={saving}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-[2] py-3 shadow-xl shadow-primary/20"
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Save Budget"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Budgets;
