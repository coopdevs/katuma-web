import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';

const BULK_INVITATIONS_FORM = {
  emails: {
    type: 'textarea',
    label: 'Emails',
    placeholder: 'Introduce una lista de emails separados por comas. Ej.: ana@gmail.com, hector@hotmail.com, ...'
  },
};

@reduxForm( {
  form: 'bulkInvitations',
  fields: Object.keys(BULK_INVITATIONS_FORM)
})
export default class BulkInvitationsForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool,
  }

  /**
   * Get css classes for field
   *
   * @param {Object} field
   */
  getInputClasses(field) {
    const classes = ['form-group'];

    if (field.error) {
      classes.push('has-error');
    }

    return classes.join(' ');
  }


  render() {
    const {submitting, fields, handleSubmit} = this.props;
    const field = fields.emails;
    const label = BULK_INVITATIONS_FORM[field.name].label;
    const placeholder = BULK_INVITATIONS_FORM[field.name].placeholder;

    return (
      <div>
        <form onSubmit={handleSubmit}>

          <div className={this.getInputClasses(field)}>
            <label htmlFor={field.name}>{label}</label>
            <div>
              <textarea
                id={field.name}
                ref={field.name}
                className="form-control"
                placeholder={placeholder}
                rows="5"
                {...field}/>

              {field.error && <div className="text-danger">{field.error}</div>}
            </div>
          </div>

          <div className="form-group">
            <button className="btn btn-success" onClick={handleSubmit}>
              {submitting ? 'Enviando...' : 'Enviar invitaciones'}
            </button>
          </div>
        </form>
      </div>
    );
  }
}
