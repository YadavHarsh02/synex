import { motion } from 'framer-motion';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  Zap,
  MoreVertical
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
import { Card, Button, cn } from '../components/ui';

// Mock Data


const chartData = [
  { name: 'Mon', income: 4000, expense: 2400 },
  { name: 'Tue', income: 3000, expense: 1398 },
  { name: 'Wed', income: 2000, expense: 9800 },
  { name: 'Thu', income: 2780, expense: 3908 },
  { name: 'Fri', income: 1890, expense: 4800 },
  { name: 'Sat', income: 2390, expense: 3800 },
  { name: 'Sun', income: 3490, expense: 4300 },
];

const pieData = [
  { name: 'Housing', value: 1200, color: '#31572c' },
  { name: 'Food', value: 800, color: '#4f772d' },
  { name: 'Transport', value: 400, color: '#90a955' },
  { name: 'Entertainment', value: 300, color: '#ecf39e' },
  { name: 'Other', value: 200, color: '#132a13' },
];

const recentTransactions = [
  { id: 1, title: 'Apple Store', category: 'Tech', amount: -1299.00, date: 'Oct 24, 2024', method: 'Credit Card' },
  { id: 2, title: 'Salary Deposit', category: 'Income', amount: 8500.00, date: 'Oct 23, 2024', method: 'Bank Transfer' },
  { id: 3, title: 'Starbucks', category: 'Food', amount: -6.50, date: 'Oct 22, 2024', method: 'Apple Pay' },
  { id: 4, title: 'Rent Payment', category: 'Housing', amount: -2100.00, date: 'Oct 21, 2024', method: 'Bank Transfer' },
];

import { useEffect, useState } from 'react';
import api from '../services/api';

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await api.get('/analytics/summary');
        setSummary(response.data);
      } catch (error) {
        console.error("Failed to fetch summary:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  const stats = [
    { title: 'Total Balance', value: summary ? `$${summary.totalBalance.toFixed(2)}` : '$0.00', change: '+0%', icon: Wallet, color: 'text-primary' },
    { title: 'Monthly Income', value: summary ? `$${summary.totalIncome.toFixed(2)}` : '$0.00', change: '+0%', icon: TrendingUp, color: 'text-success' },
    { title: 'Monthly Expenses', value: summary ? `$${summary.totalExpense.toFixed(2)}` : '$0.00', change: '+0%', icon: TrendingDown, color: 'text-error' },
    { title: 'Transactions', value: summary ? summary.transactionCount.toString() : '0', change: 'Live', icon: Zap, color: 'text-warning' },
  ];

  if (loading) {
    return <div className="h-full flex items-center justify-center">Loading...</div>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financial Overview</h1>
          <p className="text-on-surface-variant mt-1 text-sm">Welcome back! Here's what's happening with your money today.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="secondary" className="hidden sm:flex">Download Report</Button>
          <Button>Add Transaction</Button>
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
              <div className={cn(
                "text-xs font-bold px-2 py-1 rounded-full",
                stat.change.startsWith('+') ? "text-success bg-success/10" : "text-error bg-error/10"
              )}>
                {stat.change}
              </div>
            </div>
            <div className="mt-6">
              <p className="text-xs text-on-surface-variant font-bold uppercase tracking-widest">{stat.title}</p>
              <h2 className="text-2xl font-bold mt-1 tracking-tight">{stat.value}</h2>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-bold text-lg">Activity Trend</h3>
              <p className="text-xs text-on-surface-variant">Weekly income vs expenses comparison</p>
            </div>
            <select className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs font-bold outline-none">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
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
          </div>
        </Card>

        {/* Expense Breakdown */}
        <Card>
          <h3 className="font-bold text-lg mb-6">Spending Breakdown</h3>
          <div className="h-[250px] relative">
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
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold">$2,900</span>
              <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Total</span>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            {pieData.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="font-medium text-on-surface-variant">{item.name}</span>
                </div>
                <span className="font-bold">${item.value}</span>
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
            <Button variant="ghost" className="text-xs p-0">View All</Button>
          </div>
          <div className="space-y-4">
            {recentTransactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between group cursor-pointer p-2 rounded-2xl hover:bg-white/5 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs",
                    tx.amount > 0 ? "bg-success/10 text-success" : "bg-error/10 text-error"
                  )}>
                    {tx.title.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{tx.title}</p>
                    <p className="text-xs text-on-surface-variant">{tx.category} • {tx.method}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={cn("font-bold text-sm", tx.amount > 0 ? "text-success" : "text-on-surface")}>
                    {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)}
                  </p>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">{tx.date}</p>
                </div>
              </div>
            ))}
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
          <Button className="w-full mt-6 bg-primary text-white hover:bg-primary/90">Refresh Analysis</Button>
        </Card>
      </div>
    </motion.div>
  );
};

export default Dashboard;
