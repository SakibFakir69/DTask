import { ConnectionDB } from "@/DB/database";

export const createCategoryTable = async () => {
  const db = await ConnectionDB();

  await db.execAsync(`PRAGMA foreign_keys = ON;`);

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS Categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      color TEXT NOT NULL,
      icon TEXT,
      background TEXT,
      created_at TEXT DEFAULT (datetime('now'))

    );
  `);
};
export const addCreateCategory = async ({
  name,
  color,
  icon,
  background,}: {
  name: string;
  color: string;
  icon?: string;
  background?: string;
}) => {
  try {
    const db = await ConnectionDB();

    await db.runAsync(
      `
      INSERT INTO Categories (name, color, icon, background)
      VALUES (?, ?, ?, ?);
      `,
      [name, color, icon ?? null, background ?? null],
    );

    console.log("Category created successfully");
  } catch (error) {
    console.log("Failed to create category", error);
  }
};
