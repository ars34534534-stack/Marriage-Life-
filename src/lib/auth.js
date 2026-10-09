
import { ID } from 'appwrite';
import { account } from './appwrite.js';

export async function registerUser({ name, email, password }) {
  const user = await account.create({
    userId: ID.unique(),
    email,
    password,
    name
  });

  await account.createEmailPasswordSession({
    email,
    password
  });

  return user;
}

export async function loginUser({ email, password }) {
  return account.createEmailPasswordSession({
    email,
    password
  });
}

export async function logoutUser() {
  return account.deleteSession({
    sessionId: 'current'
  });
}

export async function getCurrentUser() {
  try {
    return await account.get();
  } catch {
    return null;
  }
}
