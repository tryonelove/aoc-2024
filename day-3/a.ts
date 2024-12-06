import { runSolution } from '../utils.ts';

const MUL_PATTERN = /mul\((\w+),(\w+)\)/g;

function parseMul(line: string) {
  const parts = [...line.matchAll(MUL_PATTERN)];

  return parts.reduce((prev, cur) => {
    const [, a, b] = cur;

    return prev + Number(a) * Number(b);
  }, 0);
}

/** provide your solution as the return of this function */
export async function day3a(data: string[]) {
  return data.reduce((prev, cur) => {
    return prev + parseMul(cur);
  }, 0);
}

await runSolution(day3a);
