let currentNumber: number | null = null;

const subscribers: ((num: number | null) => void)[] = [];

export async function setNumber(num: number): Promise<void> {
  currentNumber = num;
  subscribers.forEach(cb => cb(currentNumber));
}

export async function getNumber(): Promise<number | null> {
  return currentNumber;
}

export function subscribeNumber(callback: (num: number | null) => void): void {
  subscribers.push(callback);
}