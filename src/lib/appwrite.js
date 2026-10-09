
import { Client, Account, TablesDB, Storage } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('6ac7ac55003acdd72d94');

export const account = new Account(client);
export const tablesDB = new TablesDB(client);
export const storage = new Storage(client);

export const DATABASE_ID = '6ac7d8eb00097e37e895';

export default client;
