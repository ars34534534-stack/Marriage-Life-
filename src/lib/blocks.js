
import { ID, Query } from 'appwrite';
import { tablesDB, DATABASE_ID, TABLES } from './database.js';

// کسی صارف کو بلاک کریں
export async function blockUser(blockerId, blockedId) {
  if (!blockerId || !blockedId || blockerId === blockedId) {
    throw new Error('Two different user IDs are required.');
  }

  return tablesDB.createRow({
    databaseId: DATABASE_ID,
    tableId: TABLES.blocks,
    rowId: ID.unique(),
    data: {
      blockerId,
      blockedId
    }
  });
}

// اپنے بلاک کیے ہوئے صارفین دیکھیں
export async function getBlockedUsers(blockerId) {
  if (!blockerId) {
    throw new Error('User ID is required.');
  }

  const result = await tablesDB.listRows({
    databaseId: DATABASE_ID,
    tableId: TABLES.blocks,
    queries: [
      Query.equal('blockerId', blockerId),
      Query.limit(100)
    ]
  });

  return result.rows || [];
}

// کسی صارف کو ان بلاک کریں
export async function unblockUser(rowId) {
  if (!rowId) {
    throw new Error('Block row ID is required.');
  }

  return tablesDB.deleteRow({
    databaseId: DATABASE_ID,
    tableId: TABLES.blocks,
    rowId
  });
}
