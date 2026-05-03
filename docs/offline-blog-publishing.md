# Offline Blog Publishing

The site publishes blog articles while the local computer is off through GitHub Actions:

- Workflow: `.github/workflows/daily-blog-publish.yml`
- Generator: `scripts/publish-daily-articles.mjs`
- Writing guide text: `automation-guides/*.txt`

The workflow runs twice daily:

- `08:35 UTC` / `09:35 Africa/Lagos`
- `11:35 UTC` / `12:35 Africa/Lagos`

Each run publishes one next queued article, commits it to `main`, pushes it, and polls the production URL until the article is live on `https://map-of-netherlands.co.uk`.

## Required GitHub Secret

Add this repository secret before relying on scheduled publishing:

- `OPENAI_API_KEY`: API key used by the article generator.

Optional repository variable:

- `OPENAI_MODEL`: defaults to `gpt-4.1` if unset.

## Guide Maintenance

The cloud runner cannot read PDFs stored only on the local computer. The three writing guides were extracted to text files in `automation-guides/` so the scheduled workflow can apply them without the computer being on.

If a PDF changes, regenerate the matching text file and commit it before the next scheduled run.
