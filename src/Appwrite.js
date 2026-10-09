import { Client, Account, Databases, Storage } from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6ac7ac55003acdd72d94');

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Database & Collection IDs
export const DB_ID = '6ac7d8eb00097e37e895';
export const COLLECTIONS = {
    PROFILES: '6ac7d944003273018b91',
    PHOTOS: '6ac7e18a000803f06f86',
    INTEREST: '6ac7e47e00154aac47bf',
    CHATS: '6ac7e5390022f2c407cd',
    MESSAGES: '6ac7e64e001de42d77c2',
    VERIFICATIONS: '6ac7e70c00195cfdb34b',
    PAYMENTS: '6ac7e86e002b74c220f7',
    REPORTS: '6ac7e9ee0022c5628332',
    BLOCKS: '6ac7eb0d00142d5f7d2f'
};
  
