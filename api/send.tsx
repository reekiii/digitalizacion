import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ContactEmail } from '../src/components/ContactEmail';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Manejar preflight
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
      return res.status(500).json({ error: 'Configuración faltante' });
    }

    const { name, email, phone, pack, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const resend = new Resend(apiKey);

    console.log('--- Intentando enviar email ---');
    console.log('De:', 'onboarding@resend.dev');
    console.log('Para:', 'contactgrasdesign@gmail.com');

    // Usamos renderToStaticMarkup para evitar problemas de hidratación en el servidor
    const html = renderToStaticMarkup(
      React.createElement(ContactEmail, {
        name,
        email,
        phone,
        pack,
        message,
      })
    );

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
    console.error('CRASH DETECTADO:', err);
    return res.status(500).json({ 
      error: 'Error interno del servidor', 
      details: err.message,
      stack: err.stack 
    });
  }
}
