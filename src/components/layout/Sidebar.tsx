
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Home, 
  LineChart, 
  Settings, 
  TrendingUp,
  BookOpen,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isMobile?: boolean;
  onClose?: () => void;
}

interface NavItem {
  title: string;
  icon: React.ElementType;
  href: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobile = false, onClose }) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const location = useLocation();
  
  const mainNavItems: NavItem[] = [
    {
      title: 'Overview',
      icon: Home,
      href: '/'
    },
    {
      title: 'Dashboard',
      icon: BarChart3,
      href: '/dashboard'
    },
    {
      title: 'Trades',
      icon: TrendingUp,
      href: '/trades'
    },
    {
      title: 'Analysis',
      icon: LineChart,
      href: '/analysis'
    },
    {
      title: 'Journal',
      icon: BookOpen,
      href: '/journal'
    }
  ];
  
  const bottomNavItems: NavItem[] = [
    {
      title: 'Settings',
      icon: Settings,
      href: '/settings'
    }
  ];
  
  const NavItem = ({ item }: { item: NavItem }) => {
    const isActive = location.pathname === item.href;
    
    return (
      <Link 
        to={item.href}
        className={cn(
          'flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
          isActive 
            ? 'bg-primary text-primary-foreground' 
            : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
        )}
        onClick={isMobile ? onClose : undefined}
      >
        <item.icon className="h-5 w-5" />
        {!collapsed && <span>{item.title}</span>}
      </Link>
    );
  };
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  // If mobile, render a fullscreen sidebar with close button
  if (isMobile) {
    return (
      <div className="fixed inset-0 bg-background z-50 animate-fade-in">
        <div className="flex justify-end p-4">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="flex flex-col gap-1 p-2">
          {mainNavItems.map((item) => (
            <NavItem key={item.href} item={item} />
          ))}
        </div>
        <div className="absolute bottom-8 left-0 right-0 flex flex-col gap-1 p-2">
          {bottomNavItems.map((item) => (
            <NavItem key={item.href} item={item} />
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <aside 
      className={cn(
        "h-screen fixed top-0 left-0 z-30 border-r border-border/50 bg-sidebar pt-16 transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex justify-end p-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="text-muted-foreground"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex flex-col gap-1 p-2">
        {mainNavItems.map((item) => (
          <NavItem key={item.href} item={item} />
        ))}
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 flex flex-col gap-1 p-2">
        {bottomNavItems.map((item) => (
          <NavItem key={item.href} item={item} />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
