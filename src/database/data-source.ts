import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres", // Database type
  host: process.env.TYPEORM_HOST, // Host from .env
  port: parseInt(process.env.TYPEORM_PORT || "5432", 10), // Port from .env
  username: process.env.TYPEORM_USERNAME, // Username from .env
  password: process.env.TYPEORM_PASSWORD, // Password from .env
  database: process.env.TYPEORM_DATABASE, // Database name from .env
  ssl: {
    rejectUnauthorized: false, // Desative a verificação de certificado se necessário, mas tenha cuidado ao fazer isso em produção
  },
  synchronize: false, // Don't use synchronize in production
  logging: true, // Enable logging for debugging
  entities: [process.env.TYPEORM_ENTITIES_DIR], // Assuming entities are in the 'src' folder
  migrations: [
    process.env.TYPEORM_MIGRATIONS_DIR ||
      __dirname + "/database/migrations/*.{ts,js}",
  ],
});

// Optional: Initialize the DataSource when starting the application
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
