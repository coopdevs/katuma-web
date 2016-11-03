import React from 'react';
import _ from 'underscore';
import { Field } from 'redux-form';

import { getProductName, PRODUCT_UNITS } from 'presenters/product';

const getProductUnitOptions = () => {
  return _.reduce(_.keys(PRODUCT_UNITS), (memo, value) => {
    const option = {
      value,
      label: getProductName(value),
    };
    memo.push(option);
    return memo;
  }, []);
};

import Input from 'components/Input';

const Fields = () => (
  <div className="form-inline">
    <Field name="producer_id" component={Input} type="hidden" />

    <Field
      name="name"
      component={Input}
      placeholder="Nombre del producto"
      type="text"
      setInitialFocus
    />

    <Field
      name="price"
      component={Input}
      placeholder="Precio"
      type="number"
      min={0}
    />

    <Field
      name="unit"
      type="select"
      selectOptions={getProductUnitOptions()}
      component={Input}
      placeholder="Selecciona Unidad"
    />
  </div>
);

export default Fields;
