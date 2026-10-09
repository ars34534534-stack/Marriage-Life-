
import { ID, Query } from 'appwrite';
import { tablesDB, DATABASE_ID, TABLES } from './database.js';

export const PREMIUM_PLANS = [
  { id: '7days', days: 7, price: 490 },
  { id: '15days', days: 15, price: 750 },
  { id: '30days', days: 30, price: 1000 }
];

// Premium ادائیگی کی درخواست جمع کریں
export async function submitPayment({
  userId,
  planId,
  method,
  transactionId,
  paymentNumber
}) {
  const plan = PREMIUM_PLANS.find(item => item.id === planId);

  if (!userId || !plan || !method || !transactionId?.trim()) {
    throw new Error('Please complete all payment details.');
  }

  return tablesDB.createRow({
    databaseId: DATABASE_ID,
    tableId: TABLES.payments,
    rowId: ID.unique(),
    data: {
      userId,
      planId,
      days: plan.days,
      amount: plan.price,
      method,
      transactionId: transactionId.trim(),
      paymentNumber: paymentNumber || '',
      status: 'pending'
    }
  });
}

// صارف اپنی ادائیگی کی درخواستیں دیکھے
export async function getMyPayments(userId) {
  if (!userId) {
    throw new Error('User ID is required.');
  }

  const result = await tablesDB.listRows({
    databaseId: DATABASE_ID,
    tableId: TABLES.payments,
    queries: [
      Query.equal('userId', userId),
      Query.orderDesc('$createdAt'),
      Query.limit(50)
    ]
  });

  return result.rows || [];
}
