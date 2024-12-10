import { runSolution } from '../utils.ts';

type Position = {
  row: number;
  col: number;
};

type Direction = 'up' | 'right' | 'down' | 'left';

const INITIAL_GUARD_STATE = '^';

function getGuardPosition(data: string[]): Position {
  const row = data.findIndex((d) => d.includes(INITIAL_GUARD_STATE));
  const col = data[row].indexOf(INITIAL_GUARD_STATE);

  return { row, col };
}

function checkIfObstacle(value: string) {
  return value === '#';
}

function moveForward(position: Position, direction: Direction): Position {
  let { col, row } = position;

  if (direction === 'up') {
    row -= 1;
  } else if (direction === 'right') {
    col += 1;
  } else if (direction === 'down') {
    row += 1;
  } else if (direction === 'left') {
    col -= 1;
  }

  return { col, row };
}

function getNextDirection(direction: Direction): Direction {
  switch (direction) {
    case 'up':
      return 'right';
    case 'right':
      return 'down';
    case 'down':
      return 'left';
    case 'left':
      return 'up';
  }
}

function checkIfPossiblePosition(data: string[], position: Position) {
  return (
    position.row >= 0 &&
    position.row < data.length &&
    position.col >= 0 &&
    position.col < data[position.row].length
  );
}

function getPositionHash(position: Position) {
  return `${position.row}.${position.col}`;
}

/** provide your solution as the return of this function */
export async function day6a(data: string[]) {
  let direction: Direction = 'up';
  let currentPosition = getGuardPosition(data);
  const route = new Set();

  while (checkIfPossiblePosition(data, currentPosition)) {
    const nextPosition = moveForward(currentPosition, direction);
    const isPossibleNextPosition = checkIfPossiblePosition(data, nextPosition);
    if (!isPossibleNextPosition) {
      currentPosition = nextPosition;
      const positionHash = getPositionHash(currentPosition);
      if (!route.has(positionHash)) {
        route.add(positionHash);
      }

      continue;
    }

    if (checkIfObstacle(data[nextPosition.row][nextPosition.col])) {
      direction = getNextDirection(direction);

      continue;
    }

    currentPosition = nextPosition;
    const positionHash = getPositionHash(currentPosition);
    if (!route.has(positionHash)) {
      route.add(positionHash);
    }
  }

  return route.size;
}

await runSolution(day6a);
