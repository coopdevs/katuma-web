/**
 * Stupid HOC Hight Order Component to add a class variable.
 *
 * This is needed when your component is composed with other components
 * like redux connect.
 *
 * Remember `compose` is from right to left. You need to put this
 * component first
 *
 * Ex.:
 *  export default compose(
 *   layoutCentered,
 *   reduxForm(reduxFormProps),
 *   connect(mapStateToProps, { completeSignup: complete, push: routeActions.push })
 *  )(SignupComplete);
 *
 */
export default function layoutCentered(WrappedComponent) {
  WrappedComponent.prototype.constructor.layoutCentered = true;
  return WrappedComponent;
}
