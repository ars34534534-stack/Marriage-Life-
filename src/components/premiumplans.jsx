
import React, { useState } from 'react';

const pricing = {
  PK: { name: 'Pakistan', currency: 'PKR', prices: [299, 499, 799] },
  IN: { name: 'India', currency: 'INR', prices: [149, 249, 399] },
  OM: { name: 'Oman', currency: 'OMR', prices: [1.49, 2.49, 3.99] },
  AE: { name: 'UAE', currency: 'AED', prices: [14.99, 24.99, 39.99] },
  SA: { name: 'Saudi Arabia', currency: 'SAR', prices: [14.99, 24.99, 39.99] },
  QA: { name: 'Qatar', currency: 'QAR', prices: [14.99, 24.99, 39.99] },
  KW: { name: 'Kuwait', currency: 'KWD', prices: [1.25, 2.00, 3.25] },
  BH: { name: 'Bahrain', currency: 'BHD', prices: [1.49, 2.49, 3.99] },
  GB: { name: 'United Kingdom', currency: 'GBP', prices: [2.49, 3.99, 5.99] },
  US: { name: 'United States', currency: 'USD', prices: [2.99, 4.99, 7.99] },
  CA: { name: 'Canada', currency: 'CAD', prices: [3.99, 6.49, 9.99] },
  EU: { name: 'Europe', currency: 'EUR', prices: [2.99, 4.99, 7.99] }
};

const durations = [7, 15, 30];

export default function PremiumPlans({
  initialCountry = 'OM',
  onSelectPlan
}) {
  const [country, setCountry] = useState(initialCountry);
  const [selectedDays, setSelectedDays] = useState(30);

  const config = pricing[country] || pricing.OM;
  const priceIndex = durations.indexOf(selectedDays);
  const amount = config.prices[priceIndex];

  function continuePayment() {
    if (!onSelectPlan) {
      alert('Payment system will be connected in the next step.');
      return;
    }

    onSelectPlan({
      country,
      currency: config.currency,
      planId: `premium_${selectedDays}d`,
      days: selectedDays,
      amount
    });
  }

  return (
    <section className="premium-section">
      <h2>Marriage Life Premium 💎</h2>
      <p>Choose your country and membership plan.</p>

      <label>
        Select Country
        <select
          value={country}
          onChange={e => setCountry(e.target.value)}
        >
          {Object.entries(pricing).map(([code, item]) => (
            <option key={code} value={code}>
              {item.name}
            </option>
          ))}
        </select>
      </label>

      <div className="premium-grid">
        {durations.map((days, index) => (
          <article
            key={days}
            className={
              selectedDays === days
                ? 'premium-card selected'
                : 'premium-card'
            }
          >
            <h3>{days} Days</h3>

            <p className="premium-price">
              {new Intl.NumberFormat('en', {
                style: 'currency',
                currency: config.currency
              }).format(config.prices[index])}
            </p>

            <button
              type="button"
              onClick={() => setSelectedDays(days)}
            >
              {selectedDays === days ? 'Selected ✓' : 'Choose Plan'}
            </button>
          </article>
        ))}
      </div>

      <button type="button" onClick={continuePayment}>
        Continue to Payment
      </button>

      <p className="premium-note">
        Membership activates after payment verification.
      </p>
    </section>
  );
  }
      
