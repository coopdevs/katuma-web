import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { create, destroy } from 'redux/modules/suppliers/suppliers';
import { isRole } from 'presenters/member';
import Button from 'components/Button';

class Item extends Component {
  static propTypes = {
    producer: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    group: PropTypes.object.isRequired,
    createSupplier: PropTypes.func.isRequired,
    destroySupplier: PropTypes.func.isRequired,
    supplier: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.activate = this._activate.bind(this);
    this.desactivate = this._desactivate.bind(this);
  }

  /**
   * Create in db relation between group and producer
   */
  _activate() {
    const { createSupplier, producer, group } = this.props;

    createSupplier({
      group_id: group.id,
      producer_id: producer.id,
    });
  }

  /**
   * Destroy in db relation between group and producer
   */
  _desactivate() {
    const { destroySupplier, supplier } = this.props;

    destroySupplier(supplier.id);
  }

  /**
   * Check if this producer is editable based on
   * user role on group and if producer is managed by
   * the group
   *
   * @return {Boolean}
   */
  isEditable() {
    const { user, producer } = this.props;

    return isRole(user, 'admin') && producer.can_edit;
  }

  /**
   * If producer has supplier means it's active and we
   * can remove supplier. If not we can create
   */
  renderToggleSupplierButton() {
    if (!this.isEditable()) return null;

    const { supplier } = this.props;
    const text = supplier ? 'desactivar' : 'activar';
    const action = supplier ? this.desactivate : this.activate;

    return (
      <span>
        <span> - </span>
        <Button
          linkLookAndFeel
          onClick={action}
        >
          {text}
        </Button>
      </span>
    );
  }

  render() {
    const { producer, group } = this.props;

    return (
      <div>
        <Link to={`/groups/${group.id}/producers/${producer.id}`}>
          {producer.name}
        </Link>

        {this.renderToggleSupplierButton()}
      </div>
    );
  }
}

const mapStateToProps = (_state, { group, producer }) => {
  return (state) => {
    const { suppliersReducer: { suppliers: { entities } } } = state;
    const supplier = _.findWhere(entities, {
      producer_id: producer.id,
      group_id: group.id,
    });

    return { supplier };
  };
};

export default connect(
  mapStateToProps,
  { createSupplier: create, destroySupplier: destroy }
)(Item);
