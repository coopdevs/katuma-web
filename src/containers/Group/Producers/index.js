import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

class GroupProducers extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    group: PropTypes.object,
    user: PropTypes.object,
  }

  render() {
    const { group, user } = this.props;

    return (
      <div>
        <Helmet title={`Productores de ${group.name}`}/>

        {React.cloneElement(
          this.props.children,
          { group, user }
        )}
      </div>
    );
  }
}

export default GroupProducers;
