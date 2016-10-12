import React, { Component, PropTypes } from 'react';

export default class GroupProducersItem extends Component {
  static propTypes = {
    producer: PropTypes.object.isRequired,
  }

  render() {
    const { producer } = this.props;
    const editText = producer.can_edit === true ? 'editar' : '';
    const providerText = producer.isProvider === true ? 'pedir' : '';

    return (
      <div>
        {`${producer.name} - `}

        <span>{editText} </span>
        <span>{providerText}</span>
      </div>
    );
  }
}
