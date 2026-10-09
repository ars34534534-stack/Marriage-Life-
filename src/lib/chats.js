
import { ID, Query } from 'appwrite';
import { tablesDB, DATABASE_ID, TABLES } from './database.js';

// دو صارفین کے درمیان چیٹ بنائیں
export async function createChat(user1Id, user2Id) {
  if (!user1Id || !user2Id || user1Id === user2Id) {
    throw new Error('Two different user IDs are required.');
  }

  return tablesDB.createRow({
    databaseId: DATABASE_ID,
    tableId: TABLES.chats,
    rowId: ID.unique(),
    data: {
      user1Id,
      user2Id,
      status: 'active'
    }
  });
}

// صارف کی چیٹس حاصل کریں
export async function getMyChats(userId) {
  if (!userId) {
    throw new Error('User ID is required.');
  }

  const [first, second] = await Promise.all([
    tablesDB.listRows({
      databaseId: DATABASE_ID,
      tableId: TABLES.chats,
      queries: [
        Query.equal('user1Id', userId),
        Query.orderDesc('$createdAt'),
        Query.limit(50)
      ]
    }),
    tablesDB.listRows({
      databaseId: DATABASE_ID,
      tableId: TABLES.chats,
      queries: [
        Query.equal('user2Id', userId),
        Query.orderDesc('$createdAt'),
        Query.limit(50)
      ]
    })
  ]);

  return [...(first.rows || []), ...(second.rows || [])];
}
