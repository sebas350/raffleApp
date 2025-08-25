import type { MainElement, PaidElement, MercadoPagoInstance } from './types';
import { subscribeNumber } from './store';

export const RenderBrick = async (
  mp: MercadoPagoInstance,
  containerId: string,
  mainElement: MainElement,
  paidElement: PaidElement,
  getFormData: () => Record<string, string> | null
) => {
  let selectedNumber: number | null = null;

const divStatus = document.createElement('div');

  subscribeNumber((num) => {
    selectedNumber = num;
  });

  const bricksBuilder = mp.bricks();

  const cardBrick = await bricksBuilder.create('cardPayment', containerId, {
    initialization: { amount: 1000 },
    customization: {
      paymentMethods: {
        ticket: 'none',
        bankTransfer: 'none',
        creditCard: 'all',
        debitCard: 'all',
      },
    },
    callbacks: {
      onReady: () => {},
      onError: (error: unknown) => {
        console.error(error);
        mainElement.showNotification('Error al cargar el formulario de pago', false);
      },
      onSubmit: async (cardFormData: Record<string, string>) => {
  const formData = getFormData();
  if (!formData) return;

  // Paso 1 - Verificar número
  const checkRes = await fetch(`http://localhost:3000/participants/check-number/${selectedNumber}`);
  const checkData = await checkRes.json();

  if (!checkData) {
    mainElement.showNotification(`El número ya fue asignado. Elija otro.`, false);
    return;
  }

  // Paso 2 - Crear pago en backend
  try {
    const paymentRes = await fetch('http://localhost:3000/payments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: 1000,
        ...cardFormData // Datos que devuelve el Brick
      }),
    });

    const paymentData = await paymentRes.json();

    if (paymentData.status === 'approved') {
      
      
      // Paso 3 - Registrar participante
      await fetch('http://localhost:3000/participants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      mainElement.showNotification('¡Pago aprobado y participante registrado!', true);
      paidElement.closeWindow();
      mainElement.updateDisabledButtons();
      mainElement.tableRender();

    } else if (paymentData.status === 'pending') {
      mainElement.showNotification('Pago pendiente. El participante se registrará al aprobarse.', false);
    } else {
      mainElement.showNotification(`Pago rechazado. Intente nuevamente.${JSON.stringify(paymentData)}`, false);
      divStatus.innerHTML=`${JSON.stringify(paymentData)}`;
      paidElement.append(divStatus);   
      
   }   
  } catch (err) {
    console.error(err);
    mainElement.showNotification('Error al procesar el pago', false);
  }
},
    },
  });

  return cardBrick; // opcional, por si quieres manipularlo después
};