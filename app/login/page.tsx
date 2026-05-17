"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [loading, setLoading] = useState(false);

  const generateCode = () => {
    const random = Math.floor(
      100 + Math.random() * 900
    ).toString();

    setGeneratedCode(random);

    alert("Tu código es: " + random);
  };

  const login = async () => {
    if (!phone.trim()) {
      alert("Ingresa tu número");
      return;
    }

    if (!generatedCode) {
      alert("Primero genera el código");
      return;
    }

    if (code !== generatedCode) {
      alert("Código incorrecto");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `/api/prestamos/pendientes?telefono=${encodeURIComponent(
          phone
        )}&limite=1`
      );

      const data = await res.json();

      if (!res.ok) {
        alert("Error del servidor");
        return;
      }

      if (!data.registrado) {
        alert("Número no registrado");
        return;
      }

      router.push(
        `/client?phone=${phone}`
      );
    } catch (error) {
      alert("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  const card = (
    title: string,
    text: string
  ) => (
    <div className="w-full rounded-[28px] border border-violet-100 bg-gradient-to-br from-violet-50 to-fuchsia-50 px-5 py-5">
      <h3 className="text-center text-[17px] font-bold text-[#1b1330]">
        {title}
      </h3>

      <p className="mt-3 text-center text-sm leading-6 text-[#6d6780]">
        {text}
      </p>
    </div>
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#12051f]">

      {/* FONDO */}
      <img
        src="/images/aa.jpg"
        alt="bg"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#12051f]/70 via-[#12051f]/50 to-white" />

      {/* GLOW */}
      <div className="absolute top-[-120px] left-[-120px] h-[260px] w-[260px] rounded-full bg-violet-600/20 blur-3xl" />

      <div className="absolute bottom-[-120px] right-[-120px] h-[260px] w-[260px] rounded-full bg-fuchsia-600/20 blur-3xl" />

      <section className="relative z-10 flex min-h-screen flex-col">

        {/* HEADER */}
        <div className="px-5 pt-6">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xl p-1">

              <img
                src="/icon/app_icon.png"
                alt="logo"
                className="h-full w-full object-contain"
              />

            </div>

            <div>
              <h1 className="text-4xl font-black tracking-tight text-white">
                YopiCash
              </h1>

              <p className="text-xs text-white/50">
                Fast Digital Loans
              </p>
            </div>

          </div>

          {/* HERO */}
          <div className="mt-10 text-center">

            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-5 py-3 backdrop-blur-xl">

              <span className="h-3 w-3 rounded-full bg-violet-400" />

              <span className="text-sm text-white/90">
                Aprobación inmediata
              </span>

            </div>

            <p className="mt-7 text-lg font-medium text-white/80">
              Importe máximo
            </p>

            <h2 className="mt-3 bg-gradient-to-r from-violet-300 to-fuchsia-400 bg-clip-text text-6xl font-black leading-none text-transparent">
              $20,000
            </h2>

            <p className="mt-4 text-white/70">
              Plazo máximo de préstamo 365 días
            </p>

          </div>

        </div>

        {/* CARD */}
        <div className="mt-10 flex-1 rounded-t-[40px] bg-white px-6 pt-8 pb-8">

          <div className="mx-auto max-w-xl">

            <p className="text-center text-[18px] font-bold leading-7 text-[#1b1330]">
              Inicia sesión usando tu número de WhatsApp.
            </p>

            {/* PHONE */}
            <div className="mt-8 flex gap-3">

              <div className="flex items-center rounded-2xl border border-violet-100 bg-violet-50 px-5 py-4 text-[17px] font-semibold text-violet-700">
                +52
              </div>

              <input
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                placeholder="Ingresa tu número de WhatsApp"
                className="h-[58px] flex-1 rounded-2xl border border-violet-100 bg-violet-50 px-5 text-[#1b1330] outline-none placeholder:text-[#8f88a3]"
              />

            </div>

            {/* CODE */}
            <input
              value={code}
              onChange={(e) =>
                setCode(e.target.value)
              }
              placeholder="Introduce el código de verificación"
              className="mt-4 h-[58px] w-full rounded-2xl border border-violet-100 bg-violet-50 px-5 text-[#1b1330] outline-none placeholder:text-[#8f88a3]"
            />

            {/* GET CODE */}
            <div className="mt-3 text-right">

              <button
                onClick={generateCode}
                className="text-sm font-semibold text-violet-600"
              >
                Obtener código
              </button>

            </div>

            {/* BUTTON */}
            <button
              onClick={login}
              disabled={loading}
              className="mt-5 h-[60px] w-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 text-lg font-bold text-white shadow-[0_15px_40px_rgba(139,92,246,0.35)] transition-all hover:scale-[1.01]"
            >
              {loading
                ? "Cargando..."
                : "Iniciar Sesión"}
            </button>

            {/* TEXT */}
            <p className="mt-5 text-center text-sm text-[#8b859b]">
              Tu información está protegida y segura.
            </p>

            {/* INFO CARDS */}
            <div className="mt-7 space-y-4">

              {card(
                "Consejos",
                "Mientras más uses YopiCash, mayores serán tus beneficios y tu límite de crédito."
              )}

              {card(
                "¿Por qué elegirnos?",
                "Proceso rápido, experiencia moderna y préstamos digitales desde cualquier lugar."
              )}

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}