import express from "express";
import { appointmentCancel, appointmentComplete, doctorDashboard, doctorLogin, doctorProfile, getDocAppointments, getDocData, updateDocProfile } from "../controllers/doctorController.js";
import { doctorAuthentication } from "../middlewares/authDoctor.js";

const doctorRouter=express.Router();

doctorRouter.get("/docList", getDocData);
/**
 * @swagger
 * /hms/doctor/docList:
 *   get:
 *     summary: Retrieve a list of doctors
 *     description: Returns a list of doctors without sensitive information (password and email).
 *     tags: [Doctor]
 *     responses:
 *       '200':
 *         description: A list of doctors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 doctors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: "Dr. John Doe"
 *                       image:
 *                         type: string
 *                         example: "http://example.com/image.jpg"
 *                       speciality:
 *                         type: string
 *                         example: "Cardiology"
 *                       degree:
 *                         type: string
 *                         example: "MD"
 *                       experience:
 *                         type: string
 *                         example: "10 years"
 *                       about:
 *                         type: string
 *                         example: "Experienced cardiologist with a passion for patient care."
 *                       available:
 *                         type: boolean
 *                         example: true
 *                       fees:
 *                         type: number
 *                         example: 150
 *                       address:
 *                         type: object
 *                         properties:
 *                           line1:
 *                             type: string
 *                             example: "123 Main St"
 *                           line2:
 *                             type: string
 *                             example: "Anytown"
 *                       date:
 *                         type: number
 *                         example: 1633036800000
 *                       slots_booked:
 *                         type: object
 *                         additionalProperties:
 *                           type: string
 *                           example: "2023-10-01T10:00:00Z"
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error message"
 *                 error:
 *                   type: boolean
 *                   example: true
 */

doctorRouter.post("/docLogin", doctorLogin);
/**
 * @swagger
 * /hms/doctor/docLogin:
 *   post:
 *     summary: Doctor login
 *     description: Allows a doctor to log in using their email and password.
 *     tags: [Doctor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "doctor@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       '200':
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 message:
 *                   type: string
 *                   example: "Doctor logged in successfully!"
 *       '400':
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid credentials!"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error message"
 *                 error:
 *                   type: boolean
 *                   example: true
 */

doctorRouter.get("/docAppointments", doctorAuthentication, getDocAppointments);
/**
 * @swagger
 * /hms/doctor/docAppointments:
 *   get:
 *     summary: Retrieve doctor appointments
 *     description: Fetches a list of appointments for the authenticated doctor.
 *     tags: [Doctor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: dtoken
 *         required: true
 *         description: The token for doctor authentication
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A list of appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 appointments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       appointmentId:
 *                         type: string
 *                         example: "60d5ec49f1b2c8b1a8c8e8e8"
 *                       patientName:
 *                         type: string
 *                         example: "John Doe"
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-10-01T10:00:00Z"
 *                       status:
 *                         type: string
 *                         example: "confirmed"
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error message"
 *                 error:
 *                   type: boolean
 *                   example: true
 */

doctorRouter.post("/completeApp", doctorAuthentication, appointmentComplete);
/**
 * @swagger
 * /hms/doctor/completeApp:
 *   post:
 *     summary: Complete an appointment
 *     description: Marks an appointment as completed for the authenticated doctor.
 *     tags: [Doctor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: dtoken
 *         required: true
 *         description: The token for doctor authentication
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
 *                 example: "60d5ec49f1b2c8b1a8c8e8e8"
 *     responses:
 *       '200':
 *         description: Appointment completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Appointment completed!"
 *       '400':
 *         description: Bad request or appointment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Mark failed!"
 */

