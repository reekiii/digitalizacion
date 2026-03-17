import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('ERROR: Falta RESEND_API_KEY');
      return res.status(500).json({ error: 'Configuración faltante: RESEND_API_KEY' });
    }

    const { name, email, phone, pack, message } = req.body;
    
    // Validación básica de campos
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Faltan campos obligatorios: nombre, email o mensaje' });
    }

    const resend = new Resend(apiKey);

    // Template HTML puro (sin React) para evitar fallos de ejecución en Vercel
    const html = `
      <div style="font-family: sans-serif; padding: 20px; background-color: #f4f4f4;">
        <div style="background-color: #fff; padding: 20px; border-radius: 8px; border-top: 4px solid #00b4d8;">
          <h2 style="color: #333;">🚀 Nuevo lead de Grasdesign</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</p>
          <p><strong>Pack deseado:</strong> ${pack || 'Desconocido'}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Mensaje:</strong></p>
          <p style="white-space: pre-wrap; color: #555;">${message}</p>
        </div>
      </div>
    `;

    console.log(`Intentando enviar email de: ${email} para: contactgrasdesign@gmail.com`);

    const { data, error } = await resend.emails.send({
      from: 'GrasDesign <onboarding@resend.dev>',
      to: 'contactgrasdesign@gmail.com',
      subject: `🚀 Nuevo lead: ${name}`,
      html: html,
    });

    if (error) {
      console.error('Error reportado por Resend:', error);
      return res.status(400).json({ error });
    }

    console.log('Email enviado con éxito:', data);
    return res.status(200).json({ success: true, data });

  } catch (err: any) {
    console.error('CRASH EN EL HANDLER:', err);
    return res.status(500).json({ 
      error: 'Error interno del servidor', 
      details: err.message 
    });
  }
}
