import _ from 'underscore';

/**
 * Return producers decorated with suppliers info
 *
 * @param {Array} producers
 * @param {Array} suppliers.byProducerId
 * @returns {Object}
 */
export function providers(producers, suppliers) {
  return _.map(producers, (producer) => {
    const supplier = suppliers[producer.id];

    return {
      ...producer,
      isProvider: supplier === undefined ? false : true,
    };
  });
}
