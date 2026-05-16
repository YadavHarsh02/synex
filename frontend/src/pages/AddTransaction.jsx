import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  DollarSign, 
  Calendar as CalendarIcon, 
  Tag, 
  CreditCard, 
  FileText,
  Repeat,
  CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, cn } from '../components/ui';

const CATEGORIES = {
  EXPENSE: ['Housing', 'Food', 'Transport', 'Entertainment', 'Shopping', 'Health', 'Tech', 'Other'],
  INCOME: ['Salary', 'Freelance', 'Investment', 'Gift', 'Other']
};

const PAYMENT_METHODS = ['Cash', 'Credit Card', 'Debit Card', 'Bank Transfer', 'Apple Pay', 'PayPal'];

import api from '../services/api';

const AddTransaction = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: 'EXPENSE',
    amount: '',
    title: '',
    category: '', // This will be the name in UI, but we need ID for API
    method: 'Cash',
    date: new Date().toISOString().split('T')[0],
    note: '',
    recurring: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // In a full app, we would fetch category IDs. 
      // For now, we'll use a placeholder or handle it in the backend.
      await api.post('/transactions', {
        title: formData.title,
        amount: parseFloat(formData.amount),
        type: formData.type,
        date: formData.date,
        note: formData.note,
        paymentMethod: formData.method,
        recurring: formData.recurring,
        // We'll let the backend find or create a default category for now
        // if we haven't implemented the categories list yet.
      });
      
      setIsSubmitted(true);
      setTimeout(() => {
        navigate('/transactions');
      }, 2000);
    } catch (error) {
      console.error("Failed to save transaction:", error);
      alert("Error saving transaction. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-24 h-24 bg-success/20 rounded-full flex items-center justify-center mb-8"
        >
          <CheckCircle2 className="w-12 h-12 text-success" />
        </motion.div>
        <h2 className="text-3xl font-bold">Transaction Saved!</h2>
        <p className="text-on-surface-variant mt-2">Redirecting you to the transaction list...</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-2xl mx-auto space-y-8 pb-20"
    >
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-on-surface-variant hover:text-on-surface transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-bold uppercase tracking-widest">Back</span>
      </button>

      <div>
        <h1 className="text-3xl font-bold tracking-tight">Record Activity</h1>
        <p className="text-on-surface-variant mt-1 text-sm">Add a new income or expense to your records.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card className="p-8">
          <div className="space-y-8">
            {/* Type Toggle */}
            <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/5 relative">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'EXPENSE', category: '' })}
                className={cn(
                  "flex-1 py-3 rounded-xl text-sm font-bold transition-all relative z-10",
                  formData.type === 'EXPENSE' ? "text-white" : "text-on-surface-variant"
                )}
              >
                Expense
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'INCOME', category: '' })}
                className={cn(
                  "flex-1 py-3 rounded-xl text-sm font-bold transition-all relative z-10",
                  formData.type === 'INCOME' ? "text-white" : "text-on-surface-variant"
                )}
              >
                Income
              </button>
              <motion.div 
                className={cn(
                  "absolute inset-y-1.5 w-[calc(50%-6px)] rounded-xl z-0",
                  formData.type === 'EXPENSE' ? "bg-error left-1.5" : "bg-success right-1.5"
                )}
                layoutId="toggle-bg"
              />
            </div>

            {/* Amount Input */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant px-1">Amount</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                  <span className="text-2xl font-bold text-on-surface-variant group-focus-within:text-on-surface transition-colors">$</span>
                </div>
                <input 
                  type="number" 
                  step="0.01"
                  required
                  placeholder="0.00"
                  className="w-full bg-white/5 border border-white/5 rounded-3xl py-6 pl-14 pr-8 text-4xl font-bold outline-none focus:border-primary/50 transition-all placeholder:text-white/10"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                />
              </div>
            </div>

            {/* Title Input */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant px-1">Description</label>
              <div className="relative">
                <FileText className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Monthly Rent, Coffee, Project X..."
                  className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-sm font-medium outline-none focus:border-primary/50 transition-all"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category Dropdown */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant px-1">Category</label>
                <div className="relative">
                  <Tag className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                  <select 
                    required
                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-sm font-medium outline-none focus:border-primary/50 transition-all appearance-none"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="" disabled>Select category</option>
                    {CATEGORIES[formData.type].map(cat => (
                      <option key={cat} value={cat} className="bg-surface">{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date Picker */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant px-1">Date</label>
                <div className="relative">
                  <CalendarIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                  <input 
                    type="date" 
                    required
                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-sm font-medium outline-none focus:border-primary/50 transition-all"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant px-1">Payment Method</label>
              <div className="flex flex-wrap gap-2">
                {PAYMENT_METHODS.map(method => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setFormData({ ...formData, method })}
                    className={cn(
                      "px-4 py-2 rounded-xl text-xs font-bold border transition-all",
                      formData.method === method 
                        ? "bg-primary/10 border-primary text-primary" 
                        : "bg-white/5 border-transparent text-on-surface-variant hover:border-white/20"
                    )}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            {/* Recurring Toggle */}
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Repeat className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold">Recurring Transaction</p>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Repeat this monthly</p>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setFormData({ ...formData, recurring: !formData.recurring })}
                className={cn(
                  "w-12 h-6 rounded-full relative transition-colors duration-300",
                  formData.recurring ? "bg-primary" : "bg-white/10"
                )}
              >
                <div className={cn(
                  "absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300",
                  formData.recurring ? "left-7" : "left-1"
                )} />
              </button>
            </div>
          </div>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button type="button" variant="secondary" className="flex-1 py-4" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit" className="flex-[2] py-4 shadow-xl shadow-primary/20">
            Confirm Transaction
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddTransaction;
