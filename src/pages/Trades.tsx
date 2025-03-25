
import React, { useState } from 'react';
import { ChevronDown, Filter, PlusCircle, RefreshCw, Search } from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import LineChart from '@/components/charts/LineChart';
import { useIsMobile } from '@/hooks/use-mobile';

// Mock data
const tradeHistory = [
  { 
    id: 1, 
    symbol: 'RELIANCE', 
    type: 'Buy', 
    quantity: 10, 
    entryPrice: 2880.50, 
    exitPrice: 2905.75, 
    pnl: +252.50, 
    pnlPercent: +0.88, 
    isProfit: true,
    status: 'Closed',
    entryDate: new Date('2023-08-10T10:30:00'),
    exitDate: new Date('2023-08-11T14:45:00'),
    notes: 'Breakout trade on positive news'
  },
  { 
    id: 2, 
    symbol: 'INFY', 
    type: 'Buy', 
    quantity: 15, 
    entryPrice: 1550.25, 
    exitPrice: 1580.25, 
    pnl: +450.00, 
    pnlPercent: +1.94, 
    isProfit: true,
    status: 'Closed',
    entryDate: new Date('2023-08-09T14:15:00'),
    exitDate: new Date('2023-08-10T11:30:00'),
    notes: 'Earnings play'
  },
  { 
    id: 3, 
    symbol: 'HDFC', 
    type: 'Sell', 
    quantity: 8, 
    entryPrice: 1520.80, 
    exitPrice: 1495.60, 
    pnl: +201.60, 
    pnlPercent: +1.65, 
    isProfit: true,
    status: 'Closed',
    entryDate: new Date('2023-08-08T11:45:00'),
    exitDate: new Date('2023-08-09T15:20:00'),
    notes: 'Technical breakdown, quick scalp'
  },
  { 
    id: 4, 
    symbol: 'TCS', 
    type: 'Buy', 
    quantity: 5, 
    entryPrice: 3720.50, 
    exitPrice: null, 
    pnl: +175.00, 
    pnlPercent: +0.94, 
    isProfit: true,
    status: 'Open',
    entryDate: new Date('2023-08-11T09:30:00'),
    exitDate: null,
    notes: 'Long-term position on IT sector growth'
  },
];

// Performance chart data
const performanceData = [
  { date: '2023-07-01', value: 100000 },
  { date: '2023-07-08', value: 102500 },
  { date: '2023-07-15', value: 101800 },
  { date: '2023-07-22', value: 104300 },
  { date: '2023-07-29', value: 106700 },
  { date: '2023-08-05', value: 105900 },
  { date: '2023-08-12', value: 109200 },
];

