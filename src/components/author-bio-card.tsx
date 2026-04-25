import Image from "next/image";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authorProfile } from "@/content/author-profile";

interface AuthorBioCardProps {
  title?: string;
}

export function AuthorBioCard({ title = "Author Bio" }: AuthorBioCardProps): React.JSX.Element {
  return (
    <Card className="surface-panel">
      <CardHeader>
        <CardTitle className="text-2xl text-[#0f3364]">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-[140px_1fr] sm:items-start">
          <div className="relative mx-auto h-36 w-36 overflow-hidden rounded-xl border border-[#cfe0f7] shadow-sm sm:mx-0">
            <Image
              src={authorProfile.photoSrc}
              alt={authorProfile.photoAlt}
              fill
              priority
              className="object-cover"
              sizes="144px"
            />
          </div>
          <div className="space-y-2">
            <p className="text-lg font-semibold text-[#173e73]">{authorProfile.name}</p>
            <p className="text-sm font-medium uppercase tracking-[0.08em] text-[#3f5c84]">
              {authorProfile.role} | {authorProfile.location}
            </p>
          </div>
        </div>
        <p className="body-copy">{authorProfile.mission}</p>
        {authorProfile.bioParagraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="body-copy">
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
                  className="link-inline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#3f5c84]">
            Verifiable Credentials
          </p>
          <ul className="space-y-1">
            {authorProfile.verifiableCredentials.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-inline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
