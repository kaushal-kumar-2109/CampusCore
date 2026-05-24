import * as SQLite from "expo-sqlite";

let db = null;


/* ******************** tabele schema for settings start here ******************** */
const settingsTableQuery = `
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS settings (
        id TEXT NOT NULL PRIMARY KEY,
        setting_key TEXT UNIQUE NOT NULL,
        setting_value TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
`;
/* ******************** table schema for setings ends here ******************** */
/* ******************** table schema for userToken start here ******************** */
const userJWTToken = `
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS userToken (
        id TEXT NOT NULL PRIMARY KEY,
        token TEXT NOT NULL,
        authorize TEXT NOT NULL UNIQUE,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        expired_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
`;
/* ******************** table schema for userToken ends here ******************** */

/* ******************** delete user after 7 days start here ******************** */
const delteUser = `
    PRAGMA journal_mode = WAL;
    DELETE FROM userToken where
    datetime(created_at, '+7 days') < CURRENT_TIMESTAMP;
`;
/* ******************** delte user after 7 days ends here ******************** */

/* ******************** crete connection with databse start here ******************** */
const connectLocalDatabase = async () => {
  try {
    db = await SQLite.openDatabaseAsync("campuscore.db");
    if (!db) {
      console.log("Local database not initialized");
      return null;
    }
    console.log("Local database connected successfully");
    return db;
  } catch (err) {
    console.log("Failed to connect with local database:", err.message);
    return null;
  }
};
/* ******************** create connection with databse ends here ******************** */

/* ******************** creting tables from schema start here ******************** */
const createTables = async (queries) => {
  try {
    if (!db) {
      console.log("Database not connected");
      return;
    }
    // await db.execAsync("INSERT INTO userToken (id,token,authorize) VALUES('asjdfk','sdfhjgsjf','sfdhgdsadh')");
    // await db.execAsync("DROP TABLE userToken;");
    queries.forEach(async(query) => {
        let res = await db.execAsync(query);
        console.log("Table created successfully: ",res);
    });

  } catch (err) {
    console.log("Error in creating tables:", err.message);
  }
};
/* ******************** creting tables from schema ends here ******************** */

const initLocalDatabase = async () => {
  await connectLocalDatabase();
  await createTables([settingsTableQuery,userJWTToken,delteUser]);
};

export {
  db,
  initLocalDatabase,
};