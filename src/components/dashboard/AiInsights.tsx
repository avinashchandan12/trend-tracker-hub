
import React from 'react';
import { Info, Lightbulb, MoreHorizontal, TrendingDown, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Mock AI insights data
const insightsData = [
  {
    type: 'pattern',
    title: 'Bullish Pattern Detected',
    symbol: 'RELIANCE',
    description: 'Cup and handle pattern forming on the daily chart. Potential upside breakout.',
    confidence: 86,
    timeframe: '1D',
    trend: 'up'
  },
  {
    type: 'volume',
    title: 'Unusual Volume',
    symbol: 'TCS',
    description: 'Volume spike of 2.3x average. Consider watching for price movement confirmation.',
    confidence: 78,
    timeframe: '4H',
    trend: 'up'
  },
  {
    type: 'momentum',
    title: 'Overbought Conditions',
    symbol: 'HDFC',
    description: 'RSI above 70 for 3 consecutive days. Potential short-term reversal.',
    confidence: 72,
    timeframe: '1D',
    trend: 'down'
  },
];

interface InsightCardProps {
  insight: {
    type: string;
    title: string;
    symbol: string;
    description: string;
    confidence: number;
    timeframe: string;
    trend: string;
  };
  index: number;
}

const InsightCard: React.FC<InsightCardProps> = ({ insight, index }) => {
  return (
    <div 
      className="glass-card p-4 rounded-lg relative overflow-hidden animate-fade-in hover-scale"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="absolute top-0 right-0 h-1 w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <div className={cn(
            "h-8 w-8 rounded-full flex items-center justify-center text-primary-foreground",
            insight.trend === 'up' ? "bg-success" : "bg-danger"
          )}>
            {insight.trend === 'up' ? 
              <TrendingUp className="h-4 w-4" /> : 
              <TrendingDown className="h-4 w-4" />
            }
          </div>
          <div>
            <p className="font-medium text-sm text-muted-foreground">{insight.symbol} • {insight.timeframe}</p>
            <p className="font-medium">{insight.title}</p>
          </div>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Info className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>AI Confidence: {insight.confidence}%</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <p className="text-sm text-muted-foreground">{insight.description}</p>
      
      <div className="w-full bg-muted h-1 rounded-full mt-3 overflow-hidden">
        <div 
          className={cn(
            "h-full rounded-full",
            insight.confidence > 80 ? "bg-success" : 
            insight.confidence > 60 ? "bg-warning" : "bg-danger"
          )}
          style={{ width: `${insight.confidence}%` }}
        />
      </div>
      <p className="text-xs text-right mt-1 text-muted-foreground">Confidence: {insight.confidence}%</p>
    </div>
  );
};

const AiInsights: React.FC = () => {
  return (
    <div className="dashboard-card h-full">
      <div className="dashboard-card-header">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-medium">AI Insights</h2>
        </div>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="dashboard-card-content space-y-4">
        {insightsData.map((insight, index) => (
          <InsightCard key={index} insight={insight} index={index} />
        ))}
      </div>
    </div>
  );
};

export default AiInsights;
