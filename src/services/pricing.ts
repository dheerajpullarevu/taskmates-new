import { PromoCode, AppliedPromo } from '../types/promo';

interface PriceBreakdown {
  baseAmount: number;
  platformFee: number;
  gst: number;
  totalAmount: number;
  discountAmount?: number;
}

export const calculateTaskPricing = (
  baseAmount: number,
  quantity: number,
  category: string
): PriceBreakdown => {
  // Base price per unit based on category
  const categoryBasePrices: Record<string, number> = {
    'delivery': 100,
    'professional': 500,
    'online': 50,
    'specialized': 1000,
    'default': 200
  };

  const basePrice = categoryBasePrices[category] || categoryBasePrices.default;
  const calculatedBaseAmount = basePrice * quantity;

  // Apply quantity-based discounts
  let discountedAmount = calculatedBaseAmount;
  if (quantity >= 1000) {
    discountedAmount *= 0.8; // 20% off for 1000+ units
  } else if (quantity >= 500) {
    discountedAmount *= 0.85; // 15% off for 500+ units
  } else if (quantity >= 100) {
    discountedAmount *= 0.9; // 10% off for 100+ units
  }

  return calculateTotalAmount(discountedAmount);
};

export const calculateTotalAmount = (amount: number): PriceBreakdown => {
  const platformFeeRate = 0.10; // 10% platform fee
  const gstRate = 0.18; // 18% GST

  const platformFee = Math.round(amount * platformFeeRate);
  const subtotal = amount + platformFee;
  const gst = Math.round(subtotal * gstRate);
  const totalAmount = subtotal + gst;

  return {
    baseAmount: amount,
    platformFee,
    gst,
    totalAmount
  };
};

export const formatINR = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export const suggestPriceRange = (
  category: string,
  quantity: number
): { min: number; max: number; recommended: number } => {
  const basePrices: Record<string, { min: number; max: number }> = {
    'delivery': { min: 80, max: 150 },
    'professional': { min: 400, max: 800 },
    'online': { min: 30, max: 100 },
    'specialized': { min: 800, max: 2000 },
    'default': { min: 150, max: 300 }
  };

  const { min, max } = basePrices[category] || basePrices.default;
  
  // Apply quantity-based adjustments
  const quantityFactor = Math.max(0.7, 1 - (Math.log10(quantity) * 0.1));
  const adjustedMin = Math.round(min * quantityFactor);
  const adjustedMax = Math.round(max * quantityFactor);
  const recommended = Math.round((adjustedMin + adjustedMax) / 2);

  return {
    min: adjustedMin,
    max: adjustedMax,
    recommended
  };
};

export const validateAndApplyPromoCode = async (
  code: string,
  amount: number,
  category?: string
): Promise<AppliedPromo | null> => {
  try {
    // In a real app, this would be an API call
    const promoCode: PromoCode = {
      code: 'WELCOME50',
      type: 'percentage',
      value: 50,
      minAmount: 1000,
      maxDiscount: 5000,
      validFrom: '2024-01-01',
      validUntil: '2024-12-31',
      currentUsage: 0,
      usageLimit: 1000,
      description: 'Get 50% off on your first task (up to ₹5000)'
    };

    // Validate promo code
    if (code !== promoCode.code) return null;
    if (new Date() < new Date(promoCode.validFrom) || new Date() > new Date(promoCode.validUntil)) return null;
    if (promoCode.usageLimit && promoCode.currentUsage >= promoCode.usageLimit) return null;
    if (promoCode.minAmount && amount < promoCode.minAmount) return null;
    if (promoCode.applicableCategories && category && !promoCode.applicableCategories.includes(category)) return null;

    // Calculate discount
    let discountAmount = promoCode.type === 'percentage' 
      ? (amount * promoCode.value / 100)
      : promoCode.value;

    // Apply max discount limit if exists
    if (promoCode.maxDiscount) {
      discountAmount = Math.min(discountAmount, promoCode.maxDiscount);
    }

    return {
      code: promoCode.code,
      originalAmount: amount,
      discountAmount: Math.round(discountAmount),
      finalAmount: Math.round(amount - discountAmount)
    };
  } catch (error) {
    console.error('Error validating promo code:', error);
    return null;
  }
};