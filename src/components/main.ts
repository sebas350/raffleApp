import { Paid } from './paid';
import './styles/main.css';
import { Participant, MainElement} from './types';
import { RaffleTable } from './raffleTable';
import { NumberGrid } from './numberGrid';
import { fetchParticipants } from './utils';
import type { NumberGridElement } from './types';
import { Notifications } from './notifications';

export async function Main(): Promise<HTMLDivElement> {

const container = document.createElement('div') as MainElement;

const divTable: HTMLDivElement = document.createElement('div');
divTable.classList.add('div-table');

container.classList.add('container');

const h1: HTMLParagraphElement = document.createElement('h1');  
h1.textContent = 'Sorteo';  
container.append(h1);  

// Contenedor de la grilla de botones  
const gridContainer: HTMLDivElement = document.createElement('div');  
gridContainer.classList.add('grid-container');   

const divPaid = Paid(container);  

container.tableRender = async () => {
  await RaffleTable(divTable);
};

await container.tableRender();


const grid: NumberGridElement = NumberGrid(gridContainer, divPaid);


container.updateDisabledButtons = async () => {
  await grid.disabledButtons();
};


await container.updateDisabledButtons();

const notificationDiv: HTMLDivElement = document.createElement('div');

notificationDiv.classList.add('notification');
notificationDiv.style.display = 'none';

container.showNotification = ( message, isSuccess) => {
Notifications( notificationDiv, message, isSuccess);
};

container.append(gridContainer, divPaid, divTable, notificationDiv);  
return container;

}
