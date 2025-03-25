
import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

// Sample strategies
const sampleStrategies = [
  {
    id: 1,
    name: "Mean Reversion Strategy",
    description: "Buy stocks that have fallen significantly and sell stocks that have risen significantly over the past week.",
    content: "# Mean Reversion Strategy\n\n## Rules:\n\n### Buy Conditions:\n- Stock has dropped by at least 10% in the past week\n- Stock is above its 200-day moving average\n- RSI is below 30 (oversold)\n\n### Sell Conditions:\n- Stock has gained at least 7% from purchase price\n- Stock has been held for more than 30 days\n- RSI moves above 70 (overbought)\n\n## Risk Management:\n- Stop loss at 5% below purchase price\n- Position size not more than 5% of portfolio"
  },
  {
    id: 2,
    name: "Momentum Strategy",
    description: "Buy stocks that are trending upward and have broken key resistance levels.",
    content: "# Momentum Strategy\n\n## Rules:\n\n### Buy Conditions:\n- Stock has risen by at least 5% in the past week\n- Volume is at least 150% of the 50-day average volume\n- Stock has broken above a key resistance level\n\n### Sell Conditions:\n- Stock falls below its 20-day moving average\n- Volume starts declining significantly\n- Stock drops below a key support level\n\n## Risk Management:\n- Trailing stop loss of 8%\n- Position size limited to 7% of portfolio"
  }
];

// Sample opportunities based on market movements
const generateOpportunities = (threshold: number = 5) => {
  // These would normally be calculated from real market data
  return {
    buyOpportunities: [
      { symbol: 'LT', name: 'Larsen & Toubro', price: 2340.60, change: -8.76, timeframe: 'weekly' },
      { symbol: 'ICICI', name: 'ICICI Bank', price: 1020.40, change: -8.90, timeframe: 'monthly' },
      { symbol: 'ITC', name: 'ITC Limited', price: 380.25, change: -12.34, timeframe: 'monthly' },
      { symbol: 'HDFC', name: 'HDFC Bank', price: 1495.60, change: -7.12, timeframe: 'monthly' },
    ],
    sellOpportunities: [
      { symbol: 'MARUTI', name: 'Maruti Suzuki', price: 10450.75, change: 9.87, timeframe: 'weekly' },
      { symbol: 'WIPRO', name: 'Wipro Ltd', price: 450.75, change: 13.67, timeframe: 'monthly' },
      { symbol: 'INFY', name: 'Infosys', price: 1580.25, change: 11.23, timeframe: 'monthly' },
      { symbol: 'SBIN', name: 'State Bank of India', price: 620.30, change: 16.54, timeframe: 'yearly' },
    ]
  };
};

