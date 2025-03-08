import express from "express";
import upload from "../middlewares/multer.js";
import { addDoctor, adminDashboard, adminLogin, cancelAppointmentAdmin, getAllAppointments, getAllDoctors } from "../controllers/adminController.js";
import { adminAuthentication } from "../middlewares/authAdmin.js";
import { changeAvailability } from "../controllers/doctorController.js";

const adminRouter=express.Router();

adminRouter.post("/addDoc", adminAuthentication, upload.single('image'), addDoctor);
adminRouter.post("/adminLogin", adminLogin);
adminRouter.get("/getAllDocs", adminAuthentication, getAllDoctors);
adminRouter.post("/changeAvail", adminAuthentication, changeAvailability);
adminRouter.get("/getAppointments", adminAuthentication, getAllAppointments);
adminRouter.post("/cancelApp", adminAuthentication, cancelAppointmentAdmin);
adminRouter.get("/dashData", adminAuthentication, adminDashboard);

export default adminRouter;
