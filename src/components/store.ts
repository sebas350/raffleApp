let currentNumber: number | null = null;

const subscribers: ((num: number | null) => void)[] = [];

export function setNumber(num: number): void {
  currentNumber = num;
  subscribers.forEach(cb => cb(currentNumber));
}

export function getNumber(): number | null {
  return currentNumber;
}

export function subscribeNumber(callback: (num: number | null) => void): void {
  subscribers.push(callback);
}


//store controller Brick

let cardPaymentController: any | null = null;

export function setCardPaymentController(controller: any) {
  cardPaymentController = controller;
}

export function getCardPaymentController() {
  return cardPaymentController;
}
