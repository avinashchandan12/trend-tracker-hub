
import React from 'react';
import { ArrowDown, ArrowUp, MoreHorizontal, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Mock watchlist data
const watchlistData = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2905.75, change: +1.34, isUp: true },
  { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3755.50, change: +2.21, isUp: true },
  { symbol: 'HDFC', name: 'HDFC Bank', price: 1495.60, change: -0.75, isUp: false },
  { symbol: 'INFY', name: 'Infosys', price: 1580.25, change: +1.92, isUp: true },
  { symbol: 'ICICI', name: 'ICICI Bank', price: 1020.40, change: -0.33, isUp: false },
  { symbol: 'WIPRO', name: 'Wipro Ltd', price: 450.75, change: +0.82, isUp: true },
];

interface StockRowProps {
  stock: {
    symbol: string;
    name: string;
    price: number;
    change: number;
    isUp: boolean;
  };
  index: number;
}

const StockRow: React.FC<StockRowProps> = ({ stock, index }) => {
  return (
    <div 
      className="flex items-center justify-between p-3 border-b border-border/20 last:border-0 hover:bg-muted/30 transition-colors group animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div>
        <div className="flex items-center gap-2">
          <div className={cn(
            "h-8 w-8 rounded-full flex items-center justify-center text-primary-foreground",
            stock.isUp ? "bg-success" : "bg-danger"
          )}>
            {stock.symbol.substring(0, 1)}
          </div>
          <div>
            <p className="font-medium">{stock.symbol}</p>
            <p className="text-xs text-muted-foreground">{stock.name}</p>
          </div>
        </div>
      </div>
      <div className="text-right">
        <p className="font-medium">₹{stock.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
        <p className={cn(
          "text-sm flex items-center justify-end",
          stock.isUp ? "text-success" : "text-danger"
        )}>
          {stock.isUp ? 
            <ArrowUp className="h-3 w-3 mr-1" /> : 
            <ArrowDown className="h-3 w-3 mr-1" />
          }
          {Math.abs(stock.change).toFixed(2)}%
        </p>
      </div>
    </div>
  );
};

const StockWatchlist: React.FC = () => {
  return (
    <div className="dashboard-card h-full flex flex-col">
      <div className="dashboard-card-header">
        <h2 className="text-lg font-medium">Watchlist</h2>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Plus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {watchlistData.map((stock, index) => (
          <StockRow key={stock.symbol} stock={stock} index={index} />
        ))}
      </div>
    </div>
  );
};

export default StockWatchlist;
