
import { ID, Query } from 'appwrite';
import { databases, DATABASE_ID, TABLES } from './database.js';

// کسی پروفائل کی شکایت درج کریں
export async function submitReport({
  reporterId,
  reportedUserId,
  reason,
  details = ''
}) {
  if (!reporterId || !reportedUserId || !reason) {
    throw new Error('Please provide the required report details.');
  }

  if (reporterId === reportedUserId) {
    throw new Error('You cannot report your own profile.');
  }

  return databases.createDocument({
    databaseId: DATABASE_ID,
    collectionId: TABLES.reports,
    documentId: ID.unique(),
    data: {
      reporterId,
      reportedUserId,
      reason,
      details,
      status: 'pending'
    }
  });
}

// شکایت کنندہ اپنی جمع کردہ شکایات دیکھے
export async function getMyReports(userId) {
  if (!userId) {
    throw new Error('User ID is required.');
  }

  const result = await databases.listDocuments({
    databaseId: DATABASE_ID,
    collectionId: TABLES.reports,
    queries: [
      Query.equal('reporterId', userId),
      Query.orderDesc('$createdAt'),
      Query.limit(50)
    ]
  });

  return result.documents;
}
