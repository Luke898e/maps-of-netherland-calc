import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Section {
  title: string;
  paragraphs: ReadonlyArray<string>;
}

interface DocumentationArticleProps {
  heading: string;
  intro: string;
  sections: ReadonlyArray<Section>;
  latexTables?: ReadonlyArray<{
    title: string;
    code: string;
  }>;
}

export function DocumentationArticle({
  heading,
  intro,
  sections,
  latexTables = []
}: DocumentationArticleProps): React.JSX.Element {
  return (
    <Card className="border-[#d4e3f8]">
      <CardHeader>
        <CardTitle className="text-2xl text-[#0f3364]">{heading}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-10">
        <p className="leading-7 text-[#203754]">{intro}</p>
        {sections.map((section) => (
          <section key={section.title} className="space-y-4">
            <h3 className="text-xl font-semibold text-[#0f3364]">{section.title}</h3>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="leading-7 text-[#203754]">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
        {latexTables.length > 0 ? (
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-[#0f3364]">LaTeX Tables</h3>
            {latexTables.map((table) => (
              <div key={table.title} className="space-y-2">
                <h4 className="text-lg font-medium text-[#17467f]">{table.title}</h4>
                <pre className="overflow-x-auto rounded-md border border-[#dbe7f8] bg-[#f6f9ff] p-4 text-xs text-[#203754]">
                  <code>{table.code}</code>
                </pre>
              </div>
            ))}
          </section>
        ) : null}
      </CardContent>
    </Card>
  );
}
