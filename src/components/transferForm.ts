import { create } from "./utils";
import { TransferPay } from "./transferPay";

export function TransferForm(container: HTMLElement, paymentDataBase: any) {
  container.innerHTML = "";

  const wrapper = create("div", { className: "transfer-form" });
  const title = create("h2", { innerText: "Datos del participante" });

  const nameInput = create("input", {
    type: "text",
    placeholder: "Nombre completo",
    required: true,
  }) as HTMLInputElement;

  const dniInput = create("input", {
    type: "text",
    placeholder: "DNI",
    required: true,
  }) as HTMLInputElement;

  const submitBtn = create("button", { innerText: "Participar" });

  wrapper.append(title, nameInput, dniInput, submitBtn);
  container.appendChild(wrapper);

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const dni = dniInput.value.trim();

    if (!name || !dni) {
      alert("Por favor complete nombre y DNI.");
      return;
    }

    // Ejecutar componente TransferPay con los datos combinados
    TransferPay(container, {
      ...paymentDataBase, // alias, cbu, amount, raffleNumber
      name,
      dni,
    });
  });
}