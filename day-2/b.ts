import { runSolution } from '../utils.ts';

const MIN_DEVIATION = 1;
const MAX_DEVIATION = 3;

function checkIfSafeReport(report: number[]) {
  let reportDir: 'increasing' | 'decreasing';

  for (let i = 0; i < report.length - 1; i++) {
    const diff = report[i] - report[i + 1];

    const currentDir = diff < 0 ? 'increasing' : 'decreasing';
    if (reportDir === undefined) {
      reportDir = currentDir;
    }

    if (reportDir !== currentDir) {
      return false;
    }

    const absDiff = Math.abs(diff);

    if (absDiff < MIN_DEVIATION || absDiff > MAX_DEVIATION) {
      return false;
    }
  }

  return true;
}

/** provide your solution as the return of this function */
export async function day2b(data: string[]) {
  const lines = data.map((v) => v.split(' ').map(Number));

  return lines.filter((line) => {
    for (let i = 0; i < line.length; i++) {
      if (checkIfSafeReport(line.toSpliced(i, 1))) {
        return true;
      }
    }

    return false;
  }).length;
}

await runSolution(day2b);
