

import { ConnectionDB } from "@/DB/database";

export const createSubtasksTable = async () => {
  try {
    const db = await ConnectionDB();

    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS Subtasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task_id TEXT,
        title TEXT,
        description TEXT,
        is_completed INTEGER DEFAULT 0,
        is_deleted INTEGER DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      );
    `);

    console.log("Subtasks table created successfully!");
  } catch (error) {
    console.log("Error creating Subtasks table:", error);
  }
};
