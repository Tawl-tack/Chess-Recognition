import { Sequelize } from "sequelize";
import mysql2 from 'mysql2';
import 'dotenv/config'

const mysql = new Sequelize(
  process.env.DB_NAME || "chess_print",
  process.env.DB_USER || "root",
  process.env.DB_PASS || "root",
  {
    host: process.env.DB_HOST || "mysql",
    dialect: "mysql",
    dialectModule: mysql2,
  });

export default mysql;