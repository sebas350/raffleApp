import './styles/paid.css';
import {CardForm} from './cardForm'
import {CreateBtn } from './utils'
import type { MainElement, PaidElement, ParticipantElement } from './types'

import { subscribeNumber } from './store';
import { getCardPaymentController } from './store';
import { ParticipantData } from './participantData';


export function Paid(mainElement: MainElement): PaidElement {
  const container = document.createElement('div') as PaidElement;
  container.style.display = 'none';
  container.classList.add('div-pago');

  const title: HTMLHeadingElement = document.createElement('h1');
  title.textContent = `Numero:`;


  const funOptions = (key: string) => {
    options[key]();
  };

  const divSelect: HTMLDivElement = document.createElement('div');
  const select: HTMLSelectElement = document.createElement('select');
  select.id = 'method-select';
  const labelSelect: HTMLLabelElement = document.createElement('label');
  labelSelect.textContent = 'Selecciona el metodo de pago:';
  labelSelect.htmlFor = 'method-select';

  select.onchange = (e) => {
    const target = e.target as HTMLSelectElement;
    funOptions(target.value);
  };

  const divOptions: HTMLDivElement = document.createElement('div');

const divCard = document.createElement('div');
divCard.id = 'cardPaymentBrick_container';

const divTransfer = document.createElement('div');

const divCripto = document.createElement('div');

const divCash = document.createElement('div');

divOptions.append(divCard, divTransfer, divCripto, divCash); 
  
  

  interface PaymentOptions {
    [key: string]: () => void;
  }
  
const divStatus: ParticipantElement = ParticipantData();
  
  
  const options: PaymentOptions = {
  card: async () => {
  divCard.style.display = 'block';
    divTransfer.style.display = 'none';
    divCripto.style.display = 'none';
    divCash.style.display = 'none';
    
    if (!getCardPaymentController()) {
      await CardForm('cardPaymentBrick_container', divStatus, mainElement, container);
    
    divCard.append(divStatus);  
    }
    
    

  },
  transfer: () => {
    divCard.style.display = 'none';
    divTransfer.style.display = 'block';
    divCripto.style.display = 'none';
    divCash.style.display = 'none';
    divTransfer.textContent = 'hola transfer';
  },
  cripto: () => {
    divCard.style.display = 'none';
    divTransfer.style.display = 'none';
    divCripto.style.display = 'block';
    divCash.style.display = 'none';
    divCripto.textContent = 'hola cripto';
  },
  cash: () => {
    divCard.style.display = 'none';
    divTransfer.style.display = 'none';
    divCripto.style.display = 'none';
    divCash.style.display = 'block';
    divCash.textContent = 'hola efectivo';
  }
}; 

  const menuOptions: { label: string; value: string }[] = [
    { label: 'Tarjeta Crédito/débito', value: 'card' },
    { label: 'Transferencia', value: 'transfer' },
    { label: 'Cripto', value: 'cripto' },
    { label: 'Efectivo', value: 'cash' },
  ];

  const placeholder: HTMLOptionElement = document.createElement('option');
  placeholder.textContent = 'Selecciona un método';
  placeholder.disabled = true;
  placeholder.selected = true;
  select.append(placeholder);

  for (const opt of menuOptions) {
    const option: HTMLOptionElement = document.createElement('option');
    option.textContent = opt.label;
    option.value = opt.value;
    select.append(option);
  }

  divSelect.append(labelSelect, select);

  const btnClose = CreateBtn(container);

  container.closeWindow = async () => {
  
  container.animate(
      [{ transform: 'scale(1)', opacity: 1 }, { transform: 'scale(0)', opacity: 0 }],
      { duration: 300, fill: 'forwards' }
    ).onfinish = () => {
      container.style.display = 'none';
    };
  };

  container.append(title, divSelect, divOptions, btnClose);

  subscribeNumber((num) => {
    title.textContent = `Numero: ${num}`;
  });

  return container;
}
