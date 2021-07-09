import fs from "fs";
import logger from "../lib/logger";
import path from "path";
import dotenv from "dotenv";

if (fs.existsSync(".env")) {
    logger.debug("Using .env file to supply config environment variables");
    dotenv.config({ path: ".env" });
} else {
    logger.debug("Using .env.example file to supply config environment variables");
    dotenv.config({ path: ".env.example" });  // you can delete this after you create your own .env file!
}

const pubkey_path = path.join(__dirname, "..", "..", "id_rsa_pub.pem");
export const PUB_KEY = fs.readFileSync(pubkey_path, "utf8");

const privkey_path = path.join(__dirname, "..", "..", "id_rsa_priv.pem");
export const PRIV_KEY = fs.readFileSync(privkey_path, "utf8");

if( !PUB_KEY || !PRIV_KEY ){
    process.exit(1);
}

export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === "production"; // Anything else is treated as 'dev'

export const SESSION_SECRET = process.env["SESSION_SECRET"];
export const MONGODB_URI = prod ? process.env["MONGODB_STRING_PROD"] : process.env["MONGODB_STRING_DEV"];

if (!SESSION_SECRET) {
    logger.error("No client secret. Set SESSION_SECRET environment variable.");
}

if (!MONGODB_URI) {
    if (prod) {
        logger.error("No mongo connection string. Set MONGODB_STRING_PROD environment variable.");
    } else {
        logger.error("No mongo connection string. Set MONGODB_STRING_DEV environment variable.");
    }
    process.exit(1);
}
