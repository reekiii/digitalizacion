// components/ContactEmail.tsx
export const ContactEmail = ({ nombre, email, telefono, paquete, mensaje }: any) => (
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
        <strong>Nombre:</strong> {nombre}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Teléfono:</strong> {telefono}
      </p>
      <p>
        <strong>Pack deseado:</strong> {paquete}
      </p>
      <hr
        style={{ border: "0", borderTop: "1px solid #eee", margin: "20px 0" }}
      />
      <p>
        <strong>Mensaje:</strong>
      </p>
      <p style={{ whiteSpace: "pre-wrap", color: "#555" }}>{mensaje}</p>
    </div>
  </div>
);
