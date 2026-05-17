// app/api/prestamos/detalle/route.ts

import {
  NextRequest,
  NextResponse,
} from "next/server";

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
      ) || "";

    const id =
      searchParams.get("id") ||
      "";

    const target =
      `${req.nextUrl.origin}/api/prestamos/detalle-local` +
      `?telefono=${encodeURIComponent(
        telefono
      )}` +
      `&id=${encodeURIComponent(
        id
      )}`;

    const response = await fetch(
      target,
      {
        cache: "no-store",
      }
    );

    const text =
      await response.text();

    return new NextResponse(
      text,
      {
        status:
          response.status,
        headers: {
          "Content-Type":
            "application/json",
        },
      }
    );
  } catch (e: any) {
    return NextResponse.json(
      {
        ok: false,
        error:
          e?.message ||
          "Error servidor",
      },
      { status: 500 }
    );
  }
}