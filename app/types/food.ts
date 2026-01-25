export type OptionLevel = 'light' | 'caution' | 'avoid';

export interface Food {
  id: string;
  slug: string;
}

export interface OptionConfig {
  level: OptionLevel;
  icon: string;
}
