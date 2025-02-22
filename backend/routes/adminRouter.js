import express from "express";
import upload from "../middlewares/multer.js";
import { addDoctor, adminLogin } from "../controllers/adminController.js";
import { adminAuthentication } from "../middlewares/authAdmin.js";

const adminRouter=express.Router();

adminRouter.post("/addDoc", adminAuthentication, upload.single('image'), addDoctor);
adminRouter.post("/adminLogin", adminLogin);

export default adminRouter;