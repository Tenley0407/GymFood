import React from 'react';
import { CATEGORIES, DELIVERY_SCHEDULE } from '../constants';
import { CategoryType, TimeSlot } from '../types';
import { Lock } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: CategoryType | 'ALL';
  onSelectCategory: (category: CategoryType | 'ALL') => void;
  activeTimeSlot: TimeSlot;
  onSelectTimeSlot: (slot: TimeSlot) => void;
  currentHour: number; // To determine if slot is closed
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  selectedCategory, 
  onSelectCategory,
  activeTimeSlot,
  onSelectTimeSlot,
  currentHour
}) => {

  return (
    <div className="bg-[#F9FAFB]">
      
      {/* Primary Tabs: Time Slots */}
      <div className="flex w-full border-b border-gray-200 bg-white shadow-sm mb-4 no-scrollbar overflow-x-auto">
        {DELIVERY_SCHEDULE.map((slot) => {
          const isClosed = currentHour >= slot.cutoffHour && slot.id !== TimeSlot.NEXT_DAY_BREAKFAST; // Simplified logic: Breakfast is usually for next day so logic differs, keeping simple for demo
          const isActive = activeTimeSlot === slot.id;

          // Special logic for demo: If mocked time is 11AM, Lunch (cutoff 9) is closed.
          const isLunchClosed = slot.id === TimeSlot.LUNCH && currentHour >= 9;
          const isDinnerClosed = slot.id === TimeSlot.DINNER && currentHour >= 15;
          const actuallyClosed = isLunchClosed || isDinnerClosed;

          return (
            <button
              key={slot.id}
              onClick={() => !actuallyClosed && onSelectTimeSlot(slot.id)}
              disabled={actuallyClosed}
              className={`
                flex-1 min-w-[120px] py-4 text-center font-bold text-sm sm:text-base border-b-2 transition-colors relative
                ${isActive 
                  ? 'border-red-600 text-red-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-800'
                }
                ${actuallyClosed ? 'opacity-50 cursor-not-allowed bg-gray-50' : ''}
              `}
            >
              <div className="flex flex-col items-center justify-center">
                <span className="flex items-center gap-1">
                  {slot.label}
                  {actuallyClosed && <Lock className="w-3 h-3" />}
                </span>
                {actuallyClosed && (
                   <span className="text-[10px] font-medium text-gray-400 mt-1 uppercase tracking-wide">
                     Closed
                   </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Secondary Filter: Goals (Horizontal Scroll) */}
      <div className="mb-6 overflow-x-auto no-scrollbar pb-2 px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-3 min-w-max">
          <button
            onClick={() => onSelectCategory('ALL')}
            className={`
              flex items-center px-4 py-2 rounded-full transition-all duration-200 border text-sm
              ${selectedCategory === 'ALL' 
                ? 'bg-gray-800 text-white border-gray-800' 
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
              }
            `}
          >
            <span className="font-medium whitespace-nowrap">All Goals</span>
          </button>

          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 border text-sm
                  ${isSelected 
                    ? 'bg-white border-red-500 ring-1 ring-red-500 text-gray-900 shadow-sm' 
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                <div className={`p-0.5 rounded-full`}>
                   <Icon className={`w-3.5 h-3.5 ${cat.color}`} />
                </div>
                <span className={`font-medium whitespace-nowrap`}>
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;