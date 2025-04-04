import { Paid } from './paid.js';
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
    const divPaid = Paid();
    
    for (let i = 1; i <= 100; i++) {
        const btn = document.createElement('button');
        btn.classList.add('btn');
        btn.textContent = i;

        btn.onclick = () => {
            window.scrollTo(0,0);
            divPaid.style.display = divPaid.style.display === 'none' ? 'block' : 'none';
            divPaid.animate([{transform: 'scale(0)', opacity: 0 }, { transform: 'scale(1)', opacity: 1 }],    { duration: 300, fill: 'forwards' });
        };

        gridContainer.appendChild(btn);
    }

    container.append(gridContainer, divPaid);
    return container;
}
