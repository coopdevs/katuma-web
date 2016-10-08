import _ from 'underscore';

const CREATE_SUPPLIER = 'redux-example/suppliers/CREATE_SUPPLIER';
const CREATE_SUPPLIER_SUCCESS = 'redux-example/suppliers/CREATE_SUPPLIER_SUCCESS';
const CREATE_SUPPLIER_FAIL = 'redux-example/suppliers/CREATE_SUPPLIER_FAIL';

const initialState = {
  suppliers: { entities: [], byId: [] },
  createSupplierErrors: {},
};

export default function suppliersReducer(state = initialState, action = {}) {
  let entities;

  switch (action.type) {
    case CREATE_SUPPLIER:
      return {
        ...state,
      };

    case CREATE_SUPPLIER_SUCCESS:
      entities = [...state.suppliers.entities, action.result];

      return {
        ...state,
        suppliers: {
          entities,
          byId: _.indexBy(entities, 'id')
        },
        createSupplierErrors: {},
      };

    case CREATE_SUPPLIER_FAIL:
      const errorsKeys = Object.keys(action.error);
      // FIXME: Extract into utils. Here we're parsing API errors.
      // By default server returns an object with fields with errors.
      // And each field has an array of errors. Here we're picking
      // just first error for each field.
      const createSupplierErrors = errorsKeys.reduce((formattedErrors, key) => {
        formattedErrors[key] = action.error[key][0];
        return formattedErrors;
      }, {});

      return {
        ...state,
        createSupplierErrors: createSupplierErrors
      };

    default:
      return state;
  }
}

export function create(data) {
  return {
    types: [CREATE_SUPPLIER, CREATE_SUPPLIER_SUCCESS, CREATE_SUPPLIER_FAIL],
    promise: (client) => client.post('/suppliers', {
      data: data,
    })
  };
}
