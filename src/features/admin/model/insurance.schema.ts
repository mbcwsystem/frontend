import { z } from 'zod';

export const insuranceRateSchema = z.object({
  health_rate: z.number().min(0).max(100),
  care_rate: z.number().min(0).max(100),
  employment_rate: z.number().min(0).max(100),
  pension_rate: z.number().min(0).max(100),
});

export type InsuranceRateFormValues = z.infer<typeof insuranceRateSchema>;

export interface InsuranceRateFieldConfig {
  key: keyof InsuranceRateFormValues;
  label: string;
  hint: string;
}

export const INSURANCE_RATE_FIELDS: InsuranceRateFieldConfig[] = [
  { key: 'health_rate', label: '건강보험', hint: '근로자 부담률' },
  { key: 'care_rate', label: '장기요양보험', hint: '건강보험료의 %' },
  { key: 'employment_rate', label: '고용보험', hint: '근로자 부담률' },
  { key: 'pension_rate', label: '국민연금', hint: '근로자 부담률' },
];
