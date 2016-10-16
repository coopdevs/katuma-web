import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { isSupplier } from 'presenters/producer';

class Item extends Component {
  static propTypes = {
    producer: PropTypes.object.isRequired,
    group: PropTypes.object.isRequired,
    suppliers: PropTypes.array.isRequired,
  }

  render() {
    const { producer, suppliers } = this.props;
    const editText = producer.can_edit === true ? 'editar - ' : '';
    const workingWithThisProducer = isSupplier(producer, suppliers) ? 'si' : 'no';

    return (
      <div>
        {`${producer.name} - `}

        <span>{editText} </span>
        <span>{`Trabajando con el: ${workingWithThisProducer}`}</span>
      </div>
    );
  }
}

const mapStateToProps = (_state, ownProps) => {
  const { group: { id } } = ownProps;

  return (state) => {
    const { suppliersReducer: { suppliers } } = state;

    return {
      suppliers: suppliers.byGroupId[id],
    };
  };
};


export default connect(mapStateToProps)(Item);
