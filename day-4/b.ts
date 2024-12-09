import { runSolution } from '../utils.ts';

const xmas = 'MAS';

type Position = {
  row: number;
  col: number;
};

function isXmas(word: string) {
  return word === xmas;
}

function toReversed(word: string) {
  return word.split('').toReversed().join('');
}

function getDiagonalRight(data: string[], position: Position) {
  return Array.from({ length: xmas.length }).reduce<string>((prev, _, i) => {
    const row = data[position.row + i];
    if (!row) {
      return prev;
    }

    const col = row[position.col + i];
    if (!col) {
      return prev;
    }

    return prev + col;
  }, '');
}

function getDiagonalLeft(data: string[], position: Position) {
  return Array.from({ length: xmas.length }).reduce<string>((prev, _, i) => {
    const row = data[position.row + i];
    if (!row) {
      return prev;
    }

    const col = row[position.col - i];
    if (!col) {
      return prev;
    }

    return prev + col;
  }, '');
}

function getXmaxCountInWindow(data: string[], position: Position) {
  const diagonalRight = getDiagonalRight(data, position);
  const diagonalLeft = getDiagonalLeft(data, {
    col: position.col + 2,
    row: position.row,
  });

  const isDiagonalRightXmas =
    isXmas(diagonalRight) || isXmas(toReversed(diagonalRight));
  const isDiagonalLeftXmas =
    isXmas(diagonalLeft) || isXmas(toReversed(diagonalLeft));

  return isDiagonalLeftXmas && isDiagonalRightXmas ? 1 : 0;
}

/** provide your solution as the return of this function */
export async function day4b(data: string[]) {
  let count = 0;
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      count += getXmaxCountInWindow(data, { col: j, row: i });
    }
  }

  return count;
}

await runSolution(day4b);
