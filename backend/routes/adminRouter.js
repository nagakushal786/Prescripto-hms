import express from "express";
import upload from "../middlewares/multer.js";
import { addDoctor, adminLogin, getAllDoctors } from "../controllers/adminController.js";
import { adminAuthentication } from "../middlewares/authAdmin.js";
import { changeAvailability } from "../controllers/doctorController.js";

const adminRouter=express.Router();

adminRouter.post("/addDoc", adminAuthentication, upload.single('image'), addDoctor);
adminRouter.post("/adminLogin", adminLogin);
adminRouter.get("/getAllDocs", adminAuthentication, getAllDoctors);
adminRouter.post("/changeAvail", adminAuthentication, changeAvailability);

export default adminRouter;
