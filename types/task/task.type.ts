
enum IPriority{
    LOW="LOW",
    MEDIUM="MEDIUM",
    HIGH="HIGH"
}


export interface ITask{
     title:string,
  description:string,
  due_date:Date,
  priority:IPriority,
  category_id:string
}

export interface ISubtask {
  id: number;
  title: string;
  is_completed: boolean;
}

export interface ITaskDetails {
  id: number;
  title: string;
  description: string | null;
  due_date: string | null;
  priority: string;
  subtasks: ISubtask[];
  startTime: Date | null;
  endTime: Date | null;
}

/* SQL Row Shape */
export interface TaskRow {
  task_id: number;
  task_title: string;
  task_description: string | null;
  due_date: string | null;
  priority: string;
  start_time: string | null;
  end_time: string | null;

  subtask_id: number | null;
  subtask_title: string | null;
  subtask_completed: number | boolean | null;
}