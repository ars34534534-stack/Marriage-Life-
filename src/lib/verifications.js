
import { ID, Query } from 'appwrite';
import { tablesDB, DATABASE_ID, TABLES } from './database.js';

// Selfie verification کی درخواست جمع کریں
export async function submitVerification({
  userId,
  photoFileId
}) {
  if (!userId || !photoFileId) {
    throw new Error('User ID and selfie file ID are required.');
  }

  return tablesDB.createRow({
    databaseId: DATABASE_ID,
    tableId: TABLES.verifications,
    rowId: ID.unique(),
    data: {
      userId,
      photoFileId,
      status: 'pending',
      adminNote: ''
    }
  });
}

// صارف اپنی verification کا اسٹیٹس دیکھے
export async function getMyVerification(userId) {
  if (!userId) {
    throw new Error('User ID is required.');
  }

  const result = await tablesDB.listRows({
    databaseId: DATABASE_ID,
    tableId: TABLES.verifications,
    queries: [
      Query.equal('userId', userId),
      Query.orderDesc('$createdAt'),
      Query.limit(1)
    ]
  });

  return result.rows?.[0] || null;
}
