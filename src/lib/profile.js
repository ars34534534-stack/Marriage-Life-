
import { ID, Query } from 'appwrite';
import { tablesDB, DATABASE_ID, TABLES } from './database.js';

// نئی پروفائل محفوظ کریں
export async function createProfile(userId, profileData) {
  return tablesDB.createRow({
    databaseId: DATABASE_ID,
    tableId: TABLES.profiles,
    rowId: ID.unique(),
    data: {
      userId,
      name: profileData.name || '',
      age: Number(profileData.age) || 0,
      gender: profileData.gender || '',
      city: profileData.city || '',
      height: profileData.height || '',
      cast: profileData.cast || '',
      bio: profileData.bio || '',
      photoUrl: profileData.photoUrl || ''
    }
  });
}

// اپنی پروفائل تلاش کریں
export async function getMyProfile(userId) {
  const result = await tablesDB.listRows({
    databaseId: DATABASE_ID,
    tableId: TABLES.profiles,
    queries: [
      Query.equal('userId', userId),
      Query.limit(1)
    ]
  });

  return result.rows?.[0] || null;
}

// پروفائل اپ ڈیٹ کریں
export async function updateProfile(rowId, profileData) {
  return tablesDB.updateRow({
    databaseId: DATABASE_ID,
    tableId: TABLES.profiles,
    rowId,
    data: {
      name: profileData.name || '',
      age: Number(profileData.age) || 0,
      gender: profileData.gender || '',
      city: profileData.city || '',
      height: profileData.height || '',
      cast: profileData.cast || '',
      bio: profileData.bio || '',
      photoUrl: profileData.photoUrl || ''
    }
  });
  }
    
