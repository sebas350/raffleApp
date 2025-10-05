import { loadMercadoPago } from '@mercadopago/sdk-js';
import {setCardPaymentController} from './store';
import type { MainElement, PaidElement} from './types';
import { subscribeNumber } from './store';
import { ParticipantElement } from './types';

export async function RenderBrick(idContainer: string, divParticipant: ParticipantElement, mainElement: MainElement, paidElement: PaidElement) {

  
  let selectedNumber: number | null = null;
  
  subscribeNumber((num) => {

    selectedNumber = num;

  });
  
  
  const MercadoPagoConstructor = (await loadMercadoPago()) as any;
 
 
  // instanciamos
  const mp = new MercadoPagoConstructor('TEST-142b7eda-ae84-4537-9e72-4bddc099ab6b', {
    locale: 'es-AR',
  });

  const bricksBuilder = mp.bricks();

  const settings = {
    initialization: {
      amount: 1000,
      payer: { email: '' },
    },
    customization: {
      visual: { hideFormTitle: true },
      paymentMethods: { maxInstallments: 1 },
    },
    callbacks: {
      onReady: () => console.log('Brick listo'),
      onSubmit: async (paymentData: any) => {

  const checkRes = await fetch(`http://localhost:3000/participants/check-number/${selectedNumber}`);

  const checkData = await checkRes.json();


  if (!checkData) {

    mainElement.showNotification(`El número ya fue asignado. Elija otro.`, false);

    setTimeout(() => {
    window.location.reload();
  }, 5000);
  
  throw new Error('Número no disponible');

  }


let participantData: Record<string, string>;

  participantData = divParticipant.getParticipantData();

const body = {
paymentData,
participantData,
};

//let data: any;
        
        try {
          const res = await fetch('http://localhost:3000/payments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          });
          
          const data = await res.json();
          
      
      //divParticipant.textContent = JSON.stringify(data.response.id, null, 2);

      if (data.validation) {

mainElement.showNotification(data.message, data.validation);

  paidElement.closeWindow();
  mainElement.updateDisabledButtons();
  
  setTimeout(() => window.location.reload(), 5000);
  return;
} else {
  throw new Error('algo salió mal');
}
           
        } catch (err: any) {
          console.error(err);
          
          const errorMessage =
    err?.message?.includes('número') 
      ? err.message 
      : 'Complete los datos del participante.';
                   mainElement.showNotification( errorMessage, false);
  throw err;
        }
      },
      onError: (err: any) =>{
          
     console.error(err);  
     
      mainElement.showNotification('Error al cargar el formulario de pago', false);    
          
      },
   
    },
  };
  
  const controller = await bricksBuilder.create(
    'cardPayment',
    idContainer,
    settings
  );
  
  setCardPaymentController(controller);
  
}
