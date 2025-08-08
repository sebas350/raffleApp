import type { PaidElement, Participant } from './types'
import { fetchParticipants } from './utils';
import type { NumberGridElement } from './types';

export function NumberGrid(gridContainer: HTMLDivElement, divPaid: PaidElement): NumberGridElement {
   
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

const disabledButtons = async () => {
    const participants = await fetchParticipants();
  const occupied = new Set(participants.map((p: Participant) => Number(p.number)));

  const buttons = gridContainer.querySelectorAll('button');
  buttons.forEach(btn => {
    const n = parseInt(btn.textContent || '', 10);
    btn.disabled = occupied.has(n);
  });
}
 return { disabledButtons };
}
