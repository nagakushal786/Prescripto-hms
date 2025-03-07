import express from "express";
import { bookAppointment, cancelAppointment, getAppointments, getProfile, loginUser, paymentRazorpay, registerUser, updateProfile, verifyRazorpay } from "../controllers/userController.js";
import { userAuthentication } from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";

const userRouter=express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/getProfile", userAuthentication, getProfile);
userRouter.post("/updateProfile", upload.single('image'), userAuthentication, updateProfile);
userRouter.post("/bookAppointment", userAuthentication, bookAppointment);
userRouter.get("/getAppointments", userAuthentication, getAppointments);
userRouter.post("/cancelAppointment", userAuthentication, cancelAppointment);
userRouter.post("/payRazorpay", userAuthentication, paymentRazorpay);
userRouter.post("/verifyRazorpay", userAuthentication, verifyRazorpay);

export default userRouter;