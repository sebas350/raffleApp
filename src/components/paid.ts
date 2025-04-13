import './styles/paid.css';
import {CardForm} from './cardForm'
import {CreateBtn} from './utils'

// Extendemos HTMLDivElement para incluir la función personalizada
interface PaidElement extends HTMLDivElement {
    updateNum: (num: number) => void;
}

export function Paid(): PaidElement {
    const container = document.createElement('div') as PaidElement;
    container.style.display = 'none';
    container.classList.add('div-pago');
    
    
    const title: HTMLHeadingElement = document.createElement('h1');
    title.textContent = `Numero:`;
    
  
    
//options payment function 
const funOptions = (key: string) => {
    options[key]();
};    
    
    
    //select
    const divSelect: HTMLDivElement = document.createElement('div');
    const select: HTMLSelectElement = document.createElement('select');
    select.id = 'method-select';
    const labelSelect: HTMLLabelElement = document.createElement('label');
    labelSelect.textContent = 'Selecciona el metodo de pago:';
    labelSelect.htmlFor = 'method-select';
    
    select.onchange = (e) => {
        const target = e.target as HTMLSelectElement;
        funOptions(target.value);
    }
    
    //options
    const divOptions: HTMLDivElement = document.createElement('div');
    
    interface PaymentOptions {
      [key: string]: () => void;
    }
    
    const options: PaymentOptions = {
    card: () => {
        divOptions.innerHTML = '';
        divOptions.append(divCard);
    },
    transfer: () => divOptions.textContent = 'hola transfer',
    cripto: () => divOptions.textContent = 'hola cripto',
    cash: () => divOptions.textContent = 'hola efectivo'
};
    
   interface Option {
        label: string;
        value: string;
    }
    
    const menuOptions: Option[] = [{label:'Tarjeta Crédito/débito', value: 'card'}, {label:'Transferencia', value: 'transfer'}, {label:'Cripto', value: 'cripto'}, {label:'Efectivo', value: 'cash'}];
    
    
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
    
    
    
//cardForm
const divCard = CardForm();    


//funOptions(select.value);


divSelect.append(labelSelect, select);
    
    
    
    const btnClose = CreateBtn(container);
    
    
     
    container.append(title, divSelect, divOptions, btnClose);
    
    container.updateNum = (num: number) => {
        title.textContent = `Numero: ${num}`;
    };
    
    return container;   
}
