import { z } from "zod";

export const nigeriaSectors = [
  "Agriculture",
  "Technology",
  "Manufacturing",
  "Trade and Distribution",
  "Creative Industries",
  "Professional Services"
] as const;

export const nigeriaZeroTaxSchema = z.object({
  annualTurnover: z.coerce
    .number({ invalid_type_error: "Annual turnover must be a number." })
    .min(0, "Annual turnover cannot be negative."),
  assetValue: z.coerce
    .number({ invalid_type_error: "Asset value must be a number." })
    .min(0, "Asset value cannot be negative."),
  assessableProfit: z.coerce
    .number({ invalid_type_error: "Assessable profit must be a number." })
    .min(0, "Assessable profit cannot be negative."),
  sector: z.enum(nigeriaSectors, {
    errorMap: () => ({ message: "Please choose a valid business sector." })
  })
});

const ukResidencyHistorySchema = z.array(z.boolean()).length(10, "A full 10-year residency timeline is required.");

export const ukFigEligibilitySchema = z.object({
  arrivalDate: z
    .string()
    .min(1, "Arrival date is required.")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Enter a valid arrival date."),
  // Re-parse date parts in UTC to avoid local timezone drift for tax-date boundaries.
  residencyHistory: ukResidencyHistorySchema
}).superRefine((value, context) => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.arrivalDate);
  if (!match) {
    return;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  const isValid =
    parsed.getUTCFullYear() === year &&
    parsed.getUTCMonth() === month - 1 &&
    parsed.getUTCDate() === day;

  if (!isValid) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["arrivalDate"],
      message: "Enter a valid arrival date."
    });
  }
});

export type NigeriaZeroTaxInput = z.infer<typeof nigeriaZeroTaxSchema>;
export type UkFigEligibilityInput = z.infer<typeof ukFigEligibilitySchema>;
