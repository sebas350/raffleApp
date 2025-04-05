import './styles/paid.css';

export function Paid(){
    const container = document.createElement('div');
    container.style.display = 'none';
    container.classList.add('div-pago');
    
    
    
    //fieldset
    const fieldset = document.createElement('fieldset');
const legend = document.createElement('legend');
legend.textContent = 'Método de pago';
const divOptions = document.createElement('div');  
    
const funOptions = (value) => {
    if (value === 'Cripto'){
            divOptions.textContent = 'hola cripto';
            
        }else if(value == 'Tarjeta Crédito/débito'){
            divOptions.textContent = 'hola tarjeta';
        }else{
            divOptions.textContent = 'hola transferencia';
        }
}    
    
    
    //select
    const select = document.createElement('select');
    select.onchange = (e) => {
        funOptions(e.target.value);
    }
    
    //options
    const options = ['Tarjeta Crédito/débito', 'Transferencia', 'Cripto'];
    
    for (const text of options) {
        const option = document.createElement('option');
        option.textContent = `${text}`;
        select.append(option);
    }
    
    
funOptions(select.value);


fieldset.append(legend, select, divOptions);
    
    
    container.append(fieldset);
        
    
    
    
    
    
    const btn = document.createElement('button');
    btn.textContent = 'X';
    btn.classList.add('btn-x');
    
    btn.onclick = () => {
        container.animate([{transform: 'scale(1)', opacity: 1 }, { transform: 'scale(0)', opacity: 0 }],    { duration: 300, fill: 'forwards' }).onfinish = () => {
        container.style.display = 'none';
        //divOptions.textContent = '';
        //select.value = ''
        };
    };
     
    container.append(btn);
    
    return container;   
}
