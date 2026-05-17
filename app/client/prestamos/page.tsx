"use client";

import {
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Prestamo = {
  id?: string | number;
  producto?: string;
  monto?: string | number;
  importe_pagar?: string | number;
};

export default function PrestamosPage() {
  const params =
    useSearchParams();

  const phone =
    params.get("phone") || "";

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [prestamos, setPrestamos] =
    useState<Prestamo[]>([]);

  const money = (value: any) => {
    const n = Number(value || 0);

    return `$${n.toLocaleString(
      "es-MX"
    )}`;
  };

  async function cargarPrestamos() {
    try {
      setLoading(true);
      setError("");

      if (!phone) {
        setError(
          "Número telefónico no detectado"
        );
        setLoading(false);
        return;
      }

      const res = await fetch(
        `/api/prestamos/pendientes?telefono=${encodeURIComponent(
          phone
        )}&limite=50`,
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
          : [];

      setPrestamos(lista);

      if (
        lista.length === 0
      ) {
        setError(
          "No tienes préstamos activos"
        );
      }
    } catch {
      setError(
        "Error de conexión"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    cargarPrestamos();
  }, [phone]);

  return (
    <main className="min-h-screen bg-[#F4F7FB] text-[#111827] px-5 py-6">
      <section className="mx-auto max-w-xl space-y-5">
        <div className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-gray-200">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Mis préstamos
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {phone}
          </p>

          <button
            onClick={
              cargarPrestamos
            }
            className="mt-4 rounded-2xl bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700"
          >
            Actualizar
          </button>
        </div>

        {loading && (
          <div className="rounded-[28px] bg-white p-10 text-center shadow-sm ring-1 ring-gray-200">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />

            <p className="mt-4 text-sm text-gray-500">
              Cargando préstamos...
            </p>
          </div>
        )}

        {!loading &&
          error && (
            <div className="rounded-[28px] bg-white p-8 text-center shadow-sm ring-1 ring-gray-200">
              <p className="font-medium text-gray-500">
                {error}
              </p>
            </div>
          )}

        {!loading &&
          prestamos.map(
            (
              item,
              index
            ) => (
              <div
                key={index}
                className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-gray-200"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-bold text-gray-900">
                    {item.producto ||
                      "Préstamo"}
                  </h3>

                  <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-600">
                    Retraso
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Monto
                    </span>

                    <span className="font-bold text-gray-900">
                      {money(
                        item.monto
                      )}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      A pagar
                    </span>

                    <span className="font-bold text-blue-700">
                      {money(
                        item.importe_pagar
                      )}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/client/prestamos/detalle?phone=${encodeURIComponent(
                    phone
                  )}&id=${item.id || ""}`}
                >
                  <button className="mt-5 h-[48px] w-full rounded-2xl bg-blue-600 font-semibold text-white shadow-lg">
                    Ver detalle
                  </button>
                </Link>
              </div>
            )
          )}
      </section>
    </main>
  );
}