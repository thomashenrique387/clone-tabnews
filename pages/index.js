import { useState } from "react";

export default function Home({ MAIL_API_KEY }) {

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
                "mail-api-key": MAIL_API_KEY, // injected server-side via getServerSideProps
            },
            body: JSON.stringify({ counter })
        });
        
        const data = await res.json();

        if (data.ok) {
            alert("Email enviado com sucesso!");
        } else {
            alert("Erro ao enviar email: " + data.error);
        }
    } catch (err) {
        console.error(err);
        alert("Erro de rede ao enviar email: " + err.message);
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


// server-side injection of the MAIL_API_KEY into the rendered page props
export async function getServerSideProps(context) {
    // This value lives only on the server and is not bundled to the client JS
    const MAIL_API_KEY = process.env.MAIL_API_KEY || null;

    return {
        props: { MAIL_API_KEY },
    };
}
