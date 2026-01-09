
import { ConnectionDB } from "@/DB/database";
import { ITask } from "@/types/task/task.type";

export const addTask = async ({
  title,
  description,
  due_date,
  priority,
  category_id
}:ITask) => {
  try {
    const db = await ConnectionDB();

    await db.executeSql(
      `
      INSERT INTO Tasks (title, description, due_date, priority, category_id)
      VALUES (?, ?, ?, ?, ?);
      `,
      [title, description, due_date, priority, category_id]
    );

    console.log("Task added successfully!");
  } catch (error) {
    console.log("Error adding task:", error);
  }
};
