import { ConnectionDB } from "@/DB/database";

export const createTask = async () => {
  try {
    const db = await ConnectionDB();

    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS Tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        description TEXT,
        due_date TEXT,
        priority TEXT,
        is_completed INTEGER DEFAULT 0,
        is_deleted INTEGER DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now')),
        category_id TEXT
      );
    `);

    console.log("Tasks table created successfully!");
  } catch (error) {
    console.log("Error creating Tasks table:", error);
  }
};
