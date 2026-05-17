import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  Download, 
  Trash2,
  Plus,
  ArrowUpCircle,
  ArrowDownCircle,
  Calendar
} from 'lucide-react';
import { Card, Button, cn, Skeleton, useToast } from '../components/ui';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Transactions = () => {
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('ALL');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchTransactions = async () => {
    try {
      const response = await api.get('/transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
      showToast("Failed to fetch transactions.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this transaction?")) return;
    
    const previousTransactions = [...transactions];
    
    // Optimistic UI update: immediately remove from frontend state
    setTransactions(prev => prev.filter(tx => tx.id !== id));
    setDeletingId(id);
    
    try {
      await api.delete(`/transactions/${id}`);
      showToast("Transaction deleted successfully!", "success");
    } catch (error) {
      console.error("Failed to delete transaction:", error);
      showToast("Failed to delete transaction. Reverting...", "error");
      // Rollback optimistic state update on failure
      setTransactions(previousTransactions);
    } finally {
      setDeletingId(null);
    }
  };

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (tx.category?.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'ALL' || tx.type === filterType;
    return matchesSearch && matchesType;
  });

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
        
        {/* Filters Skeleton */}
        <Card className="p-4 rounded-2xl">
          <Skeleton className="h-12 w-full" />
        </Card>
        
        {/* Table Skeleton */}
        <Card className="p-0 overflow-hidden rounded-3xl">
          <div className="p-6 border-b border-white/5 space-y-4">
            <Skeleton className="h-4 w-full" />
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex justify-between items-center py-4 border-b border-white/5 last:border-0">
                <div className="flex items-center space-x-4 w-1/3">
                  <Skeleton className="w-10 h-10 rounded-xl" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-16 ml-auto" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-on-surface-variant mt-1 text-sm">Monitor and manage all your financial activities.</p>
        </div>
        <Link to="/transactions/new">
          <Button className="w-full md:w-auto">
            <Plus className="w-4 h-4" />
            <span>Add Transaction</span>
          </Button>
        </Link>
      </div>

      {/* Filters Bar */}
      <Card className="p-4 rounded-2xl">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 flex items-center bg-white/5 border border-white/5 px-4 py-2 rounded-xl focus-within:border-primary/50 transition-colors">
            <Search className="w-4 h-4 text-on-surface-variant" />
            <input 
              type="text" 
              placeholder="Search by name, category..." 
              className="bg-transparent border-none outline-none text-sm px-3 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
              {['ALL', 'INCOME', 'EXPENSE'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={cn(
                    "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                    filterType === type ? "bg-primary text-white shadow-lg" : "text-on-surface-variant hover:text-on-surface"
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
            <Button variant="secondary" className="px-4 py-2 rounded-xl" onClick={fetchTransactions}>
              Refresh
            </Button>
          </div>
        </div>
      </Card>

      {/* Transactions Table */}
      <Card className="p-0 overflow-hidden rounded-3xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/5">
                <th className="p-6 text-xs font-bold uppercase tracking-widest text-on-surface-variant">Transaction</th>
                <th className="p-6 text-xs font-bold uppercase tracking-widest text-on-surface-variant">Category</th>
                <th className="p-6 text-xs font-bold uppercase tracking-widest text-on-surface-variant">Method</th>
                <th className="p-6 text-xs font-bold uppercase tracking-widest text-on-surface-variant flex items-center">
                  <span>Date</span>
                  <ArrowUpDown className="w-3 h-3 ml-2 opacity-50" />
                </th>
                <th className="p-6 text-xs font-bold uppercase tracking-widest text-on-surface-variant text-right">Amount</th>
                <th className="p-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs",
                        tx.type === 'INCOME' ? "bg-success/10 text-success" : "bg-error/10 text-error"
                      )}>
                        {tx.type === 'INCOME' ? <ArrowUpCircle className="w-5 h-5" /> : <ArrowDownCircle className="w-5 h-5" />}
                      </div>
                      <span className="font-bold text-sm">{tx.title}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="text-xs font-bold px-3 py-1 bg-white/5 rounded-full border border-white/5 text-on-surface-variant">
                      {tx.category?.name || 'General'}
                    </span>
                  </td>
                  <td className="p-6">
                    <span className="text-sm text-on-surface-variant">{tx.paymentMethod}</span>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center text-sm text-on-surface-variant">
                      <Calendar className="w-4 h-4 mr-2 opacity-50" />
                      <span>{new Date(tx.date).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className={cn(
                    "p-6 text-right font-bold text-sm",
                    tx.type === 'INCOME' ? "text-success" : "text-on-surface"
                  )}>
                    {tx.type === 'INCOME' ? '+' : ''}{Number(tx.amount).toFixed(2)}
                  </td>
                  <td className="p-6 text-right">
                    <button 
                      onClick={() => handleDelete(tx.id)}
                      disabled={deletingId === tx.id}
                      className="text-error/60 hover:text-error transition-colors p-2 hover:bg-error/10 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Delete Transaction"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredTransactions.length === 0 && (
          <div className="p-20 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
              <Search className="w-8 h-8 text-on-surface-variant" />
            </div>
            <h3 className="text-xl font-bold">No transactions found</h3>
            <p className="text-on-surface-variant mt-2 max-w-xs">
              We couldn't find any results matching your filters. Try adjusting your search term.
            </p>
            <Button variant="secondary" className="mt-6" onClick={() => {setSearchTerm(''); setFilterType('ALL');}}>
              Reset All Filters
            </Button>
          </div>
        )}

        {/* Total stats info */}
        <div className="p-6 border-t border-white/5 flex items-center justify-between">
          <p className="text-xs text-on-surface-variant">Showing <span className="text-on-surface font-bold">{filteredTransactions.length}</span> of <span className="text-on-surface font-bold">{transactions.length}</span> transactions</p>
          <div className="flex space-x-2">
            <Button variant="secondary" className="px-4 py-2 text-xs" disabled>Previous</Button>
            <Button variant="secondary" className="px-4 py-2 text-xs" disabled>Next</Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default Transactions;
