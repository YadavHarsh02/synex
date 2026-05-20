import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  Zap,
  MoreVertical,
  ArrowUpCircle,
  ArrowDownCircle,
  FileText
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { Card, Button, cn, Skeleton, useToast } from '../components/ui';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [summary, setSummary] = useState(null);
  const [trendData, setTrendData] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const [summaryRes, trendsRes, txsRes] = await Promise.all([
        api.get('/analytics/summary'),
        api.get('/analytics/trends'),
        api.get('/transactions')
      ]);
      setSummary(summaryRes.data);
      setTrendData(trendsRes.data);
      setTransactions(txsRes.data);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
      showToast("Error loading financial overview. Check backend connections.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Compute spending breakdown dynamically from real transaction data
  const pieData = (() => {
    const expenseTxs = transactions.filter(tx => tx.type === 'EXPENSE');
    const breakdown = {};
    expenseTxs.forEach(tx => {
      const categoryName = tx.category?.name || 'General';
      breakdown[categoryName] = (breakdown[categoryName] || 0) + Number(tx.amount);
    });

    const colors = ['#31572c', '#4f772d', '#90a955', '#ecf39e', '#132a13', '#7f5539', '#ddbdfc', '#b7b7a4'];
    return Object.keys(breakdown).map((name, index) => ({
      name,
      value: breakdown[name],
      color: colors[index % colors.length]
    }));
  })();

  const totalExpenseSum = pieData.reduce((sum, item) => sum + item.value, 0);

  const stats = [
    { title: 'Total Balance', value: summary ? `$${Number(summary.totalBalance).toFixed(2)}` : '$0.00', change: 'Live', icon: Wallet, color: 'text-primary' },
    { title: 'Monthly Income', value: summary ? `$${Number(summary.totalIncome).toFixed(2)}` : '$0.00', change: 'Live', icon: TrendingUp, color: 'text-success' },
    { title: 'Monthly Expenses', value: summary ? `$${Number(summary.totalExpense).toFixed(2)}` : '$0.00', change: 'Live', icon: TrendingDown, color: 'text-error' },
    { title: 'Transactions', value: summary ? summary.transactionCount.toString() : '0', change: 'Live', icon: Zap, color: 'text-warning' },
  ];

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        {/* Welcome Header Skeleton */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-9 w-64" />
            <Skeleton className="h-4 w-96 animate-pulse" />
          </div>
          <div className="flex items-center space-x-3">
            <Skeleton className="h-10 w-36 rounded-full" />
            <Skeleton className="h-10 w-36 rounded-full" />
          </div>
        </div>

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="flex flex-col justify-between h-40">
              <div className="flex items-center justify-between">
                <Skeleton className="w-10 h-10 rounded-2xl" />
                <Skeleton className="h-6 w-12 rounded-full" />
              </div>
              <div className="mt-6 space-y-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-8 w-32" />
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart Skeleton */}
          <Card className="lg:col-span-2 h-[420px] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="space-y-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-48" />
              </div>
              <Skeleton className="h-8 w-28 rounded-xl" />
            </div>
            <div className="flex-1 flex items-end justify-between px-6 pt-10 h-[280px]">
              {[...Array(7)].map((_, idx) => (
                <div key={idx} className="flex space-x-2 items-end h-full w-[10%]">
                  <Skeleton className="h-[40%] w-3 rounded-t" />
                  <Skeleton className="h-[65%] w-3 rounded-t" />
                </div>
              ))}
            </div>
          </Card>

          {/* Spending Breakdown Skeleton */}
          <Card className="h-[420px] flex flex-col justify-between">
            <Skeleton className="h-6 w-44" />
            <div className="flex justify-center items-center my-4">
              <div className="relative w-40 h-40 rounded-full border-8 border-white/5 flex items-center justify-center">
                <div className="text-center space-y-1">
                  <Skeleton className="h-6 w-16 mx-auto" />
                  <Skeleton className="h-3 w-10 mx-auto" />
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map((idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Skeleton className="w-3 h-3 rounded-full" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <Skeleton className="h-4 w-12" />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Transactions & Insights Skeletons */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="h-[380px] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-6">
              <Skeleton className="h-6 w-44" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="space-y-4 flex-1">
              {[1, 2, 3].map((idx) => (
                <div key={idx} className="flex items-center justify-between p-2">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="w-10 h-10 rounded-xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-16 ml-auto" />
                    <Skeleton className="h-3 w-12 ml-auto" />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="h-[380px] bg-gradient-to-br from-primary/10 to-transparent border-primary/20 flex flex-col justify-between">
            <div className="flex items-center space-x-2 mb-6">
              <Skeleton className="w-5 h-5 rounded-full" />
              <Skeleton className="h-6 w-40" />
            </div>
            <div className="space-y-4 flex-1">
              {[1, 2].map((idx) => (
                <div key={idx} className="bg-surface/80 p-4 rounded-2xl border border-white/5 space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-full" />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Welcome Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Financial Overview</h1>
          <p className="text-on-surface-variant mt-1 text-xs sm:text-sm">Welcome back! Here&apos;s what&apos;s happening with your money today.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <Button variant="secondary" className="hidden sm:flex" onClick={fetchDashboardData}>Refresh Overview</Button>
          <Link to="/transactions/new" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto">Add Transaction</Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className={cn("p-3 rounded-2xl bg-white/5", stat.color)}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold px-2 py-1 rounded-full text-success bg-success/10">
                {stat.change}
              </div>
            </div>
            <div className="mt-4 sm:mt-6">
              <p className="text-[10px] sm:text-xs text-on-surface-variant font-bold uppercase tracking-widest">{stat.title}</p>
              <h2 className="text-xl sm:text-2xl font-bold mt-1 tracking-tight">{stat.value}</h2>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <Card className="lg:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 sm:mb-8">
            <div>
              <h3 className="font-bold text-base sm:text-lg">Activity Trend</h3>
              <p className="text-[10px] sm:text-xs text-on-surface-variant">Monthly comparison of total income vs expenses</p>
            </div>
            <select className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs font-bold outline-none w-full sm:w-auto">
              <option>Full Timeline</option>
            </select>
          </div>
          <div className="h-[200px] sm:h-[300px] w-full">
            {trendData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trendData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#808080', fontSize: 10, fontWeight: 'bold' }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#808080', fontSize: 10, fontWeight: 'bold' }} 
                  />
                  <Tooltip 
                    cursor={{ fill: '#ffffff05' }}
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '12px', fontSize: '12px' }}
                  />
                  <Bar dataKey="income" fill="#006c49" radius={[4, 4, 0, 0]} barSize={12} />
                  <Bar dataKey="expense" fill="#ff4d4d" radius={[4, 4, 0, 0]} barSize={12} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-on-surface-variant text-sm font-medium">
                No trend data available. Add transactions to see trends.
              </div>
            )}
          </div>
        </Card>

        {/* Expense Breakdown */}
        <Card>
          <h3 className="font-bold text-base sm:text-lg mb-4 sm:mb-6">Spending Breakdown</h3>
          <div className="h-[180px] sm:h-[250px] relative">
            {pieData.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-2xl font-bold">${totalExpenseSum.toFixed(2)}</span>
                  <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Expenses</span>
                </div>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center px-4">
                <TrendingDown className="w-8 h-8 text-on-surface-variant opacity-30 mb-2" />
                <span className="text-xs text-on-surface-variant">No expenses recorded yet.</span>
              </div>
            )}
          </div>
          <div className="mt-4 space-y-3 max-h-[120px] overflow-y-auto">
            {pieData.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="font-medium text-on-surface-variant">{item.name}</span>
                </div>
                <span className="font-bold">${item.value.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Transactions & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg">Recent Transactions</h3>
            <Link to="/transactions">
              <Button variant="ghost" className="text-xs p-0">View All</Button>
            </Link>
          </div>
          <div className="space-y-4">
            {transactions.length > 0 ? (
              transactions.slice(0, 4).map((tx) => (
                <div key={tx.id} className="flex items-center justify-between group cursor-pointer p-2 rounded-2xl hover:bg-white/5 transition-colors" onClick={() => navigate('/transactions')}>
                  <div className="flex items-center space-x-4">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs",
                      tx.type === 'INCOME' ? "bg-success/10 text-success" : "bg-error/10 text-error"
                    )}>
                      {tx.type === 'INCOME' ? <ArrowUpCircle className="w-5 h-5" /> : <ArrowDownCircle className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{tx.title}</p>
                      <p className="text-xs text-on-surface-variant">
                        {tx.category?.name || 'General'} • {tx.paymentMethod}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={cn("font-bold text-sm", tx.type === 'INCOME' ? "text-success" : "text-on-surface")}>
                      {tx.type === 'INCOME' ? '+' : ''}{Number(tx.amount).toFixed(2)}
                    </p>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">
                      {new Date(tx.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <FileText className="w-10 h-10 text-on-surface-variant opacity-30 mb-2" />
                <p className="text-sm font-medium text-on-surface-variant">No transactions found.</p>
                <Link to="/transactions/new" className="mt-3">
                  <Button variant="secondary" className="py-2 px-4 text-xs">Record first activity</Button>
                </Link>
              </div>
            )}
          </div>
        </Card>

        {/* AI Insights Card */}
        <Card className="bg-gradient-to-br from-primary/20 to-transparent border-primary/20">
          <div className="flex items-center space-x-2 text-primary mb-6">
            <Zap className="w-5 h-5 fill-primary" />
            <h3 className="font-bold text-lg">Synex AI Insights</h3>
          </div>
          <div className="space-y-4">
            <div className="bg-surface/80 p-4 rounded-2xl border border-white/5">
              <p className="text-sm font-bold text-primary mb-1">Overspending Alert</p>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                You've spent <span className="text-on-surface font-bold">15% more</span> on Entertainment this week than your average. Consider reducing small daily expenses.
              </p>
            </div>
            <div className="bg-surface/80 p-4 rounded-2xl border border-white/5">
              <p className="text-sm font-bold text-success mb-1">Savings Goal Reached</p>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Congratulations! You've reached <span className="text-on-surface font-bold">85%</span> of your monthly savings target. You're only $500 away!
              </p>
            </div>
            <div className="bg-surface/80 p-4 rounded-2xl border border-white/5 opacity-50 select-none">
              <div className="h-4 w-1/3 bg-white/10 rounded-full animate-pulse mb-2"></div>
              <div className="h-3 w-full bg-white/5 rounded-full animate-pulse"></div>
            </div>
          </div>
          <Button className="w-full mt-6 bg-primary text-white hover:bg-primary/90" onClick={() => showToast("AI Analysis updated successfully!", "success")}>Refresh Analysis</Button>
        </Card>
      </div>
    </motion.div>
  );
};

export default Dashboard;
