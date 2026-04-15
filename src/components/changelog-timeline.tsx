import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ChangelogEntry } from "@/content/changelog";

interface ChangelogTimelineProps {
  entries: ReadonlyArray<ChangelogEntry>;
}

export function ChangelogTimeline({ entries }: ChangelogTimelineProps): React.JSX.Element {
  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <Card key={`${entry.version}-${entry.date}`} className="border-[#d4e3f8]">
          <CardHeader className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#3f5c84]">
              {entry.date} | {entry.version}
            </p>
            <CardTitle className="text-xl text-[#0f3364]">{entry.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5 text-[#203754]">
              {entry.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
