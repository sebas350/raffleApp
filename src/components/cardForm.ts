import { createInput } from './utils'

export const CardForm = (raffleNumber: number): HTMLFormElement => {
  const form = document.createElement('form');
  
  const inputs: HTMLInputElement[] = [
    createInput('text', 'Nombre Completo', 'fullname'),
    createInput('number', 'DNI', 'dni'),
    createInput('number', 'Celular', 'cel'),
    createInput('text', 'Correo electrónico', 'mail'),
  ];

  const submit = createInput('submit', '', '');
  submit.value = 'Participar';
  
  // Input oculto para el número del sorteo
    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.name = 'number';
    hiddenInput.value = raffleNumber.toString();

  form.append(...inputs, submit, hiddenInput);

  // Evento submit con fetch
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

     const inputs = form.querySelectorAll('input:not([type="submit"])');
    
    const formData: Record<string, string> = {};

    inputs.forEach((input) => {
  const inputElement = input as HTMLInputElement;
  formData[inputElement.name] = inputElement.value;
    });

    try {
      const res = await fetch('http://localhost:3000/participants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await res.json();
      console.log('Participante creado:', result);
    } catch (err) {
      console.error('Error al enviar el formulario:', err);
    }
  });

  return form;
};