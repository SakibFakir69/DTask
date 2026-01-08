import { ConnectionDB } from "@/DB/database";

export const createUserTable = async () => {
  try {
    const db = await ConnectionDB();

    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE,
        password TEXT,
        pin INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("Users table created");
  } catch (error) {
    console.log("Error creating table:", error);
  }
};
