import { foods } from '../data/foods';
import type { Food, OptionLevel, OptionConfig } from '../types/food';

export function useFood() {
  const allFoods = computed(() => foods);

  const getFoodBySlug = (slug: string): Food | undefined => {
    return foods.find((f) => f.slug === slug);
  };

  const getFoodById = (id: string): Food | undefined => {
    return foods.find((f) => f.id === id);
  };

  const getFoodImagePath = (slug: string): string => {
    return `/img/food/${slug}.webp`;
  };

  const optionConfigs: Record<OptionLevel, OptionConfig> = {
    safer: {
      level: 'safer',
      icon: '/img/ui/light.svg'
    },
    sometimes: {
      level: 'sometimes',
      icon: '/img/ui/caution.svg'
    },
    'better-not': {
      level: 'better-not',
      icon: '/img/ui/avoid.svg'
    }
  };

  return {
    allFoods,
    getFoodBySlug,
    getFoodById,
    getFoodImagePath,
    optionConfigs
  };
}
