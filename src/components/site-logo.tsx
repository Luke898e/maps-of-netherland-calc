import Link from "next/link";
import Image from "next/image";

export function SiteLogo(): React.JSX.Element {
  return (
    <Link href="/" className="group flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40">
      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-[#d2e1f6] bg-white shadow-[0_10px_26px_-18px_rgba(15,63,121,0.75)] ring-1 ring-[#ebf3ff] transition-transform duration-200 group-hover:-translate-y-0.5">
        <Image
          src="/brand/logo-emblem.svg"
          alt="Global Tax Suite logo"
          fill
          priority
          sizes="44px"
          className="object-cover"
        />
      </div>
      <div className="space-y-0.5 leading-none">
        <p className="font-[var(--font-heading)] text-base font-semibold tracking-[0.02em] text-[#0f3364]">
          Global Tax Suite
        </p>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3b6596]">
          Nigeria + UK Compliance
        </p>
      </div>
    </Link>
  );
}
