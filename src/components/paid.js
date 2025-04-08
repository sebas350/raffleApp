import './styles/paid.css';
import {CreateCardForm} from './createCardForm.js'

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
    
const funOptions = (value) => {
    if (value === 'Cripto'){
            divOptions.textContent = 'hola cripto';
            
        }else if(value == 'Tarjeta Crédito/débito'){
            divOptions.innerHTML = '';
            divOptions.append(cardForm);
        }else if(value == 'Efectivo'){
            divOptions.textContent = 'hola Efectivo';
        }
        else{
            divOptions.textContent = 'hola transferencia';
        }
}    
    
    
    //select
    const select = document.createElement('select');
    select.onchange = (e) => {
        funOptions(e.target.value);
    }
    
    //options
    const options = ['Tarjeta Crédito/débito', 'Transferencia', 'Cripto', 'Efectivo'];
    
    for (const text of options) {
        const option = document.createElement('option');
        option.textContent = `${text}`;
        select.append(option);
    }
    
    
//cardForm
const cardForm = CreateCardForm();    


funOptions(select.value);


divSelect.append(pSelect, select);
    
    
    container.append(title, divSelect, divOptions);
    
    
    const btn = document.createElement('button');
    btn.textContent = 'X';
    btn.classList.add('btn-x');
    
    btn.onclick = () => {
        container.animate([{transform: 'scale(1)', opacity: 1 }, { transform: 'scale(0)', opacity: 0 }],    { duration: 300, fill: 'forwards' }).onfinish = () => {
        container.style.display = 'none';
        };
    };
     
    container.append(btn);
    
    container.updateNum = (num) => {
        title.textContent = `Numero: ${num}`;
    };
    
    return container;   
}
