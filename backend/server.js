import express from "express";
import {config} from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/connectDB.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRouter.js";
import doctorRouter from "./routes/doctorRouter.js";
import userRouter from "./routes/userRouter.js";
import swaggerDocs from "./swaggerOptions.js";
import swaggerUi from "swagger-ui-express";

config({path: "./env/config.env"});

const server=express();
connectDB();
connectCloudinary();

// const allowedOrigins = [
//     'http://localhost:5174',
//     'https://prescripto-hms.vercel.app'
// ];
  
// server.use(cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS: ' + origin));
//       }
//     },
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin']
// }));
  
// server.options('*', cors());
server.use(express.json());
server.use(cookieParser());
server.use(cors());

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
server.use("/hms/admin", adminRouter);
server.use("/hms/doctor", doctorRouter);
server.use("/hms/user", userRouter);

server.get("/", (req, res)=> {
    return res.status(200).json({
        message: "Welcome to the hospital server"
    });
});

server.listen(process.env.PORT, ()=> {
    console.log(`Server running at port ${process.env.PORT}`);
});