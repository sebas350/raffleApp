export function Notifications(notificationDiv: HTMLDivElement, message: string, isSuccess: boolean): void {
    
    notificationDiv.textContent = message;

notificationDiv.className = 'notification';

notificationDiv.classList.add(isSuccess ? 'success' : 'error');

notificationDiv.style.display = 'block';

// Inicia fuera de la pantalla
notificationDiv.style.transform = 'translateY(100%)';
notificationDiv.style.opacity = '0';

// Forzar reflow para que la animación se active correctamente
void notificationDiv.offsetWidth;

notificationDiv.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
notificationDiv.style.transform = 'translateY(0)';
notificationDiv.style.opacity = '1';

setTimeout(() => {
notificationDiv.style.transform = 'translateY(-100%)';
notificationDiv.style.opacity = '0';

setTimeout(() => {  
  notificationDiv.style.display = 'none';  
}, 500);

}, 2500); // visible por 2.5 segundos
};

