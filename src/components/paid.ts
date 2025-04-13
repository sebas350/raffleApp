import './styles/paid.css';
import {CardForm} from './cardForm.js'
import {CreateBtn} from './utils.js'

export function Paid(){
    const container = document.createElement('div');
    container.style.display = 'none';
    container.classList.add('div-pago');
    const divSelect = document.createElement('div');
    const pSelect = document.createElement('p');
    pSelect.textContent = 'Selecciona el metodo de pago:';
    const title = document.createElement('h1');
    title.textContent = `Numero:`;
    
const divOptions = document.createElement('div');  
    
//options payment
const funOptions = (key) => {
    options[key]();
};    
    
    
    //select
    const select = document.createElement('select');
    select.onchange = (e) => {
        funOptions(e.target.value);
    }
    
    //options
    const options = {
    card: () => {
        divOptions.innerHTML = '';
        divOptions.append(divCard);
    },
    transfer: () => divOptions.textContent = 'hola transfer',
    cripto: () => divOptions.textContent = 'hola cripto',
    efective: () => divOptions.textContent = 'hola efectivo'
};
    
    const menuOptions = [{label:'Tarjeta Crédito/débito', value: 'card'}, {label:'Transferencia', value: 'transfer'}, {label:'Cripto', value: 'cripto'}, {label:'Efectivo', value: 'efective'}];
    
    for (const opt of menuOptions) {
        const option = document.createElement('option');
        option.textContent = opt.label;
        option.value = opt.value;
        select.append(option);
    }
    
    
//cardForm
const divCard = CardForm();    


funOptions(select.value);


divSelect.append(pSelect, select);
    
    
    
    const btnClose = CreateBtn(container);
    
    
     
    container.append(title, divSelect, divOptions, btnClose);
    
    container.updateNum = (num) => {
        title.textContent = `Numero: ${num}`;
    };
    
    return container;   
}
