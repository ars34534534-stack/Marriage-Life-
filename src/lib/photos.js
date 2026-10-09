
import { ID } from 'appwrite';
import { storage } from './appwrite.js';

// اپنی اصل Appwrite Storage Bucket ID یہاں درج کریں
export const PHOTO_BUCKET_ID = 'YOUR_PHOTO_BUCKET_ID';

// پروفائل تصویر اپ لوڈ کریں
export async function uploadProfilePhoto(file) {
  if (!file) {
    throw new Error('Please select a photo first.');
  }

  if (PHOTO_BUCKET_ID === 'YOUR_PHOTO_BUCKET_ID') {
    throw new Error('Please add your Appwrite Storage Bucket ID.');
  }

  if (!file.type?.startsWith('image/')) {
    throw new Error('Please select a valid image.');
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error('Image size must be 5 MB or less.');
  }

  return storage.createFile({
    bucketId: PHOTO_BUCKET_ID,
    fileId: ID.unique(),
    file
  });
}

// تصویر کا URL حاصل کریں
export function getProfilePhotoUrl(fileId) {
  if (!fileId) {
    throw new Error('Photo file ID is required.');
  }

  if (PHOTO_BUCKET_ID === 'YOUR_PHOTO_BUCKET_ID') {
    throw new Error('Please add your Appwrite Storage Bucket ID.');
  }

  return storage.getFileView({
    bucketId: PHOTO_BUCKET_ID,
    fileId
  }).toString();
}
