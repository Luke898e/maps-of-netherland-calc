import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for the 2026 Global Mobility & Tax Suite."
};

export default function TermsOfUsePage(): React.JSX.Element {
  return (
    <div className="mx-auto max-w-4xl space-y-6 rounded-xl border border-[#d4e3f8] bg-white p-8">
      <h1 className="font-[var(--font-heading)] text-3xl font-semibold text-[#0f3364]">Terms of Use</h1>
      <p className="leading-7 text-[#203754]">
        By using this site, you agree to use the calculators and documentation for educational and planning purposes
        only. Outputs are not legal, tax, or accounting advice and should be reviewed by a qualified professional
        before filing decisions.
      </p>
      <p className="leading-7 text-[#203754]">
        You are responsible for verifying all inputs used in the calculators. We do not guarantee filing outcomes,
        regulatory acceptance, or suitability for your specific circumstances.
      </p>
      <p className="leading-7 text-[#203754]">
        Support requests and corrections can be submitted through
        <span> </span>
        <Link href="/support" className="text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2">
          Support
        </Link>
        .
      </p>
    </div>
  );
}
