import { runSolution } from '../utils.ts';

const IMPORTANT_PARTS = /mul\(\d+,\d+\)|do\(\)|don't\(\)/g;
const MUL_PATTERN = /mul\((\d+),(\d+)\)/;

const flags = {
  do: 'do()',
  dont: "don't()",
} as const;

function parseMul(line: string) {
  const match = line.match(MUL_PATTERN);
  if (match) {
    const [, a, b] = match;
    return Number(a) * Number(b);
  }
  return 0;
}

function getMulSum(line: string) {
  const matchResults = [...line.matchAll(IMPORTANT_PARTS)];
  let enabled = true;
  let sum = 0;

  for (const match of matchResults) {
    const instruction = match[0];

    if (instruction === flags.do) {
      enabled = true;
    } else if (instruction === flags.dont) {
      enabled = false;
    } else if (enabled) {
      sum += parseMul(instruction);
    }
  }

  return sum;
}

/** provide your solution as the return of this function */
export async function day3b(data: string[]) {
  return getMulSum(data.join(''));
}

await runSolution(day3b);
