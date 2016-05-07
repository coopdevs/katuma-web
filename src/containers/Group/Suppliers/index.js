import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import { asyncConnect } from 'redux-async-connect';

import { load as loadSuppliers } from 'redux/modules/suppliers/list';
import { load as loadProducers } from 'redux/modules/producers/list';
import List from './List';

@asyncConnect([{
  promise: (options) => {
    const {
      store: { dispatch },
      params: { id },
    } = options;

    const promises = [];
    promises.push(dispatch(loadSuppliers(id)));
    promises.push(dispatch(loadProducers()));

    return Promise.all(promises);
  },
}])
export default class GroupSuppliers extends Component {
  static propTypes = {
    group: PropTypes.object,
    currentUser: PropTypes.object,
    producers: PropTypes.object,
  }

  render() {

    const { group, producers } = this.props;

    return (
      <div>
        <Helmet title={`Proveedores de ${group.name}`}/>

        <h2>Proveedores</h2>

        <div className="row">

          <div className="col-xs-12 col-sm-6 col-sm-push-6 col-md-4 col-md-push-8">
          </div>

          <div className="col-xs-12 col-sm-6 col-sm-pull-6 col-md-8 col-md-pull-4">
            <List group={group} producers={producers} />
          </div>

        </div>
      </div>
    );
  }
}
