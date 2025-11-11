import './styles/transferPay.css';
import { startCountdown, create } from './utils';

interface PaymentData {
  alias: string;
  cbu: string;
  amount: number;
  raffleNumber: number;
  name: string;
  dni: string;
}

export function TransferPay(container: HTMLElement, paymentData: PaymentData) {
  container.innerHTML = ""; // limpia contenido anterior

  const { alias, cbu, amount, raffleNumber, name, dni } = paymentData;

  // --- wrapper ---
  const wrapper = create("div", { className: "transfer-wrapper" });
  const title = create("h2", { innerText: "Complete su transferencia" });
  const info = create("div", { className: "transfer-info" });

  info.innerHTML = `
    <p><strong>Alias:</strong> ${alias}</p>
    <p><strong>CBU:</strong> ${cbu}</p>
    <p><strong>Monto:</strong> $${amount}</p>
    <p><strong>Número:</strong> ${raffleNumber}</p>
    <p><strong>Nombre:</strong> ${name}</p>
    <p><strong>DNI:</strong> ${dni}</p>
  `;

  const countdownText = create("p", { className: "countdown-text", innerText: "Tiempo restante: 10:00" });
  const progressCircle = create("div", { className: "progress-circle" });
  const statusMessage = create("div", { className: "status-message" });
  wrapper.append(title, info, progressCircle, countdownText, statusMessage);
  container.appendChild(wrapper);

  // --- CREAR REGISTRO TEMPORAL EN BACKEND ---
  let referencia: string | null = null;
  (async () => {
    try {
      const res = await fetch("/api/participaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, dni, numero: raffleNumber }),
      });
      if (!res.ok) throw new Error("No se pudo iniciar la participación");
      const data = await res.json();
      referencia = data.referencia; // guardamos la referencia única
    } catch (err) {
      statusMessage.innerText = "⚠️ Error al crear la participación. Intente nuevamente.";
      console.error(err);
    }
  })();

  // --- COUNTDOWN ---
  let remaining = 600; // 10 minutos
  const total = remaining;

  const cancelCountdown = startCountdown(
    remaining,
    (r) => {
      remaining = r;
      const minutes = Math.floor(r / 60);
      const seconds = (r % 60).toString().padStart(2, "0");
      countdownText.innerText = `Tiempo restante: ${minutes}:${seconds}`;
      progressCircle.style.setProperty("--progress", `${((total - r) / total) * 100}%`);
    },
    async () => {
      statusMessage.innerText = "⏰ Tiempo agotado. Tu número fue liberado.";
      progressCircle.classList.add("expired");
      if (referencia) {
        await fetch(`/api/participaciones/expirar/${referencia}`, { method: "PATCH" });
      }
    }
  );

  // --- POLLING PARA VERIFICAR EL PAGO ---
  const pollInterval = setInterval(async () => {
    if (!referencia) return; // espera a tener la referencia válida
    try {
      const res = await fetch(`/api/payments/status/${referencia}`);
      if (!res.ok) throw new Error("Error al verificar el pago");
      const data = await res.json();

      if (data.status === "approved") {
        clearInterval(pollInterval);
        cancelCountdown();
        statusMessage.innerText = "✅ ¡Transferencia confirmada! Gracias por participar.";
        progressCircle.classList.add("success");

        // Registrar participante definitivo
        await fetch("/api/participants", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, dni, numero: raffleNumber }),
        });

        setTimeout(() => location.reload(), 2500);
      }
    } catch (err) {
      console.error("Error en polling:", err);
    }
  }, 4000);
}