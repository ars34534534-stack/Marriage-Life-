
import { ID, Query } from 'appwrite';
import { tablesDB, DATABASE_ID, TABLES } from './database.js';

// کسی پروفائل کی رپورٹ کریں
export async function reportUser({
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

  return tablesDB.createRow({
    databaseId: DATABASE_ID,
    tableId: TABLES.reports,
    rowId: ID.unique(),
    data: {
      reporterId,
      reportedUserId,
      reason,
      details,
      status: 'pending'
    }
  });
}

// اپنی بھیجی ہوئی رپورٹس دیکھیں
export async function getMyReports(reporterId) {
  if (!reporterId) {
    throw new Error('User ID is required.');
  }

  const result = await tablesDB.listRows({
    databaseId: DATABASE_ID,
    tableId: TABLES.reports,
    queries: [
      Query.equal('reporterId', reporterId),
      Query.orderDesc('$createdAt'),
      Query.limit(50)
    ]
  });

  return result.rows || [];
}
