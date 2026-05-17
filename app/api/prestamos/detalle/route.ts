// app/api/prestamos/detalle/route.ts

import {
  NextRequest,
  NextResponse,
} from "next/server";

import { query } from "@/lib/db";

export const runtime =
  "nodejs";

export async function GET(
  req: NextRequest
) {
  try {
    const { searchParams } =
      new URL(req.url);

    const telefono =
      searchParams.get(
        "telefono"
      );

    if (!telefono) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Telefono requerido",
        },
        { status: 400 }
      );
    }

    const sql = `
      SELECT
        id,

        numero_prestamo,

        producto,

        valor_deuda as monto,

        valor_deuda as valorDispersado,

        valor_deuda as importe_pagar,

        valor_deuda as valorAdeudado,

        COALESCE(
          nombre_cliente,
          nombre,
          'Usuario'
        ) as nombre_cliente,

        telefono_cliente,

        telefono_cliente as telefono,

        liga_pago,

        created_at,

        pagado,

        CASE
          WHEN pagado = true
          THEN 'Pagado'
          ELSE 'Pendiente'
        END as estado

      FROM cliente

      WHERE telefono_cliente = $1
        AND liga_pago IS NOT NULL
        AND liga_pago <> ''

      ORDER BY id DESC

      LIMIT 1
    `;

    const result =
      await query(sql, [
        telefono,
      ]);

    const item =
      result.rows[0] || null;

    return NextResponse.json({
      ok: true,

      data: item
        ? {
            ...item,

            nombre:
              item.nombre_cliente,

            metodo_pago:
              "SPEI",

            metodo_pago_label:
              "SPEI",

            cuenta_bancaria:
              item.liga_pago,

            cuentaClabeParaCobro:
              item.liga_pago,
          }
        : null,
    });
  } catch (error) {
    console.error(
      "GET_PRESTAMO_DETALLE_ERROR:",
      error
    );

    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Error desconocido",
      },
      { status: 500 }
    );
  }
}