import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { ArrowUpRight, TrendingUp, AlertTriangle, Sparkles, Loader2, Package } from 'lucide-react';
import { generateExecutiveBrief } from '../services/geminiService';
import { SalesMetric, InventoryItem } from '../types';

// Mock Data
const data: SalesMetric[] = [
  { date: 'Mon', revenue: 4000, unitsSold: 24, category: 'Apparel' },
  { date: 'Tue', revenue: 3000, unitsSold: 18, category: 'Apparel' },
  { date: 'Wed', revenue: 2000, unitsSold: 12, category: 'Apparel' },
  { date: 'Thu', revenue: 2780, unitsSold: 20, category: 'Footwear' },
  { date: 'Fri', revenue: 1890, unitsSold: 15, category: 'Footwear' },
  { date: 'Sat', revenue: 6390, unitsSold: 45, category: 'Accessories' },
  { date: 'Sun', revenue: 5490, unitsSold: 38, category: 'Apparel' },
];

const lowStockItems: InventoryItem[] = [
    { id: '1', sku: 'LX-RN-001', styleName: 'Velocity Runner', category: 'Footwear', size: '10', color: 'Neon', stockLevel: 2, reorderPoint: 5, cost: 45, price: 120, status: 'Low Stock' },
    { id: '2', sku: 'LX-LG-004', styleName: 'Core Leggings', category: 'Apparel', size: 'M', color: 'Black', stockLevel: 0, reorderPoint: 10, cost: 20, price: 85, status: 'Out of Stock' },
];

export const Dashboard: React.FC = () => {
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiInsight, setAiInsight] = useState<{ summary: string; recommendation: string } | null>(null);

  const handleGenerateReport = async () => {
    setLoadingAI(true);
    const result = await generateExecutiveBrief(data, lowStockItems);
    setAiInsight(result);
    setLoadingAI(false);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Executive Dashboard</h1>
            <p className="text-neutral-500 mt-1">Real-time retail performance at the edge.</p>
        </div>
        <div className="flex space-x-3">
             <button 
                onClick={handleGenerateReport}
                className="flex items-center space-x-2 bg-gradient-to-r from-luxe-accent to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white px-5 py-2.5 rounded-lg shadow-lg shadow-blue-900/20 transition-all font-medium border border-blue-400/20"
                disabled={loadingAI}
             >
                {loadingAI ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                <span>{loadingAI ? 'Analyzing...' : 'AI Forecast'}</span>
            </button>
        </div>
      </div>

      {/* AI Insight Section */}
      {aiInsight && (
        <div className="bg-luxe-800/40 border border-luxe-700 rounded-xl p-6 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-luxe-accent"></div>
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                <Sparkles className="w-4 h-4 text-luxe-accent mr-2" />
                Gemini Intelligence Report
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <span className="text-xs uppercase tracking-wider text-neutral-500 font-semibold">Executive Summary</span>
                    <p className="text-neutral-200 mt-1 leading-relaxed">{aiInsight.summary}</p>
                </div>
                <div>
                    <span className="text-xs uppercase tracking-wider text-neutral-500 font-semibold">Strategic Recommendation</span>
                    <p className="text-luxe-accent mt-1 leading-relaxed font-medium">{aiInsight.recommendation}</p>
                </div>
            </div>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-luxe-800 border border-luxe-700 rounded-xl p-6 shadow-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-neutral-400 text-sm font-medium">Total Revenue (WTD)</p>
              <h3 className="text-3xl font-bold text-white mt-2">$25,550</h3>
            </div>
            <div className="bg-green-500/10 p-2 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-500 flex items-center font-medium">
              <ArrowUpRight className="w-3 h-3 mr-1" /> 12.5%
            </span>
            <span className="text-neutral-500 ml-2">vs last week</span>
          </div>
        </div>

        <div className="bg-luxe-800 border border-luxe-700 rounded-xl p-6 shadow-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-neutral-400 text-sm font-medium">Inventory Turnover</p>
              <h3 className="text-3xl font-bold text-white mt-2">4.2x</h3>
            </div>
            <div className="bg-luxe-accent/10 p-2 rounded-lg">
              <Package className="w-5 h-5 text-luxe-accent" />
            </div>
          </div>
           <div className="mt-4 flex items-center text-sm">
            <span className="text-neutral-400">Optimal range: 4.0x - 6.0x</span>
          </div>
        </div>

        <div className="bg-luxe-800 border border-luxe-700 rounded-xl p-6 shadow-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-neutral-400 text-sm font-medium">Stock Alerts</p>
              <h3 className="text-3xl font-bold text-white mt-2">2 Items</h3>
            </div>
            <div className="bg-orange-500/10 p-2 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
            </div>
          </div>
           <div className="mt-4 flex items-center text-sm">
            <span className="text-orange-500 font-medium cursor-pointer hover:underline">View details</span>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-luxe-800 border border-luxe-700 rounded-xl p-6 shadow-xl min-h-[400px]">
          <h3 className="text-lg font-semibold text-white mb-6">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis dataKey="date" stroke="#666" tick={{fill: '#888'}} axisLine={false} tickLine={false} />
              <YAxis stroke="#666" tick={{fill: '#888'}} axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#171717', borderColor: '#333', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-luxe-800 border border-luxe-700 rounded-xl p-6 shadow-xl min-h-[400px]">
          <h3 className="text-lg font-semibold text-white mb-6">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[
                { name: 'Apparel', value: 45000 },
                { name: 'Footwear', value: 32000 },
                { name: 'Access.', value: 12000 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis dataKey="name" stroke="#666" tick={{fill: '#888'}} axisLine={false} tickLine={false} />
              <YAxis stroke="#666" tick={{fill: '#888'}} axisLine={false} tickLine={false} tickFormatter={(value) => `${value / 1000}k`} />
              <Tooltip 
                 cursor={{fill: '#262626'}}
                 contentStyle={{ backgroundColor: '#171717', borderColor: '#333', color: '#fff' }}
              />
              <Bar dataKey="value" fill="#ffffff" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};