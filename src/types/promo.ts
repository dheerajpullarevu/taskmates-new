export interface PromoCode {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minAmount?: number;
  maxDiscount?: number;
  validFrom: string;
  validUntil: string;
  usageLimit?: number;
  currentUsage: number;
  applicableCategories?: string[];
  description: string;
}

export interface AppliedPromo {
  code: string;
  originalAmount: number;
  discountAmount: number;
  finalAmount: number;
}