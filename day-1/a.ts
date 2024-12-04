import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day1a(data: string[]) {
  const first: number[] = [];
  const second: number[] = [];

  data.forEach((v) => {
    const [v1, v2] = v.split('  ');
    first.push(Number(v1));
    second.push(Number(v2));
  });

  first.sort((a, b) => a - b);
  second.sort((a, b) => a - b);

  const result = first.reduce((prev, _, idx) => {
    const diff = Math.abs(first[idx] - second[idx]);

    return prev + diff;
  }, 0);

  return result;
}

await runSolution(day1a);
