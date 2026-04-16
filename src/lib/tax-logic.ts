import type { NigeriaZeroTaxInput, UkFigEligibilityInput } from "@/lib/schemas";

const NIGERIA_ZERO_CIT_THRESHOLD = 100_000_000;
const UK_FIG_TRANSITION_START = new Date(Date.UTC(2026, 3, 6));

export interface NigeriaAuditResult {
  status: "eligible" | "levy-applicable" | "ineligible-no-levy";
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

  const isLevyApplicable = input.annualTurnover > NIGERIA_ZERO_CIT_THRESHOLD;
  if (!isLevyApplicable) {
    return {
      status: "ineligible-no-levy",
      message: "Not eligible for 0% CIT under this model (sector test failed).",
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
  arrivalDate: string;
  qualifyingEndDate: string | null;
  nonResidentYearsCount: number;
  isPostAbolitionArrival: boolean;
}

function parseDateOnly(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  const isValid =
    parsed.getUTCFullYear() === year &&
    parsed.getUTCMonth() === month - 1 &&
    parsed.getUTCDate() === day;

  return isValid ? parsed : null;
}

function formatDateOnly(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addUtcYears(date: Date, years: number): Date {
  const cloned = new Date(date);
  cloned.setUTCFullYear(cloned.getUTCFullYear() + years);
  return cloned;
}

export function calculateUkFigEligibility(input: UkFigEligibilityInput): UkFigResult {
  const arrivalDate = parseDateOnly(input.arrivalDate);
  if (!arrivalDate) {
    return {
      status: "ineligible",
      message: "Relief not granted. Enter a valid arrival date.",
      arrivalDate: input.arrivalDate,
      qualifyingEndDate: null,
      nonResidentYearsCount: 0,
      isPostAbolitionArrival: false
    };
  }

  const isPostAbolitionArrival = arrivalDate >= UK_FIG_TRANSITION_START;
  const wasNonResidentForTenYears = input.residencyHistory.every((entry) => entry === false);
  const nonResidentYearsCount = input.residencyHistory.filter((entry) => entry === false).length;

  if (isPostAbolitionArrival && wasNonResidentForTenYears) {
    const expiry = addUtcYears(arrivalDate, 4);
    expiry.setUTCDate(expiry.getUTCDate() - 1);

    return {
      status: "eligible",
      message: "4-Year FIG Relief granted.",
      arrivalDate: formatDateOnly(arrivalDate),
      qualifyingEndDate: formatDateOnly(expiry),
      nonResidentYearsCount,
      isPostAbolitionArrival
    };
  }

  return {
    status: "ineligible",
    message:
      "Relief not granted. The tool requires a post-6 April 2026 arrival and 10 consecutive non-resident years before arrival.",
    arrivalDate: formatDateOnly(arrivalDate),
    qualifyingEndDate: null,
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

export function formatDateForDisplay(dateInput: string): string {
  const dateOnly = parseDateOnly(dateInput);
  if (dateOnly) {
    return new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC"
    }).format(dateOnly);
  }

  const parsed = new Date(dateInput);
  if (Number.isNaN(parsed.getTime())) {
    return dateInput;
  }

  return new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC"
  }).format(parsed);
}
