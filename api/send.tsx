import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import { ContactEmail } from '../src/components/ContactEmail';

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, phone, pack, message } = req.body;

    // Asegurarse de que process.env.RESEND_API_KEY exista.
    if (!process.env.RESEND_API_KEY) {
      console.error('Falta la API Key de Resend en las variables de entorno');
      return res.status(500).json({ error: 'Configuración del servidor incompleta' });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: 'GrasDesign <onboarding@resend.dev>', // Change this if you have a custom domain
      to: ['contactgrasdesign@gmail.com'],
      subject: `🚀 Nuevo lead: ${name}`,
      react: (
        <ContactEmail
          name={name}
          email={email}
          phone={phone}
          pack={pack}
          message={message}
        />
      ),
    });

    if (error) {
      console.error('Error de Resend:', error);
      return res.status(500).json({ error });
    }

    return res.status(200).json(data);
  } catch (err: any) {
    console.error('Error del servidor:', err);
    return res.status(500).json({ error: err.message || 'Error interno del servidor' });
  }
};
