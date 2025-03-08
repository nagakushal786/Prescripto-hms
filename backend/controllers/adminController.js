import validator from "validator";
import bcryptjs from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import { doctorModel } from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import { appointmentModel } from "../models/appointmentModel.js";
import { userModel } from "../models/userModel.js";

export const addDoctor=async (req, res)=> {
    try{
        const {name, email, password, speciality, degree, experience, about, fees, address}=req.body;
        const imageFile=req.file;

        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
            return res.status(400).json({
                success: false,
                message: "Please enter all details!"
            });
        }
        
        if(!validator.isEmail(email)){
            return res.status(400).json({
                success: false,
                message: "Please enter valid email!"
            });
        }

        if(password.length<8){
            return res.status(400).json({
                success: false,
                message: "Please enter strong password!"
            });
        }

        const salt=await bcryptjs.genSalt(10);
        const hashPassword=await bcryptjs.hash(password, salt);

        const imageUpload=await cloudinary.uploader.upload(imageFile.path, {
            resource_type: "image"
        });
        const imageUrl=imageUpload.secure_url;

        const doctorData={
            name,
            email,
            image: imageUrl,
            password: hashPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        }

        const doctor=await doctorModel.findOne({email});
        if(doctor){
            return res.status(401).json({
                success: false,
                message: "Doctor with this email already existing"
            });
        }

        const newDoc=new doctorModel(doctorData);
        await newDoc.save();

        return res.status(200).json({
            success: true,
            message: "Doctor added successfully",
            data: newDoc
        });
    }catch(err){
        return res.status(400).json({
            message: err.message || err,
            error: true
        });
    }
}

export const adminLogin=async (req, res)=> {
    try{
        const {email, password}=req.body;

        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            const payload={email, password};

            const token=jwt.sign(payload, process.env.JWT_SECRET_KEY, {
                expiresIn: '7d'
            });

            return res.status(200).json({
                success: true,
                token: token
            });
        }else{
            return res.status(400).json({
                success: false,
                message: "Invalid admin credentials!"
            });
        }
    }catch(err){
        return res.status(400).json({
            message: err.message || err,
            error: true
        });
    }
}

export const getAllDoctors=async (req, res)=> {
    try{
        const doctors=await doctorModel.find().select("-password");
        return res.status(200).json({
            success: true,
            doctors: doctors
        });
    }catch(err){
        return res.status(400).json({
            message: err.message || err,
            error: true
        });
    }
}

export const getAllAppointments=async (req, res)=> {
    try{
        const appointments=await appointmentModel.find();

        return res.status(200).json({
            success: true,
            appointments
        });
    }catch(err){
        return res.status(400).json({
            message: err.message || err,
            error: true
        });
    }
}

export const cancelAppointmentAdmin=async (req, res)=> {
    try{
        const {appId}=req.body;
        const appData=await appointmentModel.findById(appId);

        await appointmentModel.findByIdAndUpdate(appId, {cancelled: true});

        const {docId, slotDate, slotTime}=appData;
        const docData=await doctorModel.findById(docId);
        let slots_booked=docData.slots_booked;

        slots_booked[slotDate]=slots_booked[slotDate].filter(e=> e!==slotTime);
        await doctorModel.findByIdAndUpdate(docId, {slots_booked});

        return res.status(200).json({
            success: true,
            message: "Appointment cancelled successfully!"
        });
    }catch(err){
        return res.status(400).json({
            error: true,
            message: err.message || err
        });
    }
}

export const adminDashboard=async (req, res)=> {
    try{
        const doctors=await doctorModel.find();
        const users=await userModel.find();
        const appointments=await appointmentModel.find();

        const dashboardData={
            doctors: doctors.length,
            patients: users.length,
            appointments: appointments.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        };

        return res.status(200).json({
            success: true,
            dashboardData
        });
    }catch(err){
        return res.status(400).json({
            error: true,
            message: err.message || err
        });
    }
}