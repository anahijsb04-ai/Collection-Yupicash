"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/terms");
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#140321] px-6">

      <section className="flex flex-col items-center text-center">

        {/* LOGO */}
        <div className="w-[140px] h-[140px] rounded-[35px] bg-[#24103d] flex items-center justify-center border border-white/10">

          <img
            src="/icon/app_icon.png"
            alt="YupiCash"
            className="w-[105px] h-[105px] object-contain"
          />

        </div>

        {/* TITLE */}
        <h1 className="mt-8 text-5xl font-black text-white">
          YupiCash
        </h1>

        {/* TEXT */}
        <p className="mt-4 text-white/60 text-sm max-w-[280px] leading-relaxed">
          Préstamos rápidos, seguros y digitales.
        </p>

        {/* LOADER */}
        <div className="mt-8 h-7 w-7 rounded-full border-2 border-white/20 border-t-violet-400 animate-spin" />

      </section>

    </main>
  );
}