import { ConnectionDB } from "@/DB/database";


export const loginUser = async (email:string, password:string, pin:number | string) => {
  try {
    const db = await ConnectionDB();

    // Search user in Users table
    const [result] = await db.executeSql(
      `SELECT * FROM Users WHERE email = ? AND password = ? OR pin = ? `,
      [email, password, pin]
    );

    if (result.rows.length > 0) {
      const user = result.rows.item(0);
      console.log("Login successful:", user);
      return user; // return full user object
    } else {
      console.log("Invalid email or password");
      return null;
    }
  } catch (error) {
    console.log("Login error:", error);
    return null;
  }
};
