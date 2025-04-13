import { Main } from './components/main';
import { Footer } from './components/footer';
import './styles/app.css';

export function initApp(): void {
  
  const app = document.querySelector('#app');

  if (!(app instanceof HTMLElement)) {
    throw new Error('No se encontró el elemento con id "app".');
  }
  
  const footer = Footer();
  const main = Main();

  app.append(main, footer);
}
