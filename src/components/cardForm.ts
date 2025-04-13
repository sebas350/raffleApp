import { createInput } from './utils.js'

export const CardForm = () => {
    const form = document.createElement('form');
    const inputs = [
        createInput('text', 'Nombre tal como sale en la tarjeta'),
        createInput('text', 'Número de tarjeta'),
        createInput('text', 'Mes (MM)'),
        createInput('text', 'Año (YY)'),
        createInput('password', 'Código de seguridad'),
        createInput('number', 'DNI'),
        createInput('email', 'Correo electrónico')
    ];
    form.append(...inputs);
    return form;
};
