import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const configDotenv = {
    port: process.env.PORT,
    uri: process.env.URI,
    SESSION_SECRET: process.env.SESSION_SECRET
};
