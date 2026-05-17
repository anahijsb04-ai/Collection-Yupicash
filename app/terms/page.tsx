    "use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TermsPage() {
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);

  const handleContinue = () => {
    if (!accepted) {
      alert("Debes aceptar los términos y condiciones");
      return;
    }

    router.push("/login");
  };

  const terms = [
    "Conste por el presente documento el Contrato de Términos y Condiciones, respecto a los servicios ofrecidos por CashPay a través de su aplicativo autorizado.",
    "📩 SMS: Recopilamos mensajes relacionados con transacciones financieras dentro de 12 meses para análisis crediticio y seguridad OTP.",
    "📞 Registros de llamadas: Solo con consentimiento explícito para evaluación crediticia.",
    "🖼️ Imágenes: Se recopila información técnica del uso de aplicaciones para validación.",
    "👤 Persona de contacto: Solicitamos contactos de emergencia para referencias.",
    "📁 Archivos: Documentos necesarios para solicitudes y validaciones.",
    "👤 Cuenta principal: Información para evaluación de riesgos.",
    "📲 Aplicaciones instaladas: Para prevención de fraude y comportamiento financiero.",
    "📍 Ubicación: Para validar solicitudes y ofertas personalizadas.",
    "📷 Cámara: Para verificación de identidad.",
    "📅 Calendario: Para recordatorios de pago.",
    "💾 Almacenamiento: Para cargar documentos e imágenes.",
    "⚠️ Hacer clic en Aceptar y continuar significa que ha leído y aceptado nuestro Aviso de privacidad.",
  ];

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Fondo */}
      <div className="absolute inset-0">
        <img
          src="/images/aa.jpg"
          alt="background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Contenido */}
      <section className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-[#111111]/95 shadow-2xl">
          {/* Header */}
          <div className="px-6 pt-7 pb-4 text-center">
            <h1 className="text-3xl font-bold text-white">CashPay</h1>
            <h2 className="mt-5 text-left text-2xl font-bold text-white">
              Términos y Condiciones
            </h2>
          </div>

          {/* Scroll */}
          <div className="px-6">
            <div className="max-h-[420px] space-y-4 overflow-y-auto pr-2 text-sm leading-7 text-white/75">
              {terms.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>

            {/* Checkbox */}
            <label className="mt-5 flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="mt-1 h-4 w-4 accent-white"
              />
              <span className="text-sm leading-6 text-white/80">
                He leído y acepto los términos y condiciones.
              </span>
            </label>

            {/* Botón */}
            <button
              onClick={handleContinue}
              className="mt-6 mb-6 h-14 w-full rounded-full border border-white/15 bg-black text-sm font-semibold text-white transition hover:bg-white hover:text-black"
            >
              Aceptar y continuar
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}   