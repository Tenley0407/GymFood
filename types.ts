export interface Ingredient {
  id: string;
  name: string;
  amount: string; // e.g., "200g"
}

export interface MacroProfile {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export enum CategoryType {
  MUSCLE_GAIN = 'MUSCLE_GAIN',
  FAT_LOSS = 'FAT_LOSS',
  PRE_WORKOUT = 'PRE_WORKOUT',
  POST_WORKOUT = 'POST_WORKOUT',
  CHEAT_MEAL = 'CHEAT_MEAL',
  DRINKS = 'DRINKS',
  FRUITS = 'FRUITS'
}

export enum TimeSlot {
  LUNCH = 'LUNCH',
  DINNER = 'DINNER',
  NEXT_DAY_BREAKFAST = 'NEXT_DAY_BREAKFAST'
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
}

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  macros: MacroProfile;
  category: CategoryType;
  stock: number; // For scarcity urgency
  ingredients: Ingredient[];
  tags: string[]; // e.g., "Spicy", "High Protein"
  availableSlots: TimeSlot[];
}

export interface CartItem extends FoodItem {
  quantity: number;
  notes?: string;
  selectedAddOns?: AddOn[];
}

export interface UserTarget {
  proteinGoal: number;
  carbsGoal: number;
  fatGoal: number;
  caloriesGoal: number;
}