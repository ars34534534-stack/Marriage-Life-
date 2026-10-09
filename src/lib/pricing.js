
export const PREMIUM_PLANS = [
  { id: 'premium_7d', days: 7 },
  { id: 'premium_15d', days: 15 },
  { id: 'premium_30d', days: 30 }
];

export const COUNTRY_PRICING = {
  PK: { name: 'Pakistan', currency: 'PKR', prices: [299, 499, 799] },
  IN: { name: 'India', currency: 'INR', prices: [149, 249, 399] },
  OM: { name: 'Oman', currency: 'OMR', prices: [1.49, 2.49, 3.99] },
  AE: { name: 'UAE / Dubai', currency: 'AED', prices: [14.99, 24.99, 39.99] },
  SA: { name: 'Saudi Arabia', currency: 'SAR', prices: [14.99, 24.99, 39.99] },
  QA: { name: 'Qatar', currency: 'QAR', prices: [14.99, 24.99, 39.99] },
  KW: { name: 'Kuwait', currency: 'KWD', prices: [1.25, 2.00, 3.25] },
  BH: { name: 'Bahrain', currency: 'BHD', prices: [1.49, 2.49, 3.99] },
  GB: { name: 'United Kingdom', currency: 'GBP', prices: [2.49, 3.99, 5.99] },
  US: { name: 'United States', currency: 'USD', prices: [2.99, 4.99, 7.99] },
  CA: { name: 'Canada', currency: 'CAD', prices: [3.99, 6.49, 9.99] },
  EU: { name: 'Europe', currency: 'EUR', prices: [2.99, 4.99, 7.99] }
};

export function getCountryPricing(countryCode = 'OM') {
  return COUNTRY_PRICING[countryCode] || COUNTRY_PRICING.OM;
}

export function getPlanPrice(countryCode, days) {
  const country = getCountryPricing(countryCode);
  const index = PREMIUM_PLANS.findIndex(plan => plan.days === Number(days));

  if (index === -1) {
    throw new Error('Invalid Premium plan duration.');
  }

  return {
    ...PREMIUM_PLANS[index],
    country: countryCode in COUNTRY_PRICING ? countryCode : 'OM',
    currency: country.currency,
    amount: country.prices[index]
  };
}
