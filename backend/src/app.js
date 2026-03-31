import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { connectToSocket } from "./controllers/socketManager.js";

const app = express();
const port = process.env.PORT;

const server = createServer(app);
const io = connectToSocket(server);
const connectionDb = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

main()
    .then(() => {
        console.log(`Database Connected`);
    })
    .catch((err) => {
        console.log(err);
    });

async function main(){
    await mongoose.connect(connectionDb);
};

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});