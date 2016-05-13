import _ from 'underscore';
import { createSelector } from 'reselect';

function selectSuppliersWithProducer(suppliers, producers) {
  const entities = _.map(suppliers.entities, (supplier) => {
    const producer = producers.byID[supplier.producer_id];

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
      suppliersDecorated: selectSuppliersWithProducer(suppliers, producers),
    };
  }
);
