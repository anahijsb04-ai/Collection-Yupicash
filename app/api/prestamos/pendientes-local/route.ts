// app/api/prestamos/pendientes-local/route.ts

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

    const limite = Number(
      searchParams.get(
        "limite"
      ) ?? 50
    );

    if (!telefono) {
      return NextResponse.json({
        ok: false,
        registrado: false,
        total: 0,
        data: [],
      });
    }

    const sql = `
      SELECT
        id,
        numero_prestamo,
        nombre_cliente,
        telefono_cliente,
        valor_deuda as monto,
        valor_deuda as importe_pagar,
        producto,
        created_at,

        CASE
          WHEN pagado = true
          THEN 'Pagado'
          ELSE 'Pendiente'
        END as estado

      FROM cliente

      WHERE telefono_cliente = $1

      ORDER BY id DESC

      LIMIT $2
    `;

    const result =
      await query(sql, [
        telefono,
        limite,
      ]);

    return NextResponse.json({
      ok: true,
      registrado:
        result.rows.length > 0,
      total:
        result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error(
      "GET_PRESTAMOS_PENDIENTES_LOCAL_ERROR:",
      error
    );

    return NextResponse.json(
      {
        ok: false,
        registrado: false,
        error:
          error instanceof Error
            ? error.message
            : "Error desconocido",
      },
      { status: 500 }
    );
  }
}