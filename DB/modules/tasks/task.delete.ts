
import { ConnectionDB } from "@/DB/database";

export const deleteTask = async (id: number) => {
  try {
    const db = await ConnectionDB();

    await db.runAsync(`DELETE FROM Tasks WHERE id = ?`, [id]);

    console.log("Task & subtasks deleted");
  } catch (error) {
    console.log(error);
  }
};
