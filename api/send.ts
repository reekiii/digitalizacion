import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

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
      html: `
        <div style="font-family: sans-serif; padding: 20px; background-color: #f4f4f4;">
          <div style="background-color: #fff; padding: 20px; border-radius: 8px; border-top: 4px solid #00b4d8;">
            <h2 style="color: #333">🚀 Nuevo lead de Grasdesign</h2>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Teléfono:</strong> ${phone}</p>
            <p><strong>Pack deseado:</strong> ${pack}</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0" />
            <p><strong>Mensaje:</strong></p>
            <p style="white-space: pre-wrap; color: #555">${message}</p>
          </div>
        </div>
      `,
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
