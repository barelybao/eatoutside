export type OptionLevel = 'light' | 'caution' | 'avoid';

export interface FoodOptions {
  light: string;
  caution: string;
  avoid: string;
}

export interface Food {
  id: number;
  name: string;
  tip: string;
  options: FoodOptions;
}

export interface OptionConfig {
  level: OptionLevel;
  label: string;
  icon: string;
}
