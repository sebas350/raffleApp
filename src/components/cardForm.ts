import { createInput, loadMercadoPagoSDK } from './utils';
import type { MainElement, PaidElement} from './types';

export const CardForm = async (
  raffleNumber: number,
  paidElement: PaidElement,
  mainElement: MainElement
): Promise<HTMLDivElement> => {
  const divForm = document.createElement('div');
  const alertBox = document.createElement('div');
  alertBox.className = 'alert';

  const inputs: HTMLInputElement[] = [
    createInput('text', 'Nombre Completo', 'fullname'),
    createInput('number', 'DNI', 'dni'),
    createInput('number', 'Celular', 'cel'),
    createInput('text', 'Correo electrónico', 'mail'),
  ];

  const hiddenInput = document.createElement('input');
  hiddenInput.type = 'hidden';
  hiddenInput.name = 'number';
  hiddenInput.value = raffleNumber.toString();

  const paymentContainer = document.createElement('div');
  paymentContainer.id = 'paymentBrick_container';

  divForm.append(...inputs, hiddenInput, alertBox, paymentContainer);


  const mp = await loadMercadoPagoSDK('TEST-142b7eda-ae84-4537-9e72-4bddc099ab6b');
  const bricksBuilder = mp.bricks();

  bricksBuilder.create('cardPayment', paymentContainer.id, {
    initialization: {
      amount: 1000, // Cambiar por monto real
    },
    customization: {
      paymentMethods: {
        ticket: 'none',
        bankTransfer: 'none',
        creditCard: 'all',
        debitCard: 'all',
      },
    },
    callbacks: {
      onReady: () => {
        // Animación opcional
      },
      onError: (error: unknown) => {
        console.error(error);
        mainElement.showNotification('Error al cargar el formulario de pago', false);
      },
      onSubmit: async () => {
        const elementInputs = divForm.querySelectorAll('input');
        const formData: Record<string, string> = {};
        
        let hasEmpty = false;

        elementInputs.forEach((input) => {
          const el = input as HTMLInputElement;
          if (el.type !== 'hidden' && el.value.trim() === '') {
            hasEmpty = true;
          } else {
            formData[el.name] = el.value;
          }
        });

        alertBox.textContent = '';
        if (hasEmpty) {
          alertBox.textContent = 'Complete todos los campos';
          return;
        }

        // 🔄 Verificación de número
        try {
          const checkRes = await fetch(`http://localhost:3000/participants/check-number/${formData.number}`);
          const checkData = await checkRes.json();

          if (!checkRes.ok || !checkData.available) {
            mainElement.showNotification('El número ya fue asignado. Elija otro.', false);
            return;
          }
        } catch (err: unknown) {
          console.error(err);
          mainElement.showNotification('Error al verificar número', false);
          return;
        }

        // 💾 Registro si está todo bien
        try {
          const res = await fetch('http://localhost:3000/participants', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
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
        } catch (err: unknown) {
          console.error(err);
          mainElement.showNotification('Error al guardar el participante', false);
        }
      },
    },
  });

  return divForm;
};