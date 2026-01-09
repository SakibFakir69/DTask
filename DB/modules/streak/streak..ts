import { ConnectionDB } from "@/DB/database";

export const createStreak = async () => {
  try {
    const db = await ConnectionDB();

    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS Streaks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task_id TEXT,
        current_count INTEGER DEFAULT 0,
        longest_streak INTEGER DEFAULT 0,
        last_complete TEXT,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      );
    `);

    console.log("Streaks table created successfully!");
  } catch (error) {
    console.log("Error creating Streaks table:", error);
  }
};
