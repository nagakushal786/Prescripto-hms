import express from "express";
import { getDocData } from "../controllers/doctorController.js";

const doctorRouter=express.Router();

doctorRouter.get("/docList", getDocData);

export default doctorRouter;