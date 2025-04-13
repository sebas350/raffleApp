export function Footer(): HTMLDivElement {
    const container: HTMLDivElement = document.createElement('div');
    const h1: HTMLHeadingElement = document.createElement('h1');
    h1.textContent = 'chau';
    container.append(h1);
    
    return container;
}
