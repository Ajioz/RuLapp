// types/index.ts
export interface PredictionResult {
  rul_cycles: number;
  status: string;
  rul_days: number;
  rul_months: number;
  rul_years: number;
  explanation?: string; // Add this if SHAP is always returned
}
