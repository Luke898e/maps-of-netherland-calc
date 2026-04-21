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
    <Card className="surface-panel">
      <CardHeader>
        <CardTitle className="text-2xl text-[#0f3364] sm:text-3xl">{heading}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-10">
        <p className="body-copy text-[1.02rem]">{intro}</p>
        {sections.map((section) => (
          <section key={section.title} className="space-y-4 border-t border-[#e1ebf9] pt-6 first:border-0 first:pt-0">
            <h3 className="text-xl font-semibold text-[#0f3364] sm:text-2xl">{section.title}</h3>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="body-copy">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
        {latexTables.length > 0 ? (
          <section className="space-y-4 border-t border-[#e1ebf9] pt-6">
            <h3 className="text-xl font-semibold text-[#0f3364]">LaTeX Tables</h3>
            {latexTables.map((table) => (
              <div key={table.title} className="space-y-2">
                <h4 className="text-lg font-medium text-[#17467f]">{table.title}</h4>
                <pre className="overflow-x-auto rounded-lg border border-[#dbe7f8] bg-[#f6f9ff] p-4 text-xs leading-6 text-[#203754]">
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
