import { ConnectionDB } from "@/DB/database";

export const createUser = async () => {
    try {
        const db = await ConnectionDB();

        await db.executeSql(`
            CREATE TABLE IF NOT EXISTS Users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                email TEXT,
                password TEXT,
                pin INTEGER,
                create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        console.log("Users table created successfully");
    } catch (error) {
        console.log("Error creating Users table:", error);
    }
};
