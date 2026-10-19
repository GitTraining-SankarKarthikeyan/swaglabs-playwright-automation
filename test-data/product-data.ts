export const products = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
  boltTShirt: 'Sauce Labs Bolt T-Shirt',
  fleeceJacket: 'Sauce Labs Fleece Jacket',
  onesie: 'Sauce Labs Onesie',
  redTShirt: 'Test.allTheThings() T-Shirt (Red)',
} as const;

export const productSortingData = [
  {
    name: 'Name (A to Z)',
    option: 'az',
    expectedNames: [
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt',
      'Sauce Labs Fleece Jacket',
      'Sauce Labs Onesie',
      'Test.allTheThings() T-Shirt (Red)'
    ],
  },

  {
    name: 'Name (Z to A)',
    option: 'za',
    expectedNames: [
      'Test.allTheThings() T-Shirt (Red)',
      'Sauce Labs Onesie',
      'Sauce Labs Fleece Jacket',
      'Sauce Labs Bolt T-Shirt',
      'Sauce Labs Bike Light',
      'Sauce Labs Backpack',

    ],
  },

  {
    name: 'Price (low to high)',
    option: 'lohi',
    expectedPrices: [
      '$7.99',
      '$9.99',
      '$15.99',
      '$15.99',
      '$29.99',
      '$49.99',
    ],
  },

  {
    name: 'Price (high to low)',
    option: 'hilo',
    expectedPrices: [
      '$49.99',
      '$29.99',
      '$15.99',
      '$15.99',
      '$9.99',
      '$7.99',
    ],
  },
] as const; 