const Trades = () => {
  const [activeTab, setActiveTab] = useState('history');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const formatDate = (date: Date | null) => {
    if (!date) return 'N/A';
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      {isMobile && sidebarOpen && (
        <Sidebar isMobile onClose={() => setSidebarOpen(false)} />
      )}
      
      <div className="flex-1 pt-16">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="p-4 md:p-6 max-w-screen-2xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Trades</h1>
              <p className="text-muted-foreground">
                Manage your trades and view performance
              </p>
            </div>
            
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                New Trade
              </Button>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="history">Trade History</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="journal">Journal</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-2">
                <div className="relative w-64 hidden md:block">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search trades..." 
                    className="pl-8 bg-muted/50 border-none h-9"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <TabsContent value="history" className="animate-fade-in">
              <div className="dashboard-card">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="text-left p-4 font-medium text-muted-foreground">Symbol</th>
                        <th className="text-left p-4 font-medium text-muted-foreground">Type</th>
                        <th className="text-right p-4 font-medium text-muted-foreground">Quantity</th>
                        <th className="text-right p-4 font-medium text-muted-foreground">Entry Price</th>
                        <th className="text-right p-4 font-medium text-muted-foreground">Exit Price</th>
                        <th className="text-right p-4 font-medium text-muted-foreground">P&L</th>
                        <th className="text-center p-4 font-medium text-muted-foreground">Status</th>
                        <th className="text-left p-4 font-medium text-muted-foreground">Entry Date</th>
                        <th className="text-left p-4 font-medium text-muted-foreground">Exit Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tradeHistory.map((trade, index) => (
                        <tr 
                          key={trade.id} 
                          className="border-b border-border/20 hover:bg-muted/30 transition-colors animate-fade-in"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <td className="p-4 font-medium">{trade.symbol}</td>
                          <td className={cn(
                            "p-4",
                            trade.type === 'Buy' ? "text-success" : "text-danger"
                          )}>
                            {trade.type}
                          </td>
                          <td className="p-4 text-right">{trade.quantity}</td>
                          <td className="p-4 text-right">₹{trade.entryPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                          <td className="p-4 text-right">
                            {trade.exitPrice 
                              ? `₹${trade.exitPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
                              : 'N/A'
                            }
                          </td>
                          <td className={cn(
                            "p-4 text-right font-medium",
                            trade.isProfit ? "text-success" : "text-danger"
                          )}>
                            <div className="flex items-center justify-end">
                              {trade.isProfit ? 
                                <ArrowUp className="h-3 w-3 mr-1" /> : 
                                <ArrowDown className="h-3 w-3 mr-1" />
                              }
                              ₹{Math.abs(trade.pnl).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                              <span className="ml-1 text-xs">
                                ({trade.isProfit ? '+' : '-'}{Math.abs(trade.pnlPercent).toFixed(2)}%)
                              </span>
                            </div>
                          </td>
                          <td className="p-4 text-center">
                            <span className={cn(
                              "px-2 py-1 rounded-full text-xs font-medium",
                              trade.status === 'Open' 
                                ? "bg-primary/10 text-primary" 
                                : "bg-success/10 text-success"
                            )}>
                              {trade.status}
                            </span>
                          </td>
                          <td className="p-4 text-sm text-muted-foreground">{formatDate(trade.entryDate)}</td>
                          <td className="p-4 text-sm text-muted-foreground">{formatDate(trade.exitDate)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="performance" className="animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 dashboard-card">
                  <div className="dashboard-card-header">
                    <h2 className="text-lg font-medium">Portfolio Performance</h2>
                  </div>
                  <div className="dashboard-card-content">
                    <div className="h-[400px]">
                      <LineChart 
                        data={performanceData}
                        xKey="date"
                        yKey="value"
                        color="#0EA5E9"
                        showGrid
                        tooltipFormatter={(value) => `₹${value.toLocaleString()}`}
                        labelFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="dashboard-card">
                  <div className="dashboard-card-header">
                    <h2 className="text-lg font-medium">Statistics</h2>
                  </div>
                  <div className="dashboard-card-content">
                    <div className="space-y-4">
                      <div className="glass-card p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground">Total P&L</p>
                        <p className="text-2xl font-medium text-success">+₹9,200</p>
                        <p className="text-sm text-success">+9.2%</p>
                      </div>
                      
                      <div className="glass-card p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground">Win Rate</p>
                        <p className="text-2xl font-medium">75%</p>
                        <p className="text-sm text-muted-foreground">15 out of 20 trades</p>
                      </div>
                      
                      <div className="glass-card p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground">Average Trade</p>
                        <p className="text-2xl font-medium">₹460</p>
                        <p className="text-sm text-muted-foreground">Avg holding: 1.3 days</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="journal" className="animate-fade-in">
              <div className="dashboard-card">
                <div className="dashboard-card-header">
                  <h2 className="text-lg font-medium">Trade Journal</h2>
                </div>
                <div className="dashboard-card-content">
                  <p className="text-muted-foreground">Your trade journal entries will appear here.</p>
                  <Button className="mt-4">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    New Journal Entry
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Trades;
