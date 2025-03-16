import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

class Application {
    #PORT = 3000;
    #DB_URL = "mongodb://localhost:27017";
    constructor(PORT, DB_URL) {
        this.#PORT = PORT;
        this.#DB_URL = DB_URL;
    }

    applicationConfig(){
        const app = express();
        app.use(cors());
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(morgan('dev'));

    }
    createServer(){}
    createRoutes(){}

    async connectDataBase(){

    }
}