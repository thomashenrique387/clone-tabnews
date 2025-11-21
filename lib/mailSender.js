import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendMail({ subject, html }) {
  await resend.emails.send({
    from: 'Thomas Santos <onboarding@resend.dev>',
    to: [process.env.EMAIL_RECEIVER],
    subject,
    html,
  });
}