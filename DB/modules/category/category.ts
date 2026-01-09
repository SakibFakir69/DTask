import { ConnectionDB } from "@/DB/database";

export const createCategory = async () => {
  try {
    const db = await ConnectionDB();

    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS Categorys (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        color TEXT,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      );
    `);

    console.log("Category table created successfully!");
  } catch (error) {
    console.log("Error creating Category table:", error);
  }
};
