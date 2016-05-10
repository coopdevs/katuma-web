import _ from 'underscore';
import { createSelector } from 'reselect';

function selectSuppliersWithProducer(suppliers, producers) {
  const entities = _.map(suppliers.entities, (supplier) => {
    const producerById = producers.byID[supplier.producer_id];

    return {
      ...producerById,
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
