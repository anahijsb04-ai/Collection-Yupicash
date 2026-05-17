import Link from "next/link";

type Props = {
  searchParams: Promise<{
    phone?: string;
  }>;
};

async function obtenerCliente(
  telefono: string
) {
  try {
    const base =
      process.env.NEXT_PUBLIC_URL ||
      "http://localhost:3000";

    const res = await fetch(
      `${base}/api/prestamos/detalle?telefono=${encodeURIComponent(
        telefono
      )}`,
      {
        cache: "no-store",
      }
    );

    const data = await res.json();

    return data?.data || null;
  } catch {
    return null;
  }
}

export default async function ConfigPage({
  searchParams,
}: Props) {
  const params =
    await searchParams;

  const phone =
    params?.phone || "";

  const cliente =
    await obtenerCliente(phone);

  const nombre =
    cliente?.nombre_cliente ||
    cliente?.nombre ||
    cliente?.cliente ||
    phone ||
    "Usuario";

  const Card = ({
    children,
  }: {
    children: React.ReactNode;
  }) => (
    <div className="rounded-[30px] border border-violet-100 bg-white p-5 shadow-sm">
      {children}
    </div>
  );

  const Item = ({
    label,
    value,
  }: {
    label: string;
    value: string;
  }) => (
    <div className="flex items-center justify-between gap-4 py-2">
      <span className="text-sm text-[#7b748d]">
        {label}
      </span>

      <span className="text-sm font-bold text-[#1b1330] text-right">
        {value}
      </span>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#f7f5fc] text-[#111827] pb-10">

      {/* HEADER */}
      <section className="relative h-[250px] overflow-hidden">

        <img
          src="/images/aa.jpg"
          alt="header"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#12051f]/70 to-[#12051f]/40" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-white">

          {/* AVATAR */}
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/10 text-3xl backdrop-blur-xl shadow-xl">
            👤
          </div>

          <h1 className="mt-5 text-4xl font-black tracking-tight">
            {nombre}
          </h1>

          <p className="mt-2 text-sm text-white/70">
            Cliente YopiCash
          </p>

        </div>

      </section>

      {/* BODY */}
      <section className="mx-auto max-w-xl space-y-5 px-5 pt-6">

        {/* CUENTA */}
        <Card>

          <h2 className="text-xl font-black text-[#1b1330]">
            Cuenta
          </h2>

          <div className="mt-4">

            <Item
              label="Nombre"
              value={nombre}
            />

            <Item
              label="Teléfono"
              value={phone}
            />

          </div>

        </Card>

        {/* SEGURIDAD */}
        <Card>

          <h2 className="text-xl font-black text-[#1b1330]">
            Seguridad
          </h2>

          <div className="mt-4 space-y-2">

            <Item
              label="Capturas bloqueadas"
              value="Activo"
            />

            <Item
              label="Protección"
              value="Habilitada"
            />

            <Item
              label="Estado"
              value="Seguro"
            />

          </div>

        </Card>

        {/* SOPORTE */}
        <Card>

          <h2 className="text-xl font-black text-[#1b1330]">
            Soporte
          </h2>

          <p className="mt-4 text-sm text-[#7b748d]">
            Contacto de ayuda:
          </p>

          <p className="mt-2 break-all text-sm font-bold text-violet-700">
            paymentsreport@yopmail.com
          </p>

        </Card>

        {/* LOGOUT */}
        <Link href="/login">

          <button className="h-[58px] w-full rounded-[24px] bg-gradient-to-r from-red-500 to-pink-500 font-bold text-white shadow-[0_15px_40px_rgba(239,68,68,0.25)]">
            Cerrar sesión
          </button>

        </Link>

      </section>

    </main>
  );
}