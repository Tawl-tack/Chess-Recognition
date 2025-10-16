import mysql from './mysql.js';
import * as models from './models/tables.js'; 

async function initialize_DB() {
    try {
        await mysql.sync({ force: false }); 
        process.exit(0);
    } catch (err) {
        console.error("error sincronizing with database:", err);
        process.exit(1);
    }
}

initialize_DB();