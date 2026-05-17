"use client";

import Link from "next/link";

import { Suspense } from "react";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import { useEffect } from "react";

import {
  CreditCard,
  Settings,
  Wallet,
  ShieldCheck,
} from "lucide-react";

type Props = {
  children: React.ReactNode;
};

function ClientLayoutInner({
  children,
}: Props) {
  const pathname =
    usePathname();

  const router =
    useRouter();

  const params =
    useSearchParams();

  const phone =
    params.get("phone") || "";

  const nombre =
    params.get("nombre") ||
    phone ||
    "Cliente";

  useEffect(() => {
    if (
      pathname.startsWith(
        "/client"
      ) &&
      !phone
    ) {
      const saved =
        localStorage.getItem(
          "yopicash_phone"
        );

      if (saved) {
        router.replace(
          `${pathname}?phone=${encodeURIComponent(
            saved
          )}`
        );
      }
    }

    if (phone) {
      localStorage.setItem(
        "yopicash_phone",
        phone
      );
    }
  }, [
    phone,
    pathname,
    router,
  ]);

  // HASH SIMPLE PARA OCULTAR TELÉFONO
  const encodedPhone =
    phone
      ? btoa(phone)
      : "";

  const nav = [
    {
      name: "Solicitar",
      icon: (
        <Wallet className="h-5 w-5" />
      ),
      href: `/client/solicitar?p=${encodeURIComponent(
        encodedPhone
      )}`,
    },
    {
      name: "Préstamos",
      icon: (
        <CreditCard className="h-5 w-5" />
      ),
      href: `/client/prestamos?p=${encodeURIComponent(
        encodedPhone
      )}`,
    },
    {
      name: "Config",
      icon: (
        <Settings className="h-5 w-5" />
      ),
      href: `/client/config?p=${encodeURIComponent(
        encodedPhone
      )}`,
    },
  ];

  return (
    <main className="min-h-screen bg-[#f7f5fc] text-[#111827] pb-32">

      {/* HEADER */}
      <header className="relative overflow-hidden bg-gradient-to-br from-violet-700 via-fuchsia-600 to-purple-700 px-5 pt-10 pb-8 shadow-[0_20px_80px_rgba(139,92,246,0.25)]">

        {/* GLOWS */}
        <div className="absolute top-[-80px] right-[-80px] h-[220px] w-[220px] rounded-full bg-white/10 blur-3xl" />

        <div className="absolute bottom-[-80px] left-[-80px] h-[220px] w-[220px] rounded-full bg-black/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-xl">

          {/* TOP */}
          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-white/60">
                Bienvenido
              </p>

              <h1 className="text-4xl font-black tracking-tight text-white">
                YopiCash
              </h1>

            </div>

            {/* LOGO */}
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-lg">

              <img
                src="/icon/app_icon.png"
                alt="logo"
                className="h-10 w-10 object-contain"
              />

            </div>

          </div>

          {/* CARD */}
          <div className="mt-6 rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur-xl">

            <div className="flex items-start justify-between gap-4">

              <div>

                <p className="text-sm text-white/70">
                  Cuenta activa
                </p>

                <p className="mt-2 text-xl font-bold text-white">
                  {nombre}
                </p>

              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">

                <ShieldCheck className="h-6 w-6 text-violet-200" />

              </div>

            </div>

          </div>

        </div>

      </header>

      {/* BODY */}
      <section className="mx-auto max-w-xl px-5 pt-6">
        {children}
      </section>

      {/* NAVBAR */}
      <nav className="fixed bottom-5 left-0 right-0 z-50 px-4">

        <div className="mx-auto flex max-w-xl items-center justify-between rounded-[32px] border border-violet-100 bg-white/95 px-3 py-3 shadow-[0_20px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl">

          {nav.map((item) => {
            const active =
              pathname ===
              item.href.split("?")[0];

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-1 flex-col items-center justify-center gap-2 rounded-2xl py-3 text-xs font-bold transition-all duration-300 ${
                  active
                    ? "bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-[0_10px_30px_rgba(139,92,246,0.25)]"
                    : "text-[#8b859b] hover:text-violet-700"
                }`}
              >

                {item.icon}

                <span>{item.name}</span>

              </Link>
            );
          })}

        </div>

      </nav>

    </main>
  );
}

export default function ClientLayout({
  children,
}: Props) {
  return (
    <Suspense fallback={null}>
      <ClientLayoutInner>
        {children}
      </ClientLayoutInner>
    </Suspense>
  );
}