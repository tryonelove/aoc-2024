import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day1b(data: string[]) {
  const first: number[] = [];
  const second: number[] = [];
  const firstValueCountMap = new Map<number, number>();
  const secondValueCountMap = new Map<number, number>();

  data.forEach((v) => {
    const [v1, v2] = v.split('  ').map(Number);
    first.push(v1);
    second.push(v2);

    firstValueCountMap.set(v1, (firstValueCountMap.get(v1) ?? 0) + 1);
    secondValueCountMap.set(v2, (secondValueCountMap.get(v2) ?? 0) + 1);
  });

  return first.reduce((prev, cur) => {
    return prev + cur * (secondValueCountMap.get(cur) ?? 0);
  }, 0);
}

await runSolution(day1b);
