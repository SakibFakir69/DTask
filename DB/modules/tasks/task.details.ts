import { ConnectionDB } from "@/DB/database";
import { ITaskDetails } from "@/types/task/task.type";
import { TaskRow } from "@/types/task/task.type"; 


export const getTaskDetails = async (
  taskId: string
): Promise<ITaskDetails | null> => {
  try {
    const db = await ConnectionDB();

    const rows = (await db.getAllAsync(
      `
      SELECT
        t.id            AS task_id,
        t.title         AS task_title,
        t.description   AS task_description,
        t.due_date      AS due_date,
        t.priority      AS priority,
        t.startTime     AS start_time,
        t.endTime       AS end_time,

        s.id            AS subtask_id,
        s.title         AS subtask_title,
        s.is_completed  AS subtask_completed
      FROM Tasks t
      LEFT JOIN Subtasks s
        ON s.task_id = t.id
      WHERE t.id = ?
      `,
      [taskId]
    )) as TaskRow[];
  

    if (!rows || rows.length === 0) return null;

    /* task */
    const task: ITaskDetails = {
      id: rows[0].task_id,
      title: rows[0].task_title,
      description: rows[0].task_description,
      due_date: rows[0].due_date,
      priority: rows[0].priority,
      startTime: rows[0].start_time
        ? new Date(rows[0].start_time)
        : null,
      endTime: rows[0].end_time
        ? new Date(rows[0].end_time)
        : null,
      subtasks: [],
    };

    /*  Subtasks */
    for (const row of rows) {
      if (row.subtask_id) {
        task.subtasks.push({
          id: row.subtask_id,
          title: row.subtask_title!,
          is_completed: Boolean(row.subtask_completed),
        });
      }
    }




    return task;
  } catch (error) {
    console.error("getTaskDetails error:", error);
    return null;
  }
};
