import type { NigeriaZeroTaxInput, UkFigEligibilityInput } from "@/lib/schemas";

const NIGERIA_ZERO_CIT_THRESHOLD = 100_000_000;
const UK_FIG_TRANSITION_START = new Date("2026-04-06T00:00:00.000Z");

export interface NigeriaAuditResult {
  status: "eligible" | "levy-applicable";
  message: string;
  turnover: number;
  assetValue: number;
  developmentLevy: number;
  assessableProfit: number;
}

export function calculateNigeriaZeroTaxAudit(input: NigeriaZeroTaxInput): NigeriaAuditResult {
  const normalizedSector = input.sector.toLowerCase();
  const isProfessionalServices = normalizedSector === "professional services";
  const isEligibleForZeroCit = input.annualTurnover <= NIGERIA_ZERO_CIT_THRESHOLD && !isProfessionalServices;

  if (isEligibleForZeroCit) {
    return {
      status: "eligible",
      message: "ELIGIBLE FOR 0% CIT",
      turnover: input.annualTurnover,
      assetValue: input.assetValue,
      developmentLevy: 0,
      assessableProfit: input.assessableProfit
    };
  }

  const assessableProfit = input.assessableProfit;
  const developmentLevy = assessableProfit * 0.04;

  return {
    status: "levy-applicable",
    message: "Development Levy applies at 4% of assessable profit.",
    turnover: input.annualTurnover,
    assetValue: input.assetValue,
    developmentLevy,
    assessableProfit
  };
}

export interface UkFigResult {
  status: "eligible" | "ineligible";
  message: string;
  arrivalDateIso: string;
  qualifyingEndDateIso: string | null;
  nonResidentYearsCount: number;
  isPostAbolitionArrival: boolean;
}

function addYears(date: Date, years: number): Date {
  const cloned = new Date(date);
  cloned.setFullYear(cloned.getFullYear() + years);
  return cloned;
}

export function calculateUkFigEligibility(input: UkFigEligibilityInput): UkFigResult {
  const arrivalDate = new Date(input.arrivalDate);
  const isPostAbolitionArrival = arrivalDate >= UK_FIG_TRANSITION_START;
  const wasNonResidentForTenYears = input.residencyHistory.every((entry) => entry === false);
  const nonResidentYearsCount = input.residencyHistory.filter((entry) => entry === false).length;

  if (isPostAbolitionArrival && wasNonResidentForTenYears) {
    const expiry = addYears(arrivalDate, 4);
    expiry.setDate(expiry.getDate() - 1);

    return {
      status: "eligible",
      message: "4-Year FIG Relief granted.",
      arrivalDateIso: arrivalDate.toISOString(),
      qualifyingEndDateIso: expiry.toISOString(),
      nonResidentYearsCount,
      isPostAbolitionArrival
    };
  }

  return {
    status: "ineligible",
    message:
      "Relief not granted. The tool requires a post-6 April 2026 arrival and 10 consecutive non-resident years before arrival.",
    arrivalDateIso: arrivalDate.toISOString(),
    qualifyingEndDateIso: null,
    nonResidentYearsCount,
    isPostAbolitionArrival
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 2
  }).format(amount);
}

export function formatDateForDisplay(dateIso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(new Date(dateIso));
}
