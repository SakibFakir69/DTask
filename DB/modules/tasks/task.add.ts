import { ConnectionDB } from "@/DB/database";

interface ISubtask {
  text: string;
}

interface ITask {
  title: string;
  description: string;
  due_date: string;
  priority: string;
  category_id: string;
  startTime: string;
  endTime: string;
  subtasks: ISubtask[]; 
}

export const addTask = async (task: ITask) => {
  const db = await ConnectionDB();

  try {
    // Start a transaction to ensure atomic operations
    await db.execAsync('BEGIN TRANSACTION;');

    // 1. Insert the main Task
    const result = await db.runAsync(
      `INSERT INTO Tasks (title, description, due_date, priority, category_id, startTime, endTime) 
       VALUES (?, ?, ?, ?, ?, ?, ?);`,
      [
        task.title, 
        task.description, 
        task.due_date, 
        task.priority, 
        task.category_id, 
        task.startTime, 
        task.endTime
      ]
    );

    const taskId = result.lastInsertRowId;

    // 2. Insert Subtasks if they exist
    if (task.subtasks && task.subtasks.length > 0) {
      for (const sub of task.subtasks) {
        await db.runAsync(
          `INSERT INTO Subtasks (task_id, title, is_completed) VALUES (?, ?, 0);`,
          [taskId, sub.text]
        );
      }
    }

    await db.execAsync('COMMIT;');
    console.log("Task and Subtasks added successfully!");
    return true;
  } catch (error) {
    await db.execAsync('ROLLBACK;'); // Undo everything if one part fails
    console.error("Error adding task transaction:", error);
    throw error;
  }
};