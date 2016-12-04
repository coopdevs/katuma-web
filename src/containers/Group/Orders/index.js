import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

class GroupOrders extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    group: PropTypes.object,
  }

  render() {
    const { group } = this.props;

    return (
      <div>
        <Helmet title={`Pedidos para ${group.name}`}/>

        {React.cloneElement(
          this.props.children,
          { group }
        )}
      </div>
    );
  }
}

export default GroupOrders;
