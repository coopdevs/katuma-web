import { RRule } from 'rrule-alt';

export default function weeklyIcalString(index) {
  const days = [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR, RRule.SA, RRule.SU];
  const rule = new RRule.RRule({
    freq: RRule.WEEKLY,
    byweekday: days[index]
  });

  return `RRULE:${rule.toString()}`;
}
