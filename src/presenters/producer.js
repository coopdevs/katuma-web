import _ from 'underscore';

/**
 * Check if producer is supplier of a group
 * suppliers list must be passed scoped by group
 * you must do it on mapStateToProps
 *
 * @param {Object} producer
 * @param {Object} suppliers
 * @returns {Boolean}
 */
export function isSupplier({ id }, suppliers) {
  return _.any(suppliers, (supplier) => supplier.producer_id === id);
}
