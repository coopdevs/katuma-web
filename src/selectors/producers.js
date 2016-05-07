import _ from 'underscore';
import { createSelector } from 'reselect';

function selectSuppliersWithProducer(suppliers, producers) {
  const entities = _.map(suppliers, (supplier) => {
    const producer = _.omit(producers, ['created_at', 'updated_at', 'id']);

    return {
      ...producer,
      ...supplier,
    };
  });

  return {
    entities: entities,
  };
}

const suppliersSelector = (state) => state.suppliersReducer.suppliers;
const producersSelector = (state) => state.producersReducer.producers;

export const suppliersWithProducerSelector = createSelector(
  [suppliersSelector, producersSelector],
  (suppliers, producers) => {
    return {
      producers: selectSuppliersWithProducer(suppliers, producers),
    };
  }
);
