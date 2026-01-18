// DB/database.ts
import * as SQLite from "expo-sqlite";

export const ConnectionDB = async () => {
  try {
    const db = await SQLite.openDatabaseAsync("DTask.db"); //  returns DB object
    return db;
  } catch (error) {
    console.error("Error opening database:", error);
    throw error;
  }
};
