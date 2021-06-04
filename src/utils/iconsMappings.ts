export const foodIcons:any = {
    "Herbs and Spices": 'herbs',
    "Vegetables": 'vegetables',
    "Fruits": 'fruits',
    "Nuts": 'nuts',
    "Cereals and cereal products": 'cereals',
    "Pulses": 'pulses',
    "Teas": 'tea',
    "Gourds": 'grounds',
    "Coffee and coffee products": 'coffee',
    "Soy": 'soy',
    "Cocoa and cocoa products": 'cocoa',
    "Beverages": 'beverages',
    "Aquatic foods": 'seafood',
    "Animal foods": 'animals',
    "Milk and milk products": 'milk',
    "Eggs": 'eggs',
    "Confectioneries": 'confectioneries',
    "Baking goods": 'baking',
    "Dishes": 'dishes',
    "Snack foods": 'snacks',
    "Baby foods": 'babies',
    "Unclassified": 'item',
    "Fats and oils": 'fats',
    "Herbs and spices": 'herbs',
};

export const getNutrient = (recipe: any, name: string) => {
    const amount = recipe.nutrition.nutrients.find((n: any) => n.name === name).amount;
    return Math.round(amount);
  }