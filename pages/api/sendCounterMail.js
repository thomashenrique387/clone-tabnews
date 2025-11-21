import { sendMail } from "../../lib/mailSender";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  
  const allowed = "https://clone-tabnews-umber-omega.vercel.app";
  //const allowed = "http://localhost:3000";

  const origin = req.headers.origin || "";
  const referer = req.headers.referer || "";

  if (!origin.startsWith(allowed) && !referer.startsWith(allowed)) {
    return res.status(403).json({ error: "Forbidden" });
  }
  
  const { counter } = req.body;

  if (typeof counter !== "number") {
    return res.status(400).json({ error: "Invalid counter value" });
  }
  
  try {

    await sendMail({
        subject: "Contador de beijinhos",
        html: `<p>Tatiane pediu <strong>${counter}</strong> beijinhos!</p>`
      });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("API sendMail error:", error);
    return res.status(500).json({ ok: false, error: error.message });
  }
}
