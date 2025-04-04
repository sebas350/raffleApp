import './styles/paid.css';

export function Paid(){
    const container = document.createElement('div');
    container.style.display = 'none';
    container.classList.add('div-pago');
    
    const btn = document.createElement('button');
    btn.textContent = 'X';
    btn.classList.add('btn-x');
    
    btn.onclick = () => {
        container.animate([{transform: 'scale(1)', opacity: 1 }, { transform: 'scale(0)', opacity: 0 }],    { duration: 300, fill: 'forwards' }).onfinish = () => {
        container.style.display = 'none';
        };
    };
     
    container.append(btn);
    
    return container;   
}
