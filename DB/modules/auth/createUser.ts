import { ConnectionDB } from "@/DB/database";

export const createUserTable = async () => {
  try {
    const db = await ConnectionDB();

    //
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS Users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          pin INTEGER,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

    console.log("Users table created successfully");
  } catch (error) {
    console.log("Error creating Users table:", error);
  }
};
