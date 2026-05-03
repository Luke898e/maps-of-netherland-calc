import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const siteUrl = process.env.SITE_URL ?? "https://map-of-netherlands.co.uk";
const guideDir = process.env.GUIDE_TEXT_DIR ?? ".automation-guides";
const openAiModel = process.env.OPENAI_MODEL ?? "gpt-4.1";
const articleCount = Number.parseInt(process.env.ARTICLE_COUNT ?? "1", 10);
const today = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Africa/Lagos",
  year: "numeric",
  month: "2-digit",
  day: "2-digit"
}).format(new Date());

const articleQueue = [
  {
    title: "Is Payoneer or Wise Better for Nigerians? (Tax and Compliance Perspective)",
    slug: "payoneer-vs-wise-for-nigerians-tax-compliance-2026",
    category: "Nigeria Tax"
  },
  {
    title: "UK Statutory Residence Test Explained (How to Know If You're UK Tax Resident)",
    slug: "uk-statutory-residence-test-explained-2026",
    category: "UK Tax"
  },
  {
    title: "How Many Days Can You Stay in the UK Without Paying Tax? (2026 Rules Explained)",
    slug: "how-many-days-can-you-stay-in-the-uk-without-paying-tax-2026",
    category: "UK Tax"
  },
  {
    title: "Can You Be Tax Resident in Two Countries? (Nigeria & UK Case Explained)",
    slug: "can-you-be-tax-resident-in-two-countries-nigeria-uk-2026",
    category: "Cross-Border Tax"
  },
  {
    title: "UK Self Assessment for Foreign Earners (Step-by-Step Filing Guide)",
    slug: "uk-self-assessment-for-foreign-earners-2026",
    category: "UK Tax"
  },
  {
    title: "How to Legally Split Income to Stay Within Tax Thresholds in Nigeria",
    slug: "how-to-legally-split-income-to-stay-within-tax-thresholds-in-nigeria-2026",
    category: "Nigeria Tax"
  },
  {
    title: "Cash vs Bank Transfers: How Transaction Patterns Affect Tax Audits in Nigeria",
    slug: "cash-vs-bank-transfers-tax-audits-nigeria-2026",
    category: "Nigeria Tax"
  },
  {
    title: "How to Prove Your Income Is Legit During a Tax Audit in Nigeria",
    slug: "how-to-prove-income-is-legit-tax-audit-nigeria-2026",
    category: "Nigeria Tax"
  }
];

function getPublishTime(index) {
  if (articleCount > 1) {
    return index === 0 ? "09:00:00" : "12:00:00";
  }

  const lagosHour = Number.parseInt(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Africa/Lagos",
      hour: "2-digit",
      hour12: false
    }).format(new Date()),
    10
  );

  return lagosHour < 11 ? "09:00:00" : "12:00:00";
}

const fallbackReferences = {
  "UK Tax": [
    {
      label: "GOV.UK: Tax on foreign income",
      url: "https://www.gov.uk/tax-foreign-income"
    },
    {
      label: "GOV.UK: RDR3 Statutory Residence Test",
      url: "https://www.gov.uk/government/publications/rdr3-statutory-residence-test-srt"
    }
  ],
  "Cross-Border Tax": [
    {
      label: "GOV.UK: Tax on foreign income",
      url: "https://www.gov.uk/tax-foreign-income"
    },
    {
      label: "Federal Inland Revenue Service official portal",
      url: "https://www.firs.gov.ng/"
    }
  ],
  "Nigeria Tax": [
    {
      label: "Federal Inland Revenue Service official portal",
      url: "https://www.firs.gov.ng/"
    },
    {
      label: "PwC Nigeria Tax Summaries",
      url: "https://taxsummaries.pwc.com/nigeria"
    }
  ]
};

function requireEnv(name) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`${name} is required for cloud article publishing.`);
  }
  return value;
}

async function readIfExists(filePath) {
  if (!existsSync(filePath)) {
    return "";
  }

  return readFile(filePath, "utf8");
}

async function readGuides() {
  const files = [
    "semantic-content-writing-rules.txt",
    "micro-semantics-in-depth-seo-guide.txt",
    "holistic-seo-writing-system-koray.txt"
  ];
  const parts = await Promise.all(
    files.map(async (file) => {
      const text = await readIfExists(path.join(guideDir, file));
      return text ? `# ${file}\n${text.slice(0, 18000)}` : "";
    })
  );
  const combined = parts.filter(Boolean).join("\n\n");

  if (combined.length < 1000) {
    throw new Error(
      `Writing guide text was not found in ${guideDir}. Decode/extract the PDF guide secrets before running.`
    );
  }

  return combined;
}

function extractExistingSlugs(blogPostsSource) {
  return new Set([...blogPostsSource.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]));
}

function getNextArticles(existingSlugs) {
  return articleQueue.filter((article) => !existingSlugs.has(article.slug)).slice(0, Math.max(1, articleCount));
}

function toTs(value) {
  return JSON.stringify(value, null, 6).replace(/^/gm, "    ");
}