doctorRouter.post("/cancelApp", doctorAuthentication, appointmentCancel);
/**
 * @swagger
 * /hms/doctor/cancelApp:
 *   post:
 *     summary: Cancel an appointment
 *     description: Marks an appointment as cancelled for the authenticated doctor.
 *     tags: [Doctor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: dtoken
 *         required: true
 *         description: The token for doctor authentication
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
 *                 example: "60d5ec49f1b2c8b1a8c8e8e8"
 *     responses:
 *       '200':
 *         description: Appointment cancelled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Appointment cancelled!"
 *       '400':
 *         description: Bad request or appointment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Cancellation failed!"
 */

doctorRouter.get("/docDashboard", doctorAuthentication, doctorDashboard);
/**
 * @swagger
 * /hms/doctor/docDashboard:
 *   get:
 *     summary: Retrieve doctor dashboard data
 *     description: Fetches dashboard data including earnings, total appointments, and unique patients for the authenticated doctor.
 *     tags: [Doctor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: dtoken
 *         required: true
 *         description: The token for doctor authentication
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Dashboard data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 dashData:
 *                   type: object
 *                   properties:
 *                     earnings:
 *                       type: number
 *                       example: 5000
 *                     appointments:
 *                       type: number
 *                       example: 20
 *                     patients:
 *                       type: number
 *                       example: 15
 *                     latestApp:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           appointmentId:
 *                             type: string
 *                             example: "60d5ec49f1b2c8b1a8c8e8e8"
 *                           userId:
 *                             type: string
 *                             example: "60d5ec49f1b2c8b1a8c8e8e9"
 *                           slotDate:
 *                             type: string
 *                             example: "2023-10-01"
 *                           slotTime:
 *                             type: string
 *                             example: "10:00 AM"
 *       '400':
 *         description: Bad request or unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Doctor not authorized, please login!"
 *                 error:
 *                   type: boolean
 *                   example: true
 */

doctorRouter.get("/getProfile", doctorAuthentication, doctorProfile);
/**
 * @swagger
 * /hms/doctor/getProfile:
 *   get:
 *     summary: Retrieve doctor profile
 *     description: Fetches the profile data of the authenticated doctor without sensitive information (password).
 *     tags: [Doctor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: dtoken
 *         required: true
 *         description: The token for doctor authentication
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Profile data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 profileData:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Dr. John Doe"
 *                     email:
 *                       type: string
 *                       example: "doctor@example.com"
 *                     image:
 *                       type: string
 *                       example: "http://example.com/image.jpg"
 *                     speciality:
 *                       type: string
 *                       example: "Cardiology"
 *                     degree:
 *                       type: string
 *                       example: "MD"
 *                     experience:
 *                       type: string
 *                       example: "10 years"
 *                     about:
 *                       type: string
 *                       example: "Experienced cardiologist with a passion for patient care."
 *                     available:
 *                       type: boolean
 *                       example: true
 *                     fees:
 *                       type: number
 *                       example: 150
 *                     address:
 *                       type: object
 *                       properties:
 *                         line1:
 *                           type: string
 *                           example: "123 Main St"
 *                         line2:
 *                           type: string
 *                           example: "Anytown"
 *       '400':
 *         description: Bad request or unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Doctor not authorized, please login!"
 *                 error:
 *                   type: boolean
 *                   example: true
 */

doctorRouter.post("/updateProfile", doctorAuthentication, updateDocProfile);
/**
 * @swagger
 * /hms/doctor/updateProfile:
 *   post:
 *     summary: Update doctor profile
 *     description: Updates the profile information of the authenticated doctor.
 *     tags: [Doctor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: dtoken
 *         required: true
 *         description: The token for doctor authentication
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fees:
 *                 type: number
 *                 example: 150
 *               address:
 *                 type: object
 *                 properties:
 *                   line1:
 *                     type: string
 *                     example: "123 Main St"
 *                   line2:
 *                     type: string
 *                     example: "Anytown"
 *               available:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       '200':
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Profile updated!"
 *       '400':
 *         description: Bad request or unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Doctor not authorized, please login!"
 *                 error:
 *                   type: boolean
 *                   example: true
 */

export default doctorRouter;
