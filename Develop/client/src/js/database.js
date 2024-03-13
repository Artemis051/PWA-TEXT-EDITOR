import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // open connection to the jate db with version 1
  const jateDb = await openDB('jate', 1);

  // start a read-write transaction on the jate db to allow changes in data
  const tx = jateDb.transaction('jate', 'readwrite');

  // Access the jate object store from transaction
  const store = tx.objectStore('jate');

  // Add provided content to the store
  const request = store.add({ content });
  
  // Wait for add operation to complete and log the result
  const result = await request;
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // open a connection to the jate db with version 1
  const jateDb = await openDB('jate', 1);

  // start a read-only transaction on the jate db to get data
  const tx = jateDb.transaction('jate', 'readonly');

  // accesses the jate object store from transaction
  const store = tx.objectStore('jate');

  // Retrieve all records from the store
  const request = store.getAll();

  // Wait for the fetch operation to complete and logs the results
  const result = await request;

  // return the content of the last item in the database
  return result.at(-1)?.content; 
};

// initialize the IndexedDB database
initdb();

