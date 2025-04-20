
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Home, List, Plus, Settings, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'posts', label: 'Posts', icon: List },
    { id: 'create', label: 'Create', icon: Plus },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Mobile App</h1>
          
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Welcome, {user?.name}</span>
            <button 
              onClick={() => logout()} 
              className="text-sm text-primary hover:underline"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>
      
      {/* Bottom Navigation */}
      <nav className="sticky bottom-0 border-t bg-background shadow-lg">
        <div className="flex justify-around items-center h-16">
          {tabs.map(tab => (
            <a
              key={tab.id}
              href={`/${tab.id === 'home' ? '' : tab.id}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(tab.id);
                // Navigation would go here
              }}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full",
                activeTab === tab.id ? "text-primary" : "text-muted-foreground"
              )}
            >
              <tab.icon className="h-5 w-5" />
              <span className="text-xs mt-1">{tab.label}</span>
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Dashboard;
