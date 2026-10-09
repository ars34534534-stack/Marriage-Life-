
import { ID, Query } from 'appwrite';
import { tablesDB, DATABASE_ID, TABLES } from './database.js';

// کسی پروفائل کو رشتہ بھیجیں
export async function sendInterest({
  senderId,
  receiverId,
  message = ''
}) {
  if (!senderId || !receiverId) {
    throw new Error('Sender and receiver are required.');
  }

  if (senderId === receiverId) {
    throw new Error('You cannot send interest to your own profile.');
  }

  return tablesDB.createRow({
    databaseId: DATABASE_ID,
    tableId: TABLES.interests,
    rowId: ID.unique(),
    data: {
      senderId,
      receiverId,
      message,
      status: 'pending'
    }
  });
}

// موصول ہونے والی دلچسپیاں دیکھیں
export async function getReceivedInterests(userId) {
  if (!userId) {
    throw new Error('User ID is required.');
  }

  const result = await tablesDB.listRows({
    databaseId: DATABASE_ID,
    tableId: TABLES.interests,
    queries: [
      Query.equal('receiverId', userId),
      Query.orderDesc('$createdAt'),
      Query.limit(50)
    ]
  });

  return result.rows || [];
}

// رشتہ قبول یا مسترد کریں
export async function respondToInterest(rowId, status) {
  if (!['accepted', 'rejected'].includes(status)) {
    throw new Error('Invalid interest status.');
  }

  return tablesDB.updateRow({
    databaseId: DATABASE_ID,
    tableId: TABLES.interests,
    rowId,
    data: { status }
  });
    }
