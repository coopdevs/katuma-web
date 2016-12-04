import camelCase from 'lodash.camelcase';

const svgIcons = require.context('./svg', false, /.*\.svg$/);

/**
 * Require all icons
 *
 * @param {require} requireContext
 */
function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

// All the icons
export const GLYPHS = requireAll(svgIcons).reduce((state, icon) => {
  if (!icon) return state;

  return {
    ...state,
    [camelCase(icon.slice(1))]: icon
  };
}, {});
