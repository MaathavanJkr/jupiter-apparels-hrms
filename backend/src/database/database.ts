import mysql from "mysql2";
import config from '../config/config';

const db = mysql.createPool(config.sql);

export default db;
