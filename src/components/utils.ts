import './styles/utils.css';

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
        container.animate([{transform: 'scale(1)', opacity: 1 }, { transform: 'scale(0)', opacity: 0 }],    { duration: 300, fill: 'forwards' }).onfinish = () => {
        container.style.display = 'none';
        };
    };
    return btn;
}

