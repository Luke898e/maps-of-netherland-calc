"use client";

import { useMemo, useState } from "react";
import { jsPDF } from "jspdf";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { nigeriaSectors, nigeriaZeroTaxSchema } from "@/lib/schemas";
import { calculateNigeriaZeroTaxAudit, formatCurrency, type NigeriaAuditResult } from "@/lib/tax-logic";

interface NigeriaZeroTaxAuditorFormState {
  annualTurnover: string;
  assetValue: string;
  assessableProfit: string;
  sector: (typeof nigeriaSectors)[number];
}

const initialFormState: NigeriaZeroTaxAuditorFormState = {
  annualTurnover: "",
  assetValue: "",
  assessableProfit: "",
  sector: "Agriculture"
};

export function NigeriaZeroTaxAuditorForm(): React.JSX.Element {
  const [formState, setFormState] = useState<NigeriaZeroTaxAuditorFormState>(initialFormState);
  const [result, setResult] = useState<NigeriaAuditResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const turnoverDisplay = useMemo(() => {
    if (!result) {
      return "";
    }
    return formatCurrency(result.turnover);
  }, [result]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const parsed = nigeriaZeroTaxSchema.safeParse(formState);
    if (!parsed.success) {
      const flattened = parsed.error.flatten().fieldErrors;
      setErrors({
        annualTurnover: flattened.annualTurnover?.[0] ?? "",
        assetValue: flattened.assetValue?.[0] ?? "",
        assessableProfit: flattened.assessableProfit?.[0] ?? "",
        sector: flattened.sector?.[0] ?? ""
      });
      setResult(null);
      return;
    }

    setErrors({});
    setResult(calculateNigeriaZeroTaxAudit(parsed.data));
  };

  const downloadPdfReport = (): void => {
    if (!result) {
      return;
    }

    const pdf = new jsPDF();
    const lines = [
      "2026 Nigeria Zero-Tax Auditor",
      "-----------------------------------------",
      `Result: ${result.message}`,
      `Annual Turnover: ${formatCurrency(result.turnover)}`,
      `Asset Value: ${formatCurrency(result.assetValue)}`,
      `Assessable Profit: ${formatCurrency(result.assessableProfit)}`,
      `Business Sector: ${formState.sector}`,
      `Development Levy: ${formatCurrency(result.developmentLevy)}`,
      "Levy Rule: 4% is applied only where annual turnover exceeds NGN 100,000,000.",
      "Use qualified tax advice before filing."
    ];

    let cursor = 20;
    pdf.setFontSize(14);
    for (const line of lines) {
      const wrapped = pdf.splitTextToSize(line, 170);
      pdf.text(wrapped, 20, cursor);
      cursor += wrapped.length * 7;
    }

    pdf.save("nigeria-zero-tax-audit-2026.pdf");
  };

  return (
    <Card className="border-[#d4e3f8]">
      <CardHeader>
        <CardTitle className="text-2xl text-[#0f3364]">2026 Nigeria Zero-Tax Auditor</CardTitle>
        <CardDescription>
          Enter turnover, asset value, assessable profit, and business sector to run the 2026 screening logic and
          generate an exportable advisory report.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <div className="space-y-2">
            <Label htmlFor="annualTurnover">Annual Turnover (NGN)</Label>
            <Input
              id="annualTurnover"
              name="annualTurnover"
              inputMode="decimal"
              value={formState.annualTurnover}
              onChange={(event) => setFormState((prev) => ({ ...prev, annualTurnover: event.target.value }))}
              placeholder="100000000"
              aria-invalid={Boolean(errors.annualTurnover)}
              aria-describedby={errors.annualTurnover ? "annualTurnover-error" : undefined}
            />
            {errors.annualTurnover ? (
              <p id="annualTurnover-error" className="text-sm text-[#b54747]">
                {errors.annualTurnover}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="assetValue">Asset Value (NGN)</Label>
            <Input
              id="assetValue"
              name="assetValue"
              inputMode="decimal"
              value={formState.assetValue}
              onChange={(event) => setFormState((prev) => ({ ...prev, assetValue: event.target.value }))}
              placeholder="25000000"
              aria-invalid={Boolean(errors.assetValue)}
              aria-describedby={errors.assetValue ? "assetValue-error" : undefined}
            />
            {errors.assetValue ? (
              <p id="assetValue-error" className="text-sm text-[#b54747]">
                {errors.assetValue}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="assessableProfit">Assessable Profit (NGN)</Label>
            <Input
              id="assessableProfit"
              name="assessableProfit"
              inputMode="decimal"
              value={formState.assessableProfit}
              onChange={(event) => setFormState((prev) => ({ ...prev, assessableProfit: event.target.value }))}
              placeholder="12000000"
              aria-invalid={Boolean(errors.assessableProfit)}
              aria-describedby={errors.assessableProfit ? "assessableProfit-error" : undefined}
            />
            {errors.assessableProfit ? (
              <p id="assessableProfit-error" className="text-sm text-[#b54747]">
                {errors.assessableProfit}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="sector">Business Sector</Label>
            <select
              id="sector"
              name="sector"
              value={formState.sector}
              onChange={(event) =>
                setFormState((prev) => ({
                  ...prev,
                  sector: event.target.value as (typeof nigeriaSectors)[number]
                }))
              }
              className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              aria-invalid={Boolean(errors.sector)}
              aria-describedby={errors.sector ? "sector-error" : undefined}
            >
              {nigeriaSectors.map((sector) => (
                <option key={sector} value={sector}>
                  {sector}
                </option>
              ))}
            </select>
            {errors.sector ? (
              <p id="sector-error" className="text-sm text-[#b54747]">
                {errors.sector}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button type="submit" className="w-full justify-center bg-[#144987] text-white hover:bg-[#103c70] sm:w-auto">
              Run 2026 Audit
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={downloadPdfReport}
              disabled={!result}
              className="w-full justify-center sm:w-auto"
            >
              <Download className="h-4 w-4" />
              Download PDF Report
            </Button>
          </div>
        </form>

        {result ? (
          <div className="rounded-lg border border-[#ccddf7] bg-[#f5f9ff] p-4">
            <p className="text-sm uppercase tracking-[0.12em] text-[#3f5c84]">Audit Outcome</p>
            <p className="mt-2 text-xl font-semibold text-[#102e59]">{result.message}</p>
            <ul className="mt-4 space-y-2 text-sm text-[#1f3654]">
              <li>
                <span className="font-medium">Annual Turnover:</span> {turnoverDisplay}
              </li>
              <li>
                <span className="font-medium">Development Levy (4%):</span> {formatCurrency(result.developmentLevy)}
              </li>
              <li>
                <span className="font-medium">Assessable Profit (Input):</span> {formatCurrency(result.assessableProfit)}
              </li>
              <li>
                <span className="font-medium">Compliance Note:</span> Levy is applied at 4% only when turnover exceeds
                NGN 100,000,000.
              </li>
            </ul>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
