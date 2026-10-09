
import { ID, Query } from 'appwrite';
import { databases, DATABASE_ID, TABLES } from './database.js';

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

  return databases.createDocument({
    databaseId: DATABASE_ID,
    collectionId: TABLES.interests,
    documentId: ID.unique(),
    data: {
      senderId,
      receiverId,
      message,
      status: 'pending'
    }
  });
}

// اپنی موصول ہونے والی دلچسپیاں دیکھیں
export async function getReceivedInterests(userId) {
  if (!userId) {
    throw new Error('User ID is required.');
  }

  const result = await databases.listDocuments({
    databaseId: DATABASE_ID,
    collectionId: TABLES.interests,
    queries: [
      Query.equal('receiverId', userId),
      Query.orderDesc('$createdAt'),
      Query.limit(50)
    ]
  });

  return result.documents;
}

// رشتہ قبول یا مسترد کریں
export async function respondToInterest(documentId, status) {
  if (!['accepted', 'rejected'].includes(status)) {
    throw new Error('Invalid interest status.');
  }

  return databases.updateDocument({
    databaseId: DATABASE_ID,
    collectionId: TABLES.interests,
    documentId,
    data: { status }
  });
    }
