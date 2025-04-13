import { createInput } from './utils'

export const CardForm = (): HTMLFormElement => {
    const form = document.createElement('form');
    const inputs: HTMLInputElement[] = [
        createInput('text', 'Nombre tal como sale en la tarjeta'),
        createInput('text', 'Número de tarjeta'),
        createInput('text', 'Mes (MM)'),
        createInput('text', 'Año (YY)'),
        createInput('password', 'Código de seguridad'),
        createInput('number', 'DNI'),
        createInput('email', 'Correo electrónico'),
        createInput('submit', '', 'Participar')
    ];
    form.append(...inputs);
    return form;
};
