import { doctorModel } from "../models/doctorModel.js";

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