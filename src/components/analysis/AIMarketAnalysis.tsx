
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Brain, BrainCircuit, TrendingUp, LineChart, Calendar, Loader2, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { analyzeMarket, TimeRange, StockSymbol, AnalysisResponse } from '@/services/deepseekService';
import { toast } from 'sonner';

// Stock options for analysis
const stockOptions = [
  { value: 'NIFTY50', label: 'Nifty 50' },
  { value: 'SENSEX', label: 'Sensex' },
  { value: 'NIFTYBANK', label: 'Nifty Bank' },
  { value: 'RELIANCE', label: 'Reliance Industries' },
  { value: 'TCS', label: 'Tata Consultancy Services' },
  { value: 'HDFC', label: 'HDFC Bank' },
  { value: 'INFY', label: 'Infosys' },
  { value: 'ICICI', label: 'ICICI Bank' },
  { value: 'WIPRO', label: 'Wipro Ltd' },
  { value: 'ITC', label: 'ITC Limited' },
  { value: 'SBIN', label: 'State Bank of India' },
  { value: 'LT', label: 'Larsen & Toubro' },
  { value: 'MARUTI', label: 'Maruti Suzuki' }
];

const AIMarketAnalysis: React.FC = () => {
  const [analysisType, setAnalysisType] = useState<'index' | 'stock'>('index');
  const [selectedIndex, setSelectedIndex] = useState<StockSymbol>('NIFTY50');
  const [selectedStocks, setSelectedStocks] = useState<StockSymbol[]>([]);
  const [timeRange, setTimeRange] = useState<TimeRange>('day');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);

  const handleStockToggle = (stock: StockSymbol, checked: boolean) => {
    if (checked) {
      setSelectedStocks([...selectedStocks, stock]);
    } else {
      setSelectedStocks(selectedStocks.filter(s => s !== stock));
    }
  };

  const runAnalysis = async () => {
    if (isAnalyzing) return;
    
    setIsAnalyzing(true);
    setAnalysisResult(null);
    
    try {
      const symbols = analysisType === 'index' ? [selectedIndex] : selectedStocks;
      
      if (symbols.length === 0) {
        toast("No stocks selected", {
          description: "Please select at least one stock for analysis",
          duration: 5000
        });
        setIsAnalyzing(false);
        return;
      }
      
      const result = await analyzeMarket({
        symbols,
        timeRange
      });
      
      setAnalysisResult(result);
      toast("Analysis completed", {
        description: "DeepSeek AI has analyzed your selected securities",
        duration: 3000
      });
    } catch (error) {
      toast("Analysis failed", {
        description: "There was an error analyzing the market data",
        duration: 5000
      });
      console.error("Analysis error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getRecommendationColor = (recommendation: string | undefined) => {
    if (!recommendation) return "bg-secondary";
    
    switch (recommendation) {
      case 'buy': return "bg-emerald-500 hover:bg-emerald-600";
      case 'sell': return "bg-rose-500 hover:bg-rose-600";
      case 'hold': return "bg-amber-500 hover:bg-amber-600";
      default: return "bg-secondary";
    }
  };

  const getRecommendationIcon = (recommendation: string | undefined) => {
    if (!recommendation) return <AlertCircle className="h-4 w-4" />;
    
    switch (recommendation) {
      case 'buy': return <TrendingUp className="h-4 w-4" />;
      case 'sell': return <TrendingUp className="h-4 w-4 rotate-180" />;
      case 'hold': return <CheckCircle2 className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <Card className="ai-analysis-card w-full h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <BrainCircuit className="h-6 w-6 text-primary" />
          <CardTitle>DeepSeek AI Market Analysis</CardTitle>
        </div>
        <CardDescription className="text-base opacity-90">
          Get advanced AI-powered insights and trading recommendations
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-5">
        <Tabs value={analysisType} onValueChange={(v) => setAnalysisType(v as 'index' | 'stock')} className="w-full">
          <TabsList className="w-full mb-4 grid grid-cols-2">
            <TabsTrigger value="index" className="text-sm font-medium">Analyze Index</TabsTrigger>
            <TabsTrigger value="stock" className="text-sm font-medium">Analyze Stocks</TabsTrigger>
          </TabsList>
          
          <TabsContent value="index" className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label>Select Index</Label>
              <Select value={selectedIndex} onValueChange={setSelectedIndex}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select index" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NIFTY50">Nifty 50</SelectItem>
                  <SelectItem value="SENSEX">Sensex</SelectItem>
                  <SelectItem value="NIFTYBANK">Nifty Bank</SelectItem>
                  <SelectItem value="NIFTYIT">Nifty IT</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
          
          <TabsContent value="stock" className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="flex justify-between">
                <span>Select Stocks</span>
                <span className="text-xs text-muted-foreground">
                  {selectedStocks.length} of 5 stocks selected
                </span>
              </Label>
              <div className="max-h-48 overflow-y-auto border rounded-md p-3 space-y-2 grid grid-cols-1 sm:grid-cols-2">
                {stockOptions.map(stock => (
                  <div key={stock.value} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`stock-${stock.value}`} 
                      checked={selectedStocks.includes(stock.value)}
                      onCheckedChange={(checked) => handleStockToggle(stock.value, checked === true)}
                      disabled={selectedStocks.length >= 5 && !selectedStocks.includes(stock.value)}
                    />
                    <Label 
                      htmlFor={`stock-${stock.value}`}
                      className="cursor-pointer text-sm"
                    >
                      {stock.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="space-y-4 mt-6">
          <div className="space-y-2">
            <Label>Time Range</Label>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={timeRange === 'day' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setTimeRange('day')}
                className="flex gap-1"
              >
                <Calendar className="h-4 w-4" />
                Day
              </Button>
              <Button 
                variant={timeRange === 'week' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setTimeRange('week')}
                className="flex gap-1"
              >
                <Calendar className="h-4 w-4" />
                Week
              </Button>
              <Button 
                variant={timeRange === 'month' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setTimeRange('month')}
                className="flex gap-1"
              >
                <Calendar className="h-4 w-4" />
                Month
              </Button>
              <Button 
                variant={timeRange === 'year' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setTimeRange('year')}
                className="flex gap-1"
              >
                <Calendar className="h-4 w-4" />
                Year
              </Button>
            </div>
          </div>
          
          <Button 
            onClick={runAnalysis} 
            disabled={isAnalyzing || (analysisType === 'stock' && selectedStocks.length === 0)}
            className="w-full bg-primary/90 hover:bg-primary"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Brain className="mr-2 h-5 w-5" />
                Run AI Analysis
              </>
            )}
          </Button>
        </div>
        
        {analysisResult && (
          <div className="mt-8 space-y-4">
            <Separator className="bg-border/30" />
            
            <div className="space-y-4 p-4 bg-card/50 rounded-lg border border-primary/20">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-xl">Analysis Results</h3>
                <Badge 
                  className={`${getRecommendationColor(analysisResult.recommendation)} text-white px-3 py-1`}
                >
                  {getRecommendationIcon(analysisResult.recommendation)}
                  <span className="ml-1 uppercase font-medium">{analysisResult.recommendation}</span>
                </Badge>
              </div>
              
              <p className="text-base leading-relaxed">
                {analysisResult.summary}
              </p>
              
              <div className="mt-6">
                <h4 className="font-medium text-base mb-3 flex items-center">
                  <LineChart className="h-5 w-5 text-primary mr-2" />
                  Key Insights
                </h4>
                <ul className="space-y-3 pl-2">
                  {analysisResult.insights.map((insight, index) => (
                    <li key={index} className="text-base flex gap-3 items-start">
                      <ArrowRight className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground py-2">
                <div className="w-full bg-muted/50 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary" 
                    style={{ width: `${Math.round(analysisResult.confidence * 100)}%` }}
                  ></div>
                </div>
                <span>Confidence: {Math.round(analysisResult.confidence * 100)}%</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex flex-col text-xs text-muted-foreground border-t pt-4 pb-4 px-6">
        <p>Powered by DeepSeek AI - Analysis is for informational purposes only</p>
      </CardFooter>
    </Card>
  );
};

export default AIMarketAnalysis;
