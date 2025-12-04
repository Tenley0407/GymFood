import React, { useState, useEffect } from 'react';
import { FoodItem, AddOn, CartItem } from '../types';
import { ADD_ONS } from '../constants';
import { X, Minus, Plus, Flame, CheckCircle2, Circle } from 'lucide-react';

interface QuickViewModalProps {
  item: FoodItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmAdd: (item: FoodItem, quantity: number, notes: string, selectedAddOns: AddOn[]) => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ item, isOpen, onClose, onConfirmAdd }) => {
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);

  // Reset state when item changes
  useEffect(() => {
    setQuantity(1);
    setNotes('');
    setSelectedAddOnIds([]);
  }, [item, isOpen]);

  if (!isOpen || !item) return null;

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const toggleAddOn = (id: string) => {
    setSelectedAddOnIds(prev => 
      prev.includes(id) ? prev.filter(aid => aid !== id) : [...prev, id]
    );
  };

  const handleAddToCart = () => {
    const selectedAddOns = ADD_ONS.filter(addOn => selectedAddOnIds.includes(addOn.id));
    onConfirmAdd(item, quantity, notes, selectedAddOns);
    onClose();
  };

  const addOnsTotal = ADD_ONS.filter(addOn => selectedAddOnIds.includes(addOn.id))
                             .reduce((sum, addOn) => sum + addOn.price, 0);
  
  const totalPrice = (item.price + addOnsTotal) * quantity;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all max-h-[90vh] flex flex-col">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/50 hover:bg-white text-gray-800 rounded-full p-1 transition-colors backdrop-blur-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Area */}
        <div className="overflow-y-auto flex-1">
          <div className="relative h-56">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
               <h2 className="text-2xl font-bold text-white">{item.name}</h2>
               <div className="flex items-center text-white/90 text-sm mt-1">
                  <Flame className="w-4 h-4 text-orange-400 mr-1" />
                  <span>{item.macros.calories} kcal per serving</span>
               </div>
            </div>
          </div>

          <div className="p-6">
            {/* Ingredients List */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                 {item.ingredients.map(ing => (
                   <span key={ing.id} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded border border-gray-200">
                      {ing.name} ({ing.amount})
                   </span>
                 ))}
              </div>
            </div>

            {/* Special Instructions */}
            <div className="mb-6">
               <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
               <textarea
                  id="notes"
                  rows={2}
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-red-500 focus:border-red-500"
                  placeholder="e.g. Sauce on the side, no onions..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
               />
            </div>

            {/* Add-ons Section */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Add Extra Nutrition</h3>
              <div className="space-y-2">
                {ADD_ONS.map(addOn => {
                  const isSelected = selectedAddOnIds.includes(addOn.id);
                  return (
                    <div 
                      key={addOn.id} 
                      onClick={() => toggleAddOn(addOn.id)}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                        isSelected 
                        ? 'border-red-500 bg-red-50' 
                        : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {isSelected 
                          ? <CheckCircle2 className="w-5 h-5 text-red-600" />
                          : <Circle className="w-5 h-5 text-gray-300" />
                        }
                        <span className={`text-sm font-medium ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                          {addOn.name}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        +${addOn.price.toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions (Sticky) */}
        <div className="p-4 border-t border-gray-100 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between gap-4">
            {/* Quantity Stepper */}
            <div className="flex items-center border border-gray-300 rounded-lg h-12">
               <button onClick={handleDecrement} className="px-3 h-full text-gray-600 hover:text-red-600 flex items-center justify-center">
                  <Minus className="w-4 h-4" />
               </button>
               <span className="w-8 text-center font-bold text-gray-900">{quantity}</span>
               <button onClick={handleIncrement} className="px-3 h-full text-gray-600 hover:text-red-600 flex items-center justify-center">
                  <Plus className="w-4 h-4" />
               </button>
            </div>

            {/* Add Button */}
            <button 
               onClick={handleAddToCart}
               className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold h-12 rounded-xl shadow-md transition-colors flex justify-between items-center px-6"
            >
               <span>Add to Order</span>
               <span>${totalPrice.toFixed(2)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;