import { runSolution } from '../utils.ts';

function getInputType(data: string): 'order' | 'update' | 'none' {
  if (data.includes('|')) {
    return 'order';
  }

  if (data.includes(',')) {
    return 'update';
  }

  return 'none';
}

function getOrdersAndUpdates(data: string[]) {
  const orders: string[] = [];
  const updates: string[] = [];

  data.forEach((v) => {
    const type = getInputType(v);
    if (type === 'order') {
      orders.push(v);
    }

    if (type === 'update') {
      updates.push(v);
    }
  });

  return { orders, updates };
}

type Order = [number, number];
type Update = number[];

function createOrder(input: string) {
  return input.split('|').map(Number) as Order;
}

function createUpdate(input: string) {
  return input.split(',').map(Number) as Update;
}

function checkIfValidUpdate(update: Update, orders: Order[]) {
  for (const order of orders) {
    const relevantUpdateParts = update.filter((u) => order.includes(u));
    const isSameSize = relevantUpdateParts.length === order.length;
    if (!isSameSize) {
      continue;
    }

    const isSameOrder =
      relevantUpdateParts[0] === order[0] &&
      relevantUpdateParts[1] === order[1];
    if (!isSameOrder) {
      return false;
    }
  }

  return true;
}

/** provide your solution as the return of this function */
export async function day5a(data: string[]) {
  const { orders, updates } = getOrdersAndUpdates(data);

  const createdOrders = orders.map(createOrder);
  const createdUpdates = updates.map(createUpdate);

  const validUpdates = createdUpdates.filter((cu) => {
    return checkIfValidUpdate(cu, createdOrders);
  });

  return validUpdates.reduce((prev, cur) => {
    return prev + cur[Math.floor(cur.length / 2)];
  }, 0);
}

await runSolution(day5a);
