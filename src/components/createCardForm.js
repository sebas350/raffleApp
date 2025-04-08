import { createInput } from './utils.js'

export function CreateCardForm(){
    // Formulario para tarjeta de crédito/débito
const cardForm = document.createElement('form');

const inputName = createInput('text', 'Nombre tal como sale en la tarjeta');
const inputNum = createInput('text', 'Número de tarjeta');
const inputMonth = createInput('text', 'Mes (MM)');
const inputYear = createInput('text', 'Año (YY)');
const inputCode = createInput('password', 'Código de seguridad');
const inputDni = createInput('number', 'DNI');
const inputMail = createInput('email', 'Correo electrónico');

cardForm.append(inputName, inputNum, inputMonth, inputYear, inputCode, inputDni, inputMail);

return cardForm;

}
