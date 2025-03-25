
import React from 'react';
import { ArrowDown, ArrowUp, MoreHorizontal, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Mock trade data
const tradeData = [
  { 
    id: 1, 
    symbol: 'RELIANCE', 
    type: 'Buy', 
    quantity: 10, 
    entryPrice: 2880.50, 
    currentPrice: 2905.75, 
    pnl: +252.50, 
    pnlPercent: +0.88, 
    isProfit: true,
    timestamp: new Date('2023-08-10T10:30:00')
  },
  { 
    id: 2, 
    symbol: 'INFY', 
    type: 'Buy', 
    quantity: 15, 
    entryPrice: 1550.25, 
    currentPrice: 1580.25, 
    pnl: +450.00, 
    pnlPercent: +1.94, 
    isProfit: true,
    timestamp: new Date('2023-08-09T14:15:00')
  },
  { 
    id: 3, 
    symbol: 'HDFC', 
    type: 'Sell', 
    quantity: 8, 
    entryPrice: 1520.80, 
    currentPrice: 1495.60, 
    pnl: +201.60, 
    pnlPercent: +1.65, 
    isProfit: true,
    timestamp: new Date('2023-08-08T11:45:00')
  },
];

interface TradeRowProps {
  trade: {
    id: number;
    symbol: string;
    type: string;
    quantity: number;
    entryPrice: number;
    currentPrice: number;
    pnl: number;
    pnlPercent: number;
    isProfit: boolean;
    timestamp: Date;
  };
  index: number;
}

const TradeRow: React.FC<TradeRowProps> = ({ trade, index }) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div 
      className="flex items-center p-3 border-b border-border/20 last:border-0 hover:bg-muted/30 transition-colors animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <div className={cn(
            "h-8 w-8 rounded-full flex items-center justify-center text-primary-foreground",
            trade.type === 'Buy' ? "bg-success" : "bg-danger"
          )}>
            {trade.symbol.substring(0, 1)}
          </div>
          <div>
            <p className="font-medium">{trade.symbol}</p>
            <p className="text-xs text-muted-foreground">
              {trade.type} • {trade.quantity} shares
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 text-center">
        <p className="font-medium">₹{trade.entryPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
        <p className="text-xs text-muted-foreground">{formatDate(trade.timestamp)}</p>
      </div>
      
      <div className="flex-1 text-right">
        <p className={cn(
          "font-medium flex items-center justify-end",
          trade.isProfit ? "text-success" : "text-danger"
        )}>
          {trade.isProfit ? 
            <ArrowUp className="h-3 w-3 mr-1" /> : 
            <ArrowDown className="h-3 w-3 mr-1" />
          }
          ₹{Math.abs(trade.pnl).toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </p>
        <p className={cn(
          "text-xs",
          trade.isProfit ? "text-success" : "text-danger"
        )}>
          {trade.isProfit ? '+' : '-'}{Math.abs(trade.pnlPercent).toFixed(2)}%
        </p>
      </div>
    </div>
  );
};

const TradeTracker: React.FC = () => {
  // Calculate total P&L
  const totalPnl = tradeData.reduce((acc, trade) => acc + trade.pnl, 0);
  const isProfit = totalPnl >= 0;
  
  return (
    <div className="dashboard-card h-full flex flex-col">
      <div className="dashboard-card-header">
        <h2 className="text-lg font-medium">Recent Trades</h2>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <PlusCircle className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="p-4 bg-muted/30 border-b border-border/50">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Today's P&L</p>
          <div className={cn(
            "flex items-center",
            isProfit ? "text-success" : "text-danger"
          )}>
            {isProfit ? 
              <ArrowUp className="h-4 w-4 mr-1" /> : 
              <ArrowDown className="h-4 w-4 mr-1" />
            }
            <span className="font-medium">
              ₹{Math.abs(totalPnl).toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {tradeData.map((trade, index) => (
          <TradeRow key={trade.id} trade={trade} index={index} />
        ))}
      </div>
      
      <div className="p-4 border-t border-border/50">
        <Button className="w-full" variant="outline">
          <PlusCircle className="h-4 w-4 mr-2" />
          Place New Trade
        </Button>
      </div>
    </div>
  );
};

export default TradeTracker;
