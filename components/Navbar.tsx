import React, { useState } from 'react';
import { Search, MapPin, User, CalendarClock, X } from 'lucide-react';
import { DELIVERY_SCHEDULE } from '../constants';

interface NavbarProps {
  cartItemCount: number;
  openCart: () => void;
  onAuthClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartItemCount, openCart, onAuthClick }) => {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Left: Brand & Location */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-orange-500">
                  MacroMate
                </span>
              </div>
              
              {/* Location Pill - Hidden on small mobile */}
              <div className="hidden md:flex items-center bg-gray-100 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-gray-200 cursor-pointer transition-colors">
                <MapPin className="w-4 h-4 text-red-500 mr-2" />
                <span>MKH1 - 12:00 Batch</span>
              </div>
              
              {/* Full Delivery Schedule Button */}
              <button 
                onClick={() => setIsScheduleOpen(true)}
                className="hidden lg:flex items-center text-xs font-semibold text-gray-700 bg-white px-4 py-1.5 rounded-full border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all shadow-sm"
              >
                <CalendarClock className="w-4 h-4 mr-2 text-red-500" />
                Full Delivery Schedule
              </button>
            </div>

            {/* Center: Search (Optional for this demo, keeping it visual) */}
            <div className="flex-1 max-w-md mx-4 hidden md:block">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-red-500 focus:border-red-500 sm:text-sm transition-all"
                  placeholder="Search food, macros..."
                />
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-500 hover:text-gray-900 md:hidden">
                <Search className="w-6 h-6" />
              </button>
              
              <button 
                onClick={openCart}
                className="relative p-2 text-gray-600 hover:text-red-600 transition-colors flex items-center gap-2"
              >
                <div className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full absolute top-0 right-0 transform translate-x-1 -translate-y-1">
                  {cartItemCount}
                </div>
                <span className="hidden sm:inline text-sm font-medium">Cart</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-bag"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              </button>
              
              <button 
                onClick={onAuthClick}
                className="p-2 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"
              >
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Schedule Trigger */}
        <div className="md:hidden px-4 py-2 bg-gray-50 border-b border-gray-100 flex justify-between items-center text-xs">
           <div className="flex items-center font-medium text-gray-700">
              <MapPin className="w-3 h-3 text-red-500 mr-1" />
              MKH1
           </div>
           <button 
             onClick={() => setIsScheduleOpen(true)}
             className="text-red-600 font-semibold flex items-center bg-white border border-red-100 px-2 py-1 rounded"
           >
              <CalendarClock className="w-3 h-3 mr-1" />
              View Schedule
           </button>
        </div>
      </header>

      {/* Schedule Modal */}
      {isScheduleOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setIsScheduleOpen(false)}></div>
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-gray-50 p-4 border-b border-gray-100 flex justify-between items-center">
               <h3 className="font-bold text-gray-900 flex items-center">
                 <CalendarClock className="w-5 h-5 mr-2 text-red-600" />
                 Delivery Schedule
               </h3>
               <button onClick={() => setIsScheduleOpen(false)} className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                 <X className="w-5 h-5 text-gray-500" />
               </button>
            </div>
            <div className="p-5 space-y-4">
              {DELIVERY_SCHEDULE.map((slot) => (
                <div key={slot.id} className="flex items-start justify-between border-b border-gray-50 last:border-0 pb-3 last:pb-0">
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{slot.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Order by: {slot.cutoff}</p>
                  </div>
                  <div className="text-right">
                    <span className="block text-xs font-semibold bg-green-50 text-green-700 px-2 py-1 rounded border border-green-100">
                      Delivers: {slot.delivery}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 p-3 text-center text-xs text-gray-400">
              * Times shown for MKH1 Location
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
