
import { ID, Query } from 'appwrite';
import { databases, DATABASE_ID, TABLES } from './database.js';

// Selfie verification کی درخواست جمع کریں
export async function submitVerification({
  userId,
  photoFileId
}) {
  if (!userId || !photoFileId) {
    throw new Error('User ID and selfie file ID are required.');
  }

  return databases.createDocument({
    databaseId: DATABASE_ID,
    collectionId: TABLES.verifications,
    documentId: ID.unique(),
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

  const result = await databases.listDocuments({
    databaseId: DATABASE_ID,
    collectionId: TABLES.verifications,
    queries: [
      Query.equal('userId', userId),
      Query.orderDesc('$createdAt'),
      Query.limit(1)
    ]
  });

  return result.documents[0] || null;
}
