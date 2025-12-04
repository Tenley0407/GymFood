import React from 'react';
import { CartItem } from '../types';
import { X, Trash2, ChevronRight } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemove }) => {
  
  const calculateItemTotal = (item: CartItem) => {
    const addOnsTotal = item.selectedAddOns?.reduce((sum, addon) => sum + addon.price, 0) || 0;
    return (item.price + addOnsTotal) * item.quantity;
  };

  const calculateProteinTotal = (item: CartItem) => {
    // Assuming add-ons might calculate protein later, for now just base
    return item.macros.protein * item.quantity;
  };

  const subtotal = items.reduce((acc, item) => acc + calculateItemTotal(item), 0);
  const totalProtein = items.reduce((acc, item) => acc + calculateProteinTotal(item), 0);

  return (
    <div className={`fixed inset-0 z-50 pointer-events-none ${isOpen ? 'visible' : 'invisible'}`}>
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-gray-900/50 transition-opacity duration-300 pointer-events-auto ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-out pointer-events-auto flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Your Order</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {items.length === 0 ? (
             <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
                <div className="bg-gray-100 p-4 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <p className="font-medium">Your cart is empty</p>
                <p className="text-sm mt-1">Start adding macro-friendly meals!</p>
             </div>
          ) : (
            items.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="flex gap-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-bold text-gray-900">{item.quantity}x {item.name}</h3>
                    <span className="text-sm font-medium text-gray-900">${calculateItemTotal(item).toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {item.macros.protein * item.quantity}g Protein • {item.macros.calories * item.quantity} kcal
                  </p>
                  
                  {/* Notes & Addons */}
                  <div className="mt-2 space-y-1">
                    {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {item.selectedAddOns.map(addon => (
                          <span key={addon.id} className="text-[10px] bg-red-50 text-red-600 px-1.5 py-0.5 rounded border border-red-100">
                            + {addon.name}
                          </span>
                        ))}
                      </div>
                    )}
                    {item.notes && <p className="text-xs text-gray-400 italic">"{item.notes}"</p>}
                  </div>
                  
                  <button 
                    onClick={() => onRemove(item.id)}
                    className="text-xs text-red-500 font-medium mt-2 flex items-center hover:text-red-700"
                  >
                    <Trash2 className="w-3 h-3 mr-1" /> Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-gray-100 bg-gray-50">
             <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Protein Total (Base)</span>
                  <span className="font-semibold text-purple-600">{Math.round(totalProtein)}g</span>
                </div>
                <div className="flex justify-between text-base font-bold text-gray-900">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
             </div>
             
             <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all flex justify-between items-center px-6 group">
               <span>Checkout</span>
               <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;