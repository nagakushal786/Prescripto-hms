import express from "express";
import { appointmentCancel, appointmentComplete, doctorDashboard, doctorLogin, doctorProfile, getDocAppointments, getDocData, updateDocProfile } from "../controllers/doctorController.js";
import { doctorAuthentication } from "../middlewares/authDoctor.js";

const doctorRouter=express.Router();

doctorRouter.get("/docList", getDocData);
doctorRouter.post("/docLogin", doctorLogin);
doctorRouter.get("/docAppointments", doctorAuthentication, getDocAppointments);
doctorRouter.post("/completeApp", doctorAuthentication, appointmentComplete);
doctorRouter.post("/cancelApp", doctorAuthentication, appointmentCancel);
doctorRouter.get("/docDashboard", doctorAuthentication, doctorDashboard);
doctorRouter.get("/getProfile", doctorAuthentication, doctorProfile);
doctorRouter.post("/updateProfile", doctorAuthentication, updateDocProfile);

export default doctorRouter;