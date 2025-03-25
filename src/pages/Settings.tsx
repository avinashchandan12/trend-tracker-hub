
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import CustomSelect from '@/components/ui/CustomSelect';
import { useIsMobile } from '@/hooks/use-mobile';

// Mock theme options
const themeOptions = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

// Mock refresh interval options
const refreshOptions = [
  { value: '30', label: '30 seconds' },
  { value: '60', label: '1 minute' },
  { value: '300', label: '5 minutes' },
  { value: '0', label: 'Manual refresh' },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [theme, setTheme] = useState('system');
  const [refreshInterval, setRefreshInterval] = useState('60');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      {isMobile && sidebarOpen && (
        <Sidebar isMobile onClose={() => setSidebarOpen(false)} />
      )}
      
      <div className="flex-1 pt-16">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="p-4 md:p-6 max-w-screen-2xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account and application preferences
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="api">API Keys</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-6 animate-fade-in">
              <div className="dashboard-card">
                <div className="dashboard-card-header">
                  <h2 className="text-lg font-medium">Appearance</h2>
                </div>
                <div className="dashboard-card-content space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="theme">Theme</Label>
                    <CustomSelect
                      options={themeOptions}
                      value={theme}
                      onChange={setTheme}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
              
              <div className="dashboard-card">
                <div className="dashboard-card-header">
                  <h2 className="text-lg font-medium">Data Updates</h2>
                </div>
                <div className="dashboard-card-content space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="refresh">Auto-refresh Interval</Label>
                    <CustomSelect
                      options={refreshOptions}
                      value={refreshInterval}
                      onChange={setRefreshInterval}
                      className="w-full"
                    />
                    <p className="text-sm text-muted-foreground">
                      How often should data be refreshed from the Upstox API
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-sync">Auto-sync with Upstox</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically sync trade data with your Upstox account
                      </p>
                    </div>
                    <Switch id="auto-sync" />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="account" className="animate-fade-in">
              <div className="dashboard-card">
                <div className="dashboard-card-header">
                  <h2 className="text-lg font-medium">Account Information</h2>
                </div>
                <div className="dashboard-card-content space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" value="user@example.com" readOnly className="bg-muted" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="User" />
                  </div>
                  
                  <Button>Save Changes</Button>
                </div>
              </div>
              
              <div className="dashboard-card mt-6">
                <div className="dashboard-card-header">
                  <h2 className="text-lg font-medium">Password</h2>
                </div>
                <div className="dashboard-card-content space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  
                  <Button>Update Password</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="api" className="animate-fade-in">
              <div className="dashboard-card">
                <div className="dashboard-card-header">
                  <h2 className="text-lg font-medium">Upstox API</h2>
                </div>
                <div className="dashboard-card-content space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key</Label>
                    <Input id="api-key" placeholder="Enter your Upstox API key" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="api-secret">API Secret</Label>
                    <Input id="api-secret" type="password" placeholder="Enter your Upstox API secret" />
                  </div>
                  
                  <Button>Save API Credentials</Button>
                </div>
              </div>
              
              <div className="dashboard-card mt-6">
                <div className="dashboard-card-header">
                  <h2 className="text-lg font-medium">DeepSeek AI</h2>
                </div>
                <div className="dashboard-card-content space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="deepseek-key">API Key</Label>
                    <Input id="deepseek-key" placeholder="Enter your DeepSeek AI API key" />
                  </div>
                  
                  <Button>Save API Key</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="notifications" className="animate-fade-in">
              <div className="dashboard-card">
                <div className="dashboard-card-header">
                  <h2 className="text-lg font-medium">Notification Preferences</h2>
                </div>
                <div className="dashboard-card-content space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="trade-alerts">Trade Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications for important market events
                      </p>
                    </div>
                    <Switch id="trade-alerts" defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="price-alerts">Price Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when stocks reach target prices
                      </p>
                    </div>
                    <Switch id="price-alerts" defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="ai-insights">AI Insights</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications for new AI-generated insights
                      </p>
                    </div>
                    <Switch id="ai-insights" defaultChecked />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Settings;
