// analyticsHelpers.ts
export function countOccurrences(arr: string[]): { [key: string]: number } {
  return arr.reduce((counts: { [key: string]: number }, val: string) => {
    counts[val] = (counts[val] || 0) + 1;
    return counts;
  }, {});
}

export function calculateAverage(arr: number[]): number {
  const sum = arr.reduce((total, val) => total + val, 0);
  return arr.length > 0 ? sum / arr.length : 0;
}
