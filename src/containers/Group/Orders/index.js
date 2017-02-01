import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

class GroupOrders extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    group: PropTypes.object,
  }

  render() {
    const { group } = this.props;
    const { order_id } = this.props.params;

    return (
      <div>
        <Helmet title={`Pedidos para ${group.name}`}/>

        {React.cloneElement(
          this.props.children,
          { group, order_id }
        )}
      </div>
    );
  }
}

export default GroupOrders;
