export function getTimeUntilMidnight(time = new Date().getTime()) {
  const nextMidnight = new Date();
  nextMidnight.setHours(24, 0, 0, 0);

  return nextMidnight.getTime() - time;
}
