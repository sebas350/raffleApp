import { createInput } from './utils'
import type { PaidElement } from './paid'
import type { MainElement } from './types'

export const CardForm = (raffleNumber: number, paidElement: PaidElement, mainElement: MainElement,): HTMLFormElement => {
  const form = document.createElement('form');
  const alert: HTMLDivElement = document.createElement('div');
  
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

const elementInputs = form.querySelectorAll('input:not([type="submit"])');
    
    const formData: Record<string, string> = {};
    
    let hasEmpty = false;
    
    //validacion de input
    elementInputs.forEach((input) => {
  const el = input as HTMLInputElement;
  
  if(el.value.trim() == ''){
      hasEmpty = true;
  }else{
      formData[el.name] = el.value;
  }  
});

alert.textContent = '';
alert.remove();
    
if(hasEmpty){
      alert.textContent = 'Complete todos los campos';
      form.append(alert);
      return;
  }
    
    try {
      const res = await fetch('http://localhost:3000/participants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
    const errorData = await res.json();
    mainElement.showNotification(errorData.message, false);
    return;
  }
      
      paidElement.closeWindow();
      mainElement.updateDisabledButtons();
      mainElement.tableRender();
      mainElement.showNotification('¡Gracias por participar!', true);
    
    } catch (err) {
      alert.textContent = 'Error al guardar el participante';
      mainElement.showNotification('Error al realizar el pago', false);
    }
});

return form;       
};
