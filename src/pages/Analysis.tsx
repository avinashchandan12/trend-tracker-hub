
import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Filter, TrendingDown, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import LineChart from '@/components/charts/LineChart';

// Sample stocks data for daily, weekly, monthly and yearly performances
const stocksData = [
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries',
    dailyChange: 1.24,
    weeklyChange: 3.78,
    monthlyChange: -2.45,
    yearlyChange: 15.67,
    price: 2905.75,
    chartData: Array(20).fill(0).map((_, i) => ({ 
      time: i.toString(), 
      value: 2700 + Math.random() * 400 
    }))
  },
  {
    symbol: 'TCS',
    name: 'Tata Consultancy Services',
    dailyChange: -0.89,
    weeklyChange: 2.12,
    monthlyChange: 5.67,
    yearlyChange: 8.32,
    price: 3755.50,
    chartData: Array(20).fill(0).map((_, i) => ({ 
      time: i.toString(), 
      value: 3500 + Math.random() * 400 
    }))
  },
  {
    symbol: 'HDFC',
    name: 'HDFC Bank',
    dailyChange: 0.56,
    weeklyChange: -3.24,
    monthlyChange: -7.12,
    yearlyChange: -2.45,
    price: 1495.60,
    chartData: Array(20).fill(0).map((_, i) => ({ 
      time: i.toString(), 
      value: 1400 + Math.random() * 200 
    }))
  },
  {
    symbol: 'INFY',
    name: 'Infosys',
    dailyChange: 2.34,
    weeklyChange: 6.78,
    monthlyChange: 11.23,
    yearlyChange: 18.90,
    price: 1580.25,
    chartData: Array(20).fill(0).map((_, i) => ({ 
      time: i.toString(), 
      value: 1400 + Math.random() * 300 
    }))
  },
  {
    symbol: 'ICICI',
    name: 'ICICI Bank',
    dailyChange: -1.45,
    weeklyChange: -5.23,
    monthlyChange: -8.90,
    yearlyChange: -4.32,
    price: 1020.40,
    chartData: Array(20).fill(0).map((_, i) => ({ 
      time: i.toString(), 
      value: 950 + Math.random() * 150 
    }))
  },
  {
    symbol: 'WIPRO',
    name: 'Wipro Ltd',
    dailyChange: 3.21,
    weeklyChange: 8.45,
    monthlyChange: 13.67,
    yearlyChange: 22.34,
    price: 450.75,
    chartData: Array(20).fill(0).map((_, i) => ({ 
      time: i.toString(), 
      value: 400 + Math.random() * 100 
    }))
  },
  {
    symbol: 'ITC',
    name: 'ITC Limited',
    dailyChange: -0.32,
    weeklyChange: -7.89,
    monthlyChange: -12.34,
    yearlyChange: -6.78,
    price: 380.25,
    chartData: Array(20).fill(0).map((_, i) => ({ 
      time: i.toString(), 
      value: 340 + Math.random() * 80 
    }))
  },
  {
    symbol: 'SBIN',
    name: 'State Bank of India',
    dailyChange: 1.87,
    weeklyChange: 4.56,
    monthlyChange: 9.87,
    yearlyChange: 16.54,
    price: 620.30,
    chartData: Array(20).fill(0).map((_, i) => ({ 
      time: i.toString(), 
      value: 550 + Math.random() * 120 
    }))
  },
  {
    symbol: 'LT',
    name: 'Larsen & Toubro',
    dailyChange: -2.34,
    weeklyChange: -8.76,
    monthlyChange: -14.32,
    yearlyChange: -9.87,
    price: 2340.60,
    chartData: Array(20).fill(0).map((_, i) => ({ 
      time: i.toString(), 
      value: 2200 + Math.random() * 300 
    }))
  },
  {
    symbol: 'MARUTI',
    name: 'Maruti Suzuki',
    dailyChange: 4.32,
    weeklyChange: 9.87,
    monthlyChange: 16.54,
    yearlyChange: 28.76,
    price: 10450.75,
    chartData: Array(20).fill(0).map((_, i) => ({ 
      time: i.toString(), 
      value: 9800 + Math.random() * 1000 
    }))
  }
];

