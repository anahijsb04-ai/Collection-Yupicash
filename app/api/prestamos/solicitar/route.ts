// app/api/prestamos/solicitar/route.ts

import {
  NextRequest,
  NextResponse,
} from "next/server";

export const runtime =
  "nodejs";

export async function POST(
  req: NextRequest
) {
  try {
    const body =
      await req.json();

    const target =
      `${req.nextUrl.origin}/api/prestamos/solicitar-local`;

    const response = await fetch(
      target,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(
          body
        ),
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