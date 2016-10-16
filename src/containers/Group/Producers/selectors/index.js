import _ from 'underscore';
import { createSelector } from 'reselect';

import { isSupplier } from 'presenters/producer';

/**
 * If a producer has supplier means that is active
 *
 * @return {Object}
 */
export const producersByStatus = () => createSelector(
  [
    (state) => state.producersReducer.producers.entities,
    (state, props) => state.suppliersReducer.suppliers.byGroupId[props.group.id],
  ],
  (producers, suppliers) => {
    return _.reduce(producers, (memo, producer) => {
      if (isSupplier(producer, suppliers)) {
        memo.activeProducers.push(producer);
      } else {
        memo.inactiveProducers.push(producer);
      }
      return memo;
    }, { activeProducers: [], inactiveProducers: [] });
  }
);