const indexData = [
  {
    symbol: 'NIFTY50',
    name: 'Nifty 50',
    dailyChange: 0.78,
    weeklyChange: 2.34,
    monthlyChange: 5.67,
    yearlyChange: 12.45,
    price: 22720,
    chartData: Array(20).fill(0).map((_, i) => ({ 
      time: i.toString(), 
      value: 22000 + Math.random() * 1000 
    }))
  },
  {
    symbol: 'SENSEX',
    name: 'Sensex',
    dailyChange: 0.65,
    weeklyChange: 2.12,
    monthlyChange: 5.32,
    yearlyChange: 11.78,
    price: 74762,
    chartData: Array(20).fill(0).map((_, i) => ({ 
      time: i.toString(), 
      value: 73000 + Math.random() * 3000 
    }))
  },
  {
    symbol: 'NIFTYBANK',
    name: 'Nifty Bank',
    dailyChange: -0.23,
    weeklyChange: -1.45,
    monthlyChange: -3.67,
    yearlyChange: 8.90,
    price: 48214,
    chartData: Array(20).fill(0).map((_, i) => ({ 
      time: i.toString(), 
      value: 47000 + Math.random() * 2000 
    }))
  },
  {
    symbol: 'NIFTYIT',
    name: 'Nifty IT',
    dailyChange: 1.45,
    weeklyChange: 4.56,
    monthlyChange: 9.87,
    yearlyChange: 15.67,
    price: 38520,
    chartData: Array(20).fill(0).map((_, i) => ({ 
      time: i.toString(), 
      value: 37000 + Math.random() * 2000 
    }))
  }
];

type TimeFrame = 'daily' | 'weekly' | 'monthly' | 'yearly';

const Analysis: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('daily');
  const [filter, setFilter] = useState<'all' | 'gainers' | 'losers'>('all');
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const getTimeFrameData = (item: any) => {
    switch(timeFrame) {
      case 'daily':
        return item.dailyChange;
      case 'weekly':
        return item.weeklyChange;
      case 'monthly':
        return item.monthlyChange;
      case 'yearly':
        return item.yearlyChange;
      default:
        return item.dailyChange;
    }
  };

  const filteredStocksData = stocksData.filter(stock => {
    const change = getTimeFrameData(stock);
    if (filter === 'gainers') return change > 0;
    if (filter === 'losers') return change < 0;
    return true;
  });

  const filteredIndexData = indexData.filter(index => {
    const change = getTimeFrameData(index);
    if (filter === 'gainers') return change > 0;
    if (filter === 'losers') return change < 0;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      {sidebarOpen && (
        <Sidebar isMobile={true} onClose={toggleSidebar} />
      )}
      
      <div className="lg:ml-64 pt-16">
        <Header onMenuClick={toggleSidebar} />
        
        <main className="p-4 max-w-screen-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Market Analysis</h1>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <Tabs defaultValue={timeFrame} onValueChange={(v) => setTimeFrame(v as TimeFrame)} className="w-full">
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="daily">Daily</TabsTrigger>
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  <TabsTrigger value="yearly">Yearly</TabsTrigger>
                </TabsList>
                
                <div className="flex gap-2">
                  <Button 
                    variant={filter === 'all' ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setFilter('all')}
                  >
                    All
                  </Button>
                  <Button 
                    variant={filter === 'gainers' ? "default" : "outline"} 
                    size="sm"
                    className="text-success"
                    onClick={() => setFilter('gainers')}
                  >
                    <TrendingUp className="h-4 w-4 mr-1" /> Gainers
                  </Button>
                  <Button 
                    variant={filter === 'losers' ? "default" : "outline"} 
                    size="sm"
                    className="text-danger"
                    onClick={() => setFilter('losers')}
                  >
                    <TrendingDown className="h-4 w-4 mr-1" /> Losers
                  </Button>
                </div>
              </div>
              
              <TabsContent value="daily" className="space-y-6">
                <h2 className="text-xl font-semibold">Daily Market Movements</h2>
                <PerformanceTable data={filteredIndexData} timeFrame={timeFrame} type="index" />
                <PerformanceTable data={filteredStocksData} timeFrame={timeFrame} type="stock" />
              </TabsContent>
              
              <TabsContent value="weekly" className="space-y-6">
                <h2 className="text-xl font-semibold">Weekly Market Movements</h2>
                <PerformanceTable data={filteredIndexData} timeFrame={timeFrame} type="index" />
                <PerformanceTable data={filteredStocksData} timeFrame={timeFrame} type="stock" />
              </TabsContent>
              
              <TabsContent value="monthly" className="space-y-6">
                <h2 className="text-xl font-semibold">Monthly Market Movements</h2>
                <PerformanceTable data={filteredIndexData} timeFrame={timeFrame} type="index" />
                <PerformanceTable data={filteredStocksData} timeFrame={timeFrame} type="stock" />
              </TabsContent>
              
              <TabsContent value="yearly" className="space-y-6">
                <h2 className="text-xl font-semibold">Yearly Market Movements</h2>
                <PerformanceTable data={filteredIndexData} timeFrame={timeFrame} type="index" />
                <PerformanceTable data={filteredStocksData} timeFrame={timeFrame} type="stock" />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      
      <Sidebar />
    </div>
  );
};

