import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart, 
  Pie, 
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Download,
  Activity,
  ArrowUpRight,
  PieChart as PieChartIcon
} from 'lucide-react';
import { Card, Button, Skeleton, useToast } from '../components/ui';
import api from '../services/api';

const Analytics = () => {
  const { showToast } = useToast();
  const [trendData, setTrendData] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAnalyticsData = async () => {
    try {
      const [trendsRes, txsRes] = await Promise.all([
        api.get('/analytics/trends'),
        api.get('/transactions')
      ]);
      setTrendData(trendsRes.data);
      setTransactions(txsRes.data);
    } catch (error) {
      console.error("Failed to fetch analytics data:", error);
      showToast("Failed to load analytics trends.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  // Compute category spending breakdown dynamically
  const pieData = (() => {
    const expenses = transactions.filter(tx => tx.type === 'EXPENSE');
    const breakdown = {};
    expenses.forEach(tx => {
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

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-9 w-64" />
            <Skeleton className="h-4 w-96" />
          </div>
          <div className="flex space-x-3">
            <Skeleton className="h-10 w-36 rounded-full" />
            <Skeleton className="h-10 w-12 rounded-full" />
          </div>
        </div>

        {/* Main Chart Skeleton */}
        <Card className="h-[460px] flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-3">
              <Skeleton className="w-10 h-10 rounded-2xl" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-3 w-48" />
              </div>
            </div>
            <div className="flex space-x-4">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
          <div className="flex-1 flex items-end justify-between px-6 pt-10 h-[280px]">
            {[...Array(6)].map((_, idx) => (
              <Skeleton key={idx} className="h-[75%] w-[12%] rounded-t-2xl" />
            ))}
          </div>
        </Card>

        {/* Bottom Cards Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {[1, 2].map((i) => (
            <Card key={i} className="h-[360px] flex flex-col justify-between">
              <Skeleton className="h-6 w-40" />
              <div className="flex-1 flex items-center justify-center py-6">
                <Skeleton className="w-36 h-36 rounded-full" />
              </div>
              <Skeleton className="h-10 w-full rounded-2xl" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 pb-20"
    >
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Financial Analytics</h1>
          <p className="text-on-surface-variant mt-1 text-xs sm:text-sm">Deep dive into your spending habits and income trends.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <Button variant="secondary" onClick={fetchAnalyticsData} className="w-full sm:w-auto">
            <span>Refresh Trends</span>
          </Button>
          <Button variant="secondary" className="px-4 py-2 w-full sm:w-auto">
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main Trend Chart */}
      <Card className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-10">
          <div className="flex items-center space-x-3">
            <div className="p-2 sm:p-3 rounded-2xl bg-primary/10 text-primary">
              <Activity className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg">Cash Flow Trend</h3>
              <p className="text-[10px] sm:text-xs text-on-surface-variant">Monthly comparison of total income vs expenses</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 sm:space-x-6 text-[10px] sm:text-xs font-bold">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-primary" />
              <span className="text-on-surface-variant">Income</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-error" />
              <span className="text-on-surface-variant">Expenses</span>
            </div>
          </div>
        </div>
        
        <div className="h-[250px] sm:h-[350px] lg:h-[400px] w-full">
          {trendData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#006c49" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#006c49" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff4d4d" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ff4d4d" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#808080', fontSize: 12, fontWeight: 'bold' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#808080', fontSize: 12, fontWeight: 'bold' }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '16px', padding: '12px' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="income" stroke="#006c49" strokeWidth={4} fillOpacity={1} fill="url(#colorIncome)" />
                <Area type="monotone" dataKey="expense" stroke="#ff4d4d" strokeWidth={4} fillOpacity={1} fill="url(#colorExpense)" />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-on-surface-variant font-medium text-sm">
              No trends recorded. Please create transactions to start recording analysis.
            </div>
          )}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Dynamic Category Spending Breakdown */}
        <Card className="flex flex-col justify-between">
          <h3 className="font-bold text-base sm:text-lg mb-4 sm:mb-6">Category Spending</h3>
          <div className="flex-1 min-h-[180px] sm:min-h-[250px] relative flex items-center justify-center">
            {pieData.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
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
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-2xl font-bold">${totalExpenseSum.toFixed(2)}</span>
                  <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Total Spent</span>
                </div>
              </>
            ) : (
              <div className="text-center p-6 flex flex-col items-center">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                  <PieChartIcon className="w-8 h-8 text-on-surface-variant opacity-40" />
                </div>
                <p className="font-bold text-sm">No Category Data</p>
                <p className="text-on-surface-variant text-xs mt-1">
                  Add some expenses to see a breakdown of your spending by category.
                </p>
              </div>
            )}
          </div>
          {pieData.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-3 max-h-[120px] overflow-y-auto pt-2 border-t border-white/5">
              {pieData.map((item, i) => (
                <div key={i} className="flex items-center justify-between text-xs p-1">
                  <div className="flex items-center space-x-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="font-medium text-on-surface-variant">{item.name}</span>
                  </div>
                  <span className="font-bold">${item.value.toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Savings Growth */}
        <Card className="flex flex-col">
          <div className="flex items-center justify-between mb-4 sm:mb-8">
            <h3 className="font-bold text-base sm:text-lg">Savings Growth</h3>
            {trendData.length > 0 && (
              <div className="flex items-center space-x-1 text-success text-[10px] sm:text-xs font-bold">
                <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Steady Growth</span>
              </div>
            )}
          </div>
          <div className="flex-1 min-h-[180px] sm:min-h-[250px]">
            {trendData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#808080', fontSize: 10, fontWeight: 'bold' }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#808080', fontSize: 10, fontWeight: 'bold' }} 
                  />
                  <Tooltip 
                    cursor={{ fill: '#ffffff05' }}
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '12px' }}
                  />
                  <Bar 
                    dataKey="income" 
                    fill="#006c49" 
                    radius={[6, 6, 0, 0]} 
                    barSize={20}
                    opacity={0.8}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-on-surface-variant font-medium text-sm">
                No savings trends. Create transactions to track your growth.
              </div>
            )}
          </div>
          <div className="mt-6 p-4 bg-white/5 rounded-2xl border border-white/5">
            <p className="text-[11px] text-on-surface-variant leading-relaxed font-semibold text-center italic">
              "Disciplined financial planning starts with consistent tracking. You are making great progress!"
            </p>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export default Analytics;
