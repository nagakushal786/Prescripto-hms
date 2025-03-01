import express from "express";
import { getProfile, loginUser, registerUser, updateProfile } from "../controllers/userController.js";
import { userAuthentication } from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";

const userRouter=express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/getProfile", userAuthentication, getProfile);
userRouter.post("/updateProfile", upload.single('image'), userAuthentication, updateProfile);

export default userRouter;