function buildPostObject(article, generated, index) {
  const publishedAt = `${today}T${getPublishTime(index)}+01:00`;
  const references = generated.references?.length ? generated.references : fallbackReferences[article.category];
  const internalLinks = generated.internalLinks?.length
    ? generated.internalLinks
    : [
        {
          label: "Nigeria Zero-Tax Auditor",
          url: "/tools/nigeria-zero-tax-auditor"
        },
        {
          label: "UK FIG Regime Eligibility Tool",
          url: "/tools/uk-fig-regime-eligibility"
        }
      ];

  return `  {
    slug: ${JSON.stringify(article.slug)},
    title: ${JSON.stringify(article.title)},
    description: ${JSON.stringify(generated.description)},
    publishedDate: ${JSON.stringify(today)},
    updatedDate: ${JSON.stringify(today)},
    publishedAt: ${JSON.stringify(publishedAt)},
    updatedAt: ${JSON.stringify(publishedAt)},
    readingTime: ${JSON.stringify(generated.readingTime ?? "13 min read")},
    category: ${JSON.stringify(article.category)},
    tags: ${toTs(generated.tags ?? [])},
    featuredImage: {
      src: ${JSON.stringify(`/blog/${article.slug}.svg`)},
      alt: ${JSON.stringify(`${article.title} featured image`)}
    },
    sections: [
      {
        heading: "Article body",
        paragraphs: [
          "The full article body is maintained as a markdown override so automated publishing can update long-form guidance without making this registry harder to review."
        ]
      }
    ],
    faqs: ${toTs(generated.faqs ?? [])},
    internalLinks: ${toTs(internalLinks)},
    references: ${toTs(references)}
  }`;
}

function insertBeforeArrayEnd(source, insertion) {
  const marker = "\n] as const;";
  const index = source.lastIndexOf(marker);
  if (index === -1) {
    throw new Error("Could not find blogPosts array terminator.");
  }

  const prefix = source.slice(0, index);
  const suffix = source.slice(index);
  return `${prefix},\n${insertion}${suffix}`;
}

function insertMarkdownOverride(source, slug, markdown) {
  const marker = "export const blogMarkdownOverrides: Readonly<Record<string, string>> = {\n";
  const index = source.indexOf(marker);
  if (index === -1) {
    throw new Error("Could not find markdown override object.");
  }

  const entry = `  ${JSON.stringify(slug)}: ${JSON.stringify(markdown)},\n`;
  return `${source.slice(0, index + marker.length)}${entry}${source.slice(index + marker.length)}`;
}

function escapeXml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

async function writeFeaturedImage(article) {
  const isUk = article.category.includes("UK");
  const accent = isUk ? "#0f3c73" : "#0f5d53";
  const warm = isUk ? "#dceafb" : "#f3e6bd";
  const title = escapeXml(article.title);
  const svg = `<svg width="1600" height="900" viewBox="0 0 1600 900" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1600" height="900" fill="#f8fbff"/>
  <rect x="72" y="72" width="1456" height="756" rx="36" fill="${warm}"/>
  <rect x="150" y="150" width="620" height="500" rx="28" fill="#ffffff"/>
  <rect x="210" y="220" width="430" height="26" rx="13" fill="${accent}"/>
  <rect x="210" y="284" width="500" height="18" rx="9" fill="#93acc8"/>
  <rect x="210" y="332" width="380" height="18" rx="9" fill="#c8d7e8"/>
  <rect x="210" y="420" width="500" height="92" rx="22" fill="${accent}"/>
  <rect x="860" y="180" width="520" height="520" rx="260" fill="#ffffff" fill-opacity="0.66"/>
  <path d="M1040 432h160m-80-80v160" stroke="${accent}" stroke-width="44" stroke-linecap="round"/>
  <text x="148" y="780" fill="${accent}" font-family="Georgia, serif" font-size="48" font-weight="700">${title}</text>
</svg>
`;
  await mkdir("public/blog", { recursive: true });
  await writeFile(`public/blog/${article.slug}.svg`, svg);
}

async function callOpenAI(article, guides, existingSource) {
  const apiKey = requireEnv("OPENAI_API_KEY");
  const prompt = `You are publishing a tax article for a Next.js site.

Use the writing guides below from A to Z. Do not mention the guides, prompts, metrics, or automation.
Write naturally, not "optimised sounding". Produce rich, precise, source-aware prose.

Article title: ${article.title}
Category: ${article.category}
Target length: 1200-1500 words.

Return ONLY valid JSON with these keys:
description: string under 170 chars
readingTime: string
tags: string[]
markdown: full markdown article with H1, H2s, practical examples, internal links, source-aware caveats, and FAQ section
faqs: array of 5 objects with question and answer
internalLinks: array of 3 objects with label and url
references: array of 3-5 objects with label and url

Existing site source excerpt for link style:
${existingSource.slice(0, 8000)}

Writing guides:
${guides}`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: openAiModel,
      messages: [
        {
          role: "system",
          content: "Return valid JSON only. No markdown fence. No commentary."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    })
  });

  if (!response.ok) {
    throw new Error(`OpenAI request failed: ${response.status} ${await response.text()}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("OpenAI response did not include article content.");
  }

  return JSON.parse(content);
}

async function main() {
  const blogPostsPath = "src/content/blog-posts.ts";
  const overridesPath = "src/content/blog-markdown-overrides.ts";
  let blogPostsSource = await readFile(blogPostsPath, "utf8");
  let overridesSource = await readFile(overridesPath, "utf8");
  const existingSlugs = extractExistingSlugs(blogPostsSource);
  const nextArticles = getNextArticles(existingSlugs);

  if (nextArticles.length === 0) {
    console.log("No queued articles left to publish.");
    return;
  }

  const guides = await readGuides();
  const published = [];

  for (const [index, article] of nextArticles.entries()) {
    const generated = await callOpenAI(article, guides, blogPostsSource);
    blogPostsSource = insertBeforeArrayEnd(blogPostsSource, buildPostObject(article, generated, index));
    overridesSource = insertMarkdownOverride(overridesSource, article.slug, generated.markdown);
    await writeFeaturedImage(article);
    published.push(`${siteUrl}/blog/${article.slug}`);
  }

  await writeFile(blogPostsPath, blogPostsSource);
  await writeFile(overridesPath, overridesSource);
  await writeFile("published-urls.txt", `${published.join("\n")}\n`);
  console.log(`Published draft files for ${published.length} article(s):\n${published.join("\n")}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
