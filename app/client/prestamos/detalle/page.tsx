"use client";

import {
  useEffect,
  useState,
} from "react";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";

type PrestamoDetalle = {
  id?: string | number;
  producto?: string;
  nombre_cliente?: string;
  importe_pagar?: string | number;
  fecha_vencimiento?: string;
  cuenta_bancaria?: string;
  metodo_pago?: string;
  metodo_pago_label?: string;
};

export default function LoanDetailPage() {
  const router =
    useRouter();

  const params =
    useSearchParams();

  const phone =
    params.get("phone") || "";

  const id =
    params.get("id") || "";

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [prestamo, setPrestamo] =
    useState<PrestamoDetalle | null>(
      null
    );

  const money = (value: any) => {
    const n = Number(value || 0);

    return `$${n.toLocaleString(
      "es-MX"
    )}`;
  };

  const fechaActual = () => {
    return new Date().toLocaleDateString(
      "es-MX",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
  };

  async function cargarDetalle() {
    try {
      setLoading(true);
      setError("");

      if (!phone || !id) {
        setError(
          "Datos incompletos"
        );
        setLoading(false);
        return;
      }

      const res = await fetch(
        `/api/prestamos/detalle?id=${encodeURIComponent(
          id
        )}&telefono=${encodeURIComponent(
          phone
        )}`,
        {
          cache:
            "no-store",
        }
      );

      const data =
        await res.json();

      if (
        !res.ok ||
        !data?.ok
      ) {
        setError(
          "No se pudo cargar el préstamo"
        );
        setLoading(false);
        return;
      }

      const item =
        data?.data ||
        data?.prestamo ||
        (Array.isArray(
          data?.items
        )
          ? data.items[0]
          : null);

      if (!item) {
        setError(
          "Sin información del préstamo"
        );
        setLoading(false);
        return;
      }

      setPrestamo(item);
    } catch {
      setError(
        "Error de conexión"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    cargarDetalle();
  }, [phone, id]);

  async function copiarCuenta() {
    const cuenta =
      prestamo?.cuenta_bancaria ||
      "No disponible";

    await navigator.clipboard.writeText(
      cuenta
    );

    alert(
      "Cuenta copiada"
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F2F3F7] flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
          <p className="mt-4 text-gray-500">
            Cargando detalle...
          </p>
        </div>
      </main>
    );
  }

  if (
    error ||
    !prestamo
  ) {
    return (
      <main className="min-h-screen bg-[#F2F3F7] flex items-center justify-center px-6">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-gray-200">
          <p className="font-semibold text-gray-700">
            {error ||
              "Sin información"}
          </p>

          <button
            onClick={() =>
              router.back()
            }
            className="mt-5 h-[50px] w-full rounded-2xl bg-blue-600 font-semibold text-white"
          >
            Volver
          </button>
        </div>
      </main>
    );
  }

  const producto =
    prestamo.producto ||
    "PRÉSTAMO";

  const nombre =
    prestamo.nombre_cliente ||
    "Cliente";

  const importe =
    money(
      prestamo.importe_pagar
    );

  const fecha =
    new Date().toLocaleDateString(
      "es-MX",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    );

  const cuenta =
    prestamo.cuenta_bancaria ||
    "No disponible";

  const metodo =
    prestamo.metodo_pago ||
    prestamo.metodo_pago_label ||
    "SPEI";

  return (
    <main className="min-h-screen bg-[#F2F3F7] text-[#111827]">
      <section className="relative h-[220px] overflow-hidden">
        <img
          src="/images/aa.jpg"
          alt="header"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 px-5 pt-10">
          <button
            onClick={() =>
              router.back()
            }
            className="flex items-center gap-2 text-white"
          >
            <span>←</span>
            <span className="font-semibold">
              Volver
            </span>
          </button>

          <div className="mt-10 text-center text-white">
            <p className="text-sm font-semibold tracking-widest text-white/70">
              ORDEN DE PAGO
            </p>

            <h1 className="mt-2 text-3xl font-bold uppercase">
              {producto}
            </h1>

            <p className="mt-2 text-sm text-white/80">
              {fechaActual()}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-xl space-y-5 px-5 py-6">
        <div className="text-center">
          <h2 className="text-lg font-bold text-gray-900">
            {nombre}
          </h2>

          <p className="text-sm text-gray-500">
            {phone}
          </p>
        </div>

        <div className="rounded-[28px] bg-white p-6 text-center shadow-sm ring-1 ring-gray-200">
          <p className="text-sm text-gray-500">
            MONTO TOTAL A PAGAR
          </p>

          <h3 className="mt-3 text-5xl font-extrabold text-green-600">
            {importe}
          </h3>
        </div>

        <div className="rounded-[28px] bg-red-50 p-5 ring-1 ring-red-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">
              VENCE EL:
            </span>

            <span className="font-bold text-red-600">
              {fecha}
            </span>
          </div>

          <p className="mt-4 text-center font-semibold leading-6 text-red-600">
            Su préstamo se encuentra en mora.
            Realice el pago lo antes posible.
          </p>
        </div>

        <div className="rounded-[28px] bg-blue-50 p-5 text-center ring-1 ring-blue-100">
          <p className="text-sm text-gray-600">
            TRANSFERENCIA
          </p>

          <h4 className="mt-2 text-lg font-bold text-gray-900">
            {metodo}
          </h4>

          <p className="mt-4 break-all text-2xl font-extrabold text-blue-700">
            {cuenta}
          </p>
        </div>

        <button
          onClick={
            copiarCuenta
          }
          className="h-[56px] w-full rounded-3xl bg-slate-800 font-bold text-white shadow-lg"
        >
          COPIAR LINK DE PAGO
        </button>
      </section>
    </main>
  );
}