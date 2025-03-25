
import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Auto-redirect to dashboard after animation completes
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted p-4">
      <div className="max-w-md w-full text-center space-y-6 animate-fade-in">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight animate-float">TradeInsight AI</h1>
          <p className="text-muted-foreground text-lg">
            AI-powered trading insights for informed decisions
          </p>
        </div>
        
        <div className="flex flex-col gap-2 animate-fade-in" style={{ animationDelay: '400ms' }}>
          <p className="text-sm text-muted-foreground">Loading your dashboard...</p>
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary animate-pulse-subtle" style={{ width: '70%' }} />
          </div>
        </div>
        
        <Button 
          onClick={() => navigate('/dashboard')} 
          className="animate-fade-in"
          style={{ animationDelay: '800ms' }}
        >
          Go to Dashboard
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Index;
