export type OptionLevel = 'safer' | 'sometimes' | 'better-not';

export interface Food {
  id: string;
  slug: string;
}

export interface OptionConfig {
  level: OptionLevel;
  icon: string;
}
