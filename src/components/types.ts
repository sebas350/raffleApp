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
    closeWindow: () => void;
}

export type NumberGridElement = {
  disabledButtons: () => Promise<void>;
};

export interface ParticipantElement extends HTMLDivElement {
  getParticipantData: () => Record<string, string>;
}
