import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MethodologyReference {
  label: string;
  url: string;
}

interface ToolMethodologyProps {
  title: string;
  summary: string;
  steps: ReadonlyArray<string>;
  formula?: string;
  references?: ReadonlyArray<MethodologyReference>;
}

export function ToolMethodology({
  title,
  summary,
  steps,
  formula,
  references = []
}: ToolMethodologyProps): React.JSX.Element {
  return (
    <Card className="border-[#d4e3f8]">
      <CardHeader>
        <CardTitle className="text-2xl text-[#0f3364]">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <p className="leading-7 text-[#203754]">{summary}</p>
        <ol className="list-decimal space-y-2 pl-5 text-[#203754]">
          {steps.map((step) => (
            <li key={step.slice(0, 40)} className="leading-7">
              {step}
            </li>
          ))}
        </ol>
        {formula ? (
          <div className="rounded-md border border-[#dbe7f8] bg-[#f6f9ff] p-4 text-sm text-[#17467f]">
            <p className="font-semibold">Core formula</p>
            <p className="mt-1 font-mono">{formula}</p>
          </div>
        ) : null}
        {references.length > 0 ? (
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#3f5c84]">Source references</p>
            <ul className="space-y-1">
              {references.map((reference) => (
                <li key={reference.url}>
                  <Link
                    href={reference.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2 hover:text-[#0f3364]"
                  >
                    {reference.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
