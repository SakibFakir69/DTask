import { ConnectionDB } from "@/DB/database";

export const getTaskWithSubtasks = async (taskId: string) => {
  const db = await ConnectionDB();

  const rows = await db.getAllAsync(
    `
    SELECT 
      t.id as task_id,
      t.title as task_title,
      t.description,
      s.id as subtask_id,
      s.title as subtask_title,
      s.is_completed
    FROM Tasks t
    LEFT JOIN Subtasks s ON s.task_id = t.id
    WHERE t.id = ?;
    `,
    [taskId]
  );

  return rows;
};
