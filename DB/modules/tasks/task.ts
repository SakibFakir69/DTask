import { ConnectionDB } from "@/DB/database";

export const createTaskTables = async () => {
  try {
    const db = await ConnectionDB();
    // Enable Foreign Keys (Required for DELETE CASCADE)
    await db.execAsync(`PRAGMA foreign_keys = ON;`);
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS Tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        due_date TEXT,
        priority TEXT CHECK(priority IN ('Low', 'Medium', 'High')) DEFAULT 'Medium',
        startTime TEXT,
        endTime TEXT,
        is_completed INTEGER DEFAULT 0,
        is_deleted INTEGER DEFAULT 0,
        category_id TEXT,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      );

    
      CREATE TABLE IF NOT EXISTS Subtasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        is_completed INTEGER DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (task_id) REFERENCES Tasks (id) ON DELETE CASCADE
      );
    `);

    console.log("Database tables initialized successfully!");
  } catch (error) {
    console.log("Error creating tables:", error);
  }
};