
import { ConnectionDB } from "@/DB/database";



export const deleteTask = async (id: number | string) => {
  try {
    const db = await ConnectionDB();

    await db.runAsync(`DELETE FROM Tasks WHERE id = ?`, [id]);

   return {success:true ,status:200}
  } catch (error) {

    return {success:false ,status:500 , err:error}
  
  }
};
