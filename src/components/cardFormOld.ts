import { createInput } from './utils';
import { subscribeNumber } from './store';

export function CardForm() {
  const divForm = document.createElement('div');
  
  const alertBox = document.createElement('div');
  alertBox.className = 'alert';

  const inputs = [
    createInput('text', 'Nombre Completo', 'fullname'),
    createInput('number', 'DNI', 'dni'),
    createInput('number', 'Celular', 'cel'),
    createInput('text', 'Correo electrónico', 'mail'),
  ];

  const hiddenInput = document.createElement('input');
  hiddenInput.type = 'hidden';
  hiddenInput.name = 'number';
  
  subscribeNumber((num) => {
    if (num !== null) hiddenInput.value = num.toString();
  });

  const paymentContainer = document.createElement('div');
  paymentContainer.id = 'paymentBrick_container';

  divForm.append(...inputs, hiddenInput, alertBox, paymentContainer);

  // Función para obtener formData al momento de pagar
  const getFormData = (): Record<string, string> | null => {
    const formData: Record<string, string> = {};
    let hasEmpty = false;

    [...inputs, hiddenInput].forEach((el) => {
      if (el.type !== 'hidden' && el.value.trim() === '') {
        hasEmpty = true;
      } else {
        formData[el.name] = el.value;
      }
    });

    if (hasEmpty) {
      alertBox.textContent = 'Complete todos los campos';
      return null;
    }

    return formData;
  };

  return { element: divForm, paymentContainer, getFormData };
}