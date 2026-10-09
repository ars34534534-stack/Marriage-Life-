
import { ID, Query } from 'appwrite';
import { tablesDB, DATABASE_ID, TABLES } from './database.js';

// چیٹ میں پیغام بھیجیں
export async function sendMessage({
  chatId,
  senderId,
  receiverId,
  text
}) {
  if (!chatId || !senderId || !receiverId || !text?.trim()) {
    throw new Error('Please provide all message details.');
  }

  if (senderId === receiverId) {
    throw new Error('Sender and receiver must be different.');
  }

  return tablesDB.createRow({
    databaseId: DATABASE_ID,
    tableId: TABLES.messages,
    rowId: ID.unique(),
    data: {
      chatId,
      senderId,
      receiverId,
      text: text.trim(),
      read: false
    }
  });
}

// چیٹ کے پیغامات حاصل کریں
export async function getChatMessages(chatId) {
  if (!chatId) {
    throw new Error('Chat ID is required.');
  }

  const result = await tablesDB.listRows({
    databaseId: DATABASE_ID,
    tableId: TABLES.messages,
    queries: [
      Query.equal('chatId', chatId),
      Query.orderAsc('$createdAt'),
      Query.limit(100)
    ]
  });

  return result.rows || [];
}
