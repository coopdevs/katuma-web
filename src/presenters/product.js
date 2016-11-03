export const PRODUCT_UNITS = {
  [0]: 'kilos',
  [1]: 'pieces',
  [2]: 'liters',
};

/**
 * Get product units human string
 * TODO: Implement a i18n system and translate this
 *
 * @param {String} key
 * @return {String}
 */
export function getProductName(key) {
  const value = PRODUCT_UNITS[key];

  switch (value) {
    case PRODUCT_UNITS[0]:
      return 'Kilos';
    case PRODUCT_UNITS[1]:
      return 'Piezas';
    case PRODUCT_UNITS[2]:
      return 'Litros';
    default:
      return 'Unidad desconocida';
  }
}
