import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // create Db and version of Db
  const jateDB = await openDB("jate", 1);

  // Create a new transaction, specify Db and data privileges
  const tx = jateDB.transaction("jate", "readwrite");

  // Open the object store
  const store = tx.objectStore("jate");

  // Pass the content
  const request = store.put({ id: 1, value: content });

  const result = await request;
  console.log("data saved to the database", result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  //  Db and version want to use
  const jateDB = await openDB("jate", 1);

  // New transaction specify db and privileges
  const tx = jateDB.transaction("jate", "readonly");

  // Open object store
  const store = tx.objectStore("jate");

  // Get all request
  const request = store.getAll();

  const result = await request;
  console.log("data read from database", result);
  return result.value;
};

initdb();
