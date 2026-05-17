// app/api/prestamos/pendientes/route.ts

import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const telefono = searchParams.get("telefono") || "";
    const limite = searchParams.get("limite") || "1";

    const target =
      `https://cashwemx.vercel.app/api/prestamos/pendientes` +
      `?telefono=${encodeURIComponent(telefono)}` +
      `&limite=${encodeURIComponent(limite)}`;

    const response = await fetch(target, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    const text = await response.text();

    return new NextResponse(text, {
      status: response.status,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: "No se pudo conectar con el servicio remoto",
      },
      { status: 500 }
    );
  }
}