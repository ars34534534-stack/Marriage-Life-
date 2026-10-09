
import { Query } from 'appwrite';
import { tablesDB, DATABASE_ID, TABLES } from './database.js';

// تمام دستیاب پروفائلز حاصل کریں
export async function getProfiles() {
  const result = await tablesDB.listRows({
    databaseId: DATABASE_ID,
    tableId: TABLES.profiles,
    queries: [
      Query.limit(100)
    ]
  });

  return result.rows || [];
}

// ایک پروفائل ID کے ذریعے حاصل کریں
export async function getProfileById(rowId) {
  return tablesDB.getRow({
    databaseId: DATABASE_ID,
    tableId: TABLES.profiles,
    rowId
  });
}
