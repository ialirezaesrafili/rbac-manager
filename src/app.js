import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import http from "http";
import AllRoutes from "./module/routes/index.route.js";

class Application {
    #app = express();
    #PORT = 3000;
    #DB_URL = "mongodb://localhost:27017";
    constructor(PORT, DB_URL) {
        this.#PORT = PORT;
        this.#DB_URL = DB_URL;
        this.applicationConfig();
        this.createConnection();
        this.createServer();
        this.createRoutes();
    }

    applicationConfig(){
        this.#app.use(cors());
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({ extended: true }));
        this.#app.use(morgan('dev'));
        this.#app.use(bodyParser.urlencoded({ extended: true }));
    }
    createServer(){
        http.createServer(this.#app).listen(this.#PORT, ()=>{
            console.log(`[Server] Server listening on port ${this.#PORT}`);
        });
    }
    createRoutes(){
        this.#app.use(AllRoutes);
    }

    async createConnection(){
        const connections = await mongoose.connect(this.#DB_URL)
            .then(() => console.log('[DATABASE] connected successfully!'))
            .catch(err => console.log(err));
        return connections;
    }
}


export default Application;