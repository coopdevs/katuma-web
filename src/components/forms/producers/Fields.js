import React from 'react';
import { Field } from 'redux-form';

import Input from 'components/Input';

const Fields = () => (
  <div>
    <Field name="group_id" component={Input} type="hidden" />
    <Field
      name="name"
      component={Input}
      placeholder="Nombre del productor"
      label="Nombre"
      type="text"
      errorsAlways
      setInitialFocus
      />
    <Field
      name="address"
      component={Input}
      placeholder="Direccion del productor. Calle, localidad, provincia,..."
      label="Direccion"
      type="textarea"
      errorsAlways
      rows={5}
      />
  </div>
);

export default Fields;
