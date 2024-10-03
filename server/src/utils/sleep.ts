export async function sleep(time) {
  return await new Promise((resolve) => setTimeout(resolve, time));
}
