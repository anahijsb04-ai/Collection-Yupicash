import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const telefono = searchParams.get("telefono") || "";
    const id = searchParams.get("id") || "";

    const url =
      `https://cashwemx.vercel.app/api/prestamos/pendientes` +
      `?telefono=${encodeURIComponent(telefono)}&limite=50`;

    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();

    const lista = Array.isArray(data?.data) ? data.data : [];

    const item =
      lista.find((x: any) => String(x.id) === String(id)) ||
      lista[0] ||
      null;

    return NextResponse.json({
      ok: true,
      data: item,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Error servidor" },
      { status: 500 }
    );
  }
}