import { ConnectionDB } from "@/DB/database";

export const createNotificationsTable = async () => {
  try {
    const db = await ConnectionDB();

    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS Notifications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT,
        task_id TEXT,
        push_enable INTEGER DEFAULT 1,
        daily_summary INTEGER DEFAULT 0,
        reminder_buffer INTEGER DEFAULT 10,
        start_time TEXT,
        quiet_time_start TEXT,
        quiet_time_end TEXT,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      );
    `);

    console.log("Notifications table created successfully!");
  } catch (error) {
    console.log("Error creating Notifications table:", error);
  }
};
