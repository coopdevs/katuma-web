/**
 * Check if producer is provider of a group
 * suppliers list must be passed scoped by group
 * you must do it on mapStateToProps
 *
 * @param {Object} producer
 * @param {Object} suppliersByProduceId
 * @returns {Boolean}
 */
export function isSupplier({ id }, suppliersByProducerId) {
  return !!suppliersByProducerId[id];
}
