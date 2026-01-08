import SQLite from 'react-native-sqlite-storage';
SQLite.enablePromise(true);
// enable promise


export const ConnectionDB = async () => {
    try {
        const db = await SQLite.openDatabase({ name: 'DTask.db', location: 'default' });

        console.log('Database opened successfully');
        return db;
        
    } catch (error) {
        console.error('Error opening database', error);
        throw error;
    }
};
