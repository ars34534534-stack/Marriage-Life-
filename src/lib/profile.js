
import { ID, Query } from 'appwrite';
import { databases, DATABASE_ID, TABLES } from './database.js';

// نئی پروفائل محفوظ کریں
export async function createProfile(userId, profileData) {
  return databases.createDocument({
    databaseId: DATABASE_ID,
    collectionId: TABLES.profiles,
    documentId: ID.unique(),
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
  const result = await databases.listDocuments({
    databaseId: DATABASE_ID,
    collectionId: TABLES.profiles,
    queries: [
      Query.equal('userId', userId),
      Query.limit(1)
    ]
  });

  return result.documents[0] || null;
}

// پروفائل اپ ڈیٹ کریں
export async function updateProfile(documentId, profileData) {
  return databases.updateDocument({
    databaseId: DATABASE_ID,
    collectionId: TABLES.profiles,
    documentId,
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
        
