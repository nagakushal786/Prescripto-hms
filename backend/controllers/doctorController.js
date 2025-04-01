import { doctorModel } from "../models/doctorModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { appointmentModel } from "../models/appointmentModel.js";

export const changeAvailability=async (req, res)=> {
    try{
        const {docId}=req.body;

        const doctorData=await doctorModel.findById(docId);
        await doctorModel.findByIdAndUpdate(docId, {available: !doctorData.available});

        return res.status(200).json({
            success: true,
            message: "Availability updated"
        });
    }catch(err){
        return res.status(400).json({
            message: err.message || err,
            error: true
        });
    }
}

export const getDocData=async (req, res)=> {
    try{
        const doctors=await doctorModel.find().select(["-password", "-email"]);

        return res.status(200).json({
            success: true,
            doctors: doctors
        })
    }catch(err){
        return res.status(400).json({
            message: err.message || err,
            error: true
        });
    }
}

export const doctorLogin=async (req, res)=> {
    try{
        const {email, password}=req.body;

        const doctor=await doctorModel.findOne({email});
        if(!doctor){
            return res.status(400).json({
                success: false,
                message: "Invalid credentials!"
            });
        }

        const isMatch=await bcryptjs.compare(password, doctor.password);
        if(isMatch){
            const token=jwt.sign({id: doctor._id}, process.env.JWT_SECRET_KEY, {
                expiresIn: '7d'
            });
            
            return res.status(200).json({
                success: true,
                token,
                message: "Doctor logged in successfully!"
            });
        }else{
            return res.status(400).json({
                success: false,
                message: "Invalid password!"
            });
        }
    }catch(err){
        return res.status(400).json({
            message: err.message || err,
            error: true
        });
    }
}

export const getDocAppointments=async (req, res)=> {
    try{
        const {docId}=req.body;
        const appointments=await appointmentModel.find({docId});

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

export const appointmentComplete=async (req, res)=> {
    try{
        const {docId, appId}=req.body;
        const appData=await appointmentModel.findById(appId);

        if(appData && appData.docId===docId){
            await appointmentModel.findByIdAndUpdate(appId, {isCompleted: true});
            return res.status(200).json({
                success: true,
                message: "Appointment completed!"
            });
        }else{
            return res.status(400).json({
                success: false,
                message: "Mark failed!"
            });
        }
    }catch(err){
        return res.status(400).json({
            message: err.message || err,
            error: true
        });
    }
}

export const appointmentCancel=async (req, res)=> {
    try{
        const {docId, appId}=req.body;
        const appData=await appointmentModel.findById(appId);

        if(appData && appData.docId===docId){
            await appointmentModel.findByIdAndUpdate(appId, {cancelled: true});
            return res.status(200).json({
                success: true,
                message: "Appointment cancelled!"
            });
        }else{
            return res.status(400).json({
                success: false,
                message: "Cancellation failed!"
            });
        }
    }catch(err){
        return res.status(400).json({
            message: err.message || err,
            error: true
        });
    }
}

export const doctorDashboard=async (req, res)=> {
    try{
        const {docId}=req.body;
        const appointments=await appointmentModel.find({docId});
        let earnings=0;

        appointments.map((item)=> {
            if(item.isCompleted || item.payment){
                earnings+=item.amount;
            }
        });

        let patients=[];
        appointments.map((item)=> {
            if(!patients.includes(item.userId)){
                patients.push(item.userId)
            }
        });

        const dashData={
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestApp: appointments.reverse().slice(0, 5)
        };

        return res.status(200).json({
            success: true,
            dashData
        });
    }catch(err){
        return res.status(400).json({
            message: err.message || err,
            error: true
        });
    }
}

export const doctorProfile=async (req, res)=> {
    try{
        const {docId}=req.body;
        const profileData=await doctorModel.findById(docId).select("-password");

        return res.status(200).json({
            success: true,
            profileData
        });
    }catch(err){
        return res.status(400).json({
            message: err.message || err,
            error: true
        });
    }
}

export const updateDocProfile=async (req, res)=> {
    try{
        const {docId, fees, address, available}=req.body;
        await doctorModel.findByIdAndUpdate(docId, {fees, address, available});

        return res.status(200).json({
            success: true,
            message: "Profile updated!"
        });
    }catch(err){
        return res.status(400).json({
            message: err.message || err,
            error: true
        });
    }
}
