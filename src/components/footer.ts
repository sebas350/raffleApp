export function Footer(): HTMLElement {
    const container = document.createElement('div');
    const h1 = document.createElement('h1');
    h1.textContent = 'chau';
    container.append(h1);
    
    return container;
}
