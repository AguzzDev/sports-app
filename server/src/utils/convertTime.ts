export function convertTime(timeString) {
  const [hours, minutes] = timeString.split(":").map(Number);

  const hoursInMilliseconds = hours * 60 * 60 * 1000;
  const minutesInMilliseconds = minutes * 60 * 1000;

  return hoursInMilliseconds + minutesInMilliseconds;
}
