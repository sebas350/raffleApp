import { Paid } from './paid';
import './styles/main.css';
import { Participant, MainElement} from './types';


export async function Main(): Promise<HTMLDivElement> {
const container = document.createElement('div') as MainElement;
const divTable: HTMLDivElement = document.createElement('div');
divTable.classList.add('div-table');
container.classList.add('container');

const h1: HTMLParagraphElement = document.createElement('h1');  
h1.textContent = 'Sorteo';  
container.append(h1);

const h2: HTMLParagraphElement = document.createElement('h1');  
h2.textContent = 'Participantes';  

// Contenedor de la grilla de botones  
const gridContainer: HTMLDivElement = document.createElement('div');  
gridContainer.classList.add('grid-container');   
const divPaid = Paid(container);  


async function fetchParticipants(): Promise<Participant[]> {
  try {
    const res = await fetch('http://localhost:3000/participants');
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error('Error al obtener participantes:', error);
    return [];
  }
}


container.tableRender = async (): Promise<void> => {
  divTable.innerHTML = '';
  divTable.append(h2);
  divTable.classList.add('loading');

  try {
  const participants = await fetchParticipants();
  const table: HTMLTableElement = document.createElement('table');
  table.classList.add('table');

  const thead: HTMLTableSectionElement = document.createElement('thead');
  const tbody: HTMLTableSectionElement = document.createElement('tbody');

  if (participants.length === 0) {
    divTable.textContent = 'No hay participantes';
    return;
  }

  // Orden específico de columnas
  const headers = ['orden', 'number', 'fullname', 'dni'];
  const headerLabels: Record<string, string> = {
    orden: 'Orden',
    number: 'Número',
    fullname: 'Nombre Completo',
    dni: 'DNI',
  };

  const headerRow = document.createElement('tr');
  headers.forEach(key => {
    const th = document.createElement('th');
    th.textContent = headerLabels[key] ?? key;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);

  // Crear filas de datos
  participants.forEach((participant, index) => {
    const row = document.createElement('tr');

    headers.forEach(key => {
      const cell = document.createElement('td');

      if (key === 'orden') {
        cell.textContent = (index + 1).toString();
      } else if (key === 'dni') {
        const dni = participant.dni ?? '';
        const visible = dni.slice(-3);
        const masked = '*'.repeat(Math.max(0, dni.length - 3)) + visible;
        cell.textContent = masked;
      } else {
        cell.textContent = participant[key as keyof Participant]?.toString() ?? '';
      }

      row.appendChild(cell);
    });

    tbody.appendChild(row);
  });

  table.appendChild(thead);
  table.appendChild(tbody);
  divTable.appendChild(table);
} catch {
  divTable.textContent = 'Error al cargar participantes';
}finally {
  divTable.classList.remove('loading');
}
};

await container.tableRender();


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


container.updateDisabledButtons = async () => {
  const participants = await fetchParticipants();
  const occupied = new Set(participants.map((p: Participant) => Number(p.number)));

  const buttons = gridContainer.querySelectorAll('button');
  buttons.forEach(btn => {
    const n = parseInt(btn.textContent || '', 10);
    btn.disabled = occupied.has(n);
  });
};


await container.updateDisabledButtons();

const notificationDiv: HTMLDivElement = document.createElement('div');

notificationDiv.classList.add('notification');
notificationDiv.style.display = 'none';

container.showNotification = (message: string, isSuccess: boolean) => {
notificationDiv.textContent = message;
notificationDiv.className = 'notification'; // limpia clases anteriores
notificationDiv.classList.add(isSuccess ? 'success' : 'error');
notificationDiv.style.display = 'block';

// Inicia fuera de la pantalla
notificationDiv.style.transform = 'translateY(100%)';
notificationDiv.style.opacity = '0';

// Forzar reflow para que la animación se active correctamente
void notificationDiv.offsetWidth;

notificationDiv.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
notificationDiv.style.transform = 'translateY(0)';
notificationDiv.style.opacity = '1';

setTimeout(() => {
notificationDiv.style.transform = 'translateY(-100%)';
notificationDiv.style.opacity = '0';

setTimeout(() => {  
  notificationDiv.style.display = 'none';  
}, 500);

}, 2500); // visible por 2.5 segundos
};

container.append(gridContainer, divPaid, divTable, notificationDiv);  
return container;

}