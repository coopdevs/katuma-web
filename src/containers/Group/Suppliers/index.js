import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import { asyncConnect } from 'redux-async-connect';

import { load as loadSuppliers } from 'redux/modules/suppliers/list';
import List from './List';

@asyncConnect([{
  promise: (options) => {
    const {
      store: { dispatch },
      params: { id },
    } = options;

    return dispatch(loadSuppliers(id));
  },
}])
export default class GroupSuppliers extends Component {
  static propTypes = {
    group: PropTypes.object,
    currentUser: PropTypes.object,
    suppliers: PropTypes.array,
  }

  render() {

    const { group, suppliers } = this.props;

    return (
      <div>
        <Helmet title={`Proveedores de ${group.name}`}/>

        <h2>Proveedores</h2>

        <div className="row">

          <div className="col-xs-12 col-sm-6 col-sm-push-6 col-md-4 col-md-push-8">
          </div>

          <div className="col-xs-12 col-sm-6 col-sm-pull-6 col-md-8 col-md-pull-4">
            <List group={group} suppliers={suppliers} />
          </div>

        </div>
      </div>
    );
  }
}
