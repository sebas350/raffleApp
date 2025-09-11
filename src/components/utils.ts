import './styles/utils.css';
import { Participant } from './types'

export const createInput = (type: string, placeholder: string, name: string = ''): HTMLInputElement => {
  const input = document.createElement('input');
  input.type = type;
  input.placeholder = placeholder;
  input.name = name;
  return input;
};

export function CreateBtn(container: HTMLDivElement): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.textContent = 'X';
  btn.classList.add('btn-x');

  btn.onclick = () => {
    container.animate(
      [{ transform: 'scale(1)', opacity: 1 }, { transform: 'scale(0)', opacity: 0 }],
      { duration: 300, fill: 'forwards' }
    ).onfinish = () => {
      container.style.display = 'none';
    };
  };

  return btn;
}


export async function fetchParticipants(): Promise<Participant[]> {
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
