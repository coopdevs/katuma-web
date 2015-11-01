import React, {Component, PropTypes} from 'react';

export default class OnboardingMembers extends Component {
  static propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func
  }

  render() {
    return (
      <div className="container">
        <h1>Onboarding members</h1>
      </div>
    );
  }
}

