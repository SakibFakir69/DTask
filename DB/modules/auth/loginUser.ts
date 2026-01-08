import { ConnectionDB } from "@/DB/database";



export const loginUser = async ()=>{

    try {
        const db = await ConnectionDB();

        await db.transaction(tx=>{
            tx.executeSql(`
                

                `)
        })
        
    } catch (error) {
        console.log(error);
        
    }
}