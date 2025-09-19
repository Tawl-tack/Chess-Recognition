import { Sequelize } from "sequelize";
import mysql2 from 'mysql2';

const mysql = new Sequelize("chess_print", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  dialectModule: mysql2,
});

export default mysql;