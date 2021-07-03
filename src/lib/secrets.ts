import fs from "fs";
import path from "path";

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
    process.exit(1);
}

if (!MONGODB_URI) {
    process.exit(1);
}
