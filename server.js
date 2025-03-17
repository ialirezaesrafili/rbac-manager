import dotenv from "dotenv"
import Application from "./src/app.js";

dotenv.config();

const port = process.env.PORT || 3000;
const mongo_url = process.env.MONGO_URL;

new Application(port, mongo_url);
