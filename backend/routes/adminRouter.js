import express from "express";
import upload from "../middlewares/multer.js";
import { addDoctor, adminDashboard, adminLogin, cancelAppointmentAdmin, getAllAppointments, getAllDoctors } from "../controllers/adminController.js";
import { adminAuthentication } from "../middlewares/authAdmin.js";
import { changeAvailability } from "../controllers/doctorController.js";

const adminRouter=express.Router();

adminRouter.post("/addDoc", adminAuthentication, upload.single('image'), addDoctor);
/**
 * @swagger
 * /hms/admin/addDoc:
 *   post:
 *     summary: Add a new doctor
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: atoken
 *         required: true
 *         description: The token for admin authentication
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               speciality:
 *                 type: string
 *               degree:
 *                 type: string
 *               experience:
 *                 type: string
 *               about:
 *                 type: string
 *               fees:
 *                 type: number
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Doctor added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     image:
 *                       type: string
 *                     speciality:
 *                       type: string
 *                     degree:
 *                       type: string
 *                     experience:
 *                       type: string
 *                     about:
 *                       type: string
 *                     fees:
 *                       type: number
 *                     address:
 *                       type: string
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */

adminRouter.post("/adminLogin", adminLogin);
/**
 * @swagger
 * /hms/admin/adminLogin:
 *   post:
 *     summary: Admin login
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: strongpassword123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 token:
 *                   type: string
 *       400:
 *         description: Invalid admin credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */

adminRouter.get("/getAllDocs", adminAuthentication, getAllDoctors);
/**
 * @swagger
 * /hms/admin/getAllDocs:
 *   get:
 *     summary: Retrieve all doctors
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: atoken
 *         required: true
 *         description: The token for admin authentication
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved all doctors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 doctors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       speciality:
 *                         type: string
 *                       degree:
 *                         type: string
 *                       experience:
 *                         type: string
 *                       about:
 *                         type: string
 *                       fees:
 *                         type: number
 *                       address:
 *                         type: string
 *       400:
 *         description: Error retrieving doctors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */

adminRouter.post("/changeAvail", adminAuthentication, changeAvailability);
/**
 * @swagger
 * /hms/admin/changeAvail:
 *   post:
 *     summary: Change doctor's availability
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: atoken
 *         required: true
 *         description: The token for admin authentication
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               docId:
 *                 type: string
 *                 description: The ID of the doctor whose availability is to be changed
 *     responses:
 *       200:
 *         description: Availability updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Error updating availability
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */

adminRouter.get("/getAppointments", adminAuthentication, getAllAppointments);
/**
 * @swagger
 * /hms/admin/getAppointments:
 *   get:
 *     summary: Retrieve all appointments
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: atoken
 *         required: true
 *         description: The token for admin authentication
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved all appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 appointments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       appointmentId:
 *                         type: string
 *                       doctorId:
 *                         type: string
 *                       userId:
 *                         type: string
 *                       date:
 *                         type: string
 *                         format: date-time
 *                       status:
 *                         type: string
 *       400:
 *         description: Error retrieving appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */

adminRouter.post("/cancelApp", adminAuthentication, cancelAppointmentAdmin);
/**
 * @swagger
 * /hms/admin/cancelApp:
 *   post:
 *     summary: Cancel an appointment
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: atoken
 *         required: true
 *         description: The token for admin authentication
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               appId:
 *                 type: string
 *                 description: The ID of the appointment to be cancelled
 *     responses:
 *       200:
 *         description: Appointment cancelled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Error cancelling appointment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                 message:
 *                   type: string
 */

adminRouter.get("/dashData", adminAuthentication, adminDashboard);
/**
 * @swagger
 * /hms/admin/dashData:
 *   get:
 *     summary: Retrieve admin dashboard data
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: atoken
 *         required: true
 *         description: The token for admin authentication
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved dashboard data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 dashboardData:
 *                   type: object
 *                   properties:
 *                     doctors:
 *                       type: integer
 *                     patients:
 *                       type: integer
 *                     appointments:
 *                       type: integer
 *                     latestAppointments:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           appointmentId:
 *                             type: string
 *                           doctorId:
 *                             type: string
 *                           userId:
 *                             type: string
 *                           date:
 *                             type: string
 *                             format: date-time
 *                           status:
 *                             type: string
 *       400:
 *         description: Error retrieving dashboard data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                 message:
 *                   type: string
 */

export default adminRouter;
