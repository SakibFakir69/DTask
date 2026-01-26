import { ConnectionDB } from "@/DB/database";


export const addTask = async (task: any) => {
  const db = await ConnectionDB();

  if (!db) {
    throw new Error("Database connection could not be established.");
  }

  try {
    const result = await db.runAsync(
      `INSERT INTO Tasks (title, description, due_date, priority, category_id, startTime, endTime)
         VALUES (?, ?, ?, ?, ?, ?, ?);`,
      [
        task.title,
        task.description ?? null,
        task.due_date ?? null,
        task.priority ?? "Medium",
        task.category_id ?? null,
        task.startTime ?? null,
        task.endTime ?? null,
      ],
    );

    return result.lastInsertRowId;
  } catch (error) {
    console.error("Transaction failed:", error);
    throw error;
  }
};

interface ISubtasks {
  id?: string | number;
  task_id: string | number;
  title: string;
  is_completed?: boolean | number;
}

// Add a subtask
export const addSubTask = async (subtask: ISubtasks) => {
  try {
    const db = await ConnectionDB();

    const result = await db.runAsync(
      `INSERT INTO Subtasks (task_id, title, is_completed) VALUES (?, ?, ?)`,
      [subtask.task_id, subtask.title, subtask.is_completed ? true : false],
    );

    return result;
  } catch (error) {
    console.error("Failed to add subtask:", error);
    throw error;
  }
};
