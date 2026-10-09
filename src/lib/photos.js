
import { ID } from 'appwrite';
import { storage } from './appwrite.js';

// اپنی Appwrite Storage Bucket ID یہاں ڈالیں
export const PHOTO_BUCKET_ID = 'YOUR_PHOTO_BUCKET_ID';

// تصویر اپ لوڈ کریں
export async function uploadProfilePhoto(file) {
  if (PHOTO_BUCKET_ID === 'YOUR_PHOTO_BUCKET_ID') {
    throw new Error('Please add your Appwrite Storage Bucket ID.');
  }

  const uploadedFile = await storage.createFile({
    bucketId: PHOTO_BUCKET_ID,
    fileId: ID.unique(),
    file
  });

  return uploadedFile;
}

// اپ لوڈ شدہ تصویر کا URL حاصل کریں
export function getProfilePhotoUrl(fileId) {
  if (PHOTO_BUCKET_ID === 'YOUR_PHOTO_BUCKET_ID') {
    throw new Error('Please add your Appwrite Storage Bucket ID.');
  }

  return storage.getFileView({
    bucketId: PHOTO_BUCKET_ID,
    fileId
  }).toString();
}
