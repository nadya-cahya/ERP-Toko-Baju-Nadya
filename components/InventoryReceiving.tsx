import React, { useState } from 'react';
import { Truck, Check, Plus, AlertCircle, Wand2 } from 'lucide-react';
import { suggestGLCode } from '../services/geminiService';

export const InventoryReceiving: React.FC = () => {
  const [formData, setFormData] = useState({
    sku: '',
    styleName: '',
    category: 'Apparel',
    color: '',
    size: '',
    qty: 0,
    cost: 0,
    glCode: ''
  });
  
  const [loadingGL, setLoadingGL] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePredictGL = async () => {
      if (!formData.styleName || !formData.cost) return;
      setLoadingGL(true);
      const code = await suggestGLCode(formData.styleName, formData.category, Number(formData.cost));
      setFormData(prev => ({ ...prev, glCode: code }));
      setLoadingGL(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
        setSuccess(false);
        setFormData({
            sku: '',
            styleName: '',
            category: 'Apparel',
            color: '',
            size: '',
            qty: 0,
            cost: 0,
            glCode: ''
        });
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">Inbound Logistics</h1>
        <p className="text-neutral-500 mt-1">Receive stock and assign Ledger codes automatically.</p>
      </div>

      <div className="bg-luxe-800 border border-luxe-700 rounded-xl p-8 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* SKU & Identification */}
            <div className="space-y-4">
               <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider border-b border-luxe-700 pb-2">Product Identification</h3>
               <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">SKU</label>
                <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-luxe-600 bg-luxe-700 text-neutral-400 text-sm">LX-</span>
                    <input 
                    type="text" 
                    name="sku"
                    value={formData.sku}
                    onChange={handleInputChange}
                    placeholder="RN-005"
                    className="flex-1 min-w-0 block w-full px-3 py-2 bg-luxe-900 border border-luxe-600 rounded-r-md text-white focus:ring-luxe-accent focus:border-luxe-accent sm:text-sm"
                    />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">Style Name</label>
                <input 
                  type="text" 
                  name="styleName"
                  value={formData.styleName}
                  onChange={handleInputChange}
                  placeholder="e.g. AeroSwift Running Vest"
                  className="block w-full px-3 py-2 bg-luxe-900 border border-luxe-600 rounded-md text-white focus:ring-luxe-accent focus:border-luxe-accent sm:text-sm"
                />
              </div>

               <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">Category</label>
                <select 
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 bg-luxe-900 border border-luxe-600 rounded-md text-white focus:ring-luxe-accent focus:border-luxe-accent sm:text-sm"
                >
                    <option>Apparel</option>
                    <option>Footwear</option>
                    <option>Accessories</option>
                </select>
              </div>
            </div>

            {/* Financials & Variants */}
            <div className="space-y-4">
                <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider border-b border-luxe-700 pb-2">Variant & Financials</h3>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-300 mb-1">Color</label>
                        <input 
                        type="text" 
                        name="color"
                        value={formData.color}
                        onChange={handleInputChange}
                        className="block w-full px-3 py-2 bg-luxe-900 border border-luxe-600 rounded-md text-white focus:ring-luxe-accent focus:border-luxe-accent sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-300 mb-1">Size</label>
                        <input 
                        type="text" 
                        name="size"
                        value={formData.size}
                        onChange={handleInputChange}
                        className="block w-full px-3 py-2 bg-luxe-900 border border-luxe-600 rounded-md text-white focus:ring-luxe-accent focus:border-luxe-accent sm:text-sm"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-300 mb-1">Quantity</label>
                        <input 
                        type="number" 
                        name="qty"
                        value={formData.qty}
                        onChange={handleInputChange}
                        className="block w-full px-3 py-2 bg-luxe-900 border border-luxe-600 rounded-md text-white focus:ring-luxe-accent focus:border-luxe-accent sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-300 mb-1">Unit Cost ($)</label>
                        <input 
                        type="number" 
                        name="cost"
                        value={formData.cost}
                        onChange={handleInputChange}
                        className="block w-full px-3 py-2 bg-luxe-900 border border-luxe-600 rounded-md text-white focus:ring-luxe-accent focus:border-luxe-accent sm:text-sm"
                        />
                    </div>
                </div>

                {/* Intelligent GL Coding */}
                <div className="pt-2">
                    <label className="block text-sm font-medium text-neutral-300 mb-1">
                        General Ledger Code
                        <span className="ml-2 text-xs text-luxe-accent font-normal">(AI Suggested)</span>
                    </label>
                    <div className="flex gap-2">
                         <input 
                            type="text" 
                            name="glCode"
                            value={formData.glCode}
                            readOnly
                            placeholder="e.g. 5001"
                            className="block w-full px-3 py-2 bg-luxe-900 border border-luxe-600 rounded-md text-white font-mono focus:ring-luxe-accent focus:border-luxe-accent sm:text-sm"
                        />
                        <button 
                            type="button"
                            onClick={handlePredictGL}
                            disabled={loadingGL || !formData.styleName}
                            className="px-4 py-2 bg-luxe-700 hover:bg-luxe-600 text-white rounded-md transition-colors border border-luxe-600 flex items-center disabled:opacity-50"
                        >
                            {loadingGL ? <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"/> : <Wand2 className="w-4 h-4" />}
                        </button>
                    </div>
                    <p className="text-xs text-neutral-500 mt-1">
                        Click the wand to auto-assign based on category and cost (e.g., COGS vs Opex).
                    </p>
                </div>
            </div>
          </div>

          <div className="pt-6 flex items-center justify-end space-x-4 border-t border-luxe-700">
             {success && (
                <div className="flex items-center text-green-500 mr-auto animate-pulse">
                    <Check className="w-5 h-5 mr-2" />
                    <span>Inventory Record Created & GL Posted</span>
                </div>
             )}
             <button type="button" className="px-6 py-2.5 text-sm font-medium text-neutral-300 hover:text-white transition-colors">
                Cancel
             </button>
             <button 
                type="submit" 
                className="px-6 py-2.5 bg-white text-black font-bold rounded-lg hover:bg-neutral-200 transition-colors shadow-lg shadow-white/10 flex items-center"
            >
                <Plus className="w-4 h-4 mr-2" />
                Process Receipt
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};
