"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  ArrowUpRight,
  ShieldCheck,
  Lock,
} from "lucide-react";

type Producto = {
  nombre: string;
  monto: string;
  desc: string;
};

export default function SolicitarPage() {
  const router =
    useRouter();

  const params =
    useSearchParams();

  const phone =
    params.get("phone") || "";

  const [loading, setLoading] =
    useState(true);

  const [bloqueado, setBloqueado] =
    useState(false);

  const [mensaje, setMensaje] =
    useState("");

  const productos: Producto[] = [
    {
      nombre: "Yopi Starter",
      monto: "$1,400",
      desc: "Ideal para comenzar tu historial.",
    },
    {
      nombre: "Yopi Advance",
      monto: "$3,000",
      desc: "Mayor liquidez y flexibilidad.",
    },
    {
      nombre: "Yopi Max",
      monto: "$10,000",
      desc: "Acceso premium a montos altos.",
    },
  ];

  useEffect(() => {
    validarCliente();
  }, [phone]);

  async function validarCliente() {
    try {
      if (!phone) {
        setBloqueado(true);

        setMensaje(
          "Número telefónico no detectado."
        );

        setLoading(false);

        return;
      }

      const res = await fetch(
        `/api/prestamos/pendientes?telefono=${encodeURIComponent(
          phone
        )}&limite=1`,
        {
          cache: "no-store",
        }
      );

      const data =
        await res.json();

      const lista =
        Array.isArray(
          data?.data
        )
          ? data.data
          : Array.isArray(
              data
            )
          ? data
          : [];

      if (lista.length > 0) {
        setBloqueado(true);

        setMensaje(
          "Pague sus préstamos antes de volver a solicitar."
        );
      } else {
        setBloqueado(false);

        setMensaje(
          "Cuenta aprobada para nueva solicitud."
        );
      }
    } catch {
      setBloqueado(true);

      setMensaje(
        "Error al consultar información."
      );
    } finally {
      setLoading(false);
    }
  }

  function solicitar(
    producto: Producto
  ) {
    // HASH SIMPLE DEL PRODUCTO
    const encoded =
      btoa(
        JSON.stringify({
          p: producto.nombre,
          t: Date.now(),
        })
      );

    router.push(
      `/client/solicitud-form?k=${encodeURIComponent(
        encoded
      )}`
    );
  }

  return (
    <main className="space-y-6 pb-10 text-[#111827]">

 

      {/* STATUS */}
      {loading ? (
        <div className="rounded-[28px] border border-violet-100 bg-white p-6 text-center shadow-sm">

          <p className="text-sm text-gray-500">
            Consultando información...
          </p>

        </div>
      ) : (
        <div
          className={`rounded-[28px] p-5 shadow-sm ${
            bloqueado
              ? "border border-red-200 bg-red-50"
              : "border border-violet-100 bg-violet-50"
          }`}
        >

          <div className="flex items-start gap-4">

            <div
              className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                bloqueado
                  ? "bg-red-100"
                  : "bg-violet-100"
              }`}
            >

              {bloqueado ? (
                <Lock className="h-5 w-5 text-red-600" />
              ) : (
                <ShieldCheck className="h-5 w-5 text-violet-700" />
              )}

            </div>

            <div>

              <p
                className={`font-bold ${
                  bloqueado
                    ? "text-red-700"
                    : "text-violet-700"
                }`}
              >
                {mensaje}
              </p>

            </div>

          </div>

        </div>
      )}

      {/* PRODUCTS */}
      {productos.map(
        (item) => (
          <div
            key={item.nombre}
            className="group relative overflow-hidden rounded-[32px] border border-violet-100 bg-white shadow-[0_10px_50px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_80px_rgba(139,92,246,0.12)]"
          >

            {/* GLOW */}
            <div className="absolute inset-0 opacity-0 transition-all duration-500 group-hover:opacity-100 bg-gradient-to-br from-violet-50 to-fuchsia-50" />

            <div className="relative z-10 p-6">

              {/* TITLE */}
              <div className="flex items-start justify-between gap-4">

                <div>

                  <h3 className="text-2xl font-black text-[#1b1330]">
                    {item.nombre}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#7b748d]">
                    {item.desc}
                  </p>

                </div>

                <div className="rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 p-3 shadow-[0_10px_30px_rgba(139,92,246,0.25)]">

                  <ArrowUpRight className="h-5 w-5 text-white" />

                </div>

              </div>

              {/* AMOUNT */}
              <div className="mt-7">

                <p className="text-sm text-[#7b748d]">
                  Monto disponible
                </p>

                <h4 className="mt-2 bg-gradient-to-r from-violet-700 to-fuchsia-500 bg-clip-text text-5xl font-black text-transparent">
                  {item.monto}
                </h4>

              </div>

              {/* BUTTON */}
              {bloqueado ? (
                <button
                  disabled
                  className="mt-7 h-[56px] w-full cursor-not-allowed rounded-2xl bg-gray-200 font-semibold text-gray-500"
                >
                  🔒 No disponible
                </button>
              ) : (
                <button
                  onClick={() =>
                    solicitar(
                      item
                    )
                  }
                  className="mt-7 h-[56px] w-full rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 font-bold text-white shadow-[0_15px_40px_rgba(139,92,246,0.25)] transition-all duration-300 hover:scale-[1.01]"
                >
                  Solicitar ahora
                </button>
              )}

            </div>

          </div>
        )
      )}

    </main>
  );
}