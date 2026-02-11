import { Sequelize } from "sequelize-typescript";


export const dbConfig = {
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "yourpassword",
  database: process.env.DB_NAME || "masterdb",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  dialect: (process.env.DB_DIALECT as any) || "postgres",
};

export const sequelize = new Sequelize({
  ...dbConfig,
  logging: false,
     pool: {
      max: 5,     
      min: 1,
      acquire: 30000,
      idle: 10000,
      evict: 10000,
    },
 
    dialectOptions: {
      statement_timeout: 60000,
      idle_in_transaction_session_timeout: 30000,
    },
 
  models: [], 
});