export interface InventoryItem {
  id: string;
  sku: string;
  styleName: string;
  category: 'Apparel' | 'Footwear' | 'Accessories';
  size: string;
  color: string;
  stockLevel: number;
  reorderPoint: number;
  cost: number;
  price: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

export interface SalesMetric {
  date: string;
  revenue: number;
  unitsSold: number;
  category: string;
}

export interface GLTransaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'Debit' | 'Credit';
  glCode: string;
  category: string;
}

export enum AppView {
  DASHBOARD = 'DASHBOARD',
  INVENTORY = 'INVENTORY',
  RECEIVING = 'RECEIVING',
  SETTINGS = 'SETTINGS'
}

export interface AIAnalysisResult {
  summary: string;
  forecast: string;
  actionItems: string[];
}
