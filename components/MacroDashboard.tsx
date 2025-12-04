import React from 'react';
import { UserTarget, CartItem } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface MacroDashboardProps {
  userTarget: UserTarget;
  cartItems: CartItem[];
}

const MacroDashboard: React.FC<MacroDashboardProps> = ({ userTarget, cartItems }) => {
  // Calculate current totals based on cart
  const currentMacros = cartItems.reduce((acc, item) => {
    return {
      protein: acc.protein + (item.macros.protein * item.quantity),
      carbs: acc.carbs + (item.macros.carbs * item.quantity),
      fat: acc.fat + (item.macros.fat * item.quantity),
      calories: acc.calories + (item.macros.calories * item.quantity),
    };
  }, { protein: 0, carbs: 0, fat: 0, calories: 0 });

  const remainingProtein = Math.max(0, userTarget.proteinGoal - currentMacros.protein);
  
  // Data for the radial chart
  const proteinData = [
    { name: 'Consumed', value: currentMacros.protein },
    { name: 'Remaining', value: remainingProtein },
  ];
  
  const COLORS = ['#7C3AED', '#E5E7EB']; // Purple for protein, Gray for remaining

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
           <h2 className="text-lg font-bold text-gray-900">Today's Nutrition Dashboard</h2>
           <p className="text-sm text-gray-500">Based on your cart selections</p>
        </div>
        <div className="mt-2 md:mt-0 px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full border border-green-100">
           Active Goal: Lean Muscle Gain
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Main Focus: Protein (Radial Chart) */}
        <div className="col-span-1 flex flex-col items-center justify-center p-4 bg-purple-50/50 rounded-2xl border border-purple-100 relative">
          <div className="h-32 w-32 relative">
             <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={proteinData}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={45}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  stroke="none"
                >
                  {proteinData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            {/* Centered Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-sm font-bold text-gray-400">PRO</span>
                <span className="text-xl font-extrabold text-purple-600">{Math.round(currentMacros.protein)}g</span>
            </div>
          </div>
          <div className="text-center mt-2">
            <p className="text-xs text-gray-500">Goal: {userTarget.proteinGoal}g</p>
            <p className="text-xs font-semibold text-purple-700 mt-1">
              {remainingProtein > 0 ? `${Math.round(remainingProtein)}g needed` : 'Goal Hit! 🎉'}
            </p>
          </div>
        </div>

        {/* Other Macros (Linear Bars) */}
        <div className="col-span-1 md:col-span-3 flex flex-col justify-center space-y-6">
           
           {/* Calories */}
           <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-medium text-gray-700">Calories</span>
                <span className="text-gray-500">{Math.round(currentMacros.calories)} / {userTarget.caloriesGoal} kcal</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="bg-gray-800 h-2.5 rounded-full transition-all duration-500 ease-out" 
                  style={{ width: `${Math.min(100, (currentMacros.calories / userTarget.caloriesGoal) * 100)}%` }}
                ></div>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-8">
              {/* Carbs */}
              <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium text-gray-700">Carbs</span>
                    <span className="text-gray-500">{Math.round(currentMacros.carbs)} / {userTarget.carbsGoal}g</span>
                  </div>
                  <div className="w-full bg-emerald-50 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500 ease-out" 
                      style={{ width: `${Math.min(100, (currentMacros.carbs / userTarget.carbsGoal) * 100)}%` }}
                    ></div>
                  </div>
              </div>

              {/* Fats */}
              <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium text-gray-700">Fats</span>
                    <span className="text-gray-500">{Math.round(currentMacros.fat)} / {userTarget.fatGoal}g</span>
                  </div>
                  <div className="w-full bg-amber-50 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className="bg-amber-500 h-2.5 rounded-full transition-all duration-500 ease-out" 
                      style={{ width: `${Math.min(100, (currentMacros.fat / userTarget.fatGoal) * 100)}%` }}
                    ></div>
                  </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default MacroDashboard;
