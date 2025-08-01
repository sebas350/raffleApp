export interface Participant {
  id: number;
  number: string;
  fullname: string;
  dni: string;
  cel: string;
  mail: string;
}

export interface MercadoPagoInstance {
  bricks(): any;
}
export interface MainElement extends HTMLDivElement{

tableRender: () => Promise<void>;  

showNotification: (message: string, isSuccess: boolean) => void;
  
updateDisabledButtons: () => Promise<void>;

fetchParticipants: () => Promise<Participant[]>;
}

export interface PaidElement extends HTMLDivElement {
    updateNum: (num: number) => void;
    closeWindow: () => void;
}