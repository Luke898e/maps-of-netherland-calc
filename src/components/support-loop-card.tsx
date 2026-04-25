import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SupportLoopCardProps {
  toolName: string;
  toolPath: string;
}

export function SupportLoopCard({ toolName, toolPath }: SupportLoopCardProps): React.JSX.Element {
  const encodedTool = encodeURIComponent(toolName);
  const encodedPath = encodeURIComponent(toolPath);

  return (
    <Card className="surface-panel">
      <CardHeader>
        <CardTitle className="text-2xl text-[#0f3364]">Support Loop</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="body-copy">
          Found an edge case, UI issue, or policy ambiguity? Send it directly to the maintainer. This product uses
          active feedback loops to improve accuracy and usability release-by-release.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href={`/support?type=bug&tool=${encodedTool}&path=${encodedPath}`}
            className="inline-flex w-full items-center justify-center rounded-md bg-[#12447d] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0f3968] sm:w-auto"
          >
            Report a Bug
          </Link>
          <Link
            href={`/support?type=feature&tool=${encodedTool}&path=${encodedPath}`}
            className="inline-flex w-full items-center justify-center rounded-md border border-[#c1d8f5] bg-white px-4 py-2 text-sm font-medium text-[#12447d] transition-colors hover:bg-[#eaf2ff] sm:w-auto"
          >
            Request a Feature
          </Link>
          <Link
            href="/updates"
            className="inline-flex w-full items-center justify-center rounded-md border border-[#c1d8f5] bg-white px-4 py-2 text-sm font-medium text-[#12447d] transition-colors hover:bg-[#eaf2ff] sm:w-auto"
          >
            View Changelog
          </Link>
          <Link
            href="/pricing"
            className="inline-flex w-full items-center justify-center rounded-md border border-[#c1d8f5] bg-white px-4 py-2 text-sm font-medium text-[#12447d] transition-colors hover:bg-[#eaf2ff] sm:w-auto"
          >
            View Pricing
          </Link>
          <Link
            href="/book-demo"
            className="inline-flex w-full items-center justify-center rounded-md border border-[#c1d8f5] bg-white px-4 py-2 text-sm font-medium text-[#12447d] transition-colors hover:bg-[#eaf2ff] sm:w-auto"
          >
            Book Demo
          </Link>
          <Link
            href="/testimonials"
            className="inline-flex w-full items-center justify-center rounded-md border border-[#c1d8f5] bg-white px-4 py-2 text-sm font-medium text-[#12447d] transition-colors hover:bg-[#eaf2ff] sm:w-auto"
          >
            Client Proof
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
