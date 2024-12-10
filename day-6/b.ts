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

const directionMovement: Record<Direction, Position> = {
  up: { col: 0, row: -1 },
  down: { col: 0, row: 1 },
  left: { col: -1, row: 0 },
  right: { col: 1, row: 0 },
};

function moveForward(position: Position, direction: Direction): Position {
  const { col, row } = position;
  const movement = directionMovement[direction];

  return { col: col + movement.col, row: row + movement.row };
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

function getPostionDirectionHash(position: Position, direction: Direction) {
  return `${getPositionHash(position)}.${direction}`;
}

function checkIfSamePosition(position1: Position, position2: Position) {
  return position1.col === position2.col && position1.row === position2.row;
}

/** provide your solution as the return of this function */
export function checkIfHasLoop(data: string[], obstructionPosition: Position) {
  let direction: Direction = 'up';
  let currentPosition = getGuardPosition(data);
  const route = new Set();
  const rotatePosition = new Set();

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

    if (
      checkIfObstacle(data[nextPosition.row][nextPosition.col]) ||
      checkIfSamePosition(nextPosition, obstructionPosition)
    ) {
      direction = getNextDirection(direction);
      const positionHash = getPostionDirectionHash(nextPosition, direction);
      if (rotatePosition.has(positionHash)) {
        return true;
      }

      rotatePosition.add(positionHash);

      continue;
    }

    currentPosition = nextPosition;
    const positionHash = getPositionHash(currentPosition);
    if (!route.has(positionHash)) {
      route.add(positionHash);
    }
  }

  return false;
}

export async function day6b(data: string[]) {
  let count = 0;
  for (let i = 0; i < data.length; i += 1) {
    for (let j = 0; j < data[i].length; j += 1) {
      if (checkIfHasLoop(data, { row: i, col: j })) {
        count += 1;
      }
    }
  }

  return count;
}

await runSolution(day6b);
