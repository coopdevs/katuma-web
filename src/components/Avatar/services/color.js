export const COLORS = [
  '#ec87bf',
  '#34495e',
  '#9b59b6',
  '#f39c12',
  '#3498db',
  '#e74c3c',
  '#2ecc71',
];

function getColorIndex(name) {
  return Math.floor(name.charCodeAt(0) % COLORS.length);
}

/**
 * Get color assigned for that name
 *
 * @param {String} name
 * @param {Object}
 */
export function getColorFromName(name) {
  return {
    background: COLORS[getColorIndex(name)],
    color: 'white',
  };
}
