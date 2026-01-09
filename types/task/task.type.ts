
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