const Strategy: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('editor');
  const [strategies, setStrategies] = useState(sampleStrategies);
  const [currentStrategy, setCurrentStrategy] = useState(strategies[0]);
  const [editingStrategy, setEditingStrategy] = useState(currentStrategy.content);
  const navigate = useNavigate();
  
  const opportunities = generateOpportunities();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSaveStrategy = () => {
    const updatedStrategies = strategies.map(strategy => 
      strategy.id === currentStrategy.id 
        ? {...strategy, content: editingStrategy} 
        : strategy
    );
    
    setStrategies(updatedStrategies);
    setCurrentStrategy({...currentStrategy, content: editingStrategy});
    toast.success("Strategy saved successfully");
  };

  const handleCreateNewStrategy = () => {
    const newStrategy = {
      id: strategies.length + 1,
      name: `New Strategy ${strategies.length + 1}`,
      description: "Add a description for your trading strategy",
      content: "# New Trading Strategy\n\n## Rules:\n\n### Buy Conditions:\n- \n\n### Sell Conditions:\n- \n\n## Risk Management:\n- "
    };
    
    setStrategies([...strategies, newStrategy]);
    setCurrentStrategy(newStrategy);
    setEditingStrategy(newStrategy.content);
    toast.success("New strategy created");
  };

  return (
    <div className="min-h-screen bg-background">
      {sidebarOpen && (
        <Sidebar isMobile={true} onClose={toggleSidebar} />
      )}
      
      <div className="lg:ml-64 pt-16">
        <Header onMenuClick={toggleSidebar} />
        
        <main className="p-4 max-w-screen-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Trading Strategies</h1>
            <Button onClick={handleCreateNewStrategy}>New Strategy</Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>My Strategies</CardTitle>
                  <CardDescription>Select a strategy to edit or view</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {strategies.map(strategy => (
                      <Button
                        key={strategy.id}
                        variant={strategy.id === currentStrategy.id ? "default" : "outline"}
                        className="w-full justify-start"
                        onClick={() => {
                          setCurrentStrategy(strategy);
                          setEditingStrategy(strategy.content);
                        }}
                      >
                        {strategy.name}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Market Opportunities</CardTitle>
                  <CardDescription>Potential trades based on your strategies</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="buy">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="buy">Buy Signals</TabsTrigger>
                      <TabsTrigger value="sell">Sell Signals</TabsTrigger>
                    </TabsList>
                    <TabsContent value="buy" className="pt-4">
                      <div className="space-y-3">
                        {opportunities.buyOpportunities.map((stock, index) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-green-50/30 dark:bg-green-950/20 rounded-md">
                            <div>
                              <div className="font-medium">{stock.symbol}</div>
                              <div className="text-sm text-muted-foreground">{stock.name}</div>
                            </div>
                            <div className="text-right">
                              <div>₹{stock.price.toLocaleString()}</div>
                              <div className="text-danger flex items-center text-sm">
                                <TrendingDown className="h-3 w-3 mr-1" />
                                {stock.change}% ({stock.timeframe})
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="sell" className="pt-4">
                      <div className="space-y-3">
                        {opportunities.sellOpportunities.map((stock, index) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-red-50/30 dark:bg-red-950/20 rounded-md">
                            <div>
                              <div className="font-medium">{stock.symbol}</div>
                              <div className="text-sm text-muted-foreground">{stock.name}</div>
                            </div>
                            <div className="text-right">
                              <div>₹{stock.price.toLocaleString()}</div>
                              <div className="text-success flex items-center text-sm">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                +{stock.change}% ({stock.timeframe})
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>{currentStrategy.name}</CardTitle>
                      <CardDescription>{currentStrategy.description}</CardDescription>
                    </div>
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[240px]">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="editor">Editor</TabsTrigger>
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-auto">
                  {activeTab === 'editor' ? (
                    <Textarea 
                      value={editingStrategy} 
                      onChange={(e) => setEditingStrategy(e.target.value)}
                      className="h-[500px] font-mono"
                    />
                  ) : (
                    <div className="prose dark:prose-invert max-w-none">
                      <pre className="bg-muted p-4 rounded-md overflow-auto">
                        {editingStrategy}
                      </pre>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="border-t bg-muted/50 p-4">
                  <div className="flex justify-between w-full">
                    <Button variant="outline" onClick={() => navigate('/analysis')}>
                      View Analysis
                    </Button>
                    <Button onClick={handleSaveStrategy}>Save Strategy</Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
          
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Performance Threshold Alerts</CardTitle>
                <CardDescription>Stocks that have moved significantly</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="weekly">
                  <TabsList className="mb-4">
                    <TabsTrigger value="daily">Daily</TabsTrigger>
                    <TabsTrigger value="weekly">Weekly</TabsTrigger>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    <TabsTrigger value="yearly">Yearly</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="daily">
                    <ThresholdTable timeframe="daily" />
                  </TabsContent>
                  <TabsContent value="weekly">
                    <ThresholdTable timeframe="weekly" />
                  </TabsContent>
                  <TabsContent value="monthly">
                    <ThresholdTable timeframe="monthly" />
                  </TabsContent>
                  <TabsContent value="yearly">
                    <ThresholdTable timeframe="yearly" />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      
      <Sidebar />
    </div>
  );
};

interface ThresholdTableProps {
  timeframe: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

const ThresholdTable: React.FC<ThresholdTableProps> = ({ timeframe }) => {
  // This would normally come from real market data that's filtered based on the timeframe
  const getMovers = () => {
    const gainers = [
      { symbol: 'MARUTI', name: 'Maruti Suzuki', price: 10450.75, change: 9.87 },
      { symbol: 'WIPRO', name: 'Wipro Ltd', price: 450.75, change: 8.45 },
      { symbol: 'SBIN', name: 'State Bank of India', price: 620.30, change: 7.23 },
      { symbol: 'INFY', name: 'Infosys', price: 1580.25, change: 6.78 },
    ];
    
    const losers = [
      { symbol: 'LT', name: 'Larsen & Toubro', price: 2340.60, change: -8.76 },
      { symbol: 'ITC', name: 'ITC Limited', price: 380.25, change: -7.89 },
      { symbol: 'ICICI', name: 'ICICI Bank', price: 1020.40, change: -5.23 },
      { symbol: 'HDFC', name: 'HDFC Bank', price: 1495.60, change: -3.24 },
    ];
    
    if (timeframe === 'monthly') {
      gainers[0].change = 15.4;
      gainers[1].change = 13.67;
      losers[0].change = -14.32;
      losers[1].change = -12.34;
    } else if (timeframe === 'yearly') {
      gainers[0].change = 28.76;
      gainers[1].change = 22.34;
      losers[0].change = -9.87;
      losers[1].change = -6.78;
    }
    
    return { gainers, losers };
  };
  
  const { gainers, losers } = getMovers();
  
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-lg font-medium mb-3 text-success flex items-center">
          <TrendingUp className="h-5 w-5 mr-2" /> Top Gainers
        </h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Change %</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {gainers.map((stock) => (
              <TableRow key={stock.symbol} className={cn(
                stock.change >= 10 ? "bg-success/10" : stock.change >= 5 ? "bg-success/5" : ""
              )}>
                <TableCell className="font-medium">{stock.symbol}</TableCell>
                <TableCell>{stock.name}</TableCell>
                <TableCell>₹{stock.price.toLocaleString()}</TableCell>
                <TableCell className="text-right text-success font-medium">
                  +{stock.change.toFixed(2)}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-3 text-danger flex items-center">
          <TrendingDown className="h-5 w-5 mr-2" /> Top Losers
        </h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Change %</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {losers.map((stock) => (
              <TableRow key={stock.symbol} className={cn(
                stock.change <= -10 ? "bg-danger/10" : stock.change <= -5 ? "bg-danger/5" : ""
              )}>
                <TableCell className="font-medium">{stock.symbol}</TableCell>
                <TableCell>{stock.name}</TableCell>
                <TableCell>₹{stock.price.toLocaleString()}</TableCell>
                <TableCell className="text-right text-danger font-medium">
                  {stock.change.toFixed(2)}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Strategy;
