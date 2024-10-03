export function extractColumn(arr: any[], key: string): any[] {
  return arr.map((item) => item[key]);
}
