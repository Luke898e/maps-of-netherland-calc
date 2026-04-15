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
    .refine((value) => !Number.isNaN(new Date(value).getTime()), "Enter a valid arrival date."),
  residencyHistory: ukResidencyHistorySchema
});

export type NigeriaZeroTaxInput = z.infer<typeof nigeriaZeroTaxSchema>;
export type UkFigEligibilityInput = z.infer<typeof ukFigEligibilitySchema>;
