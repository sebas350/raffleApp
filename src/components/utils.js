export const createInput = (type, placeholder) => {
    const input = document.createElement('input');
    input.type = type;
    input.placeholder = placeholder;
    return input;
};