interface PerformanceTableProps {
  data: any[];
  timeFrame: TimeFrame;
  type: 'stock' | 'index';
}

const PerformanceTable: React.FC<PerformanceTableProps> = ({ data, timeFrame, type }) => {
  const getPerformanceData = (item: any) => {
    switch(timeFrame) {
      case 'daily':
        return item.dailyChange;
      case 'weekly':
        return item.weeklyChange;
      case 'monthly':
        return item.monthlyChange;
      case 'yearly':
        return item.yearlyChange;
      default:
        return item.dailyChange;
    }
  };
  
  const getTimeFrameLabel = () => {
    switch(timeFrame) {
      case 'daily':
        return 'Daily';
      case 'weekly':
        return 'Weekly';
      case 'monthly':
        return 'Monthly';
      case 'yearly':
        return 'Yearly';
      default:
        return 'Daily';
    }
  };
  
  return (
    <div className="bg-white dark:bg-slate-950 rounded-lg shadow overflow-hidden">
      <h3 className="p-4 font-medium border-b">
        {type === 'index' ? 'Market Indices' : 'Stocks'} {getTimeFrameLabel()} Performance
      </h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Current Price</TableHead>
              <TableHead className="text-right">{getTimeFrameLabel()} Change</TableHead>
              <TableHead>Chart</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => {
              const change = getPerformanceData(item);
              const isPositive = change > 0;
              
              // Highlight significant movements
              const isSignificant = Math.abs(change) >= 5;
              
              return (
                <TableRow key={item.symbol} className={cn(
                  isSignificant && (isPositive ? "bg-green-50/30" : "bg-red-50/30")
                )}>
                  <TableCell className="font-medium">{item.symbol}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>₹{item.price.toLocaleString()}</TableCell>
                  <TableCell className={cn(
                    "text-right font-medium",
                    isPositive ? "text-success" : "text-danger"
                  )}>
                    {isPositive ? '+' : ''}{change.toFixed(2)}%
                  </TableCell>
                  <TableCell className="w-32">
                    <div className="h-16">
                      <LineChart 
                        data={item.chartData}
                        xKey="time"
                        yKey="value"
                        color={isPositive ? "#10B981" : "#F43F5E"}
                        fillColor={isPositive ? "#10B981" : "#F43F5E"}
                        height={60}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Analysis;
