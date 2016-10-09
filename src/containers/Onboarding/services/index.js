/**
 * When you pass a step number this function returns
 * the URL of next onboarding screen
 *
 * @param {String} step
 * @param {Number} groupId
 * @param {Number} producerId
 * @return {String}
 */
export function getNextOnboardingUrl(step, groupId, producerId) {
  const baseURL = `/onboarding/${groupId}`;
  const onboardingProducerURL = `${baseURL}/producer`;

  switch (step) {
    case 'send_invitations':
      return `${baseURL}/invitations`;
    case 'create_producer':
      return onboardingProducerURL;
    case 'create_products':
      return `${onboardingProducerURL}/${producerId}/products`;
    case 'finish':
      return `/groups/${groupId}`;
    default:
      return '/onboarding';
  }
}
