import Link from "next/link";
import Image from "next/image";

export function SiteLogo(): React.JSX.Element {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg shadow-sm ring-1 ring-[#d6e6fb]">
        <Image
          src="/brand/logo-emblem.svg"
          alt="Global Tax Suite logo emblem"
          fill
          priority
          sizes="44px"
          className="object-cover"
        />
      </div>
      <div className="space-y-0.5 leading-none">
        <p className="font-[var(--font-heading)] text-base font-semibold tracking-[0.03em] text-[#0f3364]">
          Global Tax Suite
        </p>
        <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-[#3b6596]">
          Nigeria + UK Compliance
        </p>
      </div>
    </Link>
  );
}
