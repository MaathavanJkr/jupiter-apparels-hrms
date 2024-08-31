import assert from "assert";
import dotenv from "dotenv";

// read in the .env file
dotenv.config();

// capture the environment variables the application needs
const {
    ENVIRONMENT,
    PORT,
    HOST,
    HOST_URL,
    JWT_SECRET,
    DB_HOST,
    DB_NAME,
    DB_PORT,
    DB_USER,
    DB_PASS,
} = process.env;

// const sqlEncrypt = process.env.SQL_ENCRYPT === "true";

// validate the required configuration information
assert(PORT, "PORT configuration is required.");
assert(HOST, "HOST configuration is required.");
assert(HOST_URL, "HOST_URL configuration is required.");
assert(JWT_SECRET, "JWT_SECRET configuration is required.");
assert(DB_HOST, "DB_HOST configuration is required.");
assert(DB_NAME, "DB_NAME configuration is required.");
assert(DB_PORT, "DB_PORT configuration is required.");
assert(DB_USER, "DB_USER configuration is required.");
assert(DB_PASS, "DB_PASS configuration is required.");

// export the configuration information
export default {
    environment: ENVIRONMENT,
    port: PORT,
    host: HOST,
    url: HOST_URL,
    jwtSecret: JWT_SECRET,
    sql: {
        host: DB_HOST,
        database: DB_NAME,
        user: DB_USER,
        password: DB_PASS,
        port: Number(DB_PORT),
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        multipleStatements: true
    },
    charset: "utf8mb4",
};
