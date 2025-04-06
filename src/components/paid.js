import './styles/paid.css';

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
            divOptions.append(tarjetForm);
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
    
    
//element method paid
    //credit/debit
    const tarjetForm = document.createElement('form');

const inputName = document.createElement('input');
inputName.type = 'text';
inputName.placeholder = 'Nombre tal como sale en la tarjeta';

const inputNum = document.createElement('input');
inputNum.type = 'text';
inputNum.placeholder = 'Número de tarjeta';

const inputMonth = document.createElement('input');
inputMonth.type = 'text';
inputMonth.placeholder = 'Mes (MM)';

const inputYear = document.createElement('input');
inputYear.type = 'text';
inputYear.placeholder = 'Año (YY)';

const inputCode = document.createElement('input');
inputCode.type = 'password';
inputCode.placeholder = 'Código de seguridad';

const inputDni = document.createElement('input');
inputDni.type = 'number';
inputDni.placeholder = 'DNI';

const inputMail = document.createElement('input');
inputMail.type = 'email';
inputMail.placeholder = 'Correo electrónico';

tarjetForm.append(inputName,inputNum,inputMonth,inputYear,inputCode,inputDni,inputMail);


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
