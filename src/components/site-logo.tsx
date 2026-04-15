import Link from "next/link";

export function SiteLogo(): React.JSX.Element {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-md bg-gradient-to-br from-[#0f3f79] via-[#1556a8] to-[#1c74d6] shadow-sm" />
      <div className="space-y-0.5">
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#1b4a85]">Global Tax Suite</p>
        <p className="text-xs text-muted-foreground">Professional Advisory Tools</p>
      </div>
    </Link>
  );
}
