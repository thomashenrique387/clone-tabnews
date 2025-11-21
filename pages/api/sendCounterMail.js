import { sendMail } from '../../lib/mailSender';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: "Invalid method" });
  }

  const { counter } = req.body;

  if (typeof counter !== "number") {
    return res.status(400).json({ ok: false, error: "Invalid counter" });
  }

  try {
    await sendMail({
      to: [process.env.EMAIL_RECEIVER],
      subject: 'Contador de beijinhos',
      html: `<p>Tatiane pediu <strong>${counter}</strong> beijinhos!</p>`,
    });
  } catch (error) {
    console.error("sendCounterMail error:", error);
    return res.status(500).json({ ok: false, error: error.message });
  }

  res.status(200).json({ ok: true });
}
