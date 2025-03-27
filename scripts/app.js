import { Main } from './components/main.js';
import { Footer } from './components/footer.js';

function init(){
  const root = document.querySelector('#root');
  const footer = Footer();
  const main = Main();
  root.append(main, footer);
};

init();
