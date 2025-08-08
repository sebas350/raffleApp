import { fetchParticipants } from './utils';
import { Participant} from './types';

export async function RaffleTable (divTable: HTMLDivElement): Promise<void> {

const h2: HTMLParagraphElement = document.createElement('h1');  
h2.textContent = 'Participantes';

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
