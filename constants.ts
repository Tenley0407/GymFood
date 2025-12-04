import { CategoryType, FoodItem, UserTarget, TimeSlot, AddOn } from './types';
import { Dumbbell, Flame, Zap, Coffee, Pizza, Cherry, Milk } from 'lucide-react';

export const USER_TARGETS: UserTarget = {
  proteinGoal: 160,
  carbsGoal: 200,
  fatGoal: 60,
  caloriesGoal: 2200,
};

export const ADD_ONS: AddOn[] = [
  { id: 'ao1', name: 'Extra Protein Powder', price: 5.00 },
  { id: 'ao2', name: 'Extra Hard-Boiled Egg', price: 2.00 },
  { id: 'ao3', name: 'Extra Brown Rice', price: 2.00 },
];

export const DELIVERY_SCHEDULE = [
  {
    id: TimeSlot.LUNCH,
    label: 'Lunch',
    cutoff: '9:00 AM',
    delivery: '12:00 PM',
    cutoffHour: 9, // 24h format for logic
  },
  {
    id: TimeSlot.DINNER,
    label: 'Dinner',
    cutoff: '3:00 PM',
    delivery: '6:00 PM',
    cutoffHour: 15,
  },
  {
    id: TimeSlot.NEXT_DAY_BREAKFAST,
    label: 'Next Day Breakfast',
    cutoff: '10:00 PM',
    delivery: '7:30 AM',
    cutoffHour: 22,
  },
];

export const CATEGORIES = [
  { id: CategoryType.MUSCLE_GAIN, label: 'Muscle Gain', icon: Dumbbell, color: 'text-purple-600', bg: 'bg-purple-100' },
  { id: CategoryType.FAT_LOSS, label: 'Fat Loss', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-100' },
  { id: CategoryType.PRE_WORKOUT, label: 'Pre-Workout', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-100' },
  { id: CategoryType.DRINKS, label: 'Supplements', icon: Milk, color: 'text-blue-500', bg: 'bg-blue-100' },
  { id: CategoryType.CHEAT_MEAL, label: 'Cheat Meal', icon: Pizza, color: 'text-red-500', bg: 'bg-red-100' },
  { id: CategoryType.FRUITS, label: 'Fruits', icon: Cherry, color: 'text-pink-500', bg: 'bg-pink-100' },
];

export const MENU_ITEMS: FoodItem[] = [
  {
    id: '1',
    name: 'Pro-Gain Chicken Rice',
    description: 'Sous-vide chicken breast with broccoli and brown rice. The ultimate staple.',
    price: 12.50,
    image: 'https://picsum.photos/400/400?random=1',
    category: CategoryType.MUSCLE_GAIN,
    stock: 4, // Low stock demo
    macros: { calories: 618, protein: 69, carbs: 62, fat: 7.5 },
    ingredients: [
      { id: 'i1', name: 'Chicken Breast', amount: '200g' },
      { id: 'i2', name: 'Brown Rice', amount: '200g' },
      { id: 'i3', name: 'Broccoli', amount: '80g' },
    ],
    tags: ['High Protein', 'Clean'],
    availableSlots: [TimeSlot.LUNCH, TimeSlot.DINNER]
  },
  {
    id: '2',
    name: 'Lean Beef Pasta',
    description: 'Lean ground beef with whole wheat pasta and tomato basil sauce.',
    price: 14.00,
    image: 'https://picsum.photos/400/400?random=2',
    category: CategoryType.MUSCLE_GAIN,
    stock: 12,
    macros: { calories: 700, protein: 50, carbs: 70, fat: 18 },
    ingredients: [
      { id: 'i4', name: 'Lean Beef', amount: '150g' },
      { id: 'i5', name: 'Wheat Pasta', amount: '180g' },
    ],
    tags: ['Bulking'],
    availableSlots: [TimeSlot.LUNCH, TimeSlot.DINNER]
  },
  {
    id: '3',
    name: 'Shredder Salad Bowl',
    description: 'Massive volume, low calorie. Tuna chunks with mixed greens and vinaigrette.',
    price: 10.50,
    image: 'https://picsum.photos/400/400?random=3',
    category: CategoryType.FAT_LOSS,
    stock: 8,
    macros: { calories: 280, protein: 25, carbs: 12, fat: 5 },
    ingredients: [
      { id: 'i6', name: 'Tuna', amount: '100g' },
      { id: 'i7', name: 'Mixed Greens', amount: '150g' },
    ],
    tags: ['Low Carb', 'Keto Friendly'],
    availableSlots: [TimeSlot.LUNCH, TimeSlot.DINNER]
  },
  {
    id: '4',
    name: 'Whey Isolate Shake',
    description: 'Double scoop chocolate whey with water or skim milk option.',
    price: 5.00,
    image: 'https://picsum.photos/400/400?random=4',
    category: CategoryType.DRINKS,
    stock: 50,
    macros: { calories: 240, protein: 50, carbs: 4, fat: 2 },
    ingredients: [
      { id: 'i8', name: 'Whey Protein', amount: '2 scoops' },
    ],
    tags: ['Post-Workout'],
    availableSlots: [TimeSlot.LUNCH, TimeSlot.DINNER, TimeSlot.NEXT_DAY_BREAKFAST]
  },
  {
    id: '5',
    name: 'Guilt-Free Burger',
    description: 'A leaner take on the classic burger. 90% lean beef patty.',
    price: 13.50,
    image: 'https://picsum.photos/400/400?random=5',
    category: CategoryType.CHEAT_MEAL,
    stock: 2, // Very low stock
    macros: { calories: 650, protein: 45, carbs: 45, fat: 28 },
    ingredients: [
      { id: 'i9', name: 'Beef Patty', amount: '150g' },
      { id: 'i10', name: 'Brioche Bun', amount: '1pc' },
    ],
    tags: ['Comfort Food'],
    availableSlots: [TimeSlot.DINNER]
  },
  {
    id: '6',
    name: 'Sunrise Egg Toast',
    description: 'Whole grain toast with 2 poached eggs and avocado spread.',
    price: 8.50,
    image: 'https://picsum.photos/400/400?random=6',
    category: CategoryType.MUSCLE_GAIN,
    stock: 20,
    macros: { calories: 400, protein: 20, carbs: 35, fat: 18 },
    ingredients: [
      { id: 'i11', name: 'Eggs', amount: '2 pcs' },
      { id: 'i12', name: 'Whole Grain Toast', amount: '2 slices' },
    ],
    tags: ['Breakfast'],
    availableSlots: [TimeSlot.NEXT_DAY_BREAKFAST]
  }
];