import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Plus, 
  AlertCircle, 
  TrendingUp, 
  ChevronRight,
  PieChart
} from 'lucide-react';
import { Card, Button, cn } from '../components/ui';
import api from '../services/api';

const BudgetCard = ({ budget }) => {
  const spent = Number(budget.spent || 0);
  const limit = Number(budget.amount || 0);
  const percentage = Math.min((spent / limit) * 100, 100);
  const isOver = spent > limit;
  const remaining = Math.max(limit - spent, 0);
  const color = budget.category?.color || 'bg-primary';

  return (
    <Card className="flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white", color)}>
            <PieChart className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm">{budget.category?.name || 'General'}</h4>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Monthly Budget</p>
          </div>
        </div>
        <button className="text-on-surface-variant hover:text-on-surface transition-colors">
          <ChevronRight className="w-5 h-5" />
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
            className={cn("h-full rounded-full", isOver ? "bg-error" : color)}
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
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await api.get('/budgets');
        setBudgets(response.data);
      } catch (error) {
        console.error("Failed to fetch budgets:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBudgets();
  }, []);

  const totalLimit = budgets.reduce((sum, b) => sum + Number(b.amount), 0);
  const totalSpent = budgets.reduce((sum, b) => sum + Number(b.spent || 0), 0);
  const totalPercentage = totalLimit > 0 ? (totalSpent / totalLimit) * 100 : 0;

  if (loading) {
    return <div className="h-full flex items-center justify-center">Loading budgets...</div>;
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
        <Button>
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
              <div className="h-full bg-primary" style={{ width: `${totalPercentage}%` }} />
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
          <select className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs font-bold outline-none">
            <option>Current Month</option>
          </select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgets.map(budget => (
            <BudgetCard key={budget.id} budget={budget} />
          ))}
          
          {/* Add New Budget Placeholder */}
          <button className="flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-[32px] p-8 hover:bg-white/5 hover:border-primary/50 transition-all group min-h-[220px]">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Plus className="w-6 h-6 text-on-surface-variant" />
            </div>
            <p className="font-bold text-sm">Add New Budget</p>
            <p className="text-[10px] text-on-surface-variant mt-1">Set limits for more categories</p>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Budgets;
