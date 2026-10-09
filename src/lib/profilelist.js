
import { Query } from 'appwrite';
import { databases, DATABASE_ID, TABLES } from './database.js';

// تمام دستیاب پروفائلز حاصل کریں
export async function getProfiles() {
  const result = await databases.listDocuments({
    databaseId: DATABASE_ID,
    collectionId: TABLES.profiles,
    queries: [
      Query.orderDesc('$createdAt'),
      Query.limit(100)
    ]
  });

  return result.documents;
}

// کسی ایک پروفائل کو حاصل کریں
export async function getProfileById(documentId) {
  if (!documentId) {
    throw new Error('Profile ID is required.');
  }

  return databases.getDocument({
    databaseId: DATABASE_ID,
    collectionId: TABLES.profiles,
    documentId
  });
}
