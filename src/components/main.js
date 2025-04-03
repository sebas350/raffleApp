import './styles/main.css';

export function Main() {
    const container = document.createElement('div');
    container.classList.add('container');   

    const h1 = document.createElement('h1');
    h1.textContent = 'Sorteo';
    container.append(h1);

    // Contenedor de la grilla de botones
    const gridContainer = document.createElement('div');
    gridContainer.classList.add('grid-container');

    const divPago = document.createElement('div');
    divPago.style.display = 'none';
    divPago.classList.add('div-pago');
    
    
    
    const btnX = document.createElement('button');
    btnX.textContent = 'X';
    btnX.classList.add('btn-x');
    
    btnX.onclick = () => {
        divPago.animate([{transform: 'scale(1)', opacity: 1 }, { transform: 'scale(0)', opacity: 0 }],    { duration: 300, fill: 'forwards' }).onfinish = () => {
        divPago.style.display = 'none';
        };
    };
     
    
    divPago.append(btnX);

    for (let i = 1; i <= 100; i++) {
        const btn = document.createElement('button');
        btn.classList.add('btn');
        btn.textContent = i;

        btn.onclick = () => {
            window.scrollTo(0,0);
            divPago.style.display = divPago.style.display === 'none' ? 'block' : 'none';
            divPago.animate([{transform: 'scale(0)', opacity: 0 }, { transform: 'scale(1)', opacity: 1 }],    { duration: 300, fill: 'forwards' });
        };

        gridContainer.appendChild(btn);
    }

    container.append(gridContainer, divPago);
    return container;
}
