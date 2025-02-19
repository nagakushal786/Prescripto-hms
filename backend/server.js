import express from "express";
import {config} from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/connectDB.js";
import connectCloudinary from "./config/cloudinary.js";

config({path: "./env/config.env"});

const server=express();
connectDB();
connectCloudinary();

server.use(express.json());
server.use(cookieParser());
server.use(cors());

server.get("/", (req, res)=> {
    return res.status(200).json({
        message: "Welcome to the hospital server"
    });
});

server.listen(process.env.PORT, ()=> {
    console.log(`Server running at port ${process.env.PORT}`);
});