
import React from 'react';
import { 
  Area, 
  AreaChart, 
  CartesianGrid, 
  Line, 
  LineChart as RechartsLineChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from 'recharts';
import { cn } from '@/lib/utils';

interface LineChartProps {
  data: any[];
  xKey: string;
  yKey: string;
  color?: string;
  fillColor?: string;
  fillOpacity?: number;
  className?: string;
  showGrid?: boolean;
  showFill?: boolean;
  height?: number;
  tooltipFormatter?: (value: any) => string;
  labelFormatter?: (value: any) => string;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  xKey,
  yKey,
  color = "#0EA5E9",
  fillColor,
  fillOpacity = 0.3,
  className,
  showGrid = false,
  showFill = true,
  height = 300,
  tooltipFormatter,
  labelFormatter,
}) => {
  
  const gradientId = `gradient-${yKey}`;
  
  const defaultTooltipFormatter = (value: any) => {
    if (typeof value === 'number') {
      return value.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }
    return value;
  };
  
  const formatFunc = tooltipFormatter || defaultTooltipFormatter;
  
  const renderTooltipContent = (props: any) => {
    const { payload, label } = props;
    if (!payload || payload.length === 0) return null;
    
    const displayLabel = labelFormatter ? labelFormatter(label) : label;
    
    return (
      <div className="bg-background/80 backdrop-blur-md border border-border/50 shadow-lg rounded-lg p-3">
        <p className="font-medium mb-1">{displayLabel}</p>
        {payload.map((entry: any, index: number) => (
          <div key={`tooltip-${index}`} className="flex items-center gap-2">
            <div 
              className="h-3 w-3 rounded-full" 
              style={{ backgroundColor: entry.color }} 
            />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-medium">{formatFunc(entry.value)}</span>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className={cn("w-full", className)}>
      {showFill ? (
        <ResponsiveContainer width="100%" height={height}>
          <AreaChart
            data={data}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            {showGrid && (
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false} 
                stroke="rgba(0,0,0,0.05)" 
              />
            )}
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={fillColor || color} stopOpacity={fillOpacity} />
                <stop offset="95%" stopColor={fillColor || color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey={xKey} 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#888' }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#888' }}
              width={40}
            />
            <Tooltip content={renderTooltipContent} />
            <Area 
              type="monotone" 
              dataKey={yKey} 
              stroke={color} 
              strokeWidth={2}
              fillOpacity={1} 
              fill={`url(#${gradientId})`} 
              activeDot={{ r: 6, fill: color, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <ResponsiveContainer width="100%" height={height}>
          <RechartsLineChart
            data={data}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            {showGrid && (
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false} 
                stroke="rgba(0,0,0,0.05)" 
              />
            )}
            <XAxis 
              dataKey={xKey} 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#888' }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#888' }}
              width={40}
            />
            <Tooltip content={renderTooltipContent} />
            <Line 
              type="monotone" 
              dataKey={yKey} 
              stroke={color} 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: color, strokeWidth: 0 }}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default LineChart;
