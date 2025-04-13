import { Main } from './components/main.ts';
import { Footer } from './components/footer.ts';
import './styles/app.css';

export function initApp(): void {
  const app = document.querySelector('#app');

  if (!(app instanceof HTMLElement)) {
    throw new Error('No se encontró el elemento con id "app".');
  }

  const footer: HTMLElement = Footer();
  const main: HTMLElement = Main();

  app.append(main, footer);
}
