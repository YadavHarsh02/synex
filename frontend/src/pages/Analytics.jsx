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
  Bar
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Download,
  Filter,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Card, Button, cn } from '../components/ui';
import api from '../services/api';

const Analytics = () => {
  const [trendData, setTrendData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const response = await api.get('/analytics/trends');
        setTrendData(response.data);
      } catch (error) {
        console.error("Failed to fetch trends:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrends();
  }, []);

  if (loading) {
    return <div className="h-full flex items-center justify-center">Analyzing data...</div>;
  }
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 pb-20"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financial Analytics</h1>
          <p className="text-on-surface-variant mt-1 text-sm">Deep dive into your spending habits and income trends.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="secondary">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Last 6 Months</span>
          </Button>
          <Button variant="secondary">
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main Trend Chart */}
      <Card className="p-8">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-2xl bg-primary/10 text-primary">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Cash Flow Trend</h3>
              <p className="text-xs text-on-surface-variant">Monthly comparison of total income vs expenses</p>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-xs font-bold">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-on-surface-variant">Income</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-error" />
              <span className="text-on-surface-variant">Expenses</span>
            </div>
          </div>
        </div>
        
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Category Trends Placeholder */}
        <Card className="flex flex-col items-center justify-center text-center p-12">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
            <PieChart className="w-8 h-8 text-on-surface-variant" />
          </div>
          <h3 className="font-bold text-lg">Category Analytics</h3>
          <p className="text-on-surface-variant text-sm mt-2">
            Add more transactions to see a breakdown of your spending by category.
          </p>
        </Card>

        {/* Savings Growth */}
        <Card className="flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-lg">Savings Growth</h3>
            <div className="flex items-center space-x-1 text-success text-xs font-bold">
              <ArrowUpRight className="w-4 h-4" />
              <span>+24% YoY</span>
            </div>
          </div>
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                <XAxis 
                  dataKey="name" 
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
                  radius={[10, 10, 0, 0]} 
                  barSize={20}
                  opacity={0.8}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 p-6 bg-white/5 rounded-2xl border border-white/5">
            <p className="text-xs text-on-surface-variant leading-relaxed font-medium text-center italic">
              "Your savings rate is in the top 10% of users in your income bracket. Keep up the disciplined spending!"
            </p>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export default Analytics;
