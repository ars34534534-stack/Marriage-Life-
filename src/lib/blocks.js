
import { ID, Query } from 'appwrite';
import { databases, DATABASE_ID, TABLES } from './database.js';

// کسی صارف کو بلاک کریں
export async function blockUser(blockerId, blockedId) {
  if (!blockerId || !blockedId || blockerId === blockedId) {
    throw new Error('Please provide two different user IDs.');
  }

  return databases.createDocument({
    databaseId: DATABASE_ID,
    collectionId: TABLES.blocks,
    documentId: ID.unique(),
    data: {
      blockerId,
      blockedId
    }
  });
}

// اپنی بلاک لسٹ دیکھیں
export async function getBlockedUsers(userId) {
  if (!userId) {
    throw new Error('User ID is required.');
  }

  const result = await databases.listDocuments({
    databaseId: DATABASE_ID,
    collectionId: TABLES.blocks,
    queries: [
      Query.equal('blockerId', userId),
      Query.limit(100)
    ]
  });

  return result.documents;
}

// بلاک ختم کریں
export async function unblockUser(documentId) {
  return databases.deleteDocument({
    databaseId: DATABASE_ID,
    collectionId: TABLES.blocks,
    documentId
  });
}
