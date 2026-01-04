import SQLite from 'react-native-sqlite-storage';


const db = SQLite.openDatabase(
    {name:"DTask.db", location:"default" },

    ()=>{

    },
    error=>{
        console.log(`Error opening database  ${error}`)
    }
)

export default db;