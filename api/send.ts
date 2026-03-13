import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import { ContactEmail } from '../src/components/ContactEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, pack, message } = req.body;

  try {
    const data = await resend.emails.send({
      from: 'GrasDesign <onboarding@resend.dev>', // Change this if you have a custom domain
      to: ['contactgrasdesign@gmail.com'],
      subject: `🚀 Nuevo lead: ${name}`,
      react: ContactEmail({ 
        nombre: name, 
        email: email, 
        telefono: phone, 
        paquete: pack, 
        mensaje: message 
      }),
    });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json(error);
  }
};
