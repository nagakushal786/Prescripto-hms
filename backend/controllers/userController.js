import validator from "validator";
import bcryptjs from "bcryptjs";
import { userModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

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