
import React from 'react';
import { ArrowDown, ArrowUp, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { cn } from '@/lib/utils';

// Mock data for the chart
const data = [
  { time: '9:15', value: 22631 },
  { time: '10:00', value: 22670 },
  { time: '11:00', value: 22645 },
  { time: '12:00', value: 22690 },
  { time: '13:00', value: 22710 },
  { time: '14:00', value: 22705 },
  { time: '15:00', value: 22740 },
  { time: '15:30', value: 22720 },
];

// Mock market data
const marketData = [
  { name: 'NIFTY 50', value: 22720, change: +0.39, isUp: true },
  { name: 'SENSEX', value: 74762, change: +0.42, isUp: true },
  { name: 'NIFTY BANK', value: 48214, change: -0.18, isUp: false },
  { name: 'NIFTY IT', value: 38520, change: +1.27, isUp: true },
];

const MarketOverview: React.FC = () => {
  return (
    <div className="dashboard-card h-full">
      <div className="dashboard-card-header">
        <h2 className="text-lg font-medium">Market Overview</h2>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="dashboard-card-content space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {marketData.map((item) => (
            <div key={item.name} className="glass-card p-3 rounded-lg animate-fade-in">
              <p className="text-sm text-muted-foreground">{item.name}</p>
              <div className="flex items-baseline justify-between mt-1">
                <p className="text-lg font-medium">{item.value.toLocaleString()}</p>
                <div className={cn(
                  "flex items-center text-sm",
                  item.isUp ? "text-success" : "text-danger"
                )}>
                  {item.isUp ? 
                    <ArrowUp className="h-3 w-3 mr-1" /> : 
                    <ArrowDown className="h-3 w-3 mr-1" />
                  }
                  {Math.abs(item.change).toFixed(2)}%
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="h-64 mt-4 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="time" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#888' }}
                dy={10}
              />
              <YAxis 
                domain={['dataMin - 100', 'dataMax + 100']}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#888' }}
                width={60}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                }}
                labelStyle={{ fontWeight: 600, marginBottom: '4px' }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#0EA5E9" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorValue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="ticker-wrap mt-4 border border-border/50 rounded-lg bg-muted/30 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="ticker-move">
            {Array(2).fill(marketData).flat().map((item, index) => (
              <div key={index} className="ticker-item">
                <span className="font-medium">{item.name}</span>
                <span className={cn(
                  "ml-2",
                  item.isUp ? "text-success" : "text-danger"
                )}>
                  {item.value.toLocaleString()} 
                  {item.isUp ? 
                    <ArrowUp className="h-3 w-3 inline ml-1" /> : 
                    <ArrowDown className="h-3 w-3 inline ml-1" />
                  }
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketOverview;
