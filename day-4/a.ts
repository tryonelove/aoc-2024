import { runSolution } from '../utils.ts';

const xmas = 'XMAS';
// By default, let's consider the grid direction is left to right - 0 degrees

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

function getHorizontal(data: string[], position: Position) {
  return data[position.row].substring(position.col, position.col + xmas.length);
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

function getDownwards(data: string[], position: Position) {
  return Array.from({ length: xmas.length }).reduce<string>((prev, _, i) => {
    const row = data[position.row + i];
    if (!row) {
      return prev;
    }

    const col = row[position.col];
    if (!col) {
      return prev;
    }

    return prev + col;
  }, '');
}

function getXmaxCountInWindow(data: string[], position: Position) {
  const words = [
    getHorizontal(data, position),
    getDiagonalRight(data, position),
    getDiagonalLeft(data, position),
    getDownwards(data, position),
  ];

  const reversedWords = words.map(toReversed);

  return words.filter(isXmas).length + reversedWords.filter(isXmas).length;
}

/** provide your solution as the return of this function */
export async function day4a(data: string[]) {
  let count = 0;
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      count += getXmaxCountInWindow(data, { col: j, row: i });
    }
  }

  return count;
}

await runSolution(day4a);
