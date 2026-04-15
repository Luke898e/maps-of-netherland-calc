import Link from "next/link";

export default function NotFoundPage(): React.JSX.Element {
  return (
    <div className="mx-auto max-w-3xl space-y-4 rounded-xl border border-[#d4e3f8] bg-white p-8">
      <p className="text-sm uppercase tracking-[0.15em] text-[#3f5c84]">404</p>
      <h1 className="font-[var(--font-heading)] text-3xl font-semibold text-[#0f3364]">Page not found</h1>
      <p className="leading-7 text-[#203754]">
        The page you requested does not exist or has moved. Use the links below to continue.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-[#12447d] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0f3968]"
        >
          Go Home
        </Link>
        <Link
          href="/support"
          className="inline-flex items-center justify-center rounded-md border border-[#c1d8f5] bg-white px-4 py-2 text-sm font-medium text-[#12447d] transition-colors hover:bg-[#eaf2ff]"
        >
          Report Broken Link
        </Link>
      </div>
    </div>
  );
}
