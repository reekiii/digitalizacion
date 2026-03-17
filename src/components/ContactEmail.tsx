import React from 'react';

interface ContactEmailProps {
  name: string;
  email: string;
  phone: string;
  pack: string;
  message: string;
}

export const ContactEmail = ({
  name,
  email,
  phone,
  pack,
  message,
}: ContactEmailProps) => (
  <div
    style={{
      fontFamily: "sans-serif",
      padding: "20px",
      backgroundColor: "#f4f4f4",
    }}
  >
    <div
      style={{
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        borderTop: "4px solid #00b4d8",
      }}
    >
      <h2 style={{ color: "#333" }}>🚀 Nuevo lead de Grasdesign</h2>
      <p>
        <strong>Nombre:</strong> {name}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Teléfono:</strong> {phone}
      </p>
      <p>
        <strong>Pack deseado:</strong> {pack}
      </p>
      <hr
        style={{ border: "0", borderTop: "1px solid #eee", margin: "20px 0" }}
      />
      <p>
        <strong>Mensaje:</strong>
      </p>
      <p style={{ whiteSpace: "pre-wrap", color: "#555" }}>{message}</p>
    </div>
  </div>
);
