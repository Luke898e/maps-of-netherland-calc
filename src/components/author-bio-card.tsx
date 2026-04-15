import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authorProfile } from "@/content/author-profile";

interface AuthorBioCardProps {
  title?: string;
}

export function AuthorBioCard({ title = "Author Bio" }: AuthorBioCardProps): React.JSX.Element {
  return (
    <Card className="border-[#d4e3f8]">
      <CardHeader>
        <CardTitle className="text-2xl text-[#0f3364]">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-lg font-semibold text-[#173e73]">{authorProfile.name}</p>
        <p className="text-sm font-medium uppercase tracking-[0.08em] text-[#3f5c84]">
          {authorProfile.role} | {authorProfile.location}
        </p>
        <p className="leading-7 text-[#203754]">{authorProfile.mission}</p>
        {authorProfile.bioParagraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="leading-7 text-[#203754]">
            {paragraph}
          </p>
        ))}
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#3f5c84]">Verify the author</p>
          <ul className="space-y-1">
            {authorProfile.profileLinks.map((link) => (
              <li key={link.url}>
                <Link
                  href={link.url}
                  target={link.url.startsWith("http") ? "_blank" : undefined}
                  rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2 hover:text-[#0f3364]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
