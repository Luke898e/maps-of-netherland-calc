"use client";

import { useMemo, useState } from "react";
import { jsPDF } from "jspdf";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ukFigEligibilitySchema } from "@/lib/schemas";
import { calculateUkFigEligibility, formatDateForDisplay, type UkFigResult } from "@/lib/tax-logic";

const TRANSITION_START_DISPLAY = "6 April 2026";

function buildTimelineYears(arrivalDate: string): number[] {
  const anchorYear = arrivalDate ? new Date(arrivalDate).getFullYear() : 2026;
  return Array.from({ length: 10 }, (_, index) => anchorYear - 10 + index);
}

export function UkFigRegimeToolForm(): React.JSX.Element {
  const [arrivalDate, setArrivalDate] = useState<string>("");
  const [residencyHistory, setResidencyHistory] = useState<boolean[]>(Array.from({ length: 10 }, () => false));
  const [error, setError] = useState<string>("");
  const [result, setResult] = useState<UkFigResult | null>(null);

  const timelineYears = useMemo(() => buildTimelineYears(arrivalDate), [arrivalDate]);

  const handleResidencyChange = (index: number, wasResident: boolean): void => {
    setResidencyHistory((previous) => {
      const next = [...previous];
      next[index] = wasResident;
      return next;
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const parsed = ukFigEligibilitySchema.safeParse({
      arrivalDate,
      residencyHistory
    });

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please fix the highlighted data.");
      setResult(null);
      return;
    }

    setError("");
    setResult(calculateUkFigEligibility(parsed.data));
  };

  const downloadPdfReport = (): void => {
    if (!result) {
      return;
    }

    const pdf = new jsPDF();
    const rows = [
      "2026 UK FIG Regime Eligibility Tool",
      "-----------------------------------------",
      `Result: ${result.message}`,
      `Arrival Date: ${formatDateForDisplay(result.arrivalDateIso)}`,
      `Post-Abolition Arrival (>= 6 April 2026): ${result.isPostAbolitionArrival ? "Yes" : "No"}`,
      `Non-Resident Years in Timeline: ${result.nonResidentYearsCount}/10`,
      `FIG Relief Expiry: ${result.qualifyingEndDateIso ? formatDateForDisplay(result.qualifyingEndDateIso) : "N/A"}`,
      "Reminder: Confirm HMRC treatment and treaty interactions with a qualified adviser."
    ];

    let cursor = 20;
    pdf.setFontSize(14);
    for (const row of rows) {
      const wrapped = pdf.splitTextToSize(row, 170);
      pdf.text(wrapped, 20, cursor);
      cursor += wrapped.length * 7;
    }

    pdf.save("uk-fig-eligibility-2026.pdf");
  };

  return (
    <Card className="border-[#d4e3f8]">
      <CardHeader>
        <CardTitle className="text-2xl text-[#0f3364]">2026 UK FIG Regime Eligibility Tool</CardTitle>
        <CardDescription>
          Assess 4-Year FIG relief eligibility under the post-Non-Dom framework effective from {TRANSITION_START_DISPLAY}
          .
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="space-y-2">
            <Label htmlFor="arrivalDate">UK Arrival Date</Label>
            <Input
              id="arrivalDate"
              name="arrivalDate"
              type="date"
              value={arrivalDate}
              onChange={(event) => setArrivalDate(event.target.value)}
            />
          </div>

          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-foreground">Previous 10-Year UK Residency Timeline</legend>
            <p className="text-sm text-muted-foreground">
              Mark each year as Resident or Non-Resident. Relief requires 10 consecutive Non-Resident years.
            </p>
            <div className="space-y-2">
              {timelineYears.map((year, index) => {
                const isResident = residencyHistory[index];
                return (
                  <div
                    key={year}
                    className="flex flex-col gap-2 rounded-md border border-[#dbe7f8] bg-[#f7faff] p-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <p className="text-sm font-medium text-[#173e73]">{year}</p>
                    <div className="grid w-full grid-cols-2 gap-2 sm:w-auto sm:grid-cols-none sm:flex">
                      <Button
                        type="button"
                        size="sm"
                        variant={isResident ? "default" : "outline"}
                        className={`${isResident ? "bg-[#12447d] text-white hover:bg-[#0f3968]" : ""} w-full justify-center`}
                        onClick={() => handleResidencyChange(index, true)}
                      >
                        Resident
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant={!isResident ? "default" : "outline"}
                        className={`${!isResident ? "bg-[#1f6dc8] text-white hover:bg-[#1a5daf]" : ""} w-full justify-center`}
                        onClick={() => handleResidencyChange(index, false)}
                      >
                        Non-Resident
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </fieldset>

          {error ? <p className="text-sm text-[#b54747]">{error}</p> : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button
              type="submit"
              className="w-full justify-center bg-[#144987] text-white hover:bg-[#103c70] sm:w-auto"
            >
              Evaluate FIG Eligibility
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
            <p className="text-sm uppercase tracking-[0.12em] text-[#3f5c84]">Eligibility Outcome</p>
            <p className="mt-2 text-xl font-semibold text-[#102e59]">{result.message}</p>
            <ul className="mt-4 space-y-2 text-sm text-[#1f3654]">
              <li>
                <span className="font-medium">Arrival Date:</span> {formatDateForDisplay(result.arrivalDateIso)}
              </li>
              <li>
                <span className="font-medium">Arrival on/after 6 April 2026:</span>{" "}
                {result.isPostAbolitionArrival ? "Yes" : "No"}
              </li>
              <li>
                <span className="font-medium">Non-Resident Years:</span> {result.nonResidentYearsCount} / 10
              </li>
              <li>
                <span className="font-medium">4-Year FIG Relief Ends:</span>{" "}
                {result.qualifyingEndDateIso ? formatDateForDisplay(result.qualifyingEndDateIso) : "Not applicable"}
              </li>
            </ul>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
