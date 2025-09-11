import { createInput } from './utils';
import { ParticipantElement } from './types';
import { getNumber } from './store';

export function ParticipantData(): ParticipantElement {
  const divForm = document.createElement('div') as ParticipantElement;
  const alertBox = document.createElement('div');
  alertBox.className = 'alert';

  const inputs: HTMLInputElement[] = [
    createInput('text', 'Nombre Completo', 'fullname'),
    createInput('text', 'DNI', 'dni'),
    createInput('text', 'Celular', 'cel'),
    createInput('text', 'Correo electrónico', 'mail'),
  ];

  divForm.append(...inputs, alertBox);

  divForm.getParticipantData = () => {
    const elementInputs = divForm.querySelectorAll<HTMLInputElement>('input');
    const participantData: Record<string, string> = {};

    let hasEmpty = false;

    elementInputs.forEach((input) => {
      if (input.type !== 'hidden' && input.value.trim() === '') {
        hasEmpty = true;
      } else {
        participantData[input.name] = input.value;
      }
    });
    
    participantData['number'] = getNumber()?.toString() ?? '';

    alertBox.textContent = '';
    if (hasEmpty) {
      alertBox.textContent = 'Complete todos los campos';
    }

    return participantData;
  };

  return divForm;
}
