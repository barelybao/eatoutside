import type { Food } from '../types/food';

export const foods: Food[] = [
  {
    id: 0,
    name: 'Chicken Rice',
    tip: 'Cucumber slices add a refreshing crunch to the meal.',
    options: {
      light: 'Boiled chicken (skinless) + plain rice',
      caution: 'Boiled chicken + flavoured rice',
      avoid: 'Roasted chicken + flavoured rice'
    }
  },
  {
    id: 1,
    name: 'Fish Soup',
    tip: 'Clear broth is hydrating and easy on the stomach.',
    options: {
      light: 'Sliced fish in clear broth',
      caution: 'Fried fish in clear broth',
      avoid: 'Fried fish in milk broth'
    }
  },
  {
    id: 2,
    name: 'Yong Tau Foo',
    tip: 'Tofu and leafy greens are soft and easy to digest.',
    options: {
      light: 'Soup base with fresh tofu and greens',
      caution: 'Dry style with sweet bean sauce',
      avoid: 'Laksa broth or mostly crispy fried items'
    }
  },
  {
    id: 3,
    name: 'Ban Mian',
    tip: 'Adding extra spinach makes the broth feel more balanced.',
    options: {
      light: 'Clear soup with extra vegetables',
      caution: 'Dry style with minced meat',
      avoid: 'Dry style with extra chili oil and fried ikan bilis'
    }
  },
  {
    id: 4,
    name: 'Nasi Lemak',
    tip: 'The cucumber and egg provide a nice contrast in texture.',
    options: {
      light: 'Plain rice with ikan bilis, egg, and cucumber',
      caution: 'Coconut rice with otah and wings',
      avoid: 'Coconut rice with extra sambal and fried sides'
    }
  },
  {
    id: 5,
    name: 'Wanton Mee',
    tip: 'Soup on the side helps keep the noodles soft.',
    options: {
      light: 'Soup version with boiled wantons',
      caution: 'Dry version with char siew',
      avoid: 'Dry version with extra sauce and fried wantons'
    }
  },
  {
    id: 6,
    name: 'Carrot Cake',
    tip: 'White carrot cake has a simpler, more savory flavor profile.',
    options: {
      light: 'White version with more egg, less oil',
      caution: 'White version',
      avoid: 'Black version'
    }
  },
  {
    id: 7,
    name: 'Economical Rice (Cai Fan)',
    tip: 'Steamed options are often easier on the palate.',
    options: {
      light: 'Two steamed vegetable sides + 1 steamed protein',
      caution: 'One stir-fry + 1 fried protein',
      avoid: 'Multiple fried sides or heavy gravy over rice'
    }
  },
  {
    id: 8,
    name: 'Laksa',
    tip: 'Sipping the broth slowly lets you enjoy the spices.',
    options: {
      light: 'Extra bean sprouts',
      caution: 'Extra cockles/fishcake',
      avoid: 'Extra soup or added fried toppings'
    }
  },
  {
    id: 9,
    name: 'Bak Chor Mee',
    tip: 'Vinegar adds a bright tang that cuts through the richness.',
    options: {
      light: 'Soup version with minced meat and mushrooms',
      caution: 'Dry version with balanced sauce',
      avoid: 'Dry version with extra lard/chili/sauce'
    }
  }
];
