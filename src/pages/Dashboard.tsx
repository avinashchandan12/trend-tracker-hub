
import React, { useState } from 'react';
import { ChevronDown, RefreshCw } from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import MarketOverview from '@/components/dashboard/MarketOverview';
import StockWatchlist from '@/components/dashboard/StockWatchlist';
import AiInsights from '@/components/dashboard/AiInsights';
import TradeTracker from '@/components/dashboard/TradeTracker';
import { Button } from '@/components/ui/button';
import CustomSelect from '@/components/ui/CustomSelect';
import { useIsMobile } from '@/hooks/use-mobile';

const refreshOptions = [
  { value: '30', label: 'Refresh: 30s' },
  { value: '60', label: 'Refresh: 1m' },
  { value: '300', label: 'Refresh: 5m' },
  { value: '0', label: 'Manual Refresh' },
];

const Dashboard = () => {
  const [refreshInterval, setRefreshInterval] = useState('60');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const handleRefreshChange = (value: string) => {
    setRefreshInterval(value);
    // Here you would implement the actual refresh logic
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
              <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">
                Overview of your trading activity and market insights
              </p>
            </div>
            
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <CustomSelect
                options={refreshOptions}
                value={refreshInterval}
                onChange={handleRefreshChange}
                className="w-40"
              />
              <Button variant="ghost" size="icon">
                <RefreshCw className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <MarketOverview />
            </div>
            <div>
              <StockWatchlist />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <AiInsights />
            <TradeTracker />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
