import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import MacroDashboard from './components/MacroDashboard';
import CategoryFilter from './components/CategoryFilter';
import FoodCard from './components/FoodCard';
import QuickViewModal from './components/QuickViewModal';
import CartDrawer from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';
import { MENU_ITEMS, USER_TARGETS } from './constants';
import { CategoryType, FoodItem, CartItem, TimeSlot, AddOn } from './types';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // New Filter State
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'ALL'>('ALL');
  // Default to Dinner because in our Mock Time (11AM), Lunch (9AM cutoff) is closed.
  // In a real app, logic would pick the first open slot.
  const [activeTimeSlot, setActiveTimeSlot] = useState<TimeSlot>(TimeSlot.DINNER);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFoodItem, setSelectedFoodItem] = useState<FoodItem | null>(null);

  // Auth State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Mock Current Time: 11:00 AM (Hour = 11)
  // This triggers the logic where Lunch (Cutoff 9) is disabled.
  const MOCK_CURRENT_HOUR = 11; 

  // Filter Menu Logic
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      // 1. Filter by Time Slot (Must be available in the selected slot)
      const isAvailableInSlot = item.availableSlots.includes(activeTimeSlot);
      
      // 2. Filter by Category/Goal
      const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;

      return isAvailableInSlot && matchesCategory;
    });
  }, [selectedCategory, activeTimeSlot]);

  // Handlers
  const handleOpenQuickView = (item: FoodItem) => {
    setSelectedFoodItem(item);
    setIsModalOpen(true);
  };

  const handleAddToCart = (item: FoodItem, quantity: number, notes: string, selectedAddOns: AddOn[]) => {
    const newItem: CartItem = { ...item, quantity, notes, selectedAddOns };
    setCartItems(prev => [...prev, newItem]);
    // Optionally trigger a toast here
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen pb-12 bg-[#F9FAFB]">
      <Navbar 
        cartItemCount={cartCount} 
        openCart={() => setIsCartOpen(true)} 
        onAuthClick={() => setIsAuthModalOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-0 md:px-6 lg:px-8 pt-6">
        
        <div className="px-4 md:px-0">
          {/* Top: Personal Dashboard */}
          <MacroDashboard userTarget={USER_TARGETS} cartItems={cartItems} />
        </div>

        {/* Categories (Sticky) */}
        <div className="sticky top-16 z-30 bg-[#F9FAFB] pt-2 pb-0">
           <CategoryFilter 
              selectedCategory={selectedCategory} 
              onSelectCategory={setSelectedCategory} 
              activeTimeSlot={activeTimeSlot}
              onSelectTimeSlot={setActiveTimeSlot}
              currentHour={MOCK_CURRENT_HOUR}
           />
        </div>

        {/* Food Grid */}
        <section className="px-4 md:px-0">
           <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                {selectedCategory === 'ALL' ? 'Menu' : filteredItems.length > 0 ? filteredItems[0].category.replace('_', ' ') : 'Items'}
                <span className="ml-3 text-sm font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                  {filteredItems.length} items
                </span>
              </h2>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
             {filteredItems.map(item => (
               <FoodCard 
                 key={item.id} 
                 item={item} 
                 onAdd={handleOpenQuickView} 
               />
             ))}
           </div>
           
           {filteredItems.length === 0 && (
             <div className="text-center py-20 bg-white rounded-xl border border-gray-100 shadow-sm mt-4">
               <p className="text-gray-400 font-medium">No items available in this category for the selected time.</p>
               <button onClick={() => setSelectedCategory('ALL')} className="mt-2 text-red-600 font-semibold text-sm">
                  View All
               </button>
             </div>
           )}
        </section>
      </main>

      {/* Modals & Drawers */}
      <QuickViewModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedFoodItem}
        onConfirmAdd={handleAddToCart}
      />

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={handleRemoveFromCart}
      />

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}

export default App;
