
import React from 'react';
import { ArrowDown, ArrowUp, MoreHorizontal, TrendingDown, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import LineChart from '../charts/LineChart';

interface StockCardProps {
  stock: {
    symbol: string;
    name: string;
    price: number;
    change: number;
    isUp: boolean;
    chartData: { time: string; value: number }[];
  };
  className?: string;
}

const StockCard: React.FC<StockCardProps> = ({ stock, className }) => {
  return (
    <div className={cn("stock-card animate-fade-in", className)}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <div className={cn(
              "h-8 w-8 rounded-full flex items-center justify-center text-primary-foreground",
              stock.isUp ? "bg-success" : "bg-danger"
            )}>
              {stock.isUp ? 
                <TrendingUp className="h-4 w-4" /> : 
                <TrendingDown className="h-4 w-4" />
              }
            </div>
            <div>
              <p className="font-medium">{stock.symbol}</p>
              <p className="text-xs text-muted-foreground">{stock.name}</p>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="mb-3 flex items-baseline justify-between">
        <p className="text-2xl font-medium">₹{stock.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
        <div className={cn(
          "flex items-center",
          stock.isUp ? "text-success" : "text-danger"
        )}>
          {stock.isUp ? 
            <ArrowUp className="h-4 w-4 mr-1" /> : 
            <ArrowDown className="h-4 w-4 mr-1" />
          }
          {Math.abs(stock.change).toFixed(2)}%
        </div>
      </div>
      
      <div className="h-20">
        <LineChart 
          data={stock.chartData}
          xKey="time"
          yKey="value"
          color={stock.isUp ? "#10B981" : "#F43F5E"}
          fillColor={stock.isUp ? "#10B981" : "#F43F5E"}
          height={80}
        />
      </div>
    </div>
  );
};

export default StockCard;
