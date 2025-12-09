import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { InventoryReceiving } from './components/InventoryReceiving';
import { AppView } from './types';

function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return <Dashboard />;
      case AppView.INVENTORY:
        return (
          <div className="flex items-center justify-center h-full text-neutral-500">
            <p>Inventory List Component (Mock)</p>
          </div>
        );
      case AppView.RECEIVING:
        return <InventoryReceiving />;
      case AppView.SETTINGS:
        return (
          <div className="flex items-center justify-center h-full text-neutral-500">
             <p>System Settings Component (Mock)</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentView={currentView} onChangeView={setCurrentView}>
      {renderView()}
    </Layout>
  );
}

export default App;
