import { ConnectionDB } from "@/DB/database";

export const taskUserDataRetrive = async () => {
  try {
    const db = await ConnectionDB();
    

  
    if (!db) {
      console.error("Database connection failed: db is null");
      return [];
    }

 
    const tasks = await db.getAllAsync('SELECT * FROM Tasks ORDER BY created_at ASC'); 
    return tasks;
    
  } catch (error) {
    console.error("Database Retrieval Error:", error);
    return [];
  }
}