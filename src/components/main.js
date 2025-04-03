import './styles/main.css';

export function Main() {
    const container = document.createElement('div');
    container.classList.add('container');   

    const h1 = document.createElement('h1');
    h1.textContent = 'Sorteo';
    container.append(h1);

    // Contenedor de la grilla de botones
    const gridContainer = document.createElement('div');
    gridContainer.style.display = 'grid';
    gridContainer.style.gridTemplateColumns = 'repeat(10, 30px)';
    gridContainer.style.gap = '5px';
    gridContainer.style.margin = '20px 0';

    const divPago = document.createElement('div');
    divPago.style.border = '1px solid blue';
    divPago.style.width = '500px';
    divPago.style.height = '500px';
    divPago.style.margin = 'auto';
    divPago.className = 'pago';
    divPago.style.display = 'none';
    divPago.style.position = 'absolute';
    divPago.style.background = 'white';
    divPago.style.borderRadius = '5px';
    
    
    const btnX = document.createElement('button');
    btnX.style.position = 'absolute';
    btnX.style.top = '10px';
    btnX.style.right = '10px';
    btnX.textContent = 'X';
    
    btnX.onclick = () => {
        divPago.animate([{transform: 'scale(1)', opacity: 1 }, { transform: 'scale(0)', opacity: 0 }],    { duration: 300, fill: 'forwards' }).onfinish = () => {
        divPago.style.display = 'none';
        };
    };
     
    
    divPago.append(btnX);

    for (let i = 1; i <= 100; i++) {
        const btn = document.createElement('button');
        btn.style.width = '30px';
        btn.style.height = '30px';
        btn.style.display = 'flex';
        btn.style.justifyContent = 'center';
        btn.style.alignItems = 'center';
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
