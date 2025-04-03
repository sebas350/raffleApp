import { Main } from './components/main.js';
import { Footer } from './components/footer.js';

export function initApp(){
  const app = document.querySelector('#app');
  const footer = Footer();
  const main = Main();
  app.append(main, footer);
};