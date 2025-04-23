import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  host: process.env.DB_HOST, // Your MySQL database host
  dialect: 'mysql', // Dialect: 'mysql' for MySQL
  username: process.env.DB_USER, // Your MySQL username
  password: process.env.DB_PASS, // Your MySQL password
  database: process.env.DB_NAME, // Your database name
  logging: true, // Disable logging SQL queries, set to true if you want to see them
});

export default sequelize; // Default export
