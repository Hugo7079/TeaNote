export enum SugarLevel {
  REGULAR = '全糖 (100%)',
  LESS = '少糖 (70%)',
  HALF = '半糖 (50%)',
  QUARTER = '微糖 (30%)',
  TWO_POINT = '二分糖 (20%)',
  ONE_POINT = '一分糖 (10%)',
  NONE = '無糖 (0%)',
}

export enum IceLevel {
  REGULAR = '正常冰',
  LESS = '少冰',
  HALF = '半冰',
  MICRO = '微冰',
  NONE = '去冰',
  TOTAL_NONE = '完全去冰',
  WARM = '溫',
  HOT = '熱',
}

export enum Size {
  LARGE = '大杯 (L)',
  MEDIUM = '中杯 (M)',
  BOTTLE = '瓶裝 (Bottle)',
}

export interface Topping {
  id: string;
  name: string;
}

export interface Brand {
  id: string;
  name: string;
  color: string;
  popularItems: string[];
  customToppings?: string[]; // Brand specific toppings
  customSizes?: Size[];      // Brand specific size options
}

export interface DrinkRecord {
  id: string;
  brandId: string;
  brandName: string;
  drinkName: string;
  size: Size; // New field
  sugar: SugarLevel;
  ice: IceLevel;
  toppings: string[];
  rating: number; // 1-5
  note: string;
  date: number; // Timestamp
}

export type ViewState = 'history' | 'add' | 'search';