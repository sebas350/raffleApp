import { Paid } from './paid';
import './styles/main.css';

export function Main(): HTMLDivElement {
    const container = document.createElement('div');
    container.classList.add('container');   

    const h1: HTMLParagraphElement = document.createElement('h1');
    h1.textContent = 'Sorteo';
    container.append(h1);

    // Contenedor de la grilla de botones
    const gridContainer: HTMLDivElement = document.createElement('div');
    gridContainer.classList.add('grid-container'); 
    const divPaid = Paid();
    
    for (let i = 1; i <= 100; i++) {
        const btn: HTMLButtonElement = document.createElement('button');
        btn.classList.add('btn');
        btn.textContent = i.toString(); 
        
        btn.onclick = () => {
            divPaid.updateNum(i);
            window.scrollTo(0,0);
            divPaid.style.display = divPaid.style.display === 'none' ? 'block' : 'none';
            divPaid.animate([{transform: 'scale(0)', opacity: 0 }, { transform: 'scale(1)', opacity: 1 }],    { duration: 300, fill: 'forwards' });
        };

        gridContainer.appendChild(btn);
    }

    container.append(gridContainer, divPaid);
    return container;
}
