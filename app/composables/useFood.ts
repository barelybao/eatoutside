import { foods } from '../data/foods';
import type { Food, OptionLevel, OptionConfig } from '../types/food';

export function useFood() {
  const allFoods = computed(() => foods);

  const getFoodById = (id: number): Food | undefined => {
    return foods.find((f) => f.id === id);
  };

  const getKebabCase = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/\([^)]*\)/g, '')
      .trim();
  };

  const getFoodImagePath = (foodName: string): string => {
    return `/img/food/${getKebabCase(foodName)}.webp`;
  };

  const optionConfigs: Record<OptionLevel, OptionConfig> = {
    light: {
      level: 'light',
      label: 'Light',
      icon: '/img/ui/light.svg'
    },
    caution: {
      level: 'caution',
      label: 'Caution',
      icon: '/img/ui/caution.svg'
    },
    avoid: {
      level: 'avoid',
      label: 'Avoid',
      icon: '/img/ui/avoid.svg'
    }
  };

  return {
    allFoods,
    getFoodById,
    getFoodImagePath,
    getKebabCase,
    optionConfigs
  };
}
