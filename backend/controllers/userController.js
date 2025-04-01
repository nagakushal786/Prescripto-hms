import validator from "validator";
import bcryptjs from "bcryptjs";
import { userModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import { doctorModel } from "../models/doctorModel.js";
import { appointmentModel } from "../models/appointmentModel.js";
import razorpay from "razorpay";

export const registerUser=async (req, res)=> {
    try{
        const {name, email, password}=req.body;

        if(!name || !email || !password){
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
                message: "Please enter a strong password"
            });
        }

        const salt=await bcryptjs.genSalt(10);
        const hashPassword=await bcryptjs.hash(password, salt);

        const userData={
            name,
            email,
            password: hashPassword
        };

        const newUser=await userModel(userData);
        const user=await newUser.save();

        const userToken=jwt.sign({id: user._id}, process.env.USER_JWT_SECRET_KEY, {
            expiresIn: '7d'
        });

        return res.status(200).json({
            success: true,
            token: userToken,
            user: user
        });
    }catch(err){
        return res.status(400).json({
            error: true,
            message: err.message || err
        });
    }
}

export const loginUser=async (req, res)=> {
    try{
        const {email, password}=req.body;
        const user=await userModel.findOne({email});

        if(!user){
            return res.status(400).json({
                success: false,
                message: "User doesn't exist"
            });
        }

        const isMatch=await bcryptjs.compare(password, user.password);
        if(isMatch){
            const token=jwt.sign({id: user._id}, process.env.USER_JWT_SECRET_KEY, {
                expiresIn: "7d"
            });
            return res.status(200).json({
                success: true,
                token: token
            });
        }else{
            return res.status(400).json({
                success: false,
                message: "Please enter valid credentials!"
            });
        }
    }catch(err){
        return res.status(400).json({
            error: true,
            message: err.message || err
        });
    }
}

export const getProfile=async (req, res)=> {
    try{
        const {userId}=req.body;
        const userData=await userModel.findById(userId).select("-password");

        return res.status(200).json({
            success: true,
            user: userData
        });
    }catch(err){
        return res.status(400).json({
            error: true,
            message: err.message || err
        });
    }
}

export const updateProfile=async (req, res)=> {
    try{
        const {userId, name, phone, gender, dob}=req.body;
        const imageFile=req.file;

        if(!name || !phone || !gender || !dob){
            return res.status(400).json({
                success: false,
                message: "Please enter required details!"
            });
        }

        await userModel.findByIdAndUpdate(userId, {
            name,
            phone,
            gender,
            dob
        });

        if(imageFile){
            const imageUpload=await cloudinary.uploader.upload(imageFile.path, {
                resource_type: 'image'
            });
            const imageUrl=imageUpload.secure_url;

            await userModel.findByIdAndUpdate(userId, {image: imageUrl});
        }

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully"
        });
    }catch(err){
        return res.status(400).json({
            error: true,
            message: err.message || err
        });
    }
}

export const bookAppointment=async (req, res)=> {
    try{
        const {userId, docId, slotDate, slotTime}=req.body;

        const docData=await doctorModel.findById(docId).select("-password");
        if(!docData.available){
            return res.status(400).json({
                success: false,
                message: "Doctor not available"
            });
        }

        let slots_booked=docData.slots_booked;

        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                return res.status(400).json({
                    success: false,
                    message: "Slot not available!"
                });
            }else{
                slots_booked[slotDate].push(slotTime);
            }
        }else{
            slots_booked[slotDate]=[];
            slots_booked[slotDate].push(slotTime);
        }

        const userData=await userModel.findById(userId).select("-password");
        delete docData.slots_booked;

        const appointmentData={
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotDate,
            slotTime,
            appDate: Date.now()
        };

        const newAppointment=new appointmentModel(appointmentData);
        await newAppointment.save();

        await doctorModel.findByIdAndUpdate(docId, {slots_booked});

        return res.status(200).json({
            success: true,
            message: "Appointment booked successfully!"
        });
    }catch(err){
        return res.status(400).json({
            error: true,
            message: err.message || err
        });
    }
}

export const getAppointments=async (req, res)=> {
    try{
        const {userId}=req.body;
        const appointments=await appointmentModel.find({userId});

        return res.status(200).json({
            success: true,
            appointments
        });
    }catch(err){
        return res.status(400).json({
            error: true,
            message: err.message || err
        });
    }
}

export const cancelAppointment=async (req, res)=> {
    try{
        const {userId, appId}=req.body;
        const appData=await appointmentModel.findById(appId);

        if(userId!==appData.userId){
            return res.status(400).json({
                success: false,
                message: "Unauthorized action!"
            });
        }

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

const razorpayInstance=new razorpay({
    key_id: 'rzp_test_PJfr3EyawyKRyO',
    key_secret: 'wvlWy7M4WToe2HFhJjs0d2ZH'
});

export const paymentRazorpay=async (req, res)=> {
    try{
        const {appId}=req.body;

        const appointmentData=await appointmentModel.findById(appId);
        if(!appointmentData || appointmentData.cancelled){
            return res.status(400).json({
                success: false,
                message: "Appointment cancelled or not found!"
            });
        }

        const options={
            amount: appointmentData.amount*100,
            currency: 'INR',
            receipt: appId
        };

        const order=await razorpayInstance.orders.create(options);

        return res.status(200).json({
            success: true,
            order
        });
    }catch(err){
        return res.status(400).json({
            error: true,
            message: err.message || err
        });
    }
}

export const verifyRazorpay=async (req, res)=> {
    try{
        const {razorpay_order_id}=req.body;
        const orderInfo=await razorpayInstance.orders.fetch(razorpay_order_id);
        
        if(orderInfo.status==='paid'){
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt, {payment: true});
            return res.status(200).json({
                success: true,
                message: "Payment successful!"
            });
        }else{
            return res.status(200).json({
                success: false,
                message: "Payment failed!"
            });
        }
    }catch(err){
        return res.status(400).json({
            error: true,
            message: err.message || err
        });
    }
}
