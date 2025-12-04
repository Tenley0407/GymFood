import React from 'react';
import { FoodItem } from '../types';
import { Plus } from 'lucide-react';

interface FoodCardProps {
  item: FoodItem;
  onAdd: (item: FoodItem) => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ item, onAdd }) => {
  // Scarcity Logic
  const isLowStock = item.stock < 5;

  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full relative">
      
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        {/* Scarcity Badge */}
        {isLowStock && (
           <div className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-pulse shadow-sm">
             Only {item.stock} left
           </div>
        )}
        {/* Tags */}
        <div className="absolute bottom-3 left-3 flex gap-1">
          {item.tags.map(tag => (
             <span key={tag} className="bg-white/90 backdrop-blur-sm text-gray-800 text-[10px] font-semibold px-2 py-0.5 rounded shadow-sm border border-gray-100">
               {tag}
             </span>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-lg font-bold text-gray-900 leading-tight">{item.name}</h3>
          <span className="text-lg font-bold text-gray-900">${item.price.toFixed(2)}</span>
        </div>
        
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{item.description}</p>
        
        {/* Smart Macro Bar */}
        <div className="mt-auto">
          <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1.5">
            <span className="flex items-center text-gray-900">
               <span className="w-1.5 h-1.5 rounded-full bg-gray-900 mr-1.5"></span>
               {item.macros.calories} kcal
            </span>
          </div>
          
          <div className="flex h-2 rounded-full overflow-hidden bg-gray-100 mb-2 w-full">
            {/* Protein Segment */}
            <div className="bg-purple-500 h-full" style={{ width: `${(item.macros.protein * 4 / item.macros.calories) * 100}%` }} title={`Protein: ${item.macros.protein}g`}></div>
            {/* Carbs Segment */}
            <div className="bg-emerald-500 h-full" style={{ width: `${(item.macros.carbs * 4 / item.macros.calories) * 100}%` }} title={`Carbs: ${item.macros.carbs}g`}></div>
            {/* Fat Segment */}
            <div className="bg-amber-500 h-full" style={{ width: `${(item.macros.fat * 9 / item.macros.calories) * 100}%` }} title={`Fat: ${item.macros.fat}g`}></div>
          </div>

          <div className="flex justify-between items-center text-xs">
             <div className="flex space-x-3">
                <span className="text-purple-700 font-medium">{item.macros.protein}g P</span>
                <span className="text-emerald-700 font-medium">{item.macros.carbs}g C</span>
                <span className="text-amber-700 font-medium">{item.macros.fat}g F</span>
             </div>
             
             {/* Add Button */}
             <button 
               onClick={() => onAdd(item)}
               className="bg-gray-100 hover:bg-red-600 hover:text-white text-gray-900 rounded-full p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
             >
               <Plus className="w-4 h-4" />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
