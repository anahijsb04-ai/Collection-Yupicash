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

    const id =
      searchParams.get("id");

    if (!telefono && !id) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Telefono o id requerido",
        },
        { status: 400 }
      );
    }

    let sql = `
      SELECT
        id,
        usuario_id,
        producto,
        monto,
        importe_pagar,
        fecha_vencimiento,
        dias_vencidos,
        nombre_cliente,
        telefono_cliente,
        cuenta_bancaria,
        metodo_pago,
        token,
        tipo_plantilla,
        pagado,
        created_at,

        CASE
          WHEN pagado = true
          THEN 'Pagado'
          ELSE 'Pendiente'
        END as estado

      FROM plantillas_temporales

      WHERE 1=1
    `;

    const values: any[] = [];

    if (telefono) {
      values.push(telefono);

      sql += `
        AND telefono_cliente = $${values.length}
      `;
    }

    if (id) {
      values.push(id);

      sql += `
        AND id = $${values.length}
      `;
    }

    sql += `
      ORDER BY created_at DESC
      LIMIT 1
    `;

    const result =
      await query(sql, values);

    return NextResponse.json({
      ok: true,
      data:
        result.rows[0] || null,
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