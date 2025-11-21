import { useState } from "react";

export default function Home() {

  const [counter, setCounter] = useState(0);

  function addCounter() {
    setCounter((c) => c + 1);
  }


async function sendCounterMail() {
  try {
    const res = await fetch("/api/sendCounterMail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ counter }),
    });

    const data = await res.json();

    if (data.ok) {
      alert("Email enviado com sucesso!");
    } else {
      alert("Erro no envio: " + data.error);
    }
  } catch (error) {
    alert("Erro inesperado: " + error.message);
  }
}


return (
    <div style={{ padding: 24 }}>
        <h1>Obrigado por ser minha companheira!</h1>
        <p>Quantos beijinhos quer ganhar hoje: {counter} </p>

        <div style={{ marginTop: "1rem" }}>
            <button type="button" onClick={addCounter}>
                Adicionar
            </button>

            <button type="button" onClick={sendCounterMail} style={{ marginLeft: 8 }}>
                Enviar
            </button>
        </div>
    </div>
    );
}
