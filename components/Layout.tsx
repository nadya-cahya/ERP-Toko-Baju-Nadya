import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Truck, 
  Settings, 
  Menu, 
  Bell, 
  User,
  Search,
  LogOut
} from 'lucide-react';
import { AppView } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: AppView;
  onChangeView: (view: AppView) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, onChangeView }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const NavItem = ({ view, icon: Icon, label }: { view: AppView; icon: any; label: string }) => (
    <button
      onClick={() => onChangeView(view)}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group
        ${currentView === view 
          ? 'bg-luxe-800 text-white border-l-4 border-luxe-accent shadow-lg shadow-black/50' 
          : 'text-neutral-400 hover:bg-luxe-800 hover:text-white'
        }`}
    >
      <Icon className={`w-5 h-5 ${currentView === view ? 'text-luxe-accent' : 'text-neutral-500 group-hover:text-white'}`} />
      <span className="font-medium tracking-wide">{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-luxe-900 text-neutral-200 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside 
        className={`${isSidebarOpen ? 'w-64' : 'w-20'} 
          bg-luxe-900 border-r border-luxe-800 flex flex-col transition-all duration-300 ease-in-out z-20 relative`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-luxe-800">
          {isSidebarOpen ? (
            <span className="text-xl font-bold tracking-tighter text-white">
              LUXE<span className="text-luxe-accent">ATHLE</span>
            </span>
          ) : (
            <span className="text-xl font-bold text-luxe-accent">LA</span>
          )}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-neutral-500 hover:text-white lg:hidden">
            <Menu className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <NavItem view={AppView.DASHBOARD} icon={LayoutDashboard} label={isSidebarOpen ? "Dashboard" : ""} />
          <NavItem view={AppView.INVENTORY} icon={Package} label={isSidebarOpen ? "Inventory" : ""} />
          <NavItem view={AppView.RECEIVING} icon={Truck} label={isSidebarOpen ? "Receiving" : ""} />
          <div className="pt-8 pb-2">
            {isSidebarOpen && <p className="px-4 text-xs font-semibold text-neutral-600 uppercase tracking-wider">System</p>}
          </div>
          <NavItem view={AppView.SETTINGS} icon={Settings} label={isSidebarOpen ? "Settings" : ""} />
        </nav>

        <div className="p-4 border-t border-luxe-800">
          <button className="flex items-center space-x-3 text-neutral-400 hover:text-red-400 w-full px-2 py-2">
            <LogOut className="w-5 h-5" />
            {isSidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-black/40 backdrop-blur-3xl">
        {/* Header */}
        <header className="h-16 bg-luxe-900/50 backdrop-blur-md border-b border-luxe-800 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center space-x-4 bg-luxe-800/50 px-4 py-1.5 rounded-full border border-luxe-700 w-96">
            <Search className="w-4 h-4 text-neutral-500" />
            <input 
              type="text" 
              placeholder="Search SKUs, Orders, or GL Codes..." 
              className="bg-transparent border-none outline-none text-sm text-white placeholder-neutral-500 w-full"
            />
          </div>
          
          <div className="flex items-center space-x-6">
            <button className="relative text-neutral-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-luxe-accent rounded-full animate-pulse"></span>
            </button>
            <div className="flex items-center space-x-3 border-l border-luxe-800 pl-6">
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-white">Alex Morgan</p>
                <p className="text-xs text-neutral-500">Store Manager</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-luxe-800 flex items-center justify-center border border-luxe-700">
                <User className="w-4 h-4 text-luxe-accent" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-8 relative">
           {children}
        </main>
      </div>
    </div>
  );
};
