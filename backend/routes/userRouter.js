import express from "express";
import { bookAppointment, cancelAppointment, getAppointments, getProfile, loginUser, paymentRazorpay, registerUser, updateProfile, verifyRazorpay } from "../controllers/userController.js";
import { userAuthentication } from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";

const userRouter=express.Router();

userRouter.post("/register", registerUser);
/**
 * @swagger
 * /hms/user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user
 *               email:
 *                 type: string
 *                 description: The email of the user
 *               password:
 *                 type: string
 *                 description: The password for the user account
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 token:
 *                   type: string
 *                   description: JWT token for the registered user
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
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

userRouter.post("/login", loginUser);
/**
 * @swagger
 * /hms/user/login:
 *   post:
 *     summary: Login an existing user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user
 *               password:
 *                 type: string
 *                 description: The password for the user account
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 token:
 *                   type: string
 *                   description: JWT token for the logged-in user
 *       400:
 *         description: Bad request or invalid credentials
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

userRouter.get("/getProfile", userAuthentication, getProfile);
/**
 * @swagger
 * /hms/user/getProfile:
 *   get:
 *     summary: Retrieve user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: utoken
 *         required: true
 *         description: JWT token for user authentication
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 user:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     image:
 *                       type: string
 *                     gender:
 *                       type: string
 *                     dob:
 *                       type: string
 *                     phone:
 *                       type: string
 *       400:
 *         description: User not authorized or error retrieving profile
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

userRouter.post("/updateProfile", upload.single('image'), userAuthentication, updateProfile);
/**
 * @swagger
 * /hms/user/updateProfile:
 *   post:
 *     summary: Update user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: utoken
 *         required: true
 *         description: JWT token for user authentication
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user
 *               phone:
 *                 type: string
 *                 description: The phone number of the user
 *               gender:
 *                 type: string
 *                 description: The gender of the user
 *               dob:
 *                 type: string
 *                 description: The date of birth of the user
 *             required:
 *               - name
 *               - phone
 *               - gender
 *               - dob
 *     responses:
 *       200:
 *         description: Profile updated successfully
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
 *         description: Bad request or error updating profile
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

userRouter.post("/bookAppointment", userAuthentication, bookAppointment);
/**
 * @swagger
 * /hms/user/bookAppointment:
 *   post:
 *     summary: Book an appointment with a doctor
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: utoken
 *         required: true
 *         description: JWT token for user authentication
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user booking the appointment
 *               docId:
 *                 type: string
 *                 description: The ID of the doctor
 *               slotDate:
 *                 type: string
 *                 description: The date of the appointment
 *               slotTime:
 *                 type: string
 *                 description: The time of the appointment
 *             required:
 *               - userId
 *               - docId
 *               - slotDate
 *               - slotTime
 *     responses:
 *       200:
 *         description: Appointment booked successfully
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
 *         description: Bad request or error booking appointment
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

userRouter.get("/getAppointments", userAuthentication, getAppointments);
/**
 * @swagger
 * /hms/user/getAppointments:
 *   get:
 *     summary: Retrieve user appointments
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: utoken
 *         required: true
 *         description: JWT token for user authentication
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User appointments retrieved successfully
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
 *                       userId:
 *                         type: string
 *                       docId:
 *                         type: string
 *                       slotDate:
 *                         type: string
 *                       slotTime:
 *                         type: string
 *                       appDate:
 *                         type: string
 *       400:
 *         description: User not authorized or error retrieving appointments
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

userRouter.post("/cancelAppointment", userAuthentication, cancelAppointment);
/**
 * @swagger
 * /hms/user/cancelAppointment:
 *   post:
 *     summary: Cancel an existing appointment
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: utoken
 *         required: true
 *         description: JWT token for user authentication
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user cancelling the appointment
 *               appId:
 *                 type: string
 *                 description: The ID of the appointment to be cancelled
 *             required:
 *               - userId
 *               - appId
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
 *         description: Bad request or error cancelling appointment
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

userRouter.post("/payRazorpay", userAuthentication, paymentRazorpay);
/**
 * @swagger
 * /hms/user/payRazorpay:
 *   post:
 *     summary: Initiate payment for an appointment using Razorpay
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: utoken
 *         required: true
 *         description: JWT token for user authentication
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
 *                 description: The ID of the appointment for which payment is being made
 *             required:
 *               - appId
 *     responses:
 *       200:
 *         description: Payment initiated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 order:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     amount:
 *                       type: integer
 *                     currency:
 *                       type: string
 *                     receipt:
 *                       type: string
 *       400:
 *         description: Bad request or error initiating payment
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

userRouter.post("/verifyRazorpay", userAuthentication, verifyRazorpay);
/**
 * @swagger
 * /hms/user/verifyRazorpay:
 *   post:
 *     summary: Verify payment for an appointment using Razorpay
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: utoken
 *         required: true
 *         description: JWT token for user authentication
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               razorpay_order_id:
 *                 type: string
 *                 description: The ID of the Razorpay order to verify
 *             required:
 *               - razorpay_order_id
 *     responses:
 *       200:
 *         description: Payment verification successful
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
 *         description: Bad request or error verifying payment
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

export default userRouter;
